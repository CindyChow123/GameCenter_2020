<template>
  <!--  <div style="color: white">{{$route.query.id}}</div>-->
  <div class="page">
    <a-row class="page_header">
      <a-col :span="18" style="padding-right: 30px;">
        <a-avatar shape="square" :size="64" :src="'http://10.17.91.184/api/user/avatar/'+this.$route.query.id" style="margin-bottom: 15px;position: absolute" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px">{{ this.name }}</h1>
        <span>Email: {{this.email}}</span>
      </a-col>
      <a-col :span="6">
        <h1 style="color: white;">Level 0</h1>
        <a-button ghost type="dashed"  @click="HandleFriendReq" v-if="this.unfr">
          Add to friend list and Invite to play
        </a-button>
        <a-button ghost type="dashed" v-else>
          Already friended
        </a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" class="page_content_left">
        <h1 style="color: white;margin-bottom: 0">Recently played</h1>
        <br />
        <a-list item-layout="horizontal" :data-source="recent_games">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
            >
              <a slot="title" style="color: white">
                <router-link :to="'/user_view?id='+item.id">{{ item.name }}</router-link>
              </a>
              <a-avatar
                shape="square"
                slot="avatar"
                :size="64"
                :src="item.front_image"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="8" class="page_content_right">
        <h1 style="color: white;margin-bottom: 0; margin-top: 20px">Friends</h1>
        <a-list item-layout="horizontal" :data-source="friends" >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <a slot="title" style="color: white">
                <router-link :to="'/user_view?id='+item.id">{{ item.name }}</router-link>
              </a>
              <a-avatar
                slot="avatar"
                :src="item.path"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      id: null,
      friends: [],
      recent_games: [],
      name: '',
      email: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      console.log('search_id', this.$route.query.id)
      this.unfr = this.$route.query.unfriend !== 'false'
      this.id = this.$route.query.id
      const result = await this.$http.get('/api/user', { params: { user_id: this.$route.query.id } })
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      this.friends = result.data.data.friends
      const glist = result.data.data.games
      // console.log(glist)
      for (var g in glist) {
        // console.log(g)
        const ginfo = await this.$http.get('/game/info', { params: { id: g } })
        if (result.status !== 200 || result.data.code !== 0) {
          return this.$message.error(result.data.msg)
        }
        this.recent_games.push(ginfo.data.data.game)
      }
      // console.log(this.recent_games)
      this.name = result.data.data.name
      this.email = result.data.data.email
      this.path = result.data.data.path
      // console.log(result)
    },
    async HandleFriendReq () {
      this.unfr = false
      const result = await this.$http.post('/api/user/friend/request', qs.stringify({ user_name: this.name }))
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      return this.$message.success('Successful approval')
      // console.log(result)
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
  min-width: 150vh;
  min-height: 80vh;
}
.page_header{
  background: rgba(18,21,42,0.95);
  color: white;
  min-height: 30%;
  padding-top: 30px;
  padding-left: 30px;
}
.page_content_left{
  background: rgba(18,21,42,0.95);
  margin-top: 0;
  margin-bottom: 0;
  padding-right: 30px;
  padding-left: 30px;
  min-height: 100%;
}
.page_content_right{
  background: rgba(18,21,42,0.95);
  margin-top: 0;
  margin-bottom: 0;
  min-height: 100%;
}
#app > section > main > div > div.page_header > div > div.ant-statistic-content > span.ant-statistic-content-value > span{
  color: white;
}
#app > section > main > div > div:nth-child(2) > div.page_content_left.ant-col.ant-col-16 > div > div > div > ul > li > div > div.ant-list-item-meta-content > div{  color: white;
}
</style>
