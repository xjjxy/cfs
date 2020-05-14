<template>
  <div>
    <div class="info">
      <h1>募捐项目详情 编号:{{this.id}}</h1>
    </div>
    <div class="info">
      <Card dis-hover :bordered="false" style="width:320px">
        <div style="text-align:center">
          <img :src="'http://127.0.0.1:2333/ipfs/'+project.img" style="width: 280px;height:150px" />
          <p>发布机构:{{project.foundation_name}}</p>
        </div>
      </Card>

      <Card dis-hover :bordered="false">
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
        <Button :type="detailButton" @click="showDetail">项目描述</Button>
        <Button :type="phaseButton" @click="showPhase">项目进度</Button>
        <Button :type="commentButton" @click="showComment">项目评论</Button>
      </div>
      <div class="info" v-show="this.showDetailFlag">
        <Card dis-hover :bordered="false" style="width:680px">
          <div style="text-align:center">
            <p>
              <strong>项目描述</strong>
            </p>
            <p>{{project.description}}</p>
          </div>
        </Card>
      </div>
      <div class="info" v-show="this.showPhaseFlag">
        <Card dis-hover :bordered="false" style="width:680px">
          <div style="text-align:center">
            <p>
              <strong>项目阶段进度</strong>
            </p>
          </div>
          <List item-layout="vertical">
            <ListItem v-for="item in data" :key="item.title">
              <ListItemMeta :title="item.title" :description="item.description" />
              {{ item.content }}
              <template slot="extra">
                <p>888</p>
              </template>
            </ListItem>
          </List>
        </Card>
      </div>
      <div class="info" v-show="showCommentFlag">
        <Card dis-hover :bordered="false" style="width:680px">
          <div style="text-align:center">
            <p>
              <strong>项目评论</strong>
            </p>
          </div>
          <Input
            v-model="comment"
            maxlength="100"
            show-word-limit
            type="textarea"
            placeholder="Enter something..."
            style="width: 500px"
          />
          <Button type="success" @click="addComment">评论</Button>
          <List>
            <ListItem v-for="item in commentList" :key="item.id">
              <ListItemMeta :title="item.commentator_name+'评论于:'+item.comment_time" :description="item.comment" />
            </ListItem>
          </List>
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
      project: null,
      detailButton: "primary",
      phaseButton: "text",
      commentButton: "text",
      showDetailFlag: true,
      showPhaseFlag: false,
      showCommentFlag: false,
      comment: null,
      commentList: null,
      data: [
        {
          title: "This is title 1",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 2",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        }
      ]
    };
  },
  methods: {
    getCommentByProjectId() {
      console.log("get comment");
      console.log("project id:"+this.id);
      this.$api.get(
        'cfs/donor/getCommentByProjectId',
        { project_id: this.id },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              // this.$Message.success("获取评论成功！！");
              var list = data.list;
              for (var index in list) {
                // console.log("comment:" + list[index].comment);
                list[index].comment_time = this.toString(new Date(list[index].comment_time));
              }
              this.commentList = list;
            } else {
              // this.$Message.error("获取评论失败！！");
            }
          }
        }
      );
    },
    addComment() {
      this.$api.get(
        "cfs/donor/addComment",
        {
          project_id: this.project.id,
          project_name: this.project.name,
          commentator_id: JSON.parse(sessionStorage.getItem("id")),
          commentator_name: JSON.parse(sessionStorage.getItem("name")),
          comment: this.comment
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              this.$Message.success("评论成功！！");
              this.comment = null;
              this.getCommentByProjectId();
            } else {
              this.$Message.error("评论失败！！");
            }
          }
        }
      );
    },
    showDetail() {
      console.log("this.showDetailFlag:" + this.showDetailFlag);
      this.showDetailFlag = true;
      this.showPhaseFlag = false;
      this.showCommentFlag = false;
      this.detailButton = "primary";
      this.phaseButton = "text";
      this.commentButton = "text";
    },
    showPhase() {
      this.showDetailFlag = false;
      this.showPhaseFlag = true;
      this.showCommentFlag = false;
      this.detailButton = "text";
      this.phaseButton = "primary";
      this.commentButton = "text";
    },
    showComment() {
      this.showDetailFlag = false;
      this.showPhaseFlag = false;
      this.showCommentFlag = true;
      this.detailButton = "text";
      this.phaseButton = "text";
      this.commentButton = "primary";
    },
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
    this.getCommentByProjectId();
  }
};
</script>