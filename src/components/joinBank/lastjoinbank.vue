<template>
	<div id="lastjoin">
		<mt-header title="填写银行卡信息" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<p>请选择银行卡类型</p>
			<div class="content">
				<div class="person">
					<u class="num">卡类型</u>
					<input type="text" v-model="name" placeholder="请输入您的卡类型" />
				</div>
				<div class="carnumber">
					<u class="num">手机号</u>
					<input type="number" v-model="cardnum" placeholder="请输入您的手机号" />
				</div>
			</div>
			<p>信息加密处理，仅用于银行卡验证</p>
		</div>
		<footer>
			<p @click="gonext">下一步</p>
		</footer>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				cardnum: '',
				token: ''
			}
		},
		mounted() {
			this.name = JSON.parse(sessionStorage.getItem('cardtype'))
			this.name=this.name.information.cardtype
			this.token = sessionStorage.getItem('token')
		},
		methods: {
			backgo() {
				this.$router.go(-1)
			},
			gonext() {
				var reg = /^1[3|5|7|8]\d{9}$/;
				if(reg.test(this.cardnum)) {
					this.$axios({
						method: 'post',
						url: '/member/mobileCheck',
						responseType: 'json',
						data: {
							mobile: this.cardnum,
							token: this.token,
							type: 6
						}
					}).then(data => {
						console.log(data)
						if(data.data.res_code == 0) {
							sessionStorage.mobile = this.cardnum;
							this.$router.push('/bank/bankcode')
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					alert('手机格式不正确')
				}

			}
		}
	}
</script>

<style lang='scss' scoped="scoped">
	#lastjoin {
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
				padding: .2rem;
				color: #999;
				font-size: .4rem;
			}
			p:nth-child(3) {
				text-align: center;
				font-size: .3rem;
			}
			.person,
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