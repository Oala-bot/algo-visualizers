import {
  highlight,
  showPivot,
  sort,
  swap,
} from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

async function* partition(
  array: number[],
  low: number,
  high: number
): SortAsyncGenerator {
  const pivot = low;
  let i = low;
  let j = high + 1;

  yield* showPivot(pivot, `Pivot selected: ${array[pivot]}`);

  while (i < j) {
    while (--j > low) {
      yield* highlight(j);
      if (array[j] < array[pivot]) {
        break;
      }
    }

    while (i <= high && i < j) {
      i++;
      yield* highlight(i);
      if (array[i] > array[pivot]) {
        break;
      }
    }

    if (i < j) {
      yield* swap(
        array,
        i,
        j,
        `Swapping ${array[i]} and ${array[j]} around the pivot.`
      );
    }
  }

  if (pivot !== j) {
    yield* swap(
      array,
      pivot,
      j,
      `Placing pivot ${array[pivot]} into final sorted position.`
    );
  }

  yield* sort(j, `Index ${j} is now partitioned.`);
  return j;
}

export async function* quickSort(
  array: number[],
  low = 0,
  high = array.length - 1
): SortAsyncGenerator {
  if (low <= high) {
    const pivot = yield* partition(array, low, high);
    if (typeof pivot === 'number') {
      yield* quickSort(array, low, pivot - 1);
      yield* quickSort(array, pivot + 1, high);
    }
  }
}
