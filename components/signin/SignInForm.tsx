"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { TextField } from "@/components/ui/TextField";
import { EyeClosedIcon, EyeIcon } from "@/components/ui/icons";
import typography from "@/components/ui/typography.module.css";
import styles from "./SignInForm.module.css";

const MIN_PASSWORD_LENGTH = 6; // matches the "6+ characters" placeholder from the design
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "email" | "password";
type FieldErrors = Partial<Record<Field, string>>;

function validate(form: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return errors;
}

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(new FormData(event.currentTarget));
    setErrors(nextErrors);

    // There is no backend in this task: a valid form simply continues to the app's only screen.
    if (Object.keys(nextErrors).length === 0) router.push("/generator");
  }

  // Errors disappear as soon as the user starts correcting the field.
  const clearError = (field: Field) => () =>
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email address"
        autoComplete="email"
        error={errors.email}
        onInput={clearError("email")}
      />
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="6+ characters"
        autoComplete="current-password"
        error={errors.password}
        onInput={clearError("password")}
        endAdornment={
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
          </IconButton>
        }
      />
      <Link href="/generator" className={`${typography.body2} ${styles.generateLink}`}>
        Generate numbers
      </Link>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
