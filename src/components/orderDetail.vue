<template>
	<div class="order-detail-page order-all-page">
		<commonTop header-title="订单详情" v-if="wxIn" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="order-type boderBox">
			<section class="success" v-if="succe">
				<span>
					<p>交易完成</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="refund" v-if="rights">
				<span>
					<p>维权中</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="refunds" v-if="rightss">
				<span>
					<p>维权成功</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="paying" v-if="pay">
				<span>
					<p>待付款<br />{{times}}&nbsp;&nbsp;订单自动关闭</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="sending" v-if="sending">
				<span>
					<p>待发货</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="sended" v-if="sended">
				<span>
					<p>已发货<br />{{times}}&nbsp;&nbsp;自动确认收货</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="closed" v-if="closed">
				<span>
					<p>交易关闭</p>
				</span>
				<label>
					<i>
						<u class="icons"></u>
					</i>
				</label>
			</section>
			<section class="taking" v-if="taking">
				<span>
					<p>交易完成<br />{{addre.orderStatusName}}</p>
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
				<h2>收货人：{{addre.shipName}}</h2>
				<i>{{addre.shipMobile}}</i>
				<p>{{addre.shipAddress}}</p>
			</label>
		</section>
		<section class="goods-simple" v-for="(item,index) in content">
			<!---->
			<div class="store-info">
				<span class="icons store-icon"></span>
				<i>{{item.comName}}</i>
				<span class="icons arrow-icon"></span>
			</div>
			<ul class="goods-show">
				<li v-for="(value,keys) in item.orderItemsList"  @click="gooddetail(value)">
					<!-- <router-link :to="{ path: '/order/detail'}"> -->
						<img :src="value.goodsImage|filterss(3)" class="store-logo" :onerror="logo">
						<span>
							<h2 v-if="isGoldChanger">{{addre.exchangeName}}</h2>
							<h2 v-else>{{value.goodsName}}</h2>
							<p>规格：{{value.productSpec||value.specs}}</p>
						</span>
						<aside v-if="!isGoldChanger">
							<i>￥{{value.price||value.flashsalePrice}}</i>
							<i class="pri-line">￥{{value.goodsPrice}}</i>
							<i>×{{value.buyCount}}</i>
						</aside>
						<aside v-if="isGoldChanger">
							<i>{{addre.exchangeCoin}}金币</i>
							<i>×{{addre.changeProductNum}}</i>
						</aside>
					<!-- </router-link> -->
				</li>
			</ul>
		</section>
		<ul class="price-list">
			<li>
				<span>商品金额</span>
				<i v-if="addre.goodsAmount">￥{{addre.goodsAmount}}</i>
				<i v-if="addre.exchangeCoin">{{addre.exchangeCoin}}金币</i>
			</li>
			<li>
				<span>运费</span>
				<i>￥{{addre.shipAmount}}</i>
			</li>
			<li v-if="addre.cloudPoint">
				<span>云积分</span>
				<i>-￥{{addre.cloudPoint}}</i>
			</li>
			<li v-if="addre.discount">
				<span>优惠总额</span>
				<i>￥{{addre.discount}}</i>
			</li>
		</ul>
		<ul class="price-list">
			<li>
        <span v-if='addre.paymentType == "redPointPay"' style="color: orangered">红积分抵扣</span>
				<span v-else>应付总额</span>
				<i v-if='addre.orderAmount && (addre.paymentType == "redPointPay")' style="color: orangered">￥{{addre.orderAmount}}</i>
        <i v-else="addre.orderAmount">￥{{addre.orderAmount}}</i>
				<i v-if="addre.realPaymen">{{addre.realPaymen}}金币</i>
			</li>
		</ul>
		<!--待付款-->
		<div class="order-info-list" v-if="pay">
			<p>订单号：{{addre.orderSn}}</p>
			<p>下单时间：{{createTime}}</p>
			<p v-if="!pay">付款时间：{{paymentTime}}</p>
			<p v-if="!pay">发货时间：{{deliverTime}}</p>
			<p v-if="!pay">成交时间：{{paymentTime}}</p>
		</div>
		<!--代发货-->
		<div class="order-info-list" v-if="sending">
			<p>订单号：{{addre.orderSn}}</p>
			<p>下单时间：{{createTime}}</p>
			<p>付款时间：{{paymentTime}}</p>
		</div>
		<!--已发货-->
		<div class="order-info-list" v-if="sended">
			<p>订单号：{{addre.orderSn}}</p>
			<p>下单时间：{{createTime}}</p>
			<p>付款时间：{{paymentTime}}</p>
			<p>发货时间：{{deliverTime}}</p>
		</div>
		<!--待评价-->
		<div class="order-info-list" v-if="taking">
			<p>订单号：{{addre.orderSn}}</p>
			<p>下单时间：{{createTime}}</p>
			<p>付款时间：{{paymentTime}}</p>
			<p>发货时间：{{deliverTime}}</p>
			<p>成交时间：{{completeTime}}</p>
		</div>
		<section class="footer-action" v-if="pay">
			<span class="btn normal-btn red-btn btn-check" @click="cancel">取消订单</span>
			<span class="btn normal-btn red-btn btn-doing" @click.prevent="pays">立即支付</span>
		</section>
		<section class="footer-action" v-if="closed">
      <span class="btn normal-btn red-btn btn-doing">删除订单</span>
    </section>-
		<section class="footer-action" v-if="sending">
			<span class="btn normal-btn red-btn btn-doing" @click="applyfo">申请维权</span>
		</section>
	</div>
