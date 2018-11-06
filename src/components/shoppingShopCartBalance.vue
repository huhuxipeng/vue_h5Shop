<template>
  <div class="shopping-cart-balance-page">
    <!--<commonTop header-title="结算" header-type="1" header-class="bg-white" has-back="true"></commonTop>-->
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
    <section class="store" v-for="(item,index) in placeval">
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
	              			<i>￥{{(value.price).toFixed(2)}}<u>X{{value.buyCount}}</u></i>
            			</span>
          </div>
        </li>
      </ul>
      <ul class="price-list">
        <li class="input-bar">
          <span>给商家留言:</span>
          <input type="text" placeholder="（选填:30字域内）" class="input">
        </li>
        <li>
          <span>邮费</span>
          <i>￥{{item.shipAmount}}</i>
          <!--<i>￥{{shipAmount}}</i>-->
        </li>
        <li class="deduction" v-if="switchvals">
          <span class="span">云积分</span>
          <span class="deductions span">云积分抵扣-￥{{goodsList.cloudPoint}} <mt-switch v-model="switchval" @change="turn"></mt-switch></span>
        </li>
        <li>
          <u>共{{(item.goodsCount)}}件商品，小计<em>￥{{(item.totalPrice).toFixed(2)}}</em></u>
        </li>
      </ul>
    </section>
    <!--<div class="total-pay-top"></div>-->
    <div class="total-pay boderBox">
      <span v-if="!switchval">合计：<em>￥{{(sum+shipAmount).toFixed(2)}}</em></span>
      <span v-else>合计：<em>￥{{(sum+shipAmount-goodsList.cloudPoint).toFixed(2)}}</em></span>
      <aside v-on:click="showLayer">立即支付</aside>
    </div>
    <section class="bottom-layer" v-if="layerShow">
      <div class="layer-content">
        <ul>
          <li class="title">选择付款方式<i v-on:click="hideLayer">取消</i></li>
          <!--<li @click="deposit">预存款-->
            <!--&lt;!&ndash;<u class="icons"></u>&ndash;&gt;-->
            <!--<u class="checks">￥{{money}}<input type="checkbox" class="check" v-model="checks"/></u>-->
          <!--</li>-->
          <li @click="wepay();return false">微信支付
            <u class="checks"><input type="checkbox" class="check" v-model="checks"/></u>
          </li>

          <li v-if="false">分期支付
            <u class="checks"><input type="checkbox" class="check"/></u>
            <div class="lists" v-if="list">
              <ul>
                <li>
                  <p>￥178.60/期</p>
                  <p>3期（含手续费）</p>
                </li>
                <li>
                  <p>￥91.00/期</p>
                  <p>6期（含手续费）</p>
                </li>
                <li>
                  <p>￥63.40/期</p>
                  <p>3期（含手续费）</p>
                </li>
                <li>
                  <p>￥49.60/期</p>
                  <p>3期（含手续费）</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="layer-bg"></div>
    </section>

    <mt-popup popup-transition="popup-fade" v-model="showhiden">
      <div class="clears">
        <p>请输入支付密码</p>
        <input type="password" v-model="pass" />
      </div>
      <div class="footers">
        <p @click="right">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>

  </div>
</template>

