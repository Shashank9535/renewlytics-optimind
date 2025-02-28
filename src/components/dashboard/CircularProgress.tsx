
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = 'stroke-renewal-500',
  bgColor = 'stroke-slate-200 dark:stroke-slate-700',
  className,
  labelClassName,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        <circle
          className={bgColor}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          className={cn("transition-all duration-1000 ease-out", color)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("text-2xl font-bold", labelClassName)}>
          {value}%
        </span>
        {label && <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</span>}
      </div>
    </div>
  );
}
