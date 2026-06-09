import { useEffect, useRef, useState } from 'react';

import { SortAsyncGenerator } from '@sortViz/models/types';
import { simulator } from '@sortViz/store/global.state';

function useAlgo(
  array: number[],
  algorithm: (array: number[]) => SortAsyncGenerator
) {
  const [swaps, setSwaps] = useState([-1, -1]);
  const [moves, setMoves] = useState([-1, -1]);
  const [sorts, setSorts] = useState<number[]>([]);
  const [highlights, setHighlights] = useState([-1, -1]);
  const [pivot, setPivot] = useState<number>(-1);
  const [activity, setActivity] = useState('Waiting to start');
  const [executionTime, setExecutionTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const it = useRef(algorithm(array));
  const swapCount = useRef(0);
  const moveCount = useRef(0);
  const compareCount = useRef(0);
  const startTime = useRef<number>(0);

  const getActivity = (
    data: {
      type: string;
      positions?: number[];
      position?: number;
      message?: string;
    }
  ) => {
    if (data.message) {
      return data.message;
    }

    if (data.type === 'swap' || data.type === 'highlight' || data.type === 'move') {
      const positions = data.positions ?? [-1, -1];
      if (data.type === 'highlight' && positions[0] === -1) {
        return 'Scanning elements...';
      }

      if (data.type === 'swap') {
        return `Swapping ${array[positions[0]]} and ${array[positions[1]]}`;
      }

      if (data.type === 'move') {
        return `Moving element from index ${positions[0]} to ${positions[1]}`;
      }

      return `Comparing ${array[positions[0]]} and ${array[positions[1]]}`;
    }

    if (data.type === 'pivot') {
      const position = data.position ?? -1;
      return position >= 0
        ? `Pivot selected: ${array[position]}`
        : 'Clearing pivot selection';
    }

    if (data.type === 'sort') {
      return `Sorted position ${data.position ?? 0}`;
    }

    return 'Processing algorithm...';
  };

  const fn = async () => {
    startTime.current = performance.now();
    await simulator.isPlayingPromise;

    for await (const data of it.current) {
      setSwaps([-1, -1]);
      setHighlights([-1, -1]);
      setMoves([-1, -1]);

      setActivity(getActivity(data));

      switch (data.type) {
        case 'swap':
          setHighlights(data.positions);
          setSwaps(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swapCount.current++;
          }
          break;
        case 'sort':
          setSorts((arr) => [...arr, data.position]);
          break;
        case 'highlight':
          setHighlights(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            compareCount.current++;
          }
          break;
        case 'pivot':
          setPivot(data.position);
          break;
        case 'move':
          setHighlights([data.positions[0], data.positions[1]]);
          setMoves(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            moveCount.current++;
          }
          break;
      }
    }

    setIsCompleted(true);
    setExecutionTime(Math.max(0, Math.round(performance.now() - startTime.current)));
  };

  useEffect(() => {
    fn();
  }, []);

  return {
    pivot,
    isCompleted,
    swaps,
    sorts,
    highlights,
    moves,
    activity,
    executionTime,
    swapCount: swapCount.current,
    moveCount: moveCount.current,
    compareCount: compareCount.current,
  };
}

export default useAlgo;
