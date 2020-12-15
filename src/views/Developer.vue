<template>
  <div id="develop-home">
    <a-row id="develop-home-welcome">
      <a-col :span="24">
        <a-avatar shape="square" :size="64" :src="this.path+this.id" style="margin-bottom: 15px;position: absolute;" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px;">Welcome! {{this.name}}</h1>
        <span>Email: {{ this.email }}</span>
        <br />
        <span>Account Balance: {{this.balance}}</span>
      </a-col>
    </a-row>
    <a-divider class="develop-home-divider" />
    <a-row id="develop-home-app">
      <a-col :span="18" id="develop-home-app-left">
        <h1 style="color: aliceblue">My games</h1>
        <a-button ghost type="dashed"  @click="$router.push({path: '/developer_detail', query: {id: '-1',user_id: user_id}})" style="display: inline;margin-bottom: 10px">
          Create a new game
        </a-button>
        <a-table
          :columns="columns"
          :data-source="gameList"
          id="develop-home-app-left-table"
          :pagination="false"
          rowKey="id"
        >
            <span slot="operation" slot-scope="text, record">
            <router-link :to="{path: '/developer_detail', query:{ id:record.id, user_id: user_id}}">View Detail</router-link>
          </span>
        </a-table>
      </a-col>
      <a-col :span="6" id="develop-home-app-right">
        <a-row style="background: rgba(8,25,37,0.95);padding-bottom: 15px">
          <h1 style="background: rgba(229,234,71,0.95);">GameCenter SDK v1.0</h1>
          <a-button type="primary" ghost>
            Download latest SDK
          </a-button>
          <a-divider class="develop-home-divider"/>
          <router-link to="/support">View SDK documentation</router-link>
        </a-row>
        <a-row style="margin-top: 20px;background: rgba(8,25,37,0.95);padding-bottom: 15px;margin-bottom: 20px">
          <h1 style="color: aliceblue;">Tools</h1>
          <router-link to="/developer_finance">View Financial data</router-link>
          <br />
          <router-link to="/developer_finance">View Player artwork</router-link>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from 'moment'
const columns = [
  {
    title: 'Game Name',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 150
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    width: 150
  },
  {
    title: 'Announce Date',
    dataIndex: 'announce'
  },
  {
    title: 'Release Date',
    dataIndex: 'release'
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  props: ['user_id'],
  data () {
    return {
      columns,
      name: '',
      email: '',
      path: 'http://10.17.91.184/api/user/avatar/',
      id: null,
      gameList: [],
      glist: [],
      balance: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const result = await this.$http.get('/api/user/info')
      const res = await this.$http.get('/api/developer/game')
      console.log(res)
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      if (res.status !== 200 || res.data.code !== 0) {
        return this.$message.error(res.data.msg)
      }
      this.name = result.data.data.name
      this.email = result.data.data.email
      this.id = result.data.data.id
      this.balance = result.data.data.balance
      this.glist = res.data.data
      // console.log(this.glist.length)
      for (var i = 0; i < this.glist.length; i++) {
        var g = this.glist[i].id
        // console.log(g)
        const ginfo = await this.$http.get('/game/info', { params: { id: g } })
        if (result.status !== 200 || result.data.code !== 0) {
          return this.$message.error(result.data.msg)
        }
        // console.log(ginfo)
        // eslint-disable-next-line no-unused-vars
        var r = ginfo.data.data.game.release_date
        // eslint-disable-next-line no-unused-vars
        var a = ginfo.data.data.game.announce_date
        // console.log(moment().diff(moment(ginfo.data.data.game.announce_date, 'YYYY-MM-DD'), 'days'))
        // console.log(moment(ginfo.data.data.game.announce_date, 'YYYY-MM-DD').diff(moment(), 'days'))
        if (moment(ginfo.data.data.game.announce_date, 'YYYY-MM-DD').diff(moment(), 'days') <= 0) {
          a = 'announced'
        }
        if (moment(ginfo.data.data.game.release_date, 'YYYY-MM-DD').diff(moment(), 'days') <= 0) {
          r = 'released'
        }
        this.gameList.push({
          announce: a,
          id: g,
          name: ginfo.data.data.game.name,
          branch: ginfo.data.data.game.branch,
          type: 'DLC',
          release: r
        })
      }
      // console.log(this.gameList)
    }
  }
}
</script>
<style scoped>
#develop-home {
  margin: 40px;
  background: rgba(35,45,70,0.95)
}
#develop-home-welcome {
  padding: 30px;
}
#develop-home .develop-home-divider {
  margin: 10px 0;
}
#develop-home-app-right {
  text-align: center;
  padding-top: 40px;
  padding-right: 20px;
}
#develop-home-app-left {
  padding: 30px;
}
</style>
