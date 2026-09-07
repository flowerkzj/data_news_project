'use client';

import { useState } from 'react';
import { quizLogicNote, quizQuestions } from '../data/clusters';

const storageKey = 'indie-youth-quiz-selections';

export function InteractiveBreak() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored) as number[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      window.localStorage.removeItem(storageKey);
      return [];
    }
  });
  const [saved, setSaved] = useState(false);

  const answer = (index: number) => {
    const next = [...selections];
    next[step] = index;
    setSelections(next);
    if (step < quizQuestions.length - 1) setStep(step + 1);
    else {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setSaved(true);
    }
  };

  const reset = () => {
    setSelections([]);
    setStep(0);
    setSaved(false);
    window.localStorage.removeItem(storageKey);
  };

  return <section className="interactiveBreak" aria-labelledby="interactive-title">
    <div className="interactiveBreak__rule" /><p className="interactiveBreak__eyebrow">Interactive Break</p>
    <h3 id="interactive-title">你更接近哪一种独居状态？</h3><p className="interactiveBreak__intro">{quizLogicNote}</p>
    {!saved ? <div className="quizStep"><p className="quizStep__count">{step + 1} / {quizQuestions.length}</p><p className="quizStep__prompt">{quizQuestions[step].prompt}</p><div className="quizStep__actions">
      {quizQuestions[step].options.map((option, index) => <button type="button" key={option} onClick={() => answer(index)}>{option}</button>)}
    </div></div> : <div className="quizResult"><p>你的选择已保存在这台设备上，分类结果将在题目与逻辑补充后显示。</p><button type="button" onClick={reset}>重新开始</button></div>}
    <div className="interactiveBreak__rule" />
  </section>;
}
