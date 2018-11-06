<template>
	<div id="way">
		<mt-header flexd title="提现方式" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="ways">
			<ul>
				<li v-for="(item,$index) in arr">
					<img :src="item.sr |filterss(4)"/>
					<span>{{item.tit}}</span>
					<span v-on:click="ons($index)" :class="{'bg':$index==indexs}"></span>
				</li>
			</ul>
		</div>
		<div class="content">
			<Bank v-if='this.indexs==0'></Bank>
			<!--<Wechat v-if='this.indexs==1'></Wechat>
			<Alipay v-if='this.indexs==2'></Alipay>-->
		</div>

	</div>
</template>

<script>
	import Bank from './bank'
//	import Alipay from './alipay'
//	import Wechat from './wechat'
	export default{
		data(){
			return{
				bg:false,
				arr:[{sr:require('../../common/image/shopImg/bank.png'),tit:'银行卡'},
//				{sr:require('../../common/image/shopImg/web.png'),tit:'微信零钱'},
//				{sr:require('../../common/image/shopImg/alipay.png'),tit:'支付宝'}
				],
				indexs:0
			}
		},
		components:{
			Bank,
//			Alipay,
//			Wechat
		},
		methods:{
			ons(index){
				this.indexs=index

			},
			backgo(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
#way{
	.header{
		background:white;
		padding:10px;
		color:black;
		font-size:.6rem;
		border-bottom:1px solid #eee;
	}
	.ways{
		padding: 10px;
		margin-bottom: 10px;
		li{
			font-size:.4rem;
			padding-top:15px;
			padding-bottom: 15px;
			img{
				vertical-align: middle;
				width:5%;
				height:5%;
				margin-right: 10px;
			}
			span:nth-child(3){
				float: right;
				display: inline-block;
				border: 1px solid #ccc;
				width:20px;
				height:20px;
				border-radius: 50%;
			}
			.bg{
				background:url(../../common/image/shopImg/right.png) no-repeat;
				background-size: 100%

			}
		}
	}
	.content{

	}
}
</style>

