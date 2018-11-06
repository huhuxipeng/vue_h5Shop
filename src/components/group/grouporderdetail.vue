<template>
	<div class="order-detail-page order-all-page">
		<commonTop header-title="订单详情" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="order-type boderBox">
			<section :class="orderClass" >
				<span>
					<p>{{formatStatus()}}</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>

		</div>
		<hr class="line" />
		<!--物流信息-->
		<!--<section class="wl-bar" @click="logistics">
        <h2>物流信息</h2>
        <p>【厦门市】快递已签收，感谢您的使用！</p>
        <i>2017-12-13 22:00:00</i>
        <u class="icons arrow-icon"></u>
    </section>-->
		<section class="user-info">
			<span class="icons car-icon"></span>
			<label>
				<h2>收货人：{{content.shipName}}</h2>
				<i>{{content.shipMobile}}</i>
				<p>{{content.shipProvinceName}}{{content.shipCityName}}{{content.shipDistrictName}}{{content.shipAddr}}</p>
			</label>
		</section>
		<div class="groups">
			<div class="store-info">
				<span class="grouplogo"><img src="../../common/image/group/group.png" /></span>
				<i>{{stores[content.spellStatus]}}</i>
				<!--<span class="icons arrow-icon"></span>-->
				<!--<u>{{stores[content.spellStatus]}}</u>-->
			</div>
			<ul>
				<li v-for="(item,index) in content.participateDetails">
					<i v-if="index==0">拼主</i><img :src="item.face |filterss(3)" :onerror="logo" /></li>
			</ul>
		</div>
    <section class="store" v-if="content.orderStatus == 0 || content.orderStatus == -7 ">
      <div class="store-info" style="background-color: rgb(245,245,245);color: rgb(153,153,165);padding-bottom: 0.2rem">
        <i>支付方式：</i>
      </div>
      <ul class="price-list">
        <li @click="xuanzewei" class="fu">
          <span class="zhifu"><img src="../../common/image/wx.jpg" alt="">微信支付(推荐)</span>
          <i class="rightFu"><img v-if="weixuanz" src="../../common/image/unselect.png" alt=""><img v-if="weixuanz1" src="../../common/image/select.png" alt=""></i>
        </li>
        <!--<li @click="xuanzezhi">-->
        <!--<span class="zhifu"><img src="../../common/image/zfb.jpg" alt="">支付宝</span>-->
        <!--<i class="rightFu"><img v-if="zhixuanz" src="../../common/image/rightFu.png" alt=""></i>-->
        <!--</li>-->
        <li @click="xuanzeyu" class="fu">
          <span class="zhifu"><img src="../../common/image/ye.jpg" alt="">余额支付</span>
          <i class="rightFu"><img v-if="yuxuanz" src="../../common/image/unselect.png" alt=""><img v-if="yuxuanz1" src="../../common/image/select.png" alt=""></i>
        </li>
        <!--<li @click="xuanzehong" class="fu">-->
        <!--<span class="zhifu"><img src="../../common/image/hjf.jpg" alt="">红积分支付</span>-->
        <!--<i class="rightFu"><img v-if="hongxuanz" src="../../common/image/unselect.png" alt=""><img v-if="hongxuanz1" src="../../common/image/select.png" alt=""></i>-->
        <!--</li>-->
      </ul>
      <div class="geceng1"></div>
    </section>
		<section class="goods-simple">
			<!---->
			<div class="store-info">
				<span class="icons store-icon"></span>
				<i>{{content.comName}}</i>
				<span class="icons arrow-icon"></span>
			</div>
			<ul class="goods-show">
				<li>
					<!--<router-link :to="{ path: '/order/detail'}">-->
					<img :src="content.image |filterss(3)" class="store-logo" :onerror="logo">
					<span>
						<h2>{{content.goodsName}}</h2>
						<!--<p>规格：{{content.}}</p>-->
					</span>
					<aside>
						<i>￥{{content.spellPrice}}</i>
						<i class="pri-line">￥{{content.goodsPrice}}</i>
						<i>×{{content.num}}</i>
					</aside>
					<!--</router-link>-->
				</li>
			</ul>
		</section>
		<ul class="price-list">
			<li>
				<span>商品金额</span>
				<i>￥{{content.orderAmount}}</i>
			</li>
      <!--<li @click="selectQuan" v-if="BOOL">-->
        <!--<span>店铺优惠</span>-->
        <!--<i style="color: red">￥-0.50  <span class="iii icons arrow-icon"></span></i>-->
        <!--&lt;!&ndash;<i>￥{{shipAmount}}</i>&ndash;&gt;-->
      <!--</li>-->
			<li>
				<span>运费</span>
				<i>￥{{content.shipAmount}}</i>
			</li>
		</ul>
		<ul class="price-list">
			<li>
				<span>应付总额</span>
				<i class="red-txt">￥{{content.payAmount || content.orderAmount+content.shipAmount}}</i>
			</li>
		</ul>

		<div class="order-info-list" >
			<p>订单号：{{content.orderSn}}</p>
			<p v-if="content.createDate" >下单时间：{{content.createDate | times}}</p>
			<p v-if="content.paymentDate" >付款时间：{{content.paymentDate | times}}</p>
			<p v-if="content.deliverDate" >发货时间：{{content.deliverDate | times}}</p>
		</div>

		<div class="footer">
			<div class="left"></div>
			<div class="right" v-if="content.orderStatus>1&&content.orderStatus<4">
				<span class="btn normal-btn red-btn btn-check" @click="applyfo" v-if="content.orderStatus==2">确认收货</span>
				<span class="btn normal-btn red-btn btn-check" @click="gologistics">查看物流</span>
			</div>

		</div>




    <div class="geceng"></div>

    <div class="total-pay boderBox" v-if="content.orderStatus == 0 || content.orderStatus == -7 ">
			<span>合计：
				<em>￥{{Number(content.orderAmount+content.shipAmount).toFixed(2)}}</em>
			</span>
      <aside v-on:click="Pay">立即支付</aside>
    </div>
    <!--<section class="bottom-layer" v-if="layerShow">-->
      <!--<div class="layer-content">-->
        <!--<ul>-->
          <!--<li class="title">选择付款方式-->
            <!--<i v-on:click="hideLayer">取消</i>-->
          <!--</li>-->
          <!--<li @click="deposit">预存款-->
            <!--&lt;!&ndash;<u class="icons"></u>&ndash;&gt;-->
            <!--<u class="checks">￥{{money}}<input type="checkbox" class="check" v-model="checks" /></u>-->
          <!--</li>-->
          <!--<li @click="wepay();return false">微信支付-->
            <!--<u class="checks"><input type="checkbox" class="check" v-model="checks" /></u>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div class="layer-bg"></div>-->
    <!--</section>-->

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
    <mt-popup popup-transition="popup-fade" position="bottom" v-model='youhuiquan' class='popup' closeOnClickModal>
      <div class="title_shop">
        <span>巨柚自营店</span>
        <span class="clear" @click="clearTan"><img src="../../common/image/qrcodeimg/close.png" alt=""></span>
      </div>
      <ul>
        <li v-for="(item,index) in quanList">
          <div  class="left"><p>¥100</p><p>满50可用</p></div>
          <div  class="center">
            <p><span class="kind">分类券</span><span>母婴券</span></p>
            <p>2018.09.01-2018.10.01</p>
          </div>
          <div class="right" @click="ling(index)"><p  :class="{active:(clickIndex == index )}"></p></div>
        </li>
      </ul>
    </mt-popup>
	</div>
