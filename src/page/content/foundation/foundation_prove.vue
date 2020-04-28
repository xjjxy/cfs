<template>
  <div style="display:flex;justify-content: center;">
    <div v-if="notProve">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
        enctype="multipart/form-data"
      >
        <div style="display:flex;justify-content: center;">
          <h1>基金会认证</h1>
        </div>
        <FormItem label="基金会名" prop="foundationName">
          <Input
            v-model="formValidate.foundationName"
            placeholder="Enter your foundationName"
            style="width: 300px"
          />
        </FormItem>
        <Upload
          ref="upload"
          type="drag"
          :before-upload="handleUpload"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
          <div v-if="file !== null">Upload file: {{ file.name }}</div>
        </Upload>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">ToProve</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </div>
    <div v-if="isProve">
      <h1>您以完成认证!!</h1>
      <Button type="primary" to="/fouondation/foundationInfo">点击查看基金会信息</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foundation_id: JSON.parse(sessionStorage.getItem("foundation_id")),

      formValidate: {
        foundationName: ""
      },

      ruleValidate: {
        foundationName: [
          {
            required: true,
            message: "Please fill in the user foundationName",
            trigger: "blur"
          }
        ]
      },
      file: null,
      form: null
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
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.form.delete("foundationName");
          this.form.append("foundationName", this.formValidate.foundationName);
          this.form.delete("id");
          this.form.append("id",JSON.parse(sessionStorage.getItem("id")));
          this.upload();
        } else {
          this.$Message.error("Validate Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$refs.upload.fileList.splice(0);
    },
    handleUpload(file) {
      this.file = file;
      console.log(file);
      var f = new FormData();
      f.append("licenseFile", file);
      this.form = f;
      return false;
    },

    upload() {
      console.log(this.file);
      this.$api.post("cfs/foundation/addFoundation", this.form, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == 1) {
            this.$Message.success("upload Success!");
            console.log(data.foundation_id);
            this.$addStorageEvent(1, "foundation_id", JSON.stringify(data.foundation_id));
          } else {
            this.$Message.error("upload Fail!");
          }
        } else {
          this.$Message.error("upload Success!");
        }
      });
    }
  }
};
</script>
<style >
</style>