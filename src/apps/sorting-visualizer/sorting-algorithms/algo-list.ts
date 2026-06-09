import { bubbleSort } from './bubble';
import { heapSort } from './heap';
import { insertionSort } from './insertion';
import { mergeSort } from './merge';
import { quickSort } from './quick';
import { selectionSort } from './selection';
import type { SortAlgorithm } from '@sortViz/models/interfaces';

export const algoList: SortAlgorithm[] = [
  {
    name: 'bubble',
    label: 'Bubble',
    fn: bubbleSort,
    description:
      'Repeatedly compares adjacent elements and swaps them when necessary.',
    howItWorks:
      'The largest values gradually move toward the end of the array through repeated adjacent swaps.',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    uses: 'Educational purposes and small datasets.',
  },
  {
    name: 'selection',
    label: 'Selection',
    fn: selectionSort,
    description:
      'Repeatedly finds the smallest remaining element and places it in its final position.',
    howItWorks:
      'Each pass selects the minimum element from the unsorted portion.',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    uses: 'Situations where minimizing swaps matters.',
  },
  {
    name: 'insertion',
    label: 'Insertion',
    fn: insertionSort,
    description: 'Builds a sorted section one element at a time.',
    howItWorks:
      'Each new element is inserted into its correct position within the sorted portion.',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    uses: 'Small datasets and nearly sorted data.',
  },
  {
    name: 'merge',
    label: 'Merge',
    fn: mergeSort,
    description:
      'Uses divide-and-conquer to recursively split and merge arrays.',
    howItWorks:
      'The array is divided into smaller arrays, sorted independently, and merged together.',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    uses: 'Large datasets and external sorting systems.',
  },
  {
    name: 'quick',
    label: 'Quick',
    fn: quickSort,
    description: 'Uses partitioning around a pivot element.',
    howItWorks:
      'Elements smaller than the pivot are placed on one side and larger elements on the other.',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    uses: 'General-purpose high-performance sorting.',
  },
  {
    name: 'heap',
    label: 'Heap',
    fn: heapSort,
    description: 'Uses a binary heap data structure.',
    howItWorks:
      'Build a heap and repeatedly extract the maximum element.',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    uses: 'Priority queues and memory-constrained environments.',
  },
];
