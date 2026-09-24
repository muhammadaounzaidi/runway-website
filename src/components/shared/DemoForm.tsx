"use client";

import { useId, useState, type FormEvent } from "react";
import { cta } from "@/content/runway";

type Fields = { name: string; email: string; org: string; role: string };
type Errors = Partial<Record<keyof Fields, string>>;

export type DemoFormStyles = {
  form?: string;
  field?: string;
  label: string;
  input: string;
  select?: string;
  error: string;
  button: string;
  success: string;
  hint?: string;
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your full name.";
  if (!f.email.trim()) e.email = "Enter your professional email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Use an email like name@company.com.";
  if (!f.org.trim()) e.org = "Enter your organization or institution.";
  return e;
}

export function DemoForm({ styles }: { styles: DemoFormStyles }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", org: "", role: cta.roles[0] });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.keys(e).length) return;
    setState("sending");
    // Design review build: no backend yet.
    setTimeout(() => setState("sent"), 700);
  };

  if (state === "sent") {
    return (
      <p role="status" className={styles.success}>
        {cta.success}
      </p>
    );
  }

  const text = (k: "name" | "email" | "org", label: string, type: string, placeholder: string, autoComplete: string) => (
    <div className={styles.field}>
      <label htmlFor={`${uid}-${k}`} className={styles.label}>
        {label}
      </label>
      <input
        id={`${uid}-${k}`}
        type={type}
        value={fields[k]}
        onChange={(e) => set(k)(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
        className={styles.input}
      />
      {errors[k] && (
        <p id={`${uid}-${k}-err`} className={styles.error}>
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className={styles.form}>
      {text("name", "Full Name", "text", "", "name")}
      {text("email", "Professional Email", "email", "name@company.com", "email")}
      {text("org", "Organization / Institution", "text", "", "organization")}
      <div className={styles.field}>
        <label htmlFor={`${uid}-role`} className={styles.label}>
          Primary Role
        </label>
        <select
          id={`${uid}-role`}
          value={fields.role}
          onChange={(e) => set("role")(e.target.value)}
          className={styles.select ?? styles.input}
        >
          {cta.roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={state === "sending"} className={styles.button}>
        {state === "sending" ? "Sending request…" : cta.submit}
      </button>
    </form>
  );
}
