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
function createCeil(ceil, rows, cols) {
  return `<div class="ceil" contenteditable 
  data-type="ceil"
  data-ceil="${cols}" 
  data-id="${rows}:${cols}">
  
  </div>`;
}
function createColum(cols, index) {
  return `<div class="colum" data-cols="${index}" data-type = "resizable" >
  ${cols}
  <div class = "col-resize" data-resize = "colum"></div>
  </div>
  `;
}
const CHARS = {
  A: 65,
  Z: 90,
};
function toChar(_, index) {
  return String.fromCharCode(CHARS.A + index);
}
export function createTable(rowsCount = 20) {
  const colsCount = CHARS.Z - CHARS.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColum)
    .join('');

  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const ceil = new Array(colsCount)
      .fill('')
      .map((ceil, index) => createCeil(ceil, i, index))
      .join('');
    rows.push(createRow(i + 1, ceil));
  }

  return rows.join('');
}
