<template>
  <div class="page">
    <a-row class="page_header">
      <a-col :span="20" style="padding-right: 30px;">
        <a-avatar shape="square" :size="64" :src="this.path+this.id" style="margin-bottom: 15px;position: absolute" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px">{{ this.name }}</h1>
        <span>Email: {{this.email}}</span>
        <br />
        <span>Bio: {{this.bio}}</span>
      </a-col>
      <a-col :span="4">
        <h1 style="color: white;">Level 0</h1>
        <a-button ghost type="dashed"  @click="$router.push('/user_edit')">
          Edit your profile
        </a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" class="page_content_left">
        <h1 style="color: greenyellow;margin-bottom: 0">Messages</h1>
        <br />
        <a-list item-layout="horizontal" :data-source="msg">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              :description="item.message"
            >
              <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                icon="message"
                style="background: steelblue"
              />
            </a-list-item-meta>
            <a slot="actions" v-if="item.unread === false">Already Read</a>
            <a slot="actions" v-if="item.type === 'friend request' && item.unread === true" @click="item.unread = false; handleApprove(item.source);handleRead(item.id)">Approve</a>
            <a slot="actions" v-if="item.type !== 'friend request' && item.unread === true" @click="item.unread = false; handleRead(item.id)">Mark as Read</a>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="8" class="page_content_right">
        <h1 style="color: white">Others</h1>
        <br />
        <a-button type="primary" style="margin-bottom: 15px;" @click="$router.push({path: '/user_games', query: {user_id: user_id}})">
          My Games
        </a-button>
        <br />
        <a-button type="primary" style="margin-bottom: 15px;" @click="$router.push({path: '/user_collections', query: {user_id: user_id}})">
          My collections
        </a-button>
<!--        <br />-->
<!--        <a-button type="primary" @click="$router.push('/user_wishlist')">-->
<!--          My wishlist-->
<!--        </a-button>-->
        <h1 style="color: white;margin-bottom: 0; margin-top: 20px">Friends</h1>
        <a-list item-layout="horizontal" :data-source="friends" >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <a slot="title" style="color: white">
                <router-link :to="{path: '/user_view', query:{ id:item.id, unfriend: false}}">{{ item.name }}</router-link>
              </a>
              <a-avatar
                slot="avatar"
                :src="'http://10.20.192.29:8080/api/user/avatar/'+item.id"
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
  props: ['user_id'],
  data () {
    return {
      id: null,
      friends: [],
      msg: [],
      name: '',
      email: '',
      path: 'http://10.17.91.184/api/user/avatar/',
      bio: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      // console.log(this.user_id)
      const result = await this.$http.get('/api/user/info')
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      this.friends = result.data.data.friends
      this.id = result.data.data.id
      this.msg = result.data.data.messages
      console.log(this.msg)
      this.name = result.data.data.name
      this.email = result.data.data.email
      this.bio = result.data.data.bio
      // this.path = result.data.data.path
      // console.log(result)
    },
    async handleApprove (iid) {
      const result = await this.$http.post('/api/user/friend/confirm', qs.stringify({ from: iid }))
      // console.log(re)
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
    },
    async handleRead (iid) {
      const result = await this.$http.post('/api/user/message/read', qs.stringify({ id: iid }))
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
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
  margin-bottom: 20px ;
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
