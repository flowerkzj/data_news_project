
import { ArticleDivider } from '../src/components/ArticleDivider';
import { ArticlePlaceholder } from '../src/components/ArticlePlaceholder';
import { BigNumber } from '../src/components/BigNumber';
import { ClusterMatrix, DataViz, DumbbellChart, KnownNodes } from '../src/components/DataViz';
import { EditorialFigure } from '../src/components/EditorialFigure';
import { InteractiveBreak } from '../src/components/InteractiveBreak';
import { FinalPrompt } from '../src/components/FinalPrompt';
import { Methodology } from '../src/components/Methodology';
import { PolicyTimeline } from '../src/components/PolicyTimeline';
import { ResearchNote } from '../src/components/ResearchNote';
import { SectionHeading } from '../src/components/SectionHeading';
import { articleOverview, openingNumbers } from '../src/data/overview';
import { consumptionFigures } from '../src/data/consumption';
import { clusterFigure } from '../src/data/clusters';
import { methodology } from '../src/data/sources';
import { policyTimeline } from '../src/data/policies';
import { psychologyFigures } from '../src/data/psychology';
import { socialFigures } from '../src/data/social';

export const dynamic = 'force-static';

function RichArticleParagraph({ text }: { text: string }) {
  const segments = text.split(/\*\*(.*?)\*\*/g);
  return <p>{segments.map((segment, index) => index % 2 === 1 ? <strong key={index}>{segment}</strong> : segment)}</p>;
}

