import {
  modifyAlgoSelection,
  setReset,
} from '@sortViz/store/sorting-visualizer.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import classes from './controls.module.scss';

function AlgoSelection() {
  const dispatch = useAppDispatch();
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );

  const handleOnChange = (position: number) => {
    dispatch(modifyAlgoSelection(position));
    dispatch(setReset());
  };

  return (
    <div className={classes.checkboxWrapper}>
      {selectedAlgosStatus.map((checked, idx) => {
        const algo = algoList[idx];

        // Skip if algorithm is not defined (defensive check)
        if (!algo) {
          return null;
        }

        return (
          <li key={idx} className={classes.listItem}>
            <div className={classes.checkbox}>
              <input
                type="checkbox"
                id={`custom-checkbox-${algo.name}`}
                name={algo.name}
                value={algo.name}
                checked={checked}
                onChange={() => handleOnChange(idx)}
              />
              <label htmlFor={`custom-checkbox-${algo.name}`}>
                {algo.label}
              </label>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default AlgoSelection;
