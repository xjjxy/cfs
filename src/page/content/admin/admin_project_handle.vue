<template>
  <div>
    <div class="info">
      <h1>审核募捐项目</h1>
    </div>
    <div>
      <List v-for="(p,index) in list" :key="p.id" :header="'编号：'+p.id+'-'+p.foundation_name" border size="large">
        <div class="info">
          <ListItem>
            <span>
              <h4>项目名:</h4>
            </span>
            ({{p.name}}){{space}}
            <a
              :href="'http://127.0.0.1:2333/ipfs/'+p.description"
              target="_blank"
            >
              <h4>描述</h4>
            </a>
            {{space}}
            <a :href="'http://127.0.0.1:2333/ipfs/'+p.img" target="_blank">
              <h4>展示图片</h4>
            </a>
            {{space}}
            <span>
              <h4>目标金额:</h4>
            </span>
            ({{p.target_amount}}元){{space}}
            <span>
              <h4>项目时间:</h4>
            </span>
            ({{p.begin_time}})到
            ({{p.end_time}})
            {{space}}
            <span>
              <h4>等级:</h4>
            </span>
            <Select v-model="p.level" size="small" style="width:200px">
              <Option
                v-for="item in levelList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            {{space}}
            <span>
              <h4>是否通过:</h4>
            </span>
            <Select v-model="p.audit_status" size="small" style="width:200px">
              <Option
                v-for="item in statusList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Button type="primary" @click="pass(p.id,index)">确认审核</Button>
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pass(id, index) {
      console.log("id:" + id);
      console.log("index:" + index);
      var p = this.list[index];
      console.log(this.list[index]);
      var params = new URLSearchParams();
      params.append("id", p.id);
      params.append("level", p.level);
      params.append("audit_status", p.audit_status);
      this.$api.post("cfs/admin/handleProject", params, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.getNHProject();
            this.$Message.success("Update success");
          } else {
            this.$Message.error("Update Fail");
          }
        }
      });
    },
    getNHProject() {
      this.$api.get("cfs/admin/getNHProject", {}, response => {
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
      space: "-",
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
    this.getNHProject();
  }
};
</script>