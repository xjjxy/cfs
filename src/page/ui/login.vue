<template>
  <div>
    <div class="info">
      <h1>系统登录</h1>
    </div>
    <div class="info">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input
            type="text"
            v-model="formInline.username"
            placeholder="Username"
            style="width: 300px"
          />
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            type="password"
            password
            v-model="formInline.password"
            placeholder="Password"
            style="width: 300px"
          />
        </FormItem>

        <FormItem label="用户角色" prop="role">
          <RadioGroup v-model="formInline.role">
            <Radio label="0">捐助人</Radio>
            <Radio label="1">基金会</Radio>
            <Radio label="2">管理员</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Login</Button>
          <Button @click="handleReset('formInline')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: "",
        role: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ],
        role: [
          { required: true, message: "Please choose a type", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //验证
          this.login();
        } else {
          this.$Message.error("Check Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    login: function() {
      this.$api.get(
        "cfs/sys/login",
        {
          username: this.formInline.username,
          password: this.formInline.password,
          role: this.formInline.role
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var user = response.data.user;
            console.log(response.data); //请求成功，response为成功信息参数
            if (response.data.type == "1") {
              console.log(user);
              console.log(user.username);
              console.log(user.role);
              this.$Message.success("Login Success!");
              this.$addStorageEvent(
                1,
                "username",
                JSON.stringify(user.username)
              );
              this.$addStorageEvent(1, "role", JSON.stringify(user.role));
              this.$addStorageEvent(1, "uuid", JSON.stringify(user.uuid));
              this.$addStorageEvent(1, "id", JSON.stringify(user.id));
              this.$addStorageEvent(1, "name", JSON.stringify(user.name));
              this.$addStorageEvent(
                1,
                "username",
                JSON.stringify(user.username)
              );
              this.$addStorageEvent(
                1,
                "foundation_id",
                JSON.stringify(user.foundation_id)
              );
              this.$addStorageEvent(1, "tel", JSON.stringify(user.tel));
              console.log(sessionStorage.getItem("uuid"));
              if (user.role == "0") {
                this.$router.push("/user_home");
              } else if (user.role == "1") {
                this.$router.push("/foundation_home");
              } else {
                this.$router.push("/admin_home");
              }
            } else {
              this.$Message.error("Login Fail!");
              console.log("fail");
            }
          } else {
            this.$Message.error("Login Fail!");
            console.log("fail");
            console.log(response.message); //请求失败，response为失败信息
          }
        }
      );
    }
  }
};
</script>