<template>
    <div id="app">
      <a-layout class="home-container" style="min-height: 100vh">
        <a-layout-header>
          <div class="logo">GameCenter</div>
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
            <a-button type="dashed" ghost>
              Install GC
            </a-button>
            <a-dropdown placement="bottomCenter" v-if="loginFlag">
              <a class="login-dropdown" @click="e => e.preventDefault()">
                UserSpace
              </a>
              <template v-slot:overlay>
                <a-menu @click="handleLogin">
                  <a-menu-item key="1">
                    <router-link :to="{path:'/user'}" v-if="loginFlagPlayer">My space</router-link>
                    <router-link :to="{path:'/developer'}" v-if="loginFlagDeveloper">My space</router-link>
                    <router-link :to="{path:'/user'}" v-if="loginFlagAdmin">My space</router-link>
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
                    <router-link :to="'/login?role='+'player'">Sign in as Player</router-link>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <router-link :to="'/login?role='+'developer'">Sign in as Developer</router-link>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <router-link :to="'/login?role='+'admin'">Sign in as Admin</router-link>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <router-link to="/register">Register here</router-link>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <router-link to="/user">Test Userspace</router-link>
                  </a-menu-item>
                  <a-menu-item key="6">
                    <router-link to="/developer">Test Developer</router-link>
                  </a-menu-item>
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
  data () {
    return {
      selectedKeys_head: ['1'],
      loginFlag: false,
      loginFlagPlayer: false,
      loginFlagDeveloper: false,
      loginFlagAdmin: false,
      user_id: null
    }
  },
  methods: {
    handleLogin () {
      this.selectedKeys_head = []
    },
    getLoginFlag (val) {
      if (val === 'player') {
        this.loginFlagPlayer = true
        this.loginFlag = true
      } else if (val === 'developer') {
        this.loginFlagDeveloper = true
        this.loginFlag = true
      } else if (val === 'developer') {
        this.loginFlagAdmin = true
        this.loginFlag = true
      }
    },
    getUserId (val) {
      this.user_id = val
      console.log(this.user_id)
    },
    handleLogout () {
      window.sessionStorage.clear()
      this.loginFlagPlayer = false
      this.loginFlagDeveloper = false
      this.loginFlagAdmin = false
      this.loginFlag = false
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
