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
      <a-form-model-item ref="avatar" label="Present Avatar (Click to edit)" prop="avatar">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://mockjs.docway.net/mock/1a98zbpmUHR/api/user/upload/avatar"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item ref="profileName" label="Profile name: name shown to the public" prop="profileName">
        <a-input
          class="modify-input"
          v-model="form.name"
          @blur="
          () => {
            $refs.profileName.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
<!--      <a-form-model-item ref="realName" label="Real name:" prop="realName">-->
<!--        <a-input-->
<!--          class="modify-input"-->
<!--          v-model="form.realName"-->
<!--          @blur="-->
<!--          () => {-->
<!--            $refs.realName.onFieldBlur();-->
<!--          }-->
<!--        "-->
<!--        />-->
<!--      </a-form-model-item>-->
      <a-form-model-item ref="bio" label="Description: " prop="bio">
        <a-textarea
          v-model="form.bio"
          class="modify-input"
          placeholder="Briefly describe your game"
          :rows="4"
          @blur="
          () => {
            $refs.bio.onFieldBlur();
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
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      other: '',
      form: {
        name: '',
        bio: ''
      },
      loading: false,
      imageUrl: '',
      rules: {
      }
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
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
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
  background: black;
}
.avatar-uploader img {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
