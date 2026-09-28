"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/icons";
import typography from "@/components/ui/typography.module.css";
import { DIGIT_COUNT, generateUniqueDigits } from "@/lib/generateUniqueDigits";
import styles from "./NumberGenerator.module.css";

const EMPTY_SLOTS: null[] = Array.from({ length: DIGIT_COUNT }, () => null);

export function NumberGenerator() {
  // null = empty state before the first click (Figma shows "-" in every box)
  const [digits, setDigits] = useState<number[] | null>(null);
  // Counts clicks so the boxes re-animate even when a digit lands in the same slot twice in a row.
  const [round, setRound] = useState(0);

  function handleGenerate() {
    setDigits(generateUniqueDigits());
    setRound((current) => current + 1);
  }

  const slots: ReadonlyArray<number | null> = digits ?? EMPTY_SLOTS;

  return (
    <div className={styles.root}>
      <div className={styles.boxes} role="status" aria-live="polite" aria-label="Generierte Zahlen">
        {slots.map((digit, index) => (
          <span
            key={`${round}-${index}`}
            className={`${typography.body2} ${styles.box} ${digit === null ? styles.boxEmpty : styles.boxFilled}`}
          >
            {digit ?? "-"}
          </span>
        ))}
      </div>

      <Button onClick={handleGenerate}>Generieren</Button>

      <Link href="/" className={`${typography.subtitle2} ${styles.back}`}>
        <ArrowLeftIcon size={16} />
        Zurück
      </Link>
    </div>
  );
}
