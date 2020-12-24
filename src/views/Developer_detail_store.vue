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
      <a-divider style="margin: 2px 0;background: #999999"/>
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
      <a-form-model-item ref="announce_date" label="Announce date:" prop="announce_date"
                         style="border-bottom: 1px solid #2a8be454">
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
      <a-form-model-item ref="release_date" label="Release date:" prop="release_date"
                         style="border-bottom: 1px solid #2a8be454">
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
      <a-form-model-item ref="discount_start" label="Discount period start time:" prop="discount_start"
                         style="border-bottom: 1px solid #2a8be454">
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
      <a-form-model-item ref="discount_end" label="Discount period end time:" prop="discount_end"
                         style="border-bottom: 1px solid #2a8be454">
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
      <a-form-model-item ref="tag" label="Game Tag:" prop="tag">
        <a-select placeholder="Please select a tag" v-model="tag" style="width: 120px; margin-bottom: 20px">
          <a-select-option v-for="item in this.tags" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>
<!--        <template v-for="(tag, index) in tags">-->
<!--          <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">-->
<!--            <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)" color="#108ee9">-->
<!--              {{ `${tag.slice(0, 20)}...` }}-->
<!--            </a-tag>-->
<!--          </a-tooltip>-->
<!--          <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleClose(tag)" color="#108ee9">-->
<!--            {{ tag }}-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <a-input-->
<!--          v-if="inputVisible"-->
<!--          ref="input"-->
<!--          type="text"-->
<!--          size="small"-->
<!--          :style="{ width: '78px' }"-->
<!--          :value="inputValue"-->
<!--          @change="handleInputChange"-->
<!--          @blur="handleInputConfirm"-->
<!--          @keyup.enter="handleInputConfirm"-->
<!--        />-->
<!--        <a-tag v-else style="background: coral; borderStyle: dashed;" @click="showInput">-->
<!--          <a-icon type="plus"/>-->
<!--          New Tag-->
<!--        </a-tag>-->
        <br/>
        <a-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import moment from 'moment'
import qs from 'qs'

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
        developerId: null,
        tag: '',
        discount_start: moment().startOf('day').format('YYYY-MM-DD'),
        discount_end: moment().startOf('day').format('YYYY-MM-DD'),
        discount_rate: 1,
        branch: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input game name',
            trigger: 'blur'
          }
        ],
        price: [
          {
            validator: this.checkPrice,
            trigger: 'blur'
          }
        ],
        discount_rate: [
          {
            validator: this.checkDis,
            trigger: 'blur'
          }
        ]
      },
      tags: ['Racing', 'Sports', 'Action', 'Adventure', 'Casual', 'Common'],
      tag: 'Common',
      inputVisible: false,
      inputValue: '',
      header: {
        token:
        window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    // this.form.developerId = this.$route.query.user
    // console.log(this.form.developerId)
    this.getFileInfo()
  },
  methods: {
    submitForm () {
      console.log(this.form)
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.form.tag = this.tag
          console.log(this.form.tag)
          const temp = qs.stringify(this.form)
          // console.log(this.form)
          // upload form - create or update
          let result
          if (this.form.id === '-1') {
            result = await this.$http.post('/game/create', temp)
            if (result.status !== 200 || result.data.code !== 0) {
              return this.$message.error(result.data.msg)
            }
          } else {
            result = await this.$http.post('/game/update', temp)
            if (result.status !== 200 || result.data.code !== 0) {
              return this.$message.error(result.data.msg)
            }
          }
          // upload picture
          console.log(result)
          this.form = result.data.data
          // update the created game id
          this.$emit('getId', result.data.data.id)
          // console.log(this.form)
          this.$message.success('Upload succeed')
        } else {
          this.$message.error('Invalid submission!!')
          return false
        }
      })
    },
    checkPrice (rule, value, callback) {
      if (this.form.price >= 0) {
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
      return current && current < moment().startOf('day')
    },
    handleUpload ({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    async getFileInfo () {
      this.form.id = this.$route.query.id
      this.form.developerId = this.$route.query.user
      console.log(this.form)
      if (this.form.id !== '-1') {
        const result = await this.$http.get('/game/info', { params: { id: this.form.id } })
        if (result.status !== 200 || result.data.code !== 0) {
          return this.$message.error(result.data.msg)
        }
        if (result.data.code === 0) {
          this.form = result.data.data.game
          console.log(this.form)
        }
      }
    },
    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
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
