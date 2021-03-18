import { toInlineStyles } from '../../core/utility';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

const CHARS = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
function createRow(infoCount, colum, state) {
  const resize = infoCount
    ? '<div class = "row-resize" data-resize = "row"></div>'
    : '';
  const height = heightRow(infoCount, state);
  return `<div class="row" data-type="resizable" data-row=${infoCount}
   style="height:${height}">
    <div class="row-info"     
    >
    ${infoCount || ''}
    ${resize}
    </div>
    <div class="row-data">
    ${colum}
    </div>
    </div>
    `;
}
function widthCol(i, widthCols) {
  return `${widthCols[i] || DEFAULT_WIDTH}px`;
}
function heightRow(i, heightCols) {
  return `${heightCols[i] || DEFAULT_HEIGHT}px`;
}
function withWidthFrom(state) {
  return (cols, index) => {
    return {
      cols,
      index,
      width: widthCol(index, state),
    };
  };
}
function createCeil(rows, state) {
  const { colState, dataState } = state;
  return (_, cols) => {
    const id = `${rows}:${cols}`;
    const width = widthCol(cols, colState);
    const content = dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `<div class="ceil" contenteditable 
  data-type="ceil"
  data-ceil="${cols}" 
  data-id="${id}"
  style = "${styles};width:${width}"
  data-value=${content || ''}
  >
  ${parse(content) || ''}
  </div>`;
  };
}
function createColum({ cols, index, width }) {
  return `<div class="colum" data-col="${index}" data-type = "resizable" 
  style="width:${width}" >
  ${cols}
  <div class = "col-resize" data-resize = "col"></div>
  </div>
  `;
}
function toChar(_, index) {
  return String.fromCharCode(CHARS.A + index);
}
export function createTable(rowsCount = 20, state) {
  const colsCount = CHARS.Z - CHARS.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state.colState))
    .map(createColum)
    .join('');

  rows.push(createRow(null, cols, {}));
  for (let i = 0; i < rowsCount; i++) {
    const ceil = new Array(colsCount)
      .fill('')
      .map(createCeil(i, state))
      .join('');
    rows.push(createRow(i + 1, ceil, state.rowState));
  }

  return rows.join('');
}
