<template>
  <div>
    <a-row v-if="this.$route.query.type==='picture'">
      <a-col :span="6" style="background: greenyellow;margin: 20px" v-for="item in picList" :key="item.id">
        <a-card hoverable id="pic">
          <img
            slot="cover"
            alt="example"
            :src="'http://10.17.91.184/api/user/collection/download'+item.path"
          />
          <a-card-meta :title="item.title" :description="item.description">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-row v-if="this.$route.query.type==='video'">
      <a-col :span="6" style="margin: 20px" v-for="item in viList" :key="item.id">
        <video :src="item.path" controls preload="load" height="128px"></video>
        <h2 style="color: aliceblue;margin: 0;text-align: center">{{item.title}}</h2>
        <span style="color: lightblue;text-align: center;width: 228px;display: inline-block">{{item.description}}</span>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      // picList: [
      //   {
      //     id: 1,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   },
      //   {
      //     id: 2,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   },
      //   {
      //     id: 3,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   },
      //   {
      //     id: 4,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   },
      //   {
      //     id: 5,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   },
      //   {
      //     id: 6,
      //     path: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      //     title: 'Some game',
      //     description: 'This game is awesome'
      //   }
      // ],
      picList: [],
      viList: [
        {
          id: 1,
          path: 'https://www.sustech.edu.cn/wp-content/uploads/物理系林君浩团队在本征磁性拓扑绝缘体表面精细结构表征研究中取得重要进展.mp4',
          title: 'Some game',
          description: 'This game is awesome'
        },
        {
          id: 2,
          path: 'https://www.sustech.edu.cn/wp-content/uploads/物理系林君浩团队在本征磁性拓扑绝缘体表面精细结构表征研究中取得重要进展.mp4',
          title: 'Some game',
          description: 'This game is awesome'
        }
      ],
      type: null
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getResource()
  },
  methods: {
    async getResource () {
      // console.log(this.type)
      const result = await this.$http.get('/api/user/collection', qs.stringify(this.type))
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      this.picList = result.data.data
      console.log(this.picList)
    }
  }
}
</script>
<style>
#pic .ant-card-body {
  padding: 10px;
}
#video .ant-card-body {
  padding: 10px;
}
</style>
