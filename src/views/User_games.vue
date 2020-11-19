<template>
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/user">Userspace</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Games</a-breadcrumb-item>
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
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="menu" /><span>Recent played</span></span>
            <a-menu-item key="2">
              Racing
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="highlight" /><span>User Defined1</span></span>
            <a-menu-item key="3">
              Option 9
            </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="4">
                Option 11
              </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-menu-item key="5">
            <a-icon type="menu" /><span>User Defined2</span>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="20" class="game_right">
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions">Download</a>
            <a slot="actions">More</a>
            <a-list-item-meta>
              <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.title }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </div>
  </div>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default {
  data () {
    return {
      data
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
.game_right{
  background: rgba(18,21,42,0.95);
  margin-top: 0;
  margin-bottom: 0;
  padding-right: 30px;
  padding-left: 30px;
  height: 100%;
}
</style>
