<template>
  <div>
    <p>A beautiful dashboard page</p>
    <FetchTodoListTable />
  </div>
</template>

<script>
import FetchTodoListTable from "../components/tables/todo/FetchTodoListTable";
export default {
  name: "Dashboard",
  components: {FetchTodoListTable,}
};
</script>

<style scoped></style>
