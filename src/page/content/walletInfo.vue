<template>
  <div style="background:#eee;padding: 20px">
    <div class="info">
      <h1>钱包信息</h1>
    </div>
    <div v-if="noWallet">
      <Card :bordered="false">
        <p slot="title">还没有钱包</p>
        <p>
          <Button type="error" long @click="createWallet">点击立即创建</Button>
        </p>
      </Card>
    </div>

    <div v-if="hasWallet" >
      <Card :bordered="false">
        <p slot="title">账户地址</p>
        <p>{{wallet_address}}</p>
      </Card>

      <Card :bordered="false">
        <p slot="title">账户余额</p>
        <p>
          <strong>{{balance}}</strong> ether 备注:(1ether=100￥)
        </p>
      </Card>

      <Card :bordered="false">
        <p slot="title">账户uuid</p>
        <p>{{uuid}}</p>
      </Card>

      <Card :bordered="false">
        <p slot="title">账户hash</p>
        <p>{{wallet_address}}</p>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet_address: JSON.parse(sessionStorage.getItem("wallet_address")),
      balance: JSON.parse(sessionStorage.getItem("balance")),
      uuid: JSON.parse(sessionStorage.getItem("uuid")),
      hash: JSON.parse(sessionStorage.getItem("hash"))
    };
  },
  created() {
    this.$api.get(
      "cfs/sys/walletInfo",
      {
        uuid: JSON.parse(sessionStorage.getItem("uuid"))
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          var data = response.data;
          if (data.type == "0") {
            this.$Message.error("Load Fail!");
          } else {
            console.log("wallet" + data.wallet.balance);
            var wallet = data.wallet;
            this.$addStorageEvent(
              1,
              "wallet_address",
              JSON.stringify(wallet.wallet_address)
            );
            this.$addStorageEvent(1, "balance", JSON.stringify(wallet.balance));
            this.$addStorageEvent(1, "hash", JSON.stringify(wallet.hash));
          }
        } else {
          this.$Message.error("Connect Fail!");
        }
      }
    );
    window.addEventListener("setItem", e => {
      console.log(e);
      this.wallet_address = JSON.parse(
        sessionStorage.getItem("wallet_address")
      );
      this.balance = JSON.parse(sessionStorage.getItem("balance"));
      this.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.hash = JSON.parse(sessionStorage.getItem("hash"));
    });
  },
  computed: {
    noWallet: function() {
      if (this.uuid == "" || this.uuid == null) {
        return true;
      } else {
        return false;
      }
    },
    hasWallet: function() {
      if (this.uuid != "" && this.uuid != null) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createWallet: function() {
      console.log("createWalelt--");
      this.$router.push("createWallet");
    }
  }
};
</script>