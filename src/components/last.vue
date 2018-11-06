<template>
	<div id="last">
		<mt-header flexd title="店长中心" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<!--申请成功-->
		<div class="success" v-if="shows">
			
		</div>
		<!--申请失败-->
		<div class="error" v-if="!shows">
		
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui'
	export default{
		data(){
			return{
				shows:true,
			}
		},
		created(){
			let tim;
//			if(this.shows){
//				tim=setTimeout(()=>{
//					this.$router.push('/applySuccess')
//					clearTimeout(tim);
//				},2000)
//			}else{
//				tim=setTimeout(()=>{
//					this.$router.push('/lastOne')
//					clearTimeout(tim);
//				},2000)
//			}
			
		},
		methods:{
			backgo(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">

#last{
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.success{
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 60px;
		background:url(../common/image/shopImg/success.png) no-repeat;
		background-size: 40%;
		background-position: 50%;
	}
	.error{
		
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 60px;
		background:url(../common/image/shopImg/error.png) no-repeat;
		background-size: 40%;
		background-position: 50%;
	}	
	
}
</style>