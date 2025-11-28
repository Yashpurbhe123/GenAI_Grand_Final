import { 
  FileText, Globe, Shield, AlertTriangle, Cpu, Code, 
  Database, Newspaper, Search, Zap, Lock, Eye 
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingIcons() {
  const [icons, setIcons] = useState<Array<{
    Icon: any;
    top: string;
    left: string;
    size: string;
    delay: string;
    duration: string;
    opacity: string;
  }>>([]);

  useEffect(() => {
    const iconTypes = [
      FileText, Globe, Shield, AlertTriangle, Cpu, Code, 
      Database, Newspaper, Search, Zap, Lock, Eye
    ];

    const newIcons = Array.from({ length: 35 }).map((_, i) => {
      const Icon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      return {
        Icon,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.5 ? 'w-6 h-6' : 'w-8 h-8',
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 10}s`,
        opacity: `${0.15 + Math.random() * 0.2}` // 0.15 to 0.35 opacity
      };
    });

    setIcons(newIcons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => (
        <div
          key={index}
          className={`absolute text-blue-500 dark:text-blue-400 animate-float`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            opacity: item.opacity
          }}
        >
          <item.Icon className={item.size} />
        </div>
      ))}
    </div>
  );
}
