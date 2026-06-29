import Container from "@/components/ui/Container";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export default function Section({
  children,
  id,
  className = ""
}: SectionProps): React.JSX.Element {
  const sectionPadding = /\b(py|pt|pb)-/.test(className) ? "" : "py-space-24";

  return (
    <section id={id} className={[sectionPadding, className].filter(Boolean).join(" ")}>
      <Container>{children}</Container>
    </section>
  );
}
