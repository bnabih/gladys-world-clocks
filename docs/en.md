# Gladys World Clocks — English Documentation

## Overview

**Gladys World Clocks** is an external integration for Gladys Assistant that displays up to four international clocks in a single dashboard widget.

It allows users to monitor multiple cities and time zones without manually calculating time differences.

## Features

- Display 1, 2, 3 or 4 clocks.
- Customize the label of each clock.
- Select time zones from IANA time zone dropdown menus.
- Display time in 24-hour format.
- Automatically handle daylight saving time changes.
- Configure clocks directly in the Gladys dashboard.
- Use a 10-second widget cache duration.
- Support Docker deployments on AMD64 and ARM64.

## Requirements

- Gladys Assistant 5.3.2.
- A compatible Docker host, such as a 64-bit Raspberry Pi.
- Access to the Gladys web interface.
- Internet access for downloading the integration.

SSH access is not required for installation through Gladys.

## Installation

1. Open Gladys Assistant.
2. Navigate to **Integrations**.
3. Select **Install an integration**.
4. Install the integration using its GitHub repository:

   https://github.com/bnabih/gladys-world-clocks

5. Start the installation.
6. Wait until the integration is running.

If the integration is not listed in the catalog, use the GitHub installation option available in your Gladys version.

## Adding the dashboard widget

1. Open your Gladys **Dashboard**.
2. Enter edit mode.
3. Click **Add widget**.
4. Search for **World Clocks**.
5. Add the widget.
6. Configure the clocks.
7. Save your dashboard.

## Widget configuration

The widget supports nine settings.

| Setting       | Description                       |
| ------------- | --------------------------------- |
| `clock_count` | Number of clocks to display (1–4) |
| `name_1`      | First clock label                 |
| `timezone_1`  | First clock time zone             |
| `name_2`      | Second clock label                |
| `timezone_2`  | Second clock time zone            |
| `name_3`      | Third clock label                 |
| `timezone_3`  | Third clock time zone             |
| `name_4`      | Fourth clock label                |
| `timezone_4`  | Fourth clock time zone            |

Settings for hidden clocks are preserved.

### Default configuration

| Clock | Label      | Time zone         |
| ----- | ---------- | ----------------- |
| 1     | Locale     | Europe/Zurich     |
| 2     | Beyrouth   | Asia/Beirut       |
| 3     | Casablanca | Africa/Casablanca |
| 4     | Paris      | Europe/Paris      |

All default labels and time zones can be changed.

### Selecting a time zone

Each clock provides a dropdown menu with geographic IANA time zones.

Examples include:

- `Europe/Zurich`
- `Europe/Paris`
- `Asia/Beirut`
- `Africa/Casablanca`
- `America/New_York`
- `Asia/Tokyo`
- `Pacific/Auckland`

The available options are defined in the integration manifest. Historical IANA aliases may not be included.

### Changing the number of clocks

Select a number between 1 and 4 in the widget settings.

For example, changing the number from four to two hides the third and fourth clocks without deleting their saved settings.

## How time calculation works

The integration uses JavaScript's `Intl.DateTimeFormat` API to calculate the current time for each selected time zone.

Daylight saving time changes are handled automatically using the time zone data available in the Node.js environment.

No external time API or API key is required.

## Refresh and synchronization

The widget currently uses:

```javascript
ttl_seconds: 10;
```

This specifies a 10-second cache duration.

It does not guarantee that the dashboard refreshes at exact 10-second intervals.

Unlike Gladys Assistant's built-in clock, World Clocks calculates time inside the integration and sends the result to the dashboard.

A short delay may therefore occur when the minute changes.

For example:

- Gladys built-in clock: `16:34`
- World Clocks: `16:33`

The World Clocks widget may display the new minute a few seconds later.

This is a known refresh limitation, not necessarily a time zone calculation error.

## Troubleshooting

### "This integration has no configuration options"

This is expected.

Clock settings are configured in the dashboard widget, not in the integration's global Configuration page.

### The widget is missing

Check that:

1. The integration is installed.
2. The integration container is running.
3. The installed version includes the `world_clocks` widget.
4. The dashboard is in edit mode.

### The clock is delayed

Wait for the next widget refresh.

Make sure the installed integration version includes the 10-second cache setting.

A short delay can still occur.

### The displayed time is several hours incorrect

Check the selected IANA time zone.

For example, `Europe/Zurich` and `Europe/Paris` normally show the same local time, while `Asia/Beirut` uses a different time zone.

### A clock is not visible

Check the configured number of clocks and verify that the selected time zone is available.

## Updating the integration

When a new version is published:

1. Open **Integrations** in Gladys.
2. Select **Gladys World Clocks**.
3. Check whether an update is available.
4. Install the new version.
5. Wait for the integration to restart.
6. Verify the dashboard display.

New releases are built using GitHub Actions and distributed as Docker images.

## Development

The project uses:

- Node.js
- Gladys Assistant Integration SDK
- JavaScript `Intl.DateTimeFormat`
- Docker
- GitHub Actions

### Source files

| File                                | Purpose                                       |
| ----------------------------------- | --------------------------------------------- |
| `index.js`                          | Integration initialization and SDK connection |
| `src/widgets.js`                    | Dashboard widget definition                   |
| `src/worldClocks.js`                | Time zone calculations and clock rows         |
| `gladys-assistant-integration.json` | Integration manifest and widget settings      |
| `test/`                             | Automated tests                               |

### Testing

Run the following commands in a development environment:

```bash
npm ci
npm run format:check
npm run lint
npm test
```

### Docker images

Published images are available under:

`ghcr.io/bnabih/gladys-world-clocks`

Supported release architectures:

- `linux/amd64`
- `linux/arm64`

### Release workflow

The GitHub Actions Release workflow:

1. Updates the project version.
2. Updates the integration manifest.
3. Creates a Git tag.
4. Builds and publishes the Docker images.
5. Creates a GitHub Release.

## Known limitations

- Clock updates are not synchronized exactly with the built-in Gladys clock.
- The current widget displays hours and minutes, without continuously ticking seconds.
- Each widget instance supports a maximum of four clocks.
- Time zone choices are defined by the integration manifest.

## Support

GitHub repository:

https://github.com/bnabih/gladys-world-clocks

Report an issue:

https://github.com/bnabih/gladys-world-clocks/issues

## License

Licensed under the Apache License, Version 2.0.

See the root `LICENSE` file.

Built using the Gladys Assistant JavaScript integration SDK and template.
