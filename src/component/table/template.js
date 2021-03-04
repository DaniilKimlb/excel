function createRow(infoCount, colum) {
  const resize = infoCount
    ? '<div class = "row-resize" data-resize = "row"></div>'
    : '';
  return `<div class="row" data-type="resizable">
    <div class="row-info" >
    ${infoCount || ''}
    ${resize}
    </div>
    <div class="row-data">
    ${colum}
    </div>
    </div>
    `;
}
function createCeil(ceil, index, letter) {
  return `<div class="ceil" contenteditable data-ceil="${letter}">
  ${ceil}
  </div>`;
}
function createColum(cols) {
  return `<div class="colum" data-type = "resizable" >
  ${cols}
  <div class = "col-resize" data-resize = "colum"></div>
  </div>
  `;
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

  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const ceil = new Array(colsCount)
      .fill('')
      .map((e, index) =>
        createCeil(e, i + 1, String.fromCharCode(CHARS.A + index))
      )
      .join('');
    rows.push(createRow(i + 1, ceil));
  }

  return rows.join('');
}
