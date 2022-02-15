<template>
  <div class="user-list">
    <!-- <div class="page-title">PAGE TITLE</div> -->
    <div class="card">
      <div class="card-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div class="card-title">
              <span>Backup Servers</span>
            </div>
          </a-col>

          <a-col>
            <a-button @click="redirect('/system/servers/proxies')" type="primary">Proxies</a-button>
            <a-button @click="redirect('/system/servers/repositories')" type="primary">Repositories</a-button>
          </a-col>

        </a-row>
      </div>

      <a-table
        :columns="server_columns"
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

        <span slot="status" slot-scope="text, record">
             <a-tag color="#87d068">
                {{record.status}}
            </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
            <!-- <a href="javascript:;" @click="() => showResolveModal(record.instanceUid)">resolve</a> 
            <a-divider type="vertical" />
            <a href="javascript:;" @click="() => showAcknowledgeModal(record.instanceUid)">acknowledge</a> 
            <a-divider type="vertical" /> -->

            <a-popconfirm
              title="Are you sure delete this Server?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deletePolicy(record.instanceUid)"
              @cancel="cancel"
            >
               <a href="javascript:;" type="danger" danger>delete</a>
            </a-popconfirm>

        </span>


      </a-table>
    </div>
    <a-modal
      title="Resolve"
      :visible="visibleResolveModal"
      okText="Submit"
      @ok="updateResolve"
       @cancel="() => showResolveModal(false)"
    >
      <a-form-model
        :layout ="'vertical'"
        :model="resolveForm"
        ref="resolveForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="right"
      >
        <a-form-model-item label="Comment" prop="comment">
          <a-textarea name="comment" v-model="resolveForm.comment" />
        </a-form-model-item>

      <a-form-item label="Resolved">
      <a-select
        v-model="resolveForm.resolveOnClients"
      >
        <a-select-option :value="true">
          Yes
        </a-select-option>
        <a-select-option :value="false">
          No 
        </a-select-option>
      </a-select>
    </a-form-item>

      </a-form-model>
    </a-modal>

  <!-- Acknowledge Modal -->
 <a-modal
      title="Acknowledge"
      :visible="visibleAcknowledgeModal"
      okText="Submit"
      @ok="updateAcknowledge"
       @cancel="() => showAcknowledgeModal(false)"
    >
      <a-form-model
        :layout ="'vertical'"
        :model="acknowledgeForm"
        ref="acknowledgeForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="right"
      >
        <a-form-model-item label="Comment" prop="comment">
          <a-textarea name="comment" v-model="acknowledgeForm.comment" />
        </a-form-model-item>

      <a-form-item label="Resolved">
      <a-select
        v-model="acknowledgeForm.resolveOnClients"
      >
        <a-select-option :value="true">
          Yes
        </a-select-option>
        <a-select-option :value="false">
          No 
        </a-select-option>
      </a-select>
    </a-form-item>

      </a-form-model>
    </a-modal>



  </div>

</template>
<script>
import moment from "moment";

const server_columns = [

  {
    dataIndex: "name",
    key: "name",
    title: "NAME",
    scopedSlots: { customRender: "name" }
  },

  {
    dataIndex: "version",
    key: "version",
    title: "VERSION",
    scopedSlots: { customRender: "version" }
  },

 
  {
    dataIndex: "displayVersion",
    key: "displayVersion",
    title: "DISPLAY VERSION",
    scopedSlots: { customRender: "displayVersion" }
  },
 
  {
    dataIndex: "backupServerRoleType",
    key: "backupServerRoleType",
    title: "ROLE TYPE",
    scopedSlots: { customRender: "backupServerRoleType" }
  }
  ,

  {
    dataIndex: "status",
    key: "status",
    title: "STATUS",
    scopedSlots: { customRender: "status" }
  }

  ,
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
      server_columns,
   
      visibleResolveModal: false,
      resolveForm: {alarmUid:null,comment:null, resolveOnClients: null},

      visibleAcknowledgeModal: false,
      acknowledgeForm: {alarmUid:null,comment:null, resolveOnClients: null},


    };
  },
  methods: {
     redirect(route) {
      this.$router.push(route);
    },
    showResolveModal(modal1Visible){
    
      if(typeof modal1Visible != "boolean"){
          this.resolveForm.alarmUid = modal1Visible;
            this.visibleResolveModal = true;
      }else {
          this.visibleResolveModal = false;
          this.resolveForm = null;
      }
    },
    showAcknowledgeModal(value){
    
      if(typeof value != "boolean"){
          this.acknowledgeForm.alarmUid = value;
            this.visibleAcknowledgeModal = true;
      }else {
          this.visibleAcknowledgeModal = false;
          this.acknowledgeForm = null;
      }
    },

    async fetchTableData(params) {
      this.loading = true;
      let res = await this.$server.getServer(params);
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

    deletePolicy(ararmUid){
      this.$alarm.deletePolicy(ararmUid).then(response => {

        if(!response.errors){
          this.$message.success("Policy successfully deleted.");
          this.fetchTableData();
        }else{
          this.$message.error('Something went wrong.');
        }
         
      });
    },

    updateResolve() {          
          this.$alarm.activeResolve(this.resolveForm,this.resolveForm.alarmUid).then(response => {
            if (!response.errors) {
              this.visibleResolveModal = false;
              this.resolveForm = {};
              this.$message.success("Resolve successfully added.");
              this.fetchTableData();
            } else {
              this.$message.error(response.errors[0].message);
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
