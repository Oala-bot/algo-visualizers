import { highlight, move, sort } from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

export async function* insertionSort(array: number[]): SortAsyncGenerator {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      yield* highlight(j, j + 1);
      array[j + 1] = array[j];
      yield* move(j, j + 1);
      j--;
    }

    array[j + 1] = key;
    if (j + 1 !== i) {
      yield* move(i, j + 1);
    }

    yield* sort(i, `Inserted ${key} into the sorted section.`);
  }
}
