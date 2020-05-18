<template>
  <div>
    <div class="info">
      <h3>项目名：{{project_name}}</h3>
    </div>
    <div class="info">
      <List border>
        <ListItem v-for="item in commentList" :key="item.id">
          <div @click="detail(item.project_id)">
            <ListItemMeta
              :title="'评论者'+item.commentator_name+'，评论时间：'+item.comment_time"
              :description="'评论内容：'+item.comment"
            />
          </div>
          <template slot="action">
            <li>
              <a @click="deletaComment(item.id)">删除评论</a>
            </li>
          </template>
        </ListItem>
      </List>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      commentList: null,
      project_id: null,
      project_name: null
    };
  },
  methods: {
    deletaComment(id) {
      this.$api.get("cfs/donor/deleteComment", { id: id }, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            this.$Message.success("删除评论成功！！");
            this.getCommentByProjectId();
          } else {
            this.$Message.error("删除评论失败！！");
          }
        } else {
          this.$Message.error("删除评论失败！！");
        }
      });
    },
    getCommentByProjectId() {
      // console.log("get comment");
      // console.log("project id:"+this.id);
      this.$api.get(
        "cfs/donor/getCommentByProjectId",
        { project_id: this.project_id },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              // this.$Message.success("获取评论成功！！");
              var list = data.list;
              for (var index in list) {
                // console.log("comment:" + list[index].comment);
                list[index].comment_time = this.toString(
                  new Date(list[index].comment_time)
                );
              }
              this.commentList = list;
            } else {
              // this.$Message.error("获取评论失败！！");
            }
          }
        }
      );
    }
  },
  created() {
    this.project_id = this.$route.params.project_id;
    this.getCommentByProjectId();
    this.project_name = JSON.parse(
      sessionStorage.getItem("projectName" + this.project_id)
    );
  }
};
</script>