import { highlight, move, sort, showPivot } from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

export async function* mergeSort(
  array: number[],
  i = 0,
  j = array.length - 1,
  isFinal = true
): SortAsyncGenerator {
  if (i === j) {
    if (isFinal && array.length === 1) {
      yield* sort(i, 'Single element is sorted.');
    }

    return;
  }

  if (i < j) {
    const mid = Math.floor((i + j) / 2);
    yield* mergeSort(array, i, mid, false);
    yield* mergeSort(array, mid + 1, j, false);
    yield* merge(array, i, mid + 1, mid - i + 1, j - mid, isFinal);
  }
}

function shiftRight(array: number[], start: number, end: number) {
  for (let i = end; i > start; i--) {
    array[i] = array[i - 1];
  }
}

async function* merge(
  array: number[],
  i: number,
  j: number,
  size1: number,
  size2: number,
  isFinal: boolean
): SortAsyncGenerator {
  yield* showPivot(-1, 'Merging two sorted arrays.');

  let iMove = 0;
  let jMove = 0;

  while (iMove < size1 && jMove < size2) {
    const left = i + iMove,
      right = j + jMove;

    yield* highlight(left, right);

    if (array[left] <= array[right]) {
      iMove++;

      if (isFinal) {
        yield* sort(left, `Left item ${array[left]} stays in place.`);
      }
    }

    if (array[left] > array[right]) {
      const value = array[right];
      shiftRight(array, left, right);
      array[left] = value;

      yield* move(left, right);

      i++;
      jMove++;

      if (isFinal) {
        yield* sort(left, `Placed ${value} into merged position.`);
      }
    }
  }

  for (let k = i + iMove; k < i + size1; k++) {
    yield* highlight(k);

    if (isFinal) {
      yield* sort(k, `Left segment still sorted.`);
    }
  }

  for (let k = j + jMove; k < j + size2; k++) {
    yield* highlight(k);

    if (isFinal) {
      yield* sort(k, `Right segment still sorted.`);
    }
  }
}
