
import {BaseStore} from '~/stores';

class Controller extends BaseStore<LoadingPartial.Controller.State> {
  constructor() {
    super({
      requestCount: 0,
    });
  }

  public countRequest() {
    this.state.requestCount.set(prev => prev + 1);
  }

  public discountRequest() {
    this.state.requestCount.set(prev => prev - 1);
  }
}

export const LoadingPartialController = new Controller();
