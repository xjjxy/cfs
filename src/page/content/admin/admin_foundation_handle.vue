<template>
  <div>
    <div class="info">
      <h1>审核基金会</h1>
    </div>
    <div>
      <List v-for="(f,index) in list" :key="f.id" :header="'编号：'+f.id" border size="large">
        <div class="info">
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
            ({{f.certification == 0 ? "申请":"修改"}}){{space}}
            <span>
              <h3>等级:</h3>
            </span>
            <!-- <span v-if="f.level == '0'"> -->
            <Select v-model="f.level" size="small" style="width:200px">
              <Option
                v-for="item in levelList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <!-- </span> -->
            <!-- <span v-if="f.level != '0'">{{f.level}}</span> -->
            {{space}}
            <span>
              <h3>是否通过:</h3>
            </span>
            <Select v-model="f.audit_status" size="small" style="width:200px">
              <Option
                v-for="item in statusList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            {{space}}
            <Button type="primary" @click="pass(f.id,index)">确认审核</Button>
          </ListItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pass(id,index) {
      console.log("id:" + id);
      console.log("index:"+index);
          var f = this.list[index];
          console.log(this.list[index]);
          var params = new URLSearchParams();
          params.append("id", f.id);
          params.append("level", f.level);
          params.append("audit_status", f.audit_status);
          this.$api.post("cfs/admin/handleFoundation", params, response => {
            if (response.status >= 200 && response.status < 300) {
              var data = response.data;
              if (data.type == "1") {
                this.getNHFounation();
                this.$Message.success("Update success");
              } else {
                this.$Message.error("Update Fail");
              }
            }
          });
    },
    getNHFounation() {
      this.$api.get("cfs/admin/getNHFoundation", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("Get Success");
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
    this.getNHFounation()
  }
};
</script>