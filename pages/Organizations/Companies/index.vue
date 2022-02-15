<template>
  <div class="user-list">
    <!-- <div class="page-title">PAGE TITLE</div> -->
    <div class="card">
      <div class="card-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div class="card-title">
              <span>Company</span>
            </div>
          </a-col>

             <a-col>
               <a-button @click="() => showFormModal(true)" type="primary">ADD</a-button>
          </a-col>

        </a-row>
      </div>

      <a-table
        :columns="agent_columns"
        :data-source="actives"
        rowKey="instanceUid"
        :loading="loading"
        :pagination="{
          defaultPageSize: 10,
          pageSizeSync: pagination.pageSize,
          onChange: onChange,
          total: pagination.total,
          current: pagination.current
        }"
      >

    

        <span slot="permissions" slot-scope="text, record">
       
            <span v-for="permission in record.permissions" v-if="record.permissions.length>0">
            <a-tag v-text="permission"></a-tag>
            </span>
            <span v-else>
             -
            </span>

        </span>

        <span slot="isAlarmDetectEnabled" slot-scope="text, record">

                  <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" v-if="record.isAlarmDetectEnabled" />
                  <a-icon type="close-circle" theme="twoTone" two-tone-color="#eb2f96" v-else />


        </span>

        <span slot="action" slot-scope="text, record">
           
            <a href="javascript:;" @click="() => showUpdateFormModal(record)">update</a> 
            <a-divider type="vertical" />

            <a-popconfirm
              title="Are you sure delete this company?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteCompany(record.instanceUid)"
              @cancel="cancel"
            >
               <a href="javascript:;" type="danger" danger>delete</a>
            </a-popconfirm>

        </span>


      </a-table>
    </div>

    <a-modal
      title="Add/Update"
      :visible="visibleFormModal"
      okText="Submit"
      @ok="save"
       @cancel="() => showFormModal(false)"
    >
      <a-form-model
        :layout ="'vertical'"
        :model="form"
        ref="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="right"
      >
        <a-form-model-item label="Name" prop="name">
          <a-input name="name" v-model="form.organizationInput.name" />
        </a-form-model-item>

        <a-form-model-item label="Alias" prop="alias">
          <a-input name="alias" v-model="form.organizationInput.alias" />
        </a-form-model-item>

        <a-form-model-item label="Tax ID" prop="taxId">
          <a-input name="taxId" v-model="form.organizationInput.taxId" />
        </a-form-model-item>

         <a-form-model-item label="Email" prop="email">
          <a-input name="email" v-model="form.organizationInput.email" />
        </a-form-model-item>

        <a-form-model-item label="Phone" prop="phone">
          <a-input name="phone" v-model="form.organizationInput.phone" />
        </a-form-model-item>


        <a-form-model-item label="Website" prop="website">
          <a-input name="website" v-model="form.organizationInput.website" />
        </a-form-model-item>

      </a-form-model>
    </a-modal>

  </div>

</template>
<script>
import moment from "moment";

const agent_columns = [

  {
    dataIndex: "name",
    key: "name",
    title: "NAME",
    scopedSlots: { customRender: "name" }
  },

  {
    dataIndex: "status",
    key: "status",
    title: "STATUS",
    scopedSlots: { customRender: "status" }
  },
 
  {
    dataIndex: "permissions",
    key: "permissions",
    title: "PERMISSIONS",
    scopedSlots: { customRender: "permissions" }
  },
 
  {
    dataIndex: "isAlarmDetectEnabled",
    key: "isAlarmDetectEnabled",
    title: "ALARM",
    scopedSlots: { customRender: "isAlarmDetectEnabled" }
  },
  {
    title: "ACTIONS",
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
      actives: [],
      agent_columns,
   
      visibleFormModal: false,
      company: null,
      form: {
          "resellerUid": null,
          "organizationInput": {
            "name":  null,
            "alias": null,
            "taxId": null,
            "email": null,
            "phone": null,
            "country": 1,
            "state": 22,
            "city": "Marquette",
            "street": "4493 Railroad Street",
            "notes": null,
            "zipCode": 49855,
            "website": null,
            "companyId": 2
          },
          "subscriptionPlanUid": null,
          "permissions": [
            "REST"
          ],
          "IsAlarmDetectEnabled": false
        },

    };
  },
  methods: {

        save() {          
          this.$company.addCompany(this.form).then(response => {
            if (!response.errors) {
              this.visibleFormModal = false;
              this.resolveForm = {};
              this.$message.success("Company successfully added.");
              this.fetchTableData();
            } else {
              this.$message.error(response.errors[0].message);
            }
          });
    },

    showFormModal(value){
            this.visibleFormModal = true;
    
    },

    showUpdateFormModal(row){
      this.visibleFormModal = true;
    },


    async fetchTableData(params) {
      this.loading = true;
      let res = await this.$company.getCompany(params);
      if (res.data.length>0) {
        this.actives = res.data;
        this.loading = false;
      }
    },

    cancel(){

    },

    handleCancel(e) {
      this.showEventModal = false;
    },



    deleteCompany(companyUid){
      this.$alarm.deleteCompany(companyUid).then(response => {

        if(!response.errors){
          this.$message.success("Company successfully deleted.");
          this.fetchTableData();
        }else{
          this.$message.error('Something went wrong.');
        }
         
      });
    },


      
      updateAcknowledge() {          
          this.$alarm.activeAcknowledge(this.acknowledgeForm,this.acknowledgeForm.alarmUid).then(response => {
            if (!response.errors) {
              this.visibleAcknowledgeModal = false;
              this.acknowledgeForm = {};
              this.$message.success("Acknowledge successfully added.");
              this.fetchTableData();
            } else {
              this.$message.error(response.errors[0].message);
            }
          });
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
      title: "Alarm Active"
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
