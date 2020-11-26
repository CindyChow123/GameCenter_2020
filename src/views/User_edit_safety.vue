<template>
  <div>
    <a-collapse accordion :bordered="false" style="margin-left: 20px">
      <a-collapse-panel key="1" header="Change password" >
        <a-form-model
          id="g-form"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          class="modify"
          layout="vertical"
          style="margin-left: 40px"
        >
          <a-form-model-item ref="old_password" label="Old Password:" prop="old_password">
            <a-input
              type="password"
              class="modify-input"
              v-model="form.old_password"
              @blur="
          () => {
            $refs.old_password.onFieldBlur();
          }
        "
            />
          </a-form-model-item>
          <a-form-model-item ref="new_password" label="New password: " prop="new_password">
            <a-input
              type="password"
              class="modify-input"
              v-model="form.new_password"
              @blur="
          () => {
            $refs.new_password.onFieldBlur();
          }
        "
            />
          </a-form-model-item>
          <a-form-model-item ref="confirm_password" label="Please repeat the new password: " prop="confirm_password">
            <a-input
              type="password"
              class="modify-input"
              v-model="form.confirm_password"
              @blur="
          () => {
            $refs.confirm_password.onFieldBlur();
          }
        "
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="submitForm('ruleForm')">
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="Change email" >
        <a-form-model
          id="e-form"
          ref="emailRuleForm1"
          :model="emailForm"
          :rules="rules"
          class="modify"
          layout="vertical"
          style="margin-left: 40px"
        >
          <a-form-model-item ref="email" label="New Email:" prop="email" >
            <a-input
              class="modify-input"
              v-model="emailForm.email"
              @blur="
          () => {
            $refs.email.onFieldBlur();
          }
        "
            />
            <a-button type="primary" @click="sendConCode('emailRuleForm1')" style="margin-top: 20px">
              Send confirm code
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <a-form-model
          id="ee-form"
          ref="emailRuleForm2"
          :model="emailForm"
          :rules="rules"
          class="modify"
          layout="vertical"
          style="margin-left: 40px"
        >
          <a-form-model-item ref="confirm" label="Enter the confirm code:" prop="confirm">
            <a-input
              class="modify-input"
              v-model="emailForm.confirm"
              @blur="
          () => {
            $refs.confirm.onFieldBlur();
          }
        "
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="submitEmailForm('emailRuleForm2')">
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      other: '',
      form: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: 'Please enter your old password for checking!', trigger: 'change' }
        ],
        new_password: [
          { required: true, message: 'Please enter your new password!', trigger: 'change' }
        ],
        confirm_password: [
          { validator: this.checkRepeat, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input the new email address!', trigger: 'blur' },
          { validator: this.checkEmail, trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: 'Please input the email confirm code!', trigger: 'blur' }
        ]
      },
      emailForm: {
        email: '',
        confirm: ''
      }
    }
  },
  methods: {
    // checkEmail (rule, value, callback) {
    //   var regEmail = /^([A-Za-z0-9_-])+@(mail.sustech.edu.cn|sustech.edu.cn)$/
    //   if (regEmail.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('Invalid Email Address!'))
    //   }
    // },
    checkRepeat (rule, value, callback) {
      // console.log(value)
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.new_password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const result = await this.$http.post('/api/user/edit/password', qs.stringify(this.form))
          if (result.status === 200) {
            if (result.data.code === 0) {
              this.$message.success('Password changed successful')
            } else if (result.data.code === -1) {
              this.$message.error(result.data.msg)
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEmailForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const result = await this.$http.post('/api/user/edit/email/confirm', qs.stringify(this.emailForm))
          if (result.status === 200) {
            if (result.data.code === 0) {
              this.$message.success('Email address changed successfully')
            } else if (result.data.code === -1) {
              this.$message.error(result.data.msg)
            }
          }
        } else {
          this.$message.error('Error in context')
          return false
        }
      })
    },
    sendConCode (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const result = await this.$http.post('/api/user/edit/email', qs.stringify({ email: this.emailForm.email }))
          console.log(result)
          if (result.status === 200) {
            if (result.data.code === 0) {
              this.$message.success('Confirm code sent successfully')
            } else if (result.data.code === -1) {
              this.$message.error(result.data.msg)
            }
          }
        } else {
          this.$message.error('Error submitting, try again please')
          return false
        }
      })
    }
  }
}
</script>
<style>
#g-form .modify-input, #e-form .modify-input, #ee-form .modify-input {
  background: black;
  color: white;
  border-style: dashed;
  border-color: dodgerblue;
}
</style>
