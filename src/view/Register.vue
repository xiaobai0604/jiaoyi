<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">注册新账户</h2>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
        ],
        confirmPassword: [
          { validator: this.confirmPasswordValidator, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          console.log('注册信息:', this.registerForm);
          // 在这里添加注册逻辑
        } else {
          console.error('表单验证失败');
          return false;
        }
      });
    },
    confirmPasswordValidator(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('login-background.jpg'); /* 卡通风格的背景图片 */
    background-size: cover;
}

.register-card {
  width: 360px;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.8); /* 半透明的白色背景 */
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
    color: #409eff; /* Element UI的主题色 */
    margin-bottom: 20px;
}

/* 可以根据需要添加更多的样式 */
</style>