<template>
  <div>
    <a-breadcrumb style="margin-left: 20px;margin-top: 20px">
      <a-breadcrumb-item><router-link to="/user">Userspace</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Wishlist</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="page">
      <a-list item-layout="horizontal" :data-source="data" style="margin-left: 40px;margin-right: 40px;padding-top: 40px">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">
            <a-button type="primary" ghost @click="purchaseConfirm">
              Confirm
            </a-button>
            <a-modal v-model="visible" title="Confirm" @ok="handleOk">
              <a-icon type="question-circle" theme="twoTone" two-tone-color="#eb2f96" style="display:inline"/>
              <span>Are you sure to buy this game?</span>
            </a-modal>
          </a>
          <a-list-item-meta>
            <a slot="title" href="https://www.antdv.com/" style="color: white">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
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
      data,
      visible: false
    }
  },
  methods: {
    purchaseConfirm () {
      this.visible = true
    },
    handleOk () {
      console.log('ok')
      this.visible = false
    }
    // purchaseConfirm () {
    //   this.$confirm({
    //     title: 'Do you Want to buy this game?',
    //     content: '',
    //     onOk () {
    //       console.log('OK')
    //     },
    //     onCancel () {
    //       console.log('Cancel')
    //     },
    //     class: 'test'
    //   })
    // }
  }
}
</script>
<style scoped>
.page {
  background: rgba(18,21,42,0.95);
  margin-top: 5vh;
  margin-left: 20vh;
  margin-right: 20vh;
  /*min-width: 150vh;*/
  /*min-height: 80vh;*/
}
</style>
