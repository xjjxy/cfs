<template>
  <div class="info">
    <div style="width:80%">
      <Table stripe :columns="columns1" :data="audit_logList"></Table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      audit_logList: [],
      columns1: [
        {
          title: "审核类型",
          key: "audit_type",
          sortable: true
        },
        {
          title: "审核人员",
          key: "audit_operator",
          sortable: true
        },
        {
          title: "审核结果",
          key: "audit_result",
          sortable: true
        },
        {
          title: "审核时间",
          key: "audit_time"
        }
      ]
    };
  },
  methods: {
    getAuditLog() {
      this.$api.get("cfs/admin/getAuditLog", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            var list = data.list;
            for (var index in list) {
              list[index].audit_time = this.toString(
                new Date(list[index].audit_time)
              );
            }
            this.audit_logList = list;
          } else {
            console.log("获取失败");
          }
        }
      });
    }
  },
  created() {
    this.getAuditLog();
  }
};
</script>