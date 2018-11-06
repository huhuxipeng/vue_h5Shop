<template>
	<div v-if="shoparr.shop" class="goods-store-page">
		<commonTop header-title="店铺" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<!-- <div class="store-search">
			<span>
				<em class="icons search-btn"></em>
				<input type="text" placeholder="搜索店内商铺" class="input" v-model="shopdetail" @keydown="seachshop">
			</span>
		</div> -->
    <div class='shop_top'>
    <div class='search_wrap flex' >
      <img class='searchIcon' src="../common/image/search.png" />
      <input v-model="shopdetail" class='search' placeholder="搜索" placeholder-style="color:#999" />
      <div class='searchBtn' @click="seachshop">搜索</div>
    </div>
    <img @click='showErweiCode' class='min_erwei_code' src='../common/image/shop/icon_Shop_code.png'/>
    <div class='logo_wrap flex_column flex_center'>
      <img class='logo' :src="filters.filterss(shoparr.shop.shopStoreLogo)" />
      <div>{{shoparr.shop.shopStoreName}}<span class="fig" v-if="shoparr.shop.goodsType==1">海外商品</span></div>
    </div>
  </div>
		<section v-if="shoparr.shop" class="store-info">
			<!-- <span class="erweima">
				<img :src="twoCodeImg" alt="">
			</span>
			<img :src="storeBan" class="store-ban" :onerror="logo"> -->
			<!-- <section>
				<span>
					<img :src="filters.filterss(shoparr.shop.shopStoreLogo)" :onerror="logo">
					<h1>{{shoparr.shop.shopStoreName}}
						<span class="fig" v-if="shoparr.shop.goodsType==1">海外商品</span>
					</h1>
				</span>
				<label>
					<em class="icons"></em> 已缴纳保证金
					<em>￥{{shoparr.bond}}</em>
				</label>
			</section> -->
			<!--<p>{{}}</p>-->
      <!--shoparr.shop.shopStoreInformation-->
		</section>
    <div class='row_wrap'>
      <div class='row' v-if="couponList.length<=2">
        <div v-for="(item,index) in couponList" class='flex type_1' :class="[item.type, item.color]" :key="index">
          <div class='left'>{{item.typName}}</div>
          <div class='right coupon flex'>
            <div class='flex'>
              <span class='little'>￥</span>
              <span class='big'>{{item.discountPrice}}</span>
            </div>
            <div class='flex_column flex_center'>
              <div class='top'>满{{item.minAmount}}使用</div>
              <div v-if="couponList.length==1" class='bottom'>领取时间：{{item.getBeginTime}}-{{item.getEndTime}}</div>
            </div>
          </div>
          <div @click='pickNow(index)' class='pick_now'>立即领取</div>
        </div>
      </div>
      <div class='long_row' v-if="couponList.length>2">
        <div v-for="(item,index) in couponList" :key="index" class='coupon_child flex_column' :class="[item.color]">
          <div class='top flex'>
            <span class='little'>￥</span>
            <span class='big'>{{item.discountPrice}}</span>
            <div class='flex_column flex_center'>
              <div class='coupon_name'>{{item.typName}}</div>
              <div class='full'>满{{item.minAmount}}使用</div>
            </div>
          </div>
          <div class='bottom flex_grow_1 flex_center flex'>
            <div @click='pickNow(index)' class='pick_now flex flex_center'>立即领取</div>
          </div>
        </div>
      </div>
    </div>
		<div class="title" v-if="groupList.length!=0">
			<span></span>
			<span>大家正在拼</span>
			<span></span>
			<div class="cont">
				<ul>
					<li class="grouplist" v-for="(item,index) in groupList" :key="index" @click="groupdetail(item)">
						<p><img :src="item.image |filterss(2)" :onerror="logo" /></p>
						<p>￥{{item.spellPrice}}</p>
					</li>

				</ul>
			</div>
		</div>
		<div class="goods-sort-top"></div>
		<ul class="goods-sort">
			<li class="all current" @click="synth">综合</li>
			<li class="price down" @click="moneys">价格
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
			<li class="time down" @click="tim">时间
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
			<li class="sell down" @click="sales">销量
				<span>
					<i></i>
					<i></i>
				</span>
			</li>
		</ul>
		<section v-show="showMore" class="goods-list" style="position:absolute;bottom: 1.3rem;left:0;right:0;8rem" :style="{'top':sectionTop}">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
				<ul >
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
		<!-- <commonFooter current-menu="1"></commonFooter> -->
    <couponDetail  :index="couponIndex" :couponList="couponList"  v-model="showCouponDetail" ></couponDetail>
    <mt-popup v-model="showErweiCodePopup">
      <div class="erweiCodePopup flex flex_column flex_center">
      <div @click="closeErweiCodePopup" class="coupon_close flex flex_center"> × </div>
        <div class='test'>{{shoparr.shop.shopStoreName}}</div>
        <img class='bigErweicode' :src="shoparr.shop.twoCodeImg" />
        <div class='save_button' >
          长按保存图片
        </div>
      </div>
    </mt-popup>
	</div>
