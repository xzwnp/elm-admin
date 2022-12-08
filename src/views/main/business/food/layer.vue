<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="食品名称" prop="foodName">
        <el-input v-model="form.foodName" placeholder="食品名称"></el-input>
      </el-form-item>
      <el-form-item label="食品介绍" prop="foodExplain">
        <el-input v-model="form.foodExplain" placeholder="食品介绍"></el-input>
      </el-form-item>
      <el-form-item label="食品价格" prop="foodPrice">
        <el-input v-model="form.foodPrice" placeholder="食品介绍"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="originPrice">
        <el-input v-model="form.originPrice" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <image-uploader v-model:image-url="form.cover"></image-uploader>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, ref} from 'vue'
import {add, update} from '@/api/business/food'
import {selectData, radioData} from './enum'
import Layer from '@/components/layer/index.vue'
import ImageUploader from "@/components/ImageUploader/index.vue";

export default defineComponent({
  components: {
    Layer,
    ImageUploader
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
      name: ''
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
      radioData
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