<template>
  <div class="layout-nav-left">
    <MenuItem name="1" to="/user_home">
      <Icon type="ios-paper"/>首页
    </MenuItem>
    <MenuItem name="2" to="http://www.xinhuanet.com/gongyi/gydt.htm" target="_blank">
      <Icon type="logo-hackernews" />项目新闻
    </MenuItem>
    <MenuItem name="3" @click.native="info">
      <Icon type="ios-information-circle" />信息公开
    </MenuItem>
    <MenuItem name="4" to="/user_qa">
      <Icon type="md-help" />问题答疑
    </MenuItem>
  </div>
</template>

<script>
export default {
  methods: {
    info: function() {
      console.log("fdsf");
    }
  }
};
</script>

<style>
.layout-nav-left {
  width: 600px;
  margin: 0 auto;
  position: absolute;
  left: 150px;
}
</style>