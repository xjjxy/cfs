<template>
  <div class="info">
    <div></div>
    <div>
      <Input v-model="project_name" placeholder="输入项目名" style="width: 500px" />
      <Button type="error" @click="search">Search</Button>
      <List item-layout="vertical">
        <!-- <a href="/user_donate" target="_blank"> -->
        <ListItem v-for="item in list" :key="item.title" >
          <div @click="detail(item.id)">
            <ListItemMeta
              :title="'编号:'+item.id+'      '+item.name"
              :description="item.foundation_name"
            />
          </div>
          <div @click="detail(item.id)">项目时间:{{item.begin_time}}到{{item.end_time}}</div>
          <template slot="action">
            <li>
              <div @click="detail(item.id)">
                <Icon type="ios-bookmark-outline" />
                {{'受捐次数:'+item.donate_count}}
              </div>
            </li>
            <li>
              <div @click="detail(item.id)">
                <Icon type="ios-flag-outline" />
                {{'优先级:'+item.level}}
              </div>
            </li>
            <li>
              <div @click="detail(item.id)">
                <Icon type="ios-chatbubbles-outline" />
                {{'评论数:'+item.comment_count}}
              </div>
            </li>
          </template>

          <template slot="extra">
            <div @click="detail(item.id)">
              <img :src="'http://127.0.0.1:2333/ipfs/'+item.img" style="width: 280px;height:150px" />
            </div>
          </template>
        </ListItem>
        <!-- </a> -->
      </List>
      <Page
        :total="totalCount"
        show-total
        :page-size="pageSize"
        :current="currentPage"
        on-change="pageChage"
      />
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getAllProjectBasicInfo();
  },
  methods: {
    search() {
      console.log("project_name:"+this.project_name);
      this.getAllProjectBasicInfo();
    },
    getAllProjectBasicInfo() {
      this.$api.get(
        "cfs/donor/getAllProjectBasicInfo",
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          project_name: this.project_name
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == 1) {
              var list = data.list;
              for (var i in list) {
                list[i].begin_time = this.toString(
                  new Date(list[i].begin_time)
                );
                list[i].end_time = this.toString(new Date(list[i].end_time));
                console.log("name:" + list[i].foundation_name);
              }
              this.list = list;
              this.totalCount = data.totalCount;
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
    pageChage(currentPage) {
      this.currentPage = currentPage;
      this.getAllProjectBasicInfo();
    }
  },
  data() {
    return {
      currentPage: 1,
      totalCount: 20,
      pageSize: 5,
      project_name: "",
      list: null
    };
  }
};
</script>
