<template>
  <div style="display: flex;
    justify-content: space-evenly;">
    <span>
      <Card>
        <p slot="title">
          <Icon type="md-alert" />总项目数
        </p>
        <div class="info">
          <h2>{{project_count}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="md-analytics" />总捐赠数
        </p>
        <div class="info">
          <h2>{{donate_count}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="ios-analytics" />总金额数
        </p>
        <div class="info">
          <h2>{{amount_count}}Ether</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="ios-analytics" />总捐赠用户数
        </p>
        <div class="info">
          <h2>{{donor_count}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="ios-analytics" />总基金会数
        </p>
        <div class="info">
          <h2>{{foundation_count}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="ios-analytics" />总基金会用户数
        </p>
        <div class="info">
          <h2>{{foundation_user_count}}</h2>
        </div>
      </Card>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foundation_count: "",
      foundation_user_count: "",
      project_count: "",
      donor_count: "",
      donate_count: "",
      amount_count: ""
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
            this.foundation_count = statistic.foundation_count;
            this.foundation_user_count = statistic.foundation_user_count;
            this.project_count = statistic.project_count;
            this.donor_count = statistic.donor_count;
            this.donate_count = statistic.donate_count;
            this.amount_count = statistic.amount_count;
          } else {
            console.log("失败");
          }
        }
      });
    }
  },
  created() {
    this.getStatistic();
  }
};
</script>