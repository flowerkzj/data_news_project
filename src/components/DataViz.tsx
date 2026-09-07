type BarItem = { label: string; value: number; color: string };
type LinePoint = { year: string; value: number };
type LineSeries = { name: string; values: readonly number[]; color: string };
type DumbbellRow = { label: string; alone: number; shared: number; min?: number; max?: number; scale?: string; difference?: string; significance?: string };

type ChartData =
  | { kind: 'line'; points: readonly LinePoint[]; yMax: number; suffix: string; zeroLine?: boolean }
  | { kind: 'bar'; items: readonly BarItem[]; max: number; suffix: string }
  | { kind: 'dualLine'; years: readonly string[]; series: readonly LineSeries[]; yMax: number };

type DataVizProps = { data: ChartData };

const palette = { accent: '#C96B45', muted: '#7D9689', gold: '#E8B86D' };
const chartColor = (value: string) => palette[value as keyof typeof palette] ?? value;
const formatOne = (value: number, suffix: string) => `${value.toFixed(1)}${suffix}`;
const formatTwo = (value: number) => value.toFixed(2);
const axisValue = (value: number) => Number.isInteger(value) ? String(value) : value.toFixed(1);

function ChartTopline({ label, unit }: { label: string; unit?: string }) {
  return <div className="chartTopline"><span className="chartTopline__label">{label}</span>{unit ? <span className="chartTopline__unit">单位：{unit}</span> : null}</div>;
}

