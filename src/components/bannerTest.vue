<template>
	<div class="banner">
		<img src="../common/image/bnner.jpg" :onerror='logo'/>
		<input type="button" value="返回" @click="back"/>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				logo:'this.src="'+require('../common/image/defaultimg.png')+'"'
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.banner{
	img{
		width: 100%;
		height: 100%;
	}
	input{
		background: orange;
		color: white;
		padding: 10px;
		border-radius:10px;
	}
}
</style>