import { PrimitiveAtom, atom } from 'jotai';
import { atomWithHash } from 'jotai/utils';
import Router from 'next/router';
import { AppUtil, DataUtil } from '~/shared/utils';

export abstract class BaseStore<TState> {
  private _initialState: TState;
  private _state: PrimitiveAtom<TState>;

  constructor(state: TState, config?: any) {
    this._initialState = DataUtil.deepClone(state);
    this._state = atomWithHash(config?.key || 'strg', state, {
      replaceState: true,
      subscribe: (callback) => {
        Router.events.on('routeChangeComplete', callback);
        window.addEventListener('hashchange', callback);
        return () => {
          Router.events.off('routeChangeComplete', callback);
          window.removeEventListener('hashchange', callback);
        };
      },
    });
    if (process.env.NODE_ENV !== 'production') {
      this._state.debugLabel = config?.key || 'strg';
    }
  }

  public get state(): PrimitiveAtom<TState> {
    return this._state;
  }

  public onLoad(callback: Function) {
    AppUtil.onLoad(callback);
  }

  public resetState(): void {
    atom(null, (get, set, update) => {
      set(this._state, () => DataUtil.deepClone(this._initialState));
    });
  }
}
