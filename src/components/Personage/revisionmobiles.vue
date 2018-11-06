<template>
	<div id="revisionmobile">
		<commonTop header-title="修改手机号" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		
		
		<p class="hint">已经向[{{mobile}}]发送验证码</p>
		<div class="content">

			<div class="code">
				<u class="num">验证码</u>
				<input type="number" v-model="code" placeholder="请输入验证码" />
				<span class="time">获取验证码</span>
			</div>
			<p class="next" @click="nexts">下一步</p>
		</div>
	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				mobile:'',
				code: '',
				detail:{}
		
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.detail = JSON.parse(sessionStorage.getItem("details"))
			console.log(this.detail)
			this.mobile = this.detail.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			let times=60;
			var tim = document.getElementsByClassName("time")[0];

				tim.innerHTML=times+"S";
				var time=setInterval(function(){
					times--;
					tim.innerHTML=times+"S";
						if(times<=0){
							tim.innerHTML="获取验证码";
							clearInterval(time);
						}
					},1000);

		},
		methods: {
			
			nexts(){
				console.log(this.detail.mobile)
				let token =sessionStorage.getItem('token')
				this.$axios({
					method:'post',
					url:'/member/checkCode',
					responseType:'json',
					data:{
						code:this.code,
						mobile:this.detail.mobile,
						type:4,
						token:token
					}
				}).then(data=>{
					console.log(data)
					if(data.data.res_code==0){
						this.$router.push('/midefier/boundmobile')
					}
				}).catch(err=>{
					console.log(err)
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
		.hint {
			background: #eee;
			padding: .3rem;
			color: #ccc;
			font-size: .4rem;
		}
		.content {
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
			input {
				font-size: .35rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.time {
				padding: .2rem;
				font-size: .3rem;
				display: inline-block;
				position: absolute;
				right: 0;
				vertical-align: middle;
				background: white;
				color: orangered;
			}
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
		.code{
			background: white;
		}
	}
</style>