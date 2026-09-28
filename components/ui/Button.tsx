import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Figma "Button" (Variant=Contained, Color=Primary, Size=L):
 * 48px high, black, radius 8, label Public Sans Bold 15/26 in white.
 * Both screens use it stretched to the full card width.
 */
export function Button({ className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={[styles.button, className].filter(Boolean).join(" ")} {...rest} />;
}
