<template>
  <div class="userPage">
    <div class="user-form">
      <p class="user__title">基本信息</p>
      <div class="user-cell avatar-cell" style="height:1.72rem;">
        <p class="user-cell__label">头像</p>
        <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
          <img :src="form.headImgUrl" class="user-cell__avatar" @click="upload">
        </simple-cropper>
        <!-- <img class="user-cell__avatar" :src="form.headImgUrl" @click="upImg"> -->
      </div>
      <div class="user-cell">
        <p class="user-cell__label">姓名</p>
        <input class="user-cell__input" v-model="form.userName" placeholder="请输入您的姓名"></input>
      </div>
      <div class="user-cell">
        <p class="user-cell__label">手机号</p>
        <input class="user-cell__input" maxlength="15" v-model="form.telephone" placeholder="请输入您的手机号"></input>
      </div>
      <div class="user-cell">
        <p class="user-cell__label">公司名称</p>
        <input class="user-cell__input" v-model="form.company" placeholder="请输入您的公司名称"></input>
      </div>
      <p class="user__title">个人简介</p>
      <textarea class="user-cell__textarea" v-model="form.personDesc" placeholder="请输入您的个人简介" />
      <button class="save__btn default__btn" @click="save()">保存到已购动画</button>
    </div>
    <!-- <p class="copyright__text">Copyright © 2016 小小金融</p> -->
    <big-loading :bigLoading="bigLoading" text="保存中，请稍等..."></big-loading>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import SimpleCropper from '@/components/SimpleCropper'
import TabBar from '@/components/TabBar'
export default {
  name: 'list',
  data () {
    return {
      uploadParam: {
        fileType: 'recruit',
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg',
        scale: 4
      },
      bigLoading: false,
      form: {
        headImgUrl: '', // 头像
        userName: '', // 用户名
        telephone: '', // 电话
        company: '', // 公司
        personDesc: '' // 个人简介
      }
    }
  },
  created () {
    this.$ajax({
      url: '/animation/getCustInfo',
      data: {},
      success: data => {
        let custInfo = data.attr.custInfo
        if (custInfo.customerId) {
          this.form = custInfo
        } else {
          this.form.headImgUrl = require('@/assets/images/404_img.png')
        }
      }
    })
  },
  methods: {
    save () {
      this.bigLoading = true
      this.$ajax({
        url: '/animation/saveCust',
        data: this.form,
        success: data => {
          this.bigLoading = false
          this.$messagebox.alert('保存成功!').then(action => {
            if (action === 'confirm') {
              this.$router.push('/bought')
            }
          })
        },
        fail: () => {
          this.$toast('保存失败,请检查填写信息是否规范。')
          this.bigLoading = false
        }
      })
    },
    // 上传头像成功回调
    uploadHandle (data) {
      if (data.state === 'SUCCESS') {
        this.$set(this.form, 'headImgUrl', data.fileId)
      }
    },
    // 上传头像
    upload () {
      this.$refs['cropper'].upload()
    }
  },
  components: {
    SimpleCropper,
    TabBar
  }
}
</script>
