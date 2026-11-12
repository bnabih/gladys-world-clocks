import test from 'node:test';
import assert from 'node:assert/strict';

import { clockRows, formatClock } from '../src/worldClocks.js';

test('formats time in Paris', () => {
  const date = new Date('2026-01-15T12:00:00Z');
  assert.equal(formatClock('Europe/Paris', date), '13:00');
});

test('formats time in Beirut', () => {
  const date = new Date('2026-01-15T12:00:00Z');
  assert.equal(formatClock('Asia/Beirut', date), '14:00');
});

test('displays one clock', () => {
  const rows = clockRows({ clock_count: 1 });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].label, 'Locale');
});

test('displays four clocks', () => {
  const rows = clockRows({ clock_count: 4 });
  assert.equal(rows.length, 4);
});

test('supports custom names', () => {
  const rows = clockRows({
    clock_count: 1,
    name_1: 'Maison',
    timezone_1: 'Europe/Zurich',
  });

  assert.equal(rows[0].label, 'Maison');
});

test('handles daylight saving time', () => {
  assert.equal(formatClock('Europe/Paris', new Date('2026-01-15T12:00:00Z')), '13:00');

  assert.equal(formatClock('Europe/Paris', new Date('2026-07-15T12:00:00Z')), '14:00');
});
