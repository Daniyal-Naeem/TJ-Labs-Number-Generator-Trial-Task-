import type { Metadata } from "next";
import { NumberGenerator } from "@/components/generator/NumberGenerator";
import { AuthPage } from "@/components/layout/AuthPage";
import { IconButton } from "@/components/ui/IconButton";
import { SettingsIcon } from "@/components/ui/icons";
import typography from "@/components/ui/typography.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Zahlen generieren",
};

/** Figma frames "Zahlengenerator" (1440x1024) and "[MOBILE] Verify" (375x589). */
export default function GeneratorPage() {
  return (
    <AuthPage
      lang="de"
      headerActions={
        /* Present in the desktop frame only; there is no settings screen to open. */
        <IconButton aria-label="Einstellungen" color="inherit" className={styles.settings}>
          <SettingsIcon />
        </IconButton>
      }
    >
      <div className={styles.intro}>
        <h1 className={typography.h4}>Zahlen generieren</h1>
        <p className={`${typography.body2} ${styles.description}`}>
          Generiere 6 Zahlen zwischen 0 und 9, wobei keine Zahl doppelt vorkommen darf.
        </p>
      </div>
      <NumberGenerator />
    </AuthPage>
  );
}
