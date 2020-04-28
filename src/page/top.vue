<template>
  <Header :style="{position: 'flex', width: '100%'}">
    <Menu mode="horizontal" theme="dark">
      <div class="layout-logo">
        <MenuItem name="9" @click.native="tohome">
          <Icon type="ios-home" />CFS慈善募捐系统
        </MenuItem>
      </div>
      <!-- 中间导航菜单 -->
      <user_menu v-if="user_memu_actice"></user_menu>
      <foundation_menu v-if="foundation_memu_actice"></foundation_menu>
      <admin_menu v-if="admin_memu_actice"></admin_menu>
      <div class="layout-nav-right-notLogin" v-if="notLogin">
        <MenuItem name="5" to="/login">
          <Icon type="md-log-out" />登录
        </MenuItem>
        <MenuItem name="6" to="/donor_register">
          <Icon type="ios-arrow-dropleft" />捐赠者注册
        </MenuItem>
        <MenuItem name="7" to="/foundation_register">
          <Icon type="ios-arrow-dropleft" />基金会注册
        </MenuItem>
      </div>
      <div class="layout-nav-right-isLogin" v-if="isLogin">
        <Submenu name="5">
          <template slot="title">
            <Icon type="md-contacts" />
            {{username}}
          </template>
          <MenuGroup title="管理">
            <MenuItem name="5-1" v-if="user_memu_actice">用户资料</MenuItem>
            <MenuItem name="5-2" v-if="user_memu_actice" to="/walletInfo">用户钱包</MenuItem>
            <MenuItem name="5-1" v-if="foundation_memu_actice" to="/foundation/foundation_info">基金会资料</MenuItem>
            <MenuItem name="5-2" v-if="foundation_memu_actice" to="/walletInfo">基金会钱包</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="6" @click.native="logout">
          <Icon type="md-log-out" />登出
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
import user_menu from "./top/user_menu";
import foundation_menu from "./top/foundation_menu";
import admin_menu from "./top/admin_menu";
export default {
  data() {
    return {
      ghost: true,
      username: JSON.parse(sessionStorage.getItem("username")),
      role: JSON.parse(sessionStorage.getItem("role"))
    };
  },
  components: { user_menu, foundation_menu, admin_menu },
  computed: {
    isLogin: function() {
      if (this.username != null && this.username != "") {
        return true;
      } else {
        return false;
      }
    },
    notLogin: function() {
      if (this.username == null || this.username == "") {
        return true;
      } else {
        return false;
      }
    },
    user_memu_actice: function() {
      if (this.role == null || this.role == 0) {
        return true;
      } else {
        return false;
      }
    },
    foundation_memu_actice: function() {
      if (this.role == 1) {
        return true;
      } else {
        return false;
      }
    },
    admin_memu_actice: function() {
      if (this.role == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  created: function() {
    //监听sessionStorage事件
    window.addEventListener("setItem", e => {
      console.log(e);
      this.username = JSON.parse(sessionStorage.getItem("username"));
      this.role = JSON.parse(sessionStorage.getItem("role"));
    });
    window.addEventListener("clearItem", e => {
      console.log(e);
      this.username = JSON.parse(sessionStorage.getItem("username"));
      this.role = JSON.parse(sessionStorage.getItem("role"));
    });
  },
  methods: {
    logout: function() {
      console.log("remove user");
      // this.$removeStorageEvent(1, "username");
      // this.$removeStorageEvent(1, "role");
      //修改为清空
      this.$clearStorageEvent(1);
      // this.$router.replace("user_home");
    },
    tohome() {
      if (JSON.parse(sessionStorage.getItem("role")) == "0") {
        this.$router.push("user_home");
      } else if (JSON.parse(sessionStorage.getItem("role")) == "1") {
        this.$router.push("foundation_home");
      } else {
        this.$router.push("admin_home");
      }
    }
  }
};
</script>

<style>
.layout-nav-right-notLogin {
  width: 350px;
  margin: 0 auto;
  position: absolute;
  right: 0px;
}

.layout-nav-right-isLogin {
  width: 250px;
  margin: 0 auto;
  position: absolute;
  right: 0px;
}

.layout-logo {
  width: 230px;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 0px;
}

a:link {
  color: rgba(255, 255, 255, 0.7);
}
a:visited {
  color: rgba(255, 255, 255, 0.7);
}
a:hover {
  color: rgba(255, 255, 255, 0.7);
}
a:active {
  color: rgba(255, 255, 255, 0.7);
}
</style>