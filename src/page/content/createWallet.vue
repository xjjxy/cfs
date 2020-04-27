<template>
  <div style="display:flex;justify-content: center;">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      enctype="multipart/form-data"
    >
      <h1>钱包绑定</h1>
      <FormItem label="钱包地址" prop="wallet_address">
        <Input
          v-model="formValidate.wallet_address"
          placeholder="Enter your wallet_address"
          style="width: 400px"
        />
      </FormItem>
      <FormItem label="钱包私钥" prop="privateKey">
        <Input
          v-model="formValidate.privateKey"
          placeholder="Enter your privateKey"
          style="width: 500px"
        />
      </FormItem>
      <FormItem label="钱包密码" prop="password">
        <Input
          v-model="formValidate.password"
          type="password"
          password
          placeholder="Enter your password"
          style="width: 200px"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Bind</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        wallet_address: "",
        privateKey: "",
        walletPassword: ""
      },
      ruleValidate: {
        wallet_address: [
          {
            required: true,
            message: "The wallet_address cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            min: 42,
            max: 42,
            message: "The wallet_address length must be 6 bits",
            trigger: "blur"
          }
        ],
        privateKey: [
          {
            required: true,
            message: "The privateKey cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            min: 64,
            max: 64,
            message: "The privateKey length must be 64 bits",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
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
          // console.log(this.formValidate.userType);
          this.createWallet();
        } else {
          this.$Message.error("Bind Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    createWallet() {
      console.log("createWallet");
      this.$api.get(
        "cfs/sys/createWallet",
        {
          wallet_address: this.formValidate.wallet_address,
          privateKey: this.formValidate.privateKey,
          password: this.formValidate.password,
          id: JSON.parse(sessionStorage.getItem("id")),
          role: JSON.parse(sessionStorage.getItem("role"))
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log("response success");
            var data = response.data;
            console.log("data:" + data);
            if (data.type == 1) {
              var wallet = data.wallet;
              console.log("wallet:" + wallet);
              this.$addStorageEvent(
                1,
                "wallet_address",
                JSON.stringify(wallet.wallet_address)
              );
              this.$addStorageEvent(
                1,
                "balance",
                JSON.stringify(wallet.balance)
              );
              this.$addStorageEvent(1, "hash", JSON.stringify(wallet.hash));
              this.$addStorageEvent(1, "uuid", JSON.stringify(wallet.uuid));
              this.$Message.success("Bind Success!");
              this.$router.replace("walletInfo")
            }else{
              this.$Message.error("Register Fail!");
            }
          } else {
            console.log("response fail");
            this.$Message.error("Register Fail!");
          }
        }
      );
    }
  }
};
</script>