import React, { useState, useMemo, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  AvatarConfig,
  ShopItem,
  ItemCategory,
  ItemRarity,
  PersonalRoomDecor,
  OutfitPreset,
  RoomWallTheme,
  AvatarFrameId
} from '../types';
import {
  SHOP_ITEMS,
  STUDIO_SETS,
  HAIR_STYLES,
  HAIR_COLORS,
  SKIN_TONES,
  EYE_EXPRESSIONS,
  DEFAULT_ROOM_DECOR,
  AVATAR_FRAMES
} from '../data/items';
import { AvatarRenderer } from './AvatarRenderer';
import { StudioStageBackdrop } from './StudioStageBackdrop';
import { StudioItemThumbnail } from './StudioItemThumbnail';
import { CoinIcon, StarIcon } from './GameIcons';
import { soundManager } from '../utils/audio';
import { updateActiveStudent } from '../utils/studentStorage';
import { buyItem, saveAvatar, fetchShopCatalog } from '../lib/api';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  Sparkles,
  Check,
  Lock,
  Palette,
  Shirt,
  PenTool,
  Smartphone,
  Bike,
  Laptop,
  Heart,
  ChevronRight,
  Image,
  Sun,
  Layers,
  Eye,
  X,
  Trophy,
  RotateCcw,
  Loader2,
  Home,
  Search,
  Bookmark,
  Trash2,
  ShieldCheck
} from 'lucide-react';

interface AvatarStudioProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
  onNavigateToStudy: () => void;
  onRequireLogin?: () => void;
}

type StudioTab = 'appearance' | 'room' | 'sets' | ItemCategory;

const CATEGORY_TABS: { id: StudioTab; label: string; icon: React.ReactNode }[] = [
  { id: 'appearance', label: 'Diện Mạo', icon: <Palette className="w-4 h-4" /> },
  { id: 'outfit', label: 'Trang Phục', icon: <Shirt className="w-4 h-4" /> },
  { id: 'handheld', label: 'Cầm Tay', icon: <PenTool className="w-4 h-4" /> },
  { id: 'vehicle', label: 'Xe Cộ', icon: <Bike className="w-4 h-4" /> },
  { id: 'pet', label: 'Thú Cưng', icon: <Heart className="w-4 h-4" /> },
  { id: 'phone', label: 'Điện Thoại', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'tech', label: 'Công Nghệ', icon: <Laptop className="w-4 h-4" /> },
  { id: 'backdrop', label: 'Phông Nền', icon: <Image className="w-4 h-4" /> },
  { id: 'aura', label: 'Hào Quang', icon: <Sun className="w-4 h-4" /> },
  { id: 'room', label: 'Phòng Riêng', icon: <Home className="w-4 h-4" /> },
  { id: 'sets', label: 'Bộ Sưu Tập', icon: <Layers className="w-4 h-4" /> }
];

const RARITY_LABEL: Record<ItemRarity, { text: string; colorClass: string; stripClass: string }> = {
  base: {
    text: 'Khởi Đầu',
    colorClass: 'text-slate-500 dark:text-slate-400',
    stripClass: 'bg-slate-300 dark:bg-slate-700'
  },
  popular: {
    text: 'Phổ Biến',
    colorClass: 'text-blue-600 dark:text-blue-400',
    stripClass: 'bg-blue-500'
  },
  vip: {
    text: 'Xịn Sò VIP',
    colorClass: 'text-amber-600 dark:text-amber-400',
    stripClass: 'bg-amber-500'
  },
  mythic: {
    text: 'Thần Thoại',
    colorClass: 'text-violet-600 dark:text-violet-400',
    stripClass: 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500'
  }
};

const SET_ACCENT_STYLE: Record<
  'rose' | 'violet' | 'emerald' | 'blue' | 'cyan' | 'teal' | 'amber',
  { strip: string; text: string; bar: string }
> = {
  rose: {
    strip: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    bar: 'bg-rose-500'
  },
  violet: {
    strip: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
    bar: 'bg-violet-500'
  },
  emerald: {
    strip: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    bar: 'bg-emerald-500'
  },
  blue: {
    strip: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    bar: 'bg-blue-500'
  },
  cyan: {
    strip: 'bg-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    bar: 'bg-cyan-500'
  },
  teal: {
    strip: 'bg-teal-500',
    text: 'text-teal-600 dark:text-teal-400',
    bar: 'bg-teal-500'
  },
  amber: {
    strip: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    bar: 'bg-amber-500'
  }
};

const ROOM_WALL_OPTIONS: {
  id: RoomWallTheme;
  label: string;
  swatch: string;
  desc: string;
}[] = [
  { id: 'warm', label: 'Nắng Ấm', swatch: '#FEF3C7', desc: 'Tường kem vàng dịu mắt' },
  { id: 'sky', label: 'Bầu Trời', swatch: '#E0F2FE', desc: 'Xanh dương sáng mát' },
  { id: 'forest', label: 'Rừng Xanh', swatch: '#DCFCE7', desc: 'Xanh lá thư giãn' },
  { id: 'galaxy', label: 'Ngân Hà', swatch: '#312E81', desc: 'Tím sao đêm hiện đại' }
];

const ROOM_FURNITURE_TOGGLES: {
  key: keyof Omit<PersonalRoomDecor, 'wallTheme'>;
  label: string;
  desc: string;
}[] = [
  { key: 'showDeskPc', label: 'Bàn Học & Máy Tính', desc: 'Góc học trực tuyến có đèn bàn' },
  { key: 'showBed', label: 'Giường Ngủ Gọn Gàng', desc: 'Chăn ga xanh dương ấm áp' },
  { key: 'showBookshelf', label: 'Kệ Sách Tri Thức', desc: 'Đầy đủ sách giáo khoa 1–9' },
  { key: 'showTrophyRack', label: 'Kệ Cúp Vinh Danh', desc: 'Trưng bày cúp, sao & huy hiệu A+' },
  { key: 'showPoster', label: 'Áp Phích Siêu Anh Hùng', desc: 'Tranh Hero HSV treo tường' },
  { key: 'showPlant', label: 'Cây Xanh Thư Giãn', desc: 'Chậu cây xanh lọc không khí' }
];

