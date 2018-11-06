<template>
  <div class="goods-store-page">
    <div class="recommend_title" v-if="danxian">
      <div class="kong_logo">
        <img src="../common/image/kongCollect.png" alt="" v-if="shoucang">
        <img src="../common/image/gouwuche.png" alt="" v-if="gouwuche">
        <img src="../common/image/dingdan.png" alt="" v-if="dingdan">
      </div>
      <div class="kong_rightinfo">
        <p>{{recommendMessage}}</p>
        <p class="guang" @click="searchshop">马上去逛逛</p>
      </div>
    </div>
    <div class="title" v-if="groupList.length === 0">
      <span>精品推荐</span>
    </div>
    <div class="goods-sort-top"></div>
    <section class="goods-list" style="position:absolute;left:0;right:0;">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <ul>
          <li v-for='(item,index) in shopList' @click="detail(index)">
            <section><img :src="item.image |filterss(2)" :onerror="logo"></section>
            <h2 class="names">{{item.name}}</h2>
            <span>
							<i>
								<em>￥</em>{{Number(item.price).toFixed(2)}}</i>
							<i class="pri-line">
								<em>￥</em>{{Number(item.mktprice).toFixed(2)}}</i>
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
  </div>
</template>
<script>
  import commonTop from "../components/commonTop";
  import commonFooter from "../components/commonFooter";
  export default {
    name: "Recommend",
    props: ["typeCode"],
    data() {
      return {
        storeBan: require("../common/image/upload/store-banner.jpg"),
        productId: 0,
        logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
        shoparr: [],
        shopList: [],
        num: 1,
        goodsId: 0,
        catId: 0,
        imgs: true,
        shopdetail: "",
        groupList: [],
        url: "goods/anon/recommendedGoods", //获取商品列表的接口地址
        pageNo: 1,
        allLoaded: false, //是否全部加载完毕
        danxian:true,
        recommendMessage:'',
        shoucang:false,
        gouwuche:false,
        dingdan:false
      };
    },
    mounted: function() {
      // alert(this.url)
      if (this.typeCode === '3010'){
        this.danxian = false
      }
      else {
        this.danxian = true
      }
      if (this.typeCode === '3007'){
        this.recommendMessage = '您很久没有收藏过商品了~'
        this.shoucang =true;
        this.gouwuche = false;
        this.dingdan = false
      }
      if (this.typeCode === '3002'){
        this.recommendMessage = '您的购物车已经饿瘪了'
        this.shoucang =false;
        this.gouwuche = true;
        this.dingdan = false
      }
      if (this.typeCode === '3001'){
        this.recommendMessage = '暂无订单 立即去下单吧'
        this.shoucang =false;
        this.gouwuche = false;
        this.dingdan = true
      }
      if (this.typeCode === '3004'){
        this.recommendMessage = '暂无订单 立即去下单吧'
        this.shoucang =false;
        this.gouwuche = false;
        this.dingdan = true
      }


      this.catId = sessionStorage.getItem("catId");
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId;
      } else {
        this.goodsId = JSON.parse(sessionStorage.getItem("detail"));
      }
      this.$axios({
        method: "post",
        url: "goods/anon/recommendedGoods",
        responseType: "json",
        data: {
          pageNo: this.pageNo,
          pageSize: 10,
          typeCode: this.typeCode
        }
      })
        .then(data => {
          this.shoparr = data.data.res_data;
          this.shopList = data.data.res_data.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      searchshop() {
        this.$router.push('/searchShop?state=0')
      },
      loadBottom() {
        //加载更多
        console.log("触发下拉加载");
        var params = {
          goodName: this.product,
          pageSize: 10
        };
        if (this.url !== "goods/anon/recommendedGoods") {
          //非返回常规数据，只能特殊处理
          params.typeCode = this.typeCode;
          this.$api.loadMore(this, params, this.url, this.goodList, data => {
            data.data.res_data.shopStoreGoodsList.rows.forEach(o => {
              this.shopList.push(o);
            });
            obj.$refs.allLoaded.onBottomLoaded();

            if (
              data.data.res_data.shopStoreGoodsList.total == this.shopList.length
            ) {
              //加载完毕
              console.log("加载完毕");
              obj.allLoaded = true;
            }
          });
        } else {
          this.$api.loadMore(this, params, this.url, this.shopList);
        }
      },
      detail(index) {
        sessionStorage.detail = this.shopList[index].goodsId;
        this.$router.push({path:'/goods/detail',query:{goodsId:this.shopList[index].goodsId}})
      },
      //排序
      synth() {
        this.$axios({
          method: "post",
          url: "/goods/shopStoreInfo",
          responseType: "json",
          data: {
            pageNo: 0,
            pageSize: 0,
            goodsId: this.goodsId
          }
        })
          .then(data => {
            this.shoparr = data.data.res_data.shop;
            this.shopList = data.data.res_data.shopStoreGoodsList.rows;
          })
          .catch(err => {
            console.log(err);
          });
      },
      moneys(even) {
        if (this.num == 1) {
          this.num = 0;
          even.target.classList.remove("down");
        } else {
          this.num = 1;

          even.target.classList.add("down");
        }

        let price = "price";

        this.$axios({
          method: "post",
          url: "/goods/orderGoods",
          responseType: "json",
          data: {
            orderType: price,
            pageNo: 0,
            pageSize: 0,
            shopStoreId: this.shoparr.shop.shopStoreId,
            sort: this.num
          }
        })
          .then(data => {
            this.shopList = data.data.res_data.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      },
      tim(even) {
        if (this.num == 1) {
          this.num = 0;
          even.target.classList.remove("down");
        } else {
          this.num = 1;
          even.target.classList.add("down");
        }
        let create_time = "create_time";
        this.$axios({
          method: "post",
          url: "/goods/orderGoods",
          responseType: "json",
          data: {
            orderType: create_time,
            pageNo: 0,
            pageSize: 0,
            shopStoreId: this.shoparr.shop.shopStoreId,
            sort: this.num
          }
        })
          .then(data => {
            this.shopList = data.data.res_data.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      },
      sales(even) {
        if (this.num == 1) {
          this.num = 0;
          even.target.classList.remove("down");
        } else {
          this.num = 1;
          even.target.classList.add("down");
        }

        let buy_count = "buy_count";
        this.$axios({
          method: "post",
          url: "/goods/orderGoods",
          responseType: "json",
          data: {
            orderType: buy_count,
            pageNo: 0,
            pageSize: 0,
            shopStoreId: this.shoparr.shop.shopStoreId,
            sort: this.num
          }
        })
          .then(data => {
            this.shopList = data.data.res_data.dataList;
          })
          .catch(err => {
            console.log(err);
          });
      },
      groupdetail(val) {
        this.$router.push({
          path: "/group/groupdetail",
          query: { activityId: val.activityId }
        });
      }
    },
    components: {
      commonTop: commonTop,
      commonFooter: commonFooter
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .recommend_title{
    border-top:solid 1px rgb(248,248,248);
    height: 3.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:white;
    .kong_logo{
      width: 2rem;
      height: 1.52rem;
      line-height: .8rem;
      margin-right: .7rem;
      margin-top: -.1rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .kong_rightinfo{
      p{text-align: center}
      .guang{
        margin-top: .2rem;
        width:3.8rem ;
        text-align: center;
        background-color: rgb(255,102,102);
        color: white;
        line-height: .8rem;
      }
    }
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
  .title {
    padding: .3rem 0;
    text-align: center;
    line-height: 1;
    background-color: rgb(248,248,248);
    span {
      width: 2.5rem;
      vertical-align: middle;
      font-size: 0.4rem;
      display: inline-block;
      /*border: 1px solid #ccc;*/
    }
    span:nth-child(2) {
      width: 2.5rem;
      border: none;
    }
    .cont {
      padding: 0.2rem;
      ul {
        display: flex;
        justify-content: space-around;
        color: orangered;
        font-size: 0.4rem;
        overflow: scroll;
        .grouplist {
          margin-right: 0.2rem;
          background: white;
          p:first-child {
            width: 2rem;
            height: 2rem;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .grouplist:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
