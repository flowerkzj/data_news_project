export const psychologyFigures = {
  figure5: {
    title: '2018—2022 年独居与非独居青年平均幸福感',
    years: ['2018', '2020', '2022'],
    series: [
      { name: '独居', values: [7.16, 7.12, 6.97], color: 'accent' },
      { name: '非独居', values: [7.56, 7.61, 7.48], color: 'muted' },
    ],
    scale: '0—10',
    source: 'CFPS 2018 / 2020 / 2022',
  },
  figure6: {
    title: '2022 年独居与非独居青年的五项心理指标',
    rows: [
      { label: '幸福感', alone: 6.87, shared: 7.48, min: 0, max: 10, scale: '0—10' },
      { label: '生活满意度', alone: 3.55, shared: 3.89, min: 1, max: 5, scale: '1—5' },
      { label: '未来信心', alone: 3.86, shared: 4.09, min: 1, max: 5, scale: '1—5' },
      { label: '不孤独感', alone: 3.29, shared: 3.46, min: 1, max: 4, scale: '1—4' },
      { label: '生活快乐', alone: 2.93, shared: 3.04, min: 1, max: 4, scale: '1—4' },
    ],
    source: 'CFPS 2022',
  },
  figure7: {
    title: '认为自己“非常幸福”的青年比例',
    items: [
      { label: '独居', value: 9.0, color: 'accent' },
      { label: '非独居', value: 17.7, color: 'muted' },
    ],
    definition: '幸福感 9—10 分。',
    source: 'CFPS 2022',
  },
  researchNote: 'CGSS 2023 的反方向发现：研究注释待补充。',
} as const;
