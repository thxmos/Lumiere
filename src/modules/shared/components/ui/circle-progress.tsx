/*
 * CircleProgress:
 * A circular progress indicator component
 *
 * @param current: The current value of the progress
 * @param total: The total value of the progress
 * @param size: The size of the circle
 * @param strokeWidth: The width of the stroke
 * @param progressColor: The color of the progress
 * @param backgroundColor: The color of the background
 */

interface CircleProgressProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
}

const CircleProgress = ({
  current,
  total,
  size = 100,
  strokeWidth = 8,
  progressColor = "#4F46E5",
  backgroundColor = "#E5E7EB",
}: CircleProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="transition-all duration-300"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <circle
          className="transition-all duration-300"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
};

export default CircleProgress;
