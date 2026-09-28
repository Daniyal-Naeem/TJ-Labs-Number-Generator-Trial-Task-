import type { InputHTMLAttributes, ReactNode } from "react";
import { DangerTriangleIcon } from "./icons";
import styles from "./TextField.module.css";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  /** Small label rendered above the value, inside the filled box. */
  label: string;
  /** 40x40 control docked to the right edge of the field (Figma "end adornment"). */
  endAdornment?: ReactNode;
  /** Validation message; switches the field into the Error state (Figma FormHelperText, State=Error). */
  error?: string;
};

/**
 * Figma "TextField" (Variant=Filled, Size=M): 53px high, grey/8% background, radius 8,
 * label Public Sans SemiBold 12/12 in text/secondary, value Public Sans 15/22 in text/primary.
 */
export function TextField({ id, label, endAdornment, error, ...inputProps }: TextFieldProps) {
  const helperId = `${id}-helper`;
  const fieldClasses = [styles.field, error && styles.fieldError, endAdornment && styles.fieldWithAdornment]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className={fieldClasses}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          id={id}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? helperId : undefined}
          {...inputProps}
        />
        {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
      </div>
      {error && (
        <p id={helperId} className={styles.helper} role="alert">
          <DangerTriangleIcon size={16} />
          {error}
        </p>
      )}
    </div>
  );
}
