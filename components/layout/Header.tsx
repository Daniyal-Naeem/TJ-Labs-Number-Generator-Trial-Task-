import type { ReactNode } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  /** Right-aligned controls (e.g. settings). Figma: horizontal stack, gap 8, aligned to the end. */
  children: ReactNode;
};

/**
 * Figma "Header" (Simple variant): 1440x72 on desktop, 375x64 on mobile.
 * The Logo instance in the Figma file is an empty component, so nothing is rendered on the left.
 */
export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.actions}>{children}</div>
    </header>
  );
}
