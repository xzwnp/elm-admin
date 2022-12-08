<template>
  <div>
    <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
    >
      <div style="width: 150px;height: 150px">
        <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="contain"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {uploadUrl} from "@/api/upload";
import {ElMessage} from "element-plus";

export default defineComponent({
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },
  //修改父组件的基本数据类型的值,该方法无需定义,update开头即可
  emits: ["update:imageUrl"],
  setup(props, context) {
    function handleAvatarSuccess(res: any) {

      //props中如果是一个基本数据类型,直接修改是无效的
      // props.imageUrl = res.data
      console.log(res)
      if (res.code !== 20000) {
        ElMessage({
          message: res.message || '服务异常',
          type: 'error',
          duration: 3 * 1000
        })
      } else {
        context.emit("update:imageUrl", res.data)
        console.log(props.imageUrl)
      }

    }

    return {
      uploadUrl,
      handleAvatarSuccess
    }
  }
})
</script>