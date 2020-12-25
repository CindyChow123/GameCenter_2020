<template>
  <a-form-model style="margin-left:300px;margin-top:60px;border-radius: 25px; border-style: groove; border-color: cadetblue; width: 700px">
      <a-form-model-item style="margin-top: 50px">
        <strong style="font-size: 25px; color:darkorange; margin-left: 100px">Download the manuals you needed here</strong>
      </a-form-model-item>
      <a-form-model-item>
        <strong style="font-size: 16px; color:white;margin-left: 100px">Player Manual:</strong>
        <p style="font-size: 16px; color:white;margin-left: 150px">This manual will guide the players how to use the platform</p>
        <a-button type="primary" @click="userManual" style="margin-left: 500px">
          Download
        </a-button>
      </a-form-model-item>
      <a-form-model-item>
        <strong style="font-size: 16px; color: white;margin-left: 100px">Developer Manual:</strong>
        <p style="font-size: 16px; color:white;margin-left: 150px">This manual will guide the developers how to use the platform</p>
        <a-button type="primary" @click="developerManual" style="margin-left: 500px">
          Download
        </a-button>
      </a-form-model-item>
    </a-form-model>
</template>

<script>

export default {
  name: 'Support',
  data () {
    return {
    }
  },
  methods: {
    userManual () {
      // window.location.href = 'http://47.115.50.249/api/user/manual?type=user'
      window.open('http://47.115.50.249/api/user/manual?type=user', '_blank')
    },
    developerManual () {
      // window.location.href = 'http://47.115.50.249/api/user/manual?type=developer'
      window.open('http://47.115.50.249/api/user/manual?type=developer', '_blank')
    }
  }
}
</script>

<style>

</style>
