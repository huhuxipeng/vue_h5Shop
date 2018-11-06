<template>
	<div id="apply">
		<mt-header title="付款结果" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="nav">
			<ul>
				<li>绑定手机</li>
				<li>完成条件</li>
				<li>开店成功</li>
			</ul>
		</div>
		<div class="main"> 
			<p class="top">恭喜您成为巨柚店长</p>
			<div class="equity">
				<p>您获得以下权益</p>
				<ul class="detail">
					<li>1.获得专属礼包</li>
					<li>2.随礼包获得店长名片</li>
					<li>3.添加xx微信号，获得一对一管家指导</li>
					<li>4.转发店长推广二维码或者商品下级客户购买获得红积分和黄积分收入。</li>
				</ul>
			</div>
			<div class="btn">
				<input type="button" value="你的店长收入"  @click="income"/>
			</div>
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			backgo(){
				this.$router.go(-1)
			},
			income(){				
//				sessionStorage.identityId=1
				let token = sessionStorage.getItem("token")
				let memberId =sessionStorage.getItem('memberId')
				this.$axios({
					method:'post',
					url:'/member/applyForShopowner',
					responseType:'json',
					data:{
						memberId:memberId,
						token:token
					}
				}).then(data=>{
					if(data.status==200){
						sessionStorage.identityId=1
						this.$router.push("/Percenter");
						sessionStorage.removeItem('memberId');
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
#apply{
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.nav{
		overflow: hidden;
		margin-bottom:5px;
		background: url(../common/image/shopImg/progress.png) no-repeat;
		background-size:100% 100% ;
		ul{
			font-size: 0;
			display: flex;
			color: white;
			li{
				flex: 1;
				text-align: center;
				font-size: .4rem;
				margin-left: -2px;
				padding:20px;
			}
		}
	}
	.main{
		background: url(../common/image/shopImg/applybg.png) no-repeat;
		background-size: 100% 100%;
		background-position-y:90px;
		position: absolute;
		bottom: 0;
		top:115px;
		width: 100%;
		.top{
			font-size: .4rem;
			line-height: 8em;
			text-align: center;
			letter-spacing: 2px;
		}
		.equity{
			margin-left: 10px;
			margin-right: 10px;
			background:white;
			padding:20px;
			margin-top:40%;
			border-radius:5px;
			p{
				font-size: .5rem;
				padding-bottom:20px;
			}
			li{
				font-size:.4rem;
				color: rgb(153, 153, 153);
				line-height:1.5;
			}
		}
		.btn{
			border-radius: 10px;
			margin-top: 10px;
			margin-left: 10px;
			margin-right: 10px;
			input{
				width: 100%;
				height: 100%;
				padding: 10px;
				color: white;
				background:#ff403c;
				font-size: .4rem;
				border-radius:5px;
			}
		}
		
	}
	
}
</style>

