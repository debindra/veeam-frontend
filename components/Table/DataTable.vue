<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :data-source="data"
    :pagination="{
      defaultPageSize: 5,
      total: total ? total : 0,
      pageSizeSync: pagination.pageSize,
      showSizeChanger: true,
      onShowSizeChange: showSizeChange,
      onChange: onChange
    }"
  >
  </a-table>
</template>

<script>
export default {
  props: {
    data: { type: Array },
    columns: { type: Array },
    total: { type: Number, default: 0 },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      pagination: {
        pageSize: 5,
        pageNo: 0,
        sortBy: "id"
      }
    };
  },
  methods: {
    showSizeChange(current, range) {
      this.pagination.pageNo = current - 1;
      this.pagination.pageSize = range;
      this.emitValue();
    },
    onChange(current, range) {
      this.pagination.pageNo = current - 1;
      this.pagination.pageSize = range;
      this.emitValue();
    },
    emitValue() {
      this.$emit("get-pagination", this.pagination);
    }
  },
  created() {
    this.emitValue();
  }
};
</script>

<style></style>
