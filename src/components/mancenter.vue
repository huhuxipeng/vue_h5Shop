<template>
	<div id="mancenter">
		<mt-header flexd title="店长中心" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="nav">
			<ul>
				<li>绑定手机</li>
				<li>完成条件</li>
				<li>开店成功</li>
			</ul>
		</div>
		<!--content-->
		<div class="main">
			<div class="top">
				<span>店长条件</span>
				<span>(满足以下任意一条，即可获取店长资格)</span>
			</div>
			<div class="content">
				<ul>
					<li class="topup">
						<span class="tops">充值满200元，立送200云积分</span>
						<input type="button" value="立即充值" class="btn" @click="topup"/>
					</li>
					<li class="cust">
						<span class="custs">消费满200元，立送200云积分</span>
						<input type="button" value="立即购买" class="btn" @click="buy"/>
					</li>
					<li class="gift">
						<span class="gifts">购买店长礼包</span>
						<input type="button" value="立即购买" class="btn" @click="buybag"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui'
	export default{
		data(){
			return{
				memberId:0,
				token:'',
			}
		},
		mounted(){
			
		},
		methods:{
			//返回上一层
			backgo(){
				this.$router.go(-1)
			},
			//去充值
			topup(){
				sessionStorage.shopMancenter=1
				this.$router.push('/topup')
			
			},	
			//消费满200
			buy(){
				this.$router.push('/')
			},
			//购买礼包
			buybag(){
				this.$router.push('/buy')
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin.scss';
#mancenter{
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
		padding-top: 5px;
		padding-bottom:5px ;
	}
	.nav{
		overflow: hidden;
		margin-bottom:5px;
		background: url(../common/image/shopImg/icon_进度条2@2x.png) no-repeat;
		background-size:100% 100% ;
		ul{
			font-size: 0;
			display: flex;
			li{
				flex: 1;
				color: white;
				text-align: center;
				font-size: .4rem;
				margin-left: -2px;
				padding:20px;
			}
			li:nth-child(3){
				color:#ccc;
			}
		}
	}
	.main{
		.top{
			padding: 10px;
			border-bottom:1px solid #eee;
			span:nth-child(1){
				font-size:0.4rem;
				color:rgb(51, 51, 51);
			}
			span:nth-child(2){
				font-size: .3rem;
				color:#b3b3b3;
			}
		}
		.content{
			li{
				padding-left: 10px;
				padding-top:20px;
				padding-bottom: 20px;
				border-bottom: 1px solid #eee;
				font-size: .3rem;
				.btn{
						padding: 2px;
						padding-left: 10px;
						padding-right:10px;
						font-size:.3rem;
						float: right;
						background: none;
						margin-right: 10px;
						border: 1px solid #ff8a00;
						border-radius: 20px;
						color: rgb(255, 138, 0) ;
				}
			}
			.topup{
					.tops{
						display: inline-block;
						padding-left: 25px;
						background:url(../common/image/shopImg/topup.png) no-repeat;
						background-size:10%;	
					}
					
				}
				.cust{
					.custs{
						padding:2px;
						display: inline-block;
						padding-left: 25px;
						background:url(../common/image/shopImg/buy.png) no-repeat;
						background-size:9% 100%;	
					}
				}
				.gift{
					.gifts{
						padding:3px;
						display: inline-block;
						padding-left: 25px;
						background:url(../common/image/shopImg/buy.png) no-repeat;
						background-size:16% 90%;	
					}
				}
		}
		
		
		
		
		
		
		
	}
}

</style>

