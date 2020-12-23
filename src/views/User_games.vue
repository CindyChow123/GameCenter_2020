<template>
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/user">Userspace</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Games</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="page">
      <a-col :span="4" style="height: 100%;">
        <a-menu
          :default-selected-keys="['all']"
          mode="inline"
          theme="dark"
          style="height: 100%"
          v-model="tag"
          @click="handleSelect"
        >
          <a-menu-item key="all">
            <a-icon type="smile" />
            <span>All</span>
          </a-menu-item>
          <a-menu-item v-for="item in menuList" :key="item">
            <a-icon type="fire" />
            <span>{{item}}</span>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="20" class="game_right">
        <a-list item-layout="horizontal" :data-source="gameList">
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions">
              <a-button ghost type="link" shape="circle" icon="download" @click="handleDownload(item.id)"></a-button>
            </a>
            <a slot="actions">
              <a-popover v-model="item.inviteVisible" title="Invitation" trigger="click">
                <a-select placeholder="Please select a tag" v-model="friTag" style="width: 100%; margin-bottom: 20px" slot="content">
                  <a-select-option v-for="fri in friTags" :key="fri.name">
                    {{ fri.name }}
                  </a-select-option>
                </a-select>
                <a-button type="primary" slot="content" @click="item.inviteVisible = false;handleInvite(item.id, friTag)" style="width: 100%; margin-top: 10px">send</a-button>
                <a-button ghost type="link" shape="circle">
                  Invite a friend to play
                </a-button>
              </a-popover>
            </a>
            <a-list-item-meta :description="item.branch">
              <a slot="title" @click="handleGame(item.id)" style="color: white">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                shape="square"
                :size="64"
                :src="'http://47.115.50.249/game/getPhoto/'+item.fi"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      tag: [],
      gameList: [],
      friTags: [],
      friTag: 'Please select a friend',
      menuList: null
    }
  },
  created () {
    // console.log(this.$route.query.user)
    this.getGameInfo(this.tag)
    this.getTag()
    this.getFriend()
  },
  methods: {
    async getGameInfo (t) {
      if (typeof t === 'object' || t === 'all') {
        t = ''
      }
      // console.log(t)
      const result = await this.$http.get('/api/user/game', { params: { tag: t } })
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      var glist = result.data.data
      // console.log('original list:', glist)
      for (var i = 0; i < glist.length; i++) {
        this.gameList.push({
          id: glist[i].id,
          name: glist[i].name,
          fi: glist[i].front_image,
          inviteVisible: false
        })
      }
      // console.log(this.gameList)
    },
    async getTag () {
      const re = await this.$http.get('/api/user/game/tag')
      console.log(re)
      if (re.status !== 200 || re.data.code !== 0) {
        return this.$message.error(re.data.msg)
      }
      this.menuList = re.data.data
    },
    async getFriend () {
      const re = await this.$http.get('/api/user/info')
      console.log(re)
      if (re.status !== 200 || re.data.code !== 0) {
        return this.$message.error(re.data.msg)
      }
      this.friTags = re.data.data.friends
    },
    handleSelect (val) {
      this.gameList = []
      this.getGameInfo(val.key)
    },
    async handleInvite (game, name) {
      console.log(name)
      const result = await this.$http.post('/api/user/friend/chat', qs.stringify({ type: 'invitation', message: game, to: name }))
      // console.log(re)
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      } else {
        return this.$message.success('Send Successfully')
      }
    },
    async handleDownload (game) {
      const result = await this.$http.get('/game/info', { params: { id: game } })
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      // console.log(file)
      var gcObject = result.data.data.game_content
      const len = gcObject.length
      var i
      // var re
      for (i = 0; i < len; i++) {
        if (gcObject[i].type === 'installation') {
          window.location.href = 'http://47.115.50.249/game/download/?name=' + gcObject[i].name + '&type=installation'
          console.log(gcObject[i])
        }
      }
    },
    async handleGame (game) {
      const re = await this.$http.get('/game/info', { params: { id: game } })
      if (re.status !== 200 || re.data.code !== 0) {
        return this.$message.error(re.data.msg)
      }
      // console.log(re)
      await this.$router.push({
        path: '/single_game',
        query: { target_game: re.data.data.game }
      })
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
