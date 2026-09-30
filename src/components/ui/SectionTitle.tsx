import { cn } from "@/lib/cn";

type SectionTitleProps = {
  as?: "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
};

/** Matches `.section-header-row-title` — rounded pink triangle behind the title (RTL). */
export function SectionTitle({ as: Tag = "h2", className, children }: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "relative isolate inline-block ps-3 text-base font-black leading-[42px]",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 34 40"
        className="pointer-events-none absolute start-0 top-1/2 -z-10 h-10 w-[34px] -translate-y-1/2"
      >
        <path
          fill="#FFC8C3"
          stroke="#FFC8C3"
          strokeLinejoin="round"
          strokeWidth="8"
          d="M30 4 L4 20 L30 36 Z"
        />
      </svg>
      {children}
    </Tag>
  );
}
