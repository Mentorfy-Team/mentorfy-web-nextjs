
import {BaseStore} from '~/stores/base/base.store';

class Store extends BaseStore<AppStore.State> {

  private static readonly HISTORY_LIMIT = 100;

  constructor() {
    super({
      clicks: 0,
      mousePosition: {
        x: 0,
        y: 0,
      },
    });

    this.onLoad(() => {
      window.addEventListener('mousemove', event => {
        this.handleMouseMove(event);
      });
      window.addEventListener('click', () => {
        this.handleMouseClick();
      });
    });
  }

  private handleMouseMove({x, y}: MouseEvent): void {
    this.state.mousePosition.batch(prev => {
      prev.x.set(x);
      prev.y.set(y);
    });
  }

  private handleMouseClick(): void {
    this.state.clicks.set(prev => prev + 1);
  }

}

export const AppStore = new Store();
