import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AvatarConfig, StudentProfile } from '../types';
import {
  DESTINATIONS,
  EMOTE_STICKERS,
  QUICK_CHAT_PRESETS
} from '../data/destinations';
import { getLevelProgress, getRankTier, levelFromXp } from '../data/levels';
import {
  claimCityTriviaBonus,
  dmBlock,
  fetchLobbyMessages,
  reportLobbyMessage,
  saveAvatar,
  sendLobbyMessage,
  dmUnreadCount,
  type HubState,
  type LobbyMessage
} from '../lib/api';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getVisitorId } from '../lib/presence';
import { soundManager } from '../utils/audio';
import { DirectMessages, type DmPeer } from './DirectMessages';
import { AvatarRenderer } from './AvatarRenderer';
import { City3DLandmark } from './City3DLandmark';
import { CoinIcon } from './GameIcons';
import { VuiBotMascot } from './VuiBotMascot';
import {
  VAN_MIEU_ZONES,
  loadWorldSave,
  saveWorldSave,
  type FishSpecies,
  type VanMieuNpc,
  type VanMieuWorldSave,
  type VanMieuZoneId
} from '../data/vanMieuWorld';
import {
  VanMieuInteractiveLayer,
  VanMieuMiniMap,
  VanMieuToyboxModal,
  VanMieuFunQuestsModal,
  FairyMemoryGameModal,
  VanMieuFunRankModal,
  TREASURE_NODES,
  getTodayKey,
  loadVanMieuStats,
  saveVanMieuStats,
  type LightingMode,
  type AvatarScaleMode,
  type ToyId,
  type TrailColorId,
  type FloatingLantern,
  type BalloonBurst,
  type DrumRipple,
  type AmbientCritter,
  type TreasureItem,
  type VanMieuStats
} from './lobby/VanMieuFreeplay';
import { VanMieuOAnQuanModal } from './lobby/VanMieuOAnQuanModal';
import { VanMieuTugOfWarModal } from './lobby/VanMieuTugOfWarModal';
import { VanMieuObstacleRaceModal } from './lobby/VanMieuObstacleRaceModal';
import { VanMieuPetZoneModal } from './lobby/VanMieuPetZoneModal';
import { VanMieuFishingHouseModal } from './lobby/VanMieuFishingHouseModal';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  Backpack,
  Ban,
  CalendarCheck,
  Compass,
  Flag,
  Gift,
  Heart,
  HelpCircle,
  Home,
  Loader2,
  MapPin,
  MessageCircle,
  Moon,
  Music,
  Plane,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Store,
  Sun,
  Sunset,
  Trophy,
  Users,
  X,
  Zap
} from 'lucide-react';

interface PeerPresence {
  id: string;
  alias: string;
  level: number;
  rankTitle: string;
  avatarConfig: AvatarConfig;
  x: number;
  y: number;
  facing: 1 | -1;
  isGuest?: boolean;
  updatedAt: number;
}

interface FloatingBubble {
  text: string;
  kind: 'quick' | 'text' | 'emote';
  symbol?: string;
  expiresAt: number;
}

interface FootstepSpark {
  id: string;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

interface SocialLobbyViewProps {
  student: StudentProfile;
  hubState: HubState | null;
  cityOnlineCounts: Record<string, number>;
  onUpdateStudent: (updated: StudentProfile) => void;
  onHubStateChange: (updater: (prev: HubState | null) => HubState | null) => void;
  onOpenTravel: () => void;
  onOpenLevel: () => void;
  onNavigateToBlitz: () => void;
  onNavigateToShop: () => void;
  onRequireLogin: () => void;
}

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

const TRAIL_SPARK_PALETTE: Record<TrailColorId, string[]> = {
  none: [],
  rainbow: ['#fb7185', '#facc15', '#34d399', '#38bdf8', '#c084fc'],
  gold: ['#fde047', '#facc15', '#fb923c'],
  sakura: ['#fbcfe8', '#f472b6', '#fb7185'],
  cyan: ['#67e8f9', '#22d3ee', '#38bdf8']
};

const makeInitialCritters = (lighting: LightingMode): AmbientCritter[] => {
  const isNight = lighting === 'night';
  const coords = [
    [28, 63],
    [40, 68],
    [60, 66],
    [72, 62]
  ];
  const colors = isNight
    ? ['#fde047', '#a3e635', '#67e8f9', '#fef08a']
    : ['#fb7185', '#38bdf8', '#facc15', '#c084fc'];
  return coords.map(([x, y], idx) => ({
    id: `critter_${idx}_${Date.now()}`,
    x,
    y,
    kind: isNight ? 'firefly' : 'butterfly',
    color: colors[idx % colors.length]
  }));
};

export const SocialLobbyView: React.FC<SocialLobbyViewProps> = ({
  student,
  hubState,
  cityOnlineCounts,
  onUpdateStudent,
  onHubStateChange,
  onOpenTravel,
  onOpenLevel,
  onNavigateToBlitz,
  onNavigateToShop,
  onRequireLogin
}) => {
  const currentDestKey = hubState?.current_dest || 'hanoi_school';
  const isVanMieu = currentDestKey === 'hanoi_school';
  const currentCity = useMemo(
    () => DESTINATIONS.find((d) => d.destKey === currentDestKey) ?? DESTINATIONS[0],
    [currentDestKey]
  );

  const progress = getLevelProgress(hubState?.xp ?? student.exp);
  const myRank = progress.rank;
  const selfId = student.isGuest ? `guest:${getVisitorId()}` : student.id;
  const roomKey = `city:${currentDestKey}:1`;

  // Avatar position on 2.5D plaza (%)
  const [pos, setPos] = useState<{ x: number; y: number; facing: 1 | -1 }>({
    x: 50,
    y: 74,
    facing: 1
  });
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const [isWalking, setIsWalking] = useState(false);

  // Văn Miếu Freeplay playground & 4-zone world state
  const [activeZone, setActiveZone] = useState<VanMieuZoneId>('heritage_plaza');
  const [selectedNpc, setSelectedNpc] = useState<VanMieuNpc | null>(null);
  const [lighting, setLighting] = useState<LightingMode>('day');
  const [drumCombo, setDrumCombo] = useState(0);
  const [drumShaking, setDrumShaking] = useState(false);
  const [drumRipples, setDrumRipples] = useState<DrumRipple[]>([]);
  const [lanterns, setLanterns] = useState<FloatingLantern[]>([
    { id: 'init_l1', x: 32, y: 58, alias: 'Vui-Bot', color: '#fbbf24', createdAt: Date.now() },
    { id: 'init_l2', x: 67, y: 57, alias: 'Học Siêu Vui', color: '#fb7185', createdAt: Date.now() }
  ]);
  const [balloonBursts, setBalloonBursts] = useState<BalloonBurst[]>([]);
  const [critters, setCritters] = useState<AmbientCritter[]>(() => makeInitialCritters('day'));
  const [catWaving, setCatWaving] = useState(false);
  const [lawnBallActive, setLawnBallActive] = useState(false);
  const [stageDanceActive, setStageDanceActive] = useState(false);
  const [activeTrail, setActiveTrail] = useState<TrailColorId>('rainbow');
  const [footstepSparks, setFootstepSparks] = useState<FootstepSpark[]>([]);
  const [tugPeerPullDelta, setTugPeerPullDelta] = useState(0);

  // Jump, scale & splash effects (local + peers via broadcast)
  const [jumpingIds, setJumpingIds] = useState<Record<string, boolean>>({});
  const [actorScales, setActorScales] = useState<Record<string, AvatarScaleMode>>({});
  const [actorSplashes, setActorSplashes] = useState<Record<string, boolean>>({});

  // Daily Freeplay Stats, Persistent World Save & Mini-Game Modals
  const [vanMieuStats, setVanMieuStats] = useState<VanMieuStats>(() =>
    loadVanMieuStats(student.id)
  );
  const [worldSave, setWorldSave] = useState<VanMieuWorldSave>(() => loadWorldSave(student.id));
  const [isToyboxOpen, setIsToyboxOpen] = useState(false);
  const [isFunQuestsOpen, setIsFunQuestsOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [isFunRankOpen, setIsFunRankOpen] = useState(false);
  const [isOAnQuanOpen, setIsOAnQuanOpen] = useState(false);
  const [isTugOfWarOpen, setIsTugOfWarOpen] = useState(false);
  const [isObstacleOpen, setIsObstacleOpen] = useState(false);
  const [petZoneTab, setPetZoneTab] = useState<'care' | 'race' | null>(null);
  const [fishingHouseTab, setFishingHouseTab] = useState<'fishing' | 'house' | null>(null);
  const [isEmoteTrayOpen, setIsEmoteTrayOpen] = useState(false);

  useEffect(() => {
    setVanMieuStats(loadVanMieuStats(student.id));
    setWorldSave(loadWorldSave(student.id));
  }, [student.id]);

  const updateStats = useCallback(
    (updater: (prev: VanMieuStats) => VanMieuStats) => {
      setVanMieuStats((prev) => {
        const next = updater(prev);
        saveVanMieuStats(student.id, next);
        return next;
      });
    },
    [student.id]
  );

  const updateWorldSave = useCallback(
    (updater: (prev: VanMieuWorldSave) => VanMieuWorldSave) => {
      setWorldSave((prev) => {
        const next = updater(prev);
        saveWorldSave(student.id, next);
        return next;
      });
    },
    [student.id]
  );

  // Realtime state
  const [peers, setPeers] = useState<Record<string, PeerPresence>>({});
  const [bubbles, setBubbles] = useState<Record<string, FloatingBubble>>({});
  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [chatTab, setChatTab] = useState<'quick' | 'free'>('quick');
  const [draftText, setDraftText] = useState('');
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [reportedIds, setReportedIds] = useState<Record<string, boolean>>({});

  // Interactive overlays
  const [selectedPeer, setSelectedPeer] = useState<PeerPresence | null>(null);
  const [isTriviaOpen, setIsTriviaOpen] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);
  const [dmPeer, setDmPeer] = useState<DmPeer | null>(null);
  const [dmUnread, setDmUnread] = useState(0);
  const canDm = !student.isGuest && isSupabaseConfigured;

  useEffect(() => {
    if (!canDm) return;
    let alive = true;
    const poll = () => {
      if (document.visibilityState === 'visible' && !dmOpen) {
        void dmUnreadCount()
          .then((n) => alive && setDmUnread(n))
          .catch(() => undefined);
      }
    };
    poll();
    const t = window.setInterval(poll, 20000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, [canDm, dmOpen]);

  const [triviaPicked, setTriviaPicked] = useState<number | null>(null);
  const [triviaStatus, setTriviaStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [triviaBusy, setTriviaBusy] = useState(false);
  const [triviaNotice, setTriviaNotice] = useState('');

  const stageRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastMoveBroadcastRef = useRef<number>(0);
  const lastSparkRef = useRef<number>(0);
  const walkTimerRef = useRef<number | null>(null);

  const showToast = useCallback((text: string) => {
    setToastMsg(text);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === text ? '' : prev));
    }, 3400);
  }, []);

