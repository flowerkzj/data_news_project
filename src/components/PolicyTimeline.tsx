type PolicyTimelineProps = { items: readonly { date: string; heading: string; body: string; detail: string }[] };

export function PolicyTimeline({ items }: PolicyTimelineProps) {
  return <div className="policyTimeline">{items.map((item) => <div className="policyTimeline__item" key={item.date}>
    <div className="policyTimeline__date">{item.date}</div><div className="policyTimeline__marker" />
    <div className="policyTimeline__copy"><h4>{item.heading}</h4><p>{item.body}</p>{item.detail ? <p>{item.detail}</p> : null}</div>
  </div>)}</div>;
}
