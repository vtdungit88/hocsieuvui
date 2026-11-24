export type VuiBotExpression = 'happy' | 'guiding' | 'thinking' | 'surprised' | 'cheer';

const BASE = import.meta.env.BASE_URL;

/** Unified Vui-Bot sprite registry shared across Home, Interactive Guide, Chat, Map, and Quiz reactions. */
export const VUIBOT_ASSETS: Record<VuiBotExpression, string> = {
  happy: `${BASE}assets/vuibot/happy.png`,
  guiding: `${BASE}assets/vuibot/guiding.png`,
  thinking: `${BASE}assets/vuibot/thinking.png`,
  surprised: `${BASE}assets/vuibot/surprised.png`,
  cheer: `${BASE}assets/vuibot/cheer.png`
};

export const VUIBOT_EXPRESSION_LABELS: Record<VuiBotExpression, string> = {
  happy: 'Vui vẻ chào bạn',
  guiding: 'Bay & chỉ dẫn',
  thinking: 'Đang suy nghĩ',
  surprised: 'Ngạc nhiên thích thú',
  cheer: 'Cổ vũ & chúc mừng'
};
