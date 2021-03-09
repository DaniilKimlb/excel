import { range } from '../../core/utility';

export function shouldResize(event) {
  return event.target.dataset.resize;
}
export function isCeil(event) {
  return event.target.dataset.type === 'ceil';
}
export function matrix($target, $current) {
  const target = $target.id(true);
  const correct = $current.id(true);
  const cols = range(correct.col, target.col);
  const rows = range(correct.row, target.row);
  return cols.reduce((ac, c) => {
    rows.forEach((r) => ac.push(`${r}:${c}`));
    return ac;
  }, []);
}
