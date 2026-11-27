import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Loader2,
  Lock,
  Music,
  Play,
  Sparkles,
  Trophy,
  Unlock,
  VolumeX,
  X
} from 'lucide-react';
import type { StudentProfile } from '../types';
import { SUBJECTS_CATALOG } from '../data/subjectsCatalog';
import {
  fetchCurriculum,
  fetchMapProgress,
  type Curriculum,
  type DbLesson,
  type NodeProgress,
  type SubjectKey
} from '../lib/api';
import { soundManager } from '../utils/audio';
import { StarIcon } from './GameIcons';
import { MapHUD } from './map/MapHUD';
import { FogOfWar } from './map/FogOfWar';
import { IslandArt, biomeFor, BIOMES } from './map/IslandArt';
import { MapScenery } from './map/MapScenery';
import { MapCritters } from './map/MapCritters';
import { mapAudio } from '../utils/mapAudio';
import { AdventureLeaderboardModal } from './map/AdventureLeaderboardModal';
import { VUIBOT_ASSETS } from '../data/vuibotMascot';
import {
  ADVENTURE_REALMS,
  type AdventureRealmId,
  type AdventureWorldSave,
  type RealmLandmark,
  type RealmSecretItem,
  getRealmExplorationPoints,
  isRealmChestReady,
  loadAdventureSave,
  saveAdventureSave
} from '../data/adventureWorld';
import { IsometricWorldStage, SecretItemArt } from './map/IsometricWorldStage';
import {
  ChestRewardModal,
  CollectionAlbumModal,
  LandmarkModal,
  NpcQuestModal
} from './map/AdventureWorldModals';

interface Props {
  student: StudentProfile;
  initialSubjectId: string;
  initialGrade: number;
  onStartNode: (subjectId: string, grade: number, lessonCode: string) => void;
  onRequireLogin?: () => void;
}

interface MapNode {
  lesson: DbLesson;
  index: number;
  title: string;
  kind: 'normal' | 'mini_boss' | 'boss';
  progress?: NodeProgress;
  unlocked: boolean;
}

const W = 600;
const STEP = 124;
const TOP = 90;
const XS = [150, 300, 450, 300];
const pos = (i: number) => ({ x: XS[i % 4], y: TOP + i * STEP });

const VUI_BOT_GUIDE = VUIBOT_ASSETS.guiding;
const VUI_BOT_HAPPY = VUIBOT_ASSETS.happy;
const MASCOT_FALLBACK = 'Bấm vào hòn đảo đang sáng để bắt đầu nhé!';