<script>
  import commonTop from '../components/commonTop'
  import { Switch } from 'mint-ui';
  export default {
    data() {
      return {
        layerShow: false,
        addre: [],
        money: 0,
        goodsList: [],
        placeval: [],
        sum: 0,
        shipAmount: 0,
        token: '',
        buyCount: 0,
        placeadd: '',
        logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
        orderId: 0,
        checks: false,
        list: false,
        selSpecObj: [],
        adds: false,
        showhiden: false,
        pass: '',
        selfname: '',
        selfnumber: '',
        bol: false,
        switchval:false,
        switchvals:false,
        orderSn:0
        //      cartId:0
      }
    },
    components: {
      'commonTop': commonTop,
    },
    mounted: function() {
      document.title = "荟普旗舰店";
      let s = document.createElement("script");
      s.type = 'text/javascript';
      s.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
      document.body.appendChild(s);

      this.token = sessionStorage.getItem('token')

      //			this.money = JSON.parse(sessionStorage.getItem('details')).advance
      this.cartId = JSON.parse(sessionStorage.getItem("cartIds"))

      let productId = JSON.parse(sessionStorage.getItem('productId'))
      this.goodsList = JSON.parse(sessionStorage.getItem('goodsList'))
      console.log('商品数据',this.goodsList)
      console.log('cloudeintegral',this.goodsList.cloudPoint)
      if(this.goodsList.cloudPoint>0){
        this.switchvals=true
        this.switchval=true
      }
      let SELSPECOBJ = JSON.parse(sessionStorage.getItem('SELSPECOBJ'));
      this.selSpecObj = SELSPECOBJ;
      //			console.log('-----0002221-------');
      //			console.log(SELSPECOBJ);
      // console.log('购物车缓存');
      //			 console.log(this.goodsList);
      // console.log('购物车缓存');

      this.placeval = this.goodsList.comList
      // alert(JSON.stringify(this.placeval))

      for(var j = 0; j < this.placeval.length; j++) {
        this.sum += parseFloat(this.placeval[j].totalPrice)
        this.buyCount = this.placeval[j].buyCount
        if(this.placeval[j].goodsType == 1) {
          this.bol = true
        }
      }

      if(JSON.parse(sessionStorage.getItem("placeadd"))) {
        this.addre = JSON.parse(sessionStorage.getItem("placeadd"))
      } else {
        this.placeadd = this.goodsList.memberAddressList

        for(var i = 0; i < this.placeadd.length; i++) {
          if(this.placeadd[i].defAddr == 1) {
            this.addre = this.placeadd[i]
          }
        }
      }
      if(!JSON.parse(sessionStorage.getItem("placeadd")) && this.goodsList.memberAddressList.length == 0) {
        this.adds = true
      }
      if (this.addre.length>0){
        alert('请先填写收货地址')
      } else {
        this.$axios({
          method: 'post',
          url: '/order/computeOrderFreight',
          responseType: 'json',
          data: {
            goodsList: this.goodsList.goodsJsonList,
            memberAddressId: this.addre.addrId,
            token: this.token
          }
        }).then(data => {
          for(let i = 0; i < data.data.res_data.freightList.length; i++) {
            this.goodsList.comList[i].shipAmount = data.data.res_data.freightList[i].shipAmount
            //					console.log(data.data.res_data.freightList[i].shipAmount)
            //					console.log(this.goodsList.comList)
            this.shipAmount += this.goodsList.comList[i].shipAmount
          }

        }).catch(err => {
          console.log(err)
        })
      }
    },
    watch: {
      orderId(orderId){
        sessionStorage.setItem("orderId",orderId)
      }
    },
    methods: {
      turn(){
        if(this.switchval){
          this.switchval=false;
        }else if(!this.switchval){
          this.switchval=true;
        }
      },

      selfadd() {
        //身份证验证
        //				let reg=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        let pattern = /^[1-9][0-9]/;
        var provs = {
          11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江 ",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北 ",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏 ",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门"};
        let add = this.selfnumber.slice(0, 2);
        if(pattern.test(add)) {
          if(provs[add]) {
            return true
          } else {
            alert('身份证格式不正确')
          }
        }
        return false
      },
      selfbirth(value) {
        let birth = this.selfnumber.slice(6, 18);
        let reg = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if(this.selfnumber.length == 18) {

          if(this.selfadd()) {

            if(reg.test(birth)) {

              var year = this.selfnumber.slice(6, 10);
              var month = this.selfnumber.slice(10, 12);
              var date = this.selfnumber.slice(12, 14);
              var date2 = new Date(year + "-" + month + "-" + date);
              if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
                return true;
              }
            }else{
              alert('身份证格式不正确')
            }
          }
        } else {
          alert('身份证位数不足')
          this.selfnumber=''

        }
        return false;
      },

      hideLayer: function() {
        this.layerShow = false;
      },
      showLayer: function() {
        this.layerShow = true;
        let cloudenumber=0;
        if(this.switchval){
          cloudenumber=1
        }else{
          cloudenumber=0
        }


        this.$axios({
          method: 'post',
          url: '/member/jifenyuetongji',
          responseType: 'json',
          data: {
            token: this.token
          }
        }).then(data => {
          this.money = data.data.res_data.member.advance
        }).catch(err => {
          console.log(err)
        })

        if(sessionStorage.getItem("orderId")) {
          this.orderId = sessionStorage.getItem("orderId")
          // localStorage.setItem("orderId", this.orderId);
        } else {
          // console.log(this.goodsList.cartIds.length);
          if(this.goodsList.cartIds != null || this.goodsList.cartIds != '') {
            if(this.bol == false) {
              this.$axios({
                method: 'post',
                url: "/order/createGoodsOrder",
                responseType: 'json',
                data: {
                  isCloudPoint:cloudenumber,
                  goodsList: this.goodsList.goodsJsonList,
                  memberAddressId: this.addre.addrId,
                  cartIds: this.goodsList.cartIds,
                  token: this.token
                }
              }).then(data => {
                console.log(data)
                if(data.status == 200) {
                  this.orderId = data.data.res_data.order.orderId
                  this.orderSn = data.data.res_data.order.orderSn
                  sessionStorage.orderSn = data.data.res_data.order.orderSn
                }
              }).catch(err => {
                console.log(err)
              })
            } else {
              if(this.selfnumber != "" && this.selfname != '') {
                this.$axios({
                  method: 'post',
                  url: "/order/createGoodsOrder",
                  responseType: 'json',
                  data: {
                    isCloudPoint:cloudenumber,
                    goodsList: this.goodsList.goodsJsonList,
                    memberAddressId: this.addre.addrId,
                    cartIds: this.goodsList.cartIds,
                    token: this.token,
                    memberCardId: this.selfnumber,
                    memberRealName: this.selfname,
                  }
                }).then(data => {
                  if(data.status == 200) {
                    this.orderId = data.data.res_data.order.orderId
                  }
                }).catch(err => {
                  console.log(err)
                })
              } else {
                alert('身份信息不能为空')
              }

            }

          } else {
            if(this.bol == false) {
              this.$axios({
                method: 'post',
                url: "/order/createGoodsOrder",
                responseType: 'json',
                data: {
                  goodsList: this.goodsList.goodsJsonList,
                  memberAddressId: this.addre.addrId,
                  token: this.token
                }
              }).then(data => {
                if(data.status == 200) {
                  this.orderId = data.data.res_data.order.orderId
                  // alert("创建订单成功")
                }
              }).catch(err => {
                console.log(err)
              })
            } else {
              if(this.selfnumber != "" && this.selfname != '') {
                this.$axios({
                  method: 'post',
                  url: "/order/createGoodsOrder",
                  responseType: 'json',
                  data: {
                    goodsList: this.goodsList.goodsJsonList,
                    memberAddressId: this.addre.addrId,
                    token: this.token,
                    memberCardId: this.selfnumber,
                    memberRealName: this.selfname,
                  }
                }).then(data => {
                  if(data.status == 200) {
                    this.orderId = data.data.res_data.order.orderId
                    console.log(this.orderId)
                  }
                }).catch(err => {
                  console.log(err)
                })
              } else {
                alert('身份信息不能为空')
              }

            }

          }
        }
      },

      changeadd() {
        this.$router.push('/shoppingCart/addSel')
      },
      //选择支付方式
      deposit() {
        this.showhiden = true
      },
      wepay() {
        this.checks = false;
        this.checks = !this.checks;

        if(this.checks) {
          // document.getElementsByClassName("check")[1].style.background = "red"
          document.getElementsByClassName("check")[0].style.background = "red"
          if(this.addre.addrId == null) {
            alert("地址不能为空")
            this.layerShow = false;
          } else {
            // 将订单信息存入本地
            sessionStorage.orderId = this.orderId
            localStorage.orderId = this.orderId
            console.log('--11wechat--');
            console.log(this.token);
            console.log(this.orderId);
            var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;

            this.orderSn = sessionStorage.getItem("orderSn")


            if(this.token) {
              this.$axios({
                method: 'post',
                url: 'pay/jyPay',
                responseType: 'json',
                data: {
                  token: this.token,
                  orderSn: this.orderSn,
                  payType: "03",
                  payWay: "01",
                  // 支付成功回调的链接
                  returnUrl:"http%3A%2F%2Fwx.juyooo.com%2F%23%2Forder%2Fdetail%3ForderId%3D"+this.orderId+"%26token%3D"+this.token
                }
              }).then(data => {
                // 将支付状态存入本地
                sessionStorage.paySuccess = false
                window.location.href = data.data.payInfo;

              }).catch(err => {
                console.log(err)
                sessionStorage.paySuccess = true
              })
            } else {
              alert(this.token)
            }

          }

        }

      },
      right() {
        //				确定密码
        console.log(this.orderId)
        this.checks = false;
        this.checks = !this.checks
        if(this.checks) {
          if(this.money > this.sum) {
            document.getElementsByClassName("check")[0].style.background = "red"
            document.getElementsByClassName("check")[1].style.background = "none"
            if(this.pass != '') {
              this.$axios({
                method: 'post',
                url: '/pay/orderPay',
                responseType: 'json',
                data: {
                  token: this.token,
                  orderId: this.orderId,
                  payType: 0,
                  reqType: 0,
                  payPwd: this.pass
                }
              }).then(data => {
                if(data.status == 200) {
                  sessionStorage.paySuccess = data.data.res_code
                  sessionStorage.orderId = this.orderId
                  this.$router.push({path:'/payState',query:{orderId:this.orderId}})
                  if(data.data.res_code == 0) {
                    sessionStorage.removeItem('cartIds')
                    sessionStorage.removeItem('productId')
                    sessionStorage.removeItem('placeadd')
                  } else if(data.data.res_code == 1) {
                    if(data.data.res_info == '请先设置支付密码...') {
                      let r = confirm(data.data.res_info)
                      if(r == true) {
                        this.$router.push({
                          path: '/midefier/boundRawPassword',
                          query: {
                            set: 0
                          }
                        })
                      }
                    } else {
                      alert(data.data.res_info)
                    }

                  }
                }
              }).catch(err => {
                console.log(err)
              })
            } else {
              alert('支付密碼不能爲空')
            }
            this.layerShow = false;
          } else {
            alert("余额不足")
            this.layerShow = false;
          }

        } else {
          document.getElementsByClassName("check")[0].style.background = "none"
        }
      },
      abolish() {
        this.showhiden = false
      }
    },

  }
</script>
<style lang="scss" scoped="scoped">
  .checks {
    float: right;
    color: #999;
    .check {
      margin-left: .3rem;
      vertical-align: middle;
      width: .5rem;
      height: .5rem;
      border: 1px solid #ccc;
      border-radius: 50%;
      outline: none;
    }
  }

  .lists {
    height: 2rem;
    margin-top: .4rem;
    ul {
      padding-top: .3rem;
      li {
        width: 3.6rem;
        height: 1.5rem;
        line-height: .7rem;
        border: 1px solid #CCC;
        float: left;
        margin-bottom: .3rem;
        text-align: center;
        p:nth-child(1) {
          font-size: .5rem;
        }
        p:nth-child(2) {
          font-size: .3rem;
        }
      }
      li:nth-child(2n-1) {
        margin-left: .3rem;
      }
      li:nth-child(odd) {
        margin-right: .2rem;
      }
    }
  }

  .clears {
    width: 8.125rem;
    height: 1.75rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    p{
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
      line-height: .85rem;
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
