# Gladys World Clocks

A configurable world clock dashboard widget for **Gladys Assistant**.

Display the current time in up to four different time zones, with customizable labels and automatic daylight saving time adjustments.

## Features

- Display 1, 2, 3 or 4 clocks in a single dashboard widget.
- Customize the name of each clock.
- Select time zones from an IANA time zone dropdown.
- Use the 24-hour time format.
- Automatically handle daylight saving time changes.
- Configure each clock directly from the Gladys dashboard.
- Preserve the configuration of hidden clocks.

## Default configuration

| Clock | Label | Time zone |
|---|---|---|
| 1 | Locale | Europe/Zurich |
| 2 | Beyrouth | Asia/Beirut |
| 3 | Casablanca | Africa/Casablanca |
| 4 | Paris | Europe/Paris |

These are default values. Users can change the names and time zones.

## Requirements

- Gladys Assistant 5.3.2 (target version)
- Raspberry Pi or another compatible Docker host
- Gladys external integration support

## Installation

**Development status: not yet released or validated on Gladys 5.3.2.**

Once a compatible Docker image has been built and published:

1. Open Gladys Assistant.
2. Navigate to Integrations.
3. Find the World Clocks integration.
4. Install and start the integration.
5. Open the dashboard editor.
6. Add the World Clocks widget.
7. Configure the number of clocks, labels and time zones.

Installation availability depends on the integration being successfully published and recognized by Gladys.

## Configuration

The widget is designed to accept nine settings:

| Setting | Description |
|---|---|
| `clock_count` | Number of clocks (1–4) |
| `name_1` to `name_4` | Custom clock labels |
| `timezone_1` to `timezone_4` | IANA time zone identifiers |

Time zone conversion uses JavaScript's `Intl.DateTimeFormat` API.

The widget requests a cache duration of 60 seconds. Actual dashboard refresh behavior depends on Gladys.

## Project structure

```text
gladys-world-clocks/
├── index.js
├── src/
│   ├── widgets.js
│   └── worldClocks.js
├── gladys-assistant-integration.json
├── package.json
├── package-lock.json
├── Dockerfile
└── README.md
```

Additional GitHub Actions, test and configuration files may be present.

## Development

Install dependencies:

```bash
npm ci
```

Run tests:

```bash
npm test
```

Start the integration:

```bash
npm start
```

Starting the integration requires a correctly configured Gladys environment.

## Compatibility status

The clock calculation logic has been implemented.

The following items still require end-to-end verification:

- Dashboard widget rendering
- Complete IANA dropdown compatibility
- Docker image publication
- Installation and refresh behavior on Gladys 5.3.2

## License

Apache License 2.0.

See the `LICENSE` file.

## Credits

Built using the Gladys Assistant JavaScript integration template and SDK.

- Gladys Assistant: https://gladysassistant.com
- Gladys Assistant GitHub: https://github.com/GladysAssistant
- Project repository: https://github.com/bnabih/gladys-world-clocks
