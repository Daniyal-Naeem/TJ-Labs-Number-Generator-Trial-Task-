import Image from "next/image";
import styles from "./LanguageFlag.module.css";

const FLAGS = {
  en: { src: "/images/flag-en.png", label: "English" },
  de: { src: "/images/flag-de.png", label: "Deutsch" },
} as const;

type LanguageFlagProps = {
  lang: keyof typeof FLAGS;
  /**
   * Figma uses two presentations:
   * - framed: flag inside a 40x40 icon-button frame (Sign In, UK)
   * - plain: bare 34x20 desktop / 32x20 mobile image (generator, DE)
   */
  framed?: boolean;
};

/** Static language indicator from Figma. Not a language switcher. */
export function LanguageFlag({ lang, framed = false }: LanguageFlagProps) {
  const flag = FLAGS[lang];

  if (framed) {
    return (
      <span className={styles.frame} role="img" aria-label={flag.label} title={flag.label}>
        <span className={styles.clip}>
          <Image src={flag.src} alt="" width={28} height={20} className={styles.framedImage} />
        </span>
      </span>
    );
  }

  return (
    <Image
      src={flag.src}
      alt={flag.label}
      title={flag.label}
      width={34}
      height={20}
      className={styles.plainImage}
    />
  );
}
