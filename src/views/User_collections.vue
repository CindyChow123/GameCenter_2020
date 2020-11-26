<template>
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/user">Userspace</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Collections</a-breadcrumb-item>
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
            <router-link :to="{path: '/user_collections_comments', query: {user_id:this.$route.query.user_id}}">
              <a-icon type="message" style="display: inline"/><span>My Comments</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="{path: '/user_collections_shots', query: {user_id:this.$route.query.user_id, type:'p'}}">
              <a-icon type="camera" style="display: inline"/><span>My Screenshots</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link :to="{path: '/user_collections_shots', query: {user_id:this.$route.query.user_id, type:'v'}}">
              <a-icon type="play-square" style="display: inline"/><span>My Screenshots</span>
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
  background: rgba(18,21,42,0.95);
  margin-top: 5vh;
  margin-left: 20vh;
  margin-right: 20vh;
  width: 150vh;
  height: 80vh;
}
</style>
