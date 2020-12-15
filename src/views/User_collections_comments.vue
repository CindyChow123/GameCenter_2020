<template>
  <a-list
    id="comment-list"
    :header="`${comList.length} comments`"
    item-layout="horizontal"
    :data-source="comList"
    style="margin-left: 20px"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-col span="1">
        <a-avatar shape="square" :size="64" :src="'http://10.17.91.184/game/getPhoto/'+item.fi" />
      </a-col>
      <a-col span="15">
        <a-comment id="comment">
          <a slot="author" style="font-size: large;color: greenyellow;" @click="handleGame(item.game_id)">{{item.name}}</a>
          <p slot="content" style="color: aliceblue;">
            {{ item.content }}
          </p>
<!--          <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">-->
<!--            <span>{{ item.datetime.fromNow() }}</span>-->
<!--          </a-tooltip>-->
        </a-comment>
      </a-col>
      <a-col>
        <a-rate v-model="item.grade" disabled allow-half style="margin-right: 15px" />
      </a-col>
    </a-list-item>
  </a-list>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      data: [
        {
          grade: 5.0,
          name: 'Game 1',
          content:
            'We supply a series of design principles.',
          datetime: moment().subtract(1, 'days')
        },
        {
          grade: 3.5,
          name: 'Game 2',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days')
        }
      ],
      moment,
      user: null,
      comList: []
    }
  },
  created () {
    console.log(this.$route.query.user)
    this.getComments()
  },
  methods: {
    async getComments () {
      this.user = this.$route.query.user
      console.log(this.user)
      const result = await this.$http.get('/comment/UID')
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      var cList = result.data.data
      var it
      for (var i = 0; i < cList.length; i++) {
        it = await this.$http.get('/game/info', { params: { id: cList[i].id } })
        if (it.status !== 200 || it.data.code !== 0) {
          return this.$message.error(it.data.msg)
        }
        // console.log(it.data.data.game.front_image)
        cList[i].name = it.data.data.game.name
        cList[i].fi = it.data.data.game.front_image
        cList[i].datatime = moment().subtract(1, 'days')
      }
      console.log('here', cList)
      this.comList = cList
      console.log(this.comList)
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
<style>
#comment .ant-comment-content-author-name {
  font-size: large;
  color: greenyellow;
}
#comment-list .ant-list-header {
  color: indianred;
}
</style>
