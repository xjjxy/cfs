<template>
  <div>
    <div class="info">
      <h1>我的项目</h1>
    </div>
    <div>
      <List v-for="p in list" :key="p.id" :header="'编号：'+p.id" border size="large">
        <div class="info">
          <ListItem>
            <span>
              <h3>项目名:</h3>
            </span>
            ({{p.name}}){{space}}
            <span>
              <span>
                <h3>目标金额:</h3>
              </span>
              ({{p.target_amount}}Ether)
              <span v-if="p.audit_status != 0">
                <span>
                  <h3>目前金额:</h3>
                </span>
                ({{p.now_amount}}Ether)
                <span>
                  <h3>剩余金额:</h3>
                </span>
                ({{p.last_amount}}Ether)
              </span>
            </span>
            <span>
              <h4>项目时间:</h4>
            </span>
            ({{p.begin_time}}到
            {{p.end_time}})
            {{space}}
            <span>
              <h3>等级:</h3>
            </span>
            {{p.level == "0" ? "暂定":p.level}}
            {{space}}
            <span>
              <h3>状态:</h3>
            </span>
            {{p.audit_status == 0?"审核中":(p.audit_status == "1"?"审核通过":(p.audit_status == "2"?"审核不t通过":"结束"))}}
            {{space}}
            <a
              :href="'http://127.0.0.1:2333/ipfs/'+p.description"
              target="_blank"
            >
              <h3>描述(点击查看)</h3>
            </a>
            {{space}}
            <a :href="'http://127.0.0.1:2333/ipfs/'+p.img" target="_blank">
              <h3>展示图片(点击查看)</h3>
            </a>
            <template slot="action">
              <li>
                <p @click="addPhase(p.id,p.last_amount,p.name)">添加阶段信息</p>
              </li>
              <li>
                <p @click="adminComment(p.id)">管理评论</p>
              </li>
            </template>
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addPhase(id, last_amount, name) {
      console.log("project_id:" + id);
      this.$addStorageEvent(
        1,
        "projectLast_amount" + id,
        JSON.stringify(last_amount)
      );
      this.$addStorageEvent(1, "projectName" + id, JSON.stringify(name));
      let routeUrl = this.$router.resolve({
        name: "foundation_addPhase",
        params: { project_id: id }
      });
      window.open(routeUrl.href, "_blank");
      //query方式类似get请求 参数拼接在url后
      // let routeUrl = this.$router.resolve({
      //   path: "/foundation/foundation_addPhase",
      //   query: { project_id: id }
      // });
      // window.open(routeUrl.href, "_blank");
    },

    adminComment(id) {
      let routeUrl = this.$router.resolve({
        name: "adminComment",
        params: { project_id: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    getAllProject() {
      this.$api.get(
        "cfs/foundation/getAllMyProject",
        { foundation_id: JSON.parse(sessionStorage.getItem("foundation_id")) },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              this.$Message.success("Get Success");
              var list = data.list;
              for (var i in list) {
                list[i].begin_time = this.toString(
                  new Date(list[i].begin_time)
                );
                list[i].end_time = this.toString(new Date(list[i].end_time));
              }
              this.list = list;
            }
          } else {
            this.$Message.error("Get Fail!!");
          }
        }
      );
    }
  },
  data() {
    return {
      list: null,
      space: "- -"
    };
  },
  created() {
    this.getAllProject();
  }
};
</script>