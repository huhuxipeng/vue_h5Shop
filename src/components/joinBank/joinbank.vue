<template>
	<div id="joinbank">
		<mt-header title="添加银行卡" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<p>请绑定持卡人本人的银行卡</p>
			<div class="content">
				<div class="person">
					<u class="num">持卡人</u>
					<input type="text" v-model="name" placeholder="请输入您的姓名" />
				</div>
				<div class="carnumber">
					<u class="num">卡号</u>
					<input type="number" v-model="cardnum" placeholder="请输入您的卡号" />
				</div>
			</div>
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
			this.token = sessionStorage.getItem("token")
		},
		methods: {
			backgo() {
				this.$router.go(-1)
			},
			gonext() {
			  if(this.name!=''&&this.cardnum!=''){
          this.$axios({
            method: 'post',
            url: '/member/bankCardCertificate',
            responseType: 'json',
            data: {
              token: this.token,
              cardNum: this.cardnum,
              cardholder: this.name
            }
          }).then(data => {
            if(data.data.res_code == 0) {
              sessionStorage.cardtype = JSON.stringify(data.data.res_data.result)
              this.$router.push('/bank/lastjoinbank');
              console.log(data.data.res_data.information.cardtype)

            } else {
              alert(data.data.res_info)
            }
          }).catch(err => {
            console.log(err)
          })
        }else{
			    alert('请完善信息')
        }


			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#joinbank {
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
