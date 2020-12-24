<template>
    <div id="app">
      <a-layout class="home-container" style="min-height: 100vh">
        <a-layout-header>
          <div class="logo">
            <img src="../src/assets/logo1.png" height="50" width="70">
            GameCenter
          </div>
          <a-menu
            theme="dark"
            mode="horizontal"
            v-model="selectedKeys_head"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item key="1">
              <router-link to="/">Store</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/support">Support</router-link>
            </a-menu-item>
<!--            <a-button type="dashed" ghost>-->
<!--              Download User Manual-->
<!--            </a-button>-->
            <a-dropdown placement="bottomCenter" v-if="loginFlag">
              <a class="login-dropdown" @click="e => e.preventDefault()">
                UserSpace
              </a>
              <template v-slot:overlay>
                <a-menu @click="handleLogin">
                  <a-menu-item key="1" v-if="loginFlagPlayer">
                    <router-link :to="`/user/${user_id}`">User space</router-link>
                  </a-menu-item>
                  <a-menu-item key="12" v-if="loginFlagAdmin">
                    <router-link :to="'/admin'" >My space</router-link>
                  </a-menu-item>
                  <a-menu-item key="13" v-if="loginFlagDeveloper">
                    <router-link :to="`/developer/${user_id}`">Developer space</router-link>
                  </a-menu-item>
                  <a-menu-item key="2" @click="handleLogout">
                    <router-link to="/store">Log out</router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown placement="bottomCenter" v-else>
              <a class="login-dropdown" @click="e => e.preventDefault()">
                Login
              </a>
              <template v-slot:overlay>
                <a-menu @click="handleLogin">
                  <a-menu-item key="1">
                    <router-link :to="'/login?role='+'p'">Sign in as Player</router-link>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <router-link :to="'/login?role='+'d'">Sign in as Developer</router-link>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <router-link :to="'/login?role='+'a'">Sign in as Admin</router-link>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <router-link to="/register">Register here</router-link>
                  </a-menu-item>
<!--                  <a-menu-item key="5">-->
<!--                    <router-link to="/user">Test Userspace</router-link>-->
<!--                  </a-menu-item>-->
<!--                  <a-menu-item key="6">-->
<!--                    <router-link to="/developer">Test Developer</router-link>-->
<!--                  </a-menu-item>-->
                </a-menu>
              </template>
            </a-dropdown>
          </a-menu>
        </a-layout-header>
        <a-layout-content style="background: black">
          <router-view @getLoginFlag="getLoginFlag" @getUserId="getUserId" :user_id="user_id"/>
        </a-layout-content>
        <a-layout-footer style="background: black;color: deepskyblue;text-align: center">
          We design ©2020 Created by Us
        </a-layout-footer>
      </a-layout>
    </div>
</template>

<script>

export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      selectedKeys_head: ['1'],
      loginFlag: false,
      loginFlagPlayer: false,
      loginFlagDeveloper: false,
      loginFlagAdmin: false,
      user_id: null,
      isRouterAlive: true
    }
  },
  created () {
    this.getLoginFlag(window.sessionStorage.getItem('r'))
  },
  methods: {
    handleLogin () {
      // window.sessionStorage.clear()
      this.selectedKeys_head = []
    },
    getLoginFlag (val) {
      if (val === 'p') {
        this.loginFlagPlayer = true
        this.loginFlag = true
      } else if (val === 'd') {
        this.loginFlagDeveloper = true
        this.loginFlag = true
      } else if (val === 'a') {
        this.loginFlagAdmin = true
        this.loginFlag = true
      }
    },
    getUserId (val) {
      this.user_id = val
      console.log('app user id', this.user_id)
    },
    handleLogout () {
      this.$http.post('/api/user/logout', null, { headers: { token: window.sessionStorage.getItem('token') } })
      window.sessionStorage.clear()
      this.loginFlagPlayer = false
      this.loginFlagDeveloper = false
      this.loginFlagAdmin = false
      this.loginFlag = false
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>
.home-container {
  text-align: left;
  background: black;
  color: #fff;
  height: 100%;
  width: 100%;
}
.logo {
  height: 32px;
  float: left;
  text-align: center;
  font-family: Calibri;
  font-size: x-large;
  font-weight: bold;
  margin-right: 25px;
}
.login-dropdown {
  float: right;
}
</style>
