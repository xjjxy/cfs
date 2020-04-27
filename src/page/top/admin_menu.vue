<template>
    <div class="layout-nav-left">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            首页
        </MenuItem>
        <MenuItem name="2">
            <Icon type="logo-hackernews" />
            基金会管理
        </MenuItem>
        <MenuItem name="3">
            <Icon type="md-hackernews" />
            募捐项目管理
        </MenuItem>
        <MenuItem name="4">
            <Icon type="md-help" />
            其他
        </MenuItem>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    
    .layout-nav-left{
        width: 600px;
        margin: 0 auto;
        position:absolute;
        left:150px;
    }
    
    
</style>