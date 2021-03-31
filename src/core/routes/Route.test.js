import {Router} from './Router';
import {Page} from '../Page';
class DashboardPage extends Page{
    getRoot(){
        const div = document.createElement('div');
        div.innerHTML = 'dashboard';
        return div;
    }
}
class ExcelPage extends Page{}
describe('Router:', ()=>{
    let router;
    let $root;
    beforeEach(()=>{
        $root = document.createElement('div');
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage,
        });
    });
    test('should be defined', ()=>{
        expect(router).toBeDefined();
    });
    test('should render dashboard Page', ()=>{
       router.changePageHandler();
       expect($root.innerHTML).toBe('<div>dashboard</div>');
    });
});
