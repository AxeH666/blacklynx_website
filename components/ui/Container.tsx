type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = ""
}: ContainerProps): React.JSX.Element {
  return (
    <div className={`mx-auto max-w-6xl px-space-6 ${className}`}>{children}</div>
  );
}
