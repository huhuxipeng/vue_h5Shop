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
		<section class="store">
			<!--<div class="store-info">
				<span class="icons store-icon"></span>
				<i>{{placeval.comName}}</i>
			</div>-->
			<ul class="goods-show">
				<li>
					<div class="goods-info">
						<img :src="placeval.image |filterss(3)" class="store-logo" :onerror="logo">
						<span>
	              			<h2>{{placeval.name}}</h2>
	              			<p>{{placeval.specs}}</p>
	              			<!-- <p><em v-for="child in selSpecObj">{{child.specName}}：{{child.specValue}}</em></p> -->
	              			<i>￥{{Number(bargainOrder.orderAmount).toFixed(2)}}</i>
            			</span>
					</div>
				</li>
			</ul>
			<ul class="price-list">
        <!--<li @click="selectQuan" v-if=" BOOL">-->
          <!--<span>店铺优惠</span>-->
          <!--<i style="color: red">￥-20.00  <span class="iii icons arrow-icon"></span></i>-->
          <!--&lt;!&ndash;<i>￥{{shipAmount}}</i>&ndash;&gt;-->
        <!--</li>-->
				<li>
					<span>邮费</span>
					<i>￥{{bargainOrder.shipAmount||0}}</i>
					<!--<i>￥{{shipAmount}}</i>-->
				</li>
        <li>
          <span>共{{(placeval.buyCount)}}件商品</span>
          <i style="color: red">小计￥{{Number(bargainOrder.orderAmount).toFixed(2)}}</i>
          <!--<u>共{{(placeval.buyCount)}}件商品，小计<em>￥{{Number(bargainOrder.orderAmount).toFixed(2)}}</em></u>-->
        </li>
			</ul>
		</section>
		<!--<div class="total-pay-top"></div>-->

    <section class="store" >
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
      </ul>
      <div class="geceng1"></div>
    </section>

    <!--<div class="geceng" v-if=" BOOL"></div>-->

		<div class="total-pay boderBox">
			<span>合计：<em>￥{{Number(bargainOrder.orderAmount+bargainOrder.shipAmount).toFixed(2)}}</em></span>
			<aside v-on:click="showLayer">立即支付</aside>
		</div>
		<!--<section class="bottom-layer" v-if="layerShow">-->
			<!--<div class="layer-content">-->
				<!--<ul>-->
					<!--<li class="title">选择付款方式<i v-on:click="hideLayer">取消</i></li>-->
					<!--<li @click="deposit">预存款-->
						<!--&lt;!&ndash;<u class="icons"></u>&ndash;&gt;-->
						<!--<u class="checks">￥{{money}}<input type="checkbox" class="check" v-model="checks"/></u>-->
					<!--</li>-->
					<!--<li @click="wepay();return false">微信支付-->
						<!--<u class="checks"><input type="checkbox" class="check" v-model="checks"/></u>-->
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
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				layerShow: false,
				addre: [],
        clickIndex:-1,
        quanList:['1','2','3','4','5'],
        money: 0,
				goodsList: [],
				placeval: {},
				sum: 0,
				shipAmount: 0,
				token: '',
				buyCount: 0,
        BOOL:false,
				placeadd: '',
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				orderId: 0,
				checks: false,
				list: false,
				token: '',
				selSpecObj: [],
				adds: false,
        lingqu:false,
        weixuanz:false,
        yuxuanz:true,
        hongxuanz:true,
        weixuanz1:true,
        yuxuanz1:false,
        fangshi:1,
        hongxuanz1:false,
        youhuiquan:false,
				showhiden: false,
				pass: '',
				selfname: '',
				selfnumber: '',
				bargainOrder: {}
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted: function() {
			this.token = sessionStorage.getItem('token')

			for(var j = 0; j < this.placeval.length; j++) {
				this.sum += parseFloat(this.placeval[j].totalPrice)
				this.buyCount = this.placeval[j].buyCount

			}

			this.$axios({
				method: 'post',
				url: '/bargain/bargainOrderCheckout',
				responseType: 'json',
				data: {
					orderId: this.$route.query.orderid,
					productId: this.$route.query.productid,
					token: this.token
				}
			}).then(data => {
				console.log(data)
				if(data.data.res_code == 0) {
					this.placeval = data.data.res_data.goods
					this.bargainOrder = data.data.res_data.bargainOrder
					if(JSON.parse(sessionStorage.getItem("placeadd"))) {
						this.addre = JSON.parse(sessionStorage.getItem("placeadd"))
						return;
					}
					this.placeadd = data.data.res_data.memberAddressList
					for(var i = 0; i < this.placeadd.length; i++) {
						if(this.placeadd[i].defAddr == 1) {
							this.addre = this.placeadd[i]
							console.log('addre',this.addre)
						}
					}
				} else {
					alert(data.data.res_info)
					this.$router.go(-1)
				}
			}).catch(err => {
				console.log(err)
			})

			if(!JSON.parse(sessionStorage.getItem("placeadd")) && this.goodsList.memberAddressList.length == 0) {
				this.adds = true

			}

		},
		methods: {
      selectQuan(){
        this.youhuiquan = true
      },
      clearTan(){
        this.youhuiquan = false
      },
      xuanzewei(){
        this.fangshi == 1;
        this.weixuanz=false
        this.yuxuanz=true
        this.hongxuanz=true

        this.weixuanz1=true
        this.yuxuanz1=false
        this.hongxuanz1=false

      },
      ling(index){
        this.clickIndex = index
        this.youhuiquan = false
      },
      xuanzeyu(){
        this.fangshi == 2;
        this.weixuanz=true
        this.yuxuanz=false
        this.hongxuanz=true

        this.weixuanz1=false
        this.yuxuanz1=true
        this.hongxuanz1=false
      },
      xuanzehong(){
        this.weixuanz=true
        this.yuxuanz=true
        this.hongxuanz=false

        this.weixuanz1=false
        this.yuxuanz1=false
        this.hongxuanz1=true
      },
			hideLayer: function() {
				this.layerShow = false;
			},
			showLayer: function() {
				if(this.addre.addrId) {

					this.$axios({
						method: "post",
						url: '/bargain/relationOrderAddress',
						responseType: 'json',
						data: {
							addrId: this.addre.addrId,
							orderId: this.bargainOrder.orderId,
							token: this.token
						}
					}).then(data => {
						if(data.data.res_data.payAmount > 0) {
							// this.layerShow = true;
							this.jifen();
							let orderId = this.bargainOrder.orderId

							if(this.fangshi == 1){
                var openId = sessionStorage.getItem("openId");
                let url = "/pay/jyPay";
                if (sessionStorage.getItem("token")) {
                  this.$axios({
                    method: "post",
                    url: url,
                    responseType: "json",
                    data: {
                      orderType:4,
                      openId: openId,
                      token: this.token,
                      orderId: orderId,
                      payWay: '01',
                      payType: '06',
                      reqType:0
                    }
                  })
                    .then(data => {
                      sessionStorage.setItem('isPay', true);
                      console.log(data.data.payInfo)
                      if(data.data.payInfo){
                        window.location.href = data.data.payInfo;
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
                else {
                  alert(this.token);
                }
              }
              if(this.fangshi == 2){
							  this.showhiden = true

              }


						} else {
							this.$router.push({
								path: '/bargain/bargainlist',
								query: {
									state: 1
								}
							})
						}
					}).catch(err => {
						console.log(err)
					})
				}else{
					alert('地址不能为空')
				}
			},
			jifen() {
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
					document.getElementsByClassName("check")[1].style.background = "red"
					document.getElementsByClassName("check")[0].style.background = "none"
					if(this.addre.addrId == null) {
						alert("地址不能为空")
						this.layerShow = false;
					} else {
						sessionStorage.orderId = this.$route.query.orderid
						localStorage.orderId = this.$route.query.orderid
						console.log('--11wechat--');
						console.log(this.token);
						console.log(this.orderId);
						var appId, paySign, timeStamp, nonceStr, packages, signType, code_url;
						if(this.token) {
							this.$axios({
								method: 'post',
								url: '/pay/bargainOrderPay',
								responseType: 'json',
								data: {
									token: this.token,
									orderId: this.bargainOrder.orderId,
									payType: 1,
									reqType: 0
								}
							}).then(data => {
								sessionStorage.paySuccess = data.data.res_code
								console.log(data.data.res_data);

								if(data.data.res_code == 0) {
									var datas = data.data.res_data;
									appId = datas.appid;
									nonceStr = datas.noncestr;
									paySign = datas.sign;
									packages = datas.package;
									timeStamp = datas.timestamp;
									signType = 'MD5';
									callpay();
									//									alert("appId" + ":" + appId + "paySign:" + paySign + "timeStamp:" + timeStamp + "nonceStr:" + nonceStr + "nonceStr:" + nonceStr + "package:" + packages + "signType:" + signType)
									let that = this;

									function onBridgeReady() {

										WeixinJSBridge.invoke(
											'getBrandWCPayRequest', {
												"appId": appId, //公众号名称，由商户传入
												"paySign": paySign, //微信签名
												"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
												"nonceStr": nonceStr, //随机串
												"package": packages, //预支付交易会话标识
												"signType": signType //微信签名方式
											},

											function(res) {
												console.log('--微信支付进入，带上的orderId--');
												console.log(that.orderId);
												if(res.err_msg == "get_brand_wcpay_request:ok") {
													that.$router.push({
														path:'/bargain/bargainlist',
														query:{
															orderId:that.orderId,
														}
													})
													// if(this.$urlstate.numb == 1) {
													// 	location.href = 'http://test.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/bargain/bargainlist';
													// } else if(this.$urlstate.numb == 2) {
													// 	location.href = 'http://wx.juyooo.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/bargain/bargainlist';
													// }
													//												alert('支付成功');
												} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
													alert('支付取消');

												} else if(res.err_msg == "get_brand_wcpay_request:fail") {
													alert('支付失败');
													//												alert(res.err_msg)

												} //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
											}
										);
									}

									function callpay() {
										if(typeof WeixinJSBridge == "undefined") {
											if(document.addEventListener) {
												document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
											} else if(document.attachEvent) {
												document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
												document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
											}
										} else {
											onBridgeReady();
										}
									}
								} else {
									alert("统一下单失败");
								}

							}).catch(err => {
								console.log(err)
							})
						} else {
							alert(this.token)
						}

					}

				}

			},
			right() {
				//				确定密码
				this.checks = false;
				this.checks = !this.checks
				if(this.checks) {
					if(this.money > this.sum) {
						document.getElementsByClassName("check")[0].style.background = "red"
						document.getElementsByClassName("check")[1].style.background = "none"
						if(this.pass != '') {
							this.$axios({
								method: 'post',
								url: '/pay/bargainOrderPay',
								responseType: 'json',
								data: {
									token: this.token,
									orderId: this.bargainOrder.orderId,
									payType: 0,
									reqType: 0,
									payPwd: this.pass
								}
							}).then(data => {
								if(data.status == 200) {

									if(data.data.res_code == 0) {
										this.$router.push('/bargain/bargainlist')
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
  .active{
    /*color: #a4a4a4 !important;*/
    /*border: none !important;*/
    background: url("../../common/image/select.png") 0 0 no-repeat !important;
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
