<template>
	<div id="boundRawpassword">
		<commonTop :header-title="title" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="raw" v-if='state==1'>
				<u class="num">原密码</u>
				<input type="password" v-model="password" placeholder="原新密码" />
			</div>
			<div class="passwording">
				<u class="num">密码</u>
				<input type="password" v-model="passwording" placeholder="新密码" />
			</div>
			<div class="passworded">
				<u class="num">确认密码</u>
				<input type="password" v-model="passworded" placeholder="确认密码" />
			</div>
			<div class="forgetPasswords" v-if='state==0'>
				<p>密码请输入6位数字</p>
			</div>
			<div class="forgetPassword" @click="raw" v-if='state'>
				<p>忘记原密码？</p>
			</div>
			<p class="next" @click="success">完成</p>
		</div>
	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				password: '',
				passwording: '',
				passworded: '',
				title: '设置支付密码',
				state: 0,

			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.state = Number(this.$route.query.set)
			if(this.state == 1) {
				this.title = '修改支付密码'
			} else {
				this.title = '设置支付密码'
			}
		},
		methods: {
			raw() {
				this.$router.push('/midefier/mobileRaw')
			},
			success() {
				let token = sessionStorage.getItem('token')
				let urls;
				let datas = {};
				this.passwording=this.passwording.replace(/\s|\xA0/g,"")
				if(this.state == 1) {
					urls = '/member/updateMemberInfo'
					datas = {
						'newPayPassword': this.passwording,
						'token': token,
						'payPassword': this.password
					}
				} else if(this.state == 0) {
					urls = '/member/setPassword';
					datas = {
						'payPassword': this.passwording,
						'token': token
					}
				}

				if(this.passwording == "" || this.passworded == "") {
					alert('密码不能为空')
				} else if(this.passwording != this.passworded) {
					alert('两次密码输入不一致')
				} else {
					if(this.passwording.length == 6) {
						this.$axios({
							method: 'post',
							url: urls,
							responseType: 'json',
							data: datas,
						}).then(data => {
							console.log(data)
							if(data.status == 200) {
								if(data.data.res_code==0){
								  alert('修改成功')
									this.$router.go(-1)
								}else{
									alert('输入有误')
									for(let i=0;i<$('input').length;i++){
										$('input').val('')
									}
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						alert('请设置六位密码')
					}

				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	#boundRawpassword {
		.main {
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
			background:white;
			.num {
				width: 2rem;
				height: 0.59rem;
				display: inline-block;
				vertical-align: middle;
				font-size: .4rem;
				text-align: left;
			}
			input {
				font-size: .4rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.raw,
			.passwording,
			.passworded,
			.forgetPassword,
			.forgetPasswords {
				margin-bottom: .3rem;
			}
			.forgetPasswords {
				color: #C8C8CD;
				font-size: .4rem;
			}
			.forgetPassword {
				color: #C8C8CD;
				font-size: .4rem;
				text-align: right;
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
