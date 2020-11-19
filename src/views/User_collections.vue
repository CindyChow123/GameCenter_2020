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
            <a-icon type="smile" />
            <span>All</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="menu" /><span>Reviews</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="menu" /><span>Screenshots</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="menu" /><span>User Defined</span>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="20"></a-col>
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
