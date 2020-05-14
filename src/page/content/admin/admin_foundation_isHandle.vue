<template>
  <div>
    <div style="display:flex;justify-content: center;">
      <h1>已审核基金会</h1>
    </div>
    <div>
      <List v-for="f in list" :key="f.id" :header="'编号：'+f.id" border size="large">
        <div style="display:flex;justify-content: center;">
          <ListItem>
            <span>
              <h3>基金会名:</h3>
            </span>
            ({{f.name}}){{space}}
            <a
              :href="'http://127.0.0.1:2333/ipfs/'+f.license"
              target="_blank"
            >
              <h3>证书图片[点击查看]</h3>
            </a>
            {{space}}
            <span>
              <h3>修改日期:</h3>
            </span>
            ({{f.modify_date}}){{space}}
            <span>
              <h3>申请类型:</h3>
            </span>
            ({{f.certification == "0" ? "申请":"修改"}}){{space}}
            <span>
              <h3>等级:</h3>
            </span>
            <!-- <span v-if="f.level == '0'"> -->
            ({{f.level}})
            <!-- </span> -->
            <!-- <span v-if="f.level != '0'">{{f.level}}</span> -->
            {{space}}
            <span>
              <h3>是否通过:</h3>
            </span>
            ({{f.audit_status == "1" ? "通过":"未通过"}}){{space}}
            <Button type="primary" @click="reHandle(f.id,f.level)">重新审核</Button>
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reHandle(id, level) {
      console.log(id);
      var params = new URLSearchParams();
      params.append("id", id);
      params.append("level", level);
      params.append("audit_status", 0);
      params.append("username",JSON.parse(sessionStorage.getItem("username")));
      this.$api.post("cfs/admin/handleFoundation", params, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("Update success");
            this.getIsHFoundation();
          } else {
            this.$Message.error("Update Fail");
          }
        }
      });
    },
    getIsHFoundation() {
      this.$api.get("cfs/admin/getIsHFoundation", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            // this.$Message.success("Get Success");
            var list = data.list;

            for (var i in list) {
              list[i].modify_date = this.toString(
                new Date(list[i].modify_date)
              );
              console.log(list[i]);
            }
            this.list = list;
          }
        } else {
          // this.$Message.error("Get Fail!!");
        }
      });
    }
  },
  data() {
    return {
      list: null,
      index: 0,
      space: "- - - -",
      
    };
  },
  created() {
    this.getIsHFoundation();
  }
};
</script>