<template>
  <div class="register">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          label-position="top"
        >
          <div v-show="active == 1" class="box">
            <el-row class="title"> 账号信息 </el-row>

            <el-form-item label="用户名：" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="passWord">
              <el-input v-model="ruleForm.passWord"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="nowPassWord">
              <el-input v-model="ruleForm.nowPassWord"></el-input>
            </el-form-item>

            <el-row class="title"> 验证 </el-row>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码：" prop="verify">
              <div style="display: flex">
                <el-input v-model="ruleForm.verify"></el-input>
                <el-button
                  ref="Text"
                  :disabled="isBtn"
                  @click="sendEmail"
                  type="primary"
                  style="margin-left: 25px; border: none; width: 150px"
                  >发送</el-button
                >
              </div>
            </el-form-item>
          </div>

          <div v-show="active == 2" class="box">
            <el-row class="title"> 身份信息 </el-row>
            <el-form-item label="姓名：" prop="real_name">
              <el-input v-model="ruleForm.real_name"></el-input>
            </el-form-item>

            <el-form-item label="性别：" prop="sex" class="sexBox">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期：" prop="born_data">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.born_data"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="证件类型：" prop="region">
          <el-select v-model="ruleForm.region" style="width: 100%">
            <el-option label="内地居民身份证" value="sfz"></el-option>
          </el-select>
        </el-form-item> -->

            <el-form-item label="身份证号：" prop="cards">
              <el-input v-model="ruleForm.cards"></el-input>
            </el-form-item>

            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址：" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="现在居住地：" prop="now_address">
              <el-input v-model="ruleForm.now_address"></el-input>
            </el-form-item>
          </div>

          <div class="boxFoot">
            <el-form-item v-show="active == 1">
              <el-button type="primary" @click="NextForm" class="leftBtn"
                >&nbsp;&nbsp;下一步&nbsp;&nbsp;</el-button
              >
              <el-button @click="resetForm('ruleForm')" class="rightBtn"
                >&nbsp;&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </el-form-item>

            <el-form-item v-show="active == 2">
              <el-button @click="UpForm" class="leftBtn"
                >&nbsp;&nbsp;上一步&nbsp;&nbsp;</el-button
              >
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                class="rightBtn"
                >立即创建</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import { register, verifyEmail } from "../../http/login";
import { registerDataValidator } from "../../utils/Validator";
export default {
  data() {
    return {
      active: 1,
      verifyEmailData: '',
      isBtn: false,
      ruleForm: {
        userName: "", //用户名
        passWord: "", //密码
        nowPassWord: "", //确认密码
        real_name: "", //真实姓名
        sex: "", //性别
        born_data: "", //出生日期
        address: "", //家庭地址
        phone: "", //手机号
        cards: "", //身份证
        now_address: "", //现居住地
        email: "", //邮箱
        verify: "", //邮箱验证码
        //region: "sfz",
      },
      rules: registerDataValidator,
    };
  },
  methods: {
    NextForm() {
      this.active++;
    },
    UpForm() {
      this.active--;
    },
    sendEmail() {
      //this.$refs.Text.$el.innerHTML = 'asasa'
      //console.log(this.$refs.Text.$el.innerHTML = 'asasa')
      var rg = new RegExp(
        /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        "g"
      );
      if (rg.test(this.ruleForm.email)) {
        this.isBtn = true;
        verifyEmail({ email: this.ruleForm.email }).then((res) => {
          console.log(res.data)
          this.verifyEmailData = res.data.data/1024;
          //this.verifyEmailData = this.verifyEmailData/1024
        });
        let time = 60;

        let setTime = setInterval(() => {
          this.$refs.Text.$el.innerHTML = time + "s";
          time--;
          if (time < 1) {
            this.$refs.Text.$el.innerHTML = "发送";
            this.isBtn = false;
            clearInterval(setTime);
          }
        }, 1000);
      } else {
        this.$message({
          message: "邮箱未填写正确！！！",
          type: "warning",
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (this.verifyEmailData == "") {
            this.$message({
              message: "验证码已经超时了哦！！！",
              type: "warning",
            });
          } else {
            console.log(this.ruleForm.verify, this.verifyEmailData);
            if (this.ruleForm.verify == this.verifyEmailData) {
              register(this.ruleForm).then(() => {
                this.$message({
                  message: "恭喜你，注册成功",
                  type: "success",
                });
                this.$router.push({
                  path: "/",
                });
              });
            } else {
              this.$message({
                message: "邮箱验证码错误！！！",
                type: "warning",
              });
            }
          }
        } else {
          this.$message({
            message: "还有未填写或未填写正确的表单哦！！！",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.active = 1;
      //console.log(formName)
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    verifyEmailData(val) {
      if (val) {
        setTimeout(()=>{
          this.verifyEmailData = ''
        },300000); 
      }
    },
  },
};
</script>

<style>
.register {
  width: 100%;
}
.el-container {
  height: 100vh;
  background-image: url("../../assets/body.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.register .title {
  width: 100%;
  padding: 15px 10px;
  font-size: 25px;
  font-weight: bold;
}
.register .title:before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 20px;
  background: #e60012;
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -10px;
}
.register .box {
  width: 40%;
  height: 750px;
  margin: 0 auto;
}
.register .boxFoot {
  width: 40%;
  margin: 0 auto;
}
.sexBox {
  display: flex;
}
.register .el-form--label-top .el-form-item__label {
  padding: 0;
}
.register .el-form-item {
  margin: 0 0 5px 0;
}
.register .leftBtn {
  float: left;
}
.register .rightBtn {
  float: right;
}
</style>
