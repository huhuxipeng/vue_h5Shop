<template>
  <div class="order-all-page">
    <commonTop header-title="订单列表" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <div class="order-tab-top"></div>
    <ul class="order-tab">
      <li v-for="(o,i) in menuList" v-on:click="tabMenu(i)" :class="{'current':o.active}">
        <span>{{o.text}}</span>
      </li>
    </ul>
    <div class="content" style="position:absolute;top:1.2rem;left:0;right:0;bottom:0;">
      <mt-loadmore style="padding-top:1.2rem;background:#f5f5f5;" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">

        <section class="goods-simple" v-for="(item,index) in shoppList" v-if="shoppList[index].orderStatus!=-9">
          <div class="store-info">
            <span class="icons store-icon"></span>
            <i>{{item.comName}}</i>
            <span class="icons arrow-icon"></span>
            <span v-if="item.orderType==1" class="red">[抢购]</span>
            <u>{{formatStatus(item.orderStatus)}}</u>
          </div>
          <ul v-if="item.goodsList" class="goods-show">
            <li v-for="(value,key) in item.goodsList">
              <img :src="value.goodsImage||value.squareImage | filterss(3)" class="store-logo" :onerror="logo" @click="details(index,key)">
              <span @click="details(index,key)">
                <h2>{{value.goodsName}}</h2>
                <p>规格：{{value.productSpec}}</p>
              </span>
              <aside @click="details(index,key)">
                <i>￥{{value.price}}</i>
                <i class="pri-line">￥{{value.goodsPrice}}</i>
                <i>×{{value.buyCount}}</i>
              </aside>
              <div class="total-action" v-if="item.orderStatus!=0&&item.orderStatus!=7&&item.rightCloseStatus!=1">
                <span class="btn normal-btn red-btn btn-doing right" v-if="value.status==0" @click="applyfo(index,key)">申请维权</span>
              </div>
            </li>
          </ul>
          <div v-else class="goods-show">
            <li @click="details(index)">
              <img :src="item.squareImage | filterss(3)" class="store-logo" :onerror="logo">
              <span>
                <h2>{{item.exchangeName}}</h2>
                <p>规格：{{item.specs}}</p>
              </span>
              <aside>
                <i>{{item.exchangeCoin}}金币</i>
                <i class="pri-line">￥{{item.mktPrice}}</i>
                <i>数量：{{item.changeProductNum}}</i>
              </aside>
            </li>
          </div>
          <div v-if="!isGoldChanger" class="total-action">
            <i>合计:￥{{item.orderAmount}}</i>
            <span class="btn normal-btn red-btn btn-check" v-if="shoppList[index].orderStatus==5" @click="logistics(index)">查看物流</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==5" @click="confirm(index)">确认收货</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==0" @click="cancel(index)">取消订单</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==0" @click="pays(index,key)">立即支付</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==6" @click="apprise(index,item)">评价</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==6" @click="logistics(index)">查看物流</span>
          </div>
          <div v-else class="total-action">
            <i>合计:{{item.realPaymen}}金币</i>
            <span class="btn normal-btn red-btn btn-check" v-if="shoppList[index].orderStatus==2" @click="logistics(index)">查看物流</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==2" @click="confirm(index)">确认收货</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==3" @click="cancel(index)">删除订单</span>
            <span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==3" @click="logistics(index)">查看物流</span>
          </div>
        </section>
        <Recommend :typeCode="typeCode" v-if="shoppList.length === 0"></Recommend>
      </mt-loadmore>
    </div>
    <mt-popup popup-transition="popup-fade" v-model="showhiden">
      <div class="clears" v-if="!showhidens">
        <p>确定申请维权!</p>
      </div>
      <div class="footers" v-if="!showhidens">
        <p @click="right">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" v-model="takegoods">
      <div class="clears">
        <p>确认收货</p>
      </div>
      <div class="footers">
        <p @click="take">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>
      <div class="bindingmobile">
        <p>欢迎登录</p>
        <p>
          <u class="icons name-icon"></u>
          <input type="text" placeholder="手机号" v-model="mobile" class="input">
        </p>
        <p>
          <u class="icons pw-icon"></u>
          <input type="number" placeholder="请输验证码" v-model="codes" class="input">
          <i class="btn codebtn" @click="gaincodes">获取验证码</i>
        </p>
        <p @click="bidingmobile">确认登录</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import commonTop from "../components/commonTop";
