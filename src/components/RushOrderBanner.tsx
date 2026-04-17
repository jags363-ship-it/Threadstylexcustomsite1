import { AlertTriangle, Clock, CheckCircle, Zap } from 'lucide-react';
import type { RushStatus } from '../lib/rushOrder';

interface Props { status: RushStatus; compact?: boolean; }

export function RushOrderBanner({ status, compact = false }: Props) {
  const styles = {
    extreme: { bg: 'bg-red-50',   border: 'border-red-200',   text: 'text-red-800',   sub: 'text-red-600',   icon: AlertTriangle, iconBg: 'bg-red-100',   iconColor: 'text-red-500' },
    rush:    { bg: 'bg-orange-50',border: 'border-orange-200',text: 'text-orange-800',sub: 'text-orange-600',icon: Clock,         iconBg: 'bg-orange-100',iconColor: 'text-orange-500' },
    caution: { bg: 'bg-yellow-50',border: 'border-yellow-200',text: 'text-yellow-800',sub: 'text-yellow-700',icon: Zap,           iconBg: 'bg-yellow-100',iconColor: 'text-yellow-600' },
    none:    { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', sub: 'text-green-600', icon: CheckCircle,   iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  };
  const s = styles[status.warningLevel];
  const Icon = s.icon;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${s.bg} ${s.border}`}>
        <Icon className={`w-3.5 h-3.5 ${s.iconColor} flex-shrink-0`} />
        <span className={`text-xs font-medium ${s.text}`}>{status.message}</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} p-4`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${s.iconBg}`}>
          <Icon className={`w-4 h-4 ${s.iconColor}`} />
        </div>
        <div className="flex-1">
          {/* Normal weight, readable font — not condensed bold */}
          <p className={`font-semibold text-sm leading-snug mb-0.5 ${s.text}`}>
            {status.message}
          </p>
          <p className={`text-xs leading-relaxed ${s.sub}`}>
            {status.subMessage}
          </p>
          {status.isRush && (
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Rush orders are accepted but carry no delivery guarantee. Standard production is 2 weeks from order confirmation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
