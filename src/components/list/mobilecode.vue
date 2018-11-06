<template>
	<div id="mobilecode">
		<mt-header flexd title="手机验证" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<p>
				<span>手机号</span>
				<span><input type="number" placeholder="请输入您的手机号" v-model='mobile'/></span>
				<span class="code" @click="code">获取验证码</span>
			</p>
			<p>
				<span>验证码</span>
				<span><input type="number" v-model='code' placeholder="请输入验证码"/></span>
			</p>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mobile:'',
				code:'',
				
			}
		},
		methods:{
			backgo(){
				this.$router.go(-1)
			},
			code(){
				
			},
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
#mobilecode{
	.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.main{
		padding: 10px;
		font-size: .4rem;
		p{
			padding-top:20px;
			padding-bottom: 20px;
		}
	}
}
</style>