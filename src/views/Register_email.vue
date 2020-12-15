<template>
  <div>
    <a-form-model :model = "form" style="margin-left: 200px;margin-right: 200px; margin-top: 100px">
      <a-form-model-item>
        <p style="color: white; margin-left: 300px;font-size: 25px">
          E-mail Confirmation
        </p>
        <p style="color: white; margin-left: 30px">
          We have sent an account activation code to your e-mail box. Please enter the activation code in
          the input box below
        </p>
      </a-form-model-item>
      <a-form-model-item style="width: 300px; margin-left: 275px">
      <a-input v-model="form.confirm" placeholder="Activation code"/>
    </a-form-model-item>
    <a-form-model-item style="margin-left: 600px">
      <a-button type="primary" @click="onSubmit">
        Submit
      </a-button>
    </a-form-model-item>
    <a-form-model-item>
      <a-button style="margin-left: 10px" @click="reSend">
        resend code
      </a-button>
    </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Register_email',
  data () {
    return {
      form: {
        confirm: ''
      },
      email: ''
    }
  },
  created () {
    this.initialPage()
  },
  methods: {
    initialPage () {
      console.log('router query here', this.$route.query.target_email)
      this.email = this.$route.query.target_email
      console.log('email!', this.email)
    },
    onSubmit () {
      console.log('submit!', this.form)
      console.log('submit email!', this.email)
      var objc = {
        email: this.email,
        confirm: parseInt(this.form.activation)
      }
      objc = qs.stringify(objc)
      this.$http.post('/api/user/register/confirm', objc)
        .then((response) => {
          console.log(response)
          if (response.status === 200 && response.code === 0) {
            this.$message.success('Activate successfully')
          } else {
            // that.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    reSend () {
      console.log('submit!', this.form)
      var objc = {
        email: this.email
      }
      objc = qs.stringify(objc)
      this.$http.post('/api/user/register/resend', objc)
        .then((response) => {
          console.log(response)
          if (response.status === 200 && response.code === 0) {
            this.$message.success('Activate successfully')
          } else {
            // that.$message.error('Error!')
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

</style>
