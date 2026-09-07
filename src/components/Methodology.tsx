type MethodologyProps = { items: readonly { title: string; body: string }[] };

export function Methodology({ items }: MethodologyProps) {
  return <section className="methodology" aria-labelledby="methodology-title"><h2 id="methodology-title">数据与方法</h2><div className="methodology__list">
    {items.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}
  </div></section>;
}
