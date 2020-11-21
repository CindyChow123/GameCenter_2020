<template>
  <div id="develop-home">
    <a-row id="develop-home-welcome">
      <a-col :span="24">
        <a-avatar shape="square" :size="64" icon="user" style="margin-bottom: 15px;background: rgba(24,74,110,0.95);position: absolute;" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px;">Welcome! Username</h1>
        <span>Email: xxxx@mail.sustech.edu.cn</span>
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
          :data-source="data"
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
    title: 'State',
    dataIndex: 'state'
  },
  {
    title: 'Progress',
    dataIndex: 'progress'
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
const data = [
  {
    id: 1,
    name: 'Game1',
    type: 'Game',
    state: 'unannounced',
    progress: 'incomplete',
    release: 'unreleased'
  },
  {
    id: 2,
    name: 'dlc2',
    type: 'DLC',
    state: 'unannounced',
    progress: 'incomplete',
    release: 'unreleased'
  }
]
export default {
  props: ['user_id'],
  data () {
    return {
      columns,
      data
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
