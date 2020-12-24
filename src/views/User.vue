<template>
  <div class="page">
    <a-row class="page_header">
      <a-col :span="18" style="padding-right: 30px;">
        <a-avatar shape="square" :size="64" :src="this.path+this.id" style="margin-bottom: 15px;position: absolute" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px">{{ this.name }}</h1>
        <span>Email: {{this.email}}</span>
        <br />
        <span>Bio: {{this.bio}}</span>
        <br />
        <span>Account Balance: {{this.balance}}</span>
      </a-col>
      <a-col :span="6">
        <h1 style="color: white;">Level 0</h1>
        <a-button ghost type="dashed"  @click="$router.push({path:'/user_edit',query: {role: 'p', 'user': uid}})">
          Edit your profile and Top Up
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
              <a slot="title" style="color: white">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                icon="notification"
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
        <a-button type="primary" style="margin-bottom: 15px;" @click="$router.push({path: '/user_games', query: {user: uid}})">
          My Games
        </a-button>
        <br />
        <a-button type="primary" style="margin-bottom: 15px;" @click="$router.push({path: '/user_collections', query: {user: uid}})">
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
                <router-link :to="{path: '/user_view', query:{ id:item.fr.id, unfriend: false}}">{{ item.fr.name }}</router-link>
              </a>
              <a-avatar
                slot="avatar"
                :src="'http://47.115.50.249/api/user/avatar/'+item.fr.id"
              />
            </a-list-item-meta>
            <a-popover v-model="item.fr.chatVisible" title="Message" trigger="click">
              <a-textarea slot="content" placeholder="write your message here" allow-clear v-model="item.chat"/>
              <a-button type="primary" slot="content" @click="item.inviteVisible = false;handleChat(item.chat,item.fr.name)" style="width: 100%; margin-top: 10px">send</a-button>
              <a-button ghost type="link" shape="circle" style="margin-right: 50px" icon="message">
              </a-button>
            </a-popover>
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
      path: 'http://47.115.50.249/api/user/avatar/',
      bio: '',
      balance: null,
      uid: null
    }
  },
  created () {
    this.uid = this.$route.params.uid
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      console.log('ID:', this.uid)
      const result = await this.$http.get('/api/user/info')
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      console.log(result)
      const frList = result.data.data.friends
      for (var i = 0; i < frList.length; i++) {
        this.friends.push({
          fr: frList[i],
          chatVisible: false,
          chat: ''
        }
        )
      }
      this.id = result.data.data.id
      this.msg = result.data.data.messages
      console.log(this.msg)
      this.name = result.data.data.name
      this.email = result.data.data.email
      this.bio = result.data.data.bio
      this.balance = result.data.data.balance
      // this.path = result.data.data.path
      console.log(this.balance)
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
    },
    async handleChat (msg, name) {
      if (msg === '') {
        return this.$message.error('Message cannot be empty!')
      }
      const result = await this.$http.post('/api/user/friend/chat', qs.stringify({ type: 'chat', message: msg, to: name }))
      // console.log(re)
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      } else {
        return this.$message.success('Send Successfully')
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
