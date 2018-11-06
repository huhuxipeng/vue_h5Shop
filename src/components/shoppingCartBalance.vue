<template>
  <div class="shopping-cart-balance-page">
    <commonTop header-title="结算" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <div class="add-line"></div>
    <section class="add-show" @click="changeadd">
      <span class="icons local-icon"></span>
      <p v-if='!adds'>
        <i>收货人:{{addre.name}} &nbsp;&nbsp;&nbsp; {{addre.mobile}}</i>
        <i>{{addre.provinceName}}{{addre.cityName}}{{addre.districtName}}{{addre.addressDetail}}</i>
      </p>
      <p v-if="adds">去添加收货地址</p>
      <span class="icons arrow-icon"></span>
    </section>
    <div class="add-line"></div>
    <div class="overseas" v-if="bol">
      <p>
        <span>真实姓名：</span>
        <span><input type="text" v-model="selfname" placeholder="请输入真实姓名"/></span>
      </p>
      <p>
        <span>身份证号：</span>
        <span><input type="text" v-model="selfnumber" placeholder="请输入真实身份证号" @change="selfbirth"/></span>
      </p>
      <p>海关政策要求，身份证信息仅用于海关清关，本平台会加密保存</p>
    </div>

    <section class="store" v-if="isGoldChanger||isFlashSaleOrder">

      <ul class="goods-show" style="width:100%;">
        <li>
          <div class="goods-info">
            <img :src="goodsList.goodsImage |filterss(3)" class="store-logo" :onerror="logo">
            <span>
              <h2>{{goodsList.goodsName}}</h2>
              <p>{{goodsList.specs}}</p>
              <!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
              <i v-if="isGoldChanger" style="text-align:right;">
                {{goodsList.buyCount}}
                <u>X{{goodsList.exchangeCoin}}金币</u>
              </i>
              <i v-if="isFlashSaleOrder">
                ￥{{goodsList.flashsalePrice}}
                <u>X{{goodsList.buyCount}}</u>
              </i>
                <span v-if="shipAmount" style="margin-top:.1rem;">邮费：￥{{shipAmount}}</span>
            </span>
          </div>
        </li>
      </ul>
      <ul class="price-list">
        <li class="input-bar">
          <span>给商家留言:</span>
          <input type="text" placeholder="（选填:30字域内）" class="input">
        </li>
      </ul>
    </section>
    <section class="store" v-if="placeval" v-for="(item,index) in placeval">
      <div class="store-info">
        <span class="icons store-icon"></span>
        <i>{{item.comName}}</i>
      </div>
      <ul class="goods-show">
        <li v-for="(value,keys) in item.goodsList">
          <div class="goods-info">
            <img :src="value.image |filterss(3)" class="store-logo" :onerror="logo">
            <span>
              <h2>{{value.name}}</h2>
              <p>{{value.specs}}</p>
              <!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
              <i>
                ￥{{(value.price).toFixed(2)}}
                <u>X{{value.buyCount}}</u>
              </i>
            </span>
          </div>
        </li>
      </ul>


      <ul class="goods-show" v-if="isGoldChanger" style="width:100%;height:3rem;">
        <li>
          <div class="goods-info">
            <img :src="goodslist.goodsImage |filterss(3)" class="store-logo" :onerror="logo">
            <span>
              <h2>{{goodslist.goodsName}}</h2>
              <p>{{goodslist.specs}}</p>
              <!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
              <i>
                {{goodslist.exchangeCoin}}
                <u>X{{goodslist.buyCount}}金币</u>
              </i>
            </span>
          </div>
        </li>
      </ul>


      <ul class="price-list">

        <li @click="selectQuan(item,index)" v-if="item.couponList && DISCOUNT == 0">
          <span>店铺优惠</span>
          <i style="color: red;letter-spacing: 1px" v-if="xuanlequan[index]">使用优惠券<span
            class="iii icons arrow-icon"></span></i>
          <i style="color: red;letter-spacing: 1px" v-if="!xuanlequan[index]">-¥{{discountPrice[index].toFixed(2)}}<span
            class="iii icons arrow-icon"></span></i>
          <!--<i>￥{{shipAmount}}</i>-->
        </li>
        <li v-if="DISCOUNT != 0">
          <span>店铺优惠</span>
          <i style="color: red;letter-spacing: 1px">-¥{{DISCOUNT.toFixed(2)}}</i>
        </li>
        <li>
          <span>邮费</span>
          <i>￥{{item.shipAmount}}</i>
          <!--<i>￥{{shipAmount}}</i>-->
        </li>
        <li class="deduction" v-if="switchvals">
          <span class="span">云积分</span>
          <span class="deductions span">云积分抵扣-￥{{goodsList.cloudPoint}}
            <mt-switch v-model="switchval" @change="turn"></mt-switch>
          </span>
        </li>
        <li>
          <span>共{{(item.goodsCount)}}件商品</span>
          <i v-if="DISCOUNT == 0" style="color: red">小计￥{{((discountPrice[index])?(item.totalPrice -
            discountPrice[index]):(item.totalPrice)).toFixed(2)}}</i>

          <i v-if="DISCOUNT != 0" style="color: red">小计￥{{(item.totalPrice - DISCOUNT).toFixed(2)}}</i>

          <!--<u>共{{(item.goodsCount)}}件商品，小计-->
          <!--<em>￥{{(item.totalPrice).toFixed(2)}}</em>-->
          <!--</u>-->
        </li>
        <li class="input-bar">
          <span>给商家留言:</span>
          <input type="text" placeholder="（选填:30字域内）" class="input">
        </li>
      </ul>
      <div class="geceng1"></div>
    </section>
    <!--<div class="total-pay-top"></div>-->

    <section class="store">
      <div class="store-info" style="background-color: rgb(245,245,245);color: rgb(153,153,165);padding-bottom: 0.2rem">
        <i>支付方式：</i>
      </div>
      <ul class="price-list">
        <li @click="xuanzewei" class="fu">
          <span class="zhifu"><img src="../common/image/wx.jpg" alt="">微信支付(推荐)</span>
          <i class="rightFu"><img v-if="weixuanz" src="../common/image/unselect.png" alt=""><img v-if="weixuanz1"
                                                                                                 src="../common/image/select.png"
                                                                                                 alt=""></i>
        </li>
        <!--<li @click="xuanzezhi">-->
        <!--<span class="zhifu"><img src="../common/image/zfb.jpg" alt="">支付宝</span>-->
        <!--<i class="rightFu"><img v-if="zhixuanz" src="../common/image/rightFu.png" alt=""></i>-->
        <!--</li>-->
        <li @click="xuanzeyu" class="fu">
          <span class="zhifu"><img src="../common/image/ye.jpg" alt="">余额支付</span>
          <i class="rightFu"><img v-if="yuxuanz" src="../common/image/unselect.png" alt=""><img v-if="yuxuanz1"
                                                                                                src="../common/image/select.png"
                                                                                                alt=""></i>
        </li>
        <li @click="xuanzehong" class="fu" v-if="isFlashSaleOrder != 1">
          <span class="zhifu"><img src="../common/image/hjf.jpg" alt="">红积分支付</span>
          <i class="rightFu"><img v-if="hongxuanz" src="../common/image/unselect.png" alt=""><img v-if="hongxuanz1"
                                                                                                  src="../common/image/select.png"
                                                                                                  alt=""></i>
        </li>
      </ul>
      <div class="geceng1"></div>
    </section>

    <div class="geceng"></div>


    <div v-if="isGoldChanger" class="total-pay boderBox">
      <span>合计：
        <em>{{sum}}金币</em>
      </span>
      <aside v-on:click="changeGoods">兑换</aside>
    </div>
    <div v-else class="total-pay boderBox">
      <span v-if="!switchval">合计：
        <em v-if="DISCOUNT == 0">￥{{(formatterTotal(sum,shipAmount)-discountPriceAll).toFixed(2)}}</em>
        <em v-if="DISCOUNT != 0">￥{{(formatterTotal(sum,shipAmount)- DISCOUNT).toFixed(2)}}</em>
      </span>
      <span v-else>合计：
        <em v-if="DISCOUNT == 0">￥{{(sum+shipAmount-goodsList.cloudPoint  - discountPriceAll).toFixed(2)}}</em>
        <em v-if="DISCOUNT != 0">￥{{(sum+shipAmount-goodsList.cloudPoint  - DISCOUNT).toFixed(2)}}</em>
      </span>
      <aside @click="payOrder">立即支付</aside>
    </div>
    <!--<section class="bottom-layer" v-if="layerShow">-->
    <!--<div class="layer-content">-->
    <!--<ul>-->
    <!--<li class="title">选择付款方式-->
    <!--<i v-on:click="hideLayer">取消</i>-->
    <!--</li>-->
    <!--<li @click="deposit">预存款-->
    <!--&lt;!&ndash;<u class="icons"></u>&ndash;&gt;-->
    <!--<u class="checks">￥{{money}}<input type="checkbox" class="check" v-model="checks"/></u>-->
    <!--</li>-->
    <!--<li @click="wepay();return false">微信支付-->
    <!--<u class="checks"><input type="checkbox" class="check" v-model="checks"/></u>-->
    <!--</li>-->

    <!--<li v-if="false">分期支付-->
    <!--<u class="checks"><input type="checkbox" class="check"/></u>-->
    <!--<div class="lists" v-if="list">-->
    <!--<ul>-->
    <!--<li>-->
    <!--<p>￥178.60/期</p>-->
    <!--<p>3期（含手续费）</p>-->
    <!--</li>-->
    <!--<li>-->
    <!--<p>￥91.00/期</p>-->
    <!--<p>6期（含手续费）</p>-->
    <!--</li>-->
    <!--<li>-->
    <!--<p>￥63.40/期</p>-->
    <!--<p>3期（含手续费）</p>-->
    <!--</li>-->
    <!--<li>-->
    <!--<p>￥49.60/期</p>-->
    <!--<p>3期（含手续费）</p>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--<div class="layer-bg"></div>-->
    <!--</section>-->

    <mt-popup popup-transition="popup-fade" v-model="showhiden">
      <div class="clears">
        <p>请输入支付密码</p>
        <input type="password" v-model="pass"/>
      </div>
      <div class="footers">
        <p @click="right">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>

    <mt-popup popup-transition="popup-fade" position="bottom" v-model='youhuiquan' class='popup' closeOnClickModal>
      <div class="title_shop">
        <span>选择优惠券</span>
        <span class="clear" @click="clearTan"><img src="../common/image/qrcodeimg/close.png" alt=""></span>
      </div>
      <ul>
        <li v-for="(item,index) in quanList">
          <div class="left0" v-if="item.cpnType == '0'"><p>¥{{item.discountPrice}}</p>
            <p>满{{item.minAmount}}可用</p></div>
          <div class="left1" v-if="item.cpnType == '1'"><p>¥{{item.discountPrice}}</p>
            <p>满{{item.minAmount}}可用</p></div>
          <div class="left2" v-if="item.cpnType == '2'"><p>¥{{item.discountPrice}}</p>
            <p>满{{item.minAmount}}可用</p></div>
          <div class="left3" v-if="item.cpnType == '3'"><p>¥{{item.discountPrice}}</p>
            <p>满{{item.minAmount}}可用</p></div>

          <div class="center">
            <p><span class="kind0" v-if="item.cpnType == '0'">分类券</span>
              <span class="kind1" v-if="item.cpnType == '1'">商品券</span>
              <span class="kind2" v-if="item.cpnType == '2'">店铺券</span>
              <span class="kind3" v-if="item.cpnType == '3'">通用券</span>
              <span>{{item.cpnName}}</span>
            </p>

            <p>{{dateSwitch(item.useBeginTime)}}-{{dateSwitch(item.useEndTime)}}</p>
          </div>
          <div class="right" @click="ling(index,item.discountPrice,item.id,item.minAmount)"><p
            :class="{active:(clickIndex == index )}"></p>
          </div>
        </li>
      </ul>
    </mt-popup>


  </div>
