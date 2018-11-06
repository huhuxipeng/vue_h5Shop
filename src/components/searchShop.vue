<template>
  <div class="goods-list-page">
    <div class="top-header headerClass">
      <i class="goback icon-back" v-if="hasBack" v-on:click="goBack">
        <</i>
      <span class="search">
						<em class="icons search-btn"></em>
						<input type="text" placeholder="请输入商品名称" v-model="product" class="input" ref='input'>
					</span>
      <span class="sousuo" @click="search">搜索</span>
    </div>
    <div class="top-header-space"></div>
    <section class="goods-list" v-if="this.goodList.length==0?false:true"
             style="position:absolute;top:1.2rem;left:0;right:0;bottom:0;">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <ul>
          <li v-for="(item,index) in goodList" @click="godetail(index,item)">
            <section><img :src="item.image | filterss(2)" :onerror="logo"></section>
            <h2 class="names">{{item.name}}
              <span class="fig" v-if="item.goodsType==1">海外商品</span>
            </h2>
            <span>
							<i>
								<em>￥</em>{{Number(item.price).toFixed(2)}}</i>
							<i class="pri-line">￥{{Number(item.mktprice).toFixed(2)}}</i>
						</span>
            <label>
              <u>可获</u>
              <p>红积分:
                <em>{{item.redPoint |strings}}</em>
              </p>
            </label>
          </li>
        </ul>
      </mt-loadmore>
    </section>
    <div class="bg" v-if="this.goodList.length>0?false:true">

    </div>
  </div>
</template>
<script>
  import commonTop from "../components/commonTop";

  export default {
    data() {
      return {
        goodsPic: require("../common/image/upload/goods-1.jpg"),
        goodList: [],
        logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
        hasBack: true,
        product: "",
        indesNumber: 1,
        size: 0,
        url: "/goods/selectGoodsByParams",//获取商品列表的接口地址
        pageNo: 1,
        allLoaded: false //是否全部加载完毕
      };
    },
    mounted() {
      this.$refs["input"].focus();
      if (this.$route.query.state == 0) {
        this.search()
      }
      console.log(this.goodList.length);
      if (sessionStorage.getItem("goodList")) {
        this.goodList = JSON.parse(sessionStorage.getItem("goodList"));
      }
      sessionStorage.removeItem("goodList");
    },
    methods: {
      loadBottom() {
        //加载更多
        console.log("触发下拉加载");
        var params = {
          goodName: this.product,
          pageSize: 10,
        };
        this.$api.loadMore(this, params, this.url, this.goodList);
      },
      search(even) {
        // if (this.product == "") {
        //   alert("搜索内容不能为空");
        // } else {
        this.goodList = [];
        this.$axios({
          method: "post",
          url: this.url,
          responseType: "json",
          data: {
            goodName: this.product,
            pageNo: 0,
            pageSize: 10
            //								pageNo: this.indesNumber,
            //								pageSize: 6
          }
        })
          .then(data => {
            if (data.data.res_data.total > 0) {
              this.size = data.data.res_data.pages;
              for (let i = 0; i < data.data.res_data.dataList.length; i++) {
                this.goodList.push(data.data.res_data.dataList[i]);
              }
              sessionStorage.goodList = JSON.stringify(this.goodList);
            } else {
              alert("没有搜索到该商品");
            }
          })
          .catch(err => {
            console.log(err);
          });
        // }

        if (this.indesNumber == this.size) {
          window.removeEventListener("scroll", this.scrollRun);
        }
      },
      scrollRun: function () {
        var scrollTopH =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (
          document.body.scrollHeight != document.documentElement.clientHeight &&
          document.body.scrollHeight - scrollTopH ===
          document.documentElement.clientHeight
        ) {
          this.indesNumber++;
          if (this.indesNumber <= this.size) {
            this.search();
          }
        }
      },
      goBack() {
        this.$router.go(-1);
        sessionStorage.removeItem("goodList");
      },
      godetail(index, item) {
        sessionStorage.detail = item.goodsId;

        let goodsId = item.goodsId;
        // var hz='#mp.weixin.qq.com';//拨号防屏蔽后缀节点，必须放最后面
        this.$router.push({
          path: "/goods/detail",
          query: {
            goodsId: goodsId
            // hz,
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .headerClass {
    background: white;
    z-index: 100;
    .goback {
      font-size: 0.6rem;
      color:rgb(240,240,240);
      line-height: 1.2rem;
    }
    .searchs {
      padding-right: 0.2rem;
      padding-left: 0.8rem;
      .input {
        width: 5rem;
        font-size: 0.4rem;
      }
    }
    .sousuo {
      float: right;
      margin-top: -0.75rem;
      border: 1px solid orangered;
      text-align: center;
      padding: 0.2rem .3rem;
      color: orangered;
      margin-right: 0.45rem;
      display: inline-block;
      border-radius: .4rem;
    }
  }

  .bg {
    height: 20rem;
    background: url(../common/image/pic_没有数据@2x.png) no-repeat;
    background-size: 100%;
  }

  .names {
    width: 4rem;
    max-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
</style>
