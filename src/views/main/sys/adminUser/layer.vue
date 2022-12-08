<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" label-position="left"
             style="margin-left:50px;margin-right: 30px">
      <el-form-item label="用户名" prop="businessName">
        <el-input v-model="form.username" placeholder="商家名称"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="businessAddress">
        <el-input v-model="form.nickname" placeholder="商家地址"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="cover">
        <image-uploader v-model:image-url="form.cover"></image-uploader>
      </el-form-item>
      <el-form-item label="角色 待完成" prop="type">
        <el-select v-model="form.type" placeholder="请选择" clearable>
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, ref} from 'vue'
import {add, update} from '@/api/sys/adminUser'
import {selectData, radioData} from './enum'
import Layer from '@/components/layer/index.vue'
import {uploadUrl} from "@/api/upload";
import imageUploader from "@/components/ImageUploader/index.vue";

export default defineComponent({
  components: {
    Layer, imageUploader
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const ruleForm: Ref<ElFormItemContext | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    let form = ref({
      name: '',
      cover: ''
    })
    const rules = {
      name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      number: [{required: true, message: '请输入数字', trigger: 'blur'}],
      choose: [{required: true, message: '请选择', trigger: 'blur'}],
      radio: [{required: true, message: '请选择', trigger: 'blur'}]
    }
    init()

    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {

      }
    }

    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      radioData,
      uploadUrl
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            if (this.layer.row) {
              this.updateForm(params)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      add(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$emit('getTableData', true)
            this.layerDom && this.layerDom.close()
          })
    },
    // 编辑提交事件
    updateForm(params: object) {
      update(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$emit('getTableData', false)
            this.layerDom && this.layerDom.close()
          })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
