<template>
  <div>
    <a-form-model
      id="g-form"
      ref="ruleForm"
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
          action="http://10.17.91.184/game/upload"
          :data="{id:this.$route.query.id,type:'installation'}"
          :headers="this.header"
          :default-file-list="this.FileList"
          name="upload_file"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item ref="pic_header" label="The header picture:" prop="pic_header"
                         style="border-bottom: 1px solid #2a8be454">
        <a-upload
          action="http://10.17.91.184/game/upload"
          list-type="picture"
          :data="{id:this.$route.query.id,type:'image'}"
          :headers="this.header"
          :default-file-list="this.PicList"
          name="upload_file"
        >
          <a-button>
            <a-icon type="upload"/>
            Upload
          </a-button>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item ref="video" label="The description video:" prop="video"
                         style="border-bottom: 1px solid #2a8be454">
        <a-upload
          list-type="picture"
          action="http://10.17.91.184/game/upload"
          :default-file-list="this.VideoList"
          :data="{id:this.$route.query.id,type:'video'}"
          :headers="this.header"
          name="upload_file"
        >
          <a-button>
            <a-icon type="upload"/>
            Upload
          </a-button>
        </a-upload>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      rules: {
      },
      FileList: [],
      PicList: [],
      VideoList: [],
      DLCList: [],
      header: {
        token:
          window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    this.getFileInfo()
  },
  methods: {
    async getFileInfo () {
      this.id = this.$route.query.id
      if (this.id !== '-1') {
        const result = await this.$http.get('/game/info', { params: { id: this.id } })
        if (result.status !== 200 || result.data.code !== 0) {
          return this.$message.error(result.data.msg)
        }
        // console.log(file)
        var gcObject = result.data.data.game_content
        const len = gcObject.length
        var i
        for (i = 0; i < len; i++) {
          if (gcObject[i].type === 'installation') {
            // temp.name = gcObject[i].name
            gcObject[i].uid = -i - 1
            gcObject[i].status = 'done'
            this.FileList.push(gcObject[i])
          } else if (gcObject[i].type === 'image') {
            // temp.name = gcObject[i].name
            gcObject[i].uid = -i - 1
            gcObject[i].status = 'done'
            this.PicList.push(gcObject[i])
          } else if (gcObject[i].type === 'video') {
            // temp.name = gcObject[i].name
            gcObject[i].uid = -i - 1
            gcObject[i].status = 'done'
            this.VideoList.push(gcObject[i])
          }
        }
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
