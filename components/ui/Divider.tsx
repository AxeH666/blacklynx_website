type DividerProps = {
  etched?: boolean;
  className?: string;
};

export default function Divider({
  etched = false,
  className = ""
}: DividerProps): React.JSX.Element {
  return (
    <hr
      role="separator"
      className={[
        "atom-divider",
        etched ? "atom-divider--etched" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
