import { storage } from '../core/utility';

function toHTML(key) {
  const loc = storage(key);
  return `
    <li class="db__record">
    <a href="#excel/${key.split(':')[1]}">${loc.textTitle}</a>
    <strong>
    ${new Date(loc.openedDate).toLocaleDateString()}
    ${new Date(loc.openedDate).toLocaleTimeString()}
    </strong>
  </li>
    `;
}
function getAllKey() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    keys.push(key);
    if (localStorage.key(i).includes('excel')) {
      continue;
    }
  }

  return keys;
}
export function createRecordsTable() {
  const keys = getAllKey();
  if (!keys.length) {
    return 'Вы пока не создали ни одной таблицы!';
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
     ${keys.map(toHTML).join('')}
    </ul>`;
}
