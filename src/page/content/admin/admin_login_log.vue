<template>
  <div class="info">
    <div style="width:80%">
      <Table stripe :columns="columns1" :data="login_logList"></Table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      login_logList: [],
      columns1: [
        {
          title: "用户名",
          key: "username",
          sortable: true
        },
        {
          title: "用户类型",
          key: "user_type",
          sortable: true
        },
        {
          title: "登录时间",
          key: "login_date"
        }
      ]
    };
  },
  methods: {
    getLoginLog() {
      this.$api.get("cfs/admin/getLoginLog", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            var list = data.list;
            for (var index in list) {
              console.log("username:" + list[index].username);
            }
            this.login_logList = data.list;
          } else {
            console.log("获取失败");
          }
        }
      });
    }
  },
  created() {
    this.getLoginLog();
  }
};
</script>