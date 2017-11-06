import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iosUrl: null,
    companys: [
      {
        headImgUrl: 'https://www.xxjr.com/images/icon/cardH5_loge.png', // 头像
        userName: '房地产经纪之家', // 用户名
        telephone: '0755-82552247', // 电话
        personDesc: '这里是全国最大房产联盟，40万专业房产经理智慧学习、交流平台！无论是新房、二手房，还是买房、卖房、租房，这里都能找到；无论是拓展客户、开单话术，还是地产学习，这里都应有尽有。' // 个人简介
      },
      {
        headImgUrl: 'https://www.xxjr.com/images/icon/bbzs_logo.png', // 头像
        userName: '保保助手', // 用户名
        telephone: '0755-23607473', // 电话
        personDesc: '保保助手始终坚持客户第一、服务至上，致力于为保险代理人打造最优质的展业宣传工具，为您顺利签单提供帮助，至今已为全国10万保险代理人提供服务，欢迎您来体验。' // 个人简介
      },
      {
        headImgUrl: 'https://sys.xxjr.com/wxtools/images/tool/logo.jpg', // 头像
        userName: '小小金融', // 用户名
        telephone: '0755-83254087', // 电话
        personDesc: '小小金融始终坚持“顾客第一、服务至上、专业专注、精益求精”的原则。一步一个脚印、踏踏实实，不断追求优秀的产品与服务品质，全力打造公司成为深圳乃至全国的优秀与知名服务品牌。' // 个人简介
      }
    ],
    // 没有关注公众号就去关注页 subscribe=1为关注
    subscribe: 1,
    // autoReg 是否是自动注册的用户，为1 说明他没有设置名片信息
    autoReg: 0
  },
  mutations: {
    setScribe: (state, newVal) => { state.subscribe = newVal },
    setReg: (state, newVal) => { state.autoReg = newVal },
    setUrl: (state, newVal) => { state.iosUrl = newVal }
  }
})
