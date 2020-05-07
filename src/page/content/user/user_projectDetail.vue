<template>
  <div>
    <div class="info">
      <h1>募捐项目详情 编号:{{this.id}}</h1>
    </div>
    <div class="info">
      <Card dis-hover bordered="false" style="width:320px">
        <div style="text-align:center">
          <img :src="'http://127.0.0.1:2333/ipfs/'+project.img" style="width: 280px;height:150px" />
          <p>发布机构:{{project.foundation_name}}</p>
        </div>
      </Card>

      <Card shadow>
        <p slot="title">{{project.name}}</p>
        <p>目标金额:{{project.target_amount}} Ether</p>
        <p>已筹善款:{{project.now_amount}} Ether</p>
        <p>剩余善款:{{project.last_amount}} Ether</p>
        <p>受捐次数:{{project.donate_count}}</p>
        <p>项目时间:{{project.begin_time}}至{{project.end_time}}</p>
        <div class="info">
          <Button type="error" to="/user_donate">我要捐赠</Button>
        </div>
      </Card>
    </div>
    <div>
      <div class="info">
        <Button type="text">项目详情</Button>
        <Button type="text">项目进度</Button>
        <Button type="text">项目评论</Button>
      </div>
      <div class="info">
        <Card dis-hover bordered="false" style="width:680px">
          <div style="text-align:center">
            <p><strong>项目详情</strong></p>
            <p>{{project.description}}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      project: null
    };
  },
  methods: {
    // this.get
    getProjectDetail() {
      this.$api.get("cfs/donor/getProjectDetail", { id: this.id }, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == 1) {
            console.log("list:" + data.project);
            var project = data.project;
            project.begin_time = this.toString(new Date(project.begin_time));
            project.end_time = this.toString(new Date(project.end_time));
            this.project = project;
            this.$addStorageEvent(1, "project", JSON.stringify(project));
          }
        }
      });
    }
  },

  created() {
    console.log("id:" + this.$route.params.project_id);
    this.id = this.$route.params.project_id;
    this.getProjectDetail();
  }
};
</script>