<template>
  <div>
    <a-card id="balance-card">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" id="balance" style="margin-left: 40px"/>
    </a-card>
    <a-button ghost type="dashed" style="margin-left: 40px" >
      Add funds to your account
    </a-button>
    <a-button ghost type="dashed" style="margin-left: 40px">
      View purchase history
    </a-button>
  </div>
</template>
<script>

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