</template>
<script>
import wx from 'weixin-js-sdk';
import commonTop from "../components/commonTop";
import commonFooter from "../components/commonFooter";
import couponDetail from "../components/couponDetail";
export default {
  data() {
    return {
      storeBan: require("../common/image/upload/store-banner.jpg"),
      productId: 0,
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      shoparr: [],
      shopList: [],
      sectionTop: "8rem",
      num: 1,
      goodsId: 0,
      catId: 0,
      storeId: "",
      showErweiCodePopup:false,
      showCouponDetail: false, //优惠券详情弹窗
      couponIndex: 0,
      couponList: [],
      imgs: true,
      shopdetail: "",
      twoCodeImg: "",
      groupList: [],
      showMore: false,
      url: "/goods/shopStoreInfo", //获取商品列表的接口地址
      pageNo: 1,
      allLoaded: false //是否全部加载完毕
    };
  },
  mounted: function() {
    this.catId = sessionStorage.getItem("catId");
    if (this.$route.query.storeId) {
      this.storeId = this.$route.query.storeId;

      this.$axios({
        method: "get",
        url: "/goods/anon/queryGoodId?storeId=" + this.storeId
      })
        .then(data => {
          this.goodsId = data.data.res_data.goodsId;

          this.$axios({
            method: "post",
            url: this.url,
            responseType: "json",
            data: {
              pageNo: 1,
              pageSize: 10,
              goodsId: this.goodsId
            }
          })
            .then(data => {
              this.shoparr = data.data.res_data;
              this.shopList = data.data.res_data.shopStoreGoodsList.rows;
              this.twoCodeImg = data.data.res_data.shop.twoCodeImg;
            })
            .catch(err => {
              console.log(err);
            });
          this.$axios({
            method: "post",
            url: "/spell/anon/getActivityByShop",
            responseType: "json",
            data: {
              goodsId: this.goodsId
            }
          })
            .then(data => {
              console.log(data);
              this.groupList = data.data.res_data.activityList;
              if (this.groupList.length > 4) {
                this.groupList = this.groupList.splice(0, 4);
              }
            })
            .catch(err => {
              console.log(err);
            });

          // this.shopList = data.data.res_data.shopStoreGoodsList.rows;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId;
      } else {
        this.goodsId = JSON.parse(sessionStorage.getItem("detail"));
      }
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          pageNo: 1,
          pageSize: 10,
          goodsId: this.goodsId
        }
      })
        .then(data => {
          this.shoparr = data.data.res_data;
          this.shopList = data.data.res_data.shopStoreGoodsList.rows;
          this.twoCodeImg = data.data.res_data.shop.twoCodeImg;
          this.$axios({
            method: "post",
            url: "/spell/anon/getActivityByShop",
            responseType: "json",
            data: {
              goodsId: this.goodsId
            }
          })
            .then(data => {
              console.log(data);
              this.groupList = data.data.res_data.activityList;
              if (this.groupList.length > 4) {
                this.groupList = this.groupList.splice(0, 4);
              }
              this.getCouponList();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    showErweiCode() {
      this.showErweiCodePopup = true;
    },
    closeErweiCodePopup() {
      this.showErweiCodePopup = false;
    },
    getCouponList() {
      //
      let url = "coupon/anon/couponList";
      let params = {
        pageNo: 0,
        pageSize: 0,
        relId: this.shoparr.shop.shopStoreId,
        relType: 2
      };
      if (sessionStorage.token) {
        params.token = sessionStorage.token;
      }
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: params
      })
        .then(o => {
          let couponList = o.data.res_data.dataList;
          couponList.forEach(o => {
            switch (o.cpnType) {
              case 0:
                o.typName = "分类券";
                o.color = "color_1";
                break;
              case 1:
                o.typName = "商品券";
                o.color = "color_2";
                break;
              case 2:
                o.typName = "店铺券";
                o.color = "color_3";
                break;
              case 3:
                o.typName = "通用券";
                o.color = "color_1";
                break;
            }
            if (couponList.length == 2) {
              //样式展示判断
              o.type = "type_2";
            }
            o.getBeginTime = new Date(o.getBeginTime).format("MM.dd");
            o.getEndTime = new Date(o.getEndTime).format("MM.dd");
          });
          this.couponList = couponList;
          if (this.couponList.length && this.groupList.length) {
            this.sectionTop = "13.2rem";
          } else if (this.couponList.length) {
            this.sectionTop = "10.4rem";
          } else if (this.groupList.length) {
            this.sectionTop = "12.8rem";
          }
          this.showMore = true;
        })
        .catch(e => {
          console.log("err", e);
        });
    },
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
          this.$refs.allLoaded.onBottomLoaded();
          console.log(1223);
          if (
            data.data.res_data.shopStoreGoodsList.total == this.shopList.length
          ) {
            //加载完毕
            console.log("加载完毕");
            this.allLoaded = true;
          }
        });
      } else {
        this.$api.loadMore(this, params, this.url, this.shopList);
      }
    },
    pickNow(index) {
      this.showCouponDetail = true;
      this.couponIndex = index;
    },
    closeCouponDetail() {
      this.showCouponDetail = false;
    },
    //搜索商品
    seachshop() {
      this.shopList = [];
      this.allLoaded = false;
      this.url = "/goods/selectGoodsByParams";
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
          console.log(123215);
          this.shopList = data.data.res_data.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    detail(index) {
      sessionStorage.detail = this.shopList[index].goodsId;
      this.$router.push("/goods/detail");
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
          console.log(11223);
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
    commonFooter: commonFooter,
    couponDetail: couponDetail
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
    border: 0.013333rem solid #ccc;
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
.type_1.flex {
  padding: 0;
}
// 优惠券相关样式

.row_wrap div {
  box-sizing: border-box;
}

.type_1 > div {
  height: 100%;
}

.type_1 {
  width: 9.546667rem;
  height: 1.44rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.053333rem 0.106667rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.053333rem 0.08rem 0.08rem 0.053333rem;
  position: relative;
}

.row .type_2 {
  width: 4.693333rem;
}

.row .type_2:first-child {
  margin-right: 0.213333rem;
}

.type_1 .left {
  width: 1.093333rem;
  padding: 0.106667rem 0.373333rem;
  font-size: 0.373333rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  line-height: 0.373333rem;
}

.type_1 .right {
  flex-grow: 1;
  padding: 0.133333rem;
  justify-content: center;
}

.type_1.color_1 .left {
  border-right: 0.026667rem dashed rgba(234, 128, 51, 1);
}

.color_1 {
  border: 0.026667rem solid rgba(234, 128, 51, 1);
  color: rgba(234, 128, 51, 1);
}

.color_1 .pick_now {
  background-color: rgba(234, 128, 51, 1);
}

.color_1.coupon_child .top {
  border-bottom: 0.026667rem dashed rgba(234, 128, 51, 1);
}

.type_1.color_2 .left {
  border-right: 0.026667rem dashed #4d7ae8;
}

.color_2 {
  border: 0.026667rem solid #4d7ae8;
  color: #4d7ae8;
}

.color_2 .pick_now {
  background-color: #4d7ae8;
}

.color_2.coupon_child .top {
  border-bottom: 0.026667rem dashed #4d7ae8;
}

.type_1.color_3 .left {
  border-right: 0.026667rem dashed #4bc489;
}

.color_3 {
  border: 0.026667rem solid #4bc489;
  color: #4bc489;
}

.color_3 .pick_now {
  background-color: #4bc489;
}

.color_3.coupon_child .top {
  border-bottom: 0.026667rem dashed #4bc489;
}

.type_1 .coupon .little {
  font-size: 0.48rem;
  display: flex;
  flex-direction: column-reverse;
}

.type_1 .top {
  position: relative;
  z-index: 0;
  font-size: 0.373333rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.426667rem;
  height: auto;
}

.type_1 .bottom {
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(234, 128, 51, 1);
  line-height: 0.426667rem;
}

.type_1 .coupon .big {
  font-size: 1.28rem;
  padding: 0;
  position: relative;
  left: -0.1rem;
  letter-spacing: -0.106667rem;
  flex-direction: column;
  line-height: 1rem;
}

.type_2.type_1 .coupon .little {
  font-size: 0.373333rem;
}

.type_2.type_1 .coupon {
  flex-direction: column;
}

.type_2.type_1 .coupon .big {
  font-size: 0.96rem;
  letter-spacing: -0.08rem;
  line-height: 0.6rem;
}

.type_1 .flex_column {
  margin-left: 0.12rem;
  padding: 0;
}

.type_1 .pick_now {
  width: 1.013333rem;
  height: 1.013333rem;
  border-radius: 50%;
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.326667rem;
  padding: 0.18rem;
  margin: 0.213333rem 0.166667rem 0 0;
}

.long_row {
  width: auto;
  display: flex;
  padding: 0.213333rem;
  display: -webkit-flex;
  overflow: auto;
}

.coupon_child {
  width: 3.28rem;
  height: 1.786667rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.026667rem 0.053333rem 0rem rgba(0, 0, 0, 0.09);
  border-radius: 0.053333rem 0.053333rem 0.106667rem 0.106667rem;
  margin-right: 0.186667rem;
}

.coupon_child .top {
  position: relative;
  z-index: 0;
  padding-bottom: 0.053333rem;
}

.coupon_child .top .little {
  font-size: 0.373333rem;
  display: flex;
  flex-direction: column-reverse;
}

.coupon_child .top .big {
  font-size: 0.96rem;
  line-height: 0.96rem;
}

.coupon_child .coupon_name {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.373333rem;
}

.coupon_child .full {
  font-size: 0.266667rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.32rem;
}

.coupon_child .bottom .pick_now {
  width: 2.106667rem;
  color: white;
  border-radius: 0.213333rem;
  height: 0.426667rem;
  line-height: 0.426667rem;
  font-size: 0.266667rem;
}
.coupon_child .little {
  padding-bottom: 0.13rem;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3.893333rem;
  z-index: -1;
}

.shop_top {
  position: relative;
  width: 100%;
  height: 3.893333rem;
  background-image: url(../common/image/shop/image_shop_base_map.png);
  margin-bottom: 0.533333rem;
}

.search_wrap {
  width: 7.653333rem;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.053333rem 0.106667rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  position: absolute;
  bottom: -0.4rem;
  font-size: 0.373333rem;
  left: 1.173333rem;
}
.search {
  outline: none;
  flex-grow: 1;
  padding-left: 0.3rem;
}
.logo_wrap {
  position: absolute;
  background: none;
  width: 3.333333rem;
  top: 0.8266667rem;
  left: 3.333333rem;
  color: white;
  text-align: center;
  font-size: 0.426667rem;
}

.logo_wrap .logo {
  display: inline-block;
  width: 1.33rem;
  height: 1.33rem;
  position: relative;
  z-index: 5;
  margin-top: -0.665rem;
  border-radius: 50rem;
  border: #eeeeee 1px solid;
}

.min_erwei_code {
  position: absolute;
  top: 0.48rem;
  width: 0.48rem;
  height: 0.48rem;
  right: 0.48rem;
}

.bigErweicode {
  width: 4.746667rem;
  height: 4.746667rem;
}

.search_wrap .searchBtn {
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 0.3rem;
  border: none;
  margin: 0;
}

.erweiCodePopup {
  background: white;
  width: 9.146667rem;
  height: 10.213333rem;
}

.erweiCodePopup .test {
  color: #333;
  width: 100%;
  text-align: center;
  margin-bottom: 0.8rem;
}

.save_button {
  width: 7.093333rem;
  height: 1.253333rem;
  line-height: 1.253333rem;
  color: white;
  text-align: center;
  background: rgba(242, 56, 20, 1);
  border-radius: 0.626667rem;
  margin-top: 0.8rem;
}
.coupon_close {
  height: 0.72rem;
  width: 0.72rem;
  box-sizing: border-box;
  font-size: 0.893333rem;
  line-height: 0.72rem;
  color: #333;
  border-radius: 50%;
  border: 0.026667rem solid #333;
  position: absolute;
  top: 0.266667rem;
  right: 0.266667rem;
  text-align: center;
}
</style>