</template>
<script>
import commonTop from "../../components/commonTop";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      index: 0,
      layerShow: false,
      addre: [],
      content: [],
      token: "",
      succe: false,
      youhuiquan:false,
      clickIndex:-1,
      weixuanz:false,
      yuxuanz:true,
      hongxuanz:true,
      // BOOL:false,
      weixuanz1:true,
      yuxuanz1:false,
      hongxuanz1:false,
      quanList:['1','2','3','4','5'],
      pay: false,
      checks: false,
      sending: false,
      sended: false,
      money: 0,
      taking: false,
      closed: false,
      rights: false,
      rightss: false,
      sum: 0,
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      orderId: 0,
      stores: ["未开始", "待拼团", "拼团成功", "拼团失败", "取消拼团"],
      //时间
      createTime: "",
      paymentTime: "",
      deliverTime: "",
      completeTime: "",
      placeOrder: [],
      bargainOrder: {},
      order: 0,
      pass: "",
      showhiden: false,
      token: "",
			orderClass:"",
      times: "",
      fangshi:1,
    };
  },

  components: {
    commonTop: commonTop
  },
  filters: {
    times(timess) {
      var data = new Date(timess);
      var Y = data.getFullYear() + "-";
      var M =
        (data.getMonth() + 1 < 10
          ? "0" + (data.getMonth() + 1)
          : data.getMonth() + 1) + "-";
      var D =
        (data.getDate()  < 10 ? "0" + data.getDate() : data.getDate()) + " ";
      var h =
        (data.getHours() < 10 ? "0" + data.getHours() : data.getHours()) +
        ":";
      var m =
        (data.getMinutes()  < 10
          ? "0" + data.getMinutes()
          : data.getMinutes()) + ":";
      var s =
        data.getSeconds()  < 10
          ? "0" + data.getSeconds()
          : data.getSeconds();

      return Y + M + D + h + m + s;
    }
  },
  mounted: function() {
    if (sessionStorage.getItem("token") == null) {
      this.login(this.$route.query.spellId);
    } else {
      this.shuju();
    }
  },
  methods: {
    jifen() {
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
    },
    abolish() {
      this.showhiden = false;
    },
    hideLayer: function() {
      this.layerShow = false;
    },
    //选择支付方式
    deposit() {
      this.showhiden = true;
    },
    selectQuan(){
      this.youhuiquan = true
    },
    ling(index){
      this.clickIndex = index
      this.youhuiquan = false
    },
    xuanzewei(){
      this.fangshi = 1
      this.weixuanz=false
      this.yuxuanz=true
      this.hongxuanz=true

      this.weixuanz1=true
      this.yuxuanz1=false
      this.hongxuanz1=false

    },
    xuanzeyu(){
      this.fangshi = 2
      this.weixuanz=true
      this.yuxuanz=false
      this.hongxuanz=true

      this.weixuanz1=false
      this.yuxuanz1=true
      this.hongxuanz1=false
    },
    // xuanzehong(){
    //   this.weixuanz=true
    //   this.yuxuanz=true
    //   this.hongxuanz=false
    //
    //   this.weixuanz1=false
    //   this.yuxuanz1=false
    //   this.hongxuanz1=true
    // },
    clearTan(){
      this.youhuiquan = false
    },
    right() {
      //				确定密码
      // this.checks = true;
      // this.showhiden=false;
      // if (this.checks) {
      console.log(this.money + "###"+this.sum)
        if (this.money > this.sum) {
          // document.getElementsByClassName("check")[0].style.background = "red";
          // document.getElementsByClassName("check")[1].style.background = "none";
          this.bargainOrder = JSON.parse(sessionStorage.getItem('bargainOrder'));
          // alert(this.bargainOrder.orderId)
          if (this.pass != "") {
            this.$axios({
              method: "post",
              url: "/pay/spellOrderPay",
              responseType: "json",
              data: {
                token: this.token,
                orderId: this.bargainOrder.orderId,
                payType: 0,
                reqType: 0,
                payPwd: this.pass
              }
            })
              .then(data => {
                if (data.status == 200) {
                  if (data.data.res_code == 0) {
                    this.$router.push({
                      path: "/group/grouptime",
                      query: {
                        activityId: this.$route.query.activityId,
                        spellId: this.bargainOrder.spellId
                      }
                    });
                    // this.$router.push({
                    // 	path: 'group/mygroup'
                    // })
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
                      // this.showhiden = false;
                      this.$router.push({path:'/group/grouporderdetail',query:{'spellId': this.bargainOrder.spellId,'activityId': this.$route.query.activityId}});
                    }
                  }else{
                    alert(data.data.res_info);
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
        } else {
          alert("余额不足，请使用其他方式付款");
          this.layerShow = false;
        }
      // } else {
      //   document.getElementsByClassName("check")[0].style.background = "none";
      // }
    },
    formatStatus() {
			let arr = ["success","refund","refunds","paying","sending" ,"sended","closed"]
      switch (this.content.orderStatus) {
				case 0:
				this.orderClass = arr[0]
          return "待支付";
          break;
				case 3:
				this.orderClass = arr[0]
          return "已完成";
          break;
				case 2:
				this.orderClass = arr[5]
          return "已发货";
          break;
				case 1:
				this.orderClass = arr[3]
          return "已支付";
          break;
				case 4:
				this.orderClass = arr[0]
          return "待开奖";
          break;
				case 5:
				this.orderClass = arr[0]
        if(this.content.spellType){
          return "中奖,待发货";
        }else{
          return "待发货";
        }
          break;
				case -9:
				this.orderClass = arr[1]
          return "已取消";
          break;
				case -8:
				this.orderClass = arr[2]
          return "已退款";
          break;
				case -7:
				this.orderClass = arr[6]
          return "待支付";
          break;
				case -6:
				this.orderClass = arr[0]
          return "未中奖";
          break;
      }
    },
    // wepay() {
    //   this.checks = false;
    //   this.checks = !this.checks;
    //
    //   if (this.checks) {
    //     document.getElementsByClassName("check")[1].style.background = "red";
    //     document.getElementsByClassName("check")[0].style.background = "none";
    //     // if (this.addre.addrId == null) {
    //     //   alert("地址不能为空");
    //     //   this.layerShow = false;
    //     // } else
    //     //   {
    //       //						sessionStorage.orderId = this.$route.query.orderid
    //       //						localStorage.orderId = this.$route.query.orderid
    //       // console.log("--11wechat--");
    //       // console.log(this.token);
    //       // console.log(this.orderId);
    //     this.bargainOrder = JSON.parse(sessionStorage.getItem('bargainOrder'));
    //       var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;
    //       if (this.token) {
    //         this.$axios({
    //           method: "post",
    //           url: "/pay/spellOrderPay",
    //           responseType: "json",
    //           data: {
    //             token: this.token,
    //             orderId: this.bargainOrder.orderId,
    //             payType: 1,
    //             reqType: 0
    //           }
    //         })
    //           .then(data => {
    //             sessionStorage.paySuccess = data.data.res_code;
    //             console.log(data.data.res_data);
    //
    //             if (data.data.res_code == 0) {
    //               var datas = data.data.res_data;
    //               appId = datas.appid;
    //               nonceStr = datas.noncestr;
    //               paySign = datas.sign;
    //               packages = datas.package;
    //               timeStamp = datas.timestamp;
    //               signType = "MD5";
    //               callpay();
    //               //									alert("appId" + ":" + appId + "paySign:" + paySign + "timeStamp:" + timeStamp + "nonceStr:" + nonceStr + "nonceStr:" + nonceStr + "package:" + packages + "signType:" + signType)
    //               let that = this;
    //
    //               function onBridgeReady() {
    //                 WeixinJSBridge.invoke(
    //                   "getBrandWCPayRequest",
    //                   {
    //                     appId: appId, //公众号名称，由商户传入
    //                     paySign: paySign, //微信签名
    //                     timeStamp: timeStamp, //时间戳，自1970年以来的秒数
    //                     nonceStr: nonceStr, //随机串
    //                     package: packages, //预支付交易会话标识
    //                     signType: signType //微信签名方式
    //                   },
    //                   function(res) {
    //                     console.log("res.err_msg是"+res.err_msg)
    //                     console.log("--微信支付进入，带上的orderId--");
    //                     console.log(that.orderId);
    //                     console.log(that.$route.query.activityId+"+"+that.bargainOrder.spellId)
    //                     if (res.err_msg == "get_brand_wcpay_request:ok") {
    //                       that.$router.push("/group/mygroup");
    //                       												alert('支付成功');
    //
    //                      //  this.$router.push({
    //                      //    path: "/group/grouptime",
    //                      //    query: {
    //                      //      activityId: that.$route.query.activityId,
    //                      //      spellId: that.bargainOrder.spellId
    //                      //    }
    //                      // })
    //                     } else if (
    //                       res.err_msg == "get_brand_wcpay_request:cancel"
    //                     ) {
    //                       alert("支付取消");
    //                     } else if (
    //                       res.err_msg == "get_brand_wcpay_request:fail"
    //                     ) {
    //                       // alert('支付失败');
    //                       //												alert(res.err_msg)
    //                     } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    //                   }
    //                 );
    //               }
    //
    //               function callpay() {
    //                 if (typeof WeixinJSBridge == "undefined") {
    //                   if (document.addEventListener) {
    //                     document.addEventListener(
    //                       "WeixinJSBridgeReady",
    //                       onBridgeReady,
    //                       false
    //                     );
    //                   } else if (document.attachEvent) {
    //                     document.attachEvent(
    //                       "WeixinJSBridgeReady",
    //                       onBridgeReady
    //                     );
    //                     document.attachEvent(
    //                       "onWeixinJSBridgeReady",
    //                       onBridgeReady
    //                     );
    //                   }
    //                 } else {
    //                   onBridgeReady();
    //                 }
    //               }
    //             } else {
    //               alert("统一下单失败");
    //             }
    //           })
    //           .catch(err => {
    //             console.log(err);
    //           });
    //       } else {
    //         alert(this.token);
    //       }
    //     // }
    //   }
    // },
    Pay: function() {
      this.jifen();
        if (sessionStorage.getItem("spellId")) {
          this.$axios({
            method: "post",
            url: "/spell/participateSpell",
            responseType: "json",
            data: {
              memberAddressId: this.addre.addrId,
              productId: JSON.parse(this.$route.query.productId),
              spellId: JSON.parse(sessionStorage.getItem("spellId")),
              remark: this.texts,
              token: this.token
            }
          })
            .then(data => {
              if (data.data.res_code == 0) {
                this.bargainOrder = data.data.res_data;
                // this.layerShow = true;

                if(this.fangshi == 1){
                  // if (this.addre.addrId == null) {
                  //   MessageBox("地址不能为空");
                  //   this.layerShow = false;
                  // }
                  // else {
                    sessionStorage.orderId = this.bargainOrder.orderId;
                    var openId = sessionStorage.getItem("openId");

                    let url = "/pay/spellOrderPay";

                    if (sessionStorage.getItem("token")) {
                      this.$axios({
                        method: "post",
                        url: url,
                        responseType: "json",
                        data: {
                          token: this.token,
                          orderId: this.orderId,
                          reqType: 0,
                          payType: 4,
                        }
                      })
                        .then(data => {
                          sessionStorage.setItem('isPay', true);
                          if(JSON.parse(data.data.res_data.payInfo).payInfo){
                            window.location.href = JSON.parse(data.data.res_data.payInfo).payInfo;
                          }
                          else{
                            alert("支付信息返回有误"+data.data.res_data.payInfo)
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                    else {
                      alert(this.token);
                    }
                  // }
                }
                else if(this.fangshi == 2){
                  this.showhiden = true;
                }



              } else {
                alert(data.data.res_info);
                this.$router.go(-1);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        //如果是开团
        else {
          this.bargainOrder = JSON.parse(sessionStorage.getItem('groupInfo'))
          let orderId = this.bargainOrder.orderId

          if(this.fangshi == 1){
            var openId = sessionStorage.getItem("openId");
            let url = "/pay/spellOrderPay";
            if (sessionStorage.getItem("token")) {
              this.$axios({
                method: "post",
                url: url,
                responseType: "json",
                data: {
                  token: this.token,
                  orderId: orderId,
                  reqType: 0,
                  payType: 4
                }
              })
                .then(data => {
                  sessionStorage.setItem('isPay', true);
                  if(JSON.parse(data.data.res_data.payInfo).payInfo){
                    window.location.href = JSON.parse(data.data.res_data.payInfo).payInfo;
                  }
                  else{
                    alert("支付信息返回有误"+data.data.res_data.payInfo)
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
            else {
              alert(this.token);
            }
            // }
          }
          else if(this.fangshi == 2){
            this.showhiden = true;
          }
        }
    },
    shuju() {
      this.token = sessionStorage.getItem("token");
      this.$axios({
        method: "get",
        url: "/spell/getOrderDetailByOrderId?"+"token="+this.token+"&orderId="+this.$route.query.orderId,
        responseType: "json"
      })
        .then(data => {
          if (data.data.res_code == 0) {
            this.content = data.data.res_data;
          } else {
            alert(data.data.res_info);1
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    login(val) {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);

      let token = sessionStorage.getItem("token");

      if (token == null) {
        // if(sessionStorage.numberss=='3'){
        //   sessionStorage.removeItem('numberss');
        //   location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect'group/grouporderdetail
        // }
        if (r == null) {
          location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2fgroup%2fgrouporderdetail%3fspellId%3D" +
            val +"%26activityId%3D"+this.$route.query.activityId+"%26orderId%3D"+this.$route.query.orderId+
            "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
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
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(
                  data.data.res_data.member
                );
                sessionStorage.token = data.data.res_data.token;
              }
              this.shuju();
              // if(data.data.res_data.returnCode==0){
              //   this.binding=true;
              // }
            })
            .catch(err => {
              console.log(err);
            });

          // this.$axios({
          //   method: 'post',
          //   url: '/basics/wxLogin',
          //   responseType: 'json',
          //   data: {
          //     code: r[2],
          //     reqType: 0
          //   },
          // }).then(data => {
          //   sessionStorage.identityId = data.data.res_data.member.identityId;
          //   sessionStorage.token = data.data.res_data.token;
          //   sessionStorage.details = JSON.stringify(data.data.res_data.member);
          //   // alert(data.data.res_data.member.mobile)
          //   // if(data.data.res_data.member.mobile==''||data.data.res_data.member.mobile==null){
          //   //   this.binding=true;
          //   // }
          //   sessionStorage.subscribe =data.data.res_data.member.subscribe
          //   if(data.data.res_data.member.subscribe!=1){
          //     sessionStorage.clear();
          //     localStorage.clear();
          //     sessionStorage.numberss=3
          //     this.code=true
          //   }
          //   this.$router.push('/')
          // }).catch(err => {
          //   console.log(err)
          // })
        }
      }
    },

    //倒计时
    settime(timestamp) {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day}天${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour <= 0) {
            format = `${min}分${sec}秒`;
          }
          self.times = format;
        } else {
          clearInterval(timer);
          self.times = self.endText;
          self._callback();
        }
      }, 1000);
    },
    _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    },

    // gooddetail(val) {
    // 	sessionStorage.ORDERID = 1;
    // 	this.$router.push('/goods/detail?goodsId=' + val.goodsId)
    // },
    // logistics() {
    // 	this.$router.push('/logistics')
    // 	sessionStorage.goodsImage = JSON.stringify(this.content[0].orderItemsList[0].goodsImage)
    // },
    applyfo() {
      this.$axios({
        method: "post",
        url: "/spell/spellOrderRog",
        responseType: "json",
        data: {
          token: this.token,
          orderId: this.content.orderId
        }
      })
        .then(data => {
          // if(data.status == 200) {
          if ((data.data.res_code = 0)) {
            Toast("收货成功");
            this.$router.push({
              path: "/group/mygroup"
            });
          } else {
            alert(data.data.res_info);
          }

          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gologistics() {
      console.log(222);
      sessionStorage.GROUPS = "GROUPS";
      sessionStorage.orderId = this.content.orderId;
      sessionStorage.goodsImage = this.content.image;
      this.$router.push("/logistics");
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
  .active{
    /*color: #a4a4a4 !important;*/
    /*border: none !important;*/
    background: url("../../common/image/select.png") 0 0 no-repeat !important;
    background-size: 100% 100% !important;
  }
  .total-pay{
    bottom: 0;
  }
  .iii{
    width: 0.13rem;
    height: 0.29rem;
    background-position: -1.81rem -0.88rem;
  }
  .geceng{
    position: relative;
    width: 100%;
    height: 50px;
  }
  .geceng1{
    position: relative;
    width: 100%;
    height: 15px;
    background-color: rgb(245,245,245);
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
    .title_shop{
      padding: 8px;
      padding-top: 0;
      text-align: center;
      font-size: .4rem;
      color: black;
      border-bottom: rgb(245,245,245) 1px solid;
      span{
        line-height: .55rem;
      }
      .clear{
        display: inline-block;
        float: right;
        img{
          width: .55rem;
          height: .55rem;
          vertical-align: middle;
        }
      }
    }

    ul{
      width: 100%;
      height: 370px;
      overflow-y: scroll;
      li{
        list-style: none;
        height: 85px;
        border-bottom: rgb(245,245,245) 1px solid;
        margin: 5px;
        box-shadow:  0  2px 5px  rgb(245,245,245);
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div{
          height: 100%;
        }
        .left{
          width: 25%;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("../../common/image/mycoupon/bg0.png") 0 0 no-repeat;
          background-size: 100% 100%;
          p:nth-child(1){
            font-size: .43rem;
          }
          p:nth-child(2){
            font-size: .32rem;
          }
          /*span{*/
          /*display: inline-block;*/
          /*}*/
          /*span:nth-child(1){*/
          /*font-size: .5rem;*/
          /*}*/
          /*span:nth-child(2){*/
          /*font-size: .7rem;*/
          /*}*/
        }
        .center{
          /*height: 100%;*/
          display: flex;
          /*padding: 5px;*/
          flex-direction: column;
          justify-content: space-between;
          /*align-items: left;*/
          width: 55%;
          font-size: .2rem;
          p{
            text-align: left;
          }
          p:nth-child(1){
            padding-top: 5px;
            span:nth-child(1){
              background-color: rgb(89,204,148);
              display: inline-block;
              /*width: ;*/
              color: #fff;
              padding: 5px;
              font-size: .266667rem;
              border-radius: 8px;
              margin-right: 5px;
            }
            span:nth-child(2){
              font-size: .32rem;
              font-weight: bold;
              color: black;
            }
          }
          p:nth-child(2){
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
        .right{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 10%;
          p{
            width: .53rem;
            height: .53rem;
            background: url("../../common/image/unselect.png") 0 0 no-repeat;
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
  .store{
    .price-list {
      border-bottom: 0;
      li {
        span{
          //img{
          //            //  width: .45rem;
          //            //  height: .45rem;
          //            //}
          //span{
          //  line-height: .rem;
          //  font-size: .37333rem;
          //}
        }
        .rightFu{
          img{
            width: .53rem;
            height: .53rem;
            vertical-align: top;
            //margin-bottom: 5px;
          }
        }
        .zhifu{
          img{
            width: .8rem;
            height: .8rem;
            vertical-align: middle;
            padding-right: 8px;
          }
          font-size: .4rem;;
        }
        &.input-bar {
          padding: 0 0.32rem;
          .input {
            background: none;
            width: 7.35rem;
            display: inline-block;
            height: 1.02rem;
          }
        }
        u {
          display: block;
          text-align: right;
          em {
            color: red;
          }
        }
      }
      .fu{
        padding: .2rem;
      }
      .deduction{
        .span{
          display: inline-block;
          width: 49%;
        }
        .deductions{
          display: inline-block;
          text-align: right;
        }
      }
    }


    .goods-info{
      span{
        h2,p{
          width: 5rem;
        }
        i{
          height:2rem;
          float: right;
          margin-top: -1.5rem;
          font-size:.5rem;
          u{
            font-size: .3rem;
            display: inline-block;
            margin-top: 1rem;
          }
        }
      }
    }
  }
  .groups {
  padding: 0.2rem;
  height: 2.5rem;
  margin-bottom: 0.1rem;
  ul {
    display: flex;
    justify-content: flex-start;
    li {
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
      i {
        display: inline-block;
        background: orangered;
        color: white;
        text-align: center;
        border-radius: 0.1rem;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.grouplogo {
  display: inline-block;
  width: 0.5rem;
  height: 0.4rem;
  margin-right: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.footer {
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  display: flex !important;
  justify-content: space-between;
  .left {
    i:last-child {
      display: inline-block;
      color: red;
      margin-left: 0.2rem;
    }
  }
}
.store-info {
  background: none;
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
