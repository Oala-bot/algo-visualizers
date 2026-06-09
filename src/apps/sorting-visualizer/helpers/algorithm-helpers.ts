import {
  highlightInterval,
  simulator,
  swapInterval,
} from '@sortViz/store/global.state';

import { SortAsyncGenerator } from '@sortViz/models/types';
import { delay } from '@/lib/helpers/async';

export async function* swap(
  array: number[],
  i: number,
  j: number,
  message?: string
): SortAsyncGenerator {
  await simulator.isPlayingPromise;

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  yield { type: 'swap', positions: [i, j], message };
  await delay(swapInterval);

  await simulator.isPlayingPromise;
}

export async function* highlight(...positions: number[]): SortAsyncGenerator {
  yield { type: 'highlight', positions: [-1, -1] };
  await delay(highlightInterval);
  await simulator.isPlayingPromise;

  yield { type: 'highlight', positions };
  await delay(highlightInterval);

  await simulator.isPlayingPromise;
}

export async function* showPivot(
  position: number,
  message?: string
): SortAsyncGenerator {
  yield { type: 'pivot', position, message };
}

export async function* sort(
  position: number,
  message?: string
): SortAsyncGenerator {
  yield { type: 'sort', position, message };
}

export async function* move(...positions: number[]): SortAsyncGenerator {
  await simulator.isPlayingPromise;
  yield { type: 'move', positions };
  await delay(swapInterval);
}
