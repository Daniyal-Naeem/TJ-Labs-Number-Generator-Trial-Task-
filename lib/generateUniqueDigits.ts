export const DIGIT_COUNT = 6;
const DIGIT_POOL_SIZE = 10; // digits 0..9

/** Returns a float in [0, 1). Injectable so tests can run deterministically. */
export type RandomSource = () => number;

/**
 * Picks `count` distinct digits from 0..9 in random order.
 *
 * Implementation: a partial Fisher–Yates shuffle. The pool [0..9] is shuffled from the
 * front, but only `count` swaps are performed because the remaining positions are never read.
 *
 * - Uniqueness is structural: every digit exists exactly once in the pool, and a swap only
 *   moves digits around, so the first `count` positions can never contain a duplicate.
 * - Every ordered selection is equally likely: position i is filled by a uniform pick from the
 *   remaining `10 - i` candidates, giving each sequence a probability of 1/(10·9·8·7·6·5).
 * - Runs in O(count) time with O(10) memory and never retries.
 */
export function generateUniqueDigits(count: number = DIGIT_COUNT, random: RandomSource = Math.random): number[] {
  if (!Number.isInteger(count) || count < 0 || count > DIGIT_POOL_SIZE) {
    throw new RangeError(`count must be an integer between 0 and ${DIGIT_POOL_SIZE}, got ${count}`);
  }

  const pool = Array.from({ length: DIGIT_POOL_SIZE }, (_, digit) => digit);

  for (let i = 0; i < count; i++) {
    // Uniform index in [i, pool.length): the not-yet-selected part of the pool.
    const j = i + Math.floor(random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}
