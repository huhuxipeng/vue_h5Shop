<template>
	<div id="detail">
		<mt-header flexd title="充值明细" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<ul class="details">
			<li>
				<div class="tit">
					<p>微信</p>
					<p>2017-07-07</p>
				</div>
				<div class="money">
					<p>+200.00</p>
				</div>
			</li>
			<li>
				<div class="tit">
					<p>支付宝</p>
					<p>2017-07-07</p>
				</div>
				<div class="money">
					<p>+200.00</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {Header} from 'mint-ui'
	export default{
		methods:{
			backgo(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#detail{
		.header{
			background:white;
			padding:10px;
			color:black;
			font-size:.5rem;
		}
		.details{
			li{
				display: flex;
				justify-content: space-between;
				padding: 10px;
				border-top: 1px solid #ccc;
				.tit{
					
					p:nth-child(1){
						font-size: .5rem;
					}
					p:nth-child(2){
						color: #ccc;
						font-size: .4rem;
						line-height: 2;
					}
				}
				.money{
					font-size: .5rem;
				}
			}
		}
	}
</style>