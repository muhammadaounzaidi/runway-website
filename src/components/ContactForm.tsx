"use client";

import { useId, useState, type FormEvent } from "react";
import { contact } from "@/content/runway";

type Fields = { name: string; email: string; org: string; interest: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your full name.";
  if (!f.email.trim()) e.email = "Enter your professional email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Use an email like name@institution.com.";
  if (!f.org.trim()) e.org = "Enter your organization or entity.";
  return e;
}

const label = "block text-[13px] font-medium text-[#94A3B8]";
const control =
  "mt-2 w-full rounded-lg border border-[#1e293b] bg-[#020617] px-4 py-3 text-[15px] text-[#ffffff] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#8A99AF] focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgb(6_182_212/0.15)] focus-visible:outline-none aria-[invalid=true]:border-[#FB7185]";

export function ContactForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", org: "", interest: contact.interests[0] });
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
    // No backend yet.
    setTimeout(() => setState("sent"), 700);
  };

  if (state === "sent") {
    return (
      <p
        role="status"
        className="rounded-xl border border-[#10b981]/30 bg-[#022c22]/30 p-6 text-center text-[16px] leading-relaxed text-[#6ee7b7]"
      >
        {contact.success}
      </p>
    );
  }

  const text = (k: "name" | "email" | "org", type: string, autoComplete: string, wide = false) => {
    const f = contact.fields[k];
    return (
      <div className={wide ? "sm:col-span-2" : undefined}>
        <label htmlFor={`${uid}-${k}`} className={label}>
          {f.label}
        </label>
        <input
          id={`${uid}-${k}`}
          type={type}
          value={fields[k]}
          onChange={(e) => set(k)(e.target.value)}
          placeholder={f.placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
          className={control}
        />
        {errors[k] && (
          <p id={`${uid}-${k}-err`} className="mt-2 text-[13px] text-[#FB7185]">
            {errors[k]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {text("name", "text", "name")}
      {text("email", "email", "email")}
      {text("org", "text", "organization", true)}
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-interest`} className={label}>
          {contact.fields.interest}
        </label>
        <select
          id={`${uid}-interest`}
          value={fields.interest}
          onChange={(e) => set("interest")(e.target.value)}
          className={control}
        >
          {contact.interests.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-2 rounded-lg bg-[#06b6d4] px-6 py-3.5 text-[15px] font-semibold text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee] disabled:cursor-progress disabled:opacity-70 sm:col-span-2"
      >
        {state === "sending" ? "Sending inquiry…" : contact.submit}
      </button>
    </form>
  );
}
