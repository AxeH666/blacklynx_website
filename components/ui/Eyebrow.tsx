type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({
  children,
  className = ""
}: EyebrowProps): React.JSX.Element {
  return <p className={["atom-eyebrow", className].filter(Boolean).join(" ")}>{children}</p>;
}
