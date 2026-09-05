import React, { useEffect, useState } from 'react';

export const ScoreRing = ({ score }: { score: number }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setProgress(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const size = 132;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  let color = '#fb7185'; // low
  if (score >= 85) color = '#34d399'; // excellent
  else if (score >= 70) color = '#a3e635'; // good
  else if (score >= 55) color = '#fbbf24'; // medium

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1s ease-out'
          }}
        />
      </svg>
      <div className="absolute text-center flex flex-col items-center">
        <span className="text-[32px] font-bold text-[--color-text-primary] leading-none">{score}</span>
        <span className="text-[10px] font-semibold tracking-[1px] uppercase text-[--color-text-muted] mt-1">综合评分</span>
      </div>
    </div>
  );
};

export const RadarChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40; // leave room for labels
  const rings = 4;

  // Helper to get coordinates
  const getPoint = (value: number, index: number, max = 100) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const distance = (value / max) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  const dataPoints = data.map((d, i) => getPoint(d.value, i));
  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="overflow-visible">
      {/* Grid Rings */}
      {[...Array(rings)].map((_, i) => {
        const ringRadius = (radius / rings) * (i + 1);
        const points = data.map((_, j) => {
          const angle = (Math.PI * 2 * j) / data.length - Math.PI / 2;
          return `${center + ringRadius * Math.cos(angle)},${center + ringRadius * Math.sin(angle)}`;
        }).join(' ');
        
        return (
          <polygon key={`ring-${i}`} points={points} fill="none" stroke="#334155" strokeWidth="1" />
        );
      })}

      {/* Axis Lines */}
      {data.map((_, i) => {
        const p = getPoint(100, i);
        return (
          <line key={`axis-${i}`} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#1e293b" strokeWidth="1" />
        );
      })}

      {/* Data Polygon */}
      <path
        d={polygonPath}
        fill="rgba(99,102,241,0.28)"
        stroke="var(--color-primary-hover)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data Points & Labels */}
      {data.map((d, i) => {
        const p = getPoint(d.value, i);
        const labelP = getPoint(120, i); // push labels out further
        
        // Adjust text anchor based on position
        let textAnchor = 'middle';
        if (labelP.x > center + 10) textAnchor = 'start';
        else if (labelP.x < center - 10) textAnchor = 'end';

        return (
          <g key={`data-${i}`}>
            <circle cx={p.x} cy={p.y} r="3.5" fill={d.color} />
            <text
              x={labelP.x}
              y={labelP.y - 5}
              fill="var(--color-text-secondary)"
              fontSize="10.5"
              textAnchor={textAnchor}
              alignmentBaseline="middle"
            >
              {d.label}
            </text>
            <text
              x={labelP.x}
              y={labelP.y + 10}
              fill="var(--color-text-primary)"
              fontSize="12"
              fontWeight="bold"
              textAnchor={textAnchor}
              alignmentBaseline="middle"
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
