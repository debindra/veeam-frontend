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
          <!-- <a-col>
            <a-button
              @click="redirect('/vaccine/create')"
              type="primary"
              :disabled="disableEventAdd"
              >ADD TEMPLATE</a-button
            >
          </a-col> -->
        </a-row>
      </div>

      <a-table
        v-if="showEvent"
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


         <a-tag :color="activeRow.status == true ? 'green' : 'red'">
            {{ activeRow.status == true ? "Active" : "Inactive" }}
          </a-tag>


      </a-table>
    </div>
    <a-modal
      v-model="batchForm"
      title="Add Batch"
      okText="Submit"
      @ok="onSubmit"
    >
      <a-form-model
        :model="form"
        ref="batchForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="right"
        :rules="rules"
      >
        <a-form-model-item label="Batch" prop="batch_name">
          <a-input name="batch_name" v-model="form.batch_name" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal v-model="showVaccineDetail" title="Detail" :footer="null">
      <a-descriptions
        :title="activeRow.product_name"
        bordered
        :column="1"
        size="small"
      >
        <a-descriptions-item label="Vaccine Name">
          {{ activeRow.product_name }}
        </a-descriptions-item>
        <a-descriptions-item label="Manufacturer">
          {{ activeRow.manufacturer }}
        </a-descriptions-item>
        <a-descriptions-item label="Batch">
          {{ activeRow.batch }}
        </a-descriptions-item>
        <a-descriptions-item label="Status">
          <a-tag :color="activeRow.status == true ? 'green' : 'red'">
            {{ activeRow.status == true ? "Active" : "Inactive" }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="Age Eligible">
          {{ activeRow.age_eligible }}
        </a-descriptions-item>
        <a-descriptions-item label="Shots Needed">
          {{ activeRow.shots_needed }}
        </a-descriptions-item>
        <a-descriptions-item label="Shots Gap Days">
          {{ activeRow.shots_gap_days }}
        </a-descriptions-item>
        <a-descriptions-item label="Fully Vaccinated Days">
          {{ activeRow.fully_vaccinated_days }}
        </a-descriptions-item>
        <a-descriptions-item label="Booster Shot">
          <a-icon
            theme="filled"
            :style="{
              fontSize: '16px',
              color: activeRow.is_booster_shot ? 'green' : 'red'
            }"
            :type="activeRow.is_booster_shot ? 'check-circle' : 'close-circle'"
          />
        </a-descriptions-item>
        <a-descriptions-item label="Batches">
          <ol>
            <li v-for="(batch, index) in activeBatches" :key="index">
              {{ batch.batch_name }} (ID- {{ batch.id }})
            </li>
          </ol>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
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
      activeRow: {},
      showEventModal: false,
      editLoad: false,
      form: {},
      rules: {
        batch_name: [{ required: true, message: "Please Enter Event name" }]
      },
      batchForm: false,
      showVaccineDetail: false,
      activeBatches: []
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
    async changeStatus(record) {

      let data = {
        eventTitle: record.eventTitle,
        eventDescription: record.eventDescription,
        startAt: record.startAt,
        endAt: record.endAt,
        published: record.published
      };
      await this.$event.update(data, record.id);
      //   this.fetchTableData({
      //     pageNo: this.pagination.current
      //   });

      this.fetchTableData();
    },
    showDetail(record) {
      this.activeRow = record;
      this.getBatch(record.id);
      this.showVaccineDetail = true;
    },
    async deleteVaccine(id) {
      await this.$vaccine.delete(id);
      this.fetchTableData({
        pageNo: this.pagination.current
      });
    },
    handleCancel(e) {
      this.showEventModal = false;
    },
    convertDate(date) {
      // alert("vdyveuydiueud");
      return this.$moment(date).format("LL");
    },
    onSubmit() {
      this.$refs.batchForm.validate(valid => {
        if (valid) {
          this.$vaccine.addBatch(this.form).then(response => {
            if (response.success) {
              this.batchForm = false;
              this.form = {};
              this.$message.success("Batch Added Successfully");
              this.fetchTableData();
            } else {
              this.$message.success("Some error occured");
            }
          });
        }
      });
    },
    async sendForm() {
      try {
        let response = await this.$event
          .update(this.activeRow, this.activeRow.id)
          .then(response => {
            this.activeRow.eventTitle = "";
            this.activeRow.eventDescription = "";
            this.activeRow.startAt = "";
            this.activeRow.endAt = "";
            this.fetchTableData();
            this.showEventModal = false;
          });
      } catch (err) {
        this.$message.error("Log in Failed !");
      }
    },
    showSizeChange(current, range) {
      // console.log({ current, range });
      this.pagination.current = current;
      this.pagination.size = range;
    },
    onChange(current, range) {
      console.log({ current, range });
      this.pagination.current = current;
      this.pagination.size = range;
      this.fetchTableData({ pageNo: current });
    },
    editEvent(id) {
      this.$router.push(`/vaccine/${id}`);
    },
    showBatchForm(data) {
      this.batchForm = true;
      this.form.vaccine_id = data.id;
    },
    async getBatch(id) {
      let data = await this.$vaccine.getBatch(id);
      this.activeBatches = data.data.batches;
    }
  },
  async created() {
    await this.fetchTableData();
  },
  computed: {
    showEvent() {
      return true; 
    },
    disableEventAdd() {
      return false;
    },
    disableEventUpdate() {
      return false; 
    },
    disableEventDelete() {
      return false; 
    },
    showPermissionAlert() {
      if (
        this.disableEventAdd ||
        this.disableEventUpdate ||
        this.disableEventDelete
      ) {
        return true;
      }
      return false;
    }
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
