<template>
  <div style="display:flex;justify-content: center;">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      enctype="multipart/form-data"
    >
      <h1>基金会认证</h1>
      <FormItem label="基金会名" prop="name">
        <Input
          v-model="formValidate.name"
          placeholder="Enter your name"
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
    
}
</script>