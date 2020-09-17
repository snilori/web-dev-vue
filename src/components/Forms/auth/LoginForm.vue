<template>
  <div class="app-form">
    <p class="form-title">Login Form</p>
    <FormulateForm  @submit="submit">
      <FormulateInput
        name="userID"
        type="text"
        label="userID"
        validation="required|email"
        validation-name="Username or Email"
        placeholder="Please enter your username or email"
      />
      <FormulateInput
        name="password"
        type="password"
        label="password"
        validation="required"
        validation-name="Password is required"
        placeholder="Password"
      />
      <FormulateInput type="submit" label="Login" />
    </FormulateForm>
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "LoginForm",
  methods: {
    submit(data) {
      StoreUtils.commit("form/BUILD_FORM_BODY", data);

      StoreUtils.dispatch("auth/login");
    }
  }
};
</script>

<style scoped></style>
