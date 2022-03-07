<template>
  <div class="tag-item-component">
      <!-- 普通tag -->
      <div v-if="!plus">
          <div v-if="tag">
            <div 
              class="tag-item tag-container"
              style="background: #ebf5ff; color:#67b1ff"
              v-if="isClickStatus !== tag._id" 
              @click="tagClick" 
              @mouseenter="isDeleteStatus = tag._id" 
              @mouseleave="isDeleteStatus = -1"
            >
              {{tag.name}}
              <!-- 这里若加上span标签，就会出现bug，“点击目标区域外隐藏目标区域”这个功能就会有bug，
              当点击span区域内，我们会发现e.target返回的是false，而不是true；只有当去掉span后，就不会出现这样的bug；
              这个bug几乎耗费了我一个晚上，虽然解决了问题，但目前为止还未清楚bug产生的原因[待解决] -->
              <!-- <span>{{tag.name}}</span> -->
              <i class="iconfont icon-close tag-close-area" v-show="isDeleteStatus == tag._id" @click="remove(tag)"></i>
            </div>

            <div v-else class="tag-item" ref="theClickArea" id="test">
              <!-- <input v-model="tag.name" class="tag-input" v-focus @blur="isClickStatus = -1"> -->
              <input v-model="tag.name" class="tag-input" v-focus @keyup.enter="tagUpdate(tag._id)">
              <el-button type="text" size="small" @click="cancelUpdate">取消</el-button>
              <el-button type="text" size="small" @click=" tagUpdate(tag._id)">确认</el-button>
            </div>
          </div>
      </div>

      <!-- 新增tag -->
      <div v-else>
        <span v-if="isCreateStatus" class="tag-item" @click="isCreateStatus = 0"><i class="el-icon-plus"></i>添加</span>
        <span v-else class="tag-item" ref="theCreateArea">
          <input v-model="newMainTag.name" class="tag-input" v-focus @keyup.enter="save()">
          <el-button type="text" size="small" @click="cancelCreate">取消</el-button>
          <el-button type="text" size="small" @click="save()">确认</el-button>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: { type: Object },
    path: { type: String },
    plus: { type: Boolean, default: false }
  },
  data() {
    return {
      isClickStatus: -1,
      isDeleteStatus: -1,
      isCreateStatus: -1,

      newMainTag: {},
      // 暂时存储当前tag原始name
      metaName: ""
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  mounted() {
    /* 修改、新增tag区外点击，隐藏该修改、新增tag输入区 */
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      // 修改
      if (this.$refs.theClickArea) {
        // 判断触发点击事件的那个元素是不是 目标元素 所在的目标区域
        let isSelf = this.$refs.theClickArea.contains(e.target)
        // 当点击该区域外才执行
        if (!isSelf) {
          // 当修改tag后，但没有确认，此时我们需要重置
          // 所以当点击输入框外，需要重置v-model为原有值
          this.tag.name = this.metaName
          // 关闭修改状态
          this.isClickStatus = -1
          // 关闭删除状态
          this.isDeleteStatus = -1
        }
      }

      // 新增
      if (this.$refs.theCreateArea) {
        let isSelf = this.$refs.theCreateArea.contains(e.target)
        console.log('new',isSelf);

        if (!isSelf) {
          // 新增tag
          this.newMainTag = {}
          this.isCreateStatus = -1
        }
      }
    })
  },
  methods: {
    /* 一、普通tag */ 
    /* 1、点击tag */
    tagClick() {
      // 1). 点击tag，即进入修改状态
      this.isClickStatus = this.tag._id; 
      // 2). 暂时将该tag的name存储在一个中间值metaName上
      this.metaName = this.tag.name

      console.log('tagClick', this.isClickStatus)
    },
    /* 2、取消修改 */
    cancelUpdate() {
      // 1). 校验是否已经改动过了v-model值
      this.tag.name = this.metaName;
      // 2). 关闭修改状态
      this.isClickStatus = -1;
      // 3). 关闭删除状态
      this.isDeleteStatus = -1
    },
    /* 3、更新修改的tag */ 
    async tagUpdate(id) {
      if ( this.tag.name !== this.metaName) {
        // 1). 更新
        await this.$http.put(`${this.path}/${id}`, this.tag)
        // 2). 关闭“修改”状态
        this.isClickStatus = -1
        // 3). 关闭“删除”状态
        // 由于点击tag后进入修改状态，此时鼠标移出tag事件就会失效（所在的DOM隐藏了）
        this.isDeleteStatus = -1
      } else {
        // 1). 当未改动name时，点击确认，不发送数据，只关闭当前修改状态
        this.isClickStatus = -1
        // 2). 由于点击tag后进入修改状态，此时鼠标移出tag事件就会失效（所在的DOM隐藏了）
        this.isDeleteStatus = -1
      }
    },
    /* 4. 删除tag */
    remove(item) {
      this.$confirm(`是否确认删除主标签"${item.name}"`,'提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
        await this.$http.delete(`${this.path}/${item._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.isDeleteStatus = -1
        // 拉取新增后的tags，并将数据发给tag页面
        const res = await this.$http.get(`${this.path}`)
        this.$eventBus.$emit('update', res, this.path)
      }).catch(()=> {
        this.isDeleteStatus = -1
      })
    },

    /**************/
    /* 二、新增tag */
    /* 1、取消新增 */
    cancelCreate() {
      // 1) 清空
      this.newMainTag = {}
      // 2) 关闭“新增”状态
      this.isCreateStatus = -1
    },
    /* 2、新增tag */
    async save() {
      // 1. 若为空
      if (this.newMainTag == {}) {
        this.isCreateStatus = -1
      } else {
        // 1. 想后台新增数据
        await this.$http.post(`${this.path}`, this.newMainTag)
        // 2. 清空
        this.newMainTag = {}
        // 3. 关闭
        this.isCreateStatus = -1
        // 4. 拉取新增后的tags，并将数据发给tag页面
        const res = await this.$http.get(`${this.path}`)
        this.$eventBus.$emit('update', res, this.path)
      }
    }
  }
}
</script>

<style scoped>
.tag-item {
  
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
}
</style>