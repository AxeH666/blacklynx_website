import Card from "@/components/ui/Card";

type VoidMountProps = {
  label: string;
  aspect?: "square" | "video";
  className?: string;
};

export default function VoidMount({
  label,
  aspect = "square",
  className = ""
}: VoidMountProps): React.JSX.Element {
  return (
    <div aria-hidden="true">
      <Card
        padding="space-8"
        sheen
        className={[
          "w-full",
          aspect === "square" ? "aspect-square" : "aspect-video",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        innerClassName="flex h-full min-h-[12rem] items-center justify-center"
      >
        <p className="font-mono text-xs tracking-[0.05em] text-text-muted">{label}</p>
      </Card>
    </div>
  );
}
