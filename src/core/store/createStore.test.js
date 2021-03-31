import {createStore} from './createStore';

const initialState = {
    count: 0,
};
const reducer = (state = initialState, action)=>{
    if (action.type === 'APP'){
        return {...state, count: state.count = 1};
    }
    return state;
};
describe('createReducer:', ()=>{
   let store;
   let handler;
   beforeEach(()=>{
         store = createStore(reducer, initialState);
         handler = jest.fn();
   });
    test('should methods work at the store', ()=>{
        expect(store).toBeDefined();
        expect(store.dispatch).toBeDefined();
        expect(store.subscribe).toBeDefined();
        expect(store.getState).toBeDefined();
    });
    test('should return object', ()=> {
    expect(store.getState()).toBeInstanceOf(Object);
    });
        test('should dispatch in the state', ()=>{
        store.dispatch({type: 'APP'});
        expect(store.getState().count).toBe(1);
    });
        test('should return state', ()=>{
            expect(store.getState()).toEqual(initialState);
        });
    test('dispatch shouldn\'t change state', ()=>{
        store.dispatch({type: 'SHOULDN\'_CHANGE_STATE'});
        expect(store.getState().count).toBe(0);
    });
    test('should call function subscribe', ()=>{
    store.subscribe(handler);
    store.dispatch({type: 'APP'});
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
    });
    test('should call function unsubscribe', ()=>{
        const sub = store.subscribe(handler);
        sub.unsubscribe();
        store.dispatch({type: 'APP'});
        expect(handler).not.toHaveBeenCalled();
    });
    test('should dispatch in async way', ()=>{
        return new Promise((resolve) => {
            setTimeout(()=> store.dispatch({type: 'APP'}, 500));
            setTimeout(()=>{
                expect(store.getState().count).toBe(1);
                resolve();
            }, 500);
        });
    });
});
