<template>
  <div class="order-all-page">
    <!--<commonTop header-title="订单列表" header-type="1" header-class="bg-white" ></commonTop>-->
    <div class="order-tab-top"></div>
    <ul class="order-tab">
      <li v-on:click="tabMenu('all')" :class="{'current':tabAll}">
        <span>全部订单</span>
      </li>
      <li v-on:click="tabMenu('paying')" :class="{'current':tabPaying}">
        <span>待付款</span>
      </li>
      <li v-on:click="tabMenu('sending')" :class="{'current':tabSending}">
        <span>待发货</span>
      </li>
      <li v-on:click="tabMenu('sended')" :class="{'current':tabSended}">
        <span>已发货</span>
      </li>
      <!--<li v-on:click="tabMenu('taking')" :class="{'current':tabTaking}">-->
        <!--<span>待评价</span>-->
      <!--</li>-->
      <!--<li v-on:click="tabMenu('manager')" :class="{'current':tabManager}">-->
        <!--<span>店长礼包</span>-->
      <!--</li>-->
    </ul>
    <div class="content" style="position:absolute;top:1.2rem;left:0;right:0;bottom:0;">
      <mt-loadmore   :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">

        <section class="goods-simple" v-for="(item,index) in shoppList" v-if="shoppList[index].orderStatus!=-9">
          <div class="store-info">
            <span class="icons store-icon"></span>
            <i>{{item.comName}}</i>
            <span class="icons arrow-icon"></span>
            <u>{{stores[item.orderStatus==(-2||-1||-3)?8:item.orderStatus]}}</u>
          </div>
          <ul class="goods-show">
            <li v-for="(value,key) in item.goodsList">
              <img :src="value.goodsImage | filterss(3)" class="store-logo" :onerror="logo" @click="details(index,key)">
              <span @click="details(index,key)">
								<h2>{{value.goodsName}}</h2>
								<p>规格：{{value.productSpec}}</p>
							</span>
              <aside @click="details(index,key)">
                <i>￥{{value.price}}</i>
                <i class="pri-line">￥{{value.goodsPrice}}</i>
                <i>×{{value.buyCount}}</i>
              </aside>
              <!--<div class="total-action" v-if="item.orderStatus!=0&&item.orderStatus!=7&&item.rightCloseStatus!=1">-->
                <!--<span class="btn normal-btn red-btn btn-doing right" v-if="value.status==0" @click="applyfo(index,key)">申请维权</span>-->
              <!--</div>-->
            </li>
          </ul>

          <div class="total-action">
            <i>合计:￥{{item.orderAmount}}</i>
            <span class="btn normal-btn red-btn btn-check" v-if="shoppList[index].orderStatus==5" @click="logistics(index)">查看物流</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==5" @click="confirm(index)">确认收货</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==0" @click="cancel(index)">取消订单</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==0" @click="pays(index,key)">立即支付</span>
            <!--<span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==6" @click="apprise(index,item)">评价</span>-->
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==6" @click="logistics(index)">查看物流</span>
          </div>
        </section>
      </mt-loadmore>
    </div>
    <!--<mt-popup popup-transition="popup-fade" v-model="showhiden">-->
      <!--<div class="clears" v-if="!showhidens">-->
        <!--<p>确定申请维权!</p>-->
      <!--</div>-->
      <!--<div class="footers" v-if="!showhidens">-->
        <!--<p @click="right">确认</p>-->
        <!--<p @click="abolish">取消</p>-->
      <!--</div>-->
    <!--</mt-popup>-->
    <mt-popup popup-transition="popup-fade" v-model="takegoods">
      <div class="clears">
        <p>确认收货</p>
      </div>
      <div class="footers">
        <p @click="take">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import commonTop from "../components/commonTop";
  import {Toast} from 'mint-ui';
  import yyywxLogin from '../common/js/yyywxlogin'

  import $axios from 'axios'
  export default {
    data() {
      return {
        shoppList: [],
        tabAll: true,
        tabPaying: false,
        tabSending: false,
        tabSended: false,
        tabTaking: false,
        tabManager: false,
        showhidens: false,
        logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
        token: "",
        stores: [
          "待支付",
          "待发货",
          "待发货",
          "待发货",
          "",
          "待收货",
          "待评价",
          "已评价",
          "维权中"
        ],
        shop: 0,
        productIds: 0,
        buyCount: 0,
        showhiden: false,
        num: 0,
        index: 0,
        takegoods: false,
        btnstatus: false,
        urls: "",
        shipAmount: 0,
        keys: 0,
        orderStatus: 0,
        clicks: true,
        mobile: "",
        codes: "",
        binding: false,
        states: true,
        url: "/order/pageOrder", //获取商品列表的接口地址
        pageNo: 1,
        allLoaded: false //是否全部加载完毕
      };
    },
    components: {
      commonTop: commonTop
    },

    mounted() {

      // alert("挂在dom")
      document.title = "订单列表";

      // var yyywxlogin=function(){
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        var token = sessionStorage.getItem("token")
        // alert(sessionStorage.getItem("token"))
        if (token === null || token === undefined || token === "")  {
          $axios({
            method: 'post',
            url: 'basics/anon/yyyLogin',
            responseType: 'json',
            data: {
              code: r[2]
            },
          }).then(data => {
            localStorage.identityId = data.data.res_data.member.identityId
            localStorage.token = data.data.res_data.token
            // alert(data.data.res_data.token)
            localStorage.details = JSON.stringify(data.data.res_data.member)
            sessionStorage.token = localStorage.getItem('token');
            sessionStorage.details = localStorage.getItem('details');
            this.token = sessionStorage.getItem("token");
            this.loadDataList(this.token)
          }).catch(err => {
            console.log(err)
          })
        }
        else {
          this.token = sessionStorage.getItem("token")
          this.loadDataList(this.token)
        }
    },
    methods: {
      loadDataList(tokenC){

        // alert(this.token)
        if (this.shop == 0) {
          this.types(true, false, false, false, false, false);
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: tokenC,
              orderType: 0,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              // alert("加载数据")
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.shop == 1) {
          this.types(false, true, false, false, false, false);
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: tokenC,
              orderType: this.shop,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.shop == 2) {
          this.types(false, false, true, false, false, false);
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: tokenC,
              pageNo: 1,
              pageSize: 10,
              orderType: this.shop
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
              console.log(this.shoppList);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.shop == 3) {
          this.types(false, false, false, true, false, false);

          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: tokenC,
              pageNo: 1,
              pageSize: 10,
              orderType: this.shop
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.shop == 4) {
          this.types(false, false, false, false, true, false);

          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: tokenC,
              orderType: this.shop,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      loadBottom() {
        //加载更多
        console.log("触发下拉加载");
        console.log('pageNo',this.pageNo)

        var params = {
          goodName: this.product,
          pageSize: 10,
          token: sessionStorage.getItem("token"),
          orderType: this.shop
        };
        this.$api.loadMore(this, params, this.url, this.shoppList);
      },

      types: function(
        tabAlls,
        tabPayings,
        tabSendings,
        tabSendeds,
        tabTakings,
        tabManager
      ) {
        this.tabAll = tabAlls;
        this.tabPaying = tabPayings;
        this.tabSending = tabSendings;
        this.tabSended = tabSendeds;
        this.tabTaking = tabTakings;
        this.tabManager = tabManager;
      },

      details(index, keys) {
        sessionStorage.orderId = JSON.stringify(
          this.shoppList[index].goodsList[keys].orderId
        );
        this.$router.push("/order/detail");
      },
      tabMenu: function(event) {
        //    	sessionStorage.removeItem('shop')
        // 全部订单
        this.allLoaded = false;
        if (event == "all") {
          this.types(true, false, false, false, false, false);
          this.shop=0;
          sessionStorage.removeItem("managerDetail");
          this.btnstatus = false;
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 0,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
              console.log(data.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (event == "paying") {
          this.shop=1;
          this.types(false, true, false, false, false, false);
          sessionStorage.removeItem("managerDetail");
          this.btnstatus = false;
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 1,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (event == "sending") {
          this.shop=2;
          this.types(false, false, true, false, false, false);
          sessionStorage.removeItem("managerDetail");
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 2,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (event == "sended") {
          this.shop=3;
          this.types(false, false, false, true, false, false);
          sessionStorage.removeItem("managerDetail");
          this.btnstatus = false;
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 3,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (event == "taking") {
          this.shop=4;
          this.types(false, false, false, false, true, false);
          sessionStorage.removeItem("managerDetail");
          this.btnstatus = false;
          this.$axios({
            method: "post",
            url: "/order/pageOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 4,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
            })
            .catch(err => {
              console.log(err);
            });
        } else if (event == "manager") {
          this.shop=5;
          this.types(false, false, false, false, false, true);
          this.btnstatus = true;
          this.$axios({
            method: "post",
            url: "/order/pageGiftOrder",
            responseType: "json",
            data: {
              token: sessionStorage.getItem("token"),
              orderType: 0,
              pageNo: 1,
              pageSize: 10
            }
          })
            .then(data => {
              this.shoppList = data.data.res_data.dataList;
              sessionStorage.managerDetail = "managerDetail";
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      //支付
      pays(index, key) {
        sessionStorage.orderId = this.shoppList[index].orderId;
        sessionStorage.orderSn = this.shoppList[index].orderSn;
        // console.log(this.shoppList[index]);
        // this.buyCount = this.shoppList[index].buyCount
        // for(var j = 0; j < this.shoppList[index].goodsList.length; j++) {
        // 	this.productIds = this.shoppList[index].goodsList[j].productId
        // }
        // let obj = [{
        // 	productId: this.productIds,
        // 	buyCount: this.buyCount
        // }]

        let obj = [];
        for (let j in this.shoppList[index].goodsList) {
          obj.push({
            productId: this.shoppList[index].goodsList[j].productId,
            buyCount: this.shoppList[index].goodsList[j].buyCount
          });
        }
        // console.log(obj);
        // console.log('--22--');

        let urls;
        if (this.btnstatus) {
          urls = "order/giftOrderCheckout";
        } else {
          urls = "/order/orderCheckout";
        }
        this.$axios({
          method: "post",
          url: urls,
          responseType: "json",
          data: {
            token: sessionStorage.getItem("token"),
            goodsData: JSON.stringify(obj)
          }
        })
          .then(data => {
            if (data.status == 200) {
              sessionStorage.goodsList = JSON.stringify(data.data.res_data);
              //console.log(data.data.res_data)
              this.$router.push("/shoppingCart/shopbalance");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      cancel(index) {
        let urls;
        if (this.btnstatus) {
          urls = "/order/giftOrderCancel";
        } else {
          urls = "/order/orderCancel";
        }
        this.$axios({
          method: "post",
          url: urls,
          responseType: "json",
          data: {
            token: sessionStorage.getItem("token"),
            orderId: this.shoppList[index].orderId
          }
        })
          .then(data => {
            if (data.status == 200) {
              this.shoppList.splice(index, 1);
              alert('取消成功');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      confirm(index) {
        this.takegoods = true;
        this.num = index;
      },
      take() {
        let urls;
        if (this.btnstatus) {
          urls = "/order/giftOrderRog";
        } else {
          urls = "/order/orderRog";
        }
        let dataTakePost = {
          token: this.token,
          orderId: this.shoppList[this.num].orderId
        };
        // console.log(dataTakePost);
        this.$axios({
          method: "post",
          url: urls,
          responseType: "json",
          data: {
            token: sessionStorage.getItem("token"),
            orderId: this.shoppList[this.num].orderId
          }
        })
          .then(data => {
            this.takegoods = false;
            this.num = 0;
            this.tabMenu("all");
            Toast('收货成功');
            // console.log('11111');
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      logistics(index) {
        sessionStorage.orderId = this.shoppList[index].orderId;
        sessionStorage.goodsImage = JSON.stringify(
          this.shoppList[index].goodsList[0].goodsImage
        );
        this.$router.push("/logistics");
      },
      applyfo(index, keys) {
        this.showhiden = true;
        this.num = this.shoppList[index].orderId;
        this.index = index;
        this.keys = keys;
        this.shipAmount = this.shoppList[index].shipAmount;
        this.orderStatus = this.shoppList[index].orderStatus;
      },
      right() {
        this.$router.push("/rightDetail");
        this.shoppList[this.index].goodsList[
          this.keys
          ].orderStatus = this.orderStatus;
        this.shoppList[this.index].goodsList[
          this.keys
          ].shipAmount = this.shipAmount;
        this.shoppList[this.index].goodsList[
          this.keys
          ].orderAmount = this.shoppList[this.index].orderAmount;
        sessionStorage.RIGHT = JSON.stringify(
          this.shoppList[this.index].goodsList[this.keys]
        );
        console.log(this.shoppList[this.index]);
      },
      clear() {
        let this_ = this;
        setTimeout(function() {
          this_.showhidens = false;
        }, 1100);
      },
      abolish() {
        this.showhiden = false;
        this.takegoods = false;
        this.num = 0;
      },
      apprise(index, value) {
        this.$axios({
          method: "post",
          url: "/order/initOrderComment",
          responseType: "json",
          data: {
            orderSn: this.shoppList[index].orderSn,
            token: sessionStorage.getItem("token")
          }
        })
          .then(data => {
            console.log(data);
            let datas = data.data.res_data.orderItemsList;
            let arr = [];
            for (let i = 0; i < datas.length; i++) {
              let obj = {
                itemId: datas[i].itemId,
                goodsImage: datas[i].goodsImage,
                orderSn: datas[i].orderSn,
                arr: []
              };
              arr.push(obj);
            }
            sessionStorage.APPRAISE = JSON.stringify(arr);
            this.$router.push("/appraise");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .order-tab{
    top: 0;
    li{
      width: 22%;
    }
  }
  .bindingmobile {
    width: 80%;
    margin: auto;
    background: white;

    p:first-child {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bolder;
    }
    p {
      padding: 0.2rem;
      margin-bottom: 0.2rem;
    }
    p:last-child {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: orangered;
      color: white;
      padding: 0.2rem;
    }
    .codebtn {
      color: orangered;
    }
    .icons {
      width: 0.59rem;
      height: 0.7rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.33rem;
      &.name-icon {
        background-position: -2.56rem -1.7rem;
      }
      &.pw-icon {
        background-position: -3.55rem -3.95rem;
      }
    }
    .input {
      display: inline-block;
      font-size: 0.32rem;
      color: #999;
      width: 4.3rem;
    }
  }
  .clears {
    width: 8.125rem;
    height: 2rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
  }

  .footers {
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    p {
      flex: 1;
      padding: 5px;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 1rem;
      font-size: 0.4rem;
    }
    p:last-child {
      background: #eee;
      border-bottom-right-radius: 0.2rem;
    }
    p:first-child {
      background: #f22d07;
      color: white;
      border-bottom-left-radius: 0.2rem;
    }
  }

  .success {
    padding: 10px;
    width: 6rem;
    text-align: center;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    h2 {
      font-size: 0.7rem;
      line-height: 1rem;
    }
  }

  .right {
    width: 1.5rem;
  }

  .mint-popup {
    border-radius: 0.2rem;
  }
</style>
