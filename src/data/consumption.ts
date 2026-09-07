export const consumptionFigures = {
  figure2: {
    title: '独居与非独居青年外出就餐支出占食品支出的比例',
    items: [
      { label: '独居', value: 23.1, color: 'accent' },
      { label: '非独居', value: 15.1, color: 'muted' },
    ],
    difference: '+8.0pp',
    significance: 'p < 0.001',
    source: 'CFPS 2022',
  },
  figure3: {
    title: '2016—2022 年独居青年享受型消费占比相对非独居青年的差异',
    points: [
      { year: '2016', value: 8.1 },
      { year: '2018', value: 5.7 },
      { year: '2020', value: 4.4 },
      { year: '2022', value: 7.0 },
    ],
    source: 'CFPS 2016 / 2018 / 2020 / 2022',
  },
  figure4: {
    title: '不同收入组中独居青年外出就餐占比相对非独居青年的差异',
    items: [
      { label: '低收入', value: 7.4, color: 'accent' },
      { label: '中收入', value: 8.6, color: 'accent' },
      { label: '高收入', value: 8.4, color: 'accent' },
    ],
    source: 'CFPS 2022',
  },
} as const;
