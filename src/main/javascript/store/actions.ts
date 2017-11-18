import { ActionContext, ActionTree } from 'vuex';
import { MUTATION } from './mutation-types';
import { ACTION } from './action-types';
import { Api } from '../api';
import { Sandbox } from '../api/sandbox';
import { State } from './State';

const sandbox = new Sandbox();
const api = new Api();

const actions = <ActionTree<State, any>> {
  // sandbox
  [ACTION.INPUT_NAME](store: ActionContext<State, State>, userName: string) {
    store.commit(MUTATION.INPUT_NAME, userName);
  },
  [ACTION.INCREMENT](store: ActionContext<State, State>) {
    store.commit(MUTATION.INCREMENT);
  },
  [ACTION.DECREMENT](store: ActionContext<State, State>) {
    store.commit(MUTATION.DECREMENT);
  },
  [ACTION.HTTP_POST](store: ActionContext<State, State>) {
    sandbox.post(store.state.userName, (data: string) => {
      store.commit(MUTATION.HTTP_POST, data);
    });
  },
  [ACTION.WS_SEND](store: ActionContext<State, State>) {
    sandbox.send(store, store.state.userName);
  },

  // App
  [ACTION.INPUT_SQL](store: ActionContext<State, State>, sql: string) {
    store.commit(MUTATION.INPUT_SQL, sql);
  },
  // [ACTION.CANCEL](store: ActionContext<State, State>, sql: string) {
  //   store.commit(MUTATION.CANCEL, sql);
  // },
  [ACTION.SUBMIT](store: ActionContext<State, State>) {
    api.submit(store, store.state.sql);
  },
};

export default actions;
