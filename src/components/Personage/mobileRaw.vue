<template>
	<div id="mobilRaw">
		<commonTop header-title="手机验证修改" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="code">
				<u class="num">手机号</u>
				<input type="number" v-model="phones" placeholder="请输入您的手机号码" />
				<button class="time" @click="gets">获取验证码</button>
			</div>
			<div class="mobile">
				<u class="num">验证码</u>
				<input type="text" v-model="codes" placeholder="验证码" />
			</div>

			<div class="passwording">
				<u class="num">新密码</u>
				<input type="password" v-model="passwording" placeholder="新密码" />
			</div>
			<div class="passworded">
				<u class="num">确认密码</u>
				<input type="password" v-model="passworded" placeholder="确认密码" />
			</div>

			<p class="next" @click="nexts">确认</p>
		</div>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				phones: '',
				passwording: '',
				passworded: '',
				codes: '',
				token: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
		},
		methods: {
			nexts() {
				if(this.passwording.length == 6 && this.passworded.length == 6) {
					if(this.passwording == this.passworded) {
						this.$axios({
							method: 'post',
							url: '/member/forgetPayPassword',
							responseType: 'json',
							data: {
								mobile: this.phones,
								token: this.token,
								newPayPassword: this.passwording,
								code: this.codes
							}
						}).then(data => {
							console.log(data)
              if(data.data.res_code==0){
							  this.$router.go(-1)
              }else{
							  alert(data.data.res_info)
              }
						}).catch(err => {
							console.log(err)
						})
					} else {
						alert('两次密码输入不一致')
						this.passwording = '',
							this.passworded = ''
					}
				} else {
					alert('输入六位密码')
				}

			},
			gets() {
				var reg = /^1[3|5|7|8]\d{9}$/;
				if(!reg.test(this.phones)) {
					alert('手机号不正确')
				} else {
					let times = 60;
					var tim = document.getElementsByClassName("time")[0];
					tim.setAttribute("disabled", "disabled")
					tim.innerHTML = times + "S";
					var time = setInterval(function() {
						times--;
						tim.innerHTML = times + "S";
						if(times == 0) {
							tim.removeAttribute("disabled");
							tim.innerHTML = "获取验证码";
							clearInterval(time);
						}
					}, 1000);

					this.$axios({
						method: 'post',
						url: "/member/mobileCheck",
						responseType: 'json',
						data: {
							mobile: this.phones,
              token:this.token,
							type: 4
						}
					}).then(data => {
						console.log(data)
					}).catch(err => {
						console.log(err);
					})

				}
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#mobilRaw {
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
				font-size: .35rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.num {
				width: 2rem;
				height: 0.59rem;
				display: inline-block;
				vertical-align: middle;
				margin-right: 0.33rem;
				font-size: .4rem;
			}
			.mobile {
				margin-bottom: .3rem;
			}
			.code {
				margin-bottom: .3rem;
				.time {
					padding: .2rem;
					font-size: .3rem;
					display: inline-block;
					position: absolute;
					right: 8%;
					vertical-align: middle;
					background: white;
					border: none;
					outline: none;
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
		}
	}
</style>
