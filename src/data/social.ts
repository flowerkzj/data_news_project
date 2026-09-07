export const socialFigures = {
  figure8: {
    title: '独居与非独居青年的朋友、邻居交往频率',
    rows: [
      { label: '朋友', alone: 4.96, shared: 4.5, difference: '+0.46', significance: 'p < 0.001' },
      { label: '邻居', alone: 3.13, shared: 3.68, difference: '-0.55', significance: 'p = 0.001' },
    ],
    source: 'CGSS 2023',
  },
  figure9: {
    title: '独居与非独居青年的人缘及家庭联系',
    rows: [
      { label: '人缘', alone: 6.77, shared: 6.86, difference: '-0.09', significance: 'p = 0.085' },
      { label: '父亲联系', alone: 4.52, shared: 4.75, difference: '-0.23', significance: 'p < 0.001' },
      { label: '母亲联系', alone: 4.96, shared: 5.11, difference: '-0.15', significance: 'p = 0.001' },
    ],
    source: 'CFPS 2022',
  },
  figure10: {
    title: '独居青年与父母联系差异的变化',
    nodes: [
      { year: '2018', label: '基本持平', value: null },
      { year: '2022', label: '独居相对非独居约低 0.09 分', value: -0.09 },
    ],
    note: '完整时序数据待补充；图中只保留文档已明确支持的节点，不做自动插值。',
    source: 'CFPS 2018 / 2022；文档已知节点',
  },
} as const;
