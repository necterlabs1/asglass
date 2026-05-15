type Color = 'coral' | 'cyan' | 'gold' | 'green' | 'gray';

const colors: Record<Color, string> = {
  coral: 'bg-[#ff6b6b] text-white',
  cyan:  'bg-[#00d2d3] text-black',
  gold:  'bg-[#ffd700] text-black',
  green: 'bg-green-500 text-white',
  gray:  'bg-[#2a2a2a] text-[#9a9a9a]',
};

export default function Badge({ children, color = 'coral', className = '' }: { children: React.ReactNode; color?: Color; className?: string }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
