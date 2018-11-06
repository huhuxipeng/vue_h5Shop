<template>
	<div id="topsucc">
		<mt-header flexd title="充值" class="header">
			<mt-button icon="back" ></mt-button>
		</mt-header>
		<div class="main">
			<div class="log" v-if='success'>
				<img src="../../common/image/topupimg/topsuccess.png"/>
				<p>充值成功</p>
				<p class="oks" @click="oks">完成</p>
			</div>
			<div class="logs" v-if='!success'>
				<img src="../../common/image/topupimg/loser.png"/>
				<p>充值失败</p>
				<p class="again" @click="again">重新充值</p>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
				success:true
			}
		},
		mounted:function(){
			if(sessionStorage.getItem('num')==1){
				this.success=true
			}else{
				this.success=false
			}
		},
		methods:{
			oks(){
				if(sessionStorage.getItem("shopMancenter")){
					this.$router.push('/lastOne')
					sessionStorage.removeItem('num')
				}else{
					this.$router.push('/percenter')
					sessionStorage.removeItem('num')
				}
				
			},
			again(){
				this.$router.push('/topup')
			},
//			backgo(){
//				this.$router.go(-1)
//				sessionStorage.removeItem('num')
//			}
		}
	}
</script>

<style lang="scss" scoped>
#topsucc{
	.header{
		background:white;
		padding:10px;
		color:black;
		font-size:.5rem;
		border-bottom:1px solid #EEEEEE;
	}
	.main{
		width: 100%;
		height:500px;
		.log,.logs{
			margin-top: 40%;
			width: 100%;
			text-align: center;
			font-size: .4rem;
			img{
				width:20%;
				margin-bottom:.1rem;
			}
			.oks,.again{
				margin: auto;
				margin-top:1.5rem;
				text-align: center;
				line-height: 1rem;
				color: white;
				font-size: .4rem;
				width:3rem;
				height:1rem;
				background: #ff403c;
				border-radius: 5px;
			}
		}
	}
}
</style>