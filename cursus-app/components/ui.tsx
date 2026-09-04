"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursus-focus px-4 py-2 rounded-full text-sm border transition-colors ${
        active
          ? "border-gold text-gold bg-gold/10"
          : "border-hairline text-muted hover:text-ivory"
      }`}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`cursus-focus px-5 py-3 rounded-lg text-sm font-medium bg-gold text-[#181203] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`cursus-focus px-5 py-3 rounded-lg text-sm font-medium border border-hairline text-ivory transition-colors hover:border-gold/60 ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-sm mb-3 text-muted2">{children}</div>;
}
