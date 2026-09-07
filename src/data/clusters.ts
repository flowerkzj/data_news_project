export const clusterFigure = {
  title: '独居青年内部的三种类型',
  groups: [
    { name: '空巢型', share: 27.3, color: 'muted' },
    { name: '过渡型', share: 44.1, color: 'gold' },
    { name: '高巢型', share: 28.6, color: 'accent' },
  ],
  dimensions: [
    { label: '消费', values: [{ group: '空巢型', value: -0.045 }, { group: '过渡型', value: 0.522 }, { group: '高巢型', value: -0.762 }] },
    { label: '社交', values: [{ group: '空巢型', value: -0.485 }, { group: '过渡型', value: 0.237 }, { group: '高巢型', value: 0.099 }] },
    { label: '心理', values: [{ group: '空巢型', value: -0.908 }, { group: '过渡型', value: 0.297 }, { group: '高巢型', value: 0.409 }] },
  ],
  source: 'CFPS 2022 K-means',
} as const;

export const quizQuestions = [
  { prompt: '第 1 题：互动题目文案待补充。', options: ['选项一', '选项二'] },
  { prompt: '第 2 题：互动题目文案待补充。', options: ['选项一', '选项二'] },
  { prompt: '第 3 题：互动题目文案待补充。', options: ['选项一', '选项二'] },
  { prompt: '第 4 题：互动题目文案待补充。', options: ['选项一', '选项二'] },
] as const;

export const quizLogicNote = '四个问题及分类逻辑待补充；此处仅保留文章内嵌互动的位置与流程。';
