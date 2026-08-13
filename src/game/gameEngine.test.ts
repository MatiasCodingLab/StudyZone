import { describe, expect, it } from 'vitest';
import { createSession, drawNext, isSessionComplete, recordAnswer } from './gameEngine';

const identityShuffle = <T,>(items: T[]): T[] => [...items];

describe('gameEngine', () => {
  it('removes a state from the round when answered correctly', () => {
    let session = createSession(['a', 'b', 'c'], identityShuffle);
    expect(session.currentId).toBe('a');
    session = recordAnswer(session, 'correct', 1000, null);
    expect(session.masteredIds).toEqual(['a']);
    expect(session.queue).toEqual(['b', 'c']);
  });

  it('keeps a wrongly answered state in the pool for later', () => {
    let session = createSession(['a', 'b', 'c'], identityShuffle);
    session = recordAnswer(session, 'wrong', 1000, null);
    expect(session.masteredIds).toEqual([]);
    expect(session.queue).toContain('a');
  });

  it('keeps a skipped state in the pool for later', () => {
    let session = createSession(['a', 'b', 'c'], identityShuffle);
    session = recordAnswer(session, 'skip', 1000, null);
    expect(session.masteredIds).toEqual([]);
    expect(session.queue).toContain('a');
  });

  it('does not immediately repeat a missed state when other states remain', () => {
    let session = createSession(['a', 'b', 'c', 'd'], identityShuffle);
    // current = a, queue = [b, c, d]
    session = recordAnswer(session, 'wrong', 1000, null); // a re-enters after gap of 2
    expect(session.queue).toEqual(['b', 'c', 'a', 'd']);
    session = drawNext(session);
    expect(session.currentId).toBe('b');
    session = recordAnswer(session, 'correct', 1000, null);
    session = drawNext(session);
    expect(session.currentId).toBe('c');
    session = recordAnswer(session, 'correct', 1000, null);
    session = drawNext(session);
    // 'a' should only appear now, after 2 other distinct states were asked
    expect(session.currentId).toBe('a');
  });

  it('never asks the same state twice in a row when alternatives exist', () => {
    let session = createSession(['a', 'b'], identityShuffle);
    const askedOrder: string[] = [session.currentId as string];
    session = recordAnswer(session, 'wrong', 1000, null);
    session = drawNext(session);
    askedOrder.push(session.currentId as string);
    expect(askedOrder[0]).not.toBe(askedOrder[1]);
  });

  it('does not complete the session until every state has been answered correctly', () => {
    let session = createSession(['a', 'b'], identityShuffle);
    expect(isSessionComplete(session, 2)).toBe(false);
    session = recordAnswer(session, 'wrong', 1000, null);
    session = drawNext(session);
    expect(isSessionComplete(session, 2)).toBe(false);
    session = recordAnswer(session, 'correct', 1000, null); // b correct
    session = drawNext(session);
    expect(session.currentId).toBe('a');
    expect(isSessionComplete(session, 2)).toBe(false);
    session = recordAnswer(session, 'correct', 1000, null); // a correct
    session = drawNext(session);
    expect(isSessionComplete(session, 2)).toBe(true);
  });

  it('tracks streaks and resets them on a miss', () => {
    let session = createSession(['a', 'b', 'c'], identityShuffle);
    session = recordAnswer(session, 'correct', 1000, null);
    session = drawNext(session);
    session = recordAnswer(session, 'correct', 1000, null);
    expect(session.streak).toBe(2);
    session = drawNext(session);
    session = recordAnswer(session, 'wrong', 1000, null);
    expect(session.streak).toBe(0);
    expect(session.bestStreak).toBe(2);
  });

  it('records whether an answer was within the timer target', () => {
    let session = createSession(['a'], identityShuffle);
    session = recordAnswer(session, 'correct', 2000, true);
    expect(session.attempts.a[0].withinTarget).toBe(true);
  });

  it('keeps the same retry behavior and direction metadata in Capital to State mode', () => {
    let session = createSession(['a', 'b', 'c'], 'capital-to-state', identityShuffle);
    expect(session.direction).toBe('capital-to-state');
    session = recordAnswer(session, 'skip', 1000, null);
    expect(session.masteredIds).toEqual([]);
    expect(session.queue).toEqual(['b', 'c', 'a']);
  });
});
