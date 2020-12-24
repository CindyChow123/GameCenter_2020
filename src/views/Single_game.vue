<template>
  <div>
    <strong style="font-size: 25px; margin-left: 30px; margin-top: 30px">{{ this.game.name }}</strong>
    <br/>
    <a-row type="flex" justify="center" style="margin-top: 30px">
      <a-col :span="7">
        <video ref="video" width="360px" height="238px" controls>
<!--          <source :src="video_url" type="video/mp4">-->
<!--          <source :src="video_url" type="video/ogg"/>-->
<!--          <source :src="video_url" type="video/webm"/>-->
          Your browser does not support the video tag.
        </video>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <div v-for="(pic, index) in pic_url" :key="index">
        <a-col :span="3" style="margin-left: 10px">
          <img :src=pic alt="game line" style="width: 120px; height: 95px">
        </a-col>
      </div>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="6">
        <strong style="font-size: 16px; color: darkorange">Release date</strong>
        <p>{{ this.game.release_date }}</p>
        <strong style="font-size: 16px; color: darkorange">Price </strong>
        <p>${{ this.game.price }}</p>
      </a-col>
      <a-col :span="6">
        <strong style="font-size: 16px; color: darkorange">Score</strong>
        <a-rate style="margin-left: 16px" v-model="game.score" :disabled="true"/>
        <br/>
        <strong style="font-size: 16px; color: darkorange">Discount </strong>
        <p>{{ this.game.discount_rate }} from {{ this.game.discount_start }} to {{ this.game.discount_end }}</p>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="12">
        <strong style="font-size: 16px; color: darkorange">Description</strong>
        <p>
          {{ this.game.description }}
        </p>
      </a-col>
    </a-row>
    <a-button v-if="game_status === 'purchase'" type="primary" style="margin-left: 800px; margin-top: 20px"
              @click="purchaseGame">
      Purchase
    </a-button>
    <a-button v-else type="primary" style="margin-left: 800px; margin-top: 20px" @click="downloadGame">
      Download
    </a-button>
    <br/>
    <a-list v-if="dlc.length > 0" item-layout="horizontal" :data-source="dlc_name" al>
      <strong style="font-size: 25px; margin-left: 300px; color: white">DLC</strong>
      <br/>
      <div v-for="(d, index) in dlc" :key="index" style="margin-left: 300px">
        <a-list-item
          style="border-style:dashed;border-color:cadetblue;margin-top:10px;border-radius: 25px;width:600px;">
          <a-icon type="smile" theme="twoTone" style="margin-left: 15px;margin-right: 5px"/>
          <!--        <span style="color: white;margin-right: 300px">{{dlc_descrip[index]}}</span>-->
          <a-list-item-meta
            :description="dlc_descrip[index]"
            style="margin-left: 10px"
          >
          </a-list-item-meta>
          <!--        <a-button v-if="dlc_status[index] === 0" type="primary" shape="circle" @click="purchaseGame">-->
          <!--          Buy-->
          <!--        </a-button>-->
          <!--        <a-button type="primary" shape="circle" icon="download" :size="size" />-->
        </a-list-item>
      </div>
    </a-list>
    <br/>
    <strong style="font-size: 25px; margin-left: 300px">Comments</strong>
    <br/>
    <div style="margin-left: 300px; margin-top: 20px; width: 600px">
      <a-list
        v-if="comments.length > 0"
        :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
        item-layout="horizontal"
      >
        <div v-for="(comment, index) in comments" :key="index">
          <a-list-item>
            <a-comment
              :author="comment.user_name"
              :avatar="comment_userAvatar[index]"
              :content="comment.content"
              :datetime="comment.createAt"
              style="margin-left: 50px"
            />
            <a-rate :value="comment.grade" :disabled="true"/>
            <a-button type="danger" size="small" style="margin-left: 20px" @click="reportComment(comment.id)">
              Report
            </a-button>
          </a-list-item>
        </div>
      </a-list>
      <a-form :form="commentForm" style="border-style: solid;border-color: dodgerblue;border-radius: 25px;">
        <a-form-item>
          <strong style="font-size: 20px;margin-left:15px;color: cadetblue">Add your comments here</strong>
        </a-form-item>
        <a-form-item>
          <a-form-item>
            <a-textarea
              :rows="2"
              v-model="commentForm.content"
              placeholder="write something to share..."
              style="margin-left:60px;width: 500px"/>
          </a-form-item>
          <a-icon type="star" style="color: yellow; margin-left: 10px"/>
          <strong style="font-size: 16px; margin-left: 5px;margin-right: 5px; color: white">Score</strong>
          <a-icon type="star" style="color: yellow"/>
          <a-select v-model="commentForm.score_comment" style="margin-left: 10px; width: 60px">
            <a-select-option value="1">
              1
            </a-select-option>
            <a-select-option value="2">
              2
            </a-select-option>
            <a-select-option value="3">
              3
            </a-select-option>
            <a-select-option value="4">
              4
            </a-select-option>
            <a-select-option value="5">
              5
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button style="margin-left: 450px" html-type="submit" :loading="submitting" type="primary"
                    @click="submitComments">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import moment from 'moment'

