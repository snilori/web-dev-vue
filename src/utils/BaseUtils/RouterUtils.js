import StoreUtils from "./StoreUtils";
import router from "../../router/router";

class RouterUtils {
  static routes = {
    auth: {
      LOGIN: "login"
    },
    expense: {
      CREATE_EXPENSE: "create-expense"
    },
    DASHBOARD: "dashboard",
    policy: {
      CREATE_POLICY: "create-policy"
    }
  };
  static changeBaseRouteTo(targetRoute) {
    StoreUtils.dispatch(StoreUtils.actions.router.setActiveRoute, targetRoute);
    router.push({
      name: targetRoute
    });
  }

  static changeRouteTo(targetRoute) {
    router.push({
      name: targetRoute
    });
  }
  static changeActivePageTo(targetRoute) {
    StoreUtils.dispatch(StoreUtils.actions.router.setActiveRoute, targetRoute);
  }
  static changeRouteUrlTo(targetUrl) {
    router.push(targetUrl);
  }
}
export default RouterUtils;
