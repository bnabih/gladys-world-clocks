# Gladys World Clocks

**A configurable world clock widget for Gladys Assistant.**

Display the current time in up to four different time zones directly on your Gladys Assistant dashboard.

Gladys World Clocks is a lightweight external integration designed for users who want to monitor multiple cities and time zones from a single dashboard widget.

## Features

- **1 to 4 clocks** in a single widget
- **Custom labels** for each clock
- **IANA time zone selection** using dropdown menus
- **24-hour time format**
- **Automatic daylight saving time adjustments**
- **Independent configuration** for each widget instance
- **10-second cache duration** to reduce display delays
- **Multi-architecture Docker support** for AMD64 and ARM64
- **No API key or external time service required**

## Default clocks

| Label | IANA time zone |
|---|---|
| Locale | Europe/Zurich |
| Beyrouth | Asia/Beirut |
| Casablanca | Africa/Casablanca |
| Paris | Europe/Paris |

All labels and time zones can be customized.

## Requirements

- Gladys Assistant 5.3.2 (tested installation)
- A compatible Docker host, including a 64-bit Raspberry Pi
- Internet access for initial installation

## Installation

1. Open **Gladys Assistant**.
2. Navigate to **Integrations**.
3. Select the option to install an external integration.
4. Use the GitHub repository URL:

   `https://github.com/bnabih/gladys-world-clocks`

5. Install and start the integration.
6. Open your Gladys dashboard.
7. Enter dashboard edit mode.
8. Add the **World Clocks** widget.
9. Configure your clocks and save.

**Note:** The integration has no global configuration options. Clock settings are configured directly inside the dashboard widget.

## Refresh behavior

The integration currently uses a cache duration of 10 seconds.

This reduces the delay compared with the original 60-second configuration, but does not guarantee exact synchronization with Gladys Assistant's built-in clock.

At minute boundaries, a short display delay may occur.

## Documentation

- [Documentation française](docs/fr.md)
- [English documentation](docs/en.md)

## Development

The integration is built with:

- Node.js
- Gladys Assistant Integration SDK
- JavaScript `Intl.DateTimeFormat`
- Docker
- GitHub Actions

Run locally:

```bash
npm ci
npm test
npm run lint
npm run format:check
```

The integration requires Gladys connection settings to run outside its normal installation environment.

## Releases

Docker images are published to GitHub Container Registry:

`ghcr.io/bnabih/gladys-world-clocks`

Release builds target:

- `linux/amd64`
- `linux/arm64`

## Known limitations

- Clocks are refreshed through Gladys widget requests rather than a browser-side timer.
- A short delay may occur at minute changes.
- The current widget does not provide a continuously ticking seconds display.
- Time zone selection depends on the options supported by the integration manifest.

## Project

**Repository:** https://github.com/bnabih/gladys-world-clocks

## License

Licensed under the Apache License, Version 2.0.

See [LICENSE](LICENSE).

Built using the Gladys Assistant JavaScript integration SDK and template.
