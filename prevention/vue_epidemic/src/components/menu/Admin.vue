<template>
  <div class="common" style="height: 100vh; overflow: hidden">
    <!-- //头部 -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <el-dropdown>
          <span class="el-dropdown-link">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="el-icon-s-tools"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>
              <el-button type="text" @click="outlogin">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="dropdown-divider"></div>
      </ul>
    </nav>
    <!-- //左侧菜单 -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a to="/admin/home" class="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span v-text="type" class="brand-text font-weight-light"></span>
      </a>
      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              :src="touxiang"
              class="img-circle elevation-2"
              alt="User Image"
              style="width: 3rem; height: 3rem"
            />
          </div>
          <div class="info">
            <a href="#" v-text="username" class="d-block"></a>
          </div>
        </div>
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <router-link
              tag="li"
              v-for="(item, index) in navActive"
              :key="index"
              class="nav-item"
              :to="item.path"
            >
              <a class="nav-link">
                <i :class="item.icon"></i>
                <p>
                  {{ item.title }}
                </p>
              </a>
            </router-link>
            <li class="nav-item has-treeview">
              <a class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                  聊天
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right">2</span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <router-link tag="li" to="/admin/otp" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>群聊</p>
                  </a>
                </router-link>
                <router-link tag="li" to="/admin/oto" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>私聊</p>
                  </a>
                </router-link>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h5 class="m-0 text-dark"></h5>
            </div>
          </div>
        </div>
      </div>
      <section
        class="content"
        style="height: 100vh; overflow-y: scroll; padding-bottom: 100px"
      >
        <div class="container-fluid">
          <el-row style="padding: 10px 10px">
            <el-col :span="24">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
    <aside class="control-sidebar control-sidebar-dark"></aside>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      type: "",
      touxiang: "",
      username: "",
      navActive: [
        {
          path: "/admin/student",
          title: "学生管理",
          icon: "nav-icon fa fa-user-circle",
        },
        {
          path: "/admin/teacher",
          title: "教师管理",
          icon: "nav-icon fa fa-user-circle",
        },
        {
          path: "/admin/noticeSend",
          title: "通知管理",
          icon: "nav-icon fa fa-comments",
        },
        {
          path: "/admin/add",
          title: "添加班级",
          icon: "nav-icon fa fa-window-restore",
        },
        {
          path: "/admin/user",
          title: "个人信息",
          icon: "nav-icon fa fa-user-circle",
        },
      ],
    };
  },

  created() {
    /**
             * 渲染菜单信息
             this.touxiang 头像路径
             this.username 用户名
             this.type 显示的类型
             */
    this.$axiosjwt({
      url: "/users/getUserDataByToken",
      method: "get",
      data: {},
      success: (result) => {
        if (result.type == 1) this.type = "管理员";
        else if (result.type == 2) this.type = "学生";
        else if (result.type == 3) this.type = "教师";
        this.username = result.username;
        this.touxiang = this.basePath + "/file/" + result.head;
      },
      error: () => {
        this.$router.push("/");
      },
    });
  },

  methods: {
    outlogin() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.content::-webkit-scrollbar {
  display: none;
}
</style>