export const AdventureMap: React.FC<Props> = ({
  student,
  initialSubjectId,
  initialGrade,
  onStartNode,
  onRequireLogin
}) => {
  const [mapMode, setMapMode] = useState<'world' | 'study'>('world');
  const [music, setMusic] = useState(() => mapAudio.isEnabled());

  // 2.5D 6-Realm Adventure World state
  const [worldSave, setWorldSave] = useState<AdventureWorldSave>(() => loadAdventureSave(student.id));
  const [activeRealmId, setActiveRealmId] = useState<AdventureRealmId>(() => loadAdventureSave(student.id).lastRealm);
  const [selectedLandmark, setSelectedLandmark] = useState<RealmLandmark | null>(null);
  const [npcOpen, setNpcOpen] = useState(false);
  const [chestModalOpen, setChestModalOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Study Trail state
  const [subjectId, setSubjectId] = useState(initialSubjectId);
  const [grade, setGrade] = useState(initialGrade);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [loadError, setLoadError] = useState('');
  const [progress, setProgress] = useState<Record<string, NodeProgress>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showBoard, setShowBoard] = useState(false);

  // Reload adventure save when student switches
  useEffect(() => {
    const loaded = loadAdventureSave(student.id);
    setWorldSave(loaded);
    setActiveRealmId(loaded.lastRealm);
  }, [student.id]);

  // Ambience music across both modes
  useEffect(() => {
    if (music) mapAudio.start();
    const retry = () => {
      if (mapAudio.isEnabled()) mapAudio.start();
    };
    window.addEventListener('pointerdown', retry, { once: true });
    return () => {
      window.removeEventListener('pointerdown', retry);
      mapAudio.stop();
    };
  }, [music]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  useEffect(() => {
    if (!toastMsg) return;
    const t = window.setTimeout(() => setToastMsg(null), 3800);
    return () => window.clearTimeout(t);
  }, [toastMsg]);

  const updateWorldSave = (updater: (prev: AdventureWorldSave) => AdventureWorldSave) => {
    setWorldSave((prev) => {
      const next = updater(prev);
      saveAdventureSave(student.id, next);
      return next;
    });
  };

  const activeRealm = useMemo(
    () => ADVENTURE_REALMS.find((r) => r.id === activeRealmId) ?? ADVENTURE_REALMS[0],
    [activeRealmId]
  );

  const totalExplorationPoints = useMemo(
    () => ADVENTURE_REALMS.reduce((sum, r) => sum + getRealmExplorationPoints(r, worldSave), 0),
    [worldSave]
  );

  const totalExplorerBadges = useMemo(
    () =>
      ADVENTURE_REALMS.filter((r) =>
        r.landmarks.every((l) => worldSave.discoveredLandmarks.includes(l.id))
      ).length,
    [worldSave.discoveredLandmarks]
  );

  const handleSelectRealm = (realmId: AdventureRealmId) => {
    const target = ADVENTURE_REALMS.find((r) => r.id === realmId);
    if (!target) return;

    if (worldSave.unlockedRealms.includes(realmId)) {
      soundManager.play('click');
      setActiveRealmId(realmId);
      updateWorldSave((prev) => ({ ...prev, lastRealm: realmId }));
      return;
    }

    if (totalExplorationPoints >= target.unlockRequirement) {
      soundManager.play('travel');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.55 } });
      updateWorldSave((prev) => ({
        ...prev,
        unlockedRealms: prev.unlockedRealms.includes(realmId)
          ? prev.unlockedRealms
          : [...prev.unlockedRealms, realmId],
        lastRealm: realmId
      }));
      setActiveRealmId(realmId);
      showToast(`Đã mở khóa vùng đất mới: ${target.name}!`);
    } else {
      soundManager.play('wrong');
      const needed = target.unlockRequirement - totalExplorationPoints;
      showToast(
        `Cần thêm ${needed} điểm khám phá để mở ${target.name} (chạm địa điểm, vật phẩm ẩn hoặc NPC)!`
      );
    }
  };

  const handleDiscoverLandmark = (lm: RealmLandmark) => {
    if (worldSave.discoveredLandmarks.includes(lm.id)) return;
    soundManager.play('correct');
    const updatedDiscovered = [...worldSave.discoveredLandmarks, lm.id];
    const completedBadgeNow = activeRealm.landmarks.every((item) =>
      updatedDiscovered.includes(item.id)
    );
    if (completedBadgeNow) {
      soundManager.play('fanfare');
      confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });
      showToast(`Chúc mừng! Bạn nhận được huy hiệu "${activeRealm.badgeName}"!`);
    } else {
      showToast(`Đã khám phá ${lm.name} (+1 Điểm khám phá)`);
    }
    updateWorldSave((prev) => ({
      ...prev,
      discoveredLandmarks: prev.discoveredLandmarks.includes(lm.id)
        ? prev.discoveredLandmarks
        : [...prev.discoveredLandmarks, lm.id],
      adventureStars: prev.adventureStars + (completedBadgeNow ? 2 : 1)
    }));
  };

  const handleCollectSecret = (secret: RealmSecretItem) => {
    if (worldSave.collectedSecrets.includes(secret.id)) {
      soundManager.play('click');
      showToast(`Bạn đã thu thập "${secret.name}" rồi!`);
      return;
    }
    soundManager.play('coin');
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    updateWorldSave((prev) => ({
      ...prev,
      collectedSecrets: [...prev.collectedSecrets, secret.id],
      adventureStars: prev.adventureStars + 1
    }));
    showToast(`Tìm thấy vật phẩm bí mật: ${secret.name}! (+1 Sao Thám Hiểm)`);
  };

  const handleCompleteNpcQuest = () => {
    if (worldSave.completedNpcs.includes(activeRealm.npc.id)) return;
    confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    updateWorldSave((prev) => ({
      ...prev,
      completedNpcs: [...prev.completedNpcs, activeRealm.npc.id],
      adventureStars: prev.adventureStars + 2
    }));
    showToast(`Hoàn thành nhiệm vụ của ${activeRealm.npc.name} (+2 Tiến độ · +2 Sao)`);
  };

  const handleOpenChest = () => {
    if (worldSave.openedChests.includes(activeRealm.chest.id)) {
      soundManager.play('click');
      setChestModalOpen(true);
      return;
    }
    if (!isRealmChestReady(activeRealm, worldSave)) {
      soundManager.play('wrong');
      const currentPts = getRealmExplorationPoints(activeRealm, worldSave);
      showToast(
        `Rương cần 3 điểm khám phá tại ${activeRealm.shortName} (hiện có ${currentPts}/3 điểm).`
      );
      return;
    }
    soundManager.play('fanfare');
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 } });
    updateWorldSave((prev) => ({
      ...prev,
      openedChests: [...prev.openedChests, activeRealm.chest.id],
      adventureStars: prev.adventureStars + activeRealm.chest.starsBonus
    }));
    setChestModalOpen(true);
  };

  const handlePortalActivate = () => {
    const idx = ADVENTURE_REALMS.findIndex((r) => r.id === activeRealm.id);
    if (idx < 0 || idx >= ADVENTURE_REALMS.length - 1) {
      soundManager.play('fanfare');
      showToast('Bạn đang ở vùng đất cuối cùng của hành trình cổ tích! Hãy mở Bộ Sưu Tập để xem thành tích.');
      return;
    }
    const nextRealm = ADVENTURE_REALMS[idx + 1];
    handleSelectRealm(nextRealm.id);
  };

  // Study Trail logic
  const subject = SUBJECTS_CATALOG.find((s) => s.id === subjectId);
  const gradeOpen =
    !!subject &&
    subject.status === 'active' &&
    subject.availableGrades.some((x) => x.grade === String(grade) && (x.term1Available || x.term2Available));
  const subjectKey: SubjectKey | null = gradeOpen ? subjectId : null;

  useEffect(() => {
    let alive = true;
    setCurriculum(null);
    setLoadError('');
    setSelected(null);
    if (!gradeOpen || !subjectKey || mapMode !== 'study') return () => { alive = false; };
    fetchCurriculum(subjectKey, grade)
      .then((c) => alive && setCurriculum(c))
      .catch((e) => alive && setLoadError(String(e.message || e)));
    return () => {
      alive = false;
    };
  }, [gradeOpen, subjectKey, grade, mapMode]);

  useEffect(() => {
    let alive = true;
    if (student.isGuest) {
      setProgress({});
      return;
    }
    fetchMapProgress(student.id)
      .then((p) => alive && setProgress(p))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [student.id, student.isGuest]);

  const nodes: MapNode[] = useMemo(() => {
    if (!curriculum) return [];
    const chapterOf = new Map(curriculum.chapters.map((c) => [c.id, c] as const));
    const lessons = curriculum.lessons
      .filter((l) => chapterOf.has(l.chapter_id))
      .sort(
        (a, b) =>
          chapterOf.get(a.chapter_id)!.sequence_no - chapterOf.get(b.chapter_id)!.sequence_no ||
          a.sequence_no - b.sequence_no
      );
    return lessons.map((lesson, i) => {
      const prev = i > 0 ? progress[lessons[i - 1].id] : undefined;
      const last = i === lessons.length - 1;
      return {
        lesson,
        index: i,
        title: chapterOf.get(lesson.chapter_id)!.title,
        kind: last && lessons.length > 3 ? 'boss' : (i + 1) % 4 === 0 ? 'mini_boss' : 'normal',
        progress: progress[lesson.id],
        unlocked: i === 0 || (prev?.stars ?? 0) >= 1
      } satisfies MapNode;
    });
  }, [curriculum, progress]);

  const currentIdx = useMemo(() => {
    const i = nodes.findIndex((n) => n.unlocked && (n.progress?.stars ?? 0) < 1);
    return i === -1 ? Math.max(0, nodes.length - 1) : i;
  }, [nodes]);

  const totalStudyStars = nodes.reduce((a, n) => a + (n.progress?.stars ?? 0), 0);
  const cleared = nodes.filter((n) => (n.progress?.stars ?? 0) >= 1).length;

  const mascotText = useMemo(() => {
    if (!nodes.length) return MASCOT_FALLBACK;
    if (student.isGuest) return 'Hãy tạo biệt danh để lưu sao và mở các ải tiếp theo nhé!';
    if (cleared === nodes.length) return 'Tuyệt vời! Bạn đã phá đảo cả vùng đất này rồi! 🎉';
    const nextBoss = nodes.findIndex((n, i) => i >= currentIdx && n.kind !== 'normal');
    if (nextBoss > currentIdx) {
      return `Cố lên! Còn ${nextBoss - currentIdx} ải nữa là tới ${
        nodes[nextBoss].kind === 'boss' ? 'hòn đảo Trùm Cuối' : 'đảo Kho Báu Giữa Chặng'
      } rồi!`;
    }
    if (cleared === 0) return 'Bắt đầu từ Ải 1 nhé! Đạt từ 1 sao là mở ải tiếp theo.';
    return 'Đạt 3 sao để lấy điểm tuyệt đối. Bạn làm được mà!';
  }, [nodes, currentIdx, cleared, student.isGuest]);

  const H = TOP * 2 + Math.max(0, nodes.length - 1) * STEP;
  const pathD = useMemo(() => {
    if (nodes.length < 2) return '';
    let d = `M ${pos(0).x} ${pos(0).y}`;
    for (let i = 1; i < nodes.length; i++) {
      const a = pos(i - 1),
        b = pos(i);
      d += ` C ${a.x} ${a.y + STEP / 2}, ${b.x} ${b.y - STEP / 2}, ${b.x} ${b.y}`;
    }
    return d;
  }, [nodes.length]);

  const sel = selected !== null ? nodes[selected] : null;
  const starsRow = (n: number, cls = 'w-5 h-5') => (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((k) => (
        <StarIcon key={k} className={`${cls} ${k <= n ? '' : 'opacity-25 grayscale'}`} />
      ))}
    </span>
  );

  const realmPoints = getRealmExplorationPoints(activeRealm, worldSave);
  const realmDiscoveredCount = activeRealm.landmarks.filter((l) =>
    worldSave.discoveredLandmarks.includes(l.id)
  ).length;

  return (
    <div
      className={`hsv-adventure-map mx-auto px-3 sm:px-4 py-3 sm:py-5 space-y-3 sm:space-y-4 ${
        mapMode === 'world' ? 'max-w-[1360px]' : 'max-w-3xl'
      }`}
    >
      {/* Unified Header */}
      <header className="rounded-3xl p-4 sm:p-5 text-white shadow-xl bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-600 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-3xl font-black">Bản Đồ Thám Hiểm</h1>
            <p className="text-xs sm:text-sm text-white/90">
              {mapMode === 'world'
                ? 'Hành trình khám phá 6 vùng đất 2.5D — tìm kho báu, làm nhiệm vụ vui & mở khóa vùng mới tự do!'
                : 'Vượt từng hòn đảo kiến thức theo môn học, gom sao và leo bảng vàng!'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-900/30 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setMapMode('world');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  mapMode === 'world' ? 'bg-white text-sky-700 shadow' : 'text-white/90 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" /> Thế Giới 6 Vùng
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setMapMode('study');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  mapMode === 'study' ? 'bg-white text-sky-700 shadow' : 'text-white/90 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Đảo Kiến Thức
              </button>
            </div>

            {mapMode === 'world' && (
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setAlbumOpen(true);
                }}
                className="px-3 py-2 rounded-xl bg-amber-300 text-slate-900 font-black text-xs sm:text-sm inline-flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4" /> Bộ Sưu Tập
              </button>
            )}

            {mapMode === 'study' && subjectKey && gradeOpen && (
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setShowBoard(true);
                }}
                className="px-3 py-2 rounded-xl bg-amber-300 text-slate-900 font-black text-xs sm:text-sm inline-flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer whitespace-nowrap"
              >
                <Trophy className="w-4 h-4" /> Top 10
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const next = !music;
                setMusic(next);
                mapAudio.setEnabled(next);
                soundManager.play('click');
              }}
              aria-pressed={music}
              aria-label={music ? 'Tắt nhạc bản đồ' : 'Bật nhạc bản đồ'}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer"
            >
              {music ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mapMode === 'study' ? (
          <MapHUD
            subjectId={subjectId}
            grade={grade}
            onChange={(s, g) => {
              soundManager.play('click');
              setSubjectId(s);
              setGrade(g);
            }}
          />
        ) : (
          /* 6-Realm Progression Strip */
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {ADVENTURE_REALMS.map((r) => {
              const unlocked = worldSave.unlockedRealms.includes(r.id);
              const active = r.id === activeRealm.id;
              const readyToUnlock = !unlocked && totalExplorationPoints >= r.unlockRequirement;
              const badgeDone = r.landmarks.every((l) => worldSave.discoveredLandmarks.includes(l.id));

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectRealm(r.id)}
                  className={`shrink-0 px-3 py-2 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-2 border ${
                    active
                      ? 'bg-white text-slate-900 border-white shadow-lg'
                      : unlocked
                      ? 'bg-white/18 text-white border-white/25 hover:bg-white/28'
                      : readyToUnlock
                      ? 'bg-amber-300 text-slate-900 border-amber-200 shadow animate-pulse'
                      : 'bg-slate-900/30 text-white/75 border-white/15 hover:bg-slate-900/45'
                  }`}
                >
                  <span className="text-xs font-black tabular-nums">{r.code}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-black whitespace-nowrap flex items-center gap-1">
                      <span>{r.shortName}</span>
                      {badgeDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {!unlocked && !readyToUnlock && <Lock className="w-3 h-3 opacity-80" />}
                      {readyToUnlock && <Unlock className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                    {!unlocked && (
                      <div className="text-[10px] font-bold opacity-85 whitespace-nowrap tabular-nums">
                        {readyToUnlock ? 'Bấm để mở khóa!' : `Cần ${r.unlockRequirement} điểm`}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* WORLD MODE: 6-Realm 2.5D Isometric Exploration */}
      {mapMode === 'world' ? (
        <div className="space-y-3">
          {/* Status + Realm Exploration Progress Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={VUI_BOT_GUIDE}
                alt="Vui-Bot thám hiểm"
                className="w-12 h-12 rounded-2xl object-contain shrink-0 border border-sky-200 dark:border-slate-700 bg-sky-50 dark:bg-slate-800 p-0.5"
              />
              <div>
                <div className="text-sm font-black text-slate-900 dark:text-white">
                  {activeRealm.code}. {activeRealm.name}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{activeRealm.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-200 tabular-nums">
              <span>Tiến độ vùng: {realmPoints}/8</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Huy hiệu: {totalExplorerBadges}/6</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-black">
                <StarIcon className="w-4 h-4" /> {worldSave.adventureStars} Sao Thám Hiểm
              </span>
            </div>
          </div>

          {toastMsg && (
            <div
              role="status"
              className="px-4 py-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 text-sm font-bold flex items-center justify-between gap-2 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                {toastMsg}
              </span>
              <button
                type="button"
                onClick={() => setToastMsg(null)}
                aria-label="Đóng thông báo"
                className="p-1 rounded-lg hover:bg-amber-200/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main 2.5D Isometric Exploration Stage */}
          <IsometricWorldStage
            student={student}
            realm={activeRealm}
            save={worldSave}
            onSelectLandmark={(lm) => setSelectedLandmark(lm)}
            onCollectSecret={handleCollectSecret}
            onTalkNpc={() => setNpcOpen(true)}
            onOpenChest={handleOpenChest}
            onPortalActivate={handlePortalActivate}
          />

          {/* Exploration Checklist & Secret Relics Clues Below Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900 dark:text-white">
                  Hoạt động tại {activeRealm.shortName}
                </h2>
                <span className="text-xs font-bold text-sky-600 tabular-nums">
                  {realmDiscoveredCount}/3 địa điểm
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeRealm.landmarks.map((lm) => {
                  const done = worldSave.discoveredLandmarks.includes(lm.id);
                  return (
                    <button
                      key={lm.id}
                      type="button"
                      onClick={() => {
                        soundManager.play('click');
                        setSelectedLandmark(lm);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        done
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-sky-400'
                      }`}
                    >
                      <div className="text-xs font-black text-slate-900 dark:text-white flex items-center justify-between gap-1">
                        <span className="truncate">{lm.name}</span>
                        {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{lm.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900 dark:text-white">
                  Gợi ý tìm 3 vật phẩm bí mật
                </h2>
                <span className="text-xs font-bold text-amber-600 tabular-nums">
                  {activeRealm.secrets.filter((s) => worldSave.collectedSecrets.includes(s.id)).length}/3 đã tìm
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeRealm.secrets.map((sec) => {
                  const found = worldSave.collectedSecrets.includes(sec.id);
                  return (
                    <div
                      key={sec.id}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                        found
                          ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
                          : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className={found ? '' : 'opacity-65'}>
                        <SecretItemArt item={sec} className="w-7 h-7 shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {found ? `✓ ${sec.name}` : sec.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {found ? 'Đã nằm trong Bộ Sưu Tập' : sec.hint}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <LandmarkModal
            realm={activeRealm}
            landmark={selectedLandmark}
            discovered={selectedLandmark ? worldSave.discoveredLandmarks.includes(selectedLandmark.id) : false}
            discoveredCountInRealm={realmDiscoveredCount}
            onDiscover={handleDiscoverLandmark}
            onClose={() => setSelectedLandmark(null)}
          />

          <NpcQuestModal
            realm={activeRealm}
            open={npcOpen}
            completed={worldSave.completedNpcs.includes(activeRealm.npc.id)}
            onComplete={handleCompleteNpcQuest}
            onClose={() => setNpcOpen(false)}
          />

          <ChestRewardModal
            realm={activeRealm}
            open={chestModalOpen}
            onClose={() => setChestModalOpen(false)}
          />

          <CollectionAlbumModal
            open={albumOpen}
            save={worldSave}
            onSelectRealm={(rId) => handleSelectRealm(rId)}
            onClose={() => setAlbumOpen(false)}
          />
        </div>
      ) : (
        /* STUDY MODE: Original Curriculum Island Progression */
        <>
          {!gradeOpen ? (
            <FogOfWar title={`${subject?.name ?? 'Môn này'} · Lớp ${grade}`} />
          ) : loadError ? (
            <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 text-sm">
              Không tải được bản đồ: {loadError}
            </div>
          ) : !curriculum ? (
            <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin" /> Đang vẽ bản đồ…
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <img
                  src={VUI_BOT_GUIDE}
                  alt="Vui-Bot hướng dẫn bản đồ"
                  className="w-14 h-14 rounded-2xl object-contain shrink-0 border border-blue-200 dark:border-slate-700 bg-sky-50 dark:bg-slate-800 p-0.5"
                />
                <div className="relative flex-1 text-sm font-semibold bg-sky-50 dark:bg-slate-800 rounded-2xl px-3 py-2">
                  {mascotText}
                </div>
                <div className="text-right shrink-0 text-xs font-bold text-slate-500 tabular-nums">
                  <div className="inline-flex items-center gap-1 text-amber-600 text-sm">
                    <StarIcon className="w-4 h-4" /> {totalStudyStars}/{nodes.length * 3}
                  </div>
                  <div>
                    {cleared}/{nodes.length} ải
                  </div>
                </div>
              </div>

              <div className="hsv-map-scroll rounded-3xl border-4 border-white dark:border-slate-700 shadow-xl">
                <div className="hsv-map-canvas relative overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
                  <MapScenery nodeCount={nodes.length} width={W} height={H} top={TOP} step={STEP} />
                  <MapCritters nodeCount={nodes.length} width={W} height={H} top={TOP} step={STEP} />
                  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden>
                    <path d={pathD} fill="none" stroke="#fef3c7" strokeWidth="20" strokeLinecap="round" opacity=".95" />
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="1 13"
                    />
                  </svg>

                  {nodes.map((n) => {
                    if (n.index % 4 !== 0) return null;
                    const { y } = pos(n.index);
                    return (
                      <div
                        key={`b${n.index}`}
                        className="absolute left-2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/85 text-[11px] font-black text-slate-700 shadow"
                        style={{ top: `${((y - 58) / H) * 100}%` }}
                      >
                        {BIOMES[Math.floor(n.index / 4) % BIOMES.length].name}
                      </div>
                    );
                  })}

                  {nodes.map((n) => {
                    const { x, y } = pos(n.index);
                    const stars = n.progress?.stars ?? 0;
                    const isCurrent = n.index === currentIdx && n.unlocked;
                    const big = n.kind === 'boss';
                    return (
                      <div
                        key={n.lesson.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                      >
                        {isCurrent && (
                          <div
                            className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center"
                            aria-hidden
                          >
                            <img src={VUI_BOT_HAPPY} alt="" className="w-13 h-13 object-contain drop-shadow-lg hsv-anim-hop" />
                            <span className="mt-0.5 text-[10px] font-black bg-amber-300 text-slate-900 rounded-full px-1.5 shadow">
                              Bạn ở đây
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            soundManager.play(n.unlocked ? 'click' : 'wrong');
                            setSelected(n.index);
                          }}
                          aria-label={`Ải ${n.index + 1}: ${n.title}${n.unlocked ? '' : ' (chưa mở)'}`}
                          className={`relative block transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
                            big ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-20 h-20 sm:w-24 sm:h-24'
                          } ${isCurrent ? 'drop-shadow-[0_0_12px_rgba(251,191,36,.95)]' : 'drop-shadow-md'}`}
                        >
                          <IslandArt
                            biome={biomeFor(n.index)}
                            kind={n.kind}
                            locked={!n.unlocked}
                            cleared={stars >= 1}
                            className="w-full h-full"
                          />
                          <span
                            className={`absolute left-1/2 -translate-x-1/2 top-0 min-w-7 h-7 px-1 rounded-full border-2 border-white text-xs font-black flex items-center justify-center text-white shadow ${
                              n.unlocked
                                ? n.kind === 'boss'
                                  ? 'bg-orange-500'
                                  : n.kind === 'mini_boss'
                                  ? 'bg-fuchsia-500'
                                  : 'bg-sky-600'
                                : 'bg-slate-500'
                            }`}
                          >
                            {n.unlocked ? n.kind === 'boss' ? '👑' : n.index + 1 : <Lock className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                        {n.unlocked && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 flex gap-0.5">
                            {[1, 2, 3].map((k) => (
                              <StarIcon
                                key={k}
                                className={`w-4 h-4 drop-shadow ${k <= stars ? 'hsv-anim-pop' : 'opacity-30 grayscale'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {sel && (
            <div
              className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-slate-900/50 p-0 sm:p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wide text-sky-600">
                      Ải {sel.index + 1}
                      {sel.kind === 'boss'
                        ? ' · Trùm cuối'
                        : sel.kind === 'mini_boss'
                        ? ' · Kho báu giữa chặng'
                        : ''}
                    </span>
                    <h2 className="text-xl font-black leading-snug">{sel.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Đóng"
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {starsRow(sel.progress?.stars ?? 0, 'w-6 h-6')}
                  {sel.progress && (
                    <span className="text-slate-500">
                      Tốt nhất {sel.progress.bestCorrect}/{sel.progress.total} · {sel.progress.attempts} lượt
                    </span>
                  )}
                </div>
                {!!sel.lesson.learning_material.concepts?.length && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    💡 {sel.lesson.learning_material.concepts.slice(0, 3).join(' · ')}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  15 câu trộn mọi mức độ, 60 giây mỗi câu. Đúng từ 60% được 1 sao, 80% được 2 sao, 100% được 3 sao.
                </p>
                {sel.unlocked ? (
                  <button
                    onClick={() => {
                      if (student.isGuest) {
                        onRequireLogin?.();
                        return;
                      }
                      soundManager.play('click');
                      onStartNode(subjectId, grade, sel.lesson.code);
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black inline-flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5" /> {student.isGuest ? 'Đăng ký để vào ải' : sel.progress ? 'Chơi lại' : 'Vào ải'}
                  </button>
                ) : (
                  <div className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm font-bold text-center">
                    🔒 Đạt ít nhất 1 sao ở ải trước để mở
                  </div>
                )}
              </div>
            </div>
          )}

          {subjectKey && (
            <AdventureLeaderboardModal
              open={showBoard}
              onClose={() => setShowBoard(false)}
              subject={subjectKey}
              grade={grade}
              label={subject?.name ?? ''}
            />
          )}
        </>
      )}
    </div>
  );
};
