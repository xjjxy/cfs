<template>
  <div class="info">
    <div v-show="add">
      <div class="info">
        <h1>添加项目阶段</h1>
      </div>
      <FormItem label="阶段标题" prop="phase_title">
        <Input
          v-model="formValidate.phase_title"
          placeholder="Enter your phase_title"
          style="width: 300px"
        />
      </FormItem>
      <FormItem label="使用善款金额" prop="used_amount">
        <Input
          v-model="formValidate.used_amount"
          placeholder="Enter your used_amount"
          style="width: 200px"
        />
      </FormItem>

      <FormItem label="阶段描述" prop="phase_description">
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
        <Button type="primary" @click="handleSubmit('formValidate')">审核</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </div>
    <div v-show="isAdd">
      <h1>项目已在审核！！</h1>
      <Button type="primary" @click="addAgain">继续发布</Button>
      <Button type="primary" to="/foundation/foundation_project_info">查看详情</Button>
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
      formValidate: {
        phase_title: "",
        used_amount: "",
        phase_description: "",
      }
    };
  },
  created() {
    console.log("project_id:" + this.$route.params.project_id);
    this.project_id = this.$route.params.project_ids;
    // this.getProjectDetail();
  }
};
</script>