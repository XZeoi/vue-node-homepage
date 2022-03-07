<template>
  <div class="tag-page">
    <h2>标签管理</h2>
    <div class="main-tag">
      <h3>主标签管理</h3>
      <tag-group :tags="mainTags" path="main_tags" ></tag-group>
    </div>

    <div class="sub-tag">
      <h3>副标签管理</h3>
      <tag-group :tags="subTags" path="sub_tags"></tag-group>
    </div>
    <!-- <div class="sub-tag">
      <h3>副标签管理</h3>
      <div class="main-tag-area">
        <span class="tag-item" 
          v-for="(item,i) of mainTags" 
          :key="i" 
          >
          <span 
            class="tag-container"
            v-if="isClickStatus !== i" 
            @click="isClickStatus = i" 
            @mouseover="isIconCloseStatus = i" 
            @mouseout="isIconCloseStatus = -1"
          >
            <span>{{item.name}}</span>
            <i class="iconfont icon-close tag-close-area" v-show="isIconCloseStatus == i" @click="remove(item)"></i>
          </span>
          <span v-else>
            <input v-model="item.name" class="tag-input" v-focus @blur="isClickStatus = -1">
            <el-button type="text" size="small" @click="isClickStatus = -1">取消</el-button>
            <el-button type="text" size="small" @click="mainTagSave(item._id)">确认</el-button>
          </span>
        </span>
        

        <span v-if="isWriteStatus" class="tag-item" @click="isWriteStatus = 0"><i class="el-icon-plus"></i>添加</span>
        <span v-else class="tag-item" ref="theCreatedArea">
          <input v-model="newMainTag.name" class="tag-input" v-focus>
          <el-button type="text" size="small" @click="isWriteStatus = 1">取消</el-button>
          <el-button type="text" size="small" @click="mainTagSave()">确认</el-button>
        </span>
      </div>
    </div> -->

  </div>
</template>

<script>
import TagGroup from '@/components/TagGroup.vue'
export default {
  components: {
    TagGroup
  },
  data() {
    return {
      // newMainTag: {},
      mainTags: [],
      // newSubTag: {},
      subTags: [],
      // // 新增标签显示与修改状态
      // isWriteStatus: 1,
      // // 标签显示与修改状态
      // isClickStatus: -1,
      // // 标签删除图标状态，默认不显示
      // isIconCloseStatus: -1   
    }
  },
  directives: {
    // focus: {
    //   // 指令的定义
    //   inserted: function (el) {
    //     el.focus()
    //   }
    // }
  },
  created() {
    /* 执行 */
    this.fetchMainTags()
    this.fetchSubTags()

    // /* 新增tag区外点击，隐藏该新增tag输入区 */
    // document.addEventListener('click', (e) => {
    //   if (this.$refs.theCreatedArea) {
    //     let isSelf = this.$refs.theCreatedArea.contains(e.target)
    //     if (!isSelf) {
    //       this.newMainTag = {}
    //       this.isWriteStatus = 1
    //     }
    //   }
    // })
  },
  mounted() {
    this.$eventBus.$on("update", (res, path) => {
      // 因为main_tags和sub_tags在delete及save中共用一个TagItem组件，所以需要判断。
      // [思考] 怎样把组件的事件接口封装出去？
      if (path == 'main_tags') {
        this.mainTags = res.data
      } else {
        this.subTags = res.data
      }
    })
  },
  beforeDestroy () {
    this.$eventBus.$off("update");
  },
  methods: {

    // cancel() {
    //   this.isClick = -1;
    //   console.log('-1', this.isClick)
    // },
    /* 获取后台数据库中mainTags */
    async fetchMainTags() {
      // 1. 从后台获取主标签数据
      // if() {}
      const res = await this.$http.get('main_tags')
      this.mainTags = res.data
    },
    async fetchSubTags() {
      console.log('woaini');

      // 1. 从后台获取副标签数据
      // const res = await this.$http.get('technical_articles')
      const res = await this.$http.get('sub_tags')
      this.subTags = res.data
    },
    // async mainTagSave(id = 0) {
    //   if (id !== 0) {
    //     // 一. 如果id存在，表示修改TAG
    //     // 1. 更新当前TAG
    //     await this.$http.put(`main_tags/${id}`, this.newMainTag)
    //     // 2. 关闭当前TAG输入框
    //     this.isClickStatus = -1
    //     // 3. 更新当前TAG
    //     this.fetchMainTags()
    //   } else {
    //     console.log('ASAS');
    //     // 二. id 不存在，表示新增TAG
    //     await this.$http.post("main_tags", this.newMainTag)
    //     // 清空input输入框内容
    //     this.newMainTag = {}
    //     // 关闭输入框
    //     this.isWriteStatus = 1
    //     // 更新mainTags
    //     this.fetchMainTags()
    //   }
    // },
    // // 删除具体的TAG
    // async remove(item) {
    //   this.$confirm(`是否确认删除主标签"${item.name}"`,'提示',{
    //     confirmButtonText: '确认',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async ()=>{
    //     await this.$http.delete(`main_tags/${item._id}`)
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功'
    //     })
    //     this.isIconCloseStatus = -1
    //     this.fetchMainTags()
    //   }).catch(()=> {
    //     this.isIconCloseStatus = -1
    //   })
      
    // }
    
  }
}
</script>

<style scoped>
/* .tag-item {
  
  border: 1px dashed #999;
  border-radius: 2px;
  padding: 1px 4px;
  margin-right: 5px;
  cursor: pointer;
}

.tag-input {
  outline: none;
  border: none
}

.tag-container {
  position: relative;
}

.tag-close-area {
  position: absolute;
  right: -14px;
  top: -12px;
  font-size: 20px;
} */

</style>