<template>
  <div class="main-page">

    <!--  Container 布局容器 -->
    <el-container style="height: 100vh;">
      
      <!-- 侧边 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <!-- 菜单栏 -->
            <!-- :default-openeds="['1']" 加上之后有BUG，会导致我们在点击非默认的选项后，会自动关闭该选项的子菜单，而展开默认打开的index='1'的子菜单-->
          <el-menu 
            router
            unique-opened 
            :default-active="$route.path"
          >
            <!-- 子菜单：标签管理 -->
            <el-submenu index="1">
              <template slot="title"><i></i>标签管理</template>
              <el-menu-item-group>
                <el-menu-item index="/tags">标签</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 子菜单：内容管理 -->
            <el-submenu index="2">
              <template slot="title"><i></i>内容管理</template>
              <el-menu-item-group>
                <template slot="title">文章管理</template>
                <el-menu-item index="/technical_articles">技术文章</el-menu-item>
                <el-menu-item index="/my_articles">日志文章</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">摄影作品管理</template>
                <el-menu-item index="/photographs">摄影作品</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">设计作品管理</template>
                <el-menu-item index="/designs">设计作品</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">绘画作品管理</template>
                <el-menu-item index="/drawings">绘画作品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 子菜单：运营管理 -->
            <el-submenu index="3">
              <template slot="title"><i></i>运营管理</template>
              <el-menu-item-group>
                <el-menu-item>标签</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 子菜单：系统设置 -->
            <el-submenu index="4">
              <template slot="title"><i></i>系统设置</template>
              <el-menu-item-group>
                <template slot="title">管理员</template>
                <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
      </el-aside>

      <!--  -->
      <el-container>

        <!-- 顶部栏区 -->
        <el-header>

        </el-header>

        <!-- 内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>