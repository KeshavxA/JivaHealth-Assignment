import { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export function AreaChart({
  data,
  color = '#2D7A3A',
  height = 180,
  formatValue = (v) => v.toString(),
}: AreaChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  const W = 500;
  const H = height;
  const PAD = { top: 20, right: 20, bottom: 30, left: 40 };

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const minVal = 0;

  const xScale = (i: number) => PAD.left + (i / (data.length - 1)) * plotW;
  const yScale = (v: number) => PAD.top + plotH - ((v - minVal) / (maxVal - minVal)) * plotH;

  const points = data.map((d, i) => ({ x: xScale(i), y: yScale(d.value), value: d.value, label: d.label }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${PAD.top + plotH} L ${points[0].x} ${PAD.top + plotH} Z`;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`area-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.top + plotH * t;
          const v = maxVal * (1 - t);
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#F1F5F9" strokeWidth="1" />
              <text x={PAD.left - 5} y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">
                {v > 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={H - 5} fontSize="10" fill="#9CA3AF" textAnchor="middle">
            {d.label}
          </text>
        ))}

        <path d={areaD} fill={`url(#area-grad-${color.replace('#', '')})`} />

        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="white"
            stroke={color}
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => {
              setTooltip({ x: p.x, y: p.y, value: p.value, label: p.label });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className="absolute z-10 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg pointer-events-none shadow-lg whitespace-nowrap"
          style={{
            left: `${(tooltip.x / 500) * 100}%`,
            top: `${(tooltip.y / height) * 100}%`,
            transform: 'translate(-50%, -130%)',
          }}
        >
          <span className="font-semibold">{tooltip.label}:</span> {formatValue(tooltip.value)}
        </div>
      )}
    </div>
  );
}

interface BarChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export function BarChart({ data, color = '#2D7A3A', height = 180, formatValue = (v) => v.toString() }: BarChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  const W = 500;
  const H = height;
  const PAD = { top: 20, right: 20, bottom: 30, left: 40 };

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.1;
  const barWidth = (plotW / data.length) * 0.6;
  const barGap = plotW / data.length;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.top + plotH * t;
          const v = maxVal * (1 - t);
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#F1F5F9" strokeWidth="1" />
              <text x={PAD.left - 5} y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="end">
                {v > 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const bh = (d.value / maxVal) * plotH;
          const bx = PAD.left + i * barGap + barGap / 2 - barWidth / 2;
          const by = PAD.top + plotH - bh;
          return (
            <g key={i}>
              <rect
                x={bx}
                y={by}
                width={barWidth}
                height={bh}
                rx="4"
                fill={color}
                opacity="0.85"
                className="cursor-pointer transition-opacity hover:opacity-100"
                onMouseEnter={() => setTooltip({ x: bx + barWidth / 2, y: by, value: d.value, label: d.label })}
                onMouseLeave={() => setTooltip(null)}
              />
              <text x={bx + barWidth / 2} y={H - 5} fontSize="10" fill="#9CA3AF" textAnchor="middle">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div
          className="absolute z-10 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg pointer-events-none shadow-lg whitespace-nowrap"
          style={{
            left: `${(tooltip.x / 500) * 100}%`,
            top: `${(tooltip.y / height) * 100}%`,
            transform: 'translate(-50%, -130%)',
          }}
        >
          <span className="font-semibold">{tooltip.label}:</span> {formatValue(tooltip.value)}
        </div>
      )}
    </div>
  );
}
