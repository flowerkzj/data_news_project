type SectionHeadingProps = { number: string; children: React.ReactNode };

export function SectionHeading({ number, children }: SectionHeadingProps) {
  return <h2 className="sectionHeading"><span className="sectionHeading__number">{number}</span><span>{children}</span></h2>;
}
