import { Page } from '../core/Page';
import { Excel } from '../component/excel/Excel';
import { Header } from '../component/header/Header';
import { Toolbar } from '../component/toolbar/Toolbar';
import { Formula } from '../component/formula/Formula';
import { Table } from '../component/table/Table';
import { createStore } from '../core/createStore';
import { rootReducer } from '../../redux/rootReducer';
import { debounce, storage } from '../core/utility';
import { initialState } from '../../redux/initialState';
function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const param = this.param ? this.param : Date.now().toString();
    const state = storage(storageName(param));
    const store = createStore(rootReducer, initialState(state));
    const stateListener = debounce((state) => {
      storage(storageName(param), state);
    }, 300);
    store.subscribe(stateListener);
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
