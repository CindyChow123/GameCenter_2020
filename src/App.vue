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
              <router-link to="/community">Community</router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/support">Support</router-link>
            </a-menu-item>
            <a-button type="dashed" ghost>
              Install GC
            </a-button>
            <a-dropdown placement="bottomCenter">
              <a class="login-dropdown" @click="e => e.preventDefault()">
                Login
              </a>
              <template v-slot:overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <router-link to="/login">Sign in as Player</router-link>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <router-link to="/login">Sign in as Developer</router-link>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <router-link to="/login">Sign in as Admin</router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-menu>
        </a-layout-header>
        <a-layout-content style="background: black">
          <router-view/>
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
      selectedKeys_head: ['1']
    }
  },
  components: {
  },
  methods: {
    // gotoStore () {
    //   this.$router.push('/')
    // },
    // gotoSupport () {
    //   this.$router.push('/support')
    // },
    // gotoCommunity () {
    //   this.$router.push('/community')
    // }
  }
}
</script>

<style>
.home-container {
  text-align: left;
  background: black;
  color: #fff;
  height: 100vh;
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
