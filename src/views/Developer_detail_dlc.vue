<!--<template>-->
<!--&lt;!&ndash;  :columns="columns"&ndash;&gt;-->
<!--  <a-col :span="20" style="margin-left: 25px">-->
<!--    <h1 style="color: aliceblue">My games</h1>-->
<!--    <a-button ghost type="dashed"  @click="$router.push({path: '/developer_detail', query: {id: '-1',user_id: user_id}})" style="display: inline;margin-bottom: 10px">-->
<!--      Create a new Downloadable Content-->
<!--    </a-button>-->
<!--    <a-table-->
<!--      :columns="columns"-->
<!--      :data-source="DLCList"-->
<!--      id="develop-home-app-left-table"-->
<!--      :pagination="false"-->
<!--      rowKey="id"-->
<!--    >-->
<!--      <template-->
<!--        v-for="col in ['name', 'price', 'visible']"-->
<!--        :slot="col"-->
<!--        slot-scope="text, record"-->
<!--      >-->
<!--        <div :key="col">-->
<!--          <a-input-->
<!--            v-if="record.editable"-->
<!--            style="margin: -5px 0"-->
<!--            :value="text"-->
<!--            @change="handleChange"-->
<!--          />-->
<!--          <template v-else>-->
<!--            {{ text }}-->
<!--          </template>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template slot="operation" slot-scope="text, record, index">-->
<!--        <div class="editable-row-operations">-->
<!--          <span v-if="record.editable">-->
<!--            <a @click="save(index)">Save</a>-->
<!--            <a-popconfirm title="Sure to cancel?" @confirm="record.editable = false;cancel(index)">-->
<!--              <a>Cancel</a>-->
<!--            </a-popconfirm>-->
<!--          </span>-->
<!--          <span v-else>-->
<!--            <a :disabled="editingKey !== ''" @click="record.editable = true;edit(index)">Edit</a>-->
<!--          </span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </a-table>-->
<!--  </a-col>-->
<!--</template>-->
<!--<script>-->
<!--const columns = [-->
<!--  {-->
<!--    title: 'DLC Name',-->
<!--    dataIndex: 'name',-->
<!--    width: 150,-->
<!--    scopedSlots: { customRender: 'name' }-->
<!--  },-->
<!--  {-->
<!--    title: 'Price',-->
<!--    dataIndex: 'price',-->
<!--    scopedSlots: { customRender: 'price' }-->
<!--  },-->
<!--  {-->
<!--    title: 'Visible in store',-->
<!--    dataIndex: 'visible',-->
<!--    scopedSlots: { customRender: 'visible' }-->
<!--  },-->
<!--  {-->
<!--    title: 'operation',-->
<!--    dataIndex: 'operation',-->
<!--    scopedSlots: { customRender: 'operation' }-->
<!--  }-->
<!--]-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      columns,-->
<!--      game_id: null,-->
<!--      DLCList: [],-->
<!--      editingKey: '',-->
<!--      cacheData: null-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    // this.game_id = this.$route.query.id-->
<!--    this.getDLCList()-->
<!--    this.cacheData = this.DLCList.map(item => ({ ...item }))-->
<!--  },-->
<!--  methods: {-->
<!--    async getDLCList () {-->
<!--      const result = await this.$http.get('/game/dlc/list', { params: { game_id: this.game_id } })-->
<!--      if (result.status !== 200 || result.data.code !== 0) {-->
<!--        return this.$message.error(result.data.msg)-->
<!--      }-->
<!--      this.DLCList = result.data.data-->
<!--      for (var i = 0; i < this.DLCList.length; i++) {-->
<!--        this.DLCList[i].editable = false-->
<!--      }-->
<!--      console.log(this.DLCList)-->
<!--    },-->
<!--    edit (index) {-->
<!--      this.DLCList[index].editable = true-->
<!--      this.editingKey = this.DLCList[index].id-->
<!--      // const newDLC = [...this.DLCList]-->
<!--      // const target = newDLC.filter(item => index === item.id)-->
<!--      // this.editingKey = index-->
<!--      // if (target) {-->
<!--      //   target.editable = true-->
<!--      //   this.DLCList = newDLC-->
<!--      // }-->
<!--      // console.log(target)-->
<!--    },-->
<!--    save (index) {-->
<!--    },-->
<!--    cancel (index) {-->
<!--      const temp = this.DLCList-->
<!--      temp[index].editable = false-->
<!--      this.DLCList = temp-->
<!--      this.editingKey = ''-->
<!--      // const newDLC = [...this.DLCList]-->
<!--      // const target = newDLC.filter(item => index === item.id)[0]-->
<!--      // this.editingKey = ''-->
<!--      // if (target) {-->
<!--      //   Object.assign(target, this.cacheData.filter(item => index === item.id)[0])-->
<!--      //   delete target.editable-->
<!--      //   this.data = newDLC-->
<!--      // }-->
<!--    },-->
<!--    handleChange () {-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.editable-row-operations a {-->
<!--  margin-right: 8px;-->
<!--}-->
<!--</style>-->
<!--:label-col="labelCol" :wrapper-col="wrapperCol"-->
<template>
  <a-col :span="20" style="margin-left: 25px">
    <h1 style="color: rgba(238,137,61,0.95)">Requirement</h1>
    <span style="color: rgba(210,121,53,0.95)">The requirements for dlc.</span>
    <a-button ghost type="dashed"  @click="modal_visible = true" style="display: inline;margin-bottom: 10px;float: right">
      Create a new Downloadable Content
    </a-button>
    <a-modal title="Create a new DLC" :visible="modal_visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" id="new">
      <a-form-model :model="form" id="g-form" :rules="rules" ref="ruleForm">
        <a-form-model-item label="DLC Name:" ref="name" prop="name">
          <a-input
            v-model="form.name"
            class="modify-input"
            @blur="
            () => {
              $refs.name.onFieldBlur();
            }
          "
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="Price:" ref="price" prop="price">
          <a-input
            v-model.number="form.price"
            class="modify-input"
            @blur="
            () => {
              $refs.price.onFieldBlur();
            }
        "></a-input>
        </a-form-model-item>
        <a-form-model-item label="Open to public:" ref="visible" prop="visible">
          <a-switch v-model="form.visible" id="switch" />
        </a-form-model-item>
        <a-form-model-item label="Upload the file here:">
          <a-upload
            action="http://10.17.91.184/game/dlc/upload"
            :data="{id:this.form.game_id}"
            :headers="this.header"
            :default-file-list="this.FileList"
            name="file"
          >
            <a-button> <a-icon type="upload" /> Upload </a-button>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-divider style="margin: 10px 0;background: #999999" />
    <a-table :columns="columns" :data-source="data" :pagination="false" rowKey="id">
      <template
        v-for="col in ['name', 'price']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="visible" slot-scope="text, record">
        <a-tag color="#108ee9">{{record.visible}}</a-tag>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.id)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.id)">Edit</a>
            <a-divider type="vertical" />
          <a :disabled="editingKey !== ''" @click="() => upload(record.id)">upload file</a>
        </span>
        </div>
      </template>
    </a-table>
  </a-col>