export default {
  inject: ['reload'],
  name: 'single_game',
  data () {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment,
      game: {},
      game_id: 0,
      score: 2,
      pic_url: [],
      balance: 0,
      game_status: 'purchase',
      info_list: [],
      commentForm: {
        score_comment: '',
        content: ''
      },
      gameContent: [],
      game_pic: [],
      game_video: {},
      game_install: {},
      video_url: '',
      dlc: [],
      dlc_name: [],
      dlc_price: [],
      dlc_status: [],
      dlc_descrip: [],
      comment_userAvatar: [],
      user_id: 0
    }
  },
  async created () {
    await this.initialPage()
    await this.gameStatus()
    await this.getScoreComment()
    await this.getDLC()
  },
  // watch: {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //   $route: 'getParams'
  // },
  methods: {
    async initialPage () {
      this.game_id = this.$route.params.sid
      // this.pic_url = 'http://10.17.91.184/game/getPhoto/' + this.game.front_image
      let response = await this.$http.get('/game/info', {
        params: {
          id: this.game_id
        }
      })
      var numPic = 0
      if (response.status === 200 && response.data.code === 0) {
        this.game = response.data.data.game
        this.gameContent = response.data.data.game_content
        console.log('game', this.game)
        console.log('gamecontent', this.gameContent)
        for (var i = 0; i < this.gameContent.length; i++) {
          if (this.gameContent[i].type === 'installation') {
            this.game_install = this.gameContent[i]
          } else if (this.gameContent[i].type === 'video') {
            this.game_video = this.gameContent[i]
            this.video_url = 'http://47.115.50.249/game/download?name=' + this.game_video.name + '&type=video'
            this.$refs.video.src = this.video_url
          } else {
            this.game_pic[numPic] = this.gameContent[i]
            this.pic_url[numPic] = 'http://47.115.50.249/game/getPhoto/' + this.game_pic[numPic].name
            numPic = numPic + 1
          }
        }
        console.log('pic_url', this.pic_url)
      } else {
        // this.$message.error('Error!')
        // this.$message.error(response.data.msg)
        this.$message.error('query info Error!')
      }

      if (window.sessionStorage.getItem('token')) {
        response = await this.$http.get('/api/user/info')
        if (response.status === 200 && response.data.code === 0) {
          // this.profile = response.data.data
          this.balance = response.data.data.balance
          this.user_id = response.data.data.id
        } else {
          // this.$message.error('Error!')
          this.$message.error(response.data.msg)
        }
      }
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
    async gameStatus () {
      // var objj = {
      //   user_id: '',
      //   game_id: this.game.id
      // }
      if (window.sessionStorage.getItem('token')) {
        const response = await this.$http.get('/game/status', {
          params: {
            game_id: this.game.id
          }
        })
        if (response.status === 200 && response.data.code === 0) {
          this.game_status = response.data.data
          // this.profile = response.data.data
        } else {
          // this.$message.error('Error!')
          this.$message.error(response.data.msg)
        }
      }
    },
    purchaseGame () {
      if (window.sessionStorage.getItem('token')) {
        if (this.balance >= this.game.price) {
          var r = confirm('Are you sure to buy this game?')
          if (r === true) {
            this.$http.post('/game/purchase', qs.stringify({
              user_id: this.user_id,
              game_id: this.game.id
            }))
              .then((response) => {
                // if (response.status === 200 && response.code === 0) {
                //   this.$message.success('Create successfully')
                // } else {
                //   this.$message.error('Error!')
                // }
                if (response.status === 200 && response.data.code === 0) {
                  this.$message.success('Purchase successfully')
                  this.game_status = 'download'
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
      } else {
        alert('Please log in first')
      }
    },
    downloadGame () {
      window.location.href = 'http://47.115.50.249/game/download?type=installation&name=' + this.game_install.name
    },
    async getScoreComment () {
      const response = await this.$http.get('/comment/GID/' + this.game.id)
      if (response.status === 200 && response.data.code === 0) {
        this.comments = response.data.data
      } else {
        // this.$message.error('Error!')
        this.$message.error(response.data.msg)
      }
      if (this.comments.length > 0) {
        for (var i = 0; i < this.comments.length; i++) {
          this.comment_userAvatar[i] = 'http://47.115.50.249/api/user/avatar/' + this.comments[i].user_id
        }
      }
    },
    submitComments () {
      if (window.sessionStorage.getItem('token')) {
        var obji = {
          UID: this.user_id,
          GID: this.game.id,
          content: this.commentForm.content,
          grade: Number(this.commentForm.score_comment)
        }
        this.$http.post('/comment', obji)
          .then((response) => {
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
        this.$http.get('/comment/GID/' + this.game.id)
          .then((response) => {
            if (response.status === 200 && response.data.code === 0) {
              this.comments = response.data.data
            } else {
              // this.$message.error('Error!')
              this.$message.error(response.data.msg)
            }
          })
          .catch((error) => {
            console.log(error)
          })
        if (this.comments.length > 0) {
          for (var i = 0; i < this.comments.length; i++) {
            this.comment_userAvatar[i] = 'http://47.115.50.249/api/user/avatar/' + this.comments[i].user_id
          }
        }
        this.reload()
      } else {
        alert('Please log in first')
      }
    },
    async getDLC () {
      const response = await this.$http.get('/game/dlc/list', {
        params: {
          game_id: this.game.id
        }
      })
      if (response.status === 200 && response.data.code === 0) {
        this.dlc = response.data.data
        if (this.dlc.length > 0) {
          for (var i = 0; i < this.dlc.length; i++) {
            this.dlc_name[i] = this.dlc[i].name
            this.dlc_price[i] = 'price: ' + this.dlc[i].price.toString() + '$'
            this.dlc_status[i] = 0
            this.dlc_descrip[i] = 'name: ' + this.dlc[i].name + '  price: $' + this.dlc[i].price.toString()
          }
        }
      } else {
        // this.$message.error('Error!')
        this.$message.error(response.data.msg)
      }
    },
    reportComment (index) {
      this.$http.post('/api/user/comment/report', qs.stringify({
        comment_id: index,
        reason: ''
      }))
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Report successfully')
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // purchaseDLC (index) {
    //   if (this.balance >= this.dlc[index].price) {
    //     var r = confirm('Are you sure to buy this dlc?')
    //     if (r === true) {
    //       this.$http.post('/game/dlc/purchase', qs.stringify({
    //         id: index
    //       }))
    //         .then((response) => {
    //           console.log('purchase dlc success', response.data)
    //           // if (response.status === 200 && response.code === 0) {
    //           //   this.$message.success('Create successfully')
    //           // } else {
    //           //   this.$message.error('Error!')
    //           // }
    //           if (response.status === 200 && response.data.code === 0) {
    //             this.$message.success('Purchase successfully')
    //             this.game_status = 'download'
    //             console.log('game status after buy', this.game_status)
    //           } else {
    //             this.$message.error(response.data.msg)
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //     }
    //   } else {
    //     alert('No sufficient funds')
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
