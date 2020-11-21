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
      const { data: res } = await this.$http.post('http://mockjs.docway.net/mock/1a98zbpmUHR/api/user/account/topup', this.amount)
      this.amount = res.data.amount
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
