<template>
	<div id="depositsuccess">
		<mt-header flexd title="提现详情" class="shop">
			<!--<mt-button icon="back" @click="backgo" slot="left"></mt-button>-->
		</mt-header>
		
		<div class="main">
			<p><img src="../../common/image/percenterImg/depositsuccess.png"/></p>
			<p>预计1-3个工作日到账</p>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			backgo(){
//				this.$router.push('/percenter')
			}
		},
		mounted(){
			let that=this
			setTimeout(function(){
				that.$router.push('/integral')
			},2000)
		},
	}
</script>

<style lang="scss" scoped="scoped">
#depositsuccess{
	
	.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.main{
		text-align: center;
		font-size: .4rem;
		margin-top: 1.5rem;
		p:first-child{
			img{
				width: 50%;
				height: 50%;
			}
			margin-bottom:1.5rem;
		}
		
	}
}
</style>