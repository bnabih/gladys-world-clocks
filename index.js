
import { GladysIntegration, logger } from '@gladysassistant/integration-sdk';
import { WIDGETS } from './src/widgets.js';

const gladys = new GladysIntegration();

// Enregistrer les widgets avant la connexion.
for (const [widgetKey, widget] of Object.entries(WIDGETS)) {
  gladys.onWidgetGet(widgetKey, (request) =>
    widget.get(gladys, request)
  );
}

gladys.on('connected', async () => {
  try {
    await gladys.setConnectionStatus(true);
    logger.info('World Clocks integration connected');
  } catch (error) {
    logger.error('Could not set integration connection status', error);
  }
});

gladys.handleShutdown((signal) => {
  logger.info(`Received ${signal}; shutting down`);
});

logger.info('Starting World Clocks integration');

gladys.connect().catch((error) => {
  logger.error('Initial connection failed', error);
  process.exit(1);
});
