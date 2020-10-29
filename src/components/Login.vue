<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {

        username: null,
        password: null

      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },

    
    //用于登录的login函数
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid){
          let postdata = {
            username:this.loginForm.username,
            password:this.loginForm.password,
            // csrfmiddlewaretoken: '{{ csrf_token }}'
          }
          //向后端发送post请求
          axios.post('/User/pass', qs.stringify(postdata), {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
              },
            withCredentials:true
            }).then((res)=> {
              if(res.data.Signal == 999){
                this.$message({
                  message:"登陆成功！",
                  type: 'success'
                })
                //页面跳转
                //this.$router.push({path:'./Home'})     
              }     
            })
            .catch(function (error){
              console.log(error)
            })
        }
        else{
          return false
        }
      })
    }

  }
}
</script>

<style scoped >
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
