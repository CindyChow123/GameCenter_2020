<template>
  <div>
    <a-card id="balance-card">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="amount" id="balance" style="margin-left: 40px"/>
    </a-card>
    <a-button ghost type="dashed" style="margin-left: 40px" @click="handleTopUp">
      Add funds to your account
    </a-button>
    <a-modal :visible="visible" title="Top up" @ok="handleOk">
      <a-input-number
        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        :value="amount"
      />
    </a-modal>
    <a-button ghost type="dashed" style="margin-left: 40px">
      View purchase history
    </a-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      amount: 100
    }
  },
  methods: {
    handleTopUp () {
      this.visible = true
    },
    async handleOk () {
      console.log(this.amount)
      const result = await this.$http.post('http://mockjs.docway.net/mock/1a98zbpmUHR/api/user/account/topup', this.amount)
      if (result.status === 200) {
        if (result.data.code === 0) {
          this.$message.success('Top up successfully')
        } else if (result.data.code === -1) {
          this.$message.error(result.data.msg)
        }
      }
      this.amount = result.data.data.amount
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
