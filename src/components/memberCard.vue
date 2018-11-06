<template>
	<div id="memberCard">
		<mt-header title="会员充值" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="top">
			<div class="topleft">
				<img src="../common/image/defaultimg.png"/>
				<span class="name">柚柚_1772</span>
			</div>
			<div class="topright">
				<img src="../common/image/vip1.png"/>
			</div>
		</div>
		<div class="combo">
			<p>巨柚会员套餐</p>
			<ul class="combolist">
				<li  v-for="(item,index) in normsList" @click="norms(index)" :class="{'col':index==bol}">
					<p class="money">{{item.money}}元</p>
					<p class="types">{{item.baoyue}}<span>({{item.time}})</span></p>
				</li>
			</ul>
			<p class="btn" @click="topup">立即充值</p>
		</div>
		<div class="benefit">
			<p>会员权益</p>
			<ul class="benefitlist">
				<li>
					<img src="../common/image/audit.png"/>
					<p>超值礼包</p>
				</li>
				<li>
					<img src="../common/image/audit.png"/>
					<p>超值礼包</p>
				</li>
				<li>
					<img src="../common/image/audit.png"/>
					<p>超值礼包</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				normsList:[{'money':180,'baoyue':'连续包月','time':'自动续费'},{'money':200,'baoyue':'连续包月','time':'1个月'},{'money':570,'baoyue':'连续包月','time':'3个月'},{'money':2300,'baoyue':'连续包月','time':'12个月'}],
				bol:''
			}
		},
		methods:{
			backgo(){
				this.$router.go(-1)
			},
			topup(){
				alert('充值成功')
			},
			norms(index){
				for(let i=0;i<this.normsList.length;i++){
					if(index==i){
						this.bol=index
						
					}
				}
			}
		}
	}
	
	
</script>

<style lang="scss" scoped="scoped">
#memberCard{
	background: #F5F5F5;
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.top{
		padding: 10px;
		font-size:.3rem;
		background: white;
		display: flex;
		justify-content: space-between;
		margin-bottom: .4rem;
		.topleft{
			img{
				width:1.5rem;
				height:1.5rem;	
				border-radius: 50%;
				vertical-align: middle;
				margin-right: .2rem;
				margin-left: .5rem;
			}
		}
		.topright{
			img{
				width:.7rem;
				height:.7rem;
				margin-top: .4rem;	
				margin-right: .2rem;
				vertical-align: middle;
			}
		}
	}
	.combo{
		padding: 10px;
		font-size: .4rem;
		background: white;
		margin-bottom: .2rem;
		.combolist{
			margin-top:.3rem;
			text-align:center;
			li{
				width:3.95rem;
				border: 1px solid #ccc;
				float: left;
				margin-bottom: .3rem;
				padding: 10px;
				.money{
					font-size:.6rem;
					color: orangered;
				}
				p:nth-child(2){
					font-size: .3rem;
					margin-top: .2rem;
					span{
						color: #ccc;
						font-size: .1rem;
					}
				}
			}
			li:nth-child(2n){
				margin-left: .32rem;
			}
			.col{
				border-color: orangered;
			}
		}
		.combolist:after{
			display: block;
			content: "";
			clear: both;
		}
		.btn{
			margin-top: .3rem;
			color: white;
			text-align: center;
			font-size: .5rem;
			letter-spacing: 2px;
			border-radius: 50px;
			padding: 15px;
			background: url(../common/image/btnbg.png) no-repeat;
		}
	}
	.benefit{
		background: white;
		padding: 10px;
		p:nth-child(1){
			font-size: .4rem;
			
		}
		.benefitlist{
			margin-top:1rem;
			display: flex;
			text-align: center;
			li{
				flex: 1;
				font-size: 12px;
				color: #ccc;
				img{
					width: 1rem;
					margin-bottom: .2rem;
				}
			}
		}
	}
}
</style>
