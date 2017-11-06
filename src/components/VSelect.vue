<template>
  <div class="resume-field" :class="className">
    <div class="cell-label">
      <slot name="label">{{label}}</slot>
    </div>
    <div class="cell-value">
      <div class="select-text" @click="select">{{currentValue || placeholder}}</div>
      <div class="cell-error" v-if="!!error">{{error}}</div>
    </div>
    <mt-popup v-model="show" position="bottom" :closeOnClickModal="false" class="select-layer">
      <div class="popup-header clearfix">
        <mt-button class="cancel-btn fl" @click="cancelHandle">取消</mt-button>
        <mt-button class="confirm-btn fr" @click="confirmHandle">完成</mt-button>
      </div>
      <mt-picker :slots="slots" ref="picker" :valueKey="valueKey"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
/**
 * data = ['', '']
 * keyName,valueKey data = [{}, {}]
 */
export default {
  name: 'v-select',
  props: {
    label: String,
    keyName: String,
    valueKey: String,
    placeholder: String,
    className: String,
    value: {},
    data: Array,
    error: String
  },
  data () {
    let slots = this.getCurrentValue(this.data)
    return {
      currentValue: slots.currentValue,
      show: false,
      slots: [{
        defaultIndex: slots.index,
        values: slots.data
      }]
    }
  },
  watch: {
    value (val) {
      let slots = this.getCurrentValue(this.data)
      this.currentValue = slots.currentValue
      this.slots[0]['defaultIndex'] = slots.index
      this.slots[0]['values'] = slots.data
    }
  },
  methods: {
    // 获取当前值
    getCurrentValue (data) {
      let index = 0
      let currentValue = ''
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (!this.keyName) {
          if (item === this.value) {
            currentValue = item
            index = i
            break
          }
        } else {
          if (item[this.keyName] === String(this.value)) {
            currentValue = item[this.valueKey]
            index = i
            break
          }
        }
      }
      return {
        index: index,
        currentValue: currentValue,
        data: data
      }
    },
    // 选择事件
    select () {
      this.show = true
      if (this.error) this.$emit('error')
    },
    // 取消事件
    cancelHandle () {
      this.show = false
    },
    // 确定事件
    confirmHandle () {
      let pickerValue = this.$refs['picker'].getValues()[0]
      if (!this.keyName) {
        this.currentValue = pickerValue
        this.$emit('input', pickerValue)
      } else {
        this.currentValue = pickerValue[this.valueKey]
        this.$emit('input', pickerValue[this.keyName])
      }
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.select-layer {
  width: 100%;
  .popup-header {
    height: .76rem;
    background: #f0f1f3;
    border-bottom: 1px solid rgba(200, 201, 204, .9);
    .mint-button {
      height: .76rem;
      padding: 0 .28rem;
      font-size: .28rem;
      color: #333;
      background: inherit;
      box-shadow: 0 0;
      &.confirm-btn {
        color: #f66634;
      }
    }
  }
  .picker {
    background: #d2d5dc;
  }
}
</style>