</template>

<script>
  import commonTop from "../components/commonTop";
  import {Switch, MessageBox} from "mint-ui";

  export default {
    data() {
      return {
        layerShow: false,
        DISCOUNT: 0,
        clickIndex: -1,
        addre: [],
        money: 0,
        discountPrice: [],
        // true111:true,
        kong: '',
        goodsList: [],
        placeval: false,
        sum: 0,
        shipAmount: 0,
        xuanlequan: [],
        selectId: '',
        token: "",
        buyCount: 0,
        placeadd: "",
        logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
        orderId: 0,
        lingqu: false,
        xuanze: false,
        checks: false,
        list: false,
        // discountPrice:"n张可用",
        selSpecObj: [],
        adds: false,
        showhiden: false,
        pass: "",
        fangshi: 1,
        selfname: "",
        selfnumber: "",
        quanList: [],
        couponJson: [],
        isGoldChanger: false,
        isFlashSaleOrder: false,
        bol: false,
        youhuiquan: false,
        switchval: false,
        switchvals: false,
        discountPriceAll: 0,
        weixuanz: false,
        yuxuanz: true,
        totalJia: '',
        hongxuanz: true,
        INDEX: -1,
        weixuanz1: true,
        yuxuanz1: false,
        hongxuanz1: false,
        quanNum: '',
        changeReady: true,//表示兑换按钮点击状态，避免重复点击
        //      cartId:0
      };
    },
    components: {
      commonTop: commonTop
    },
    mounted: function () {
      if (sessionStorage.getItem('orderId')) {
        let url = "order/orderDetails";
        this.$axios({
          method: "post",
          url: url,
          responseType: "json",
          data: {
            orderId: sessionStorage.getItem("orderId"),
            token: sessionStorage.getItem("token")
          }
        })
          .then(data => {
            this.DISCOUNT = data.data.res_data.order.discount
          }).catch(e => {
          console.log(e);
        })
      }


      if (sessionStorage.getItem('isPay')) {

        sessionStorage.removeItem("isPay");

        if (this.$route.query.isFlashSaleOrder) {
          this.$router.push({
            path: "/payState",
            query: {orderId: sessionStorage.getItem('orderId'), isFlashSaleOrder: this.$route.query.isFlashSaleOrder}
          });
        }
        else {
          this.$router.push({
            path: "/payState",
            query: {orderId: sessionStorage.getItem('orderId')}
          });
        }


      }
      else {
        this.isGoldChanger = this.$route.query.isGoldChanger;
        this.isFlashSaleOrder = this.$route.query.isFlashSaleOrder;
        let s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";
        document.body.appendChild(s);

        this.token = sessionStorage.getItem("token");

        this.cartId = JSON.parse(sessionStorage.getItem("cartIds"));

        let productId = JSON.parse(sessionStorage.getItem("productId"));
        this.goodsList = JSON.parse(sessionStorage.getItem("goodsList"));

        // console.log(this.goodsList)
        //
        // if(this.isFlashSaleOrder){
        //
        // }
        // else{
        //   if(this.quanList = this.goodsList.comList[0].couponList){
        //     this.quanNum = this.goodsList.comList[0].couponList.length;
        //     this.quanList = this.goodsList.comList[0].couponList;
        //   }
        // }


        if (this.goodsList.cloudPoint > 0) {
          this.switchvals = true;
          this.switchval = true;
        }
        let SELSPECOBJ = JSON.parse(sessionStorage.getItem("SELSPECOBJ"));
        this.selSpecObj = SELSPECOBJ;

        if (this.goodsList.comList) {
          // debugger
          this.placeval = this.goodsList.comList;

          for (var j = 0; j < this.placeval.length; j++) {
            this.xuanlequan[j] = true

            this.sum += parseFloat(this.placeval[j].totalPrice);
            this.buyCount = this.placeval[j].buyCount;
            if (this.placeval[j].goodsType == 1) {
              this.bol = true;
            }
          }
        }
        else {
          this.placeval = false
          this.buyCount = this.goodsList.buyCount;
          this.sum = this.goodsList.totalPrice;
          this.shipAmount = this.goodsList.shipAmount
        }

        if (JSON.parse(sessionStorage.getItem("placeadd"))) {
          this.addre = JSON.parse(sessionStorage.getItem("placeadd"));
          console.log(this.addre);
          this.getShipAmount(this.addre.cityId);
        }
        else {
          this.placeadd = this.goodsList.memberAddressList;

          for (var i = 0; i < this.placeadd.length; i++) {
            if (this.placeadd[i].defAddr == 1) {
              this.addre = this.placeadd[i];
            }
          }
        }
        if (!JSON.parse(sessionStorage.getItem("placeadd")) && this.goodsList.memberAddressList.length == 0) {
          this.adds = true;
        }
        if (this.addre.length > 0) {
          alert("请先填写收货地址");
        }
        else {
          if (this.goodsList.goodsJsonList) {
            let url = "";
            if (this.isFlashSaleOrder) {
              url = '/flashsale/getShipAmount'
            } else {
              url = "/order/computeOrderFreight"
            }
            //计算运费
            this.$axios({
              method: "post",
              url: url,
              responseType: "json",
              data: {
                goodsList: this.goodsList.goodsJsonList,
                memberAddressId: this.addre.addrId,
                token: this.token
              }
            })
              .then(data => {
                for (let i = 0; i < data.data.res_data.freightList.length; i++) {
                  this.goodsList.comList[i].shipAmount =
                    data.data.res_data.freightList[i].shipAmount;
                  //					console.log(data.data.res_data.freightList[i].shipAmount)
                  //					console.log(this.goodsList.comList)
                  this.shipAmount += this.goodsList.comList[i].shipAmount;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      }


    },
    watch: {
      orderId(orderId) {
        sessionStorage.setItem("orderId", orderId)
      }
    },
    methods: {
      dateSwitch(timestamp) {
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        // var hours = time.getHours();
        // var minutes = time.getMinutes();
        // var seconds = time.getSeconds();
        return year + '.' + this.add0(month) + '.' + this.add0(date);
      },
      add0(m) {
        return m < 10 ? '0' + m : m;
      },
      selectQuan(item, index) {
        this.youhuiquan = true;
        this.totalJia = item.totalPrice
        this.quanList = item.couponList;
        this.INDEX = index
        this.clickIndex = -1
      },
      clearTan() {
        this.youhuiquan = false
      },
      xuanzewei() {
        this.fangshi = 1
        this.weixuanz = false
        this.yuxuanz = true
        this.hongxuanz = true

        this.weixuanz1 = true
        this.yuxuanz1 = false
        this.hongxuanz1 = false

      },
      ling(index, price, id, minAmount) {
        // console.log(this.switchval)
        if (this.totalJia >= minAmount) {
          this.clickIndex = index
          this.selectId = id
          this.youhuiquan = false
          this.discountPrice[this.INDEX] = price

          this.xuanlequan[this.INDEX] = false

          // console.log(this.discountPrice)
          var m = 0;
          for (var i = 0; i < this.discountPrice.length; i++) {
            if (this.discountPrice[i]) {
              m += this.discountPrice[i];
            }

          }


          this.discountPriceAll = m;

          var zizu = {
            'comId': this.goodsList.comList[this.INDEX].comId,
            'cpnId': this.selectId
          }
          this.couponJson[this.INDEX] = zizu;
        }
        else {
          alert("本券不满足使用条件")
        }


      },
      xuanzeyu() {
        this.fangshi = 2
        this.weixuanz = true
        this.yuxuanz = false
        this.hongxuanz = true

        this.weixuanz1 = false
        this.yuxuanz1 = true
        this.hongxuanz1 = false
      },
      xuanzehong() {
        this.fangshi = 3
        this.weixuanz = true
        this.yuxuanz = true
        this.hongxuanz = false

        this.weixuanz1 = false
        this.yuxuanz1 = false
        this.hongxuanz1 = true
      },
      getShipAmount(cityId) {
        let url = "";
        if (this.isFlashSaleOrder) {
          url = '/flashsale/getShipAmount'
        } else {
          url = "/order/computeOrderFreight"
        }

        this.$axios({
          method: "post",
          url: url,
          responseType: "json",
          data: {
            buyCount: this.buyCount,
            cityId,
            token: this.token,
            flashsaleProductId: this.goodsList.flashsaleProductId,
          }
        })
          .then(data => {
            this.shipAmount = data.data.res_data.shipAmount;
          }).catch(e => {
          console.log(e);
        })
      },
      turn() {
        if (this.switchval) {
          this.switchval = false;
        } else if (!this.switchval) {
          this.switchval = true;
        }
      },

      selfadd() {
        //身份证验证
        //				let reg=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        let pattern = /^[1-9][0-9]/;
        var provs = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门"
        };
        let add = this.selfnumber.slice(0, 2);
        if (pattern.test(add)) {
          if (provs[add]) {
            return true;
          } else {
            alert("身份证格式不正确");
          }
        }
        return false;
      },
      selfbirth(value) {
        let birth = this.selfnumber.slice(6, 18);
        let reg = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (this.selfnumber.length == 18) {
          if (this.selfadd()) {
            if (reg.test(birth)) {
              var year = this.selfnumber.slice(6, 10);
              var month = this.selfnumber.slice(10, 12);
              var date = this.selfnumber.slice(12, 14);
              var date2 = new Date(year + "-" + month + "-" + date);
              if (date2 && date2.getMonth() == parseInt(month) - 1) {
                return true;
              }
            } else {
              alert("身份证格式不正确");
            }
          }
        } else {
          alert("身份证位数不足");
          this.selfnumber = "";
        }
        return false;
      },
      formatterTotal(num1, num2) {
        // console.log(num1, num2);
        return parseFloat(num1) + parseFloat(num2);
      },
      changeGoods() {
        console.log(this.goodsList);
        if (!this.changeReady) {
          return;
        }
        this.changeReady = false;
        if (!this.addre.addrId) {
          MessageBox("地址不能为空");
          return
        }
        let params = {
          id: this.goodsList.id,
          buyCount: this.goodsList.buyCount,
          productId: this.goodsList.productId,
          memberAddressId: this.addre.addrId,
          exchangeCoin: this.sum,
          token: this.token
        };
        this.$axios({
          method: "post",
          url: "/order/createCoinExchangeOrder",
          responseType: "json",
          data: params
        })
          .then(data => {

            if (data.data.res_code != 0) {
              MessageBox("提示", data.data.res_info);
              return;
            }
            //这里应该是要跳订单记录的，
            this.orderId = data.data.res_data.coinExchangeGoods.orderId;
            let option = {
              payType: 3,
              orderId: this.orderId,
              reqType: 0,
              token: this.token,
              totalExchangeCoin: this.sum
            };

            this.$axios({
              method: "post",
              url: "/pay/coinExchangeOrderPay",
              responseType: "json",
              data: option
            })
              .then(o => {
                this.changeReady = true;
                if (o.data.res_code != 0) {
                  MessageBox("提示", o.data.res_info);
                  return;
                }
                sessionStorage.paySuccess = o.data.res_code;
                let params = {
                  orderId: this.orderId
                };
                if (this.isGoldChanger) {
                  params.isGoldChanger = this.isGoldChanger;
                  params.goldChangerId = this.$route.query.goldChangerId
                }

                this.$router.push({
                  path: "/payState",
                  query: params
                });
              })
              .catch(err => {
                this.changeReady = true;
                console.log(err);
              });


          })
          .catch(err => {
            this.changeReady = true;
            console.log(err);
          });
        console.log(params);
      },
      hideLayer: function () {
        this.layerShow = false;
      },
      payOrder: function () {
        // this.layerShow = true;
        // alert(this.fangshi)

        let cloudenumber = 0;
        if (this.switchval) {
          cloudenumber = 1;
        } else {
          cloudenumber = 0;
        }

        this.$axios({
          method: "post",
          url: "/member/jifenyuetongji",
          responseType: "json",
          data: {
            token: this.token
          }
        })
          .then(data => {
            this.money = data.data.res_data.member.advance;
          })
          .catch(err => {
            console.log(err);
          });

        if (sessionStorage.getItem("orderId")) {
          this.orderId = sessionStorage.getItem("orderId");

          if (this.fangshi == 1) {
            if (this.addre.addrId == null) {
              MessageBox("地址不能为空");
              this.layerShow = false;
            }
            else {
              sessionStorage.orderId = this.orderId;
              var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;

              var openId = sessionStorage.getItem("openId");

              let url = "/pay/jyPay";
              let params = {
                orderType: 0,
                openId: openId,
                token: this.token,
                orderId: this.orderId,
                payWay: '01',
                payType: '06'
              }
              if (this.$route.query.isFlashSaleOrder) {
                //如果是抢购订单
                params = {
                  orderType: 7,
                  openId: openId,
                  token: this.token,
                  orderId: this.orderId,
                  payWay: '01',
                  payType: '06',
                  reqType: 0
                }
              }

              if (sessionStorage.getItem("token")) {
                this.$axios({
                  method: "post",
                  url: url,
                  responseType: "json",
                  data: params
                })
                  .then(data => {
                    sessionStorage.setItem('isPay', true);
                    window.location.href = data.data.payInfo;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              else {
                alert(this.token);
              }
            }
          }
          else if (this.fangshi == 2) {
            this.showhiden = true;
          }
          else if (this.fangshi == 3) {
            // alert("是红积分支付")
            if (this.$route.query.isFlashSaleOrder) {
              alert("抢购订单不支持红积分支付");
              return
            }
            else {
              this.showhiden = true;
            }
          }
        }


        else {
          // 如果是抢购订单
          if (this.$route.query.isFlashSaleOrder) {

            //如果是抢购订单
            this.$axios({
              method: "post",
              url: "/flashsale/createOrder",
              responseType: "json",
              data: {
                buyCount: this.buyCount,
                flashsaleId: sessionStorage.flashsaleId,
                flashsaleProductId: this.goodsList.flashsaleProductId,
                memberAddressId: this.addre.addrId,
                token: this.token
              }
            })
              .then(data => {

                this.orderId = data.data.res_data.order.orderId;

                if (this.addre.addrId == null) {
                  MessageBox("地址不能为空");
                  this.layerShow = false;
                }
                else {
                  sessionStorage.orderId = this.orderId;

                  // 如果没有缓存orderId,发起抢购订单聚合微信支付
                  if (this.fangshi == 1) {
                    if (this.addre.addrId == null) {
                      MessageBox("地址不能为空");
                      this.layerShow = false;
                    }
                    else {
                      sessionStorage.orderId = this.orderId;
                      var openId = sessionStorage.getItem("openId");

                      let url = "/pay/jyPay";

                      if (sessionStorage.getItem("token")) {
                        this.$axios({
                          method: "post",
                          url: url,
                          responseType: "json",
                          data: {
                            orderType: 7,
                            openId: openId,
                            token: this.token,
                            orderId: this.orderId,
                            payWay: '01',
                            payType: '06',
                            reqType: 0
                          }
                        })
                          .then(data => {
                            sessionStorage.setItem('isPay', true);
                            // console.log(data.data)
                            window.location.href = data.data.payInfo;
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      }
                      else {
                        alert(this.token);
                      }
                    }
                  }
                  else if (this.fangshi == 2) {
                    this.showhiden = true;
                  }
                  else if (this.fangshi == 3) {
                    if (this.$route.query.isFlashSaleOrder) {
                      alert("抢购订单不支持红积分支付");
                      return
                    }
                    else {
                      this.showhiden = true;
                    }
                  }
                }


              })
              .catch(err => {
                console.log(err);
              });
            return;
          }

          //如果是普通订单
          if (this.goodsList.cartIds != null || this.goodsList.cartIds != "") {

            if (this.bol == false) {
              this.$axios({
                method: "post",
                url: "/order/createGoodsOrder",
                responseType: "json",
                data: {
                  couponJson: JSON.stringify(this.couponJson),
                  isCloudPoint: cloudenumber,
                  goodsList: this.goodsList.goodsJsonList,
                  memberAddressId: this.addre.addrId,
                  cartIds: this.goodsList.cartIds,
                  token: this.token
                }
              })
                .then(data => {
                  if (data.status == 200) {
                    this.orderId = data.data.res_data.order.orderId;

                    //如果没有缓存orderId,普通订单使用聚合微信支付
                    if (this.fangshi == 1) {
                      if (this.addre.addrId == null) {
                        MessageBox("地址不能为空");
                        this.layerShow = false;
                      }
                      else {
                        sessionStorage.orderId = this.orderId;
                        var openId = sessionStorage.getItem("openId");

                        let url = "/pay/jyPay";

                        if (sessionStorage.getItem("token")) {
                          this.$axios({
                            method: "post",
                            url: url,
                            responseType: "json",
                            data: {
                              orderType: 0,
                              openId: openId,
                              token: this.token,
                              orderId: this.orderId,
                              payWay: '01',
                              payType: '06',
                              reqType: 0
                            }
                          })
                            .then(data => {
                              sessionStorage.setItem('isPay', true);
                              // console.log(data.data)
                              window.location.href = data.data.payInfo;
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                        else {
                          alert(this.token);
                        }
                      }
                    }
                    //如果没有缓存orderId,普通订单使用余额支付
                    else if (this.fangshi == 2) {
                      this.showhiden = true;
                    }
                    //如果没有缓存orderId,普通订单使用红积分支付
                    else if (this.fangshi == 3) {
                      if (this.$route.query.isFlashSaleOrder) {
                        alert("抢购订单不支持红积分支付");
                        return
                      }
                      else {
                        this.showhiden = true;
                      }
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }


            else {
              if (this.selfnumber != "" && this.selfname != "") {


                this.$axios({
                  method: "post",
                  url: "/order/createGoodsOrder",
                  responseType: "json",
                  data: {
                    isCloudPoint: cloudenumber,
                    goodsList: this.goodsList.goodsJsonList,
                    memberAddressId: this.addre.addrId,
                    cartIds: this.goodsList.cartIds,
                    token: this.token,
                    memberCardId: this.selfnumber,
                    memberRealName: this.selfname
                  }
                })
                  .then(data => {
                    if (data.status == 200) {
                      this.orderId = data.data.res_data.order.orderId;

                      if (this.fangshi == 1) {
                        if (this.addre.addrId == null) {
                          MessageBox("地址不能为空");
                          this.layerShow = false;
                        }
                        else {
                          sessionStorage.orderId = this.orderId;

                          var openId = sessionStorage.getItem("openId");

                          let url = "/pay/jyPay";

                          if (sessionStorage.getItem("token")) {
                            this.$axios({
                              method: "post",
                              url: url,
                              responseType: "json",
                              data: {
                                orderType: 0,
                                openId: openId,
                                token: this.token,
                                orderId: this.orderId,
                                payWay: '01',
                                payType: '06',
                                reqType: 0
                              }
                            })
                              .then(data => {
                                sessionStorage.setItem('isPay', true);
                                window.location.href = data.data.payInfo;
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          }
                          else {
                            alert(this.token);
                          }
                        }
                      }
                      else if (this.fangshi == 2) {
                        this.showhiden = true;
                      }
                      else if (this.fangshi == 3) {
                        if (this.$route.query.isFlashSaleOrder) {
                          alert("抢购订单不支持红积分支付");
                          return
                        }
                        else {
                          this.showhiden = true;
                        }
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                alert("身份信息不能为空");
              }
            }
          }
          //下面和购物车有关，但是不知道干嘛用的
          else {
            if (this.bol == false) {

              this.$axios({
                method: "post",
                url: "/order/createGoodsOrder",
                responseType: "json",
                data: {
                  couponJson: JSON.stringify(this.couponJson),
                  goodsList: this.goodsList.goodsJsonList,
                  memberAddressId: this.addre.addrId,
                  token: this.token
                }
              })
                .then(data => {
                  if (data.status == 200) {
                    this.orderId = data.data.res_data.order.orderId;

                    if (this.fangshi == 1) {
                      if (this.addre.addrId == null) {
                        MessageBox("地址不能为空");
                        this.layerShow = false;
                      }
                      else {
                        sessionStorage.orderId = this.orderId;
                        var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;

                        var openId = sessionStorage.getItem("openId");

                        let url = "/pay/jyPay";
                        // if (this.$route.query.isFlashSaleOrder) {
                        //   //如果是抢购订单
                        //   url = "pay/flashsaleOrderPay";
                        // }

                        if (sessionStorage.getItem("token")) {
                          this.$axios({
                            method: "post",
                            url: url,
                            responseType: "json",
                            data: {
                              orderType: 0,
                              openId: openId,
                              token: this.token,
                              orderId: this.orderId,
                              payWay: '01',
                              payType: '06',
                              reqType: 0
                            }
                          })
                            .then(data => {
                              // console.log()
                              sessionStorage.setItem('isPay', true);
                              window.location.href = data.data.payInfo;
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                        else {
                          alert(this.token);
                        }
                      }
                    }
                    else if (this.fangshi == 2) {
                      this.showhiden = true;
                    }
                    else if (this.fangshi == 3) {
                      if (this.$route.query.isFlashSaleOrder) {
                        alert("抢购订单不支持红积分支付");
                        return
                      }
                      else {
                        this.showhiden = true;
                      }
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              if (this.selfnumber != "" && this.selfname != "") {

                this.$axios({
                  method: "post",
                  url: "/order/createGoodsOrder",
                  responseType: "json",
                  data: {
                    goodsList: this.goodsList.goodsJsonList,
                    memberAddressId: this.addre.addrId,
                    token: this.token,
                    memberCardId: this.selfnumber,
                    memberRealName: this.selfname
                  }
                })
                  .then(data => {
                    if (data.status == 200) {
                      this.orderId = data.data.res_data.order.orderId;


                      if (this.fangshi == 1) {
                        if (this.addre.addrId == null) {
                          MessageBox("地址不能为空");
                          this.layerShow = false;
                        }
                        else {
                          sessionStorage.orderId = this.orderId;
                          var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;

                          var openId = sessionStorage.getItem("openId");

                          let url = "/pay/jyPay";
                          // if (this.$route.query.isFlashSaleOrder) {
                          //   //如果是抢购订单
                          //   url = "pay/flashsaleOrderPay";
                          // }

                          if (sessionStorage.getItem("token")) {
                            this.$axios({
                              method: "post",
                              url: url,
                              responseType: "json",
                              data: {
                                orderType: 0,
                                openId: openId,
                                token: this.token,
                                orderId: this.orderId,
                                payWay: '01',
                                payType: '06',
                                reqType: 0
                              }
                            })
                              .then(data => {
                                // console.log()
                                sessionStorage.setItem('isPay', true);
                                window.location.href = data.data.payInfo;
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          }
                          else {
                            alert(this.token);
                          }
                        }
                      }
                      else if (this.fangshi == 2) {
                        this.showhiden = true;
                      }
                      else if (this.fangshi == 3) {
                        if (this.$route.query.isFlashSaleOrder) {
                          alert("抢购订单不支持红积分支付");
                          return
                        }
                        else {
                          this.showhiden = true;
                        }
                      }


                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                alert("身份信息不能为空");
              }
            }
          }
        }
      }
      ,

      changeadd() {
        this.$router.push("/shoppingCart/addSel");
      }
      ,
      // //选择支付方式
      // deposit(){
      //   this.showhiden = true;
      // }
      // ,
      //   wepay()
      //   {
      //     // console.log("微信支付")
      //
      //
      //     // }
      //   }
      // ,
      right() {
        if (this.fangshi == 2) {
          if (this.money > this.sum) {
            let url = "/pay/orderPay";
            if (this.$route.query.isFlashSaleOrder) {
              url = "pay/flashsaleOrderPay";
            }
            if (this.pass != "") {
              this.$axios({
                method: "post",
                url: url,
                responseType: "json",
                data: {
                  token: this.token,
                  orderId: this.orderId,
                  payType: 0,
                  reqType: 0,
                  payPwd: this.pass
                }
              })
                .then(data => {
                  if (data.status == 200) {
                    sessionStorage.paySuccess = data.data.res_code;
                    sessionStorage.orderId = this.orderId;
                    if (this.isFlashSaleOrder) {
                      this.$router.push({
                        path: "/payState",
                        query: {orderId: this.orderId, isFlashSaleOrder: this.isFlashSaleOrder}
                      });
                    } else {
                      this.$router.push({
                        path: "/payState",
                        query: {orderId: this.orderId}
                      });
                    }
                    if (data.data.res_code == 0) {
                      sessionStorage.removeItem("cartIds");
                      sessionStorage.removeItem("productId");
                      sessionStorage.removeItem("placeadd");
                    } else if (data.data.res_code == 1) {
                      if (data.data.res_info == "请先设置支付密码...") {
                        let r = confirm(data.data.res_info);
                        if (r == true) {
                          this.$router.push({
                            path: "/midefier/boundRawPassword",
                            query: {
                              set: 0
                            }
                          });
                        }
                      } else {
                        alert(data.data.res_info);
                      }
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert("支付密碼不能爲空");
            }
            this.layerShow = false;
          }
          else {
            alert("余额不足");
            this.layerShow = false;
          }
        }
        else if (this.fangshi == 3) {

          // alert(this.fangshi)
          // if (this.money > this.sum) {
          let url = "/pay/orderPay";
          // if (this.$route.query.isFlashSaleOrder) {
          //   alert("抢购订单不支持红积分支付");
          //   return
          // }
          if (this.pass != "") {
            this.$axios({
              method: "post",
              url: url,
              responseType: "json",
              data: {
                token: this.token,
                orderId: this.orderId,
                payType: 5,
                reqType: 0,
                payPwd: this.pass
              }
            })
              .then(data => {
                if (data.status == 200) {
                  sessionStorage.paySuccess = data.data.res_code;
                  sessionStorage.orderId = this.orderId;
                  // if (this.isFlashSaleOrder) {
                  //   this.$router.push({
                  //     path: "/payState",
                  //     query: {orderId: this.orderId, isFlashSaleOrder: this.isFlashSaleOrder}
                  //   });
                  // } else {
                  this.$router.push({
                    path: "/payState",
                    query: {orderId: this.orderId}
                  });
                  // }
                  if (data.data.res_code == 0) {
                    sessionStorage.removeItem("cartIds");
                    sessionStorage.removeItem("productId");
                    sessionStorage.removeItem("placeadd");
                  }
                  else if (data.data.res_code == 1) {
                    if (data.data.res_info == "请先设置支付密码...") {
                      let r = confirm(data.data.res_info);
                      if (r == true) {
                        this.$router.push({
                          path: "/midefier/boundRawPassword",
                          query: {
                            set: 0
                          }
                        });
                      }
                    }
                    else {
                      alert(data.data.res_info);
                    }
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            alert("支付密碼不能爲空");
          }
          this.layerShow = false;
          // }
          // else {
          //   alert("余额不足");
          //   this.layerShow = false;
          // }
        }
      },
      hongfu() {
        let url = "/pay/orderPay";
        if (this.$route.query.isFlashSaleOrder) {
          // url = "pay/flashsaleOrderPay";
          alert("抢购订单不支持红积分支付")
        }

        this.$axios({
          method: "post",
          url: url,
          responseType: "json",
          data: {
            token: this.token,
            orderId: this.orderId,
            payType: 5,
            reqType: 0,
            payPwd: this.pass
          }
        })
          .then(data => {
            if (data.status == 200) {
              sessionStorage.paySuccess = data.data.res_code;
              sessionStorage.orderId = this.orderId;
              this.$router.push({
                path: "/payState",
                query: {orderId: this.orderId}
              });
              if (data.data.res_code == 0) {
                sessionStorage.removeItem("cartIds");
                sessionStorage.removeItem("productId");
                sessionStorage.removeItem("placeadd");
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      ,
      abolish() {
        this.showhiden = false;
      }
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .active {
    /*color: #a4a4a4 !important;*/
    /*border: none !important;*/
    background: url("../common/image/select.png") 0 0 no-repeat !important;
    background-size: 100% 100% !important;
  }

  .popup {
    width: 100%;
    height: 10.4rem;
    font-size: .5rem;
    padding: 10px;
    text-align: center;
    .addlit {
      height: 5rem;
    }
    ul {
      background-color: white;
      li {
        background-color: white;
      }
    }
    .title_shop {
      padding: 8px;
      padding-top: 0;
      text-align: center;
      font-size: .4rem;
      color: black;
      border-bottom: rgb(245, 245, 245) 1px solid;
      span {
        line-height: .55rem;
      }
      .clear {
        display: inline-block;
        float: right;
        img {
          width: .55rem;
          height: .55rem;
          vertical-align: middle;
        }
      }
    }

    ul {
      width: 100%;
      height: 370px;
      overflow-y: scroll;
      li {
        list-style: none;
        height: 85px;
        border-bottom: rgb(245, 245, 245) 1px solid;
        margin: 5px;
        box-shadow: 0 2px 5px rgb(245, 245, 245);
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
          height: 100%;
        }
        .left0 {
          width: 25%;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("../common/image/mycoupon/bg2.png") 0 0 no-repeat;
          background-size: 100% 100%;
          p:nth-child(1) {
            font-size: .43rem;
          }
          p:nth-child(2) {
            font-size: .32rem;
          }
        }
        .left1 {
          width: 25%;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("../common/image/mycoupon/bg3.png") 0 0 no-repeat;
          background-size: 100% 100%;
          p:nth-child(1) {
            font-size: .43rem;
          }
          p:nth-child(2) {
            font-size: .32rem;
          }
        }
        .left2 {
          width: 25%;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("../common/image/mycoupon/bg0.png") 0 0 no-repeat;
          background-size: 100% 100%;
          p:nth-child(1) {
            font-size: .43rem;
          }
          p:nth-child(2) {
            font-size: .32rem;
          }
        }
        .left3 {
          width: 25%;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("../common/image/mycoupon/bg1.png") 0 0 no-repeat;
          background-size: 100% 100%;
          p:nth-child(1) {
            font-size: .43rem;
          }
          p:nth-child(2) {
            font-size: .32rem;
          }
        }
        .center {
          /*height: 100%;*/
          display: flex;
          /*padding: 5px;*/
          flex-direction: column;
          justify-content: space-between;
          /*align-items: left;*/
          width: 55%;
          font-size: .2rem;
          p {
            text-align: left;
          }
          p:nth-child(1) {
            padding-top: 5px;
            /*span:nth-child(1) {*/
            /*background-color: rgb(89, 204, 148);*/
            /*display: inline-block;*/
            /*!*width: ;*!*/
            /*color: #fff;*/
            /*padding: 5px;*/
            /*font-size: .266667rem;*/
            /*border-radius: 8px;*/
            /*margin-right: 5px;*/
            /*}*/
            .kind0 {
              background-color: #9B49C3;
              display: inline-block;
              /*width: ;*/
              color: #fff;
              padding: 5px;
              font-size: .266667rem;
              border-radius: 8px;
              margin-right: 5px;
            }
            .kind1 {
              background-color: #4D7AE8;
              display: inline-block;
              /*width: ;*/
              color: #fff;
              padding: 5px;
              font-size: .266667rem;
              border-radius: 8px;
              margin-right: 5px;
            }
            .kind2 {
              background-color: #4BC489;
              display: inline-block;
              /*width: ;*/
              color: #fff;
              padding: 5px;
              font-size: .266667rem;
              border-radius: 8px;
              margin-right: 5px;
            }
            .kind3 {
              background-color: #EA8033;
              display: inline-block;
              /*width: ;*/
              color: #fff;
              padding: 5px;
              font-size: .266667rem;
              border-radius: 8px;
              margin-right: 5px;
            }
            span:nth-child(2) {
              font-size: .32rem;
              font-weight: bold;
              color: black;
            }
          }
          p:nth-child(2) {
            padding-bottom: 2px;
            font-size: .26667rem;
          }
          /*p{*/
          /*text-align: left;*/
          /*margin: 0;*/
          /*padding: 0;*/
          /*}*/
          /*p:nth-child(1){*/
          /*font-size: .4rem;*/
          /*color: rgb(125,125,125);*/
          /*}*/
          /*p:nth-child(2){*/
          /*font-size: .25rem;*/
          /*color: rgb(164,164,164);*/
          /*}*/
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 10%;
          p {
            width: .53rem;
            height: .53rem;
            background: url("../common/image/unselect.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }

          /*span{*/
          /*!*display: inline-block;*!*/
          /*width: 100%;*/

          /*height: .45rem;*/
          /*color: red;*/
          /*border: solid 1px red;*/
          /*border-radius: 8px;*/
          /*font-size: .3rem;*/
          /*padding: 5px;*/
          /*display: flex;*/
          /*align-items: center;*/
          /*!*text-align: center;*!*/
          /*justify-content: center;*/
          /*}*/
        }
      }
    }
    .content {
      li {
        margin-bottom: .3rem;
        font-size: .4rem;
        text-align: center;
      }
    }
  }

  .iii {
    width: 0.13rem;
    height: 0.29rem;
    background-position: -1.81rem -0.88rem;
  }

  .geceng {
    position: relative;
    width: 100%;
    height: 50px;
  }

  .geceng1 {
    position: relative;
    width: 100%;
    height: 15px;
    background-color: rgb(245, 245, 245);
  }

  .checks {
    float: right;
    color: #999;
    .check {
      margin-left: 0.3rem;
      vertical-align: middle;
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 50%;
      outline: none;
    }
  }

  .lists {
    height: 2rem;
    margin-top: 0.4rem;
    ul {
      padding-top: 0.3rem;
      li {
        width: 3.6rem;
        height: 1.5rem;
        line-height: 0.7rem;
        border: 1px solid #ccc;
        float: left;
        margin-bottom: 0.3rem;
        text-align: center;
        p:nth-child(1) {
          font-size: 0.5rem;
        }
        p:nth-child(2) {
          font-size: 0.3rem;
        }
      }
      li:nth-child(2n-1) {
        margin-left: 0.3rem;
      }
      li:nth-child(odd) {
        margin-right: 0.2rem;
      }
    }
  }

  .clears {
    width: 8.125rem;
    height: 1.75rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    p {
      text-align: center;
      margin-top: .2rem;
    }
    input {
      width: 5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      /*padding: 0.2rem;*/
      font-size: 0.6rem;
      margin-top: 0.25rem;
      text-align: center;
    }
  }

  .footers {
    display: flex;
    justify-content: space-between;
    text-align: center;
    p {
      flex: 1;
      padding: 5px;
      padding-left: 20px;
      padding-right: 20px;
      line-height: .75rem;
      font-size: 0.4rem;
    }
    p:last-child {
      background: #eee;
    }
    p:first-child {
      background: #f22d07;
      color: white;
    }
  }
</style>
