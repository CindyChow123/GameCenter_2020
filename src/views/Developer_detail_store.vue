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
      <h1 style="color: rgba(238,137,61,0.95)">Basic information</h1>
      <a-divider style="margin: 2px 0;background: #999999" />
      <a-form-model-item ref="name" label="Name: " prop="name">
        <a-input
          class="modify-input"
          v-model="form.name"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="branch" label="Game Branch: " prop="branch">
        <a-input
          class="modify-input"
          v-model="form.branch"
          @blur="
          () => {
            $refs.branch.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="description" label="Description: " prop="description">
        <a-textarea
          v-model="form.description"
          class="modify-input"
          placeholder="Briefly describe your game"
          :rows="4"
          @blur="
          () => {
            $refs.description.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="price" label="Price:" prop="price">
        <a-input
          class="modify-input"
          v-decorator="['price',
              {// means = we require this to be not empty
                rules: [{ required: true, message: 'Please input the game price.' },{ validator: checkPrice}],}
            ]"
          v-model.number="form.price"
        />
      </a-form-model-item>
      <a-form-model-item ref="announce_date" label="Announce date:" prop="announce_date" style="border-bottom: 1px solid #2a8be454">
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          valueFormat="YYYY-MM-DD"
          v-model="form.announce_date"
          v-decorator="['date',
              {
                rules: [{ required: true, message: 'Please input the announce date.' }],
              }
            ]"
        />
      </a-form-model-item>
      <a-form-model-item ref="release_date" label="Release date:" prop="release_date" style="border-bottom: 1px solid #2a8be454">
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          valueFormat="YYYY-MM-DD"
          v-model="form.release_date"
          v-decorator="['date',
              {
                rules: [{ required: true, message: 'Please input the release date.' }],
              }
            ]"
        />
      </a-form-model-item>
      <a-form-model-item ref="discount_start" label="Discount period start time:" prop="discount_start" style="border-bottom: 1px solid #2a8be454">
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          valueFormat="YYYY-MM-DD"
          v-model="form.discount_start"
          v-decorator="['discount_start',
              {
                rules: [{ required: true, message: 'Please input the announce date.' }],
              }
            ]"
        />
      </a-form-model-item>
      <a-form-model-item ref="discount_end" label="Discount period end time:" prop="discount_end" style="border-bottom: 1px solid #2a8be454">
        <a-date-picker
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          valueFormat="YYYY-MM-DD"
          v-model="form.discount_end"
          v-decorator="['discount_end',
              {
                rules: [{ required: true, message: 'Please input the announce date.' }],
              }
            ]"
        />
      </a-form-model-item>
      <a-form-model-item ref="discount_rate" label="Discount:" prop="discount_rate">
        <a-input
          class="modify-input"
          v-decorator="['discount_rate',
              {// means = we require this to be not empty
                rules: [{ validator: checkDis}],}
            ]"
          v-model.number="form.discount_rate"
        />
      </a-form-model-item>
      <h1 style="color: rgba(238,137,61,0.95)">Graphic information</h1>
      <a-divider style="margin: 2px 0;background: #999999" />
      <a-form-model-item ref="pic_header" label="The header picture:" prop="pic_header" style="border-bottom: 1px solid #2a8be454">
        <a-upload
          action="http://mockjs.docway.net/mock/1a98zbpmUHR/game/upload"
          list-type="picture"
          :default-file-list="PicList"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item ref="video" label="The description video:" prop="video" style="border-bottom: 1px solid #2a8be454">
        <a-upload
          list-type="picture"
          action="http://mockjs.docway.net/mock/1a98zbpmUHR/game/upload"
          :default-file-list="VideoList"
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
import moment from 'moment'
export default {
  data () {
    return {
      form: {
        name: '',
        id: null,
        price: null,
        description: '',
        announce_date: null,
        release_date: null,
        developer_id: null,
        tag: '',
        discount_start: '',
        discount_end: '',
        discount_rate: null,
        branch: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' }
        ],
        price: [
          { validator: this.checkPrice, trigger: 'blur' }
        ],
        discount_rate: [
          { validator: this.checkDis, trigger: 'blur' }
        ]
      },
      PicList: [
      ],
      VideoList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500' // custom error message to show
        }
      ]
    }
  },
  created () {
    this.getFormInfo()
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // upload form - create or update
          let result
          if (this.form.id === '-1') {
            result = await this.$http.post('http://mockjs.docway.net/mock/1a98zbpmUHR/game/create', this.form)
          } else {
            result = await this.$http.post('http://mockjs.docway.net/mock/1a98zbpmUHR/game/update', this.form)
          }
          // upload picture
          console.log(result)
          if (result.status === 200 && result.data.code === 0) {
            this.form = result.data.data
            this.$message.success('Upload succeed')
          } else {
            this.$message.error('Error!')
          }
        } else {
          this.$message.error('Invalid submission!!')
          return false
        }
      })
    },
    checkPrice (rule, value, callback) {
      if (this.form.price > 0) {
        callback()
        return
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('Price must be a positive number!')
    },
    checkDis (rule, value, callback) {
      if (this.form.discount_start === null || this.form.discount_end === null) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Please set the start time and end time of discounting!')
      }
      if (this.form.discount_rate <= 1 && this.form.discount_rate >= 0) {
        callback()
        return
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('Discount must be within 0 and 1')
    },
    disabledDate (current) {
      return current && current < moment().endOf('day')
    },
    handleUpload ({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    async getFormInfo () {
      this.form.id = this.$route.query.id
      if (this.form.id !== '-1') {
        const { data: res } = await this.$http.post('http://mockjs.docway.net/mock/1a98zbpmUHR/game/create', this.form)
        console.log(res)
        this.form = res.data
      }
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
