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
  return (
    <section id={id} className={`py-space-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
