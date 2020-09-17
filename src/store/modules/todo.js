import ToDoService from "../../services/ToDoService";
import LoaderUtils from "../../utils/BaseUtils/LoaderUtils";
import RouterUtils from "../../utils/BaseUtils/RouterUtils";
import form from "bootstrap-vue/esm/mixins/form";
const todoService = new ToDoService();

import StoreUtils from "../../utils/BaseUtils/StoreUtils";

export const namespaced = true;

export const state = {};

export const getters = {
  getUserOptions: state => {
    return state.userOptions;
  }
};

export const mutations = {
  SET_USER_OPTIONS(state, payload) {
    state.userOptions = payload;
  }
};

export const actions = {
  fetchTodoList() {
    let payload = {

    };

    let successAction = responseData => {
      //Save user info to the store
      StoreUtils.commit("table/SET_TABLE_DATA", responseData);
    };

    todoService.fetchTodoList(
      payload,
      successAction,
      LoaderUtils.types.TABLE
    );
  }
};
