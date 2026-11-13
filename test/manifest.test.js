import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { WIDGETS } from '../src/widgets.js';
import { DEFAULT_CLOCKS } from '../src/worldClocks.js';

const manifest = JSON.parse(
  await readFile(new URL('../gladys-assistant-integration.json', import.meta.url), 'utf8'),
);

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

const widget = manifest.widgets?.find((item) => item.key === 'world_clocks');

const settings = widget?.settings ?? [];

function getSetting(key) {
  return settings.find((item) => item.key === key);
}

test('manifest has a valid name', () => {
  assert.ok(typeof manifest.name === 'string' && manifest.name.length > 0);
});

test('manifest version matches package version', () => {
  assert.equal(manifest.version, pkg.version);
});

test('Docker image matches the release version', () => {
  assert.equal(manifest.docker_image, `ghcr.io/bnabih/gladys-world-clocks:${pkg.version}`);
});

test('Gladys minimum version is compatible', () => {
  assert.match(manifest.gladys_version, /^>=5\./);
});

test('world_clocks widget is declared', () => {
  assert.ok(widget, 'world_clocks widget is missing');
  assert.equal(typeof WIDGETS.world_clocks?.get, 'function');
});

test('only the expected widget is registered', () => {
  assert.deepEqual(Object.keys(WIDGETS), [
    'world_clocks',
    'single_world_clock',
  ]);
});

test('widget has nine settings', () => {
  assert.equal(settings.length, 9);
});

test('clock_count is configurable', () => {
  const field = getSetting('clock_count');

  assert.ok(field, 'clock_count is missing');

  if (field.type === 'select') {
    const values = field.options.map((option) => Number(option.value));

    assert.deepEqual(values, [1, 2, 3, 4]);
  } else {
    assert.equal(field.type, 'number');
    assert.equal(field.min, 1);
    assert.equal(field.max, 4);
  }
});

test('four clock names are configurable', () => {
  for (let i = 1; i <= 4; i++) {
    const field = getSetting(`name_${i}`);

    assert.ok(field, `name_${i} is missing`);
    assert.equal(field.type, 'string');
  }
});

test('four timezone dropdowns exist', () => {
  for (let i = 1; i <= 4; i++) {
    const field = getSetting(`timezone_${i}`);

    assert.ok(field, `timezone_${i} is missing`);
    assert.equal(field.type, 'select');
    assert.ok(Array.isArray(field.options));
    assert.ok(field.options.length > 100);
  }
});

test('default timezones are available', () => {
  for (let i = 1; i <= 4; i++) {
    const field = getSetting(`timezone_${i}`);
    const timezone = DEFAULT_CLOCKS[i - 1].timezone;

    assert.ok(field, `timezone_${i} is missing`);

    assert.ok(
      field.options.some((option) => option.value === timezone),
      `${timezone} is missing from timezone_${i}`,
    );
  }
});

test('default clocks have valid timezones', () => {
  assert.equal(DEFAULT_CLOCKS.length, 4);

  for (const clock of DEFAULT_CLOCKS) {
    assert.ok(clock.name);

    assert.doesNotThrow(() => {
      new Intl.DateTimeFormat('fr-FR', {
        timeZone: clock.timezone,
      });
    });
  }
});

test('demo widgets are removed', () => {
  assert.equal(
    manifest.widgets.some((item) => item.key === 'demo_status'),
    false,
  );
});

test('demo actions and scenes are removed', () => {
  assert.equal((manifest.actions ?? []).length, 0);
  assert.equal((manifest.scene_actions ?? []).length, 0);
  assert.equal((manifest.scene_triggers ?? []).length, 0);
});

test('single world clock is configurable', () => {
  const single = manifest.widgets.find(
    (item) => item.key === 'single_world_clock'
  );

  assert.ok(single);
  assert.equal(typeof WIDGETS.single_world_clock?.get, 'function');

  const name = single.settings.find((item) => item.key === 'name');
  const timezone = single.settings.find(
    (item) => item.key === 'timezone'
  );

  assert.equal(name.type, 'string');
  assert.equal(timezone.type, 'select');
  assert.ok(timezone.options.length > 100);
});

