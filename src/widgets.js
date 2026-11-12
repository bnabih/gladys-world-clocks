import { clockRows } from './worldClocks.js';

export const WORLD_CLOCKS_WIDGET = 'world_clocks';

export const WIDGETS = {
  [WORLD_CLOCKS_WIDGET]: {
    async get(_gladys, { settings = {} } = {}) {
      return {
        ttl_seconds: 60,
        components: [{ type: 'status', items: clockRows(settings) }],
      };
    },
  },
};

export function refreshWidgets(gladys) {
  for (const key of Object.keys(WIDGETS)) gladys.requestWidgetRefresh(key);
}