import { Toast, MessageBox } from "mint-ui";
import Recommend from "../components/Recommend";
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
      goldStatus:[
        "待支付",
        "待发货",
        "已发货",
        "完成",
      ],
      shop: 0,
      typeCode: '3001',
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
      menuList: [
        { text: "全部订单", active: true },
        { text: "待付款", active: false },
        { text: "已付款", active: false },
        { text: "待收货", active: false },
        { text: "待评价", active: false },
        { text: "店长礼包", active: false }
      ],
      states: true,
      url: "/order/pageOrder", //获取商品列表的接口地址
      pageNo: 1,
      allLoaded: false //是否全部加载完毕
    };
  },
  components: {
    commonTop: commonTop,
    Recommend
  },
  created() {
    if (sessionStorage.token == null) {
      this.logins();
    }
  },
  mounted() {
    if (sessionStorage.token != null) {
      this.shop = sessionStorage.getItem("shop");
      this.token = sessionStorage.getItem("token");
      this.isGoldChanger = this.$route.query.isGoldChanger;

      if (this.isGoldChanger) {
        //如果是兑换订单
        this.typeCode = 3005;
        this.url = "/order/coinExchangeOrderList";
        this.menuList = [
          { text: "全部", active: true },
          { text: "待发货", active: false },
          { text: "已发货", active: false },
          { text: "已完成", active: false }
          // { text: "已取消", active: false },
        ];
      }
      if (this.shop) {
        this.menuList.forEach(o => {
          o.active = false;
        });
        this.menuList[this.shop].active = true;
      }
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          token: this.token,
          orderType: this.shop,
          pageNo: 1,
          pageSize: 10
        }
      })
        .then(data => {
          if (this.isGoldChanger) {
            this.shoppList = data.data.res_data.coinExchangeOrderList.rows;
          } else {
            this.shoppList = data.data.res_data.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    loadBottom() {
      //加载更多
      console.log("触发下拉加载");
      console.log("pageNo", this.pageNo);
      if (this.shop == 5) {
        //如果是店长礼包
        var params = {
          goodName: this.product,
          pageSize: 10,
          token: this.token,
          orderType: 0
        };
        this.$api.loadMore(
          this,
          params,
          "/order/pageGiftOrder",
          this.shoppList
        );
        return;
      }
      if (this.isGoldChanger) {
        //如果是金币兑换商品
        var params = {
          goodName: this.product,
          pageSize: 10,
          token: this.token,
          orderType: this.shop
        };
        this.$api.loadMore(
          this,
          params,
          "/order/coinExchangeOrderList",
          this.shoppList,
          o => {
            if (
              o.res_data.coinExchangeOrderList.total == this.shoppList.length
            ) {
              //已经加载完毕
              Toast("没有了");
              this.allLoaded = true;
            } else {
              o.res_data.coinExchangeOrderList.forEach(u => {
                this.shoppList.push(u);
              });
              if (
                o.res_data.coinExchangeOrderList.total == this.shoppList.length
              ) {
                //加载完毕
                // 不知道要不要说点什么
                this.allLoaded = true;
              }
            }
          }
        );
        return;
      }
      var params = {
        goodName: this.product,
        pageSize: 10,
        token: this.token,
        orderType: this.shop
      };
      this.$api.loadMore(this, params, this.url, this.shoppList);
    },
    formatStatus(status){
      let text ="";
      if(this.isGoldChanger){
        text = this.goldStatus[status==(-2||-1||-3)?8:status];
      }else{
        text = this.stores[status==(-2||-1||-3)?8:status];
      }

      if(status == -8){
        text = "退款成功"
      }
      if(status == -10){
        text = "退货退款成功"
      }
      return text;
    },
    logins() {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let token = sessionStorage.getItem("token");

      if (token == null) {
        if (r == null) {
          location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2forder%2flist&response_type=code&scope=snsapi_userinfo#wechat_redirect";
        } else {
          this.$axios({
            method: "post",
            url: "/basics/anon/appWxAuth",
            responseType: "json",
            data: {
              code: r[2],
              reqType: 0
            }
          })
            .then(data => {
              console.log(data);
              sessionStorage.shop = 0;
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(
                  data.data.res_data.member
                );
                sessionStorage.token = data.data.res_data.token;
              }
              if (data.data.res_data.returnCode == 0) {
                this.binding = true;
              }
              window.location.reload();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    gaincodes() {
      console.log(111);
      let token = sessionStorage.getItem("token");
      if (this.clicks == false) {
        return false;
      }

      var reg = /^1[1-9]\d{9}$/;
      console.log(reg.test(this.mobile));
      if (!reg.test(this.mobile)) {
        alert("号码不正确");
      } else {
        this.clicks = false;
        let times = 60;
        var tim = document.getElementsByClassName("codebtn")[0];
        tim.innerHTML = times + "S";
        let _this = this;
        var time = setInterval(function() {
          times--;
          tim.innerHTML = times + "S";
          if (times == 0) {
            _this.clicks = true;
            tim.innerHTML = "获取验证码";
            clearInterval(time);
          }
        }, 1000);
        this.$axios({
          method: "post",
          url: "/basics/anon/sendMobileCode",
          responseType: "json",
          data: {
            mobile: this.mobile,
            type: 8
          }
        })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    bidingmobile() {
      if (this.states) {
        this.states = false;
        var member = JSON.parse(sessionStorage.details);
        console.log(member);
        let obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.memberStatus,
          mobile: this.mobile,
          mobileCode: this.codes,
          nickname: member.nickname,
          openId: member.openId,
          sex: member.sex,
          subscribe: member.subscribe,
          type: 8,
          unionId: member.unionId
        };
        this.$axios({
          method: "post",
          url: "/basics/anon/loginAuthorizedCode",
          responseType: "json",
          data: obj
        })
          .then(data => {
            console.log(data);
            if (data.data.res_code == 0) {
              this.binding = false;
              sessionStorage.details = JSON.stringify(
                data.data.res_data.member
              );
              sessionStorage.token = data.data.res_data.token;
            } else {
              alert(data.data.res_info);
              this.states = true;
            }

            if (data.data.res_data.member.subscribe != 1) {
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss = 3;
              this.code = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
      if (this.isGoldChanger) {
        this.$router.push({
          path: "/order/detail",
          query: { orderId: this.shoppList[index].orderId,goldChangerId:this.shoppList[index].id, isGoldChanger: 1 }
        });
      } else {
        if (this.shoppList[index].orderType == 1) {
          //抢购订单
          this.$router.push({
            path: "/order/detail",
            query: {
              orderId: this.shoppList[index].orderId,
              isFlashSaleOrder: 1
            }
          });
        } else {
          sessionStorage.orderId = JSON.stringify(
            this.shoppList[index].goodsList[keys].orderId
          );
          this.$router.push("/order/detail");
        }
      }
    },
    tabMenu(index) {
      this.shop = index;
      this.allLoaded = false;
      this.menuList.forEach((element, i) => {
        if (index == i) {
          element.active = true;
        } else {
          element.active = false;
        }
      });

      sessionStorage.removeItem("managerDetail");
      if (this.$route.query.isGoldChanger && index == 4) {
        index = -1;
      }
      if (index == 5) {
        this.btnstatus = true;
        this.$axios({
          method: "post",
          url: "/order/pageGiftOrder",
          responseType: "json",
          data: {
            token: this.token,
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
        return;
      }else{
        this.btnstatus = false;
      }
      this.$axios({
        method: "post",
        url: this.url,
        responseType: "json",
        data: {
          token: this.token,
          orderType: index,
          pageNo: 1,
          pageSize: 10
        }
      })
        .then(data => {
          if (this.isGoldChanger) {
            this.shoppList = data.data.res_data.coinExchangeOrderList.rows;
          } else {
            this.shoppList = data.data.res_data.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //支付
    pays(index, key) {
      sessionStorage.orderId = this.shoppList[index].orderId;

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
          token: this.token,
          goodsData: JSON.stringify(obj)
        }
      })
        .then(data => {
          if (data.status == 200) {
            sessionStorage.goodsList = JSON.stringify(data.data.res_data);
            this.$router.push("/shoppingCart/balance");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel(index) {
      let msg = "是否确认删除订单";
      if (!this.isGoldChanger) {
        msg = "是否确认取消订单";
      }
      MessageBox.confirm(msg, "提示").then(o => {
        let urls;
        if (!this.isGoldChanger) {
          if (this.btnstatus) {
            urls = "/order/giftOrderCancel";
          } else if (this.shoppList[index].orderType == 1) {
            urls = "flashsale/orderCancel";
          } else {
            urls = "/order/orderCancel";
          }
        } else {
          urls = "order/delCoinExchangeOrder";
        }

        this.$axios({
          method: "post",
          url: urls,
          responseType: "json",
          data: {
            token: this.token,
            orderId: this.shoppList[index].orderId
          }
        })
          .then(data => {
            if (data.status == 200) {
              this.shoppList.splice(index, 1);
              MessageBox("提示", data.data.res_info);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    confirm(index) {
      // this.takegoods = true;
      // this.num = index;
      MessageBox.confirm("是否确认收货", "提示").then(o => {
        let urls = "";
        if (this.isGoldChanger) {
          urls = "order/coinExchangeOrderRog";
        } else {
          if (this.btnstatus) {
            //店长礼包
            urls = "/order/giftOrderRog";
          } else if (this.shoppList[index].orderType == "1") {
            //抢购订单
            urls = "/flashsale/orderRog";
          } else {
            //普通订单
            urls = "/order/orderRog";
          }
        }
        let params = {
          token: this.token,
          orderId: this.shoppList[index].orderId
        };
        this.$axios({
          method: "post",
          url: urls,
          responseType: "json",
          data: params
        })
          .then(data => {
            if (data.data.res_code == "0") {
              // this.takegoods = false;

              this.tabMenu(0);
              Toast("收货成功");
            } else {
              MessageBox("提示", data.data.res_info);
              this.takegoods = false;
            }

            // console.log('11111');
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      });
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
          token: this.token,
          orderId: this.shoppList[this.num].orderId
        }
      })
        .then(data => {
          if (data.data.res_code == "0") {
            this.takegoods = false;
            this.num = 0;
            this.tabMenu(0);
            Toast("收货成功");
          } else {
            MessageBox("提示", data.data.res_info);
            this.takegoods = false;
          }

          // console.log('11111');
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    logistics(index) {
      sessionStorage.orderId = this.shoppList[index].orderId;
      if (!this.isGoldChanger) {
        sessionStorage.goodsImage = JSON.stringify(
          this.shoppList[index].goodsList[0].goodsImage
        );
        if (this.shoppList[index].orderType == "1") {
          //抢购订单
          this.$router.push({
            path: "/logistics",
            query: { isFlashSaleOrder: 1 }
          });
        } else {
          this.$router.push("/logistics");
        }
      } else {
        sessionStorage.goodsImage = JSON.stringify(
          this.shoppList[index].squareImage
        );
        this.$router.push({
          path: "/logistics",
          query: { isGoldChanger: this.isGoldChanger }
        });
      }
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
      this.$router.push({
        path: "/rightDetail",
        query: { orderType: this.shoppList[this.index].orderType }
      });
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
          orderType: this.shoppList[index].orderType,
          orderSn: this.shoppList[index].orderSn,
          token: this.token
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
          this.$router.push({
            path: "/appraise",
            query: { orderType: this.shoppList[index].orderType }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.goods-simple{
  padding:0 .3rem;background:white;
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
