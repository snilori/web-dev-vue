<template>
  <div class="jumbotron">
    <RegistrationInitForm v-if="formStage === 0" />
    <RegistrationCompleteForm v-if="formStage === 1" />
  </div>
</template>

<script>
import RegistrationInitForm from "../../components/Forms/auth/RegistrationInitForm";
import RegistrationCompleteForm from "../../components/Forms/auth/RegistrationCompleteForm";
import StoreUtils from "../../utils/BaseUtils/StoreUtils";

export default {
  name: "Registration",
  components:{RegistrationInitForm, RegistrationCompleteForm},
  computed: {
    formStage() {
      return StoreUtils.rootGetters("form/getFormStage");
    }
  }
};
</script>

<style scoped></style>
