<template>
  <div class="goods-store-page">
    <!--<commonTop header-title="荟普旗舰店" header-type="1" header-class="bg-white" ></commonTop>-->
    <section v-if="shoparr.shop" class="store-info">
      <img :src="filters.filterss(storeBan)" class="store-ban" :onerror="logo">
      <section>
				<span>
					<img :src="filters.filterss(shoparr.shop.shopStoreLogo)" :onerror="logo">
					<h1>{{shoparr.shop.shopStoreName}}
						<span class="fig" v-if="shoparr.shop.goodsType==1">海外商品</span>
					</h1>
				</span>
        <label>
          <em class="icons"></em> 已缴纳保证金
          <em>￥{{shoparr.shop.bond}}</em>
        </label>
      </section>
      <p>{{shoparr.shop.shopStoreInformation}}</p>
    </section>

    <div class="goods-sort-top"></div>
    <section class="goods-list" style="position:absolute;top:7rem;bottom: 1.3rem;left:0;right:0;">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <ul>
          <li v-for='(item,index) in shopList' @click="detail(index)">
            <section><img :src="item.image |filterss(2)" :onerror="logo"></section>
            <h2 class="names">{{item.name}}</h2>
            <span>
      <i>
      <em>￥</em>{{Number(item.price).toFixed(2)}}</i>
      </span>
          </li>
        </ul>
      </mt-loadmore>
    </section>
    <!--<commonFooter current-menu="1"></commonFooter>-->
  </div>
</template>
<script>
  import commonTop from "../components/commonTop";
  import commonFooter from "../components/commonFooter";
  import yyywxLogin from '../common/js/yyywxlogin'
  export default {
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
        url:"goods/anon/shopInfo", //获取商品列表的接口地址
        pageNo: 1,
        allLoaded: false //是否全部加载完毕
      };
    },
    mounted: function() {
      document.title = "荟普旗舰店";
      yyywxLogin();
      //获取店铺内商品列表信息~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          pageNo: 1,
          pageSize: 10,
          shopStoreId: this.$route.query.shopStoreId
        }
      })
        .then(data => {
          // console.log(JSON.stringify(data))
          this.shoparr = data.data.res_data;
          this.shopList = data.data.res_data.shopStoreGoodsList.rows;
          this.storeBan = data.data.res_data.shop.shopStoreTheme;
        })
        .catch(err => {
          console.log(err);
        });

      // 大家都在拼
      // this.$axios({
      //   method: "post",
      //   url: "/spell/anon/getActivityByShop",
      //   responseType: "json",
      //   data: {
      //     goodsId: this.goodsId
      //   }
      // })
      //   .then(data => {
      //     console.log(data);
      //     this.groupList = data.data.res_data.activityList;
      //     if (this.groupList.length > 4) {
      //       this.groupList = this.groupList.splice(0, 4);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    methods: {
      loadBottom() {
        //加载更多
        console.log("触发下拉加载");
        var params = {
          goodName: this.product,
          pageSize: 10
        };
        if (this.url == "/goods/shopStoreInfo") {
          //非返回常规数据，只能特殊处理
          params.goodsId = this.goodsId;
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
      //搜索商品
      seachshop(even) {
        let eve = even || window.event;
        this.shopList = [];
        this.allLoaded = false;
        this.url = "/goods/selectGoodsByParams";
        if (eve.keyCode == 13) {
          this.$axios({
            method: "post",
            url: this.url,
            responseType: "json",
            data: {
              goodName: this.shopdetail,
              pageNo: 0,
              pageSize: 6,
              shopStoreId: this.shoparr.shop.shopStoreId
            }
          })
            .then(data => {
              console.log(data.data.res_data.dataList);
              this.shopList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      detail(index) {
        sessionStorage.detail = this.shopList[index].goodsId;
        this.$router.push("/goods/shopdetail");
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
  .goods-list{
    ul{
      li{
        section{
          width: 4.7rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .title {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    text-align: center;
    line-height: 1;
    span {
      width: 1.5rem;
      vertical-align: middle;
      font-size: 0.4rem;
      display: inline-block;
      border: 1px solid #ccc;
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
