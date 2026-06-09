import { useEffect, useRef } from 'react';

import Header from './header';
import LiveActivityPanel from './educational-panels';
import VisualizerDisplay from './visualizer-display';
import { VisualizerProps } from '@sortViz/models/interfaces';
import classes from './visualizer.module.scss';
import useAlgo from '@sortViz/hooks/use-algo.hook';

const Visualizer = function Visualizer({ array, algo, onComplete }: VisualizerProps) {
  const sortingArray = useRef([...array]);

  const {
    swapCount,
    compareCount,
    moveCount,
    executionTime,
    isCompleted,
    swaps,
    sorts,
    highlights,
    pivot,
    moves,
    activity,
  } = useAlgo(sortingArray.current, algo.fn);

  useEffect(() => {
    if (isCompleted) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  return (
    <section className={classes.container}>
      <Header
        algoName={algo.label}
        isCompleted={isCompleted}
        executionTime={executionTime}
      />

      <LiveActivityPanel activity={activity} />

      <VisualizerDisplay
        pivot={pivot}
        array={sortingArray.current}
        swaps={swaps}
        highlights={highlights}
        sorts={sorts}
        moves={moves}
      />

      <footer className={classes.footer}>
        <div className={classes.stats}>
          <span>
            Comparisons: <strong>{compareCount}</strong>
          </span>
          <span>
            Swaps: <strong>{swapCount}</strong>
          </span>
          <span>
            Moves: <strong>{moveCount}</strong>
          </span>
        </div>

        <div className={classes.complexityRow}>
          <span>Best: {algo.best}</span>
          <span>Avg: {algo.average}</span>
          <span>Worst: {algo.worst}</span>
        </div>
      </footer>
    </section>
  );
};

export default Visualizer;
