const DEFAULT_LABEL = 'global';

export const storeManager = new Map<string, Store<any>>();

type BooleanUnio = boolean

export default class Store<T> {
  label: string;
  state: T;

  constructor(initialState: T, label: string = DEFAULT_LABEL) {
    this.label = label;
    this.state = initialState;
    if (storeManager.has(label)) {
      const store = storeManager.get(label);
      if (store) {
        store.state = { ...store.state, ...initialState};
      }
    } else {
      this.state = initialState;
    }
    storeManager.set(label, this);
  }
}

let store1: any = new Store(1, '1');
let store2: any = new Store('2', '2');
let store3: any = new Store(true, '3');

let store4: any = new Store<BooleanUnio>(4, '4');
let store5: any = new Store<BooleanUnio>(true, '5');