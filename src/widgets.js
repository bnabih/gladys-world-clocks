
import { clockRows, formatClock } from './worldClocks.js';

export const WORLD_CLOCKS_WIDGET = 'world_clocks';
export const SINGLE_WORLD_CLOCK_WIDGET = 'single_world_clock';

export const WIDGETS = {
  [WORLD_CLOCKS_WIDGET]: {
    async get(_gladys, { settings = {} } = {}) {
      return {
        ttl_seconds: 10,
        components: [
          {
            type: 'status',
            items: clockRows(settings),
          },
        ],
      };
    },
  },

  [SINGLE_WORLD_CLOCK_WIDGET]: {
    async get(_gladys, { settings = {} } = {}) {
      const name = String(settings.name || 'Locale').slice(0, 80);
      const timezone = settings.timezone || 'Europe/Zurich';

      let time;

      try {
        time = formatClock(timezone);
      } catch {
        time = formatClock('Europe/Zurich');
      }

      return {
        ttl_seconds: 10,
        components: [
          {
            type: 'value',
            label: name,
            value: time,
          },
        ],
      };
    },
  },
};

export function refreshWidgets(gladys) {
  for (const key of Object.keys(WIDGETS)) {
    gladys.requestWidgetRefresh(key);
  }
}
