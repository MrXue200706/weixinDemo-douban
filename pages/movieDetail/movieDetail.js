var app = getApp()
Page({
    data: {
        isLoading:true,
        movieDetailData:{},
        id:''
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },
    onReady: function () {
        const that=this
        wx.request({
            url: `https://api.douban.com/v2/movie/subject/${this.data.id}`,
            header: {
                'content-type': 'json'
            },
            success: function (res) {
                that.setData({
                    movieDetailData:res.data,
                    isLoading:false
                })
            },
            fail:function (res) {
                console.log(res)
            }
        })
    }
})