function TrendChart({ points, yMax, suffix, zeroLine = false }: { points: readonly LinePoint[]; yMax: number; suffix: string; zeroLine?: boolean }) {
  const width = 820;
  const height = 286;
  const left = 58;
  const right = 46;
  const top = 34;
  const bottom = 48;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const x = (index: number) => points.length <= 1 ? left + plotWidth / 2 : left + (plotWidth * index) / (points.length - 1);
  const y = (value: number) => top + plotHeight - (value / yMax) * plotHeight;
  const coords = points.map((point, index) => ({ ...point, x: x(index), y: y(point.value) }));
  const linePath = coords.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${y(0)} L ${coords[0].x} ${y(0)} Z`;
  const ticks = Array.from({ length: 5 }, (_, index) => (yMax * index) / 4);
  return <div className="svgChart svgChart--trend">
    <ChartTopline label={zeroLine ? '差值趋势' : '年度趋势'} unit={suffix} />
    <svg className="svgChart__canvas" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="趋势图">
      <g className="svgChart__grid">{ticks.map((tick) => <line key={tick} x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} />)}</g>
      {zeroLine ? <g className="svgChart__zero"><line x1={left} x2={width - right} y1={y(0)} y2={y(0)} /><text x={left + 7} y={y(0) - 8}>0 参考线</text></g> : null}
      <g className="svgChart__axisLabels">{ticks.map((tick) => <text key={tick} x={left - 12} y={y(tick) + 4} textAnchor="end">{axisValue(tick)}{suffix}</text>)}</g>
      <line className="svgChart__baseline" x1={left} x2={width - right} y1={y(0)} y2={y(0)} />
      {!zeroLine ? <path className="svgChart__area" d={areaPath} /> : null}
      <path className="svgChart__line" d={linePath} />
      {coords.map((point, index) => <g key={point.year} className={index === coords.length - 1 ? 'svgPoint svgPoint--latest' : 'svgPoint'}>
        <circle cx={point.x} cy={point.y} r={index === coords.length - 1 ? 7 : 5} />
        <circle className="svgPoint__core" cx={point.x} cy={point.y} r={index === coords.length - 1 ? 3 : 2.5} />
        <text className="svgPoint__value" x={point.x} y={point.y - 15} textAnchor="middle">{formatOne(point.value, suffix)}</text>
        <text className="svgPoint__year" x={point.x} y={height - 17} textAnchor="middle">{point.year}</text>
      </g>)}
      {coords.length ? <g className="svgChart__latestTag"><rect x={coords[coords.length - 1].x - 22} y={top - 25} width="44" height="17" rx="2" /><text x={coords[coords.length - 1].x} y={top - 13} textAnchor="middle">最新</text></g> : null}
    </svg>
  </div>;
}

function BarChart({ items, max, suffix }: { items: readonly BarItem[]; max: number; suffix: string }) {
  const width = 820;
  const rowHeight = 56;
  const height = 82 + items.length * rowHeight;
  const left = 142;
  const right = 72;
  const top = 30;
  const plotWidth = width - left - right;
  const ticks = Array.from({ length: 4 }, (_, index) => (max * index) / 3);
  return <div className="svgChart svgChart--bars">
    <ChartTopline label="横向比较" unit={suffix} />
    <svg className="svgChart__canvas" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="横向条形图">
      <g className="svgChart__barGrid">{ticks.map((tick) => { const tickX = left + (tick / max) * plotWidth; return <g key={tick}><line x1={tickX} x2={tickX} y1={top - 13} y2={height - 32} /><text x={tickX} y={height - 12} textAnchor="middle">{axisValue(tick)}{suffix}</text></g>; })}</g>
      {items.map((item, index) => {
        const y = top + index * rowHeight;
        const barWidth = (item.value / max) * plotWidth;
        return <g className="svgBar" key={item.label}>
          <text className="svgBar__index" x={left - 125} y={y + 17}>0{index + 1}</text>
          <text className="svgBar__label" x={left - 16} y={y + 17} textAnchor="end">{item.label}</text>
          <rect className="svgBar__track" x={left} y={y} width={plotWidth} height="24" rx="2" />
          <rect className="svgBar__value" x={left} y={y} width={barWidth} height="24" rx="2" style={{ fill: chartColor(item.color) }} />
          <text className="svgBar__number" x={left + barWidth + 12} y={y + 17}>{formatOne(item.value, suffix)}</text>
        </g>;
      })}
    </svg>
  </div>;
}

function DualTrendChart({ years, series, yMax }: { years: readonly string[]; series: readonly LineSeries[]; yMax: number }) {
  const width = 820;
  const height = 300;
  const left = 58;
  const right = 46;
  const top = 44;
  const bottom = 48;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const x = (index: number) => years.length <= 1 ? left + plotWidth / 2 : left + (plotWidth * index) / (years.length - 1);
  const y = (value: number) => top + plotHeight - (value / yMax) * plotHeight;
  const lineCoords = series.map((item) => item.values.map((value, index) => ({ x: x(index), y: y(value), value })));
  const linePath = (coords: readonly { x: number; y: number }[]) => coords.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const ticks = Array.from({ length: 5 }, (_, index) => (yMax * index) / 4);
  const gapArea = lineCoords.length >= 2 ? `${linePath(lineCoords[0])} ${lineCoords[1].slice().reverse().map((point) => `L ${point.x} ${point.y}`).join(' ')} Z` : '';
  return <div className="svgChart svgChart--dual">
    <div className="chartTopline"><span className="chartTopline__label">双线趋势</span><span className="chartTopline__legend">{series.map((item) => <span key={item.name}><i style={{ background: chartColor(item.color) }} />{item.name}</span>)}</span></div>
    <svg className="svgChart__canvas" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="双线趋势图">
      <g className="svgChart__grid">{ticks.map((tick) => <line key={tick} x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} />)}</g>
      <g className="svgChart__axisLabels">{ticks.map((tick) => <text key={tick} x={left - 12} y={y(tick) + 4} textAnchor="end">{axisValue(tick)}</text>)}</g>
      <line className="svgChart__baseline" x1={left} x2={width - right} y1={y(0)} y2={y(0)} />
      {gapArea ? <path className="svgChart__gap" d={gapArea} /> : null}
      {lineCoords.map((coords, seriesIndex) => <g key={series[seriesIndex].name}>
        <path className={seriesIndex === 0 ? 'svgChart__line' : 'svgChart__line svgChart__line--muted'} style={{ stroke: chartColor(series[seriesIndex].color) }} d={linePath(coords)} />
        {coords.map((point, pointIndex) => <g className="svgPoint" key={`${series[seriesIndex].name}-${years[pointIndex]}`}>
          <circle cx={point.x} cy={point.y} r="5" style={{ fill: chartColor(series[seriesIndex].color) }} />
          <circle className="svgPoint__core" cx={point.x} cy={point.y} r="2.5" />
          <text className={`svgPoint__value svgPoint__value--${seriesIndex === 0 ? 'above' : 'below'}`} x={point.x} y={point.y + (seriesIndex === 0 ? -14 : 24)} textAnchor="middle" style={{ fill: chartColor(series[seriesIndex].color) }}>{formatTwo(point.value)}</text>
        </g>)}
      </g>)}
      {years.map((year, index) => <text className="svgPoint__year" key={year} x={x(index)} y={height - 17} textAnchor="middle">{year}</text>)}
    </svg>
  </div>;
}

export function DataViz({ data }: DataVizProps) {
  if (data.kind === 'line') return <TrendChart points={data.points} yMax={data.yMax} suffix={data.suffix} zeroLine={data.zeroLine} />;
  if (data.kind === 'bar') return <BarChart items={data.items} max={data.max} suffix={data.suffix} />;
  return <DualTrendChart years={data.years} series={data.series} yMax={data.yMax} />;
}

export function DumbbellChart({ rows }: { rows: readonly DumbbellRow[] }) {
  return <div className="dumbbellChart">
    <div className="dumbbellChart__legend"><span><i className="dot dot--accent" />独居</span><span><i className="dot dot--muted" />非独居</span><span className="dumbbellChart__legendNote">点间距离 = 组间差异</span></div>
    {rows.map((row) => {
      const min = row.min ?? Math.min(row.alone, row.shared) - 1;
      const max = row.max ?? Math.max(row.alone, row.shared) + 1;
      const position = (value: number) => `${((value - min) / (max - min)) * 100}%`;
      const differenceClass = row.difference?.startsWith('+') ? 'positive' : row.difference?.startsWith('-') ? 'negative' : '';
      const hasScale = row.min !== undefined && row.max !== undefined;
      return <div className="dumbbellRow" key={row.label}>
        <div className="dumbbellRow__label"><strong>{row.label}</strong>{row.difference ? <span className={`dumbbellRow__difference ${differenceClass}`}>{row.difference}</span> : null}</div>
        <div className="dumbbellRow__visual">
          {hasScale ? <div className="dumbbellRow__scale"><span>{row.min}</span><span>{row.max}</span></div> : null}
          <div className="dumbbellRow__track" aria-label={`${row.label}：独居 ${row.alone}，非独居 ${row.shared}`}>
            <span className="dumbbellRow__line" style={{ left: position(Math.min(row.alone, row.shared)), width: `${Math.abs(((row.alone - row.shared) / (max - min)) * 100)}%` }} />
            <span className="dumbbellRow__point dumbbellRow__point--accent" style={{ left: position(row.alone) }} />
            <span className="dumbbellRow__point dumbbellRow__point--muted" style={{ left: position(row.shared) }} />
          </div>
        </div>
        <div className="dumbbellRow__values"><b>{formatTwo(row.alone)}</b><span>{formatTwo(row.shared)}</span></div>
        <div className="dumbbellRow__meta">{row.scale ? `量表 ${row.scale}` : ''}{row.significance ? ` · ${row.significance}` : ''}</div>
      </div>;
    })}
  </div>;
}

export function KnownNodes({ nodes }: { nodes: readonly { year: string; label: string; value: number | null }[] }) {
  return <div className="knownNodes">
    <div className="knownNodes__header"><span>已确认节点</span><span>不连接未知年份</span></div>
    <div className="knownNodes__grid">{nodes.map((node, index) => <div className="knownNode" key={node.year}>
      <span className="knownNode__index">0{index + 1}</span><span className="knownNode__year">{node.year}</span><span className="knownNode__dot" /><span className="knownNode__label">{node.label}</span>
    </div>)}</div>
  </div>;
}

export function ClusterMatrix({ groups, dimensions }: { groups: readonly { name: string; share: number; color: string }[]; dimensions: readonly { label: string; values: readonly { group: string; value: number }[] }[] }) {
  const colors = groups.map((group) => chartColor(group.color));
  const largestShare = Math.max(...groups.map((group) => group.share));
  return <div className="clusterFigure">
    <div className="clusterFigure__topline"><span>类型分布</span><span>CFPS 2022 · K-means</span></div>
    <div className="clusterShares">{groups.map((group, index) => <div className={`clusterShare${group.share === largestShare ? ' clusterShare--largest' : ''}`} key={group.name}>
      <div className="clusterShare__index">0{index + 1}</div><div className="clusterShare__bar"><span style={{ width: `${group.share}%`, background: colors[index] }} /></div>
      <div className="clusterShare__value"><strong>{group.share}%</strong>{group.share === largestShare ? <small>占比最高</small> : null}</div>
      <span>{group.name}</span>
    </div>)}</div>
    <div className="matrixLegend"><span>← 负向</span><span>三类独居青年在标准化维度上的位置</span><span>正向 →</span></div>
    <div className="matrixScale"><span>−1</span><span>0</span><span>+1</span></div>
    <div className="clusterMatrix">{dimensions.map((dimension) => <div className="matrixRow" key={dimension.label}>
      <strong>{dimension.label}</strong><div className="matrixTrack" aria-label={`${dimension.label}标准化维度比较`}><span className="matrixTrack__zero" />{dimension.values.map((entry, index) => <span className="matrixEntry" key={entry.group} style={{ left: `${50 + entry.value * 38}%`, color: colors[index] }}><i /><em>{entry.value > 0 ? '+' : ''}{entry.value.toFixed(3)}</em></span>)}</div>
    </div>)}</div>
    <div className="clusterLegend">{groups.map((group, index) => <span key={group.name}><i style={{ background: colors[index] }} />{group.name}</span>)}</div>
  </div>;
}
