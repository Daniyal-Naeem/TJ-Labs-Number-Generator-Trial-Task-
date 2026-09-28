import type { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name; icon buttons have no visible text. */
  "aria-label": string;
  /**
   * Figma IconButton "Color" variant:
   * - default: icon in action/active (#637381), e.g. the eye in the password field
   * - inherit: icon in text/primary (#1C252E), e.g. the settings icon in the top bar
   */
  color?: "default" | "inherit";
};

/** Figma "IconButton" (Size=M): 40x40, fully rounded, 24px icon centered. */
export function IconButton({
  color = "default",
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  const classes = [styles.button, color === "inherit" && styles.inherit, className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...rest} />;
}
