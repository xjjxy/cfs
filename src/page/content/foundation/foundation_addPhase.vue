<template>
  <div class="info">
    <div v-show="add">
      <div class="info">
        <h1>项目名:{{projectName}}</h1>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="阶段标题:" prop="phase_title">
          <Input
            v-model="formValidate.phase_title"
            placeholder="Enter your phase_title"
            style="width: 200px"
          />
        </FormItem>
        <FormItem label="使用善款金额:" prop="phase_spend">
          <Input
            type="number"
            v-model="formValidate.phase_spend"
            placeholder="Enter your phase_spend"
            style="width:100px"
          />
          <span>提示!!!此项目剩余善款:{{projectLast_amount}}Ehter</span>
        </FormItem>

        <FormItem label="阶段描述:" prop="phase_description">
          <Input
            v-model="formValidate.phase_description"
            maxlength="1000"
            show-word-limit
            type="textarea"
            placeholder="Enter phase_description..."
            style="width: 300px"
            :autosize="{minRows: 5,maxRows: 8}"
          />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div v-show="isAdd">
      <h1>已添加项目阶段！！</h1>
      <Button type="primary" @click="addAgain">继续添加</Button>
      <!-- <Button type="primary" to="/foundation/foundation_project_info">返回详情</Button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project_id: null,
      add: true,
      isAdd: false,
      projectLast_amount: null,
      projectName: null,
      formValidate: {
        phase_title: "",
        phase_spend: "",
        phase_description: ""
      },
      ruleValidate: {
        phase_title: [
          {
            required: true,
            message: "The phase_title cannot be empty",
            trigger: "blur"
          }
        ],
        phase_spend: [
          {
            required: true,
            message: "The phase_spend cannot be empty",
            trigger: "blur"
          }
          // {
          //   type: "number",
          //   max: this.projectLast_amount,
          //   message: "The phase_spend cannot more than last",
          //   trigger: "blur"
          // },
          // {
          //   type: "number",
          //   min: 0,
          //   message: "The phase_spend cannot less than 0",
          //   trigger: "blur"
          // }
        ],
        phase_description: [
          {
            required: true,
            message: "The phase_description cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    addPhase() {
      console.log("add phase ing");
      console.log(
        this.formValidate.phase_title +
          this.formValidate.phase_spend +
          this.formValidate.phase_description
      );

      this.$api.get(
        "cfs/foundation/addPhase",
        {
          project_id: this.project_id,
          phase_title: this.formValidate.phase_title,
          phase_spend: this.formValidate.phase_spend,
          phase_description: this.formValidate.phase_description
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            console.log("data:" + data);
            if (data.type == 1) {
              this.$Message.success("添加成功！");
              this.isAdd = true;
              this.add = false;
            } else {
              this.$Message.error("添加失败！");
            }
          }
        }
      );
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.addProject();
          if (this.formValidate.phase_spend > this.projectLast_amount) {
            this.$Message.error("阶段花费大于项目剩余金额！！");
          } else if (this.formValidate.phase_spend <= 0) {
            this.$Message.error("阶段花费要大于0！！");
          } else {
            this.addPhase();
          }
        } else {
          this.$Message.error("Register Fail!");
        }
      });
    },
    addAgain() {
      this.isAdd = false;
      this.add = true;
      this.handleReset("formValidate");
    }
  },
  created() {
    console.log("project_id:" + this.$route.params.project_id);
    this.project_id = this.$route.params.project_id;
    console.log(
      "projectLast_amount:" +
        JSON.parse(
          sessionStorage.getItem("projectLast_amount" + this.project_id)
        )
    );
    this.projectLast_amount = JSON.parse(
      sessionStorage.getItem("projectLast_amount" + this.project_id)
    );
    this.projectName = JSON.parse(
      sessionStorage.getItem("projectName" + this.project_id)
    );
    // this.getProjectDetail();
  }
};
</script>