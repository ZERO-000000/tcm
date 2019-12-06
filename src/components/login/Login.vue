<template>
  <div class="Login" style="padding-top: 100px;width: 100%;">
    <h1>基础系统</h1>
    <img src="../../assets/logo.png">
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="70px" class="loginForm">
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="passWord">
        <el-input type="password" v-model="loginForm.passWord" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:-70px">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:"Login",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      msg: '用户登录',
      loginForm: {
        passWord: '',
        name:''
      },
      loginRules:{
        passWord: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login:function(){
      let me=this;
      let name=this.loginForm.name;
      let passWord=this.loginForm.passWord;
      let params={
        name:name,
        passWord:passWord
      };
      console.log(params)
      this.axios.post('/login',this.$qs.stringify(params)).then(function (res) {
        debugger
        let data=res.data;
        let code=data.code;
        me.$message(data.msg);
        if (code == "200") {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', name);
          localStorage.setItem('passWord', passWord);
          me.$router.push({
            path: '/main'
          });
        } else {
          me.$router.push({
            path: '/login'
          });
        }
      });
    }
  }
}
</script>
<style>
  .loginForm{
    width: 300px;
    margin: 0px auto;
    border: 1px solid #c6e1d1a6;
    padding: 20px 10px 5px 10px;
    border-radius: 25px;
    box-shadow: 4px 4px 20px #21b678;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