  const setBubbleFor = useCallback((id: string, bubble: Omit<FloatingBubble, 'expiresAt'>) => {
    const expiresAt = Date.now() + (bubble.kind === 'emote' ? 3400 : 5400);
    setBubbles((prev) => ({ ...prev, [id]: { ...bubble, expiresAt } }));
  }, []);

  // Expire floating bubbles, drum ripples, balloon bursts, and footstep sparks
  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => {
        let changed = false;
        const next: Record<string, FloatingBubble> = {};
        for (const [k, v] of Object.entries(prev)) {
          if (v.expiresAt > now) next[k] = v;
          else changed = true;
        }
        return changed ? next : prev;
      });
      setDrumRipples((prev) => prev.filter((r) => now - r.createdAt < 900));
      setBalloonBursts((prev) => prev.filter((b) => now - b.createdAt < 2600));
      setFootstepSparks((prev) => prev.filter((s) => now - s.createdAt < 950));
      setLanterns((prev) => prev.slice(-14));
    }, 700);
    return () => window.clearInterval(timer);
  }, []);

  // Refresh ambient butterflies/fireflies gently when lighting changes
  useEffect(() => {
    setCritters(makeInitialCritters(lighting));
  }, [lighting]);

  // Reset position gently when entering a new city
  useEffect(() => {
    setPos({ x: currentDestKey === 'hanoi_school' ? 50 : 38 + Math.round(Math.random() * 14), y: 74, facing: 1 });
    setSelectedPeer(null);
    setIsTriviaOpen(false);
    setTriviaPicked(null);
    setTriviaStatus('idle');
    setTriviaNotice('');
  }, [currentDestKey]);

  // Load recent server-filtered chat messages for current destination room
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    setLoadingMsgs(true);
    fetchLobbyMessages(roomKey)
      .then((rows) => {
        if (!cancelled) setMessages(rows);
      })
      .catch(() => {
        if (!cancelled) setMessages([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingMsgs(false);
      });
    return () => {
      cancelled = true;
    };
  }, [roomKey]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  const triggerActorJump = useCallback((actorId: string) => {
    setJumpingIds((prev) => ({ ...prev, [actorId]: true }));
    window.setTimeout(() => {
      setJumpingIds((prev) => ({ ...prev, [actorId]: false }));
    }, 460);
  }, []);

  // Subscribe to real Supabase Realtime Presence + Broadcast for the current city room
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channelName = `hsv-lobby:${currentDestKey}:1`;
    const channel = supabase.channel(channelName, {
      config: { presence: { key: selfId } }
    });
    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PeerPresence>();
        const mapped: Record<string, PeerPresence> = {};
        for (const [key, list] of Object.entries(state)) {
          if (key === selfId || !Array.isArray(list) || list.length === 0) continue;
          const latest = list[list.length - 1];
          if (latest && latest.alias) {
            mapped[key] = latest;
          }
        }
        setPeers(mapped);
      })
      .on('broadcast', { event: 'move' }, ({ payload }) => {
        if (!payload || payload.id === selfId) return;
        setPeers((prev) => {
          const existing = prev[payload.id];
          if (!existing) return prev;
          return {
            ...prev,
            [payload.id]: {
              ...existing,
              x: clamp(Number(payload.x) || existing.x, 8, 90),
              y: clamp(Number(payload.y) || existing.y, 52, 90),
              facing: payload.facing === -1 ? -1 : 1,
              updatedAt: Date.now()
            }
          };
        });
      })
      .on('broadcast', { event: 'speech' }, ({ payload }) => {
        if (!payload || !payload.id) return;
        if (payload.id !== selfId) {
          soundManager.play('chat');
        }
        setBubbleFor(payload.id, {
          text: String(payload.text || ''),
          kind: payload.kind === 'emote' ? 'emote' : 'text',
          symbol: payload.symbol ? String(payload.symbol) : undefined
        });
      })
      .on('broadcast', { event: 'chat_msg' }, ({ payload }) => {
        const row = payload as LobbyMessage | undefined;
        if (!row || !row.id) return;
        setMessages((prev) => {
          if (prev.some((m) => m.id === row.id)) return prev;
          return [...prev.slice(-39), row];
        });
      })
      .on('broadcast', { event: 'wave' }, ({ payload }) => {
        if (!payload || payload.toId !== selfId) return;
        soundManager.play('coin');
        const symbol = payload.kind === 'heart' ? '❤️' : '👋';
        const verb = payload.kind === 'heart' ? 'vừa thả tim cho bạn' : 'vừa vẫy tay chào bạn';
        showToast(`${payload.fromAlias || 'Một người bạn'} ${verb}! ${symbol}`);
        setBubbleFor(selfId, {
          text: symbol,
          kind: 'emote',
          symbol
        });
      })
      .on('broadcast', { event: 'vanmieu_jump' }, ({ payload }) => {
        if (!payload || !payload.id || payload.id === selfId) return;
        triggerActorJump(String(payload.id));
      })
      .on('broadcast', { event: 'vanmieu_drum' }, ({ payload }) => {
        if (!payload || payload.id === selfId) return;
        soundManager.play('drum');
        setDrumShaking(true);
        window.setTimeout(() => setDrumShaking(false), 260);
        const combo = Number(payload.combo) || 1;
        setDrumCombo(combo);
        setDrumRipples((prev) => [...prev, { id: `dr_${Date.now()}`, combo, createdAt: Date.now() }]);
        if (combo >= 5) {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.45 } });
          showToast(`${payload.alias || 'Bạn cùng phòng'} vừa gõ đủ 5 nhịp Trống Khai Hội! 🎉`);
        }
      })
      .on('broadcast', { event: 'vanmieu_lantern' }, ({ payload }) => {
        if (!payload || payload.id === selfId) return;
        setLanterns((prev) => [
          ...prev.slice(-13),
          {
            id: `ln_${Date.now()}_${Math.random()}`,
            x: clamp(Number(payload.x) || 34, 24, 76),
            y: clamp(Number(payload.y) || 58, 54, 62),
            alias: String(payload.alias || 'Bạn'),
            color: String(payload.color || '#fbbf24'),
            createdAt: Date.now()
          }
        ]);
      })
      .on('broadcast', { event: 'vanmieu_toy' }, ({ payload }) => {
        if (!payload || !payload.id || payload.id === selfId) return;
        const pid = String(payload.id);
        const toy = String(payload.toy) as ToyId;
        if (toy === 'giant_candy' || toy === 'tiny_candy') {
          const mode: AvatarScaleMode = toy === 'giant_candy' ? 'giant' : 'tiny';
          setActorScales((prev) => ({ ...prev, [pid]: mode }));
          window.setTimeout(() => {
            setActorScales((prev) => ({ ...prev, [pid]: 'normal' }));
          }, 20000);
        } else if (toy === 'water_balloon') {
          setActorSplashes((prev) => ({ ...prev, [pid]: true }));
          window.setTimeout(() => {
            setActorSplashes((prev) => ({ ...prev, [pid]: false }));
          }, 12000);
          } else if (toy === 'balloons') {
          setBalloonBursts((prev) => [
            ...prev,
            { id: `bb_${Date.now()}`, x: Number(payload.x) || 50, y: Number(payload.y) || 70, createdAt: Date.now() }
          ]);
        }
      })
      .on('broadcast', { event: 'vanmieu_tug' }, ({ payload }) => {
        if (!payload || payload.id === selfId) return;
        setTugPeerPullDelta((d) => d + (Number(payload.power) || 4));
      })
      .on('broadcast', { event: 'vanmieu_dance' }, ({ payload }) => {
        if (!payload || payload.id === selfId) return;
        triggerActorJump(String(payload.id));
        setBubbleFor(String(payload.id), { text: '💃 Nhảy Vũ Hội!', kind: 'emote', symbol: '💃' });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            id: selfId,
            alias: student.name,
            level: progress.level,
            rankTitle: myRank.title,
            avatarConfig: student.avatarConfig,
            x: pos.x,
            y: pos.y,
            facing: pos.facing,
            isGuest: student.isGuest,
            updatedAt: Date.now()
          } satisfies PeerPresence);
        }
      });

    return () => {
      channelRef.current = null;
      void supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDestKey, selfId, student.name, progress.level, student.avatarConfig, student.isGuest]);

  const moveSelfTo = useCallback(
    (nextX: number, nextY: number) => {
      const clampedX = clamp(Math.round(nextX * 10) / 10, 8, 90);
      const clampedY = clamp(Math.round(nextY * 10) / 10, 52, 88);

      setPos((prev) => {
        const facing: 1 | -1 = clampedX < prev.x - 0.5 ? -1 : clampedX > prev.x + 0.5 ? 1 : prev.facing;
        return { x: clampedX, y: clampedY, facing };
      });

      setIsWalking(true);
      if (walkTimerRef.current) window.clearTimeout(walkTimerRef.current);
      walkTimerRef.current = window.setTimeout(() => setIsWalking(false), 450);

      const now = Date.now();
      if (isVanMieu && activeTrail !== 'none' && now - lastSparkRef.current >= 120) {
        lastSparkRef.current = now;
        const palette = TRAIL_SPARK_PALETTE[activeTrail];
        const color = palette[Math.floor(Math.random() * palette.length)] || '#facc15';
        setFootstepSparks((prev) => [
          ...prev.slice(-14),
          { id: `sp_${now}_${Math.random()}`, x: clampedX, y: clampedY, color, createdAt: now }
        ]);
      }

      if (channelRef.current && now - lastMoveBroadcastRef.current >= 110) {
        lastMoveBroadcastRef.current = now;
        const facing: 1 | -1 = clampedX < pos.x - 0.5 ? -1 : 1;
        void channelRef.current.send({
          type: 'broadcast',
          event: 'move',
          payload: { id: selfId, x: clampedX, y: clampedY, facing }
        });
      }
    },
    [activeTrail, isVanMieu, pos.x, selfId]
  );

  const handleSelfJump = useCallback(() => {
    soundManager.play('jump');
    triggerActorJump(selfId);
    if (channelRef.current) {
      void channelRef.current.send({
        type: 'broadcast',
        event: 'vanmieu_jump',
        payload: { id: selfId }
      });
    }
  }, [selfId, triggerActorJump]);

  // Keyboard navigation (WASD / Arrows / Space to Jump) when not typing
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      const step = 4.5;
      if (e.key === ' ') {
        e.preventDefault();
        handleSelfJump();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        moveSelfTo(pos.x - step, pos.y);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        moveSelfTo(pos.x + step, pos.y);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        moveSelfTo(pos.x, pos.y - step);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        moveSelfTo(pos.x, pos.y + step);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSelfJump, moveSelfTo, pos.x, pos.y]);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, [data-interactive="true"]')) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const viewportXPct = ((e.clientX - rect.left) / rect.width) * 100;
    const cameraLeft = Math.max(-110, Math.min(0, 50 - pos.x * 2.1));
    const xPct = window.matchMedia('(max-width: 767px)').matches
      ? (viewportXPct - cameraLeft) / 2.1
      : viewportXPct;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const targetX = clamp(xPct, 8, 90);
    const targetY = clamp(yPct, 52, 88);
    setClickRipple({ x: targetX, y: targetY, key: Date.now() });
    moveSelfTo(targetX, targetY);
  };

  // Touch drag steering
  const draggingRef = useRef(false);
  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('button, [data-interactive="true"]')) return;
    draggingRef.current = true;
  };
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const viewportXPct = ((e.clientX - rect.left) / rect.width) * 100;
    const cameraLeft = Math.max(-110, Math.min(0, 50 - pos.x * 2.1));
    const worldXPct = window.matchMedia('(max-width: 767px)').matches
      ? (viewportXPct - cameraLeft) / 2.1
      : viewportXPct;
    moveSelfTo(worldXPct, ((e.clientY - rect.top) / rect.height) * 100);
  };
  const handleStagePointerEnd = () => {
    draggingRef.current = false;
  };

  // Văn Miếu Freeplay Handlers
  const handleDrumHit = () => {
    soundManager.play('drum');
    moveSelfTo(20, 62);
    setDrumShaking(true);
    window.setTimeout(() => setDrumShaking(false), 260);
    const nextCombo = drumCombo >= 5 ? 1 : drumCombo + 1;
    setDrumCombo(nextCombo);
    setDrumRipples((prev) => [...prev, { id: `dr_${Date.now()}`, combo: nextCombo, createdAt: Date.now() }]);
    updateStats((prev) => ({ ...prev, drumsHit: prev.drumsHit + 1 }));

    if (nextCombo >= 5) {
      soundManager.play('fanfare');
      confetti({ particleCount: 85, spread: 88, origin: { y: 0.45 } });
      showToast('🥁 Combo 5 tiếng Trống Khai Hội! Bùng nổ pháo hoa toàn sân!');
    }

    if (channelRef.current) {
      void channelRef.current.send({
        type: 'broadcast',
        event: 'vanmieu_drum',
        payload: { id: selfId, alias: student.name, combo: nextCombo }
      });
    }
  };

  const handleHopscotchClick = () => {
    moveSelfTo(17, 66);
    handleSelfJump();
    window.setTimeout(() => handleSelfJump(), 480);
    setBubbleFor(selfId, { text: 'Nhảy lò cò vui quá!', kind: 'text' });
  };

  const handleReleaseLantern = (pondX: number, pondY: number) => {
    soundManager.play('splash');
    moveSelfTo(pondX < 50 ? 44 : 56, 66);
    const lanternColors = ['#fbbf24', '#fb7185', '#38bdf8', '#c084fc'];
    const color = lanternColors[Math.floor(Math.random() * lanternColors.length)];
    const lx = pondX + (Math.random() * 8 - 4);
    const ly = pondY + (Math.random() * 4 - 2);
    setLanterns((prev) => [
      ...prev.slice(-13),
      { id: `ln_${Date.now()}`, x: lx, y: ly, alias: student.name, color, createdAt: Date.now() }
    ]);
    updateStats((prev) => ({ ...prev, lanternsReleased: prev.lanternsReleased + 1 }));
    showToast('🪷 Bạn vừa thả một Đèn Hoa Đăng lung linh lên Hồ Sen!');
    if (channelRef.current) {
      void channelRef.current.send({
        type: 'broadcast',
        event: 'vanmieu_lantern',
        payload: { id: selfId, alias: student.name, x: lx, y: ly, color }
      });
    }
  };

  const handleUseToy = (toyId: ToyId) => {
    updateStats((prev) => ({ ...prev, toysUsed: prev.toysUsed + 1 }));
    if (toyId === 'lantern') {
      handleReleaseLantern(Math.random() > 0.5 ? 66 : 34, 58);
    } else if (toyId === 'giant_candy' || toyId === 'tiny_candy') {
      soundManager.play('equip');
      const mode: AvatarScaleMode = toyId === 'giant_candy' ? 'giant' : 'tiny';
      setActorScales((prev) => ({ ...prev, [selfId]: mode }));
      showToast(
        mode === 'giant'
          ? '🍭 Đã ăn Kẹo Khổng Lồ! Nhân vật hóa to 20 giây!'
          : '🍬 Đã ăn Kẹo Tí Hon! Nhân vật siêu nhỏ 20 giây!'
      );
      window.setTimeout(() => {
        setActorScales((prev) => ({ ...prev, [selfId]: 'normal' }));
      }, 20000);
    } else if (toyId === 'water_balloon') {
      soundManager.play('splash');
      setActorSplashes((prev) => ({ ...prev, [selfId]: true }));
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.65 } });
      showToast('💦 Bóng Nước Cầu Vồng vỡ òa rực rỡ 12 giây!');
      window.setTimeout(() => {
        setActorSplashes((prev) => ({ ...prev, [selfId]: false }));
      }, 12000);
    } else if (toyId === 'balloons') {
      soundManager.play('jump');
      setBalloonBursts((prev) => [
        ...prev,
        { id: `bb_${Date.now()}`, x: pos.x, y: pos.y - 4, createdAt: Date.now() }
      ]);
      showToast('🎈 Thả chùm bóng bay 5 màu lên trời!');
    } else if (toyId === 'firework') {
      soundManager.play('fanfare');
      confetti({ particleCount: 95, spread: 95, origin: { y: 0.55 } });
      showToast('🎆 Pháo Hoa Cầm Tay tỏa sáng rực rỡ!');
    }

    if (channelRef.current && toyId !== 'lantern') {
      void channelRef.current.send({
        type: 'broadcast',
        event: 'vanmieu_toy',
        payload: { id: selfId, toy: toyId, x: pos.x, y: pos.y }
      });
    }
    setIsToyboxOpen(false);
  };

  const handleCatchCritter = (critter: AmbientCritter) => {
    soundManager.play('coin');
    setCritters((prev) => prev.filter((c) => c.id !== critter.id));
    updateStats((prev) => ({ ...prev, crittersCaught: prev.crittersCaught + 1 }));
    showToast(
      critter.kind === 'firefly'
        ? '✨ Bắt được chú Đom Đóm phát sáng!'
        : '🦋 Bắt được chú Bướm Sân Hội cực xinh!'
    );
    window.setTimeout(() => {
      const nextColors = lighting === 'night' ? ['#fde047', '#a3e635', '#67e8f9'] : ['#fb7185', '#38bdf8', '#facc15'];
      setCritters((prev) => [
        ...prev,
        {
          id: `critter_${Date.now()}_${Math.random()}`,
          x: 24 + Math.round(Math.random() * 52),
          y: 58 + Math.round(Math.random() * 18),
          kind: lighting === 'night' ? 'firefly' : 'butterfly',
          color: nextColors[Math.floor(Math.random() * nextColors.length)]
        }
      ]);
    }, 2400);
  };

  const handleCollectTreasure = (tr: TreasureItem) => {
    if (vanMieuStats.foundTreasures.includes(tr.id)) return;
    soundManager.play('coin');
    moveSelfTo(tr.x, Math.max(54, tr.y));
    const nextFound = [...vanMieuStats.foundTreasures, tr.id];
    updateStats((prev) => ({ ...prev, foundTreasures: nextFound }));
    if (nextFound.length >= TREASURE_NODES.length) {
      soundManager.play('fanfare');
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.55 } });
      showToast(`🎁 Tuyệt vời! Bạn đã tìm đủ ${TREASURE_NODES.length}/${TREASURE_NODES.length} Kho Báu Văn Miếu hôm nay!`);
    } else {
      showToast(`✨ Nhặt được ${tr.name}! (${nextFound.length}/${TREASURE_NODES.length})`);
    }
  };

  const handleCreativeCornerClick = () => {
    soundManager.play('coin');
    setCatWaving(true);
    window.setTimeout(() => setCatWaving(false), 700);
    setIsToyboxOpen(true);
  };

  const awardBonusStars = useCallback(
    (stars: number, message?: string) => {
      if (stars <= 0) return;
      onUpdateStudent({
        ...student,
        stars: (student.stars || 0) + stars
      });
      updateWorldSave((prev) => ({
        ...prev,
        bonusStarsEarned: prev.bonusStarsEarned + stars
      }));
      if (message) showToast(message);
    },
    [onUpdateStudent, showToast, student, updateWorldSave]
  );

  const handleSelectZone = useCallback(
    (zone: VanMieuZoneId) => {
      soundManager.play('travel');
      setActiveZone(zone);
      setSelectedNpc(null);
      setPos({ x: 50, y: 74, facing: 1 });
      const meta = VAN_MIEU_ZONES.find((z) => z.id === zone);
      if (meta) showToast(`Đã dịch chuyển tới ${meta.title}!`);
    },
    [showToast]
  );

  const handleDailyCheckIn = useCallback(() => {
    const today = getTodayKey();
    if (worldSave.lastCheckInDate === today) {
      showToast('Hôm nay bạn đã nhận quà điểm danh rồi, mai lại ghé chơi nhé!');
      return;
    }
    soundManager.play('fanfare');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    updateWorldSave((prev) => ({
      ...prev,
      lastCheckInDate: today,
      totalCheckInDays: prev.totalCheckInDays + 1
    }));
    awardBonusStars(2, 'Quà Điểm Danh hôm nay: +2 Sao trang trí! Cảm ơn bạn đã ghé Văn Miếu!');
  }, [awardBonusStars, showToast, updateWorldSave, worldSave.lastCheckInDate]);

  const handleAdoptStarterPet = useCallback(
    (petId: string) => {
      const nextConfig: AvatarConfig = {
        ...student.avatarConfig,
        petId
      };
      const nextUnlocked = student.unlockedItems.includes(petId)
        ? student.unlockedItems
        : [...student.unlockedItems, petId];
      onUpdateStudent({
        ...student,
        avatarConfig: nextConfig,
        unlockedItems: nextUnlocked,
        equippedItems: {
          ...student.equippedItems,
          pet: petId
        }
      });
      if (!student.isGuest && isSupabaseConfigured) {
        void saveAvatar(nextConfig).catch(() => undefined);
      }
      updateWorldSave((prev) => ({
        ...prev,
        adoptedStarterPetId: petId
      }));
      showToast('Tuyệt quá! Thú cưng mới đang chạy đi theo bạn khắp Văn Miếu rồi!');
    },
    [onUpdateStudent, showToast, student, updateWorldSave]
  );

  const handleThrowLawnBall = useCallback(() => {
    soundManager.play('jump');
    setLawnBallActive(true);
    moveSelfTo(53, 68);
    handleSelfJump();
    window.setTimeout(() => {
      setLawnBallActive(false);
      soundManager.play('coin');
      updateWorldSave((prev) => ({
        ...prev,
        petBallCatches: prev.petBallCatches + 1,
        petAffection: prev.petAffection + 1
      }));
      showToast('Thú cưng vừa bắt gọn quả bóng trên bãi cỏ! (+1 Thân thiết)');
    }, 850);
  }, [handleSelfJump, moveSelfTo, showToast, updateWorldSave]);

  const handleTriggerStageDance = useCallback(() => {
    soundManager.play('fanfare');
    setStageDanceActive(true);
    handleSelfJump();
    setBubbleFor(selfId, { text: '💃 Nhảy Vũ Hội!', kind: 'emote', symbol: '💃' });
    updateWorldSave((prev) => ({ ...prev, stageDances: prev.stageDances + 1 }));
    if (channelRef.current) {
      void channelRef.current.send({
        type: 'broadcast',
        event: 'vanmieu_dance',
        payload: { id: selfId }
      });
    }
    window.setTimeout(() => setStageDanceActive(false), 1800);
  }, [handleSelfJump, selfId, setBubbleFor, updateWorldSave]);

  const handleNpcAction = useCallback(
    (actionId: string) => {
      setSelectedNpc(null);
      if (actionId === 'daily_checkin') handleDailyCheckIn();
      else if (actionId === 'open_oanquan') setIsOAnQuanOpen(true);
      else if (actionId === 'open_tugofwar') setIsTugOfWarOpen(true);
      else if (actionId === 'open_pet_garden') setPetZoneTab('care');
      else if (actionId === 'open_pet_race') setPetZoneTab('race');
      else if (actionId === 'open_obstacle_race') setIsObstacleOpen(true);
      else if (actionId === 'open_fishing') setFishingHouseTab('fishing');
      else if (actionId === 'open_house') setFishingHouseTab('house');
      else if (actionId === 'open_stage_dance') handleTriggerStageDance();
      else if (actionId === 'open_shop') onNavigateToShop();
      else if (actionId === 'open_travel') onOpenTravel();
    },
    [handleDailyCheckIn, handleTriggerStageDance, onNavigateToShop, onOpenTravel]
  );

  const handleBlockPeer = useCallback(
    async (peer: PeerPresence) => {
      updateWorldSave((prev) => ({
        ...prev,
        blockedPeerIds: prev.blockedPeerIds.includes(peer.id)
          ? prev.blockedPeerIds
          : [...prev.blockedPeerIds, peer.id]
      }));
      if (!student.isGuest && !peer.id.startsWith('guest:') && isSupabaseConfigured) {
        try {
          await dmBlock(peer.id, true);
        } catch {
          // ignore if DM thread absent
        }
      }
      setSelectedPeer(null);
      showToast(`Đã ẩn & chặn tương tác từ ${peer.alias}.`);
    },
    [showToast, student.isGuest, updateWorldSave]
  );

  const handleSendMessage = async (kind: 'quick' | 'text' | 'emote', body: string, symbol?: string) => {
    setChatError('');
    if (kind === 'emote' && symbol && (student.isGuest || !isSupabaseConfigured)) {
      soundManager.play('equip');
      setBubbleFor(selfId, { text: body, kind: 'emote', symbol });
      return;
    }
    if (student.isGuest || !isSupabaseConfigured) {
      onRequireLogin();
      return;
    }
    const clean = body.trim();
    if (!clean) return;
    setSending(true);
    try {
      const saved = await sendLobbyMessage(roomKey, kind, clean);
      soundManager.play('chat');
      setMessages((prev) => [...prev.slice(-39), saved]);
      setBubbleFor(selfId, {
        text: saved.body,
        kind: kind === 'emote' ? 'emote' : 'text',
        symbol
      });
      if (kind === 'text') setDraftText('');

      if (channelRef.current) {
        await channelRef.current.send({
          type: 'broadcast',
          event: 'chat_msg',
          payload: saved
        });
        await channelRef.current.send({
          type: 'broadcast',
          event: 'speech',
          payload: {
            id: selfId,
            text: saved.body,
            kind,
            symbol
          }
        });
      }
    } catch (err) {
      soundManager.play('wrong');
      setChatError(err instanceof Error ? err.message : 'Không gửi được tin nhắn lúc này.');
    } finally {
      setSending(false);
    }
  };

  const handleReportMessage = async (msgId: string) => {
    if (student.isGuest || !isSupabaseConfigured) {
      onRequireLogin();
      return;
    }
    try {
      await reportLobbyMessage(msgId, 'Nội dung không phù hợp');
      setReportedIds((prev) => ({ ...prev, [msgId]: true }));
      showToast('Đã gửi báo cáo an toàn tới Quản trị viên.');
    } catch {
      showToast('Không thể báo cáo tin nhắn này.');
    }
  };

  const handleWaveOrHeart = async (peer: PeerPresence, kind: 'wave' | 'heart') => {
    if (student.isGuest || !isSupabaseConfigured) {
      onRequireLogin();
      return;
    }
    soundManager.play('equip');
    const symbol = kind === 'heart' ? '❤️' : '👋';
    setBubbleFor(selfId, { text: symbol, kind: 'emote', symbol });
    if (channelRef.current) {
      await channelRef.current.send({
        type: 'broadcast',
        event: 'wave',
        payload: {
          fromId: selfId,
          fromAlias: student.name,
          toId: peer.id,
          kind
        }
      });
    }
    showToast(`Đã gửi ${symbol} tới ${peer.alias}!`);
  };

  const handleAnswerTrivia = async (optIdx: number) => {
    if (triviaBusy || triviaStatus !== 'idle') return;
    setTriviaPicked(optIdx);
    const isCorrect = optIdx === currentCity.trivia.correctIndex;
    if (!isCorrect) {
      soundManager.play('wrong');
      setTriviaStatus('wrong');
      setTriviaNotice(`Chưa đúng rồi! ${currentCity.trivia.fact}`);
      return;
    }

    soundManager.play('correct');
    setTriviaStatus('correct');
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.65 } });

    if (student.isGuest || !isSupabaseConfigured) {
      setTriviaNotice('Chính xác! Đăng nhập để nhận thưởng +3 Xu & +10 XP mỗi ngày từ Vui-Bot nhé.');
      return;
    }

    setTriviaBusy(true);
    try {
      const res = await claimCityTriviaBonus(currentCity.destKey);
      if (res.already_claimed_today) {
        setTriviaNotice('Chính xác! Hôm nay bạn đã nhận quà Đố Vui địa danh rồi, mai quay lại nhé!');
      } else {
        soundManager.play('coin');
        onUpdateStudent({
          ...student,
          coins: res.coins,
          exp: res.xp,
          level: levelFromXp(res.xp)
        });
        onHubStateChange((prev) =>
          prev
            ? {
                ...prev,
                coins: res.coins,
                xp: res.xp,
                level: res.level,
                trivia_claimed_today: true
              }
            : prev
        );
        setTriviaNotice(`Tuyệt vời! Bạn nhận +${res.coins_added ?? 3} Xu & +${res.xp_added ?? 10} XP!`);
      }
    } catch (err) {
      setTriviaNotice(err instanceof Error ? err.message : 'Đáp án chính xác!');
    } finally {
      setTriviaBusy(false);
    }
  };

  const cycleLighting = () => {
    soundManager.play('click');
    setLighting((prev) => (prev === 'day' ? 'sunset' : prev === 'sunset' ? 'night' : 'day'));
  };

  // Combine self + unblocked active peers sorted by Y coordinate for natural 2.5D depth overlapping
  const blockedSet = useMemo(() => new Set(worldSave.blockedPeerIds), [worldSave.blockedPeerIds]);
  const visiblePeers = useMemo(
    () => Object.values(peers).filter((p) => !blockedSet.has(p.id)),
    [blockedSet, peers]
  );

  const renderActors = useMemo(() => {
    const selfActor: PeerPresence & { isSelf: boolean } = {
      id: selfId,
      alias: student.name,
      level: progress.level,
      rankTitle: myRank.title,
      avatarConfig: student.avatarConfig,
      x: pos.x,
      y: pos.y,
      facing: pos.facing,
      isGuest: student.isGuest,
      updatedAt: Date.now(),
      isSelf: true
    };
    const list: (PeerPresence & { isSelf: boolean })[] = [
      selfActor,
      ...visiblePeers.map((p) => ({ ...p, isSelf: false }))
    ];
    return list.sort((a, b) => a.y - b.y);
  }, [myRank.title, pos.facing, pos.x, pos.y, progress.level, selfId, student.avatarConfig, student.isGuest, student.name, visiblePeers]);

  const onlineInCity = Math.max(
    1 + visiblePeers.length,
    cityOnlineCounts[currentDestKey] ?? 0
  );

  const currentZoneMeta = useMemo(
    () => VAN_MIEU_ZONES.find((z) => z.id === activeZone) ?? VAN_MIEU_ZONES[0],
    [activeZone]
  );
  const checkedInToday = worldSave.lastCheckInDate === getTodayKey();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-8 space-y-3.5">
      {/* Compact Header Strip */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-3.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {currentCity.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {onlineInCity} bạn đang chơi
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentCity.region} · Chạm vào sân để chạy chơi, gõ Trống Hội, thả Hoa Đăng & săn 5 Kho Báu!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundManager.play('click');
              onOpenLevel();
            }}
            className="px-3 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Cấp {progress.level} · {progress.percent}%</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.play('click');
              onNavigateToShop();
            }}
            className="px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Studio Đồ</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.play('click');
              onOpenTravel();
            }}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
          >
            <Plane className="w-4 h-4" />
            <span>Du Hành Xuyên Việt</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive 2.5D Playground + Safe Chat Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 2.5D Interactive Văn Miếu / City World Stage */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div
            ref={stageRef}
            onClick={handleStageClick}
            onPointerDown={handleStagePointerDown}
            onPointerMove={handleStagePointerMove}
            onPointerUp={handleStagePointerEnd}
            onPointerCancel={handleStagePointerEnd}
            style={{ touchAction: 'none' }}
            className="relative w-full h-[430px] sm:h-[510px] lg:h-[560px] rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg select-none cursor-crosshair bg-sky-200"
          >
            {/* 2.5D Backdrop World */}
            <div
              className="hsv-lobby-world"
              style={{
                left: window.matchMedia('(max-width: 767px)').matches
                  ? `${Math.max(-110, Math.min(0, 50 - pos.x * 2.1))}%`
                  : '0%'
              }}
            >
              <City3DLandmark
                destKey={currentCity.destKey}
                mode="stage"
                lighting={lighting}
                zone={activeZone}
                className="pointer-events-none"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[52%] bottom-0 bg-gradient-to-b from-transparent via-black/5 to-black/15"
              />
            </div>

            {/* TOP-LEFT GAME HUD: Avatar Portrait + Name + Coins + Stars + Level */}
            <div
              data-interactive="true"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2.5 left-2.5 z-40 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={onOpenLevel}
                className="flex items-center gap-2 pr-3 pl-1.5 py-1 rounded-2xl bg-sky-800/90 hover:bg-sky-700/95 backdrop-blur-xs border-2 border-sky-200/80 text-white shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-300 overflow-hidden flex items-center justify-center shrink-0">
                  <AvatarRenderer
                    config={student.avatarConfig}
                    size="xs"
                    animated={false}
                    showVehicle={false}
                    showPet={false}
                    showTech={false}
                    showAura={false}
                  />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black leading-tight truncate max-w-[115px] flex items-center gap-1">
                    <span className="truncate">{student.name}</span>
                    <span className="text-[10px] font-black text-sky-200">LV.{progress.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-extrabold text-amber-300 tabular-nums">
                    <span className="inline-flex items-center gap-0.5">
                      <CoinIcon className="w-3.5 h-3.5" />
                      {student.coins.toLocaleString('vi-VN')}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-yellow-200">
                      <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                      {student.stars.toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* TOP-RIGHT GAME HUD: Friends · Pets · Bag · Shop · Events · House · Day/Night + Mini-Map */}
            <div
              data-interactive="true"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2.5 right-2.5 z-40 flex items-start gap-1.5"
            >
              {isVanMieu && (
                <div className="flex flex-wrap justify-end items-center gap-1 pt-0.5 max-w-[235px] sm:max-w-none">
                  <button
                    type="button"
                    onClick={() => {
                      if (!canDm) {
                        onRequireLogin();
                        return;
                      }
                      setDmPeer(null);
                      setDmOpen(true);
                    }}
                    className="relative px-2 py-1.5 rounded-xl bg-sky-600/95 hover:bg-sky-500 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Bạn bè & Hộp thư"
                  >
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Bạn bè</span>
                    {dmUnread > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black border border-white">
                        {dmUnread}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setPetZoneTab('care');
                    }}
                    className="px-2 py-1.5 rounded-xl bg-emerald-600/95 hover:bg-emerald-500 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Vườn Thú Cưng & Đua Thú"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Thú cưng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setIsToyboxOpen(true);
                    }}
                    className="px-2 py-1.5 rounded-xl bg-orange-500/95 hover:bg-orange-400 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Túi Đồ Chơi & Bụi Tiên"
                  >
                    <Backpack className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Túi đồ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      onNavigateToShop();
                    }}
                    className="px-2 py-1.5 rounded-xl bg-purple-600/95 hover:bg-purple-500 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Cửa Hàng Thời Trang (Avatar Studio)"
                  >
                    <Store className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Cửa hàng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setIsFunQuestsOpen(true);
                    }}
                    className="relative px-2 py-1.5 rounded-xl bg-rose-500/95 hover:bg-rose-400 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Sự Kiện Lễ Hội & Điểm Danh"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Sự kiện</span>
                    {!checkedInToday && (
                      <span className="absolute -top-1.5 -right-1.5 px-1 rounded-full bg-amber-300 text-slate-950 text-[8px] font-black border border-white">
                        Quà
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setFishingHouseTab('house');
                    }}
                    className="px-2 py-1.5 rounded-xl bg-amber-500/95 hover:bg-amber-400 text-slate-950 border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Ngôi Nhà Riêng & Vườn Cây"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Nhà riêng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setIsFunRankOpen(true);
                    }}
                    className="px-2 py-1.5 rounded-xl bg-indigo-600/95 hover:bg-indigo-500 text-white border border-white/80 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Thành Tựu & Bộ Sưu Tập"
                  >
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">Thành tựu</span>
                  </button>

                  <button
                    type="button"
                    onClick={cycleLighting}
                    className="px-2 py-1.5 rounded-xl bg-slate-800/85 hover:bg-slate-700 text-amber-300 border border-white/70 shadow-md flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    title="Đổi Sáng / Hoàng Hôn / Đêm Hội"
                  >
                    {lighting === 'day' ? (
                      <Sun className="w-4 h-4" />
                    ) : lighting === 'sunset' ? (
                      <Sunset className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    <span className="hidden sm:block text-[9px] font-black mt-0.5">
                      {lighting === 'day' ? 'Ngày' : lighting === 'sunset' ? 'Chiều' : 'Đêm'}
                    </span>
                  </button>
                </div>
              )}

              {!isVanMieu && (
                <div className="px-3 py-1.5 rounded-2xl bg-slate-950/70 backdrop-blur-xs text-white text-[11px] font-semibold shadow-sm flex items-center gap-1.5 max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{currentCity.shortName}</span>
                </div>
              )}

              {isVanMieu && (
                <VanMieuMiniMap
                  activeZone={activeZone}
                  selfX={pos.x}
                  selfY={pos.y}
                  peers={visiblePeers.map((p) => ({ id: p.id, x: p.x, y: p.y }))}
                  foundTreasures={vanMieuStats.foundTreasures}
                  onSelectZone={handleSelectZone}
                  onOpenTravel={onOpenTravel}
                />
              )}
            </div>

            {/* Incoming Toast Notification */}
            {toastMsg && (
              <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-slate-950/90 text-amber-300 text-xs font-extrabold shadow-lg border border-amber-400/40 whitespace-nowrap max-w-[90%] truncate">
                {toastMsg}
              </div>
            )}

            {/* Interactive World Entities Layer (Moves with Mobile Camera) */}
            <div
              className="hsv-lobby-world"
              style={{
                left: window.matchMedia('(max-width: 767px)').matches
                  ? `${Math.max(-110, Math.min(0, 50 - pos.x * 2.1))}%`
                  : '0%'
              }}
            >
              {/* Sparkle Footstep Trail */}
              {footstepSparks.map((sp) => (
                <span
                  key={sp.id}
                  style={{ left: `${sp.x}%`, top: `${sp.y}%`, backgroundColor: sp.color, zIndex: 410 }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full opacity-75 animate-ping"
                />
              ))}

              {/* Ground Click Ripple */}
              {clickRipple && (
                <div
                  key={clickRipple.key}
                  style={{ left: `${clickRipple.x}%`, top: `${clickRipple.y}%` }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-10 h-5 rounded-full border-2 border-amber-300 bg-amber-300/20 animate-ping"
                />
              )}

              {/* Văn Miếu 4-Zone Interactive World, Portals, NPCs & Freeplay Props */}
              {isVanMieu && (
                <VanMieuInteractiveLayer
                  activeZone={activeZone}
                  lighting={lighting}
                  drumCombo={drumCombo}
                  drumShaking={drumShaking}
                  drumRipples={drumRipples}
                  lanterns={lanterns}
                  balloonBursts={balloonBursts}
                  critters={critters}
                  foundTreasures={vanMieuStats.foundTreasures}
                  catWaving={catWaving}
                  lawnBallActive={lawnBallActive}
                  stageDanceActive={stageDanceActive}
                  onSelectZone={handleSelectZone}
                  onSelectNpc={(npc) => {
                    soundManager.play('click');
                    setSelectedNpc(npc);
                  }}
                  onPortalClick={() => {
                    soundManager.play('travel');
                    onOpenTravel();
                  }}
                  onOpenNoticeBoard={() => {
                    soundManager.play('click');
                    setIsFunQuestsOpen(true);
                  }}
                  onDrumHit={handleDrumHit}
                  onHopscotchClick={handleHopscotchClick}
                  onOpenOAnQuan={() => {
                    soundManager.play('click');
                    setIsOAnQuanOpen(true);
                  }}
                  onOpenTugOfWar={() => {
                    soundManager.play('click');
                    setIsTugOfWarOpen(true);
                  }}
                  onPondClick={handleReleaseLantern}
                  onCreativeCornerClick={handleCreativeCornerClick}
                  onFairyLibraryClick={() => {
                    soundManager.play('click');
                    setIsMemoryOpen(true);
                  }}
                  onMarketClick={() => {
                    soundManager.play('click');
                    setIsToyboxOpen(true);
                  }}
                  onOpenPetCare={(tab) => {
                    soundManager.play('click');
                    setPetZoneTab(tab);
                  }}
                  onThrowLawnBall={handleThrowLawnBall}
                  onOpenObstacleRace={() => {
                    soundManager.play('click');
                    setIsObstacleOpen(true);
                  }}
                  onOpenFishing={() => {
                    soundManager.play('click');
                    setFishingHouseTab('fishing');
                  }}
                  onOpenHouse={() => {
                    soundManager.play('click');
                    setFishingHouseTab('house');
                  }}
                  onOpenShop={() => {
                    soundManager.play('click');
                    onNavigateToShop();
                  }}
                  onTriggerStageDance={handleTriggerStageDance}
                  onCatchCritter={handleCatchCritter}
                  onCollectTreasure={handleCollectTreasure}
                />
              )}

              {/* Optional Vui-Bot Kiosk (kept small on right edge for other cities or optional daily check) */}
              {!isVanMieu && (
                <button
                  type="button"
                  data-interactive="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.play('click');
                    setTriviaPicked(null);
                    setTriviaStatus('idle');
                    setTriviaNotice('');
                    setIsTriviaOpen(true);
                  }}
                  style={{ left: '89%', top: '65%', zIndex: 650 }}
                  className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer focus:outline-none"
                  title="Trò chuyện với Hướng Dẫn Viên Vui-Bot"
                >
                  <span
                    className={`mb-1 px-2 py-0.5 rounded-full text-[10px] font-black shadow-md whitespace-nowrap flex items-center gap-1 border ${
                      hubState?.trivia_claimed_today
                        ? 'bg-white/95 text-slate-700 border-slate-300'
                        : 'bg-amber-400 text-slate-950 border-white animate-bounce'
                    }`}
                  >
                    <HelpCircle className="w-3 h-3" />
                    {hubState?.trivia_claimed_today ? 'Vui-Bot HDV' : 'Đố Vui +3 Xu!'}
                  </span>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <VuiBotMascot
                      expression="happy"
                      motion="wave"
                      showBlinkGlint={false}
                      className="w-14 h-14 sm:w-16 sm:h-16"
                      alt="Vui-Bot hướng dẫn viên"
                    />
                  </div>
                  <div className="w-11 h-3 bg-slate-950/30 rounded-full blur-[2px] -mt-1" />
                </button>
              )}

              {/* Real Online Characters + Self (Sorted by Y depth) */}
              {renderActors.map((actor) => {
                const bubble = bubbles[actor.id];
                const isJumping = Boolean(jumpingIds[actor.id]);
                const scaleMode = actorScales[actor.id] || 'normal';
                const hasSplash = Boolean(actorSplashes[actor.id]);
                const scaleClass =
                  scaleMode === 'giant'
                    ? 'scale-[1.08] sm:scale-[1.22]'
                    : scaleMode === 'tiny'
                    ? 'scale-[0.54] sm:scale-[0.62]'
                    : actor.isSelf && isWalking
                    ? 'scale-[0.76] sm:scale-[0.86] -translate-y-1'
                    : 'scale-[0.72] sm:scale-[0.82]';

                return (
                  <div
                    key={actor.id}
                    data-interactive={actor.isSelf ? undefined : 'true'}
                    onClick={(e) => {
                      if (actor.isSelf) return;
                      e.stopPropagation();
                      soundManager.play('click');
                      setSelectedPeer(actor);
                    }}
                    style={{
                      left: `${actor.x}%`,
                      top: `${actor.y}%`,
                      zIndex: Math.round(actor.y * 10),
                      transition: 'left 0.45s linear, top 0.45s linear'
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-full flex flex-col items-center ${
                      actor.isSelf ? 'pointer-events-none' : 'cursor-pointer group'
                    }`}
                  >
                    {/* Speech / Emote Bubble */}
                    {bubble && (
                      <div
                        className={`mb-1 max-w-[160px] text-center shadow-lg ${
                          bubble.kind === 'emote'
                            ? 'px-2.5 py-1 rounded-2xl bg-white/95 text-2xl animate-bounce border border-amber-300'
                            : 'px-2.5 py-1.5 rounded-2xl bg-white text-slate-900 text-[11px] font-bold leading-snug border border-slate-200 break-words'
                        }`}
                      >
                        {bubble.kind === 'emote' ? bubble.symbol || bubble.text : bubble.text}
                      </div>
                    )}

                    {/* Character Avatar with Jump + Giant/Tiny + Rainbow Splash Ring */}
                    <div
                      className={`relative origin-bottom transition-transform duration-300 ${scaleClass} ${
                        isJumping ? '-translate-y-8' : ''
                      } ${!actor.isSelf ? 'group-hover:brightness-105' : ''}`}
                    >
                      {hasSplash && (
                        <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full border-4 border-pink-400/80 ring-4 ring-cyan-300/60 animate-pulse" />
                      )}
                      <AvatarRenderer
                        config={actor.avatarConfig}
                        size="sm"
                        animated={true}
                        showPet={true}
                        showAura={true}
                        showVehicle={true}
                        facing={actor.facing}
                        isReacting={Boolean(bubble) || isJumping || stageDanceActive}
                      />
                    </div>

                    {/* Ground shadow */}
                    <div className="w-12 h-3 bg-slate-950/30 rounded-full blur-[2px] -mt-4 pointer-events-none" />

                    {/* Name & Level Plate */}
                    <div
                      className={`mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap shadow-sm border ${
                        actor.isSelf
                          ? 'bg-emerald-600/95 text-white border-emerald-200'
                          : 'bg-slate-950/80 text-white border-white/25'
                      }`}
                    >
                      {actor.isSelf ? actor.alias : `${actor.alias} · LV.${actor.level}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom-Left Compact Touch D-Pad */}
            <div
              data-interactive="true"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 left-3 z-30 grid grid-cols-3 gap-1 w-24 sm:w-28 opacity-85 hover:opacity-100"
              aria-label="Phím điều hướng nhân vật"
            >
              <div />
              <button
                type="button"
                onClick={() => moveSelfTo(pos.x, pos.y - 6)}
                className="h-8 rounded-xl bg-slate-950/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/25 cursor-pointer active:scale-90"
                aria-label="Đi lên"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <div />
              <button
                type="button"
                onClick={() => moveSelfTo(pos.x - 6, pos.y)}
                className="h-8 rounded-xl bg-slate-950/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/25 cursor-pointer active:scale-90"
                aria-label="Sang trái"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveSelfTo(pos.x, pos.y + 6)}
                className="h-8 rounded-xl bg-slate-950/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/25 cursor-pointer active:scale-90"
                aria-label="Đi xuống"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveSelfTo(pos.x + 6, pos.y)}
                className="h-8 rounded-xl bg-slate-950/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/25 cursor-pointer active:scale-90"
                aria-label="Sang phải"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom-Right Arcade Action Cluster (Nhảy / Chào / Biểu cảm matching mockup) */}
            <div
              data-interactive="true"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 z-30 flex items-end gap-2"
            >
              {isEmoteTrayOpen && (
                <div className="mb-14 -mr-14 px-2 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-xs border border-white/25 flex items-center gap-1 shadow-xl">
                  {EMOTE_STICKERS.map((em) => (
                    <button
                      key={em.id}
                      type="button"
                      disabled={sending}
                      onClick={() => {
                        setIsEmoteTrayOpen(false);
                        void handleSendMessage('emote', `${em.symbol} ${em.label}`, em.symbol);
                      }}
                      className="w-8 h-8 rounded-xl hover:bg-white/20 flex items-center justify-center text-lg cursor-pointer active:scale-90"
                      title={em.label}
                    >
                      {em.symbol}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleSelfJump}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 border-2 border-white text-white shadow-lg flex flex-col items-center justify-center hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                title="Nhảy (Phím Space)"
              >
                <span className="text-base leading-none">🏃</span>
                <span className="text-[10px] font-black mt-0.5">Nhảy</span>
              </button>

              <button
                type="button"
                onClick={() => void handleSendMessage('emote', '👋 Chào bạn!', '👋')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 border-2 border-white text-slate-950 shadow-lg flex flex-col items-center justify-center hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                title="Vẫy tay chào"
              >
                <span className="text-base leading-none">👋</span>
                <span className="text-[10px] font-black mt-0.5">Chào</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setIsEmoteTrayOpen((v) => !v);
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-pink-400 to-rose-500 border-2 border-white text-white shadow-lg flex flex-col items-center justify-center hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                title="Chọn biểu cảm"
              >
                <span className="text-base leading-none">😊</span>
                <span className="text-[10px] font-black mt-0.5">Biểu cảm</span>
              </button>
            </div>

            {/* NPC Interactive Story & Quick Launch Drawer */}
            {selectedNpc && (
              <div
                data-interactive="true"
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-amber-400 p-4 shadow-2xl space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {selectedNpc.name} · <span className="text-amber-600">{selectedNpc.role}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                      {selectedNpc.greeting}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {selectedNpc.tip}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNpc(null)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                    aria-label="Đóng hộp thoại NPC"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleNpcAction(selectedNpc.primaryActionId)}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    {selectedNpc.primaryActionLabel}
                  </button>
                  {selectedNpc.secondaryActionId && selectedNpc.secondaryActionLabel && (
                    <button
                      type="button"
                      onClick={() => handleNpcAction(selectedNpc.secondaryActionId!)}
                      className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black cursor-pointer"
                    >
                      {selectedNpc.secondaryActionLabel}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Selected Peer Mini Profile Overlay */}
            {selectedPeer && (
              <div
                data-interactive="true"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-24 right-3 z-40 w-64 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3.5 shadow-2xl space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                      <AvatarRenderer config={selectedPeer.avatarConfig} size="thumb" showVehicle={false} showTech={false} showPet={true} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {selectedPeer.alias}
                      </div>
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        Cấp {selectedPeer.level} · {getRankTier(selectedPeer.level).title}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPeer(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    aria-label="Đóng thẻ bạn bè"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => void handleWaveOrHeart(selectedPeer, 'wave')}
                    className="py-2 px-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/50 hover:bg-amber-200 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Vẫy tay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleWaveOrHeart(selectedPeer, 'heart')}
                    className="py-2 px-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" /> Thả tim
                  </button>
                </div>

                {!selectedPeer.id.startsWith('guest:') && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      if (!canDm) {
                        onRequireLogin();
                        return;
                      }
                      setDmPeer({ id: selectedPeer.id, alias: selectedPeer.alias });
                      setDmOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-blue-100 dark:bg-blue-950/50 hover:bg-blue-200 text-blue-800 dark:text-blue-200 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Nhắn riêng &amp; Kết bạn
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      setSelectedPeer(null);
                      setIsTugOfWarOpen(true);
                    }}
                    className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" /> Rủ Kéo Co
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleBlockPeer(selectedPeer)}
                    className="py-2 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-rose-600 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" /> Chặn
                  </button>
                </div>
              </div>
            )}

            {/* NPC Vui-Bot Daily City Trivia Overlay */}
            {isTriviaOpen && (
              <div
                data-interactive="true"
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 flex items-center justify-center shrink-0 p-0.5">
                        <VuiBotMascot
                          expression="surprised"
                          motion="none"
                          showBlinkGlint={false}
                          className="w-10 h-10"
                          alt="Vui-Bot"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          Đố Vui Địa Danh: {currentCity.shortName}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Trả lời đúng nhận +3 Xu & +10 XP mỗi ngày
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTriviaOpen(false)}
                      className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                    {currentCity.trivia.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCity.trivia.options.map((opt, idx) => {
                      const isCorrectOpt = idx === currentCity.trivia.correctIndex;
                      const isPicked = triviaPicked === idx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={triviaStatus !== 'idle' || triviaBusy}
                          onClick={() => void handleAnswerTrivia(idx)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-colors cursor-pointer ${
                            triviaStatus === 'idle'
                              ? 'border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                              : isCorrectOpt
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                              : isPicked
                              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200'
                              : 'border-slate-200 dark:border-slate-800 opacity-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {triviaNotice && (
                    <div
                      className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                        triviaStatus === 'correct'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      <CoinIcon className="w-4 h-4 shrink-0" />
                      <span>{triviaNotice}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Zone & Play Tips Bar */}
          <div className="rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                <b>{currentZoneMeta.shortName}:</b> {currentZoneMeta.subtitle}
              </span>
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">
              Đã đi: {(hubState?.total_km ?? 0).toLocaleString('vi-VN')} km
            </span>
          </div>
        </div>

        {/* Dual-Mode Safe Chat Dock */}
        <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between gap-3 h-[460px] lg:h-[608px]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-black text-slate-900 dark:text-white">
                Trò Chuyện Sảnh
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3 h-3" /> Lọc An Toàn
            </span>
            <button
              type="button"
              onClick={() => {
                if (!canDm) {
                  onRequireLogin();
                  return;
                }
                setDmPeer(null);
                setDmOpen(true);
              }}
              className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Hộp thư
              {dmUnread > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-[10px] flex items-center justify-center">
                  {dmUnread}
                </span>
              )}
            </button>
          </div>

          {/* Message Feed */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            <div className="p-2.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-[11px] leading-relaxed">
              Chào mừng đến <b>{currentCity.shortName}</b>! Chơi tự do cùng bạn bè, trò chuyện lịch sự và không chia sẻ SĐT hay link lạ nhé.
            </div>

            {loadingMsgs && (
              <div className="flex items-center gap-2 text-slate-400 py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải tin nhắn...
              </div>
            )}

            {messages
              .filter((m) => !blockedSet.has(m.student_id))
              .map((m) => {
                const isMine = m.student_id === student.id;
                return (
                <div
                  key={m.id}
                  className={`group p-2.5 rounded-2xl border ${
                    isMine
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/70'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-black text-slate-900 dark:text-white truncate">
                        {m.sender_alias}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                        Cấp {m.sender_level}
                      </span>
                    </div>
                    {!isMine && !reportedIds[m.id] && (
                      <button
                        type="button"
                        onClick={() => void handleReportMessage(m.id)}
                        className="opacity-60 hover:opacity-100 text-rose-500 p-0.5 cursor-pointer"
                        title="Báo cáo tin nhắn không phù hợp"
                        aria-label="Báo cáo tin nhắn"
                      >
                        <Flag className="w-3 h-3" />
                      </button>
                    )}
                    {reportedIds[m.id] && (
                      <span className="text-[10px] text-rose-500 font-bold">Đã báo cáo</span>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 break-words leading-snug">
                    {m.body}
                  </p>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Mode Tabs & Controls */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setChatTab('quick');
                  setChatError('');
                }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                  chatTab === 'quick'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <Smile className="w-3.5 h-3.5" /> Chat Nhanh
              </button>
              <button
                type="button"
                onClick={() => {
                  setChatTab('free');
                  setChatError('');
                }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                  chatTab === 'free'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" /> Gõ Tự Do
              </button>
            </div>

            {chatError && (
              <div className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-semibold">
                {chatError}
              </div>
            )}

            {chatTab === 'quick' ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {EMOTE_STICKERS.map((em) => (
                    <button
                      key={em.id}
                      type="button"
                      disabled={sending}
                      onClick={() => void handleSendMessage('emote', `${em.symbol} ${em.label}`, em.symbol)}
                      className="px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>{em.symbol}</span>
                      <span className="text-[10px] text-amber-900 dark:text-amber-200">{em.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_CHAT_PRESETS.map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      disabled={sending}
                      onClick={() => void handleSendMessage('quick', q.text)}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-200 cursor-pointer active:scale-95"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : student.isGuest ? (
              <button
                type="button"
                onClick={onRequireLogin}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black cursor-pointer"
              >
                Đăng nhập 10 giây để mở khóa Chat Tự Do
              </button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendMessage('text', draftText);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  maxLength={90}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={sending || !draftText.trim()}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  aria-label="Gửi tin nhắn"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Văn Miếu Freeplay Modals */}
      {isToyboxOpen && (
        <VanMieuToyboxModal
          activeScale={actorScales[selfId] || 'normal'}
          activeTrail={activeTrail}
          colorSplashActive={Boolean(actorSplashes[selfId])}
          onUseToy={handleUseToy}
          onSelectTrail={(tr) => {
            soundManager.play('click');
            setActiveTrail(tr);
            showToast('✨ Đã đổi màu Dấu Chân Bụi Tiên!');
          }}
          onClose={() => setIsToyboxOpen(false)}
        />
      )}

      {isFunQuestsOpen && (
        <VanMieuFunQuestsModal
          stats={vanMieuStats}
          worldSave={worldSave}
          checkedInToday={checkedInToday}
          onDailyCheckIn={handleDailyCheckIn}
          onClaimGift={() => {
            soundManager.play('fanfare');
            confetti({ particleCount: 110, spread: 95, origin: { y: 0.55 } });
            updateStats((prev) => ({ ...prev, giftClaimed: true }));
            setActorScales((prev) => ({ ...prev, [selfId]: 'giant' }));
            window.setTimeout(() => setActorScales((prev) => ({ ...prev, [selfId]: 'normal' })), 20000);
            awardBonusStars(2, 'Đã mở Rương Quà Lễ Hội! (+2 Sao & hóa khổng lồ!)');
            setIsFunQuestsOpen(false);
          }}
          onClose={() => setIsFunQuestsOpen(false)}
        />
      )}

      {isMemoryOpen && (
        <FairyMemoryGameModal
          bestSeconds={vanMieuStats.bestMemorySeconds}
          onWin={(elapsedSeconds) => {
            updateStats((prev) => ({
              ...prev,
              memoryWins: prev.memoryWins + 1,
              bestMemorySeconds:
                prev.bestMemorySeconds === null
                  ? elapsedSeconds
                  : Math.min(prev.bestMemorySeconds, elapsedSeconds)
            }));
            awardBonusStars(1, `Hoàn thành Lật Hình Cổ Tích trong ${elapsedSeconds}s! (+1 Sao)`);
          }}
          onClose={() => setIsMemoryOpen(false)}
        />
      )}

      {isFunRankOpen && (
        <VanMieuFunRankModal
          alias={student.name}
          stats={vanMieuStats}
          worldSave={worldSave}
          onClose={() => setIsFunRankOpen(false)}
        />
      )}

      {isOAnQuanOpen && (
        <VanMieuOAnQuanModal
          playerName={student.name}
          onWin={(starsEarned) => {
            updateWorldSave((prev) => ({ ...prev, oAnQuanWins: prev.oAnQuanWins + 1 }));
            awardBonusStars(starsEarned, `Thắng Ô Ăn Quan! (+${starsEarned} Sao trang trí)`);
          }}
          onClose={() => setIsOAnQuanOpen(false)}
        />
      )}

      {isTugOfWarOpen && (
        <VanMieuTugOfWarModal
          playerId={selfId}
          playerName={student.name}
          onlinePeers={visiblePeers.map((p) => ({ id: p.id, alias: p.alias }))}
          externalPeerPullDelta={tugPeerPullDelta}
          onBroadcastPull={(power) => {
            if (channelRef.current) {
              void channelRef.current.send({
                type: 'broadcast',
                event: 'vanmieu_tug',
                payload: { id: selfId, power }
              });
            }
          }}
          onWin={(starsEarned) => {
            updateWorldSave((prev) => ({ ...prev, tugOfWarWins: prev.tugOfWarWins + 1 }));
            awardBonusStars(starsEarned, `Hoàn thành Kéo Co Đồng Đội! (+${starsEarned} Sao)`);
          }}
          onClose={() => setIsTugOfWarOpen(false)}
        />
      )}

      {isObstacleOpen && (
        <VanMieuObstacleRaceModal
          playerName={student.name}
          bestSec={worldSave.obstacleBestSec}
          onFinishRace={(timeSec, starsCollected) => {
            updateWorldSave((prev) => ({
              ...prev,
              obstacleRuns: prev.obstacleRuns + 1,
              obstacleBestSec:
                prev.obstacleBestSec === null ? timeSec : Math.min(prev.obstacleBestSec, timeSec)
            }));
            awardBonusStars(starsCollected, `Về đích Đường Đua ${timeSec}s! (+${starsCollected} Sao)`);
          }}
          onClose={() => setIsObstacleOpen(false)}
        />
      )}

      {petZoneTab && (
        <VanMieuPetZoneModal
          initialTab={petZoneTab}
          avatarConfig={student.avatarConfig}
          adoptedStarterPetId={worldSave.adoptedStarterPetId}
          petAffection={worldSave.petAffection}
          petBallCatches={worldSave.petBallCatches}
          onAdoptPet={handleAdoptStarterPet}
          onPetHeart={() => {
            updateWorldSave((prev) => ({ ...prev, petAffection: prev.petAffection + 1 }));
          }}
          onBallCatch={() => {
            updateWorldSave((prev) => ({
              ...prev,
              petBallCatches: prev.petBallCatches + 1,
              petAffection: prev.petAffection + 1
            }));
          }}
          onWinPetRace={(starsEarned) => {
            updateWorldSave((prev) => ({ ...prev, petRaceWins: prev.petRaceWins + 1 }));
            awardBonusStars(starsEarned, `Hoàn thành Đua Thú Cưng! (+${starsEarned} Sao)`);
          }}
          onClose={() => setPetZoneTab(null)}
        />
      )}

      {fishingHouseTab && (
        <VanMieuFishingHouseModal
          initialTab={fishingHouseTab}
          studentId={student.id}
          studentName={student.name}
          avatarConfig={student.avatarConfig}
          fishCounts={worldSave.fishCounts}
          plantLevel={worldSave.plantLevel}
          onCatchFish={(fish: FishSpecies) => {
            updateWorldSave((prev) => ({
              ...prev,
              fishCounts: {
                ...prev.fishCounts,
                [fish.id]: (prev.fishCounts[fish.id] || 0) + 1
              }
            }));
            awardBonusStars(fish.starsReward, `Câu được ${fish.name}! (+${fish.starsReward} Sao)`);
          }}
          onWaterPlant={() => {
            updateWorldSave((prev) => ({
              ...prev,
              plantLevel: Math.min(4, prev.plantLevel + 1)
            }));
            showToast('Cây vườn nhà đã lớn xanh tốt hơn! 🌱');
          }}
          onOpenStudio={() => {
            setFishingHouseTab(null);
            onNavigateToShop();
          }}
          onClose={() => setFishingHouseTab(null)}
        />
      )}

      {dmOpen && canDm && (
        <DirectMessages
          selfId={student.id}
          initialPeer={dmPeer}
          onClose={() => {
            setDmOpen(false);
            setDmPeer(null);
          }}
          onUnreadChange={setDmUnread}
        />
      )}
    </div>
  );
};
