import { HeaderProps } from '@sortViz/models/interfaces';

function Header({ algoName, isCompleted, executionTime }: HeaderProps) {
  return (
    <header>
      <h2>{algoName} Sort</h2>
      <span>
        {isCompleted ? 'Completed' : `Running`} • Time: <strong>{executionTime} ms</strong>
      </span>
    </header>
  );
}

export default Header;