const TAP_QUOTES = [
  'Sẵn sàng chinh phục mọi bài học SGK!',
  'Hôm nay mình thử phối bộ đồ mới nhé!',
  'Làm thêm bài Đấu Trường để mở khóa thú cưng và siêu xe nha!',
  'Phong độ là nhất thời, kiến thức là mãi mãi!',
  'Trang trí phòng riêng thật xịn rồi mời bạn bè ghé thăm!'
];

const loadRoomDecor = (studentId: string): PersonalRoomDecor => {
  try {
    const raw = localStorage.getItem(`hsv_room_decor_${studentId}`);
    if (!raw) return DEFAULT_ROOM_DECOR;
    const parsed = JSON.parse(raw) as Partial<PersonalRoomDecor>;
    const validTheme: RoomWallTheme =
      parsed.wallTheme === 'warm' ||
      parsed.wallTheme === 'sky' ||
      parsed.wallTheme === 'forest' ||
      parsed.wallTheme === 'galaxy'
        ? parsed.wallTheme
        : DEFAULT_ROOM_DECOR.wallTheme;
    return {
      wallTheme: validTheme,
      showDeskPc: typeof parsed.showDeskPc === 'boolean' ? parsed.showDeskPc : true,
      showBed: typeof parsed.showBed === 'boolean' ? parsed.showBed : true,
      showBookshelf: typeof parsed.showBookshelf === 'boolean' ? parsed.showBookshelf : true,
      showPlant: typeof parsed.showPlant === 'boolean' ? parsed.showPlant : true,
      showPoster: typeof parsed.showPoster === 'boolean' ? parsed.showPoster : true,
      showTrophyRack: typeof parsed.showTrophyRack === 'boolean' ? parsed.showTrophyRack : true
    };
  } catch {
    return DEFAULT_ROOM_DECOR;
  }
};

const loadOutfitPresets = (studentId: string): (OutfitPreset | null)[] => {
  try {
    const raw = localStorage.getItem(`hsv_outfit_presets_${studentId}`);
    if (!raw) return [null, null, null];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [null, null, null];
    return [0, 1, 2].map((idx) => {
      const entry = parsed[idx];
      if (!entry || typeof entry !== 'object' || !entry.config) return null;
      return entry as OutfitPreset;
    });
  } catch {
    return [null, null, null];
  }
};

const loadActiveTitle = (studentId: string): string => {
  try {
    return localStorage.getItem(`hsv_active_title_${studentId}`) || '';
  } catch {
    return '';
  }
};

const loadAvatarFrame = (studentId: string): AvatarFrameId => {
  try {
    const val = localStorage.getItem(`hsv_avatar_frame_${studentId}`);
    if (
      val === 'frame_none' ||
      val === 'frame_cat_gold' ||
      val === 'frame_star_blue' ||
      val === 'frame_rainbow' ||
      val === 'frame_hero_shield'
    ) {
      return val;
    }
    return 'frame_none';
  } catch {
    return 'frame_none';
  }
};

