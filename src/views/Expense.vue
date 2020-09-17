<template>
    <div class="jumbotron">
        <CreateExpenseForm />
    </div>
</template>

<script>
    import CreateExpenseForm from "../components/Forms/expense/CreateExpenseForm";

    export default {
        name: "Expense",
        components: {CreateExpenseForm}
    }
</script>

<style scoped>

</style>