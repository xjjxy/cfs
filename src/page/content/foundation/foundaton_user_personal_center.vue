<template>
  <div>
    <div class="info">
      <h1>个人信息</h1>
    </div>
    <div class="info">
      <Card bordered>
        <p slot="title">账户名</p>
        <p>{{username}}</p>
      </Card>

      <Card bordered>
        <p slot="title">联系电话</p>
        <p>
          <strong>{{tel}}</strong>
        </p>
      </Card>

      <Card bordered>
        <p slot="title">账户角色</p>
        <p>{{role}}</p>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: JSON.parse(sessionStorage.getItem("username")),
      tel: JSON.parse(sessionStorage.getItem("tel")),
      role:
        JSON.parse(sessionStorage.getItem("role")) == 0
          ? "捐赠用户"
          : JSON.parse(sessionStorage.getItem("role")) == 1
          ? "基金会用户"
          : ""
    };
  }
};
</script>