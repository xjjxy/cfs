<template>
  <div class="info">
    <div v-show="add">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
        enctype="multipart/form-data"
      >
        <div class="info">
          <h1>发布募捐项目</h1>
        </div>
        <FormItem label="项目名" prop="name">
          <Input
            v-model="formValidate.name"
            placeholder="Enter your project_name"
            style="width: 300px"
          />
        </FormItem>
        <FormItem label="目标金额" prop="target_amount">
          <Input
            v-model="formValidate.target_amount"
            placeholder="Enter your target_amount"
            style="width: 200px"
          />
          <strong>元</strong>
        </FormItem>

        <FormItem label="开始时间" prop="begin_time">
          <DatePicker
            v-model="formValidate.begin_time"
            format="yyyy年MM月dd日"
            type="date"
            placeholder="Select date and time"
            style="width: 200px"
            @on-change="dateChange"
          ></DatePicker>
        </FormItem>
        <FormItem label="持续时间" prop="duration">
          <Input
            type="duration"
            v-model="formValidate.duration"
            placeholder="Enter your duration"
            style="width: 150px"
          />
          <strong>天</strong>
        </FormItem>
        <FormItem label="项目描述" prop="description">
          <Input
            v-model="formValidate.description"
            maxlength="200"
            show-word-limit
            type="textarea"
            placeholder="Enter description..."
            style="width: 300px"
            :autosize="{minRows: 5,maxRows: 8}"
          />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">审核</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div v-show="isAdd">
      <h1>项目已在审核！！</h1>
      <Button type="primary" @click="addAgain">继续发布</Button>
      <Button type="primary" @click="toProject">查看详情</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: true,
      isAdd: false,
      formValidate: {
        name: "",
        target_amount: "",
        begin_time: "",
        duration: "",
        description: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        target_amount: [
          {
            required: true,
            message: "The target_amount cannot be empty",
            trigger: "blur"
          }
        ],
        begin_time: [
          {
            required: true,
            message: "The begin_time cannot be empty",
            trigger: "blur"
          }
        ],
        duration: [
          {
            required: true,
            message: "The duration cannot be empty",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "The description cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    dateChange(format, date) {
      console.log("format:" + format);
      console.log("date:" + date);
      this.formValidate.begin_time = format;
      //   console.log(this.toString(date));
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addProject();
        } else {
          this.$Message.error("Register Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    addAgain() {
      this.isAdd = false;
      this.add = true;
      this.handleReset("formValidate");
    },
    addProject() {
      var params = new URLSearchParams();
      params.append("name", this.formValidate.name);
      params.append(
        "foundation_id",
        JSON.parse(sessionStorage.getItem("foundation_id"))
      );
      params.append("target_amount", this.formValidate.target_amount);
      params.append("begin_time", this.formValidate.begin_time);
      params.append("duration", this.formValidate.duration);
      params.append("description", this.formValidate.description);
      this.$api.post("cfs/project/addProject", params, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("Add Success!!!");
            this.add = false;
            this.isAdd = true;
          } else {
            this.$Message.error("Add Fail!!!");
          }
        } else {
          this.$Message.success("Add Fail!!!");
        }
      });
    }
  }
};
</script>