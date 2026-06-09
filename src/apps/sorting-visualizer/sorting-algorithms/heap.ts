import {
  highlight,
  showPivot,
  sort,
  swap,
} from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

async function* maxHeap(
  array: number[],
  i: number,
  length: number
): SortAsyncGenerator {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let max = i;

  const highlightArray = [];
  if (left < length) highlightArray.push(left);
  if (right < length) highlightArray.push(right);

  if (highlightArray.length > 0) {
    yield* showPivot(i, `Heapifying subtree at index ${i}.`);
    yield* highlight(...highlightArray);
  }

  if (left < length) {
    if (array[left] > array[max]) {
      max = left;
    }
  }

  if (right < length) {
    if (array[right] > array[max]) {
      max = right;
    }
  }

  if (max !== i) {
    yield* swap(
      array,
      i,
      max,
      `Swapping ${array[i]} with child ${array[max]} to restore heap order.`
    );
    yield* showPivot(-1);
    yield* maxHeap(array, max, length);
  }
}

export async function* heapSort(array: number[]): SortAsyncGenerator {
  let length = array.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    yield* maxHeap(array, i, length);
  }

  for (let i = array.length - 1; i > 0; i--) {
    length--;
    yield* sort(length, `Placed the highest element at index ${length}.`);
    yield* swap(
      array,
      0,
      i,
      `Moving the current maximum ${array[0]} to the end of the array.`
    );
    yield* maxHeap(array, 0, length);
  }

  yield* sort(0, 'Heap sorting complete.');
}
