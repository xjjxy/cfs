<template>
  <div style="display:flex;justify-content: center;">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      enctype="multipart/form-data"
    >
    <h1>基金会注册</h1>
      <FormItem label="用户名" prop="username">
        <Input
          v-model="formValidate.username"
          placeholder="Enter your username"
          style="width: 300px"
        />
      </FormItem>
      
      <FormItem label="密码" prop="password">
        <Input
          type="password"
          v-model="formValidate.password"
          password
          placeholder="Enter your password"
          style="width: 300px"
        />
      </FormItem>
      <FormItem label="确认密码" prop="repassword">
        <Input
          type="password"
          v-model="formValidate.repassword"
          password
          placeholder="Enter your repassword"
          style="width: 300px"
        />
      </FormItem>
      <FormItem label="tel" prop="tel">
        <Input
          type="tel"
          v-model="formValidate.tel"
          minlength="5"
          placeholder="Enter your tel"
          style="width: 300px"
        />
      </FormItem>

      <FormItem>
        <Button type="primary" @click="checkUsername">Register</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your repassword"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        username: "",
        password: "",
        repassword: "",
        tel: "",
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
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
        ],
        repassword: [
          { required: true, validator: validatePassCheck, trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    checkUsername() {
      console.log("foucs");
      this.$api.get(
        "cfs/foundation/checkUsername",
        {
          username: this.formValidate.username
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data); //请求成功，response为成功信息参数
            var data = response.data;
            if (data.check == 1) {
              this.$Message.error("用户名不可用！！");
            } else {
              this.$Message.success("用户名可用！！");
              this.handleSubmit("formValidate");
            }
          }
        }
      );
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate.role);
          this.register();
        } else {
          this.$Message.error("请输入完整信息");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    register: function() {
      this.$api.get(
        "cfs/foundation/register",
        {
          username: this.formValidate.username,
          password: this.formValidate.password,
          tel: this.formValidate.tel,
          
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data); //请求成功，response为成功信息参数
            if (response.data.type == "1") {
              this.$Message.success("Register Success!");
              this.$router.push("/login");
            }else{
                this.$Message.success("Register Fail!");
            }
          } else {
            console.log(response.message); //请求失败，response为失败信息
          }
        }
      );
    }
  }
};
</script>