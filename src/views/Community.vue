<template>
  <div class="card-container" style="padding: 50px 100px;">
    <a-tabs type="card" :tab-position="top" style="color: white">
      <a-tab-pane key="1" tab="All">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="contents">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card hoverable :title="item.title" @click="showDetail">
              {{item.pic}}
            </a-card>
            <a-modal
              title="Title"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <p>{{ ModalText }}</p>
            </a-modal>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Screenshots">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="contents">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card hoverable :title="item.title">
              {{item.pic}}
            </a-card>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Review">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="contents">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card hoverable :title="item.title">
              {{item.pic}}
            </a-card>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const contents = [
  {
    title: '1',
    pic: 'www'
  },
  {
    title: '2',
    pic: 'www'
  },
  {
    title: '3',
    pic: 'www'
  },
  {
    title: '4',
    pic: 'www'
  }
]
export default {
  name: 'Community',
  data () {
    return {
      contents,
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showDetail () {
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>

<style>
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
  color: white;
}
.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: black;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: cornflowerblue;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: cornflowerblue;
  background:black;
}
</style>
