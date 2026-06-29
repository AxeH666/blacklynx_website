/** Concentric inner radius: outer radius minus padding (DESIGN.LAWS D2). */
export function cardInnerRadiusStyle(): React.CSSProperties {
  return {
    borderRadius: "calc(var(--card-radius) - var(--card-padding))"
  };
}
