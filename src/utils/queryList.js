// 列表需要的变量，用Object.assign添加到vue data里面
var queryParam = {
  listData: [],
  loading: true,
  loadingImg: true,
  isOver: false,
  noResult: false,
  pageNo: 1
}
// 公共列表查询函数
function search (url, page, self, param) {
  if (page && page === 1) {
    self.listData = []
    self.pageNo = 1
  } else {
    self.pageNo ++
  }
  self.loadingImg = true
  self.loading = true
  self.isOver = false
  self.noResult = false
  let obj = param || {}
  obj['currentPage'] = self.pageNo
  self.$ajax({
    url: url,
    data: obj,
    success: data => {
      self.loadingImg = false
      if (data.page.totalRecords === 0) {
        self.noResult = true
        self.loading = true
        self.isOver = false
        return
      } else {
        self.noResult = false
      }
      self.listData = self.listData.concat(data.rows)
      data.page.totalPage <= self.pageNo ? self.loading = true : self.loading = false
      data.page.totalPage <= self.pageNo ? self.isOver = true : self.isOver = false
    },
    fail: () => {
      self.loadingImg = false
      self.noResult = true
    }
  })
}

module.exports.search = search
module.exports.queryParam = queryParam
