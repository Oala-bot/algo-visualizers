import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import type { SortAlgorithm } from '@sortViz/models/interfaces';
import classes from './educational-panels.module.scss';

type LiveActivityProps = {
  activity: string;
};

type AlgorithmInfoProps = {
  algo: SortAlgorithm;
};

function LiveActivityPanel({ activity }: LiveActivityProps) {
  return (
    <section className={classes.activityPanel}>
      <h4>Live Algorithm Activity</h4>
      <p>{activity}</p>
    </section>
  );
}

function AlgorithmInfoPanel({ algo }: AlgorithmInfoProps) {
  return (
    <section className={classes.panel}>
      <div className={classes.infoHeader}>
        <h3>{algo.label} Sort</h3>
        <p>{algo.description}</p>
      </div>

      <div className={classes.infoGrid}>
        <article>
          <strong>How it works</strong>
          <p>{algo.howItWorks}</p>
        </article>
        <article>
          <strong>Complexity</strong>
          <ul>
            <li>Best: {algo.best}</li>
            <li>Average: {algo.average}</li>
            <li>Worst: {algo.worst}</li>
            <li>Space: {algo.space}</li>
          </ul>
        </article>
      </div>

      <div className={classes.uses}>
        <strong>Common uses</strong>
        <p>{algo.uses}</p>
      </div>
    </section>
  );
}

function ComplexityComparisonTable() {
  return (
    <section className={classes.panel}>
      <h3>Sorting Complexity Comparison</h3>
      <div className={classes.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best</th>
              <th>Average</th>
              <th>Worst</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            {algoList.map((item) => (
              <tr key={item.name}>
                <td>{item.label}</td>
                <td>{item.best}</td>
                <td>{item.average}</td>
                <td>{item.worst}</td>
                <td>{item.space}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ColorLegend() {
  const legend = [
    { label: 'Compared Elements', color: 'var(--color-highlight)' },
    { label: 'Swapped Elements', color: 'var(--color-highlight)' },
    { label: 'Sorted Elements', color: 'var(--color-sort)' },
    { label: 'Pivot Element', color: 'var(--color-pivot)' },
    { label: 'Current Element', color: 'rgba(38, 132, 255, 0.18)' },
  ];

  return (
    <section className={classes.panel}>
      <h3>Color Legend</h3>
      <ul className={classes.legendList}>
        {legend.map((item) => (
          <li key={item.label} className={classes.legendItem}>
            <span
              className={classes.legendColor}
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LiveActivityPanel;
export { AlgorithmInfoPanel, ComplexityComparisonTable, ColorLegend };
