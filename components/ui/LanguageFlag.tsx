import styles from "./LanguageFlag.module.css";

type LanguageFlagProps = {
  lang: "en" | "de";
  /**
   * Figma uses two presentations:
   * - framed: flag inside a 40x40 icon-button frame (Sign In)
   * - plain: bare flag image next to settings (generator)
   */
  framed?: boolean;
};

function UkFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="5" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

function DeFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="13.33" y="0" fill="#000" />
      <rect width="60" height="13.33" y="13.33" fill="#D00" />
      <rect width="60" height="13.34" y="26.66" fill="#FFCE00" />
    </svg>
  );
}

const FLAGS = {
  en: { label: "English", Icon: UkFlag },
  de: { label: "Deutsch", Icon: DeFlag },
} as const;

/** Static language indicator from Figma. Not a language switcher. */
export function LanguageFlag({ lang, framed = false }: LanguageFlagProps) {
  const { label, Icon } = FLAGS[lang];

  if (framed) {
    return (
      <span className={styles.frame} role="img" aria-label={label} title={label}>
        <span className={styles.flagChip}>
          <Icon className={styles.flagSvg} />
        </span>
      </span>
    );
  }

  return (
    <span className={styles.plain} role="img" aria-label={label} title={label}>
      <Icon className={styles.flagSvg} />
    </span>
  );
}
