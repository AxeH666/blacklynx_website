import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const baseClass =
  "inline-flex h-12 items-center justify-center border px-6 text-sm font-semibold uppercase tracking-[0.08em] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-blacklynx-accent";

const variantClass: Record<Variant, string> = {
  primary:
    "border-blacklynx-accent bg-blacklynx-accent text-blacklynx-bg hover:opacity-90",
  ghost:
    "border-blacklynx-accent bg-transparent text-blacklynx-accent hover:bg-blacklynx-accent hover:text-blacklynx-bg"
};

export default function Button(props: ButtonProps | AnchorProps) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
