var app = getApp()
Page({
    data: {
        isLoading:true,
        isBottom:false,
        movieListData:[],
        movieType: 'in_theaters',
        pageIndex: 1,
        count: 10
    },
    onLoad: function (options) {
    },
    onReady: function () {
        const that=this
        wx.request({
            url: `https://api.douban.com/v2/movie/${this.data.movieType}?start=${this.data.start}&count=${this.data.count}`,
            header: {
                'content-type': 'json'
            },
            success: function (res) {
                let  movieListData=[].concat(that.data.movieListData)
                if(movieListData.length>0){
                    movieListData=movieListData.concat(res.data.subjects)
                }else {
                    movieListData=res.data.subjects
                }
                console.log(movieListData)

                that.setData({
                    movieListData:movieListData,
                    isLoading:false,
                    pageIndex: that.data.pageIndex+1
                })
            },
            fail:function (res) {
                console.log(res)
            }
        })
    },
    getMoreData:function () {

        // 防止手贱多次请求
        if(this.data.isBottom){
            return
        }
        this.setData({
            isBottom:true
        })

        // 正式请求数据
        const that=this

        let movieListData=[].concat(that.data.movieListData)
        wx.request({
            url:`https://api.douban.com/v2/movie/${this.data.movieType}?start=${(this.data.pageIndex-1)*this.data.count}&count=${this.data.count}`,
            header: {
                'content-type': 'json'
            },
            success: function (res) {
                if(movieListData.length>0){
                    movieListData=movieListData.concat(res.data.subjects)
                }else {
                    movieListData=res.data.subjects
                }
                console.log(movieListData)

                that.setData({
                    movieListData:movieListData,
                    isLoading:false,
                    isBottom:false,
                    pageIndex: that.data.pageIndex+1
                })
            },
            fail:function (res) {
                console.log(res)
            }
        })
    },
    changeMovieType:function (e) {
        console.log(e.target.dataset.movieType)
        this.setData({
            movieType: e.target.dataset.movieType,
            isLoading:true,
            isBottom:false,
            movieListData:[],
            pageIndex: 1,
            count: 10
        })
        this.getMoreData()

    }
})