export const AvatarStudio: React.FC<AvatarStudioProps> = ({
  student,
  onUpdateStudent,
  onNavigateToStudy,
  onRequireLogin
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('outfit');
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    'hair' | 'eyes' | 'skin' | 'gender' | 'frame'
  >('hair');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'owned' | ItemRarity>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Personal room state + quick outfit loadouts + chosen title badge + stage frame
  const [roomDecor, setRoomDecor] = useState<PersonalRoomDecor>(() => loadRoomDecor(student.id));
  const [outfitPresets, setOutfitPresets] = useState<(OutfitPreset | null)[]>(() =>
    loadOutfitPresets(student.id)
  );
  const [activeTitleId, setActiveTitleId] = useState<string>(() => loadActiveTitle(student.id));
  const [avatarFrameId, setAvatarFrameId] = useState<AvatarFrameId>(() =>
    loadAvatarFrame(student.id)
  );

  useEffect(() => {
    setRoomDecor(loadRoomDecor(student.id));
    setOutfitPresets(loadOutfitPresets(student.id));
    setActiveTitleId(loadActiveTitle(student.id));
    setAvatarFrameId(loadAvatarFrame(student.id));
  }, [student.id]);

  // Hydrated catalog synced with live Supabase shop_items pricing
  const [catalogItems, setCatalogItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [serverKeys, setServerKeys] = useState<Set<string> | null>(null);

  // Try-on preview state (lets users preview locked items live on the stage)
  const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);

  // Interactive tap reaction state
  const [isReacting, setIsReacting] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  // Unboxing reveal modal after unlocking a new item
  const [unlockedRevealItem, setUnlockedRevealItem] = useState<ShopItem | null>(null);
  const [unboxPhase, setUnboxPhase] = useState<'shaking' | 'revealed'>('revealed');
  const unboxTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (unboxTimerRef.current !== null) {
        window.clearTimeout(unboxTimerRef.current);
      }
    };
  }, []);

  // Server sync feedback & lock
  const [notice, setNotice] = useState('');
  const [busyItemId, setBusyItemId] = useState<string | null>(null);

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(''), 3500);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetchShopCatalog()
      .then((rows) => {
        if (cancelled || rows.length === 0) return;
        const map = new Map(rows.map((r) => [r.item_key, r] as const));
        setServerKeys(new Set(map.keys()));
        setCatalogItems(
          SHOP_ITEMS.map((item) => {
            const srv = map.get(item.id);
            if (!srv) return item;
            return {
              ...item,
              name: srv.name || item.name,
              description: srv.description || item.description,
              costCoins: Number(srv.price_coins ?? item.costCoins),
              costStars: Number(srv.required_stars ?? item.costStars)
            };
          })
        );
      })
      .catch(() => {
        // Fallback gracefully to bundled catalog if offline
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const fireConfetti = (rarity: ItemRarity = 'popular') => {
    const colors =
      rarity === 'mythic'
        ? ['#a855f7', '#ec4899', '#f59e0b', '#38bdf8']
        : rarity === 'vip'
        ? ['#f59e0b', '#fde047', '#fb923c', '#ffffff']
        : ['#3b82f6', '#10b981', '#fbbf24', '#38bdf8'];
    confetti({
      particleCount: rarity === 'mythic' ? 110 : 85,
      spread: 82,
      origin: { y: 0.56 },
      colors
    });
  };

  const completeUnboxReveal = (rarity: ItemRarity) => {
    if (unboxTimerRef.current !== null) {
      window.clearTimeout(unboxTimerRef.current);
      unboxTimerRef.current = null;
    }
    setUnboxPhase('revealed');
    soundManager.play('fanfare');
    fireConfetti(rarity);
  };

  const closeRevealModal = () => {
    if (unboxTimerRef.current !== null) {
      window.clearTimeout(unboxTimerRef.current);
      unboxTimerRef.current = null;
    }
    setUnlockedRevealItem(null);
  };

  const triggerCharacterReaction = () => {
    soundManager.play('coin');
    setIsReacting(false);
    requestAnimationFrame(() => setIsReacting(true));
    const randomLine = TAP_QUOTES[Math.floor(Math.random() * TAP_QUOTES.length)];
    setSpeechBubble(randomLine);
    window.setTimeout(() => setIsReacting(false), 480);
  };

  const requireLogin = () => {
    soundManager.play('wrong');
    onRequireLogin?.();
  };

  /** Apply a new look locally (instant), then persist on Supabase; roll back on server refusal. */
  const commitLook = async (next: AvatarConfig, extra?: Partial<StudentProfile>) => {
    const previous = student;
    const optimistic = updateActiveStudent((prev) => ({
      ...prev,
      ...extra,
      avatarConfig: next,
      equippedItems: {
        outfit: next.outfitId,
        handheld: next.handheldId,
        phone: next.phoneId,
        vehicle: next.vehicleId,
        tech: next.techId,
        pet: next.petId,
        backdrop: next.backdropId || 'bg_classroom',
        aura: next.auraId || 'aura_none'
      }
    }));
    onUpdateStudent(optimistic);

    if (!isSupabaseConfigured || student.isGuest) return;
    try {
      await saveAvatar(next);
    } catch (e) {
      const reverted = updateActiveStudent(() => previous);
      onUpdateStudent(reverted);
      flash('Chưa lưu được lên máy chủ, hãy thử lại nhé.');
      console.error(e);
    }
  };

  // Update appearance (skin, hair, eye expression, gender)
  const handleUpdateAppearance = (partial: Partial<AvatarConfig>) => {
    if (student.isGuest) return requireLogin();
    soundManager.play('click');
    void commitLook({ ...student.avatarConfig, ...partial });
  };

  // Equip already owned item
  const handleEquipItem = (item: ShopItem) => {
    if (student.isGuest) return requireLogin();
    soundManager.play('equip');
    setPreviewItem(null);
    setIsReacting(false);
    requestAnimationFrame(() => setIsReacting(true));
    window.setTimeout(() => setIsReacting(false), 480);

    void commitLook({
      ...student.avatarConfig,
      [`${item.category}Id`]: item.id
    } as AvatarConfig);
  };

  // Buy (server deducts coins via RPC buy_item) and equip
  const handleBuyItem = async (item: ShopItem) => {
    if (student.isGuest) return requireLogin();
    if (busyItemId) return;
    if (student.coins < item.costCoins || student.stars < item.costStars) {
      soundManager.play('wrong');
      flash('Bạn chưa đủ xu hoặc sao để mở khóa món này.');
      return;
    }

    if (isSupabaseConfigured && serverKeys && !serverKeys.has(item.id)) {
      soundManager.play('wrong');
      flash('Vật phẩm mới đang chờ đồng bộ danh mục lên máy chủ Supabase.');
      return;
    }

    setBusyItemId(item.id);
    try {
      let nextCoins = student.coins - item.costCoins;
      if (isSupabaseConfigured) {
        const res = await buyItem(item.id);
        nextCoins = Number(res.coins);
      }

      setPreviewItem(null);
      setUnlockedRevealItem(item);

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (unboxTimerRef.current !== null) {
        window.clearTimeout(unboxTimerRef.current);
        unboxTimerRef.current = null;
      }

      if (prefersReduced) {
        setUnboxPhase('revealed');
        soundManager.play('unlock');
        fireConfetti(item.rarity);
      } else {
        setUnboxPhase('shaking');
        soundManager.play('countdown');
        unboxTimerRef.current = window.setTimeout(() => {
          completeUnboxReveal(item.rarity);
        }, 620);
      }

      await commitLook(
        {
          ...student.avatarConfig,
          [`${item.category}Id`]: item.id
        } as AvatarConfig,
        {
          coins: nextCoins,
          unlockedItems: Array.from(new Set([...student.unlockedItems, item.id]))
        }
      );
    } catch (e) {
      soundManager.play('wrong');
      flash(e instanceof Error ? e.message : 'Không mua được món này.');
    } finally {
      setBusyItemId(null);
    }
  };

  // Personal room customization handlers
  const updateRoomDecor = (nextDecor: PersonalRoomDecor) => {
    soundManager.play('click');
    setRoomDecor(nextDecor);
    try {
      localStorage.setItem(`hsv_room_decor_${student.id}`, JSON.stringify(nextDecor));
    } catch {
      // ignore quota error
    }
  };

  // Quick outfit loadout presets
  const persistPresets = (next: (OutfitPreset | null)[]) => {
    setOutfitPresets(next);
    try {
      localStorage.setItem(`hsv_outfit_presets_${student.id}`, JSON.stringify(next));
    } catch {
      // ignore quota error
    }
  };

  const handleSavePreset = (slotIdx: number) => {
    if (student.isGuest) return requireLogin();
    soundManager.play('equip');
    const next = [...outfitPresets];
    next[slotIdx] = {
      id: `preset_${slotIdx + 1}`,
      name: `Bộ ${slotIdx + 1}`,
      config: { ...student.avatarConfig },
      savedAt: new Date().toISOString()
    };
    persistPresets(next);
    flash(`Đã lưu phối đồ hiện tại vào Bộ ${slotIdx + 1}!`);
  };

  const handleApplyPreset = (slotIdx: number) => {
    if (student.isGuest) return requireLogin();
    const preset = outfitPresets[slotIdx];
    if (!preset) return;
    const owned = new Set(student.unlockedItems);
    const cur = student.avatarConfig;
    const pickOwned = (candidate: string | undefined, fallback: string) =>
      candidate && owned.has(candidate) ? candidate : fallback;

    const merged: AvatarConfig = {
      gender: preset.config.gender || cur.gender,
      skinColor: preset.config.skinColor || cur.skinColor,
      hairStyle: preset.config.hairStyle || cur.hairStyle,
      hairColor: preset.config.hairColor || cur.hairColor,
      eyeExpression: preset.config.eyeExpression || cur.eyeExpression,
      outfitId: pickOwned(preset.config.outfitId, cur.outfitId),
      handheldId: pickOwned(preset.config.handheldId, cur.handheldId),
      phoneId: pickOwned(preset.config.phoneId, cur.phoneId),
      vehicleId: pickOwned(preset.config.vehicleId, cur.vehicleId),
      techId: pickOwned(preset.config.techId, cur.techId),
      petId: pickOwned(preset.config.petId, cur.petId),
      backdropId: pickOwned(preset.config.backdropId, cur.backdropId || 'bg_classroom'),
      auraId: pickOwned(preset.config.auraId, cur.auraId || 'aura_none')
    };

    soundManager.play('equip');
    setPreviewItem(null);
    void commitLook(merged);
    flash(`Đã trang bị ${preset.name}!`);
  };

  const handleDeletePreset = (slotIdx: number) => {
    soundManager.play('click');
    const next = [...outfitPresets];
    next[slotIdx] = null;
    persistPresets(next);
  };

  const handleSelectTitle = (setId: string) => {
    soundManager.play('equip');
    setActiveTitleId(setId);
    try {
      localStorage.setItem(`hsv_active_title_${student.id}`, setId);
    } catch {
      // ignore
    }
  };

  // Effective AvatarConfig combining equipped items + active try-on preview
  const effectiveConfig: AvatarConfig = useMemo(() => {
    if (!previewItem) return student.avatarConfig;
    return {
      ...student.avatarConfig,
      [`${previewItem.category}Id`]: previewItem.id
    };
  }, [student.avatarConfig, previewItem]);

  // Filtered items for the current category tab
  const currentCategoryItems = useMemo(() => {
    if (activeTab === 'appearance' || activeTab === 'sets' || activeTab === 'room') return [];
    const q = searchQuery.trim().toLowerCase();
    return catalogItems.filter((item) => {
      if (item.category !== activeTab) return false;
      if (rarityFilter === 'owned' && !student.unlockedItems.includes(item.id)) return false;
      if (rarityFilter !== 'all' && rarityFilter !== 'owned' && item.rarity !== rarityFilter) {
        return false;
      }
      if (q) {
        const hay = `${item.name} ${item.tagline} ${item.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeTab, rarityFilter, searchQuery, catalogItems, student.unlockedItems]);

  const ownedTotalCount = useMemo(
    () => catalogItems.filter((i) => student.unlockedItems.includes(i.id)).length,
    [catalogItems, student.unlockedItems]
  );

  const completedSets = useMemo(
    () =>
      STUDIO_SETS.filter((set) =>
        set.itemIds.every((id) => student.unlockedItems.includes(id))
      ),
    [student.unlockedItems]
  );

  const displayedTitle = useMemo(() => {
    if (completedSets.length === 0) return null;
    const chosen = completedSets.find((s) => s.id === activeTitleId);
    return (chosen || completedSets[0]).titleReward;
  }, [completedSets, activeTitleId]);

  const stageBackdropId =
    activeTab === 'room' && !previewItem
      ? 'bg_my_room'
      : effectiveConfig.backdropId || 'bg_classroom';

  const activeStageBackdropName =
    catalogItems.find((i) => i.id === stageBackdropId)?.name || 'Lớp Học Nắng Mai';

  const myRoomItem = useMemo(
    () => catalogItems.find((i) => i.id === 'bg_my_room'),
    [catalogItems]
  );
  const ownsMyRoom = student.unlockedItems.includes('bg_my_room');
  const equippedMyRoom = student.avatarConfig.backdropId === 'bg_my_room';

  const handleSelectAvatarFrame = (frameId: AvatarFrameId) => {
    soundManager.play('equip');
    setAvatarFrameId(frameId);
    try {
      localStorage.setItem(`hsv_avatar_frame_${student.id}`, frameId);
    } catch {
      // ignore
    }
  };

  const activeFrame = useMemo(
    () => AVATAR_FRAMES.find((f) => f.id === avatarFrameId) || AVATAR_FRAMES[0],
    [avatarFrameId]
  );

  const isHeadgearId = (id: string) =>
    id.startsWith('helmet_') ||
    id.startsWith('hat_') ||
    id.startsWith('hood_') ||
    id.startsWith('headphones_') ||
    id.startsWith('crown_') ||
    id.startsWith('tiara_');

  const regularHairStyles = useMemo(
    () => HAIR_STYLES.filter((h) => !isHeadgearId(h.id)),
    []
  );
  const headgearStyles = useMemo(
    () => HAIR_STYLES.filter((h) => isHeadgearId(h.id)),
    []
  );

  return (
    <div className="hsv-studio-page max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {notice && (
        <div
          role="alert"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-xl border border-slate-700"
        >
          {notice}
        </div>
      )}

      {/* Top Studio Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-slate-900 dark:bg-slate-900 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-300 font-semibold">
            <span>HSV Avatar World</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              Đã sưu tầm {ownedTotalCount}/{catalogItems.length} vật phẩm
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {completedSets.length}/{STUDIO_SETS.length} bộ sưu tập
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1">
            Studio Nhân Vật & Thế Giới Mở Tri Thức
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Thỏa sức phối trang phục siêu anh hùng, biệt đội, thú cưng, siêu xe, hào quang và tự trang trí phòng học riêng của bạn!
          </p>
        </div>

        {/* Currency Counter */}
        <div className="flex items-center gap-4 bg-slate-800/90 px-5 py-3 rounded-2xl border border-slate-700 self-stretch md:self-auto justify-between md:justify-start shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
              <CoinIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Ví Tiền Xu</div>
              <div className="text-lg font-black font-mono tabular-nums text-amber-300">
                {student.coins}
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-700" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
              <StarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Sao Danh Dự</div>
              <div className="text-lg font-black font-mono tabular-nums text-yellow-300">
                {student.stars}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Dressing Room */}
      <div className="hsv-studio-layout grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Column: Live Interactive Game Stage */}
        <div className="hsv-studio-preview lg:col-span-5 lg:sticky lg:top-24 space-y-3 sm:space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Stage Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {student.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <span>{student.isGuest ? 'Khách ghé thăm' : `Cấp ${student.level}`}</span>
                  {displayedTitle && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        {displayedTitle}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[175px]">
                {activeStageBackdropName}
              </span>
            </div>

            {/* Illustrated Game Stage */}
            <div
              className={`hsv-studio-stage relative mt-3 rounded-2xl overflow-hidden border-2 ${activeFrame.ringClass} min-h-[340px] flex flex-col items-center justify-center transition-all`}
            >
              <StudioStageBackdrop backdropId={stageBackdropId} roomDecor={roomDecor} />

              {/* Decorative Cartoon Stage Frame Accents */}
              {avatarFrameId === 'frame_cat_gold' && (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 z-20 w-full h-full"
                  aria-hidden="true"
                >
                  <polygon points="4,16 10,3 17,11" fill="#FACC15" stroke="#B45309" strokeWidth="1.2" />
                  <polygon points="96,16 90,3 83,11" fill="#FACC15" stroke="#B45309" strokeWidth="1.2" />
                </svg>
              )}
              {avatarFrameId === 'frame_star_blue' && (
                <div className="pointer-events-none absolute top-2.5 right-3 z-20 flex items-center gap-1 text-sky-300 drop-shadow">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              {avatarFrameId === 'frame_rainbow' && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 z-20 bg-gradient-to-r from-rose-400 via-amber-300 via-emerald-400 to-sky-400" />
              )}
              {avatarFrameId === 'frame_hero_shield' && (
                <div className="pointer-events-none absolute top-2.5 left-3 z-20 flex items-center gap-1 text-red-500 drop-shadow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}

              {/* Speech bubble on character tap */}
              {speechBubble && (
                <div className="relative z-20 mx-4 mt-3 px-3.5 py-2 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 text-xs font-semibold rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 max-w-xs text-center">
                  {speechBubble}
                </div>
              )}

              <div className="relative z-10 py-3">
                <AvatarRenderer
                  config={effectiveConfig}
                  size="lg"
                  animated={true}
                  showAura={true}
                  isReacting={isReacting}
                  onTap={triggerCharacterReaction}
                />
              </div>

              <div className="relative z-10 pb-2 text-[11px] font-medium text-slate-700/85 dark:text-slate-200/95 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xs px-3 py-1 rounded-full mb-2">
                Chạm vào nhân vật để tương tác
              </div>
            </div>

            {/* Active Try-On Bar */}
            {previewItem && (
              <div className="mt-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">
                    Đang mặc thử: {previewItem.name}
                  </div>
                  <div className="text-[11px] text-blue-700 dark:text-blue-300 tabular-nums">
                    Giá mở khóa: {previewItem.costCoins} xu
                    {previewItem.costStars > 0 ? ` · cần ${previewItem.costStars} sao` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {student.coins >= previewItem.costCoins &&
                    student.stars >= previewItem.costStars &&
                    !(isSupabaseConfigured && serverKeys && !serverKeys.has(previewItem.id)) && (
                      <button
                        disabled={Boolean(busyItemId)}
                        onClick={() => void handleBuyItem(previewItem)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl whitespace-nowrap cursor-pointer transition-colors disabled:opacity-60"
                      >
                        Mở Khóa
                      </button>
                    )}
                  <button
                    onClick={() => {
                      soundManager.play('click');
                      setPreviewItem(null);
                    }}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg cursor-pointer"
                    title="Hủy mặc thử"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Equipped Slots */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
              {[
                { label: 'Trang Phục', id: effectiveConfig.outfitId },
                { label: 'Xe Cộ', id: effectiveConfig.vehicleId },
                { label: 'Thú Cưng', id: effectiveConfig.petId },
                { label: 'Hào Quang', id: effectiveConfig.auraId || 'aura_none' }
              ].map((slot) => {
                const found = catalogItems.find((i) => i.id === slot.id);
                return (
                  <div
                    key={slot.label}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80"
                  >
                    <div className="text-[10px] text-slate-400 font-medium">{slot.label}</div>
                    <div className="text-xs font-bold truncate text-slate-800 dark:text-slate-200 mt-0.5">
                      {found?.name || 'Mặc định'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Outfit Loadouts (3 slots) */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Phối Đồ Nhanh (3 ngăn lưu)
                </span>
                <span className="text-[10px] text-slate-400">Đổi bộ chỉ 1 chạm</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((idx) => {
                  const preset = outfitPresets[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 p-2 flex items-center justify-between gap-1"
                    >
                      {preset ? (
                        <>
                          <button
                            onClick={() => handleApplyPreset(idx)}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline truncate cursor-pointer text-left flex-1"
                            title={`Mặc ${preset.name}`}
                          >
                            {preset.name}
                          </button>
                          <button
                            onClick={() => handleSavePreset(idx)}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                            title={`Lưu đè vào Bộ ${idx + 1}`}
                          >
                            <Bookmark className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeletePreset(idx)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            title={`Xóa Bộ ${idx + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleSavePreset(idx)}
                          className="w-full text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-0.5 cursor-pointer text-center"
                        >
                          + Lưu Bộ {idx + 1}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earn Coins CTA */}
            <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  Cần thêm Xu và Sao Danh Dự?
                </div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                  Làm bài tập SGK (tới 3 xu/bài) hoặc thi đấu tại Đấu Trường để mở khóa trang bị mới.
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.play('click');
                  onNavigateToStudy();
                }}
                className="shrink-0 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 whitespace-nowrap cursor-pointer transition-colors"
              >
                <span>Học Ngay</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Category Navigation + Shop Grid */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs */}
          <div className="hsv-studio-categories bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-xs gap-1.5">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.play('click');
                    setActiveTab(tab.id);
                    setRarityFilter('all');
                    setSearchQuery('');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB: APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                {[
                  { id: 'hair' as const, label: 'Tóc & Mũ Giáp' },
                  { id: 'eyes' as const, label: 'Mắt, Kính & Mặt Nạ' },
                  { id: 'skin' as const, label: 'Làn Da' },
                  { id: 'gender' as const, label: 'Hình Mẫu' },
                  { id: 'frame' as const, label: 'Khung Avatar' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      selectedSubCategory === sub.id
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {selectedSubCategory === 'hair' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                      Kiểu Tóc Học Sinh
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {regularHairStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleUpdateAppearance({ hairStyle: style.id })}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            student.avatarConfig.hairStyle === style.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-xs">{style.name}</div>
                          {student.avatarConfig.hairStyle === style.id && (
                            <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                              <Check className="w-3 h-3" /> Đang chọn
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                      Mũ Giáp, Nón & Biệt Đội
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {headgearStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleUpdateAppearance({ hairStyle: style.id })}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            student.avatarConfig.hairStyle === style.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-xs">{style.name}</div>
                          {student.avatarConfig.hairStyle === style.id && (
                            <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                              <Check className="w-3 h-3" /> Đang đội
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                      Chọn Màu Tóc & Mũ Giáp Cá Tính
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {HAIR_COLORS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleUpdateAppearance({ hairColor: c.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                            student.avatarConfig.hairColor === c.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 font-bold'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.id }}
                          />
                          <span className="text-xs text-slate-700 dark:text-slate-300">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedSubCategory === 'eyes' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    Biểu Cảm Khuôn Mặt, Kính & Mặt Nạ Siêu Anh Hùng
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EYE_EXPRESSIONS.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => handleUpdateAppearance({ eyeExpression: exp.id })}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          student.avatarConfig.eyeExpression === exp.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="text-xs">{exp.name}</div>
                        {student.avatarConfig.eyeExpression === exp.id && (
                          <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                            <Check className="w-3 h-3" /> Đang dùng
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubCategory === 'skin' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    Tông Màu Da Nhân Vật
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {SKIN_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => handleUpdateAppearance({ skinColor: tone.id })}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          student.avatarConfig.skinColor === tone.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 font-bold'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-black/20"
                          style={{ backgroundColor: tone.id }}
                        />
                        <span className="text-xs text-slate-700 dark:text-slate-300">{tone.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubCategory === 'gender' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    Hình Mẫu Nhân Vật
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'boy' as const, label: 'Học Sinh Nam', icon: '👦' },
                      { id: 'girl' as const, label: 'Học Sinh Nữ', icon: '👧' },
                      { id: 'scholar' as const, label: 'Nhà Thông Thái', icon: '🎓' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleUpdateAppearance({ gender: g.id })}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                          student.avatarConfig.gender === g.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 font-bold'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="text-3xl mb-1">{g.icon}</div>
                        <div className="text-xs text-slate-800 dark:text-slate-200">{g.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubCategory === 'frame' && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    Khung Trang Trí Sân Khấu Nhân Vật
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVATAR_FRAMES.map((frame) => {
                      const active = avatarFrameId === frame.id;
                      return (
                        <button
                          key={frame.id}
                          onClick={() => handleSelectAvatarFrame(frame.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            active
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 font-bold'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl border-2 ${frame.ringClass} bg-white dark:bg-slate-800 shrink-0 flex items-center justify-center`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full"
                              style={{ backgroundColor: frame.accentColor }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {frame.name}
                            </div>
                            <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                              {frame.desc}
                            </div>
                          </div>
                          {active && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PERSONAL ROOM DECORATION */}
          {activeTab === 'room' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Phòng Cá Nhân Học Sinh
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Chọn màu tường và sắp xếp bàn học, giường ngủ, kệ cúp hiển thị trực tiếp trên sân khấu bên trái!
                  </p>
                </div>

                {myRoomItem && (
                  <div className="shrink-0">
                    {ownsMyRoom ? (
                      equippedMyRoom ? (
                        <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1 whitespace-nowrap">
                          <Check className="w-3.5 h-3.5" /> Đang làm phông chính
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEquipItem(myRoomItem)}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors"
                        >
                          Đặt Làm Phông Chính
                        </button>
                      )
                    ) : (
                      <button
                        disabled={
                          Boolean(busyItemId) ||
                          student.coins < myRoomItem.costCoins ||
                          student.stars < myRoomItem.costStars ||
                          (isSupabaseConfigured && serverKeys !== null && !serverKeys.has(myRoomItem.id))
                        }
                        onClick={() => void handleBuyItem(myRoomItem)}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {isSupabaseConfigured && serverKeys !== null && !serverKeys.has(myRoomItem.id)
                            ? 'Chờ đồng bộ DB'
                            : `Mở Khóa Phòng (${myRoomItem.costCoins} xu · ${myRoomItem.costStars} sao)`}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Wall Color Themes */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                  Chọn Tông Màu Tường & Ánh Sáng
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ROOM_WALL_OPTIONS.map((w) => {
                    const active = roomDecor.wallTheme === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => updateRoomDecor({ ...roomDecor, wallTheme: w.id })}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: w.swatch }}
                          />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {w.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {w.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Furniture Toggles */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Bật / Tắt Nội Thất Trong Phòng
                  </h3>
                  <button
                    onClick={() => updateRoomDecor(DEFAULT_ROOM_DECOR)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Khôi phục mặc định
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOM_FURNITURE_TOGGLES.map((f) => {
                    const isOn = roomDecor[f.key];
                    return (
                      <button
                        key={f.key}
                        onClick={() => updateRoomDecor({ ...roomDecor, [f.key]: !isOn })}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isOn
                            ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/25'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {f.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {f.desc}
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 whitespace-nowrap ${
                            isOn
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isOn ? 'Đang bày' : 'Đang cất'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: STUDIO SETS COLLECTION (7 SETS) */}
          {activeTab === 'sets' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Sưu tầm đủ các món trong từng chủ đề để mở khóa và đeo danh hiệu vinh danh đặc biệt trên hồ sơ nhân vật.
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums shrink-0">
                  Đã mở {completedSets.length}/{STUDIO_SETS.length} danh hiệu
                </span>
              </div>

              {STUDIO_SETS.map((set) => {
                const setItems = set.itemIds
                  .map((id) => catalogItems.find((i) => i.id === id))
                  .filter((i): i is ShopItem => Boolean(i));
                const ownedInSet = setItems.filter((i) => student.unlockedItems.includes(i.id)).length;
                const isSetComplete = setItems.length > 0 && ownedInSet === setItems.length;
                const pct = setItems.length > 0 ? Math.round((ownedInSet / setItems.length) * 100) : 0;
                const accent = SET_ACCENT_STYLE[set.accentColor] || SET_ACCENT_STYLE.amber;
                const isTitleActive =
                  isSetComplete && displayedTitle === set.titleReward;

                return (
                  <div
                    key={set.id}
                    className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${accent.strip}`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <div className="min-w-0">
                        <div className={`flex items-center gap-2 text-xs font-semibold ${accent.text}`}>
                          <Trophy className="w-3.5 h-3.5 shrink-0" />
                          <span>Danh hiệu: {set.titleReward}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {ownedInSet}/{setItems.length} món
                          </span>
                        </div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                          {set.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {set.description}
                        </p>
                      </div>

                      {isSetComplete ? (
                        <button
                          onClick={() => handleSelectTitle(set.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                            isTitleActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{isTitleActive ? 'Đang đeo danh hiệu' : 'Đeo Danh Hiệu'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const firstMissing = setItems.find(
                              (i) => !student.unlockedItems.includes(i.id)
                            );
                            if (firstMissing) {
                              soundManager.play('click');
                              setPreviewItem(firstMissing);
                            }
                          }}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Mặc thử món thiếu
                        </button>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${accent.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {setItems.map((item) => {
                        const owned = student.unlockedItems.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              soundManager.play('click');
                              if (owned) {
                                handleEquipItem(item);
                              } else {
                                setPreviewItem(item);
                              }
                            }}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center gap-2 ${
                              owned
                                ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-85 hover:opacity-100'
                            }`}
                          >
                            <StudioItemThumbnail
                              renderType={item.renderType}
                              category={item.category}
                              rarity={item.rarity}
                              size="sm"
                            />
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                              {item.name}
                            </div>
                            <div className="text-[11px] font-semibold tabular-nums">
                              {owned ? (
                                <span className="text-emerald-600 dark:text-emerald-400">Đã có</span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400">
                                  {item.costCoins} xu
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: SHOP CATEGORY ITEMS */}
          {activeTab !== 'appearance' && activeTab !== 'sets' && activeTab !== 'room' && (
            <div className="space-y-3">
              {/* Filter + Search Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto max-w-full">
                  {(
                    [
                      { id: 'all', label: 'Tất cả' },
                      { id: 'owned', label: 'Đã có' },
                      { id: 'popular', label: 'Phổ biến' },
                      { id: 'vip', label: 'VIP' },
                      { id: 'mythic', label: 'Thần thoại' }
                    ] as const
                  ).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        soundManager.play('click');
                        setRarityFilter(f.id);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                        rarityFilter === f.id
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm vật phẩm..."
                      aria-label="Tìm vật phẩm"
                      className="pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                        aria-label="Xóa từ khóa tìm kiếm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap">
                    {currentCategoryItems.length} món
                  </span>
                </div>
              </div>

              {currentCategoryItems.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                  Chưa có vật phẩm nào phù hợp. Hãy xóa từ khóa hoặc chọn &quot;Tất cả&quot; để xem toàn bộ danh mục.
                </div>
              ) : (
                <div className="hsv-studio-items grid gap-3.5">
                  {currentCategoryItems.map((item) => {
                    const isUnlocked = student.unlockedItems.includes(item.id);
                    const equippedKey = `${item.category}Id` as keyof AvatarConfig;
                    const isEquipped = student.avatarConfig[equippedKey] === item.id;
                    const isPreviewing = previewItem?.id === item.id;
                    const canAfford =
                      student.coins >= item.costCoins && student.stars >= item.costStars;
                    const rarityMeta = RARITY_LABEL[item.rarity];
                    const isBuyingThis = busyItemId === item.id;
                    const isPendingServerSync =
                      isSupabaseConfigured && serverKeys !== null && !serverKeys.has(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`group relative overflow-hidden p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          isEquipped
                            ? 'bg-blue-50/70 dark:bg-blue-950/35 border-blue-400 dark:border-blue-600 shadow-sm'
                            : isPreviewing
                            ? 'bg-amber-50/50 dark:bg-amber-950/25 border-amber-400 dark:border-amber-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        {/* Top rarity accent hairline */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${rarityMeta.stripClass}`} />

                        <div className="flex items-start gap-3.5 pt-1">
                          <StudioItemThumbnail
                            renderType={item.renderType}
                            category={item.category}
                            rarity={item.rarity}
                            size="md"
                          />

                          <div className="min-w-0 flex-1">
                            {/* Unboxed clean metadata line */}
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                              <span className={rarityMeta.colorClass}>{rarityMeta.text}</span>
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                                ·
                              </span>
                              <span className="text-slate-500 dark:text-slate-400 truncate">
                                {item.tagline}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug mt-0.5">
                              {item.name}
                            </h4>

                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Bottom row: Pricing & Actions */}
                        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                          <div className="tabular-nums">
                            {isUnlocked ? (
                              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Đã sở hữu
                              </span>
                            ) : (
                              <div className="flex items-center gap-2.5 text-xs font-bold">
                                {item.costCoins > 0 ? (
                                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                    <CoinIcon className="w-3.5 h-3.5" /> {item.costCoins} xu
                                  </span>
                                ) : (
                                  <span className="text-emerald-600 font-bold">Miễn phí</span>
                                )}
                                {item.costStars > 0 && (
                                  <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                    <StarIcon className="w-3.5 h-3.5" /> cần {item.costStars} sao
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {!isEquipped && !isUnlocked && (
                              <button
                                onClick={() => {
                                  soundManager.play('click');
                                  setPreviewItem(isPreviewing ? null : item);
                                }}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 whitespace-nowrap cursor-pointer border transition-colors ${
                                  isPreviewing
                                    ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 text-amber-800 dark:text-amber-200'
                                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                }`}
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{isPreviewing ? 'Đang thử' : 'Mặc thử'}</span>
                              </button>
                            )}

                            {isEquipped ? (
                              <button
                                disabled
                                className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1 whitespace-nowrap cursor-default"
                              >
                                <Check className="w-3.5 h-3.5" /> Đang Dùng
                              </button>
                            ) : isUnlocked ? (
                              <button
                                onClick={() => handleEquipItem(item)}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl whitespace-nowrap cursor-pointer transition-colors"
                              >
                                Mặc Ngay
                              </button>
                            ) : isPendingServerSync ? (
                              <button
                                onClick={() => void handleBuyItem(item)}
                                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
                                title="Vật phẩm mới đang chờ quản trị viên đồng bộ lên Supabase"
                              >
                                Chờ đồng bộ
                              </button>
                            ) : canAfford ? (
                              <button
                                disabled={Boolean(busyItemId)}
                                onClick={() => void handleBuyItem(item)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 whitespace-nowrap cursor-pointer transition-colors disabled:opacity-60"
                              >
                                {isBuyingThis ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5" />
                                )}
                                <span>Mở Khóa</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  soundManager.play('click');
                                  onNavigateToStudy();
                                }}
                                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-amber-600 font-semibold text-xs rounded-xl flex items-center gap-1 border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
                                title="Chưa đủ xu hoặc sao - bấm để làm bài tập SGK kiếm thêm!"
                              >
                                <Lock className="w-3 h-3" />
                                <span>Kiếm Xu</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* UNBOXING REVEAL MODAL (SHAKE -> SPARKLE BURST) */}
      {unlockedRevealItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={closeRevealModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl text-center relative overflow-hidden"
          >
            <button
              onClick={closeRevealModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {unboxPhase === 'shaking' ? (
              <div className="py-6 flex flex-col items-center">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
                  Đang Mở Hộp Quà · {RARITY_LABEL[unlockedRevealItem.rarity].text}
                </div>

                <button
                  type="button"
                  onClick={() => completeUnboxReveal(unlockedRevealItem.rarity)}
                  className="relative my-4 p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
                  aria-label="Mở hộp quà ngay"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-amber-400 absolute -top-1 left-2 studio-sparkle-twinkle"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-300 absolute top-3 -right-1 studio-sparkle-twinkle"
                    style={{ animationDelay: '0.35s' }}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-sky-400 absolute bottom-2 -left-1 studio-sparkle-twinkle"
                    style={{ animationDelay: '0.6s' }}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>

                  <svg
                    viewBox="0 0 120 120"
                    className="w-32 h-32 studio-chest-shake drop-shadow-xl"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="unboxBoxBody" x1="0" y1="0" x2="1" y2="1">
                        <stop
                          offset="0%"
                          stopColor={
                            unlockedRevealItem.rarity === 'mythic'
                              ? '#8b5cf6'
                              : unlockedRevealItem.rarity === 'vip'
                              ? '#f59e0b'
                              : '#2563eb'
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            unlockedRevealItem.rarity === 'mythic'
                              ? '#db2777'
                              : unlockedRevealItem.rarity === 'vip'
                              ? '#d97706'
                              : '#1d4ed8'
                          }
                        />
                      </linearGradient>
                    </defs>
                    <ellipse cx="60" cy="104" rx="38" ry="8" fill="#0f172a" opacity="0.22" />
                    <rect x="22" y="48" width="76" height="52" rx="10" fill="url(#unboxBoxBody)" stroke="#1e293b" strokeWidth="3" />
                    <rect x="53" y="48" width="14" height="52" fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
                    <line x1="22" y1="50" x2="98" y2="50" stroke="#fef08a" strokeWidth="3" opacity="0.9" />
                    <rect x="17" y="34" width="86" height="18" rx="6" fill="url(#unboxBoxBody)" stroke="#1e293b" strokeWidth="3" />
                    <rect x="53" y="34" width="14" height="18" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
                    <path d="M60 34 C45 14, 30 24, 44 34 Z" fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
                    <path d="M60 34 C75 14, 90 24, 76 34 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
                    <circle cx="60" cy="34" r="5.5" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
                  </svg>
                </button>

                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                  Đang mở rương trang bị mới...
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Bấm vào hộp quà để mở ngay!
                </div>
              </div>
            ) : (
              <div className="studio-chest-reveal">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                  Mở Khóa Thành Công · {RARITY_LABEL[unlockedRevealItem.rarity].text}
                </div>

                <div className="my-5 relative flex items-center justify-center h-40">
                  <svg
                    viewBox="0 0 180 180"
                    className="w-44 h-44 absolute pointer-events-none studio-unbox-rays"
                    aria-hidden="true"
                  >
                    <g transform="translate(90 90)">
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <polygon
                          key={deg}
                          points="0,0 -9,-86 9,-86"
                          transform={`rotate(${deg})`}
                          fill={
                            unlockedRevealItem.rarity === 'mythic'
                              ? '#c084fc'
                              : unlockedRevealItem.rarity === 'vip'
                              ? '#fbbf24'
                              : '#60a5fa'
                          }
                          opacity="0.22"
                        />
                      ))}
                    </g>
                  </svg>

                  {[
                    { tx: '-74px', ty: '-52px', delay: '0s', size: 'w-5 h-5', color: 'text-amber-400' },
                    { tx: '76px', ty: '-48px', delay: '0.04s', size: 'w-5 h-5', color: 'text-yellow-300' },
                    { tx: '-82px', ty: '18px', delay: '0.07s', size: 'w-4 h-4', color: 'text-sky-400' },
                    { tx: '82px', ty: '22px', delay: '0.05s', size: 'w-4 h-4', color: 'text-pink-400' },
                    { tx: '-54px', ty: '66px', delay: '0.09s', size: 'w-5 h-5', color: 'text-emerald-400' },
                    { tx: '58px', ty: '64px', delay: '0.06s', size: 'w-5 h-5', color: 'text-amber-300' },
                    { tx: '0px', ty: '-78px', delay: '0.02s', size: 'w-6 h-6', color: 'text-yellow-400' },
                    { tx: '0px', ty: '78px', delay: '0.08s', size: 'w-4 h-4', color: 'text-violet-400' }
                  ].map((sp, idx) => (
                    <svg
                      key={idx}
                      viewBox="0 0 24 24"
                      className={`absolute pointer-events-none studio-sparkle-burst ${sp.size} ${sp.color}`}
                      style={
                        {
                          '--tx': sp.tx,
                          '--ty': sp.ty,
                          animationDelay: sp.delay
                        } as React.CSSProperties
                      }
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                    </svg>
                  ))}

                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-amber-400 absolute top-2 left-16 pointer-events-none studio-sparkle-twinkle"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-300 absolute bottom-3 right-16 pointer-events-none studio-sparkle-twinkle"
                    style={{ animationDelay: '0.5s' }}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 text-cyan-400 absolute top-8 right-12 pointer-events-none studio-sparkle-twinkle"
                    style={{ animationDelay: '0.9s' }}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
                  </svg>

                  <div className="relative z-10 studio-reveal-pop">
                    <StudioItemThumbnail
                      renderType={unlockedRevealItem.renderType}
                      category={unlockedRevealItem.category}
                      rarity={unlockedRevealItem.rarity}
                      size="lg"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {unlockedRevealItem.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5">
                  {unlockedRevealItem.description}
                </p>

                <button
                  onClick={() => {
                    soundManager.play('click');
                    closeRevealModal();
                  }}
                  className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-colors cursor-pointer"
                >
                  Tuyệt Vời · Đang Trang Bị
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
