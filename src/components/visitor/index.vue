<template>
    <div class="divBox">
        <div class='listTop'>
          <div class='listTopTit'>
              <div class='listTit'>查询条件</div>
          </div>
          <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="姓名" class="label_197">
                  <el-input @keyup.enter.native="getList" class='width_197' size="small" v-model.trim="form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="被访人" class="label_197">
                  <el-input @keyup.enter.native="getList" class='width_197' size="small" v-model.trim="form.visitedName" clearable></el-input>
              </el-form-item>
              <el-form-item label="被访者确认状态" class="label_197">
                <el-select v-model="form.isConfirm" placeholder="请选择">
                  <el-option
                    v-for="item in confirmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="访客状态" class="label_197">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="来访时间" class="label_197">
                <el-date-picker
                  class="picStyle"
                  v-model="visiteTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
              <el-button size="small" @click="getList">查询</el-button>
              <el-button size="small" @click="downloadFile" :loading="visitorDownloading">导出</el-button>
        </el-form>
        </div>
        <div class="listBotTit">
          <div data-v-5295f104="" class="boxTitle">数据列表</div>
          <div class="pdlr-16">
            <el-table :data="dataList" style="width: 100%">
              <!-- <el-table-column  label="序号" type="index"  width="50"></el-table-column> -->
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="身份证号" width='170' prop="idCardNumber"></el-table-column>
              <el-table-column label="手机号" width='130' prop="phone"></el-table-column>
              <el-table-column label="民族" prop="nation"></el-table-column>
              <el-table-column label="性别" prop="sex"></el-table-column>
              <el-table-column label="户籍所在地" prop="address" width='150'></el-table-column>
              <el-table-column label="来访时间" prop="inTime"></el-table-column>
              <el-table-column label="离开时间" prop="outTime"></el-table-column>
              <el-table-column label="被访者" prop="visitedName"></el-table-column>
              <el-table-column label="被访者是否确认" width='150'>
                <template slot-scope="scope">
                  <!-- {{scope.row.isConfirm === 1 ? '是' : '否'}} -->
                  {{scope.row.confirmName}}
                </template>
              </el-table-column>
              <el-table-column label="照片">
                <template slot-scope="scope">
                  <span class="lookImg" @click="imgClick(scope.row)">查看</span>
                </template>
              </el-table-column>
              <el-table-column label="访客状态">
                <template slot-scope="scope">
                  <!-- <span v-if="scope.row.isConfirm === 1">正常</span>
                  <span v-else class="status_erro">异常</span> -->
                  {{scope.row.statusName}}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                v-if="total"
                class="pageView"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next, jumper"
                :current-page.sync="pageNum"
                :total="total"
                :page-size="pageSize">
            </el-pagination>
          </div>
        </div>
        <!--查看照片-->
        <el-dialog
        title="照片查看"
        :visible.sync="imgPopShow"
        class="imgPopCls"
        :close-on-click-modal=false
        width="760px">
        <div class="bigImgWrap">
          <p class="bigImg cardImg"><img :src="idCardImg" /><span class="txt">身份证照片</span></p>
          <p class="bigImg"><img :src="inImg" /><span class="txt">照片记录（进）</span></p>
          <p class="bigImg"><img :src="outImg" /><span class="txt">照片记录（出）</span></p>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { listRecord, exportRecord } from '../../axios/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Visitor',
  inject: ['reload'],
  components: {
  },
  data () {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
      form: {
        name: '',
        visitedName: '',
        isConfirm: '',
        status: '',
        startTime: '',
        endTime: ''
      },
      visiteTime: null,
      confirmOptions: [
        {value: '', label: '默认'},
        {value: 1, label: '已确认'},
        {value: 0, label: '未确认'},
        {value: 2, label: '超时'}
      ],
      statusOptions: [
        {value: '', label: '默认'},
        {value: 1, label: '正常'},
        {value: 0, label: '异常'},
        {value: 3, label: '未进入'},
        {value: 2, label: '已进入'}
      ],
      imgPopShow: false,
      dataList: [],
      url: this.$globalConst.apiPrefix,
      idCardImg: '',
      inImg: '',
      outImg: ''
    }
  },
  computed: {
    ...mapState(['visitorDownloading'])
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapMutations(['visitorDownloadingShow', 'visitorDownloadingHide']),
    getList () {
      this.dataList = []
      this.form.startTime = this.visiteTime ? this.formatDate(this.visiteTime[0]) : ''
      this.form.endTime = this.visiteTime ? this.formatDate(this.visiteTime[1]) : ''
      listRecord({
        ...this.form,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.success && res.data.value) {
          this.dataList = res.data.value.list
          this.dataList = this.dataList.map(i => {
            const statusName = this.statusOptions.find(a => {
              return a.value === i.status
            }).label
            const confirmName = this.confirmOptions.find(b => {
              return b.value === i.isConfirm
            }).label
            return {...i, statusName: statusName, confirmName: confirmName}
          })
          this.total = res.data.value.total
        }
      })
    },
    formatDate (date) {
      const time = new Date(date)
      const year = time.getFullYear()
      const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      const day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
      return '' + year + '-' + month + '-' + day
    },
    downloadFile () {
      // 二次确认
      this.$confirm('是否确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.visitorDownloadingShow()
        this.form.startTime = this.visiteTime ? this.formatDate(this.visiteTime[0]) : ''
        this.form.endTime = this.visiteTime ? this.formatDate(this.visiteTime[1]) : ''
        exportRecord({
          ...this.form
        }).then(res => {
          let url = window.URL.createObjectURL(res.data)
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.href = url
          a.download = '访客记录.xlsx'
          a.click()
          window.URL.revokeObjectURL(url)
          this.visitorDownloadingHide()
          this.successMessage('导出成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        })
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
      this.getList()
    },
    imgClick (row) {
      this.idCardImg = this.url + row.idCardImg
      this.inImg = this.url + row.inImg
      this.outImg = this.url + row.outImg
      this.imgPopShow = true
    },
    handleCurrentChange (val) {
      this.getList(val)
    }
  }
}
</script>
<style scoped>
.btn{
  margin-bottom: 20px;
}
.listBotTit {
  padding-bottom: 9px;
  background: #fff;
  border-radius: 4px;
}
.pdlr-16{padding-left:16px;padding-right:16px}
.picStyle{
  margin-top:4px
}
.picStyle /deep/ .el-range__icon{
  margin-top: -6px;
}
.picStyle /deep/ .el-range-separator{
  margin-top: -6px;
}
.picStyle /deep/ .el-range__close-icon{
  margin-top: -6px;
}
.lookImg{
  color: #4C7EE9;
  cursor: pointer;
}
.status_erro{
  color: red;
}
.bigImgWrap{
  display: flex;
}
.bigImg {
  margin: 12px 64px 30px 0;
}
.bigImg:first-child{
  margin-left: 44px;
}
.bigImg:last-child{
  margin-right: 0px;
}
.bigImg img{
  display: block;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  width: 140px;
  height: 140px;
}
.bigImg .txt{
  display: block;
  text-align: center;
  font-size: 14px;
  color: #909399;
  padding-top: 20px;
}
.cardImg{
  width: 221px;
}
.cardImg img{
  width: 221px;
}
</style>
