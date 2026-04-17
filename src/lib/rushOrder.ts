// ─────────────────────────────────────────────────────────────
// Rush Order utility — single source of truth across the app
// Never edit Stripe / Vercel / N8N logic here.
// ─────────────────────────────────────────────────────────────

export interface RushStatus {
  isRush: boolean;
  daysUntilEvent: number | null;
  estimatedDeliveryDate: string;
  warningLevel: 'none' | 'caution' | 'rush' | 'extreme';
  message: string;
  subMessage: string;
}

/**
 * Pass in an ISO event date string, e.g. "2026-06-06"
 * Returns a RushStatus object used everywhere in the UI.
 */
export function getRushStatus(eventDateISO: string): RushStatus {
  const eventDate = new Date(eventDateISO);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / msPerDay);

  // Estimated delivery = today + 14 days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 14);
  const estimatedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  if (daysUntilEvent <= 0) {
    return {
      isRush: false,
      daysUntilEvent: null,
      estimatedDeliveryDate,
      warningLevel: 'none',
      message: 'Event has passed',
      subMessage: 'Please contact us for late orders.',
    };
  }

  if (daysUntilEvent <= 7) {
    return {
      isRush: true,
      daysUntilEvent,
      estimatedDeliveryDate,
      warningLevel: 'extreme',
      message: '⛔ EXTREME RUSH — Less Than 1 Week to Event',
      subMessage: `Your event is only ${daysUntilEvent} day${daysUntilEvent === 1 ? '' : 's'} away. On-time delivery is very unlikely. Contact us directly before ordering.`,
    };
  }

  if (daysUntilEvent <= 14) {
    return {
      isRush: true,
      daysUntilEvent,
      estimatedDeliveryDate,
      warningLevel: 'rush',
      message: '⚠ RUSH ORDER — Under 2 Weeks to Event',
      subMessage: `Only ${daysUntilEvent} days until your event. Rush orders are processed at priority but delivery before the event date is NOT guaranteed.`,
    };
  }

  if (daysUntilEvent <= 21) {
    return {
      isRush: false,
      daysUntilEvent,
      estimatedDeliveryDate,
      warningLevel: 'caution',
      message: '⚡ Order Soon — 3 Weeks to Event',
      subMessage: `${daysUntilEvent} days until your event. Standard 2-week production applies — order now to ensure on-time arrival.`,
    };
  }

  return {
    isRush: false,
    daysUntilEvent,
    estimatedDeliveryDate,
    warningLevel: 'none',
    message: '✓ Standard Delivery — 2 Weeks from Order',
    subMessage: `Estimated delivery: ~${estimatedDeliveryDate}. Plenty of time before your event.`,
  };
}

// Nearest upcoming Islamic Games 2026 event
export const IG_EVENTS_2026 = [
  { city: 'New Jersey', iso: '2026-06-06', url: 'https://islamic-games.com/new-jersey/' },
  { city: 'Dallas', iso: '2026-06-13', url: 'https://islamic-games.com/dallas/' },
  { city: 'Chicago', iso: '2026-07-17', url: 'https://islamic-games.com/chicago/' },
  { city: 'Michigan', iso: '2026-09-06', url: 'https://islamic-games.com/michigan/' },
  { city: 'Houston', iso: '2026-10-01', url: 'https://islamic-games.com/houston/' },
];

export function getNearestEventRushStatus(): RushStatus {
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const upcoming = IG_EVENTS_2026
    .map(ev => ({ ...ev, days: Math.ceil((new Date(ev.iso).getTime() - today.getTime()) / msPerDay) }))
    .filter(ev => ev.days > 0)
    .sort((a, b) => a.days - b.days);

  if (upcoming.length === 0) return getRushStatus('2026-10-01');
  return getRushStatus(upcoming[0].iso);
}
