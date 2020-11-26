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
          v-model="tag"
          @click="handleSelect"
        >
          <a-menu-item key="1">
            <a-icon type="smile" />
            <span>All</span>
          </a-menu-item>
          <a-sub-menu key="2">
            <span slot="title"><a-icon type="menu" /><span>Predefined</span></span>
            <a-menu-item key="Racing">
              Racing
            </a-menu-item>
            <a-menu-item key="Adventure">
              Adventure
            </a-menu-item>
            <a-menu-item key="Action">
              Action
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <a-col :span="20" class="game_right">
        <a-list item-layout="horizontal" :data-source="gameList">
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions">Download</a>
            <a slot="actions">More</a>
            <a-list-item-meta :description="item.branch">
              <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                shape="square"
                :size="64"
                :src="'http://10.17.91.184/game/getPhoto/'+item.fi"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tag: [],
      gameList: []
    }
  },
  created () {
    this.getGameInfo(this.tag)
  },
  methods: {
    async getGameInfo (t) {
      if (typeof t === 'object' || t === '1') {
        t = ''
      }
      // console.log(t)
      const result = await this.$http.get('/api/user/game', { params: { tag: t } })
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      var glist = result.data.data
      // console.log(glist)
      for (var i = 0; i < glist.length; i++) {
        this.gameList.push({
          id: glist[i].id,
          name: glist[i].name,
          fi: glist[i].front_image
        })
      }
      console.log(this.gameList)
    },
    handleSelect (val) {
      this.gameList = []
      this.getGameInfo(val.key)
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
