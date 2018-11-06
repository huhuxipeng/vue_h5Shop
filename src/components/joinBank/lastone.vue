<template>
	<div id="lastone">
		<mt-header title="添加结果" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="success" v-if='num==1'>
			<img src="../../common/image/success.png"/>
		</div>
		<div class="lose" v-else>
			<img src="../../common/image/lose.png"/>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				num:1
			}
		},
		mounted(){
			this.num=sessionStorage.getItem('BANK')
		},
		methods:{
			backgo(){
				this.$router.push('/bank/banklist')
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
#lastone{
	padding: .2rem;
	.centers {
		padding: .3rem;
		background: #fff;
		color: black;
		height: auto;
		font-size: .5rem;
		padding: .2px;
	}
	
	.success,.lose{
		height:5rem;
		width:5rem;
		
		margin: auto;
		margin-top: 2rem;
		img{
			width: 100%;
			height:100%;
		}
	}
}
</style>