export default function Home() {

  return <main className="siteShell">
    <article className="storyArticle">
      <header className="storyHeader">
        <p className="kicker">DATA JOURNALISM / 2026</p>
        <h1>{articleOverview.title}</h1>
        <p className="dek">{articleOverview.dek}</p>
        <div className="roomSketch" aria-label="一间亮着夜灯的房间插画" role="img"><span className="roomSketch__wall" /><span className="roomSketch__door" /><span className="roomSketch__lamp" /><span className="roomSketch__light" /><span className="roomSketch__floor" /></div>
        <p className="sceneLabel">{articleOverview.sceneLabel}</p>
        <div className="sceneText">{articleOverview.scene.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </header>

      <section className="articleBody" aria-label="新闻正文">
        <div className="bigNumberBand" aria-label="开篇统计数字">{openingNumbers.map((number) => <BigNumber key={number.value} {...number} />)}</div>
        <div className="articleNarrative">{articleOverview.dataNarrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>

        <EditorialFigure number={1} title="2018—2022 年20—39岁青年独居率" source="CFPS 2018、2020、2022"><DataViz data={{ kind: 'line', points: [{ year: '2018', value: 12.3 }, { year: '2020', value: 11.9 }, { year: '2022', value: 13.8 }], yMax: 16, suffix: '%' }} /></EditorialFigure>

        <div className="articleNarrative articleNarrative--transition">{articleOverview.sectionOneNarrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <SectionHeading number="1">{articleOverview.sectionHeadings[0]}</SectionHeading>
        <div className="articleNarrative articleNarrative--consumption">{articleOverview.consumptionNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <EditorialFigure number={2} title={consumptionFigures.figure2.title} source={consumptionFigures.figure2.source} note={`${consumptionFigures.figure2.difference} · ${consumptionFigures.figure2.significance}`}><DataViz data={{ kind: 'bar', items: consumptionFigures.figure2.items, max: 30, suffix: '%' }} /></EditorialFigure>
        <ArticlePlaceholder />
        <EditorialFigure number={3} title={consumptionFigures.figure3.title} source={consumptionFigures.figure3.source} note="独居 − 非独居；0 为参考线"><DataViz data={{ kind: 'line', points: consumptionFigures.figure3.points, yMax: 10, suffix: 'pp', zeroLine: true }} /></EditorialFigure>
        <ArticlePlaceholder />
        <EditorialFigure number={4} title={consumptionFigures.figure4.title} source={consumptionFigures.figure4.source}><DataViz data={{ kind: 'bar', items: consumptionFigures.figure4.items, max: 10, suffix: 'pp' }} /></EditorialFigure>
        <div className="articleNarrative articleNarrative--consumption-close">{articleOverview.consumptionClosingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>

        <SectionHeading number="2">{articleOverview.sectionHeadings[1]}</SectionHeading>
        <div className="articleNarrative articleNarrative--psychology">{articleOverview.psychologyNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <EditorialFigure number={5} title={psychologyFigures.figure5.title} source={psychologyFigures.figure5.source} note={`量表：${psychologyFigures.figure5.scale}`}><DataViz data={{ kind: 'dualLine', years: psychologyFigures.figure5.years, series: psychologyFigures.figure5.series, yMax: 10 }} /></EditorialFigure>
        <ArticlePlaceholder />
        <EditorialFigure number={6} title={psychologyFigures.figure6.title} source={psychologyFigures.figure6.source} note="每一行使用各自量表，点旁保留真实原始值。"><DumbbellChart rows={psychologyFigures.figure6.rows} /></EditorialFigure>
        <ArticlePlaceholder />
        <EditorialFigure number={7} title={psychologyFigures.figure7.title} source={psychologyFigures.figure7.source} note={psychologyFigures.figure7.definition}><DataViz data={{ kind: 'bar', items: psychologyFigures.figure7.items, max: 20, suffix: '%' }} /></EditorialFigure>
        <ResearchNote>{psychologyFigures.researchNote}</ResearchNote>
        <div className="articleNarrative articleNarrative--psychology-closing">{articleOverview.psychologyClosingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>

        <SectionHeading number="3">{articleOverview.sectionHeadings[2]}</SectionHeading><div className="articleNarrative articleNarrative--social">{articleOverview.socialNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <EditorialFigure number={8} title={socialFigures.figure8.title} source={socialFigures.figure8.source}><DumbbellChart rows={socialFigures.figure8.rows} /></EditorialFigure>
                <div className="articleNarrative articleNarrative--social-figure8">{articleOverview.socialFigure8Narrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <EditorialFigure number={9} title={socialFigures.figure9.title} source={socialFigures.figure9.source}><DumbbellChart rows={socialFigures.figure9.rows} /></EditorialFigure>
        <ArticlePlaceholder />
        <EditorialFigure number={10} title={socialFigures.figure10.title} source={socialFigures.figure10.source} note={socialFigures.figure10.note}><KnownNodes nodes={socialFigures.figure10.nodes} /></EditorialFigure>
                <div className="articleNarrative articleNarrative--social-closing">{articleOverview.socialClosingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>

        <SectionHeading number="4">{articleOverview.sectionHeadings[3]}</SectionHeading><div className="articleNarrative articleNarrative--cluster">{articleOverview.clusterNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <EditorialFigure number={11} title={clusterFigure.title} source={clusterFigure.source} wide><ClusterMatrix groups={clusterFigure.groups} dimensions={clusterFigure.dimensions} /></EditorialFigure>
        <div className="articleNarrative articleNarrative--cluster-closing">{articleOverview.clusterClosingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <InteractiveBreak />
                <div className="articleNarrative articleNarrative--interactive">{articleOverview.interactiveNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <div className="articleNarrative articleNarrative--policy-intro">{articleOverview.policyIntroNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>


        <EditorialFigure number={12} title={policyTimeline.title} source={policyTimeline.source} wide><PolicyTimeline items={policyTimeline.items} /></EditorialFigure>
        <div className="articleNarrative articleNarrative--policy-closing">{articleOverview.policyClosingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <ArticleDivider /><div className="articleNarrative articleNarrative--closing">{articleOverview.closingNarrative.map((paragraph) => <RichArticleParagraph key={paragraph} text={paragraph} />)}</div>
        <FinalPrompt question={articleOverview.finalQuestion} options={articleOverview.finalOptions} />
      </section>

      <footer className="storyFooter"><Methodology items={methodology} /></footer>
    </article>
  </main>;
}
