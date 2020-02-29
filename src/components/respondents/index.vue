<template>
    <div class="divBox">
        <div class='listTop'>
          <div class='listTopTit'>
              <div class='listTit'>查询条件</div>
          </div>
          <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="姓名" class="label_197">
                  <el-input class='width_197' size="small" v-model.trim="form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="手机号" class="label_197">
                  <el-input class='width_197' size="small" v-model.trim="form.phone" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属单位" class="label_197">
                  <el-input class='width_197' size="small" v-model.trim="form.company" clearable></el-input>
              </el-form-item>
              <el-button size="small" @click="getList">查询</el-button>
        </el-form>
        </div>
        <div class="listBotTit">
          <div data-v-5295f104="" class="boxTitle">数据列表</div>
          <div class="pdlr-16">
            <el-table :data="dataList" style="width: 100%">
              <el-table-column  label="序号" type="index"  width="50"></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="手机号" prop="phone"></el-table-column>
              <el-table-column label="所属单位" prop="company"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
    </div>
</template>

<script>
import { listVisited, deleteVisited } from '../../axios/api.js'
import { getFormData } from '@/lib/util.js'

export default {
  name: 'Visitor',
  inject: ['reload'],
  components: {
  },
  data () {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      form: {
        name: '',
        phone: '',
        company: ''
      },
      dataList: []
    }
  },
  methods: {
    // 查询组织人员信息
    getList () {
      this.dataList = []
      listVisited({
        ...this.form,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === '1' && res.data.value) {
          this.dataList = res.data.value.list
          this.total = res.data.value.total
        }
      })
    },
    handleDelete (row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        let data = {
          id: row.id
        }
        deleteVisited(getFormData(data)).then(res => {
          if (res.data.success) {
            this.successMessage(res.data.message)
            this.getList()
          } else {
            this.failMessage(res.data.message)
          }
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
    },
    handleCurrentChange (val) {
      this.getList(val)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style scoped>
.imgPopCls /deep/ .el-dialog__header{
    padding:0
}
.imgPopCls /deep/ .el-dialog__body {
  padding: 20px;
}
.imgPopCls /deep/ .el-dialog__headerbtn{
    top:10px;
    right:10px;
}
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

</style>
