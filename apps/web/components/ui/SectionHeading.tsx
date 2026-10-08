type SectionHeadingProps = {
  title: string;
  lede?: string;
  align?: "left" | "center";
};

/** Brand section heading — FANLSTE-style serif title, grotesk lede. No motion. */
export function SectionHeading({ title, lede, align = "left" }: SectionHeadingProps) {
  return (
    <div
      className="bdg-sh"
      style={align === "center" ? { textAlign: "center" } : undefined}
    >
      <h2>{title}</h2>
      {lede ? (
        <p style={align === "center" ? { marginInline: "auto" } : undefined}>{lede}</p>
      ) : null}
    </div>
  );
}
