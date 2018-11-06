<template>
	<div id="bankcode">
		<mt-header title="验证手机" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<p>本次操作需要短信确认，请输入<br />{{mobile}}收到的短信验证码</p>
			<div class="content">

				<div class="carnumber">
					<u class="num">校验码</u>
					<input type="number" v-model="code" placeholder="请输入校验码" />
					<u @click="mycode">{{times}}</u>
				</div>
			</div>
		</div>
		<footer>
			<p @click="gonext">完成</p>
		</footer>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				phone: '',
				code: '',
				times: '点击获取校验码',
				token: ''
			}
		},
		mounted() {
			console.log(sessionStorage.getItem('cardtype'))
			this.phone = sessionStorage.getItem('mobile')
			this.token = sessionStorage.getItem('token')
			this.mobile = sessionStorage.getItem('mobile').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			this.times = 60;
			let that = this
			var time = setInterval(function() {
				that.times--;
				if(that.times <= 0) {
					that.times = "点击获取校验码";
					clearInterval(time);
				}
			}, 1000);

		},
		methods: {
			backgo() {
				this.$router.go(-1)
			},
			gonext() {
				this.$axios({
					method: 'post',
					url: '/member/checkCodeBankCard',
					responseType: 'json',
					data: {
						code: this.code,
						mobile: this.phone,
						token: this.token,
						type: 6,
						json:sessionStorage.getItem('cardtype')
					}
				}).then(data => {
					if(data.data.res_code == 0) {
						sessionStorage.BANK = 1
						this.$router.push('/bank/lastone')
					} else {
						sessionStorage.BANK = 0
						this.$router.push('/bank/lastone')
					}
				}).catch(err => {
					console.log(err)
				})

			},
			mycode() {
				if(typeof(this.times) != 'number') {
					this.times = 60;
					let that = this
					var time = setInterval(function() {
						that.times--;
						if(that.times <= 0) {
							that.times = "点击获取校验码";
							clearInterval(time);
						}
					}, 1000);
					this.$axios({
						method: 'post',
						url: '/member/mobileCheck',
						responseType: 'json',
						data: {
							mobile: this.phone,
							token: this.token,
							type: 6
						}
					}).then(data => {
						console.log(data)
					}).catch(err => {
						console.log(err)
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#bankcode {
		background: #eee;
		input[type=number]::-webkit-inner-spin-button,
		input[type=number]::-webkit-outer-spin-button {
			-webkit-appearance: none;
		}
		.centers {
			padding: .3rem;
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: .2px;
		}
		.main {
			p {
				padding: .3rem;
				line-height: 1.5;
				font-size: .45rem;
				text-align: center;
			}
			.carnumber {
				font-size: .4rem;
				padding: .3rem;
				background: white;
				.num {
					text-align: center;
					width: 1.5rem;
					display: inline-block;
				}
				input {
					padding: .2rem;
					width: 4rem;
				}
				u:nth-child(3) {
					color: orangered;
					text-align: center;
				}
			}
		}
		footer {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			p {
				padding: .3rem;
				background: orangered;
				color: white;
				text-align: center;
			}
		}
	}
</style>