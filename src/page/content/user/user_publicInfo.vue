<template>
  <div>
    <div>
      <div style="display: flex;
    justify-content: space-evenly;">
        <span>
          <Card>
            <p slot="title">
              <Icon type="md-alert" />系统项目
            </p>
            <div class="info">
              <h2>{{project_count}}</h2>
            </div>
          </Card>
        </span>
        <span>
          <Card>
            <p slot="title">
              <Icon type="md-analytics" />捐赠次数
            </p>
            <div class="info">
              <h2>{{donate_count}}</h2>
            </div>
          </Card>
        </span>
        <span>
          <Card>
            <p slot="title">
              <Icon type="ios-analytics" />捐赠金额
            </p>
            <div class="info">
              <h2>{{amount_count}}Ether</h2>
            </div>
          </Card>
        </span>
      </div>
    </div>
    <div class="info">
      <div style="width:80%">
        <Table stripe :columns="columns1" :data="donationList"></Table>
      </div>
    </div>
    <div class="info">
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
  data() {
    return {
      project_count:"",
      donate_count:"",
      amount_count:"",
      currentPage: 1,
      totalCount: 20,
      pageSize: 15,
      donationList: [],
      columns1: [
        {
          title: "用户名",
          key: "donor_name",
          sortable: true
        },
        {
          title: "基金会",
          key: "foundation_name",
          sortable: true
        },
        {
          title: "项目名",
          key: "project_name"
        },
        {
          title: "捐赠金额",
          key: "donate_amount"
        },
        {
          title: "捐赠时间",
          key: "donate_time"
        }
      ]
    };
  },
  methods: {
    getStatistic() {
      this.$api.get("cfs/admin/getStatistic", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "1") {
            var statistic = data.statistic;
            console.log("成功");
            this.project_count = statistic.project_count;
            this.donate_count = statistic.donate_count;
            this.amount_count = statistic.amount_count;
          } else {
            console.log("失败");
          }
        }
      });
    },
    getAllDonation() {
      this.$api.get(
        "cfs/donor/getAllDonation",
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              var list = data.list;
              for (var index in list) {
                list[index].donate_time = this.toString(
                  new Date(list[index].donate_time)
                );
              }
              this.donationList = data.list;
              this.totalCount = data.totalCount;
            } else {
              console.log("获取失败");
            }
          }
        }
      );
    }
  },
  created() {
    this.getAllDonation();
    this.getStatistic();
  }
};
</script>