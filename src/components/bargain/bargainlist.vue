<template>
	<div id="bargainlist">
		<mt-header flexd title="巨柚砍价" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
			<!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
		</mt-header>
		<div class="main">
			<ul>
				<li class="list" v-for="(item,index) in detail">
					<div class="lists" @click="bargaindetail(item)">
						<p class="img"><img :src="item.image |filterss(2)" /><span class="shade" v-if="item.bargainOrderStatus==9">砍价失败</span></p>
						<div class="content">
							<p>{{item.title}}</p>
							<p>
								<span v-if='item.bargainOrderStatus==0'>已砍<em>{{item.bargainPrices}}</em>元，还剩<em>{{item.surplusPrice}}</em>元</span><br/>
								<span style="color: red;" v-if="item.type==1&&item.bargainOrderStatus!=0">{{orderType[Number(item.bargainOrderStatus)]}}</span>
							</p>
						</div>
					</div>

					<div class="btn">
						<p class="my">{{type[item.type]}}</p>
						<p class="time" v-if="item.takeDate>0&&item.orderstate==0">
							<span>{{item.takeDate | settime}}</span><span>后结束</span>
						</p>

						<div class="clicks" v-if="item.type==1">
							<p v-if="item.bargainType==0&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>
							<p v-if="item.bargainType==1&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>
							<p v-if="item.bargainType==2&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>

							<p v-if="item.bargainType==0&&item.orderstate==9" @click="btn(item)">重砍一次</p>
							<p v-if="item.bargainType==1&&item.orderstate==9" @click="btn(item)">重砍一次</p>
							<p v-if="item.bargainType==2&&item.orderstate==9" @click="btn(item)">重砍一次</p>

							<p v-if="item.bargainType==0&&item.orderstate==6" @click="logistics(item,index)">查看物流</p>
							<p v-if="item.bargainType==1&&item.orderstate==6" @click="logistics(item,index)">查看物流</p>
							<p v-if="item.bargainType==2&&item.orderstate==6" @click="logistics(item,index)">查看物流</p>

							<p v-if="item.bargainType==0&&item.orderstate==6" @click="oks(item,index)">确认收货</p>
							<p v-if="item.bargainType==1&&item.orderstate==6" @click="oks(item,index)">确认收货</p>
							<p v-if="item.bargainType==2&&item.orderstate==6" @click="oks(item,index)">确认收货</p>

							<p v-if="item.bargainType==0&&item.orderstate==1" @click="propm(item,index)">立即领取</p>
							<p v-if="item.bargainType==1&&item.orderstate==1" @click="propm(item,index)">立即领取</p>
							<p v-if="item.bargainType==2&&item.orderstate==1" @click="propm(item,index)">立即领取</p>
              <p v-if="item.bargainType==2&&item.orderstate==2" @click="propm(item,index)">免费领取</p>
						</div>
						<div class="clicks" v-if="item.type>1">
							<p v-if="item.bargainType==0&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>
							<p v-if="item.bargainType==1&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>
							<p v-if="item.bargainType==2&&item.orderstate==0" @click="shareshop(item)">分享砍价</p>

              <p v-if="item.bargainType==0&&item.bargainOrderStatus>=1" @click="propm(item,index)">立即领取</p>
							<p v-if="item.bargainType==1&&item.bargainOrderStatus>=1" @click="propm(item,index)">立即领取</p>
							<p v-if="item.bargainType==2&&item.bargainOrderStatus>=1" @click="propm(item,index)">立即领取</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<footer>
			<p @click="bragainshop"><i class="icon shop"></i>砍价商品</p>
			<p><i class="icon mybra"></i>我的砍价</p>
		</footer>
		<!--分类-->
		<mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' closeOnClickModal>
			<div id="wrap">
				<!--关闭按钮-->
				<p class="back" @click="close"><img src="../../common/image/qrcodeimg/close.png" slot="icon" /></p>
				<!--弹框内容-->
				<div class="content">
					<div class="conten">
						<p class="productImg"><img :src="name.image |filterss(2)" :onerror="logo" /></p>
						<p class="title">{{name.title}}</p>
						<p class="money">￥{{Number(name.goodsPrice-name.bargainPrices).toFixed(2)}}</p>
					</div>
					<div v-if="goodsSpecList!=null">
						<div class="category" v-for="(item,index) in goodsSpecList">
							<p style="font-size:.4rem;">{{item.specName}}</p>
							<ul class="cate">
								<li :class="{'cols':child.show}" v-for="(child,key) in item.detail" @click="stand(child,index,key)">{{child.specValue}}</li>
							</ul>
						</div>
					</div>

				</div>
				<div class="footers">
					<p class="buynows" style="width:100%" @click="goshop">确定</p>
				</div>
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
	import wx from 'weixin-js-sdk';
	import {Toast} from 'mint-ui';
	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				popupVisible: false,
				detail: {},
				goodsSpecList: [],
				selSpecArr: [],
				sortSelSpecArr: [],
				matchProductId: "",
				selSpecObj: [],
				type: ['', '我发起的砍价', '我参与的砍价'],
				orderType: ['', '砍价成功', '备货中', '备货中', '待发货', '待发货', '已发货', '已收货', '已完成', '砍价失败'],
				token: '',
				share: false,
				shopdetai: [],
				product: [],
				orderId: 0,
				name: {},
				orderids: {},
        clicks:true,
        mobile:"",
        codes:'',
        binding:false,
        states:true
			}
		},
		filters: {
			settime: function(timestamp) {
			  // alert(timestamp)
				let self = this
				let nowTime = new Date();
				let endTime = new Date(timestamp);
				let t = endTime.getTime() - nowTime.getTime();
				if(t > 0) {
					let day = Math.floor(t / 86400000);
					let hour = Math.floor((t / 3600000) % 24);
					let min = Math.floor((t / 60000) % 60);
					let sec = Math.floor((t / 1000) % 60);
					hour = hour < 10 ? "0" + hour : hour;
					min = min < 10 ? "0" + min : min;
					sec = sec < 10 ? "0" + sec : sec;
					let kong = " "
					let format = '';
					//					if(day>0){
					//						format = `${day }:${hour }:${min }:${sec }`;
					//					}
					if(day <= 0 && hour > 0) {

						format = `${hour}     :      ${min}         :   ${sec}`;
					}
					if(day <= 0 && hour <= 0) {
						format = `${'00'}     :      ${min}         :   ${sec}`;
					}
					return format
				}
			},
		},
    created(){
      if(sessionStorage.getItem("token")==null){
        this.logins()
      }
    },
		mounted() {
      if(sessionStorage.token!=null) {
        if (this.$route.query.state == 1) {
          $('.mybra').addClass('mybras')
        }
        if (sessionStorage.getItem('token') == null) {
          this.token = this.$route.query.token
        } else {
          this.token = sessionStorage.getItem("token")
        }

		this.getList();
      }
		},
		methods: {
		  logins(){
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        let token = sessionStorage.getItem("token")

        if(token == null) {
          if(r == null) {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fbargain%2fbargainlist%3fstate%3d1&response_type=code&scope=snsapi_userinfo#wechat_redirect';
          } else {

            this.$axios({
              method:'post',
              url:'/basics/anon/appWxAuth',
              responseType:'json',
              data:{
                code: r[2],
                reqType: 0
              }
            }).then(data=>{
              console.log(data)
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if(data.data.res_data.member){
                sessionStorage.details=JSON.stringify(data.data.res_data.member)
                sessionStorage.token=data.data.res_data.token
              }
              if(data.data.res_data.returnCode==0){
                this.binding=true;
              }
              window.location.reload()
            }).catch(err=>{
              console.log(err)
            })


          }
        }
			},
			getList(){
				this.$axios({
          method: 'post',
          url: '/bargain/bargainOrderList',
          responseType: 'json',
          data: {
            pageNo: 0,
            pageSize: 0,
            token: this.token
          }
        }).then(data => {

          this.detail = data.data.res_data.bargainOrderList.rows
          let gettime = new Date().getTime();
          for (let i = 0; i < this.detail.length; i++) {
            if (this.detail[i].takeDate != null) {
              let that = this;
              if (that.detail[i].takeDate - gettime > 0) {
                that.detail[i].takeDate = data.data.res_data.bargainOrderList.rows[i].takeDate;

                let time = setInterval(function () {
                  that.detail[i].takeDate -= 1
                  if (that.detail[i].takeDate == 0) {
                    clearInterval(time);
                  }
                }, 1000);
              } else {
                that.detail[i].takeDate = 0
              }

            }
            switch (this.detail[i].bargainOrderStatus) {
              case 0:
                this.detail[i]['orderstate'] = 0
                break;
              case 1:
//						case 3:
//						case 4:
//						case 5:
                this.detail[i]['orderstate'] = 1
                break;
              case 2:
                this.detail[i]['orderstate'] = 2
              case 6:
                this.detail[i]['orderstate'] = 6
                break;
              case -9:
                this.detail[i]['orderstate'] = 9
                this.detail[i].bargainOrderStatus = 9
                break;
            }
          }
        }).catch(err => {
          console.log(err)
        })
			},
      gaincodes(){
        console.log(111)
        let token = sessionStorage.getItem("token");
        if(this.clicks==false){
          return false
        }

        var reg = /^1[1-9]\d{9}$/;
        console.log(reg.test(this.mobile))
        if(!(reg.test(this.mobile))) {
          alert("号码不正确")
        } else {
          this.clicks=false
          let times = 60;
          var tim = document.getElementsByClassName("codebtn")[0];
          tim.innerHTML = times + "S";
          let _this=this;
          var time = setInterval(function () {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              _this.clicks=true
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);
          this.$axios({
            method:'post',
            url:"/basics/anon/sendMobileCode",
            responseType: 'json',
            data:{
              mobile:this.mobile,
              type:8
            }
          }).then(data=>{
            console.log(data)
          }).catch(err=>{
            console.log(err);
          })
        }
      },

      bidingmobile(){
        if(this.states) {
          this.states=false
          var member = JSON.parse(sessionStorage.details)
          console.log(member)
          let obj = {
            'authType': 1,
            'face': member.face,
            'memberStatus': member.memberStatus,
            'mobile': this.mobile,
            'mobileCode': this.codes,
            'nickname': member.nickname,
            'openId': member.openId,
            'sex': member.sex,
            'subscribe': member.subscribe,
            'type': 8,
            'unionId': member.unionId
          }
          this.$axios({
            method: 'post',
            url: "/basics/anon/loginAuthorizedCode",
            responseType: 'json',
            data: obj
          }).then(data => {
            console.log(data)
            if (data.data.res_code == 0) {
              this.binding = false
              sessionStorage.details = JSON.stringify(data.data.res_data.member)
              sessionStorage.token = data.data.res_data.token
            } else {
              alert(data.data.res_info)
              this.states=true
            }

          }).catch(err => {
            console.log(err);
          })
        }
      },
			backgo() {
				this.$router.push('/Percenter');
			},
			shareshop(val) {
				let tokens = sessionStorage.getItem('token')
//				if(val.type != 2) {
					this.$router.push({
						path: '/bargain/bargainCont',
						query: {
							orderid: val.bargainOrderId,
							token: tokens
						}
					})
//				} else {
//					alert('快去创建订单分享给好友吧~')
//				}

			},
			clears() {
				this.share = false
			},
			bragainshop() {
				this.$router.push({
					path: '/bargain/bargainshop',
					query: {
						state: 0
					}
				})
			},
			bargaindetail(val) {
				let tokens = sessionStorage.getItem('token')
//				if(val.type != 2) {
					this.$router.push({
						path: '/bargain/bargainCont',
						query: {
							orderid: val.bargainOrderId,
							token: tokens
						}
					})
//				} else {
//					alert('快去创建订单分享给好友吧~')
//				}
			},
			close() {
				this.popupVisible = false
				this.shopdetai.splice(0, this.shopdetai.length)
			},

			propm(val, index) {
				this.orderId = val.bargainOrderId

				this.subimt(val)

			},
			btns(val){
				this.$axios({
					method:'post',
					url:'/bargain/createBargainOrder',
					responsetype:'json',
					data:{
						token:this.token,
						bargainId:val.bargainId
					}

				}).then(data=>{
					if(data.data.res_code==0){
						this.subimt(val)
					}else{
						alert(data.data.res_info)
					}
				}).catch(err=>{
					console.log(err)
				})
			},

			subimt(val){
//				if(val.bargainOrderStatus != 2 && val.bargainOrderStatus != 3 &&val.bargainOrderStatus != 4 && val.bargainOrderStatus != 5) {
					this.popupVisible = true
					this.name = val;
					this.$axios({
						method: 'post',
						url: '/goods/anon/queryProductList',
						responseType: 'json',
						data: {
							goodsId: val.goodsId
						}
					}).then(data => {

						this.shopdetai = data.data.res_data.goodsSpecList
						this.product = data.data.res_data.productList
						if(this.shopdetai[0].detail) {
							this.goodsSpecList = this.shopdetai
							for(let i = 0; i < this.goodsSpecList.length; i++) {
								for(let j = 0; j < this.goodsSpecList[i].detail.length; j++) {
									this.goodsSpecList[i]['show'] = false;
								}
								this.goodsSpecList[i].detail[0]['show'] = true;

								this.selSpecArr.push(this.goodsSpecList[i].detail[0].specValueId);
								this.selSpecObj.push({
									specName: this.goodsSpecList[i].specName,
									specValue: this.goodsSpecList[i].detail[0].specValue,
									specValueId: this.goodsSpecList[i].detail[0].specValueId
								});
							}
							this.$set(this.goodsSpecList, 'show', false);
							this.matchElsProductId();

						}

					}).catch(err => {
						console.log(err)
					})
//				}else{
//					alert('正在'+this.orderType[val.bargainOrderStatus]+'中...')
//				}
			},



			logistics(val, index) {
				sessionStorage.BARGAIN = 'BARGAIN'
				sessionStorage.orderId = val.bargainOrderId
				sessionStorage.goodsImage = JSON.stringify(val.goodsImage)
				this.$router.push('/logistics')
			},
			matchElsProductId() {
				for(var i = 0; i < this.selSpecArr.length; i++) {
					this.sortSelSpecArr[i] = this.selSpecArr[i]
				}
				var len = this.sortSelSpecArr.length, // 数组的长度
					value, // 当前比较的值
					i, // 未排序部分的当前位置
					j; // 已排序部分的当前位置
				for(i = 0; i < len; i++) {
					// 储存当前位置的值
					value = this.sortSelSpecArr[i];
					/*
					 * 当已排序部分的当前元素大于value，
					 * 就将当前元素向后移一位，再将前一位与value比较
					 */
					for(j = i - 1; j > -1 && this.sortSelSpecArr[j] > value; j--) {
						this.sortSelSpecArr[j + 1] = this.sortSelSpecArr[j];
					}
					this.sortSelSpecArr[j + 1] = value;
				}

				let reg = this.sortSelSpecArr.toString();
				for(let i in this.product) {
					if(this.product[i].specValueIds == reg) {

						this.matchProductId = this.product[i].productId;
//						this.store = this.product[i].store
					}

				}
			},
			// 选规格事件
			stand(els, i, j) {
				for(let b = 0; b < this.goodsSpecList[i].detail.length; b++) {
					this.goodsSpecList[i].detail[b].show = false;
				}

				els.show = true;
				let changeData = this.goodsSpecList[i].detail[j].show;
				this.$delete(this.goodsSpecList, 'show');
				this.$set(this.goodsSpecList, 'show', changeData);
				this.selSpecArr.splice(i, 1, els.specValueId);
				this.matchElsProductId();
				this.selSpecObj[i].specValue = els.specValue;
				this.selSpecObj[i].specValueId = els.specValueId;
			},

			//购买
			goshop() {
				if(this.matchProductId == 0) {
					this.matchProductId = this.product[0].productId
//					this.store = this.product[0].store
				}
				this.popupVisible = false
				this.$axios({
					method: 'post',
					url: '/bargain/queryBargainDetail',
					responseType: 'json',
					data: {
						orderId: this.orderId,
						token: this.token
					}
				}).then(data => {

					if(data.data.res_code == 0) {
						this.$router.push({
							path: '/bargain/bargainBlance',
							query: {
								productid: this.matchProductId,
								orderid: data.data.res_data.bargainGoods.orderId
							}
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//重新砍价
			btn(val) {
				this.$axios({
					method: 'post',
					url: '/bargain/createBargainOrder',
					responsetype: 'json',
					data: {
						token: this.token,
						bargainId: val.bargainId
					}

				}).then(data => {
					if(data.data.res_code == 0) {

						this.$router.push({
							path: '/bargain/bargainCont',
							query: {
								orderid: data.data.res_data.bargainGoods.orderId,
								token: this.token
							}
						})
					} else {
						alert(data.data.res_info)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//确认收货
			oks(val,index){
				this.$axios({
					method:'post',
					url:'/bargain/bargainOrderRog',
					responseType:'json',
					data:{
						orderId:val.bargainOrderId,
						token:this.token
					}
				}).then(data=>{
					console.log(data)
					if(data.data.res_code==0){
						Toast('收货成功');
						// this.detail[index].orderstate=7
						this.getList();
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#bargainlist {
    .bindingmobile{
      width: 80%;
      margin: auto;
      background: white;

      p:first-child{
        text-align: center;
        font-size: .4rem;
        font-weight: bolder;
      }
      p{
        padding: .2rem;
        margin-bottom: .2rem;
      }
      p:last-child{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: orangered;
        color: white;
        padding: .2rem;
      }
      .codebtn{
        color: orangered;
      }
      .icons{
        width: 0.59rem;
        height: 0.7rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.33rem;
        &.name-icon{
          background-position: -2.56rem -1.7rem;
        }
        &.pw-icon{
          background-position:-3.55rem -3.95rem;
        }
      }
      .input{
        font-size:0.32rem;
        color: #999;
        width: 4.3rem;
      }
    }
		.header {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background: white;
			padding: 10px;
			color: black;
			font-size: .5rem;
			border-bottom: 1px solid #ccc;
			z-index: 1000;
		}
		.main {
			margin-top: 1.2rem;
			background: #eee;
			margin-bottom: 2rem;
			.list {
				margin-bottom: .2rem;
				padding: .2rem;
				background: white;
				padding-bottom: 0;
				.lists {
					height: 3rem;
					display: flex;
					justify-content: space-between;
					.img {
						flex: 1;
						float: left;
						position: relative;
						margin-right: .2rem;
						width:3rem;
						height:3rem;
						img {
							width: 100%;
							height: 100%;
							margin-right: .2rem;
						}
						.shade {
							display: inline-block;
							width: 80%;
							height: 80%;
							border-radius: 100%;
							background: rgba(0, 0, 0, 0.4);
							color: white;
							text-align: center;
							line-height: 2.5rem;
							position: absolute;
							top: 10%;
							left: 10%;
						}
					}
					.content {
						flex: 2;
						font-size: .4rem;
						height: 3rem;
						box-sizing: border-box;
						border-bottom: 1px solid #ccc;
						p:first-child {
							margin-bottom: 1rem;
							height: 1rem;
							line-height: 1.5;
							text-overflow: ellipsis;
							display:-webkit-box;
							-webkit-box-orient:vertical;
							-webkit-line-clamp:2;
							word-break: break-all;
						}
						p:last-child {
							font-size: .3rem;
							span {
								em {
									color: red;
									font-size: .4rem;
								}
							}
						}
					}
				}
				.btn {
					vertical-align: middle;
					padding: .2rem;
					padding-bottom: 0.2rem;
					height: .775rem;
					display: flex;
					justify-content: flex-start;
					.my {
						flex: 1;
						padding-top: .2rem;
						color: #ccc;
					}
					.time {
						flex: 2.5;
						max-width: 25rem;
						vertical-align: middle;
						padding-top: .1rem;
						padding-bottom: .25rem;
						padding-right: .2rem;

						font-size: .42rem;
						/*background: url(../../common/image/bargain/countdown.png) no-repeat;*/
						background-size: 59% 80%;
						background-position-x: 60%;
						span:first-child {
							color: white;
							margin-right: .2rem;
							margin-left: 26%;
							font-weight: 200;
							box-shadow: .1rem .1rem 10px black;
							background: black;
							border-radius: .1rem;
							/*padding: .1rem;*/
						}
					}
					.clicks {
						min-width: 70px;
						display: flex;
						justify-content: center;
						p {
							padding: .2rem;
							background: red;
							border-radius: .2rem;
							color: white;
							text-align: center;
							margin-right: .1rem;
						}
					}
				}
				.btn:after {
					display: block;
					content: '';
					clear: both;
				}
			}
		}
		footer {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-around;
			padding: .3rem;
			font-size: .4rem;
			border-top: 1px solid #ccc;
			background: white;
			p {
				flex: 1;
				text-align: center;
			}
			p:first-child {
				border-right: 1px solid #CCCCCC;
			}
			.icon {
				vertical-align: middle;
				margin-right: .2rem;
				display: inline-block;
				width: .8rem;
				height: .8rem;
				/*background: red;*/
				background: url(../../common/image/bargain/banner.png) no-repeat;
				background-size: 1050%;
			}
			.shop {
				background-position: -0.1rem -.1rem;
			}
			.mybra {
				background-position: -1rem -.1rem;
			}
			.mybras {
				background-position-y: -1rem;
			}
		}
		#wrap {
			min-height: 6.83rem;
			min-width: 10rem;
			background: white;
			overflow: visible;
			.back {
				width: .83rem;
				position: absolute;
				top: -.5rem;
				right: .33rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				padding: 10px;
				max-height: 11rem;
				overflow-y: auto;
				margin-bottom: 1rem;
				.conten {
					padding-bottom: .5rem;
					height: 2.5rem;
					.productImg {
						width: 2.5rem;
						height: 2.5rem;
						border-radius: 5px;
						float: left;
						margin-right: .5rem;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.title {
						padding-top: .5rem;
						line-height: .4rem;
						font-weight: 800;
						overflow: hidden;
						max-height: 1rem;
						max-width: 5rem;
						text-overflow: ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						word-break: break-all;

					}
					.money {
						font-size: .4rem;
						color: red;
						line-height: .6rem;
					}
				}
				.category {
					clear: both;
					padding-bottom: .5rem;
					.cate {
						padding-top: .5rem;
						li {
							background: #eee;
							font-size: .4rem;
							border-radius: .5rem;
							margin-right: .4rem;
							margin-bottom: .16rem;
							padding: .2rem;
							padding-left: .5rem;
							padding-right: .5rem;
							float: left;
						}
						.cols {
							background: red;
							color: white;
						}
					}
					.cate:after {
						content: "";
						display: block;
						clear: both;
					}
				}
			}
			.footers {
				margin-top: .5rem;
				display: flex;
				justify-content: space-between;
				font-size: .4rem;
				text-align: center;
				line-height: .4rem;
				.addcars {
					padding: .5rem;
					background: #eeeeee;
					flex: 1;
				}
				.buynows {
					flex: 1;
					padding: .5rem;
					background: #f23c18;
					color: white;
					position: fixed;
					bottom: 0;
				}
				.export {
					display: inline-block;
					text-align: center;
					color: orangered;
					width: 100%;
					height: 1.3rem;
					float: right;
					line-height: 1.3rem;
					font-size: .4rem;
					background: #E0E0E0;
				}
			}
		}
		.popup {
			width: 100%;
			font-size: .5rem;
			padding: 10px;
			.addlit {
				height: 5rem;
			}
			.content {
				li {
					margin-bottom: .3rem;
					font-size: .4rem;
					text-align: center;
				}
			}
		}
		.mint-popup {
			background: none;
			padding-bottom: 0;
		}
		.popup {
			width: 100%;
			text-align: center;
			font-size: .4rem;
			.poptop {
				text-align: center;
				line-height: 2;
				p {
					width: 100%;
					font-size: .4rem;
					color: white;
				}
				p:first-child {
					font-size: .5rem;
					font-weight: bolder;
					span {
						color: red;
					}
				}
			}
			.contents {
				background: white;
				ul {
					padding: .2rem;
					margin-bottom: .3rem;
					display: flex;
					justify-content: space-around;
					li {
						flex: 1;
						text-align: center;
						img {
							width: 60%;
						}
					}
				}
				.clear {
					border-top: 1px solid #ccc;
					padding: .3rem;
				}
			}
		}
	}
</style>
