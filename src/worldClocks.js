
export const DEFAULT_CLOCKS = [
  { name: 'Locale', timezone: 'Europe/Zurich' },
  { name: 'Beyrouth', timezone: 'Asia/Beirut' },
  { name: 'Casablanca', timezone: 'Africa/Casablanca' },
  { name: 'Paris', timezone: 'Europe/Paris' },
];

export function formatClock(timezone, date = new Date()) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

export function clockRows(settings = {}, date = new Date()) {
  const count = Math.max(
    1,
    Math.min(4, Number(settings.clock_count ?? 4) || 4)
  );

  return DEFAULT_CLOCKS.slice(0, count).map((fallback, index) => {
    const n = index + 1;

    const timezone =
      settings[`timezone_${n}`] || fallback.timezone;

    const name = String(
      settings[`name_${n}`] || fallback.name
    ).slice(0, 80);

    let time;

    try {
      time = formatClock(timezone, date);
    } catch {
      time = formatClock(fallback.timezone, date);
    }

    return {
      label: name,
      value: time,
      icon: 'clock',
    };
  });
}
