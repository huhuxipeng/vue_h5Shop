<template>
	<div id="shopManager">
		<mt-header flexd title="店长中心" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="nav">
			<ul>
				<li>绑定手机</li>
				<li>完成条件</li>
				<li>开店成功</li>
			</ul>
		</div>
		<div class="shopEquity">
			<div class="equity">
				<h2>店长权益</h2>
				<p>1、随礼包获赠店长名片</p>
				<p>2、获得专属礼包</p>
				<p>3、获得专属礼包</p>
				<p>4、转发店长推广二维码或者商品下级客户购买可获得红积分和黄积分收入</p>
			</div>
		</div>
		<div class="verify">
			<p>请输入手机号</p>
			<p class="phone"><input type="number" value="" v-model="telphone" @blur="phones" class="phones"/></p>
			<p>验证码</p>
			<p class="verifynum"><input type="number" value="" v-model="code"/>
			<button class="time" @click="gets">获取验证码</button>
			</p>
			<p class="check">
				<span class="checkbox" @click="ontouch"><img src="../common/image/right.png" v-if="shows"/></span>
				<!--<router-link to="/procotol">-->
				<a @click="procotols">
					<span>我已经阅读并同意《店长协议》</span>
				</a>
				<!--</router-link>-->
			</p>
		</div>
			<p class="btn"><input type="button" value="下一步" :disabled="!shows" @click="down" :class="{'bg':shows}"/></p>
	</div>
</template>

<script>
	import {Header} from 'mint-ui'
	export default{
		data(){
			return{
				shows:false,
//				hid:false,
				telphone:'',
				token:'',
				oks:0,
				code:'',
				token:''
			}
		},
		mounted(){
			this.token=sessionStorage.getItem("token");
			this.oks=JSON.parse(sessionStorage.getItem("oks"));
			if(sessionStorage.getItem("TEL")){
				this.telphone=sessionStorage.getItem("TEL");
				this.code=sessionStorage.getItem("COLD");
				sessionStorage.removeItem('TEL');
				sessionStorage.removeItem('COLD');
			}
			
			if(this.oks==1){
				this.shows=true;
			}
		},
		methods:{
			//输入框失焦判断手机号
			phones(){
				var phones = document.getElementsByClassName("phones")[0];
				var reg=/^1[3|5|7|8]\d{9}$/;
				if(!reg.test(this.telphone)){
					phones.style.border='1px solid red';
				}else{
					phones.style.border='1px solid #ccc';
					this.shows=false;
				}
			},
			//点击获取验证码
			gets(){
//				this.hid=true;
				let times=120;
				var tim = document.getElementsByClassName("time")[0];
				tim.setAttribute("disabled","disabled")
				tim.innerHTML=times+"S";
				var time=setInterval(function(){
					times--;
					tim.innerHTML=times+"S";
						if(times<=0){
//							this.hid=false;
							tim.removeAttribute("disabled");
							tim.innerHTML="获取验证码";
							clearInterval(time);
						}
					},1000);
					
				this.$axios({
					method:'post',
					url:"/member/mobileCheck",
					responseType: 'json',
					data:{
						mobile:this.telphone,
						token:this.token,
						type:5
					}
				}).then(data=>{
					
					if(data.status==200){
						if(this.oks==1){
							this.shows=true;
						}
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			procotols(){
				sessionStorage.TEL=this.telphone;
				sessionStorage.COLD=this.code;
				this.$router.push('/procotol')
			},
			//点击同意店家协议
			ontouch(){
				if(!this.shows){
					this.shows=true;
				}else{
					this.shows=false;
				}
			},
			//点击进入下一步
			down(){
				let memberId=sessionStorage.getItem("memberId");
				if( this.telphone!='' && this.code!=""){
					this.$axios({
						method:'post',
						url:"/member/checkCode",
						responseType: 'json',
						data:{
							code:this.code,
							token:this.token,
							mobile:this.telphone,
							type:5
						}
					}).then(data=>{
						if(data.status==200){
							if(data.data.res_code==1){
								alert(data.data.res_info)
							}else{
								let res_code=JSON.parse(sessionStorage.getItem("res_code"));
								switch(res_code){
									case 7:
										this.$router.push('/lastOne');
										break;
									default:
										this.$router.push('/mancenter');
										break;
								}
								sessionStorage.removeItem("oks");
							}
							
						}
					}).catch(err=>{
						console.log(err);
					})
					
				}else{
					alert("手机号或者验证码不能为空");
				}
				
			},
			backgo(){
				this.$router.push('/Percenter');
			} 
		}
	}
	
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin.scss';
#shopManager{
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none !important;    
	    margin: 0;
	}
	a{
		color:#3399ff;
	}
	background:#f5f5f5;
	.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.nav{
		overflow: hidden;
		margin-bottom:10px;
		background: url(../common/image/shopImg/navbg.png) no-repeat;
		background-size: 100% 100%;
		ul{
			font-size: 0;
			margin-bottom:5px;
			display: flex;
			li{
				flex: 1;
				text-align: center;
				color:#ccc;
				font-size: .4rem;
				margin-left: -2px;
				padding:20px;
			}
			li:first-child{
				color: white;
			}
		}
	}
	.shopEquity{
		padding-right:10px;
		margin-bottom: 10px;
		.equity{
			padding:20px;
			height:5rem;
			background: white;
			font-size:.4rem;
			color:rgb(153, 153, 153);
			line-height:1.4;
			h2{
				font-size: .45rem;
				color: rgb(51, 51, 51);
				padding-bottom: 10px;
			}
		}
	}
	.verify{
		padding: 10px;
		background: white;
		font-size: .4rem;
		line-height: 2;
		input{
			border:1px solid #ccc;
			padding: 10px;
			border-radius:5px;
			outline: none;
			margin:auto;
			width: 90%;
		}
		.verifynum{
			position: relative;
			.time{
				font-size:.3rem;
				display: inline-block;
				line-height:1.2rem;
				position: absolute;
				right:8%;
				vertical-align: middle;
				background: white;	
				border: none;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				outline: none;	
				height: 99%;	
			}
		}
		.check{
			font-size: .3rem;
			margin-top: 5px;
			.checkbox{
				display:inline-block;
				border: 1px solid #ccc;
				width:.4rem;
				height: .4rem;
				vertical-align:text-bottom;
				margin-right: 5px;
				border-radius:3px;
				text-align: center;
				img{
					width: 100%;
					height: 100%;
					vertical-align:top;
				}
			}
		}
		
	}
	.btn{
		margin-left:12px;
		margin-right:12px;
		margin-top:20px;
		input{
			width: 100%;
			height: 100%;
			padding: 15px;
			background:#eee;
			border-radius:10px ;
			line-height: 1.167;
			font-size: 15px;
			color: rgb(153, 153, 153);
		}
		.bg{
			background:#ff403c;
			color: white;
		}
	}
}

</style>
