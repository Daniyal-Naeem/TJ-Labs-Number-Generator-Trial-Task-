import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DIGIT_COUNT, generateUniqueDigits } from "./generateUniqueDigits.ts";

const RUNS = 2000;

describe("generateUniqueDigits", () => {
  it("returns six digits by default", () => {
    assert.equal(generateUniqueDigits().length, DIGIT_COUNT);
  });

  it("only returns integers between 0 and 9", () => {
    for (let run = 0; run < RUNS; run++) {
      for (const digit of generateUniqueDigits()) {
        assert.ok(Number.isInteger(digit), `${digit} is not an integer`);
        assert.ok(digit >= 0 && digit <= 9, `${digit} is out of range`);
      }
    }
  });

  it("never repeats a digit within one result", () => {
    for (let run = 0; run < RUNS; run++) {
      const digits = generateUniqueDigits();
      assert.equal(new Set(digits).size, digits.length, `duplicate in ${digits.join(",")}`);
    }
  });

  it("produces a different sequence on (almost) every call", () => {
    const sequences = new Set(Array.from({ length: RUNS }, () => generateUniqueDigits().join("")));
    // 151,200 possible sequences: 2000 draws should be nearly all distinct.
    assert.ok(sequences.size > RUNS * 0.95, `only ${sequences.size} distinct sequences in ${RUNS} runs`);
  });

  it("is deterministic for a given random source", () => {
    const values = [0.1, 0.9, 0.5, 0.3, 0.7, 0.2];
    const makeSource = () => {
      let i = 0;
      return () => values[i++ % values.length];
    };
    assert.deepEqual(generateUniqueDigits(6, makeSource()), generateUniqueDigits(6, makeSource()));
  });

  it("maps the extreme random values to the first and last candidate", () => {
    // random() -> 0 keeps the pool in order.
    assert.deepEqual(generateUniqueDigits(6, () => 0), [0, 1, 2, 3, 4, 5]);
    // random() -> just below 1 always takes the last pool slot. After the first swap that slot
    // holds the displaced 0, then 1, 2, ... so the result is 9 followed by the digits in order.
    assert.deepEqual(generateUniqueDigits(6, () => 0.999999), [9, 0, 1, 2, 3, 4]);
  });

  it("gives every digit the same chance of appearing", () => {
    const counts = new Array(10).fill(0);
    for (let run = 0; run < RUNS; run++) {
      for (const digit of generateUniqueDigits()) counts[digit]++;
    }
    // Each digit is expected in 6 of 10 draws. Allow a generous ±15% band for randomness.
    const expected = RUNS * (DIGIT_COUNT / 10);
    for (const [digit, count] of counts.entries()) {
      assert.ok(
        Math.abs(count - expected) < expected * 0.15,
        `digit ${digit} appeared ${count} times, expected about ${expected}`,
      );
    }
  });

  it("supports other lengths up to the size of the digit pool", () => {
    assert.deepEqual(generateUniqueDigits(0), []);
    assert.equal(new Set(generateUniqueDigits(10)).size, 10);
  });

  it("rejects impossible requests", () => {
    assert.throws(() => generateUniqueDigits(11), RangeError);
    assert.throws(() => generateUniqueDigits(-1), RangeError);
    assert.throws(() => generateUniqueDigits(2.5), RangeError);
  });
});
