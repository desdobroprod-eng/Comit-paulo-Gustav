import type { StatusEdital } from "@/content/editais";

const styles: Record<StatusEdital, { label: string; className: string }> = {
  aberto: { label: "Edital aberto", className: "bg-turquesa/15 text-turquesa" },
  "em-breve": { label: "Abre em breve", className: "bg-ambar/20 text-ambar-fundo" },
  encerrado: { label: "Encerrado", className: "bg-terracota/15 text-terracota" },
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
