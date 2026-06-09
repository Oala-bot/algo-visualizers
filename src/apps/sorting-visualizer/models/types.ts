export type SortAsyncGenerator = AsyncGenerator<
  | {
      type: 'swap' | 'highlight' | 'move';
      positions: number[];
      message?: string;
    }
  | {
      type: 'sort' | 'pivot';
      position: number;
      message?: string;
    },
  void | number,
  unknown
>;
