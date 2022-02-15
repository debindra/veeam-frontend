<template>
  <div class="user-list">
    <!-- <div class="page-title">PAGE TITLE</div> -->
    <div class="card">
      <div class="card-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div class="card-title">
              <span>Alarm Tempalate</span>
            </div>
          </a-col>

        </a-row>
      </div>

      <a-table
        :columns="event_columns"
        :data-source="events"
        rowKey="id"
        :loading="loading"
        :pagination="{
          defaultPageSize: 10,
          pageSizeSync: pagination.pageSize,
          onChange: onChange,
          total: pagination.total,
          current: pagination.current
        }"
      >

         <span slot="knowledge" slot-scope="text, record">
         {{record.knowledge.summary}}
        
        </span>

        <span slot="isPredifined" slot-scope="text, record">
         <a-tag :color="record.isPredifined == true ? 'green' : 'red'">
            {{ record.isPredifined == true ? "Active" : "Inactive" }}
          </a-tag>
        </span>

        <span slot="isEnabled" slot-scope="text, record">
         <a-tag :color="record.isEnabled == true ? 'green' : 'red'">
            {{ record.isEnabled == true ? "Active" : "Inactive" }}
          </a-tag>
        </span>


         <!-- <a-tag :color="activeRow.status == true ? 'green' : 'red'">
            {{ activeRow.status == true ? "Active" : "Inactive" }}
          </a-tag> -->


      </a-table>
    </div>
  
  </div>

</template>
<script>
import moment from "moment";

const event_columns = [

  {
    dataIndex: "name",
    key: "name",
    title: "Name",
    scopedSlots: { customRender: "name" },
    width: "300px"
  },

  {
    dataIndex: "category",
    key: "category",
    title: "Category",
    scopedSlots: { customRender: "category" }
  },
 
  {
    dataIndex: "knowledge",
    key: "knowledge",
    title: "Knowledge",
    scopedSlots: { customRender: "knowledge" }
  },
  {
    dataIndex: "isPredifined",
    key: "isPredifined",
    title: "Predefined",
    scopedSlots: { customRender: "isPredifined" }
  },
  {
    dataIndex: "isEnabled",
    key: "isEnabled",
    title: "Enabled",
    scopedSlots: { customRender: "isEnabled" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  name: "index",
  layout: "admin",
  components: {
  },
  data() {
    return {
      loading: true,
      moment,
      pagination: {
        size: 10,
        current: 1,
        pageSize: 10,
        total: 0
      },
      pageNo: 1,
      sortBy: "id",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      events: [],
      event_columns,
  
    };
  },
  methods: {
    redirect(route) {
      this.$router.push(route);
    },
    async fetchTableData(params) {

      this.loading = true;
      let res = await this.$alarm.getAlarmTemplate(params);

      if (res.data.length>0) {
        this.events = res.data;
        this.loading = false;
      }
    },


   cancel(){

    },

    handleCancel(e) {
      this.showEventModal = false;
    },
 
 
    showSizeChange(current, range) {
      this.pagination.current = current;
      this.pagination.size = range;
    },
    onChange(current, range) {
      this.pagination.current = current;
      this.pagination.size = range;
      this.fetchTableData({ pageNo: current });
    },

  },
  async created() {
    await this.fetchTableData();
  },
  computed: {
   
  },
  head() {
    return {
      title: "Alarm Templates"
    };
  }
};
</script>

<style lang="scss" scoped>
.status {
  height: 5px;
  width: 5px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 3px;
}
.active {
  background-color: #45d445;
}
.inactive {
  background-color: #b5b5b5;
}
</style>

<style lang="scss">
.user-list {
  .ant-table-tbody > tr > td {
    font-size: 14px;
  }
}
</style>
