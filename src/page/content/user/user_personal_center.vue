<template>
  <div style>
    <div class="info">
      <h1>个人信息</h1>
    </div>
    <div class="info">
      <Card bordered>
        <p slot="title">姓名</p>
        <p>{{name}}</p>
      </Card>
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
    <div class="info">
      <Button :type="donatesProjectButton" @click="showDonatedProject">已参与项目</Button>
      <Button :type="commentButton" @click="showComment">已评论项目</Button>
    </div>
    <div class="info" v-show="donatedProjectFlag">
      <List border>
        <ListItem v-for="item in donatedProjectList" :key="item.id">
          <div @click="detail(item.project_id)">
            <ListItemMeta
              :title="'基金会：'+item.foundation_name +'- - - - - - - - - - 项目名：'+item.project_name"
              :description="'捐赠金额：'+item.donate_amount+'Ether- - - - - - -捐赠时间'+item.donate_time"
            />
          </div>
        </ListItem>
      </List>
    </div>
    <div class="info" v-show="commentFlag">
      <List border>
        <ListItem v-for="item in commentList" :key="item.id">
          <div @click="detail(item.project_id)">
            <ListItemMeta
              :title="'项目名：'+item.project_name+'，评论时间：'+item.comment_time"
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
      name: JSON.parse(sessionStorage.getItem("name")),
      username: JSON.parse(sessionStorage.getItem("username")),
      tel: JSON.parse(sessionStorage.getItem("tel")),
      role:
        JSON.parse(sessionStorage.getItem("role")) == 0
          ? "捐赠用户"
          : JSON.parse(sessionStorage.getItem("role")) == 1
          ? "基金会用户"
          : "",
      donatedProjectList: null,
      commentList: null,
      donatedProjectFlag: true,
      commentFlag: true,
      donatesProjectButton: "primary",
      commentButton: "text"
    };
  },
  methods: {
    deletaComment(id) {
      this.$api.get(
        "cfs/donor/deleteComment",
        { id: id },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              this.$Message.success("删除评论成功！！");
              this.getCommentByCommentatorId();
            } else {
              this.$Message.error("删除评论失败！！");
            }
          } else {
            this.$Message.error("删除评论失败！！");
          }
        }
      );
    },
    getCommentByCommentatorId() {
      this.$api.get(
        "cfs/donor/getCommentByCommentatorId",
        { commentator_id: JSON.parse(sessionStorage.getItem("id")) },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
            //   this.$Message.success("获取评论成功！！");
              var list = data.list;
              for (var index in list) {
                // console.log("comment:" + list[index].comment);
                list[index].comment_time = this.toString(
                  new Date(list[index].comment_time)
                );
                this.commentList = list;
              }
            } else {
            //   this.$Message.error("获取评论失败！！");
            }
          }
        }
      );
    },
    detail(id) {
      // console.log("id:" + id);
      // this.$router.push({ name: "user_donate", params: { id: id } });
      //新开界面 params传参
      let routeUrl = this.$router.resolve({
        name: "user_projectDetail",
        params: { project_id: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    showDonatedProject() {
      this.donatedProjectFlag = true;
      this.commentFlag = false;
      this.donatesProjectButton = "primary";
      this.commentButton = "text";
    },
    showComment() {
      this.donatedProjectFlag = false;
      this.commentFlag = true;
      this.donatesProjectButton = "text";
      this.commentButton = "primary";
    },
    getDonatedProject() {
      this.$api.get(
        "cfs/donor/getDonatedProject",
        { donor_id: JSON.parse(sessionStorage.getItem("id")) },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              var list = data.list;
              this.donatedProjectList = list;
              for (var index in list) {
                list[index].donate_time = this.toString(
                  new Date(list[index].donate_time)
                );
              }
            } else {
              console.log("fail");
            }
          }
        }
      );
    }
  },
  created() {
    this.getDonatedProject();
    this.getCommentByCommentatorId();
  }
};
</script>