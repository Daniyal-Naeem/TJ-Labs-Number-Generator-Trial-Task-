import type { Metadata } from "next";
import Link from "next/link";
import { AuthPage } from "@/components/layout/AuthPage";
import { SignInForm } from "@/components/signin/SignInForm";
import { LanguageFlag } from "@/components/ui/LanguageFlag";
import typography from "@/components/ui/typography.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sign in",
};

/** Figma frames "SignIn_Centered" (1440x1024) and "[MOBILE] SignIn_Centered" (375x800). */
export default function SignInPage() {
  return (
    <AuthPage lang="en" headerActions={<LanguageFlag lang="en" framed />}>
      <div className={styles.intro}>
        <h1 className={typography.h4}>Sign in</h1>
        <p className={styles.subline}>
          <span className={`${typography.body2} ${styles.sublineText}`}>Don&apos;t have an account?</span>
          {/* Registration is not part of the task, so the link has no destination yet. */}
          <Link href="#" className={`${typography.subtitle2} ${styles.sublineLink}`}>
            Get started
          </Link>
        </p>
      </div>
      <SignInForm />
    </AuthPage>
  );
}
