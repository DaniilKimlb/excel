import {debounce} from '../utility';

export class StateProcessor {
    constructor(process, delay = 300) {
    this.process = process;
    this.listen = debounce(this.listen.bind(this), delay);
    }
    listen(state){
        this.process.save(state);
    }
    get(){
        return this.process.get();
    }
}
