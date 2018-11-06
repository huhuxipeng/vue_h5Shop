<template>
	<div id="lastOne">
		<mt-header title="店长中心" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="nav">
			<ul>
				<li>绑定手机</li>
				<li>完成条件</li>
				<li>开店成功</li>
			</ul>
		</div>
		<div class="content">
			<p>您已经一次性充值/消费满200元以上，已经完成店长生成条件，点击下一步马上成为店长吧！</p>
			<div class="middle">
				<span>成为店长还差一步哦！</span>
			</div>
		</div>
		
		<div class="footer">
			<p class="btn"><router-link to='/applySuccess'><input type="button" value="下一步" /></router-link></p>
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
		mounted(){
			sessionStorage.removeItem("num")
			sessionStorage.removeItem("shopMancenter")
		},
		methods:{
			backgo(){
				this.$router.go(-1)
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
#lastOne{
	background:#F5F5F5 ;
	.centers{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.nav{
		overflow: hidden;
		margin-bottom:5px;
		background: url(../common/image/shopImg/icon_进度条2@2x.png) no-repeat;
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
			li:last-child{
				color: #CCCCCC;
			}
		}
	}
	.content{
		padding: 10px;
		font-size: .35rem;
		color: rgb(51, 51, 51);
  		line-height: 1.458;
  		background: white;
	}
	.middle{
		font-size: .4rem;
		min-height:400px;
		max-height: 50%;
		/*color:#ff403c;*/
		text-align: center;
		line-height:18;
		background: url(../common/image/shopImg/house.png) no-repeat;
		background-size:40%;
		background-position: 50%;
	}
	.footer{
		padding: 10px;
		padding-top: 0px;
		.btn{
			input{
				width: 100%;
				height: 100%;
				background: #ff403c;
				padding: 10px;
				border-radius: 10px;
				color:white;
				font-size: .4rem;
			}
		}
	}
	
}
</style>

