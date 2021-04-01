import { Page } from '../core/page/Page';
import { Excel } from '../component/excel/Excel';
import { Header } from '../component/header/Header';
import { Toolbar } from '../component/toolbar/Toolbar';
import { Formula } from '../component/formula/Formula';
import { Table } from '../component/table/Table';
import { createStore } from '../core/store/createStore';
import { rootReducer } from '../../redux/rootReducer';
import { initialState } from '../../redux/initialState';
import {StateProcessor} from '../core/page/StateProcessor';
import {LocalStorageClient} from '../shared/LocalStorageClient';


export class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.subScr = null;
    this.stateProcessor = new StateProcessor(
        new LocalStorageClient(this.param)
    );
  }
  async getRoot() {
    const state = await this.stateProcessor.get();
    const store = createStore(rootReducer, initialState(state));
    this.subScr = store.subscribe(this.stateProcessor.listen);
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
    this.subScr.unsubscribe();
  }
}
