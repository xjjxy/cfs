<template>
  <div>
    <div style="display:flex;justify-content: center;">
      <h1>已审募捐项目</h1>
    </div>
    <div>
      <List v-for="(p) in list" :key="p.id" :header="'编号：'+p.id+'---发布自：'+p.foundation_name" border size="large">
        <div class="info">
          <ListItem>
            <span>
              <h3>项目名:</h3>
            </span>
            ({{p.name}}){{space}}
            <a
              :href="'http://127.0.0.1:2333/ipfs/'+p.description"
              target="_blank"
            >
              <h3>描述</h3>
            </a>
            {{space}}
            <a
              :href="'http://127.0.0.1:2333/ipfs/'+p.img"
              target="_blank"
            >
              <h3>展示图片</h3>
            </a>
            {{space}}
            <span>
              <h3>目标金额:</h3>
            </span>
            ({{p.target_amount}}Ether){{space}}
            <span v-if="p.audit_status != 0">
              <span>
                <h3>目前金额:</h3>
              </span>
              ({{p.now_amount}})
              <span>
                <h3>剩余金额:</h3>
              </span>
              ({{p.last_amount}})
            </span>
            <span>
              <h4>项目时间:</h4>
            </span>
            ({{p.begin_time}})到
            ({{p.end_time}})
            {{space}}
            <span>
              <h3>等级:</h3>
            </span>
            ({{p.level}})
            {{space}}
            <span>
              <h3>是否通过:</h3>
            </span>
            ({{p.audit_status == "1" ? "通过":"未通过"}}){{space}}
            <Button type="primary" @click="reHandle(p.id)">重新审核</Button>
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reHandle(id) {
      console.log(id);
      var params = new URLSearchParams();
      params.append("id", id);
      params.append("audit_status", 0);
      this.$api.post("cfs/admin/handleProject", params, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("Update success");
            this.getIsHProject();
          } else {
            this.$Message.error("Update Fail");
          }
        }
      });
    },
    getIsHProject() {
      this.$api.get("cfs/admin/getIsHProject", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("Get Success");
            var list = data.list;

            for (var i in list) {
                list[i].begin_time = this.toString(new Date(list[i].begin_time));
                list[i].end_time = this.toString(new Date(list[i].end_time));
              }
            this.list = list;
          }
        } else {
          this.$Message.error("Get Fail!!");
        }
      });
    }
  },
  data() {
    return {
      list: null,
      index: 0,
      space: "- - - -",
      statusList: [
        {
          value: "1",
          label: "通过"
        },
        {
          value: "2",
          label: "不通过"
        }
      ],
      levelList: [
        {
          value: "1",
          label: "Lv1"
        },
        {
          value: "2",
          label: "Lv2"
        },
        {
          value: "3",
          label: "Lv3"
        },
        {
          value: "4",
          label: "Lv4"
        },
        {
          value: "5",
          label: "Lv5"
        }
      ]
    };
  },
  created() {
    this.getIsHProject();
  }
};
</script>