import type { ReactNode } from "react";
import { Header } from "./Header";
import { PageBackground } from "./PageBackground";
import styles from "./AuthPage.module.css";

type AuthPageProps = {
  /** Optional controls on the right side of the top bar (e.g. settings). */
  headerActions?: ReactNode;
  /** Card content. */
  children: ReactNode;
  /** Language of the page content ("en" for Sign In, "de" for the number generator). */
  lang: "en" | "de";
};

/**
 * Shared shell of both screens: page background, top bar and the centered white card
 * (Figma "Auth/Form/*": 420px max width, radius 16, shadow/16%).
 */
export function AuthPage({ headerActions, children, lang }: AuthPageProps) {
  return (
    <div lang={lang}>
      <PageBackground />
      <Header>{headerActions}</Header>
      <main className={styles.main}>
        <section className={styles.card}>{children}</section>
      </main>
    </div>
  );
}
