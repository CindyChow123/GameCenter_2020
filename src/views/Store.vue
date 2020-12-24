<template>
  <div>
    <div style="margin: auto; text-align: center;">
      <a-carousel style="width: 450px; display: inline-block;" arrows autoplay>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px; zIndex: 1">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <div><img src="header1.png" alt="Game Pic"></div>
        <div><img src="header2.jpg" alt="Game Pic"></div>
        <div><img src="header1.png" alt="Game Pic"></div>
        <div><img src="header2.jpg" alt="Game Pic"></div>
      </a-carousel>
    </div>
    <a-input-search placeholder="search the game" style="width: 200px; margin-left: 900px; margin-top: 10px" @search="onSearch" />
    <br />
    <a-button type="primary" size="large" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'right-circle' : 'left-circle'" />
    </a-button>
    <a-row>
      <a-col :span="6">
        <div style="width: 256px">
      <a-menu
        style="height: 600px"
        :default-selected-keys="['All Games']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        @click="handleClick"
        v-model="menu_key"
      >
        <a-menu-item key="All Games">
          <a-icon type="star" />
          <span>All Games</span>
        </a-menu-item>
        <a-menu-item key="Action">
          <a-icon type="star" />
          <span>Action</span>
        </a-menu-item>
        <a-menu-item key="Adventure">
          <a-icon type="star" />
          <span>Adventure</span>
        </a-menu-item>
        <a-menu-item key="Casual">
          <a-icon type="star" />
          <span>Casual</span>
        </a-menu-item>
        <a-menu-item key="Racing">
          <a-icon type="star" />
          <span>Racing</span>
        </a-menu-item>
      </a-menu>
    </div>
      </a-col>
<!--      <a-col :span="18">-->
        <strong style = "font-size: 25px;">{{this.menu_key[0]}}</strong>
        <br />
        <div v-for="(game, index) in games" :key="index">
          <a-col :span="6">
            <router-link :to="`/single_game/${game.id}`">
              <a-card hoverable style="width: 200px;margin-top:20px;margin-left: 20px">
                <img
                  slot="cover"
                  alt="example"
                  :src="urls[index]"
                  height="100" width="100"
                />
              <a-card-meta :title="game.name" description="xxxxxxxx">
              </a-card-meta>
              </a-card>
            </router-link>
          </a-col>
<!--          <div v-if="(index+1) % 3 === 0">-->
<!--            <br />-->
<!--          </div>-->
<!--          <p>{{index}}</p>-->
        </div>
<!--        <br />-->
<!--        <br />-->
<!--        <a-pagination-->
<!--          :default-current="1"-->
<!--          :total="90"-->
<!--          :defaultPageSize="9"-->
<!--          style="margin-left: 700px; margin-top: 50px"-->
<!--          @change="onChange"-->
<!--        />-->
<!--      </a-col>-->
    </a-row>
    <br />
      <br />
      <a-pagination
        :default-current="1"
        :total="90"
        :defaultPageSize="9"
        style="margin-left: 700px; margin-top: 50px"
        @change="onChange"
      />
  </div>
</template>

<script>
// // @ is an alias to /src

export default {
  name: 'Store',
  components: {
  },
  data () {
    return {
      menu_key: ['All Games'],
      collapsed: false,
      num_pages: 10,
      current: 1,
      games: [],
      urls: {},
      target_game: {},
      search_game: ''
    }
  },
  mounted () {
    this.UpdateGate(this.menu_key[0])
  },
  methods: {
    // goToSDetails (id) {
    //   this.$router.push({
    //     path: '/single_game',
    //     query: {
    //       nameId: this.list[id].nameCn
    //     }
    //   })
    // },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    // onChange (a, b, c) {
    //   console.log(a, b, c)
    // },
    onSearch (value) {
      this.$http.get('/game/list', {
        params: {
          tag: '',
          name: value,
          page: this.current - 1
        }
      })
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            this.games = response.data.data.content
            for (let i = 0; i < this.games.length; i++) {
              this.urls[i] = 'http://47.115.50.249/game/getPhoto/' + this.games[i].front_image
            }
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleClick (e) {
      this.menu_key[0] = e.key
      this.UpdateGate(this.menu_key[0], this.current)
    },
    onChange (current) {
      this.current = current
      this.UpdateGate(this.menu_key[0], this.current)
    },
    UpdateGate (menu, pagee) {
      var tmp = menu
      if (menu === 'All Games') {
        tmp = ''
      }
      this.$http.get('/game/list', {
        params: {
          tag: tmp,
          name: '',
          page: this.current - 1
        }
      })
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            this.games = response.data.data.content
            console.log('games', this.games)
            for (let i = 0; i < this.games.length; i++) {
              this.urls[i] = 'http://47.115.50.249/game/getPhoto/' + this.games[i].front_image
            }
          } else {
            // this.$message.error('Error!')
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
  .home-container {
    text-align: left;
    background: black;
    color: #fff;
    height: 100%;
    /*width: 100%;*/
  }

  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 300px;
    line-height: 300px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }

  h3 {
    color: #fff;
  }
</style>
