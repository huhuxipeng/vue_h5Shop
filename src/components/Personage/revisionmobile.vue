<template>
	<div id="revisionmobile">
		<commonTop header-title="修改手机号" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="name">
				<u class="num">修改手机号</u>
				<input type="number" :placeholder="mobile" disabled/>
			</div>
			<p class="next" @click="right">确认</p>
		</div>	
	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				detail:''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.detail = JSON.parse(sessionStorage.getItem("details"))
			this.mobile = this.detail.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

		},
		methods: {
			right() {
				let token=sessionStorage.getItem('token')
				console.log(this.detail)
				this.$axios({
					method:'post',
					url:"/member/mobileCheck",
					responseType: 'json',
					data:{
						mobile:this.detail.mobile,
						token:token,
						type:4
					}
				}).then(data=>{
					if(data.status==200){
						console.log(data.data)
						this.$router.push('/midefier/revisionmobiles')
					}else{
						alert(data.data.res_info)
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#revisionmobile {
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none !important;
			margin: 0;
		}
		.main {
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
			input {
				font-size: .4rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
				background: white;
			}
			.name {
				font-size: .4rem;
				margin-bottom: .3rem;
			}
			.next {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				padding: .3rem;
				font-size: .4rem;
				color: white;
				background: orangered;
			}
		}
		
	}
</style>