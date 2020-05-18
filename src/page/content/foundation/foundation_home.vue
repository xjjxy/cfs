<template>
  <div style="display: flex;
    justify-content: space-evenly;">
    <span>
      <Card>
        <p slot="title">
          <Icon type="md-alert" />总发布项目数
        </p>
        <div class="info">
          <h2>{{projectCount}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="md-analytics" />总捐赠次数
        </p>
        <div class="info">
          <h2>{{donateCount}}</h2>
        </div>
      </Card>
    </span>
    <span>
      <Card>
        <p slot="title">
          <Icon type="ios-analytics" />总金额数
        </p>
        <div class="info">
          <h2>{{donateAmount}}Ether</h2>
        </div>
      </Card>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectCount: null,
      donateCount: null,
      donateAmount: null
    };
  },
  methods: {
    getFoundationStatistic() {
      this.$api.get(
        "cfs/foundation/getFoundationStatistic",
        {
          foundation_id: JSON.parse(sessionStorage.getItem("foundation_id"))
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            var data = response.data;
            if (data.type == "1") {
              this.projectCount = data.projectCount;
              this.donateCount = data.donateCount;
              this.donateAmount = data.donateAmount;
            } else {
              console.log("获取失败");
            }
          }
        }
      );
    }
  },
  created() {
    this.getFoundationStatistic();
  }
};
</script>