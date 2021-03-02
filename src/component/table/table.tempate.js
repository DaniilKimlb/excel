function createRow(infoCount, colum) {
  return `<div class="row">
    <div class="row-info">${infoCount || ''}</div>
    <div class="row-data">${colum}</div>
    </div>
    `;
}
function createCeil(ceil) {
  return `<div class="ceil" contenteditable >${ceil}</div>`;
}
function createColum(cols) {
  return `<div class="colum">${cols}</div>`;
}
const CHARS = {
  A: 65,
  Z: 90,
};
export function createTable(rowsCount = 20) {
  const colsCount = CHARS.Z - CHARS.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map((e, i) => String.fromCharCode(CHARS.A + i))
    .map(createColum)
    .join('');

  const ceil = new Array(colsCount).fill('').map(createCeil).join('');
  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, ceil));
  }

  return rows.join('');
}
