<template>
<div>
  <a-breadcrumb separator=">" style="color: white; margin-top: 10px; margin-left: 10px">
    <router-link to="/store">
      <a-breadcrumb-item style="color: white">Store</a-breadcrumb-item>
    </router-link>
    <router-link to="/racing">
      <a-breadcrumb-item style="color: white">Racing</a-breadcrumb-item>
    </router-link>
    <a-breadcrumb-item style="color: white">{{this.game.name}}</a-breadcrumb-item>
  </a-breadcrumb>
  <a-row type="flex" justify="center" align="top" style="margin-top: 30px">
    <a-col :span="6.5">
      <img :src="this.game_url" alt="game line" style="width: 350px; height: 238px">
    </a-col>
    <a-col :span="6.5">
      <video width="350px" height="238px" controls>
        <source src="https://www.sustech.edu.cn/wp-content/uploads/物理系林君浩团队在本征磁性拓扑绝缘体表面精细结构表征研究中取得重要进展.mp4" type="video/mp4">
        <source src="https://www.sustech.edu.cn/wp-content/uploads/物理系林君浩团队在本征磁性拓扑绝缘体表面精细结构表征研究中取得重要进展.mp4" type="video/ogg" />
        <source src="https://www.sustech.edu.cn/wp-content/uploads/物理系林君浩团队在本征磁性拓扑绝缘体表面精细结构表征研究中取得重要进展.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="13">
      <strong style="font-size: 16px">Score</strong>
      <a-rate style="margin-left: 16px" v-model="score" />
      <br />
      <br />
      <strong style="font-size: 16px">Description</strong>
      <br />
      <p>price: {{this.game.price}}</p>
      <p>
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxx
      </p>
      </a-col>
  </a-row>
  <a-button v-if="game_status === 'purchase'" type="primary" style="margin-left: 800px; margin-top: 20px" @click="purchaseGame">
    Purchase
  </a-button>
  <a-button v-else-if="game_status === 'download'" type="primary" style="margin-left: 800px; margin-top: 20px" @click="downloadGame">
    Download
  </a-button>
  <a-button v-else type="primary" style="margin-left: 800px; margin-top: 20px" disabled="true" @click="downloadGame">
    Download
  </a-button>
  <br />
  <strong style="font-size: 25px; margin-left: 300px">Comments</strong>
  <br />
  <div style="margin-left: 300px; margin-top: 20px; width: 600px">
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <div v-for="(comment, index) in comments" :key="index">
        <a-list-item slot="renderItem" slot-scope="comment">
          <a-comment
            :author="comment.user_name"
            :avatar="comment.avatar"
            :content="comment.content"
            :datetime="comment.datetime"
          />
        </a-list-item>
        <br />
        <a-rate :value="comment.grade" />
      </div>
    </a-list>
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form :form="commentForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item>
            <strong style="font-size: 16px">Score</strong>
            <a-rate style="margin-left: 16px" v-model="this.commentForm.score" />
          </a-form-item>
          <a-form-item>
            <a-textarea :rows="4" v-model="this.commentForm.content" />
          </a-form-item>
          <a-form-item>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="submitComments">
              Add Comment
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-comment>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'single_game',
  data () {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment,
      game: {},
      score: 2,
      game_url: '',
      balance: 0,
      game_status: 'purchase',
      info_list: [],
      commentForm: {
        score: 0,
        content: ''
      }
    }
  },
  created () {
    this.initialPage()
    this.gameStatus()
    this.getScoreComment()
  },
  // watch: {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //   $route: 'getParams'
  // },
  methods: {
    initialPage () {
      console.log('router query here', this.$route.query.target_game)
      this.game = this.$route.query.target_game
      console.log('pass game here', this.game)
      this.game_url = 'http://10.17.91.184/game/getPhoto/' + this.game.front_image
      console.log('game_url', this.game_url)
    },
    // getParams () {
    //   console.log('which game is here', this.$route.query.which_game)
    //   var routerParams = this.$route.query.which_game
    //   console.log('传来的参数==' + routerParams)
    //   this.game = routerParams
    // },
    handleSubmit () {
      if (!this.value) {
        return
      }

      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ]
        this.value = ''
      }, 1000)
    },
    handleChange (e) {
      this.value = e.target.value
    },
    gameStatus () {
      // var objj = {
      //   user_id: '',
      //   game_id: this.game.id
      // }
      this.$http.get('/game/status', {
        headers: {
          token: '4abb359b-81ab-4fb2-9717-36e3ac67d728'
        },
        params: {
          game_id: this.game.id
        }
      })
        .then((response) => {
          console.log(response.data.data)
          if (response.status === 200 && response.data.code === 0) {
            console.log('query status return', response.data.data)
            this.$message.success('Query successfully')
            this.game_status = response.data.data
            console.log('query status', this.game_status)
            // this.profile = response.data.data
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    purchaseGame () {
      var objj = {
        token: ''
      }
      this.$http.get('/api/user/info', objj)
        .then((response) => {
          console.log(response.data.data)
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Query successfully')
            // this.profile = response.data.data
            this.balance = response.data.data.balance
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      if (this.balance >= this.game.price) {
        var r = confirm('Are you sure to buy this game?')
        if (r === true) {
          var obji = {
            user_id: 15752,
            game_id: this.game.id
          }
          this.$http.post('/game/purchase', obji)
            .then((response) => {
              console.log(response.data)
              // if (response.status === 200 && response.code === 0) {
              //   this.$message.success('Create successfully')
              // } else {
              //   this.$message.error('Error!')
              // }
              if (response.status === 200 && response.data.code === 0) {
                this.$message.success('Purchase successfully')
              } else {
                this.$message.error(response.data.msg)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      } else {
        alert('No sufficient funds')
      }
    },
    downloadGame () {
      var objj = {
        user_id: '',
        game_id: this.game.id
      }
      this.$http.get('/game/download', objj)
        .then((response) => {
          console.log(response.data.data)
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Download successfully')
            // this.profile = response.data.data
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getScoreComment () {
      this.$http.get('/comment/GID/' + this.game.id)
        .then((response) => {
          console.log(response.data.data)
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Query comments successfully')
            this.comments = response.data.info_list

            // this.profile = response.data.data
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submitComments () {
      var obji = {
        user_id: '',
        game_id: this.game.id,
        comments: this.commentForm.content,
        score: this.commentForm.score
      }
      this.$http.post('/comment/submit', obji)
        .then((response) => {
          console.log(response.data)
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Submit comment successfully')
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
