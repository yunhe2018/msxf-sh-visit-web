<template>
    <div class=' mainDiv'>
      <div data-v-5c89d03e="" class="title">规则设置</div>
      <div>
        <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
          <el-form-item label="时间(每月)" prop="shedule"
            :rules="[{ required: true, message: '请输入时间', trigger: 'change'}]">
            <el-select v-model="form.shedule" placeholder="请选择时间" style="width:305px">
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(domain, index) in form.emailList"
            :label="'邮箱' + (index + 1)"
            :key="domain.key"
            :prop="'emailList.' + index + '.value'"
            :rules="[{ required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
            <el-input v-model="domain.value" class="width_305"></el-input>
            <el-button size='small' v-if="index !== 0" @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size='small' type="primary" @click="submitForm('form')">提交</el-button>
            <el-button size='small' @click="addDomain">新增邮箱</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import { addMail, listMail } from '../../axios/api.js'

export default {
  name: 'Visitor',
  inject: ['reload'],
  components: {
  },
  data () {
    return {
      form: {
        id: '',
        shedule: '',
        emailList: [{value: ''}]
      },
      timeOptions: []
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form.emailList)
          addMail({
            id: this.form.id,
            shedule: this.form.shedule,
            mail: this.form.emailList.map(i => { return i.value }).join(',')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.form.emailList.indexOf(item)
      if (index !== -1) {
        this.form.emailList.splice(index, 1)
      }
    },
    addDomain () {
      this.form.emailList.push({
        value: '',
        key: Date.now()
      })
    },
    failMessage (txt) {
      txt = txt || '请求失败'
      this.$message({
        message: txt,
        type: 'error'
      })
    },
    successMessage (txt) {
      this.$message({
        message: txt,
        type: 'success'
      })
      this.queryVisitorList()
    }
  },
  mounted () {
    // this.queryVisitorList()
    listMail().then(res => {
      if (res.data.code === '1') {
        this.form.id = res.data.value[0].id
        this.form.shedule = Number(res.data.value[0].shedule)
        this.form.emailList = res.data.value[0].mail.split(',').map(i => {
          return {value: i}
        })
      }
    })
  },
  created () {
    this.timeOptions = [
      {value: 1, label: '1号'},
      {value: 2, label: '2号'},
      {value: 3, label: '3号'},
      {value: 4, label: '4号'},
      {value: 5, label: '5号'},
      {value: 6, label: '6号'},
      {value: 7, label: '7号'},
      {value: 8, label: '8号'},
      {value: 9, label: '9号'},
      {value: 10, label: '10号'},
      {value: 11, label: '11号'},
      {value: 12, label: '12号'},
      {value: 13, label: '13号'},
      {value: 14, label: '14号'},
      {value: 15, label: '15号'},
      {value: 16, label: '16号'},
      {value: 17, label: '17号'},
      {value: 18, label: '18号'},
      {value: 19, label: '19号'},
      {value: 20, label: '20号'},
      {value: 21, label: '21号'},
      {value: 22, label: '22号'},
      {value: 23, label: '23号'},
      {value: 24, label: '24号'},
      {value: 25, label: '25号'},
      {value: 26, label: '26号'},
      {value: 27, label: '27号'},
      {value: 28, label: '28号'},
      {value: 29, label: '29号'},
      {value: 30, label: '30号'}
    ]
  }
}
</script>
<style scoped>
.mainDiv{
  position: absolute;
  width:100%;
  height:100%;
  background-color: #fff;
  padding: 0 16px 20px 24px;
  box-sizing: border-box;
  border-radius: 4px;
}
.title{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #303133;
    line-height: 16px;
    font-weight: bold;
    padding: 20px 0;
}
</style>
