type ArticlePlaceholderProps = { text?: string; closing?: boolean };

export function ArticlePlaceholder({ text = '正文待补充', closing = false }: ArticlePlaceholderProps) {
  return <p className={`articlePlaceholder${closing ? ' articlePlaceholder--closing' : ''}`}>{text}</p>;
}