</template>
<script>
import qs from 'qs'
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: 150,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'price',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: 'visible in the store',
    dataIndex: 'visible',
    scopedSlots: { customRender: 'visible' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  data () {
    return {
      columns,
      editingKey: '',
      data: [],
      cacheData: [],
      confirmLoading: false,
      modal_visible: false,
      form: {
        game_id: null,
        name: '',
        price: null,
        visible: null
      },
      FileList: [],
      rules: {
        name: [{
          required: true, message: 'Please input the DLC name', trigger: 'blur'
        }],
        price: [
          { required: true, message: 'Please input the price', trigger: 'blur' },
          { validator: this.checkPrice }
        ]
      },
      header: {
        token:
          window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    this.form.game_id = this.$route.query.id
    this.getDLC()
  },
  methods: {
    async getDLC () {
      const result = await this.$http.get('/game/dlc/list', { params: { game_id: this.form.game_id } })
      if (result.status !== 200 || result.data.code !== 0) {
        return this.$message.error(result.data.msg)
      }
      this.data = result.data.data
      this.cacheData = this.data.map(item => ({ ...item }))
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.id)[0]
      const targetCache = newCacheData.filter(item => key === item.id)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
        // send modified data
        console.log(this.data)
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
        delete target.editable
        this.data = newData
      }
    },
    upload () {
    },
    handleOk (e) {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          const result = await this.$http.post('/game/dlc/create', qs.stringify(this.form))
          setTimeout(() => {
            this.modal_visible = false
            this.confirmLoading = false
          }, 2000)
          if (result.status !== 200 || result.data.code !== 0) {
            return this.$message.error(result.data.msg)
          }
          return this.$message.success('DLC created successfully!')
        }
      })
      this.modal_visible = false
    },
    handleCancel (e) {
      this.modal_visible = false
    },
    checkPrice (rule, value, callback) {
      if (this.form.price > 0) {
        callback()
        return
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('Price must be a positive number!')
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
#g-form .modify-input {
  background: rgba(7,28,37,0.95);
  color: white;
  border-style: dashed;
  border-color: dodgerblue;
}
</style>
