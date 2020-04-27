<template>
  <div style="display:flex;justify-content: center;">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      enctype="multipart/form-data"
    >
      <h1>捐赠者注册</h1>
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name" style="width: 300px" />
      </FormItem>
      <FormItem label="用户名" prop="username">
        <Input
          v-model="formValidate.username"
          placeholder="Enter your username"
          style="width: 300px"
        />
      </FormItem>
      <!-- <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="uploadSuccess">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>-->
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
      <!-- <FormItem label="E-mail" prop="email">
        <Input v-model="formValidate.email" placeholder="Enter your e-mail" style="width: 300px" />
      </FormItem>
      <FormItem label="用户地址" prop="userAddress">
        <Input v-model="formValidate.userAddress" placeholder="Enter your userAddress" />
      </FormItem>
      <FormItem label="用户私钥" prop="privateKey">
        <Input v-model="formValidate.privateKey" placeholder="Enter your privateKey" />
      </FormItem>
      <FormItem label="钱包密码" prop="walletPassword">
        <Input v-model="formValidate.walletPassword" placeholder="Enter your walletPassword" />
      </FormItem>
      <FormItem label="用户类型" prop="userType">
        <RadioGroup v-model="formValidate.userType">
          <Radio label="0">捐助人</Radio>
          <Radio label="1">基金会</Radio>
        </RadioGroup>
      </FormItem>-->

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Register</Button>
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
        name: "",
        username: "",
        password: "",
        repassword: "",
        tel: ""
        // email: "",
        // userAddress: "",
        // privateKey: "",
        // walletPassword: "",
        // userType: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
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
        // email: [
        //   {
        //     required: true,
        //     message: "Mailbox cannot be empty",
        //     trigger: "blur"
        //   },
        //   { type: "email", message: "Incorrect email format", trigger: "blur" }
        // ],
        tel: [
          {
            required: true,
            message: "The tel cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
        // userType: [
        //   { required: true, message: "Please choose a type", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    // uploadSuccess: function(response, file, fileList) {
    //   console.log(response);
    //   console.log(file);
    //   console.log(fileList);
    // },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // console.log(this.formValidate.userType);
          this.register();
        } else {
          this.$Message.error("Register Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    register: function() {
      this.$api.get(
        "cfs/donor/register",
        {
          name: this.formValidate.name,
          username: this.formValidate.username,
          password: this.formValidate.password,
          tel: this.formValidate.tel
          // email: this.formValidate.email,
          // headPath: "",
          // userAddress: this.formValidate.userAddress,
          // privateKey: this.formValidate.privateKey,
          // walletPassword: this.formValidate.walletPassword,
          // userType: this.formValidate.userType
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data); //请求成功，response为成功信息参数
            if (response.data.type == "1") {
              this.$Message.success("Register Success!");
              this.$router.push("/login");
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