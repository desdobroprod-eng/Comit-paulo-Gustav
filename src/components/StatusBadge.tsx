import type { StatusEdital } from "@/content/editais";

const styles: Record<StatusEdital, { label: string; className: string }> = {
  aberto: { label: "Edital aberto", className: "bg-turquoise/15 text-turquoise" },
  "em-breve": { label: "Abre em breve", className: "bg-amber/20 text-amber-deep" },
  encerrado: { label: "Encerrado", className: "bg-terracotta/15 text-terracotta" },
};

export function StatusBadge({ status }: { status: StatusEdital }) {
  const { label, className } = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
