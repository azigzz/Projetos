import { ReactNode } from "react";

type PillButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: "dark" | "paper" | "outline";
  className?: string;
};

const variantClasses = {
  dark: "border-ink bg-ink text-cream shadow-soft hover:-translate-y-0.5 hover:bg-cover",
  paper: "border-ink bg-cream text-ink shadow-soft hover:-translate-y-0.5 hover:bg-white",
  outline: "border-ink bg-transparent text-ink hover:-translate-y-0.5 hover:bg-cream",
};

export function PillButton({
  children,
  href,
  icon,
  variant = "dark",
  className = "",
}: PillButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}
