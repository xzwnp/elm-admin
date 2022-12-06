<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="商家名称" prop="businessName">
        <el-input v-model="form.businessName" placeholder="商家名称"></el-input>
      </el-form-item>
      <el-form-item label="商家密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="商家地址" prop="businessAddress">
        <el-input v-model="form.businessAddress" placeholder="商家地址"></el-input>
      </el-form-item>
      <el-form-item label="商家介绍" prop="businessExplain">
        <el-input v-model="form.businessExplain" placeholder="商家介绍"></el-input>
      </el-form-item>
      <el-form-item label="商家图片" prop="cover">
        <!--        todo 上传图片-->
        <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.cover" :src="form.cover" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="点餐分类" prop="type">
        <el-select v-model="form.type" placeholder="请选择" clearable>
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起送费" prop="startPrice">
        <el-input v-model="form.startPrice" placeholder="起送费"></el-input>
      </el-form-item>
      <el-form-item label="配送费" prop="deliveryPrice">
        <el-input v-model="form.deliveryPrice" placeholder="配送费"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="红包" prop="redPacket">
        <el-input v-model="form.redPacket" placeholder="红包"></el-input>
      </el-form-item>
      <el-form-item label="评分" prop="score">
        <el-input v-model="form.score" placeholder="评分"></el-input>
      </el-form-item>
      <el-form-item label="折扣" prop="discounts">
        <el-input v-model="form.discounts" placeholder="折扣"></el-input>
      </el-form-item>
      <el-form-item label="销量" prop="sellCount">
        <el-input v-model="form.sellCount" placeholder="销量"></el-input>
      </el-form-item>
      <el-form-item label="热门评论" prop="hotComment">
        <el-input v-model="form.hotComment" placeholder="热门评论"></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, ref} from 'vue'
import {add, update} from '@/api/business'
import {selectData, radioData} from './enum'
import Layer from '@/components/layer/index.vue'

export default defineComponent({
  components: {
    Layer
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
