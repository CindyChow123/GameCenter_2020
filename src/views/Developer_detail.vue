<template>
<!--  <div style="color: white">{{$route.query.id}}</div>-->
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/developer">Dashboard</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Detail</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="page">
      <a-col :span="6" style="height: 100%;">
        <a-menu
          :default-selected-keys="['1']"
          mode="inline"
          theme="dark"
          style="height: 100%"
        >
          <a-menu-item key="1" >
            <router-link :to="{path: '/developer_detail_store', query: {id:this.id,user_id:this.user_id}}">
              <a-icon type="menu" style="display: inline"/><span>Edit Store Page</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" :disabled="this.hide">
            <router-link :to="{path: '/developer_detail_package', query: {id:this.id,user_id:this.user_id}}">
              <a-icon type="smile" style="display:inline" />
              <span>Upload Game package</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3" :disabled="this.hide">
            <router-link :to="{path: '/developer_detail_dlc', query: {id:this.id,user_id:this.user_id}}">
              <a-icon type="smile" style="display:inline" />
              <span>Create Downloadable Content</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="18">
        <router-view @getId="getIdCreate"></router-view>
      </a-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      user_id: null,
      hide: false
    }
  },
  created () {
    this.getId()
  },
  methods: {
    getId () {
      this.id = this.$route.query.id
      this.user_id = this.$route.query.user
      console.log('my id', this.user_id)
      if (this.id === '-1') {
        this.hide = true
      }
    },
    getIdCreate (val) {
      this.id = val
      if (this.id !== '-1') {
        this.hide = false
      }
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
  min-width: 150vh;
  min-height: 80vh;
}
</style>
