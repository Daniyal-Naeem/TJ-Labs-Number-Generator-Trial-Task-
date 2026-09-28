import Image from "next/image";
import styles from "./PageBackground.module.css";

/**
 * Figma "background/overlay-1": an image with a 40px layer blur,
 * covered by a white layer at 90% opacity. Purely decorative.
 */
export function PageBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <Image
        src="/images/background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
    </div>
  );
}
