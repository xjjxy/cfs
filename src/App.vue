<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <!-- 头部 -->
            <top></top>
            <Content :style="{margin: '30px 20px 0', background: '#fff', minHeight: '550px'}">
                <!-- <router-view>

                </router-view> -->
                <!-- <register></register> -->
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2020 &copy; zzj-cfs</Footer>
        </Layout>
    </div>
</template>
<script>
import top from "./page/top";
// import register from "./page/ui/register"
    export default {
        components:{top}
    }
</script>

<style>
.info {
  display: flex;
  justify-content: center;
}
</style>