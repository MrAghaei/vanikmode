import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const variantClasses: Record<Variant, string> = {
  // verified: real rendered login button — bg #FF8C55, text #FFFDFD
  primary: "bg-primary text-on-primary",
  // verified: real rendered cart button — transparent bg, border, dark-red text
  outline: "bg-transparent border border-primary-darker text-primary-darker",
};

const base =
  "inline-flex h-14 items-center justify-center gap-2 rounded-card px-4 text-base font-normal transition-colors";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
