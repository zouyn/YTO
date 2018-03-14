<template>
  <transition name="el-fade-in-linear">
    <el-form label-width="45px" class="yto-login-box" :model="loginForm">
      <el-form-item label="">
        <h2>管理驾驶舱</h2>
      </el-form-item>
      <el-form-item label="账号">
        <el-input placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input :type="passwordType" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ajaxLogin" :loading="loading" :disabled="loginForm.username === '' || loginForm.password === ''">登录
        </el-button>
      </el-form-item>
    </el-form>
  </transition>
</template>

<script>
  import { getStore } from '@/components/date';

  export default {
    data() {
      return {
        loading: false,
        loginForm: {
          username: '',
          password: ''
        },
        passwordType: 'password'
      };
    },
    computed: {},
    created() {
      if (typeof (getStore('empNo')) !== 'undefined') {
        this.user = getStore('empNo');
      }
      // this.ajaxLogin();
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = '';
        } else {
          this.passwordType = 'password';
        }
      },
      async ajaxLogin() {
        this.loading = true;
        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          this.loading = false;
          this.$router.push({path: '/home'});
          this.$message({
            message: '登录成功',
            type: 'success'
          });
        }).catch((error) => {
          this.$message({
            message: error,
            type: 'error'
          });
          this.loading = false;
        });
      }
    }
  };
</script>
