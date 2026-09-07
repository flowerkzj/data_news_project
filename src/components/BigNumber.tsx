type BigNumberProps = { value: string; label: string; detail: string };

export function BigNumber({ value, label, detail }: BigNumberProps) {
  return <aside className="bigNumber" aria-label={`${label}：${value}`}><strong>{value}</strong><span className="bigNumber__label">{label}</span><span className="bigNumber__detail">{detail}</span></aside>;
}
