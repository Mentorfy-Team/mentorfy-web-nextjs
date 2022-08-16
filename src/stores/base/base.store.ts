import {
  PluginCallbacksOnSetArgument, State, createState,
} from '@hookstate/core';
import {Persistence} from '@hookstate/persistence';
import {AppUtil, DataUtil} from '~/shared/utils';

export abstract class BaseStore<TState> {

  private _initialState: TState;
  private _state: State<TState>;
  private _reactions: Array<BaseStore.Reaction<TState>> = [];

  constructor(state: TState, config?: BaseStore.Config) {
    this._initialState = DataUtil.deepClone(state);
    this._state = createState(state);

    this._state.attach(() => ({
      id: Symbol('OnChangePlugin'),
      init: () => ({
        onSet: this.handleReactions.bind(this),
      }),
    }));

    this.onLoad(() => {
      if(config?.persistence) {
        this.state.attach(Persistence(config.persistence.storageKey));
      }
    });
  }

  public get state(): State<TState> {
    return this._state;
  }

  public onLoad(callback: Function) {
    AppUtil.onLoad(callback);
  }

  public resetState(): void {
    this.state.set(DataUtil.deepClone(this._initialState));
  }

  public getBatchUpdateKey(caller: Function) {
    return `${this.constructor.name}_${caller.name}`;
  }

  protected reaction({callback, path}: BaseStore.Reaction<TState>): void {
    this._reactions.push({
      path,
      callback,
    });
  }

  private handleReactions(data: PluginCallbacksOnSetArgument) {
    this._reactions.forEach(r => {
      if (r.path.toString() === data.path.toString()) {
        r.callback(this.state, data);
      }
    });
  }
}