</template>
<script>
import commonTop from "../components/commonTop";
export default {
  data() {
    return {
      index: 0,
      addre: [],
      content: [],
      token: "",
      succe: false,
      pay: false,
      sending: false,
      sended: false,
      taking: false,
      closed: false,
      rights: false,
      rightss: false,
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      orderId: 0,
      //时间
      createTime: "",
      paymentTime: "",
      deliverTime: "",
      completeTime: "",
      placeOrder: [],
      order: 0,
      token: "",
      times: "",
      isGoldChanger: false,
      isFlashSaleOrder: false,
      wxIn: false
    };
  },

  components: {
    commonTop: commonTop
  },
  mounted: function() {
    var agent = navigator.userAgent.toLowerCase();
    this.isGoldChanger = this.$route.query.isGoldChanger;
    this.isFlashSaleOrder = this.$route.query.isFlashSaleOrder;
    if (
      agent.match(/MicroMessenger/i) == "micromessenger" ||
      this.isGoldChanger||this.isFlashSaleOrder
    ) {
      this.wxIn = true;
    } else {
      this.wxIn = false;
    }
    // if(sessionStorage.getItem("orderId")==''||sessionStorage.getItem("orderId")==null||sessionStorage.getItem("orderId")==undefined){
    //   this.orderId=JSON.parse(localStorage.getItem("orderId"))
    // }
    // else{
    //   this.orderId=JSON.parse(sessionStorage.getItem("orderId"))
    // }
    localStorage.orderId = sessionStorage.getItem("orderId");
    if (
      this.$route.query.orderId == "" ||
      this.$route.query.orderId == null ||
      this.$route.query.orderId == undefined
    ) {
      //this.orderId=JSON.parse(localStorage.getItem("orderId"))
      if (
        sessionStorage.getItem("orderId") == "" ||
        sessionStorage.getItem("orderId") == null ||
        sessionStorage.getItem("orderId") == undefined
      ) {
        this.orderId = JSON.parse(localStorage.getItem("orderId"));
      } else {
        this.orderId = JSON.parse(sessionStorage.getItem("orderId"));
      }
    } else {
      this.orderId = this.$route.query.orderId;
      localStorage.orderId = this.orderId;
      sessionStorage.orderId = this.orderId;
    }
    this.token = sessionStorage.getItem("token");

    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    }

    let urls = "";
    if (sessionStorage.getItem("managerDetail")) {
      urls = "order/giftOrderDetails";
    } else {
      urls = "order/orderDetails";
    }
    // alert(this.token+'      '+this.orderId);
    if (this.isGoldChanger){
      urls = "order/coinExchangeOrderDetails";
    }
    if (this.isFlashSaleOrder){
      urls = "flashsale/orderDetails";
    }
    // alert("token是"+this.token);

    this.$axios({
      method: "post",
      url: urls,
      responseType: "json",
      data: {
        token: this.token,
        orderId: this.orderId,
        id:this.$route.query.goldChangerId
      }
    })
      .then(data => {
        ///order/detail?orderId=72&isGoldChanger=1
        let state = "";
        if (this.$route.query.isGoldChanger) {
          this.order = data.data.res_data.coinExchangeOrder.orderId;
          state = data.data.res_data.coinExchangeOrder.orderStatus;
          this.addre = data.data.res_data.coinExchangeOrder;
        } else {
          this.order = data.data.res_data.order.orderId;
          state = data.data.res_data.order.orderStatus;
          this.addre = data.data.res_data.order;
        }

        //					this.content=data.data.res_data.orderItemsList
        this.content.push(data.data.res_data);
		console.log(JSON.parse(JSON.stringify(this.content)));
        this.placeOrder = data.data.res_data;
        var tiems = function(data) {
          data = new Date(data);
          var Y = data.getFullYear() + "-";
          var M =
            (data.getMonth() + 1 < 10
              ? "0" + (data.getMonth() + 1)
              : data.getMonth() + 1) + "-";
          var D =
            (data.getDate() + 1 < 10 ? "0" + data.getDate() : data.getDate()) +
            " ";
          var h =
            (data.getHours() + 1 < 10
              ? "0" + data.getHours()
              : data.getHours()) + ":";
          var m =
            (data.getMinutes() + 1 < 10
              ? "0" + data.getMinutes()
              : data.getMinutes()) + ":";
          var s =
            data.getSeconds() + 1 < 10
              ? "0" + data.getSeconds()
              : data.getSeconds();

          return Y + M + D + h + m + s;
        };
        this.createTime = tiems(this.addre.createTime || this.addre.createDate);
        this.paymentTime = tiems(
          this.addre.paymentTime || this.addre.paymentDate
        );
        this.deliverTime = tiems(this.addre.deliverTime||this.addre.deliverDate);
        this.completeTime = tiems(this.addre.signingTime||this.addre.deliverDate);
        switch (state) {
          case 0:
            this.succe = false;
            this.pay = true;
            this.sending = false;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            this.settime(
              new Date().getTime() / 1000 + this.content[0].autoCloseSeconds
            );
            break;
          case 3:
            this.rights = false;
            this.succe = false;
            this.pay = false;
            this.sending = true;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rightss = false;
            break;
          case 2:
            this.succe = false;
            this.pay = false;
            this.sending = true;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            break;
          case 1:
            this.succe = false;
            this.pay = false;
            this.sending = true;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            break;
          case 6:
            this.succe = false;
            this.pay = false;
            this.sending = false;
            this.sended = false;
            this.taking = true;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            break;
          case 7:
            this.succe = false;
            this.pay = false;
            this.sending = false;
            this.sended = false;
            this.taking = true;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            break;
          case 5:
            this.succe = false;
            this.pay = false;
            this.sending = false;
            this.sended = true;
            this.taking = false;
            this.closed = false;
            this.rights = false;
            this.rightss = false;
            this.settime(
              new Date().getTime() / 1000 + this.content[0].autoConfirmSeconds
            );
            break;
          case -1:
          case -2:
          case -3:
            this.succe = false;
            this.pay = false;
            this.sending = false;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rights = true;
            this.rightss = false;
            break;
             case -8:
            this.succe = false;
            this.pay = false;
            this.sending = false;
            this.sended = false;
            this.taking = false;
            this.closed = false;
            this.rights = false;
            this.rightss = true;
            break;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
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

    gooddetail(val) {
      var agent = navigator.userAgent.toLowerCase();
      if (agent.match(/MicroMessenger/i) == "micromessenger") {
        sessionStorage.ORDERID = 1;
        this.$router.push("/goods/detail?goodsId=" + val.goodsId);
      }

    },

    cancel() {
      //				let urls = '';
      //				if(sessionStorage.getItem('managerDetail')) {
      //					urls = '/order/delGiftOrder'
      //				} else {
      //					urls = '/order/orderCancel'
      //				}
      //
      //				this.$axios({
      //					method: 'post',
      //					url: '/order/orderCancel',
      //					responseType: 'json',
      //					data: {
      //						token: this.token,
      //						orderId: this.order
      //					}
      //				}).then(data => {
      //					if(data.status == 200) {
      //						this.$router.go(-1)
      //						sessionStorage.shop = 0
      //						sessionStorage.removeItem("orderId")
      //						localStorage.removeItem("orderId")
      //					}
      //				}).catch(err => {
      //					console.log(err)
      //				})
    },
    pays() {
      //		 	var arr=[{cartId:this.content[0].cartId,productId:this.content[0].productId,buyCount:this.content[0].buyCount}];
      //		 	this.$axios({
      //						method:'post',
      //						url:'/order/orderCheckout',
      //						responseType: 'json',
      //						data:{
      //							token:this.token,
      //							goodsData:JSON.stringify(arr)
      //						}
      //					}).then(data=>{
      //						if(data.status==200){
      //							sessionStorage.goodsList=JSON.stringify(data.data.res_data)
      this.$router.push("/shoppingCart/balance");
      //						}
      //					}).catch(err=>{
      //						console.log(err)
      //					})
    },
    logistics() {
      this.$router.push("/logistics");
      sessionStorage.goodsImage = JSON.stringify(
        this.content[0].orderItemsList[0].goodsImage
      );
    },
    applyfo() {
      if (sessionStorage.getItem("managerDetail")) {
        urls = "/order/giftOrderMaintain";
      } else {
        urls = "/order/orderMaintain";
      }
      this.$axios({
        method: "post",
        url: urls,
        responseType: "json",
        data: {
          token: this.token,
          orderId: this.content[0].orderId
        }
      })
        .then(data => {
          if (data.status == 200) {
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
