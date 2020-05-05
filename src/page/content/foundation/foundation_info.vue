<template>
  <div>
    <div v-if="isProve">
      <div class="info">
        <h1>基金会信息</h1>
      </div>

      <List size="large">
        <div class="info">
          <ListItem>
            <strong>基金会名:</strong>
            {{name}}
          </ListItem>
        </div>
        <div class="info">
          <ListItem>
            <strong>认证图片hash：</strong>
            <a :href="'http://127.0.0.1:2333/ipfs/'+license" target="_blank">{{license}}</a>
          </ListItem>
        </div>
        <div class="info">
          <ListItem>
            <strong>等级:</strong>
            {{level}}
          </ListItem>
        </div>
        <div class="info">
          <ListItem>
            <strong>修改时间:</strong>
            {{modify_date}}
          </ListItem>
        </div>
        <div class="info">
          <ListItem>
            <strong>申请类型:</strong>
            {{certification}}
          </ListItem>
        </div>
        <div class="info">
          <ListItem>
            <strong>申请状态:</strong>
            {{audit_status}}
          </ListItem>
        </div>
      </List>
    </div>
    <div v-if="notProve">
      <div class="info">
        <h1>您还未提交认证申请!!</h1>
      </div>
      <div class="info">
        <Button type="primary" to="/foundation/foundation_prove">点击去认证</Button>
      </div>
    </div><br/><br/>
    <div class="info">有疑问可联系运营工作人员。联系电话：8888888</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      foundation_id: JSON.parse(sessionStorage.getItem("foundation_id")),
      name: "",
      license: "",
      level: "",
      modify_date: "",
      certification: "",
      audit_status: ""
    };
  },
  computed: {
    isProve: function() {
      if (this.foundation_id == "" || this.foundation_id == undefined) {
        return false;
      } else {
        return true;
      }
    },
    notProve: function() {
      if (this.foundation_id == "" || this.foundation_id == undefined) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    //监听sessionStorage事件
    window.addEventListener("setItem", e => {
      console.log(e);
      this.foundation_id = JSON.parse(sessionStorage.getItem("foundation_id"));
    });
    window.addEventListener("clearItem", e => {
      console.log(e);
      // this.foundation_id = JSON.parse(sessionStorage.getItem("foundation_id"));
      this.$router.replace("../user_home");
    });
    this.$api.get(
      "cfs/foundation/getFoundation",
      {
        foundation_id: JSON.parse(sessionStorage.getItem("foundation_id"))
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == 1) {
            var foundation = data.foundation;
            this.$Message.success("Get Success");
            console.log(foundation.name);
            this.name = foundation.name;
            this.license = foundation.license;
            if (foundation.level == 0) {
              this.level = "暂定";
            } else {
              this.level = foundation.level;
            }
            if (foundation.certification == 0) {
              this.certification = "认证申请";
            } else {
              this.certification = "修改申请";
            }

            // this.modify_date = new Date(
            //   foundation.modify_date
            // ).toLocaleString();
            this.modify_date = this.toString(new Date(foundation.modify_date));
            if (foundation.audit_status == 0) {
              this.audit_status = "申请中";
            } else if (foundation.audit_status == 1) {
              this.audit_status = "认证通过";
            } else {
              this.audit_status = "认证未通过";
            }
          }
          console.log(foundation);
        } else {
          this.$Message.error("Get Fail!");
        }
      }
    );
  }
};


</script>

<style>


</style>