<template>
	<div class="goods-list-page fit_panel">
		<!--<commonTop header-type="3" header-class="bg-white" has-back="true"></commonTop>-->
		<!--<mt-header class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>

		</mt-header>-->
		<div class="search">
			<span @click="backgo"></span>
			<input type="text" v-model="searchs" placeholder="请输入商品名称" />
			<span @click="search">搜索</span>
		</div>
		<div class="goods-sort-top"></div>
		<ul class="goods-sort">
			<li class="all" @click="synth">综合</li>
			<li class="price down" @click="moneys">价格
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
			<li class="time" @click="tim">时间
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
			<li class="sell" @click="sales">销量
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
		</ul>

		<section class="goods-list" v-if="this.goodList.length==0?false:true" style="position:absolute;top:1.2rem;left:0;right:0;bottom:0;">
			<mt-loadmore :bottomDistance="1" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='true' ref="allLoaded">
				<ul>
					<li v-for="(item,index) in goodList" @click="details(index)">
						<section><img :src="item.image |filterss(2)" :onerror="logo"></section>
						<h2>{{item.name}}
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
								<em>{{item.redPoint?item.redPoint:'0.00' |strings}}</em>
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
      //    	shows:true,
      goodsPic: require("../common/image/upload/goods-1.jpg"),
      goodsPicOther: require("../common/image/upload/goods-2.jpg"),
      goodsPicTr: require("../common/image/upload/goods-3.jpg"),
      goodsPicOtherFo: require("../common/image/upload/goods-4.jpg"),
      goodList: [],
      catId: "",
      num: 0,
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      url: "/goods/getGoodsByCatId",
      searchs: "",
      pageNo: 1,
      // scroll:'',
      allLoaded: false //是否全部加载完毕
    };
  },
  created() {
  //   window.scrollTo(0, 0);
  // console.log('觸發created')

  },
  mounted: function() {

    // window.addEventListener('scroll', this.menu);

    this.catId = JSON.parse(sessionStorage.getItem("catId"));
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          catId: this.catId,
          pageNo: 1,
          pageSize: 10
        }
      })
        .then(data => {

            // if (sessionStorage.getItem('qian') === 'false'){
              // if (sessionStorage.getItem('goodList')) {
              //   this.goodList = JSON.parse(sessionStorage.getItem('goodList'));

                // alert(parseInt(sessionStorage.getItem('scroll')))
                // document.documentElement.scrollTop(parseInt(sessionStorage.getItem('scroll')))

                // alert($(window).scrollTop())
              // }
            // }
           // else {
            this.goodList = data.data.res_data.dataList;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    // }

  },
  methods: {
    // menu() {
    //   this.scroll = $(window).scrollTop();
    //   if (this.scroll > 200){
    //     sessionStorage.scroll = this.scroll
    //   }
    // },
    loadBottom() {
      //加载更多
      // console.log("触发下拉加载");
      var params = {
        goodName: this.searchs,
        catId: this.catId,
        pageSize: 10,
        sort: this.num,
        orderType: this.orderType
      };
      this.$api.loadMore(this,params,this.url,this.goodList);

      // sessionStorage.goodList = JSON.stringify(this.goodList);
      // console.log(document.documentElement.scrollTop)

    },
    backgo() {
      this.$api.goback();
    },
    search() {
      if (this.searchs == "") {
        alert("搜索内容不能为空");
      } else {
				this.goodList = [];
				this.allLoaded = false;//允许上拉加载
				this.url = "/goods/selectGoodsByParams";
        this.$axios({
          method: "post",
          url: this.url,
          responseType: "json",
          data: {
            goodName: this.searchs,
            pageNo: 1,
            pageSize: 10
          }
        })
          .then(data => {
            if (data.data.res_data.total > 0) {
              this.size = data.data.res_data.pages;
              for (let i = 0; i < data.data.res_data.dataList.length; i++) {
                this.goodList.push(data.data.res_data.dataList[i]);
              }
            } else {
              alert("没有搜索到该商品");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getData() {
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          catId: this.catId,
          pageSize: 10,
          pageNo: 1,
          sort: this.num,
          orderType: this.orderType
        }
      })
        .then(data => {
          this.goodList = data.data.res_data.dataList;
			this.allLoaded = false;//允许上拉加载
        })
        .catch(err => {
          console.log(err);
        });
    },
    synth(e) {
      $(e.target)
        .siblings()
        .removeClass("current");
      $(e.target).addClass("current");
      this.url = "/goods/getGoodsByCatId";
      this.getData();
    },
    moneys(e) {
      $(e.target)
        .siblings()
        .removeClass("current");
      $(e.target).addClass("current");
      if (this.num == 1) {
        this.num = 0;
      } else {
        this.num = 1;
      }
      this.orderType = "price";
      this.url = "/goods/orderGoods";
      this.getData();
    },
    tim(e) {
      $(e.target)
        .siblings()
        .removeClass("current");
      $(e.target).addClass("current");
      if (this.num == 1) {
        this.num = 0;
      } else {
        this.num = 1;
      }
      this.orderType = "create_time";
      this.url = "/goods/orderGoods";
      this.getData();
    },
    sales(e) {
      $(e.target)
        .siblings()
        .removeClass("current");
      $(e.target).addClass("current");
      if (this.num == 1) {
        this.num = 0;
      } else {
        this.num = 1;
      }

      this.orderType = "buy_count";
      this.url = "/goods/orderGoods";
      this.getData();
    },

    //商品详情
    details(index) {
      // sessionStorage.qian = false
      // window.removeEventListener('scroll', this.menu)
      sessionStorage.detail = JSON.stringify(this.goodList[index].goodsId);
      let goodsId = this.goodList[index].goodsId;
      console.log(this.goodList[index]);

      // sessionStorage.qian = false
      this.$router.push({
        path: "/goods/detail",
        query: { goodsId: goodsId }
      });
    }
  },
  components: {
    commonTop: commonTop
  }
};
</script>
<style lang="scss" scoped="scoped">
.bg {
  height: 20rem;
  background: url(../common/image/pic_没有数据@2x.png) no-repeat;
  background-size: 100%;
}
.center {
  background: #fff;
  color: black;
  height: auto;
  font-size: 0.5rem;
  padding: 10px;
}
.goods-list {
  margin-top: 1.2rem;
  /*overflow: scroll;*/
}
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 13;
  padding: 0.3rem;
  vertical-align: middle;
  span {
    font-size: 0.5rem;
    margin-right: 0.3rem;
    color: #1b1b1b;
  }
  span:first-child {
    vertical-align: middle;
    display: inline-block;
    width: 0.5rem;
    height: 0.8rem;
    background: url(../common/image/icons.png) no-repeat;
    background-size: 1000%;
    background-position: -0.1rem -0.1rem;
  }
  input {
    vertical-align: middle;
    border: 1px solid #ccc;
    padding: 0.2rem;
    width: 70%;
  }
  span:last-child {
    vertical-align: middle;
    border: 1px solid orangered;
    color: orangered;
    padding: 0.1rem;
    border-radius: 0.2rem;
    font-size: 0.4rem;
    margin-left: 0.2rem;
  }
}
</style>
