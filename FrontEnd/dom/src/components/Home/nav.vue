<template>
  <div class="nav">
    <el-row class="nav_logo">
      <el-col :span="12">
        <div class="img">
          <span>全国</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="check_web">
          <el-dropdown>
            <span class="el-dropdown-link">
              省份切换<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/login">
            <span style="color: red">请登录</span>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link to="/register">
            <span class="span_hover">志愿者注册</span>
          </router-link>
          <!-- <el-divider direction="vertical"></el-divider>
          <span class="span_hover">志愿队伍注册</span> -->
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: "",
      input: "",
    };
  },
};
</script>

<style>
.nav .nav_logo {
  width: 100%;
  height: 120px;
}
.nav .nav_logo .img {
  width: 407px;
  height: 75px;
  margin: 22px auto;
  background-image: url("../../assets/nav_logo.png");
  position: relative;
}
.nav .nav_logo .img span {
  width: 100px;
  font-weight: bold;
  font-size: 20px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  right: 0;
  bottom: -3px;
  border-radius: 15px;
  background-color: red;
  color: white;
}
.nav .check_web {
  margin-top: 22px;
  height: 40px;
  width: 100%;
}
.nav .check_web span {
  cursor: pointer;
}

.nav .span_hover:hover {
  color: red;
}

.nav .el-input {
  width: 70%;
}
.nav .el-select .el-input {
  width: 130px;
}
</style>