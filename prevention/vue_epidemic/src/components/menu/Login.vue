<template>
  <div class="login-bg">
    <el-card class="login-card" shadow="hover" @keyup.enter.native="login">
      <div slot="header" class="clearfix" style="text-align: center">
        <h2 style="font-size: 1rem">校园疫情防控管理系统</h2>
      </div>
      <el-form ref="form" :model="form" :rules="rule" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
            placeholder="请输入用户名"
            class="inp"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
        <el-radio-group
          v-model="form.radio"
          size="small"
          style="display: flex; justify-content: center; padding-left: 60px"
        >
          <el-radio label="1" border>管理员</el-radio>
          <el-radio label="2" border>学生</el-radio>
          <el-radio label="3" border>教师</el-radio>
        </el-radio-group>
      </el-form>
      <el-button
        type="primary"
        style="width: 100%; margin-left: 10px; margin-top: 10px"
        @click="login"
        >登录</el-button
      >
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        radio: "1",
      },
      rule: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 登录
     * 用户名：username:this.form.username,
     * 密码：password:this.form.password,
     */
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 表单验证通过
          await this.$Axios({
            url: "/users/login",
            method: "post",
            data: {
              username: this.form.username,
              password: this.form.password,
              type: this.form.radio,
            },
            success: (result) => {
              // 成功后吧token存入 localStorage中
              window.localStorage.setItem("token", result.jwt_token);
              //群聊使用
              const socketData = {
                id: result.loginData[0].id,
                name: result.loginData[0].username,
                img: result.loginData[0].head,
              };
              window.localStorage.setItem(
                "socketData",
                JSON.stringify(socketData)
              );
              if (this.form.radio == 1) this.$router.push("/admin/home");
              if (this.form.radio == 2) this.$router.push("/student/home");
              if (this.form.radio == 3) this.$router.push("/teacher/home");
            },
            error: () => {
              this.form.username = "";
              this.form.password = "";
            },
          });
        } else {
          return false;
        }
      });
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.login {
  &-bg {
    width: 100%;
    height: 100vh;
    background: url("~@/assets/images/bg.jpg") center center / 100%;
  }
  &-card {
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h3 {
    text-align: center;
    height: 60px;
    line-height: 20px;
    border-bottom: 1px solid rgb(170, 170, 170);
    color: rgb(92, 92, 92);
  }
  .inp {
    margin-top: 10px;
  }
  .button {
    margin-top: 20px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }
}
::v-deep .el-card__body {
  padding-left: 0;
}
</style>
