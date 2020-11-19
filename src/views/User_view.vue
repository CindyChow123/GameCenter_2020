<template>
  <!--  <div style="color: white">{{$route.query.id}}</div>-->
  <div class="page">
    <a-row class="page_header">
      <a-col :span="20" style="padding-right: 30px;">
        <a-avatar shape="square" :size="64" icon="user" style="margin-bottom: 15px;background: dodgerblue;position: absolute" />
        <h1 style="color: white;margin-left: 80px;margin-bottom: 20px;padding-top: 20px">Username</h1>
        <span>Email: xxxx@mail.sustech.edu.cn</span>
      </a-col>
      <a-col :span="4">
        <h1 style="color: white;">Level 0</h1>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" class="page_content_left">
        <h1 style="color: white;margin-bottom: 0">Recently played</h1>
        <br />
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
            >
              <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.title }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="8" class="page_content_right">
        <h1 style="color: white;margin-bottom: 0; margin-top: 20px">Friends</h1>
        <a-list item-layout="horizontal" :data-source="data" id="user-friend">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              description="Ant Design"
            >
              <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.title }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default {
  data () {
    return {
      data
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
