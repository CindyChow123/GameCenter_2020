<template>
  <div>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="4">
        <a-avatar :size="100" icon="user" style="margin-top: 50px; color: dodgerblue"/>
        <br />
        <strong style="font-size: 25px;margin-top: 30px; margin-left: 10px">admin</strong>
      </a-col>
      <a-col :span="16">
        <a-tabs default-active-key="1" @change="callback"
            style="width: 600px; color: white">
          <a-tab-pane key="1" tab="Create users">
            <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="Account name" placeholder="please input the account name">
                <a-input v-model="form.name"/>
              </a-form-model-item>
              <a-form-model-item label="E-mail">
                <a-input v-model="form.email"/>
              </a-form-model-item>
              <a-form-model-item label="Password">
                <a-input v-model="form.password" type="password"/>
              </a-form-model-item>
              <a-form-model-item label="Account role">
                <a-radio-group v-model="form.role">
                  <a-radio value="p">
                    Player
                  </a-radio>
                  <a-radio value="d">
                    Developer
                  </a-radio>
                  <a-radio value="a">
                    Admin
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit" style="margin-left: 200px">
                  Create
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Modify Profiles">
            <a-input-search
              placeholder="input user id/name/e-mail"
              enter-button="Search"
              size="small"
              @search="onSearch"
              style="width: 400px"
            />
            <br /><br />
            <a-descriptions :model="profile" title="User Info">
              <a-descriptions-item label="User ID" v-model="profile.user_id">
                {{profile.user_id}}
              </a-descriptions-item>
              <a-descriptions-item label="User name" v-model="profile.name">
                {{profile.name}}
              </a-descriptions-item>
              <a-descriptions-item label="User E-mail" v-model="profile.email">
                {{profile.email}}
              </a-descriptions-item>
              <a-descriptions-item label="balance" v-model="profile.balance">
                {{profile.balance}}
              </a-descriptions-item>
              <a-descriptions-item label="role" v-model="profile.role">
                {{profile.role}}
              </a-descriptions-item>
              <a-descriptions-item label="bio" v-model="profile.bio">
                {{profile.bio}}
              </a-descriptions-item>
              <a-descriptions-item label="is_online" v-model="profile.is_online">
                {{profile.is_online}}
              </a-descriptions-item>
              <a-descriptions-item label="created_at" v-model="profile.created_at">
                {{profile.created_at}}
              </a-descriptions-item>
              <a-descriptions-item label="is_locked" v-model="profile.is_locked" >
                {{profile.is_locked}}
              </a-descriptions-item>
            </a-descriptions>
            <br />
            <a-form-model :model="changeForm" style="border-color:cadetblue;border-style: dashed;border-radius: 25px">
              <a-form-model-item label="Lock Status" style="margin-left: 15px">
                <a-radio-group v-model="changeForm.lock_status">
                  <a-radio value="0">
                    false
                  </a-radio>
                  <a-radio value="1">
                    ture
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="Activity type" style="margin-left: 15px">
                <a-checkbox-group v-model="changeForm.role_status">
                  <a-checkbox value="p" name="play">
                    player
                  </a-checkbox>
                  <a-checkbox value="d" name="develop">
                    developer
                  </a-checkbox>
                  <a-checkbox value="a" name="admin">
                    admin
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item style="margin-left: 400px">
                <a-button type="primary" @click="changeAccount">
                  Change
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Upload Documents">
            <div>
              <strong style="font-size: 25px; margin-top: 20px">Upload User Document</strong>
              <br /><br />
              <a-upload
                name="manual"
                :multiple="true"
                action="http://10.21.40.23/api/admin/manual"
                accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                :headers="headers"
                @change="handleChange"
                style="margin-left:20px;margin-top: 100px"
              >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
              </a-upload>
              <br /><br />
            </div>
            <div>
              <strong style="font-size: 25px; margin-top: 20px">Upload Developer Document</strong>
              <br /><br />
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
                style="margin-left:20px;margin-top: 100px"
              >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
              </a-upload>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="Reported comments">
            <a-table :columns="cols" :data-source="report_back">
              <span slot="toDelete" slot-scope="text,record">
                <a-button type="danger" shape="round" @click="deleteComment(record)">
                  Delete
                </a-button>
              </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import qs from 'qs'
