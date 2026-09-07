type EditorialFigureProps = { number: number; title: string; source: string; children: React.ReactNode; note?: string; wide?: boolean };

export function EditorialFigure({ number, title, source, children, note, wide = false }: EditorialFigureProps) {
  return <figure className={`editorialFigure${wide ? ' editorialFigure--wide' : ''}`}>
    <div className="editorialFigure__heading"><span className="editorialFigure__number">图 {number}</span><h3>{title}</h3></div>
    <div className="editorialFigure__chart">{children}</div>
    {note ? <p className="editorialFigure__note">{note}</p> : null}
    <figcaption>数据来源：{source}</figcaption>
  </figure>;
}
