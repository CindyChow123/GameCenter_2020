<template>
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/user">Userspace</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Edit profile</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="page">
      <a-col :span="4" style="height: 100%;">
        <a-menu
          :default-selected-keys="['1']"
          mode="inline"
          theme="dark"
          style="height: 100%"
        >
          <a-menu-item key="1">
            <router-link to="/user_edit_general">
              <a-icon type="smile" style="display:inline" />
              <span>General</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/user_edit_account">
              <a-icon type="menu" style="display: inline"/><span>Account</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="20">
        <router-view></router-view>
      </a-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.page {
  background: black;
  margin-top: 5vh;
  margin-left: 20vh;
  margin-right: 20vh;
  width: 150vh;
  height: 80vh;
}
</style>
