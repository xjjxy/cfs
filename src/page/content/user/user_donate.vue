<template>
  <div>
    <div>
      <br />
      <br />
      <br />
      <div class="info">
        <b>区块链 | 慈善募捐系统 感谢您的爱心捐赠！</b>
      </div>
      <br />
      <div class="info">项目启动后，发起人会在慈善募捐平台发布项目进展，多来平台上看看哦！</div>
    </div>
    <div class="info">
      <Card dis-hover bordered="false" style="width:500px">
        <div style="text-align:center">
          <img :src="'http://127.0.0.1:2333/ipfs/'+project.img" style="width: 280px;height:150px" />
          <!-- <p>发布机构:{{project.foundation_name}}</p> -->
          <p>已筹善款:{{project.now_amount}} Ether</p>
          <p>受捐次数:{{project.donate_count}}</p>
          <p>项目时间:{{project.begin_time}}至{{project.end_time}}</p>
        </div>
      </Card>
      <Card dis-hover bordered="false">
        <p>收款方:{{project.foundation_name}}</p>
        <br />
        <div class="info">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
            <FormItem label="捐赠金额" prop="donate_amount">
              <Input
                type="number"
                v-model="formInline.donate_amount"
                placeholder="donate_amount"
                style="width: 150px"
              />Ether
            </FormItem>
            <FormItem>
              <!-- <Radio v-model="anonymous">匿名捐赠</Radio> -->
              <Checkbox v-model="anonymous">匿名捐赠</Checkbox>
            </FormItem>
            <FormItem label="钱包密码" prop="wallet_password">
              <Input
                type="password"
                password
                v-model="formInline.wallet_password"
                placeholder="wallet_password"
                style="width: 130px"
              />
            </FormItem>
            <br />
            <FormItem>
              <Button type="error" @click="handleSubmit('formInline')">确定</Button>
              <Button @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anonymous: false,
      project: JSON.parse(sessionStorage.getItem("project")),
      formInline: {
        donate_amount: "",
        wallet_password: ""
      },
      ruleInline: {
        donate_amount: [
          {
            required: true,
            message: "Please fill in the donate_amount",
            trigger: "blur"
          }
        ],
        wallet_password: [
          {
            required: true,
            message: "Please fill in the wallet_password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The walletPassword length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //捐赠
          this.donate();
        } else {
          this.$Message.error("Check Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    donate() {
      if (null == JSON.parse(sessionStorage.getItem("id"))) {
        this.$Message.error("请先登录");
      } else if (null == JSON.parse(sessionStorage.getItem("uuid"))) {
        this.$Message.error("请先绑定钱包");
      } else {
        var params = new URLSearchParams();
        params.append("donor_id", JSON.parse(sessionStorage.getItem("id")));
        params.append(
          "donor_name",
          JSON.parse(sessionStorage.getItem("username"))
        );
        params.append(
          "project_id",
          JSON.parse(sessionStorage.getItem("project")).id
        );
        params.append(
          "project_name",
          JSON.parse(sessionStorage.getItem("project")).name
        );
        params.append(
          "foundation_id",
          JSON.parse(sessionStorage.getItem("project")).foundation_id
        );
        params.append(
          "foundation_name",
          JSON.parse(sessionStorage.getItem("project")).foundation_name
        );
        params.append("donate_amount", this.formInline.donate_amount);
        params.append("wallet_password", this.formInline.wallet_password);
        params.append("uuid", JSON.parse(sessionStorage.getItem("uuid")));
        params.append("anonymous", this.anonymous);
        console.log("params:" + params);
        this.$api.post("cfs/donor/donate", params, response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == 1) {
              // console.log("success");
              this.$Message.success("捐赠成功");
              this.$router.push({name:"user_projectDetail",params:{project_id:JSON.parse(sessionStorage.getItem("project")).id}});
            } else if (data.type == 2) {
              // console.log("余额不足");
              this.$Message.error("余额不足");
            } else if (data.type == 3) {
              // console.log("密码错误");
              this.$Message.error("密码错误");
            } else {
              // console.log("未知错误");
              this.$Message.error("未知错误");
            }
          }
        });
      }
    }
  }
};
</script>