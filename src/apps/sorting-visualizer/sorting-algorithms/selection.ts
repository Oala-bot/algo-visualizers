import {
  highlight,
  showPivot,
  sort,
  swap,
} from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

export async function* selectionSort(array: number[]): SortAsyncGenerator {
  let i, j;

  for (i = 0; i < array.length; i++) {
    let maxIndex = 0;

    for (j = 1; j < array.length - i; j++) {
      yield* showPivot(
        maxIndex,
        `Selecting candidate ${array[maxIndex]} to compare against ${array[j]}`
      );
      yield* highlight(j);

      if (array[maxIndex] < array[j]) {
        maxIndex = j;
      }
    }

    j = j - 1;
    if (maxIndex !== j && array[maxIndex] !== array[j]) {
      yield* swap(
        array,
        maxIndex,
        j,
        `Swapping ${array[maxIndex]} into sorted position ${j}`
      );
    }

    yield* sort(j, `Element at index ${j} is now placed correctly.`);
  }
}
