'use client';

import { useState } from 'react';

type FinalPromptProps = {
  question: string;
  options: readonly string[];
};

export function FinalPrompt({ question, options }: FinalPromptProps) {
  const [finalChoice, setFinalChoice] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem('indie-youth-final-choice');
  });

  const chooseFinal = (choice: string) => {
    setFinalChoice(choice);
    window.localStorage.setItem('indie-youth-final-choice', choice);
  };

  return <section className="finalPrompt" aria-labelledby="final-question">
    <p className="finalPrompt__eyebrow">留给你的问题</p>
    <h2 id="final-question">{question}</h2>
    <div className="finalPrompt__options">
      {options.map((choice) => <button type="button" className={finalChoice === choice ? 'is-selected' : ''} key={choice} onClick={() => chooseFinal(choice)}>{choice}</button>)}
    </div>
    {finalChoice ? <p className="finalPrompt__saved">已记录在这台设备：{finalChoice}</p> : null}
  </section>;
}