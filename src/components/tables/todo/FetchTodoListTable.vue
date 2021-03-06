<template>
  <div class="app-table">
    <div class="table-top">
      <b-row>
        <b-col md="8" lg="8" class="my-1">
          <p class="table-filter text-left">
            <input
              type="text"
              :inputType="'text'"
              v-model="filter"
              placeholder="Search something..."
            />
          </p>
        </b-col>
        <b-col md="4" lg="4" class="my-1">
          <p class="actions text-right">
            <span>
              <a href="#" class="table-btn btn"></a>
            </span>
            <span>
              <a href="#" class="table-btn btn alt"></a>
            </span>
          </p>
        </b-col>
      </b-row>
    </div>

    <b-table
      striped
      hover
      :fields="fields"
      :items="items"
      :busy="isBusy"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <!-- A virtual column -->
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A virtual composite column -->
      <template v-slot:cell(name)="data">
        <p class="name-field">
          <span class="contact-card">{{
            `${data.item.category.toUpperCase()} ${data.item.cost}`
              | getInitials
          }}</span>
          <span class="contact-card">{{
            (data.item.category + " " + data.item.category) | getInitials
          }}</span>
          <span>{{ data.item.category }}</span> &nbsp;
          <span class="bold"> {{ data.item.cost }}</span>
        </p>
      </template>

      <!-- A virtual composite column -->
      <template v-slot:cell(action)="data">
        <p class="name-field">
          <b-dropdown
            class="card-drop"
            variant="white"
            right
            toggle-class="p-0"
          >
            <template v-slot:button-content>
              <i class="mdi mdi-dots-horizontal font-size-18" />
            </template>

            <b-dropdown-item @click="tableAction(data.item, 'confirm')">
              <i class="fas fa-check text-success mr-1" aria-hidden="true" />
              Confirm Expense
            </b-dropdown-item>

            <!--            <b-dropdown-item @click="tableAction(data.item, 'reject')">-->
            <!--              <i class="fas fa-ban text-success mr-1" aria-hidden="true" />-->
            <!--              Reject Company-->
            <!--            </b-dropdown-item>-->
          </b-dropdown>
        </p>
      </template>
    </b-table>

    <b-row>
      <b-col sm="5" md="4" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="8" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "FetchTodoListTable",
  data() {
    return {
      editModalOpen: false,
      currentEditDataItem: {},
      sortBy: "date",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
        { key: "index", label: "S/N", sortable: true, class: "text-center" },

        // A column that needs custom formatting
        { key: "date", label: "Date", sortable: true },
        { key: "category", label: "Category", sortable: true },
        { key: "url", label: "Url", sortable: true },
        { key: "subcategory", label: "Subcategory", sortable: true },
        { key: "task_description", label: "Task Description", sortable: true },
        { key: "notes", label: "Notes", sortable: true },
        { key: "action", label: "Actions", sortable: true }
      ]
    };
  },
  computed: {
    ...mapState({
      items: state => state.table.tableData,
      isBusy: state => state.loader.tableLoader
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.filter = " ";
  },
  methods: {
    tableAction(data, action) {
      switch (action) {
        case "confirm":
          // console.log("Approve Request");
          StoreUtils.dispatch("company/approveCompany", {
            businessId: data.business_id,
            email: data.user
          });
          break;

        case "reject":
          // console.log("Reject Request");
          break;

        default:
          return false;
      }
    },
    fetchTableData() {
      StoreUtils.dispatch("todo/fetchTodoList");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getInitials(name) {
      let parts = name.split(" ");
      let initials = "";
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== "") {
          initials += parts[i][0];
        }
      }
      if (initials.length === 2) {
        return initials;
      } else if (initials.length < 2) {
        initials = initials + initials;

        return initials;
      } else {
        return initials.substring(0, 2);
      }
    }
  },

  created() {
    this.fetchTableData();
  }
};
</script>

<style scoped>
/*.VueTables__date-filter {*/
/*  border: 1px solid #ccc;*/
/*  padding: 6px;*/
/*  border-radius: 4px;*/
/*  cursor: pointer;*/
/*}*/
.contact-card {
  height: 70px;
  width: 70px;
  background-color: burlywood;
  color: white;
  border-radius: 50%;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
}
</style>
