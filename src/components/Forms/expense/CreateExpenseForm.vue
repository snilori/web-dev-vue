<template>
  <div class="app-expense">
    <p class="form-expense-title">Expense Form</p>
    <FormulateForm @submit="submit">
      <FormulateInput
        name="cost"
        type="number"
        label="cost"
        validation="required"
        validation-name="cost"
        placeholder="The Cost"
      />
      <FormulateInput
        name="email"
        type="email"
        label="Email"
        validation="required|email"
        validation-name="Username or Email"
        placeholder="John Doe or johndoe.gmail.com"
      />
      <FormulateInput
        name="category"
        type="text"
        label="category"
        validation="required"
        validation-name="category"
        placeholder="The Category"
      />
      <FormulateInput
        name="description"
        type="text"
        label="description"
        validation="required"
        validation-name="description"
        placeholder="The Description"
      />
      <FormulateInput type="submit" label="CreateExpense" />
    </FormulateForm>
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "CreateExpenseForm",
  methods: {
    submit(data) {
      StoreUtils.commit("form/BUILD_FORM_BODY", data);

      StoreUtils.dispatch("expense/createExpense");
    }
  }
};
</script>

<style scoped></style>
