import React, { useMemo } from 'react';
import { figureToSvg } from '../utils/figureSvg';

/** Hình minh họa cho câu hỏi (hình học, biểu đồ, bảng). Dữ liệu hình do máy chủ trả về trong prompt.visualData. */
export const QuestionFigure: React.FC<{ data: unknown; alt?: string }> = ({ data, alt }) => {
  const svg = useMemo(() => figureToSvg(data), [data]);
  if (!svg) return null;
  return (
    <figure className="mt-3 flex justify-center">
      <div
        role="img"
        aria-label={alt || 'Hình minh họa cho câu hỏi'}
        className="bg-white rounded-xl border border-slate-200 p-2 max-w-full [&>svg]:block [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:max-h-64 [&>svg]:w-[min(100%,26rem)]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
};
