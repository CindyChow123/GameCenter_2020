<template>
  <div>
    <a-card id="balance-card">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="amount" id="balance" style="margin-left: 40px"/>
    </a-card>
    <a-button ghost type="dashed" style="margin-left: 40px" @click="handleTopUp">
      Add funds to your account
    </a-button>
    <a-modal :visible="visible" title="Top up" @ok="handleOk" @cancel="handleCan">
      <a-input prefix="￥" suffix="RMB" v-model="temp"/>
    </a-modal>
    <a-button ghost type="dashed" style="margin-left: 40px">
      View purchase history
    </a-button>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      visible: false,
      amount: null,
      temp: null
    }
  },
  created () {
    this.getAcInfo()
  },
  methods: {
    async getAcInfo () {
      const re = await this.$http.get('/api/user/info')
      if (re.status !== 200 || re.data.code !== 0) {
        this.$message.error(re.data.msg)
      } else {
        this.amount = re.data.data.balance
      }
    },
    handleTopUp () {
      this.visible = true
    },
    async handleOk () {
      console.log(this.temp)
      const result = await this.$http.post('/api/user/edit/balance', qs.stringify({ amount: this.temp }))
      if (result.status === 200) {
        if (result.data.code === 0) {
          this.$message.success('Top up successfully')
        } else if (result.data.code === -1) {
          this.$message.error(result.data.msg)
        }
      }
      this.amount = result.data.data
      this.visible = false
    },
    handleCan () {
      this.visible = false
    }
  }
}
</script>
<style>
#balance .ant-statistic-title{
  color: white;
}
#balance .ant-statistic-content-value{
  color: greenyellow;
}
#balance-card {
  background: rgba(15,56,75,0.95);
  margin: 40px;
}
</style>
