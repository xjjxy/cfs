<template>
  <div class="layout-nav-left">
    <MenuItem name="1"  to="/foundation_home">
      <Icon type="ios-paper" />首页
    </MenuItem>
    <!-- <MenuItem name="2">
      <Icon type="logo-hackernews" />募捐项目
    </MenuItem> -->
    <Submenu name="2">
      <template slot="title">
        <Icon type="logo-hackernews" />募捐项目
      </template>
      <MenuGroup title="管理">
        <MenuItem name="2-1" to="/foundation/foundation_project_info">我的项目</MenuItem>
        <MenuItem name="2-2" to="/foundation/foundation_addProject">发布项目</MenuItem>
      </MenuGroup>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="md-cube" />基金会
      </template>
      <MenuGroup title="管理">
        <MenuItem name="3-1" to="/foundation/foundation_info">基金会资料</MenuItem>
        <MenuItem name="3-2" to="/foundation/foundation_prove">基金会认证</MenuItem>
      </MenuGroup>
    </Submenu>
    <MenuItem name="4" to="/foundation/foundation_qa">
      <Icon type="md-help" />问题答疑
    </MenuItem>
  </div>
</template>

<script>
export default {};
</script>

<style>
.layout-nav-left {
  width: 600px;
  margin: 0 auto;
  position: absolute;
  left: 150px;
}
</style>