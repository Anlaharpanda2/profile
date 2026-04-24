"use client";
import type { ReactNode } from "react";

interface Props {
  label: string;
  htmlFor?: string;
  help?: string;
  children: ReactNode;
}

export default function Field({ label, htmlFor, help, children }: Props) {
  return (
    <div className="admin-row">
      <label className="admin-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {help && <div className="admin-help">{help}</div>}
    </div>
  );
}
