import { AlertTriangle, Clock, CheckCircle, Zap } from 'lucide-react';
import type { RushStatus } from '../lib/rushOrder';

interface Props {
  status: RushStatus;
  compact?: boolean;
}

export function RushOrderBanner({ status, compact = false }: Props) {
  const styles = {
    extreme: { bg: 'bg-[#7B0000]', border: 'border-red-900', text: 'text-red-100', sub: 'text-red-300', icon: AlertTriangle, iconColor: 'text-red-300', bar: 'bg-red-900' },
    rush: { bg: 'bg-[#3D0000]', border: 'border-rush/50', text: 'text-red-200', sub: 'text-red-400', icon: Clock, iconColor: 'text-rush', bar: 'bg-rush' },
    caution: { bg: 'bg-[#2A1F00]', border: 'border-yellow-700/50', text: 'text-yellow-200', sub: 'text-yellow-400', icon: Zap, iconColor: 'text-yellow-400', bar: 'bg-yellow-600' },
    none: { bg: 'bg-[#0A1F10]', border: 'border-green-800/30', text: 'text-green-200', sub: 'text-green-500', icon: CheckCircle, iconColor: 'text-green-500', bar: 'bg-[#1B4D3E]' },
  };

  const s = styles[status.warningLevel];
  const Icon = s.icon;

  if (compact) {
    return (
      <div className={`w-full ${s.bar} py-2.5 px-4 flex items-center justify-center gap-3 text-center`}>
        <Icon className={`w-3.5 h-3.5 ${s.iconColor} flex-shrink-0`} />
        <span className={`text-xs font-display font-bold uppercase tracking-wider ${s.text}`}>{status.message}</span>
        <span className="hidden sm:inline text-gray-400 opacity-40">·</span>
        <span className={`hidden sm:inline text-xs font-body ${s.sub}`}>{status.subMessage}</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} p-5`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${s.bar}`}>
          <Icon className={`w-5 h-5 ${s.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-display font-black text-sm uppercase tracking-wider leading-tight mb-1 ${s.text}`}>{status.message}</p>
          <p className={`text-xs font-body leading-relaxed ${s.sub}`}>{status.subMessage}</p>
          {status.isRush && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400 font-body">
                <strong className="text-white">Rush orders are accepted</strong> but carry no delivery guarantee before your event date. Standard production is <strong className="text-white">2 weeks (± a few days)</strong> from order confirmation. By proceeding you acknowledge and accept this.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
