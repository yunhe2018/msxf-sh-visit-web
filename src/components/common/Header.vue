<template>
    <div class="header">
        <i class="icon-menu" :class="[isCollapse?'icon-menu-unfold':'icon-menu-fold']" @click="foldEvent"></i>
        <div class="headerBtn" @click="logout"><i class="el-icon-switch-button mgr-5"></i>退出</div>
        <div class="headerUser">{{this.userName}}</div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userName: '',
      warnNum: 0,
      yellowWarnNum: 0,
      flag: 0,
      yellowFlag: 0,
      time: ''
    }
  },
  created () {
    this.userName = sessionStorage.getItem('userName')
    this.time = sessionStorage.getItem('recordTime') || new Date().getTime().toString()
  },
  methods: {
    logout () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          clearTimeout(this.timeOut)
          sessionStorage.removeItem('sessionId')
          this.$router.push('/login')
        })
        .catch(() => { })
    },
    foldEvent () {
      this.$emit('handleCollapse', !this.isCollapse)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row-reverse;
  padding: 14px 0 10px 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #606266;
  position: relative;
}
.headerBtn {
  cursor: pointer;
  width: 92px;
  text-align: center;
  border-left: 1px solid #E3E3E3;
  margin-left: 16px;
}
.headerUser{
    background: url("../../assets/images/icon_admin@2x.png") left center no-repeat;
    background-size:20px 20px;
    padding-left:30px;
    height: 20px;
}
.icon-menu{
    position: absolute;
    left:0;
    top:0;
    padding:16px 9px;
    width:16px;
    height: 16px;
    display: inline-block;
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
}
.icon-menu-fold{
    background-image: url("../../assets/images/icon_menu_fold@2x.png")
}
.icon-menu-unfold{
    background-image: url("../../assets/images/icon_menu_unfold@2x.png")
}
.header_img{
  /* display: inline-block; */
  float: left;
  margin: 1px 10px 0 0;
  width: 18px;
}
.header_img img{
  width: 100%;
}
.warnNum{
  cursor: pointer;
}
</style>