const cols = [
  {
    title: 'Comment ID',
    dataIndex: 'comment_id',
    key: 'comment_id'
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: 'Game ID',
    dataIndex: 'game_id',
    key: 'game_id'
  },
  {
    title: 'Reportee ID',
    dataIndex: 'reportee_id',
    key: 'reportee_id'
  },
  {
    title: 'Delete Comment',
    scopedSlots: { customRender: 'toDelete' }
  }
]
export default {
  name: 'Admin',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        email: '',
        password: '',
        role: ''
      },
      profile: {
        user_id: 'x',
        name: '',
        email: '',
        avatar: '',
        balance: '',
        role: '',
        bio: '',
        is_online: '',
        created_at: '',
        is_locked: ''
      },
      current_role: '',
      headers: {
        authorization: 'authorization-text'
      },
      report_back: [],
      report_detail: [],
      cols,
      report_id: 0,
      lock_next: '',
      changeForm: {
        lock_status: '',
        role_status: []
      }
    }
  },
  created () {
    this.getReport()
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    onSubmit () {
      var obji = {
        user_email: this.form.email,
        user_name: this.form.name,
        password: this.form.password,
        role: this.form.role
      }
      obji = qs.stringify(obji)
      this.$http.post('/api/admin/user/create', obji)
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.data.code === 0) {
            this.$message.success('Create successfully')
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onSearch (value) {
      console.log(value)
      // const result = this.$http.get('/api/admin/user/info', value)
      // console.log(result)
      // this.profile = result.data
      // console.log(this.profile)
      this.$http.get('/api/admin/user/info', {
        params: {
          admin_id: 1,
          user_name: value
        }
      })
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            // this.profile = response.data.data
            this.profile.user_id = response.data.data.id.toString()
            this.profile.name = response.data.data.name
            this.profile.email = response.data.data.email
            this.profile.avatar = response.data.data.avatar
            this.profile.balance = response.data.data.balance.toString()
            this.profile.role = response.data.data.role
            this.profile.bio = response.data.data.bio
            this.profile.is_online = response.data.data.online.toString()
            this.profile.created_at = response.data.data.createdAt.toString()
            this.profile.is_locked = response.data.data.locked.toString()
            this.changeForm.lock_status = this.profile.is_locked
            this.changeForm.role_status = this.profile.role.split()
          } else {
            // this.$message.error('Error!')
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    async getReport () {
      await this.$http.get('/api/admin/comment/report/list', {
        params: {
          page_num: 0,
          page_size: 6
        }
      })
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.data.code === 0) {
            this.report_back = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      for (var i = 0; i < this.report_back.length; i++) {
        this.$http.get('/api/admin/comment/report', {
          params: {
            comment_id: this.report_back[i].comment_id
          }
        })
          .then((response) => {
            // if (response.status === 200 && response.code === 0) {
            //   this.$message.success('Create successfully')
            // } else {
            //   this.$message.error('Error!')
            // }
            if (response.status === 200 && response.data.code === 0) {
              this.report_detail[i] = response.data.data
            } else {
              this.$message.error(response.data.msg)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    deleteComment (comment) {
      // console.log('post id type',typeof(comment.comment_id))
      this.report_id = comment.comment_id
      this.$http.post('/api/admin/comment/delete', qs.stringify({
        comment_id: this.report_id
      }))
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.code === 0) {
            this.$message.success('Delete successfully')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeAccount () {
      console.log('role change', this.changeForm.role_status)
      this.$http.post('/api/admin/user/assign', {
        params: {
          admin_id: 1,
          user_id: this.profile.user_id,
          role: this.changeForm.role_status.join('')
        }
      })
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200) {
            this.$message.success('Change role successfully')
          } else {
            this.$message.error('Error!')
          }
        })
        .catch((error) => {
          console.log(error)
        })
      var obji = {
        user_id: Number(this.profile.user_id),
        user_email: this.profile.user_email,
        user_name: this.profile.user_name,
        lock: this.changeForm.lock_status
      }
      this.$http.post('/api/admin/user/account/lock', obji)
        .then((response) => {
          // if (response.status === 200 && response.code === 0) {
          //   this.$message.success('Create successfully')
          // } else {
          //   this.$message.error('Error!')
          // }
          if (response.status === 200 && response.data.code === 0) {
            // if (this.profile.is_locked === 'true') {
            //   this.profile.is_locked = 'false'
            // } else {
            //   this.profile.is_locked = 'true'
            // }
            this.$message.success('Change lock status!')
          } else {
            this.$message.error('Error!')
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
