<template>
  <div>
    <a-form-model
      id="g-form"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      class="modify"
      layout="vertical"
      style="margin-left: 40px"
    >
      <h1 style="color: rgba(238,137,61,0.95)">Requirement</h1>
      <span style="color: rgba(210,121,53,0.95)">The requirements for uploading file.</span>
      <a-divider style="margin: 2px 0;background: #999999" />
      <a-form-model-item ref="package" label="The game file package:" prop="package" style="border-bottom: 1px solid #2a8be454">
        <a-upload
          action="http://mockjs.docway.net/mock/1a98zbpmUHR/game/upload"
          :default-file-list="FileList"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        announce: null,
        release: null
      },
      rules: {
      },
      FileList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500' // custom error message to show
        }
      ]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success('Upload succeed')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
#g-form .modify-input {
  background: black;
  color: white;
  border-style: dashed;
  border-color: dodgerblue;
}
</style>
