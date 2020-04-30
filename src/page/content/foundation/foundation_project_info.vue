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
              <h3>目标金额:</h3>
            </span>
            ({{p.target_amount}}元){{space}}
            <span v-if="p.audit_status != undefined">
              <span>
                <h3>目前金额:</h3>
              </span>
              ({{p.now_amount}}){{space}}
              <span>
                <h3>剩余金额:</h3>
              </span>
              ({{p.last_amount}}){{space}}
            </span>
            <span>
              <h3>开始时间:</h3>
            </span>
            ({{p.begin_time}}){{space}}
            <span>
              <h3>持续时间:</h3>
            </span>
            ({{p.duration}}天)
            {{space}}
            <span>
              <h3>等级:</h3>
            </span>
            {{p.level == "0" ? "暂定":p.level}}
            {{space}}
            <span>
              <h3>状态:</h3>
            </span>
            {{p.audit_status == undefined?"审核中":(p.audit_status == "1"?"审核通过":(p.audit_status == "2"?"审核不t通过":"结束"))}}
            {{space}}
            <span></span>
            <a :href="'http://127.0.0.1:2333/ipfs/'+p.description">
              <h3>描述(点击查看):</h3>
            </a>
            {{space}}
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getAllProject() {
      this.$api.get(
        "cfs/project/getAllProject",
        { foundation_id: JSON.parse(sessionStorage.getItem("foundation_id")) },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              this.$Message.success("Get Success");
              var list = data.list;

              for (var i in list) {
                console.log(list[i]);
                console.log(list[i].audit_status);
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
      space: "- - - -"
    };
  },
  created() {
    this.getAllProject();
  }
};
</script>