import ExpenseServices from "../../services/ExpenseService";
import LoaderUtils from "../../utils/BaseUtils/LoaderUtils";
import RouterUtils from "../../utils/BaseUtils/RouterUtils";
import form from "bootstrap-vue/esm/mixins/form";
const expenseService = new ExpenseServices();

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
  fetchExpense() {
    let payload = {
      email: StoreUtils.rootGetters("user/getUserEmail")
    };

    let successAction = responseData => {
      //Save user info to the store
      StoreUtils.commit("table/SET_TABLE_DATA", responseData.expense);
    };

    expenseService.fetchExpense(
      payload,
      successAction,
      LoaderUtils.types.TABLE
    );
  },

  createExpense() {
    let formBody = StoreUtils.rootGetters(
      StoreUtils.getters.form.GET_FORM_BODY
    );

    let payload = {
      cost: formBody.cost,
      category: formBody.category,
      description: formBody.description,
      email: formBody.email
    };

    let successAction = responseData => {
      //Save user info to the store

      StoreUtils.dispatch("form/resetForm");

      RouterUtils.changeRouteTo(RouterUtils.routes.DASHBOARD);
    };

    expenseService.createExpense(
      payload,
      successAction,
      LoaderUtils.types.TABLE
    );
  }
};
