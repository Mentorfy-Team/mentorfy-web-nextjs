import { BaseStore } from '~/stores/base';

type State = {
  isLoading: boolean;
};

class Store extends BaseStore<Partial<State>> {
  constructor() {
    super({
      isLoading: false,
    });

    // this.onLoad(() => {});
  }

  private handleSomething(): void {
    this.state.write(null, null, {});
  }
}

export default new Store();
