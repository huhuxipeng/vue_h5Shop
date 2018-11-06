<template>
	<div id="perindex">
		<mt-header flexd title="个人信息" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="basic">
			<p class="ps"><span>ID</span><span>{{detail.memberId}}</span></p>
			<p class="log ps">
				<span>头像</span>
				<span>
					<input type="file" @change="setlog($event)" id="fils"/>
					<img :src="detail.face" :onerror='logo'/>
					<canvas id="canvas" style="display: none;"></canvas>
				</span>
			</p>
			<p class="ps" @click="setnickname"><span>昵称</span><span>{{detail.nickname?detail.nickname:'未设置'}} <i>></i></span></p>
			<!--<p class="ps" @click="setmobile"><span>手机号</span><span>{{mobile?mobile:'未设置'}}<i>></i></span></p>-->
		</div>
		<div class="password">
			<p class="ps" @click="setpassword"><span>余额支付密码</span><span>{{detail.payPassword!=null?'':'未设置'}}<i>></i></span></p>
		</div>
		<p class="outs" @click="out">退出登录</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				detail: {},
				token: '',
				mobile: ''
			}
		},
		mounted() {

			this.token = sessionStorage.getItem('token')
			this.$axios({
				method: 'post',
				url: '/member/jifenyuetongji',
				responseType: 'json',
				data: {
					token: this.token
				}
			}).then(data => {
				this.detail = data.data.res_data.member
				this.mobile = this.detail.mobile
				this.mobile = this.detail.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
				sessionStorage.details = JSON.stringify(data.data.res_data.member)
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			out() {
				sessionStorage.clear();
				localStorage.clear()
				this.$router.push('/login')
			},
			backgo() {
				this.$router.push('/Percenter')
			},
			setlog(even) {


				let resImg = document.getElementsByTagName("img")[0]

				let file = even.target.files;
				if(!/image\/\w+/.test(file[0].type)) {
					alert("请确保文件为图像文件");
					return false;
				}

				 this.$api.photoCompress(file[0], 220, o => {
        let that = this;
		resImg.src = o;
					let str = o;
					that.$axios({
						method: 'post',
						url: '/member/anon/base64UploadImg',
						responseType: 'json',
						data: {
							data: str.substring(str.indexOf(',')+1),
							type:8,
						}
					}).then(data => {
						if(data.status == 200) {
							that.$axios({
								method: "post",
								url: '/member/updateMemberInfo',
								responseType: 'json',
								data: {
                  token:that.token,
									face: data.data.data.filePath
								}
							}).then(data => {
								console.log(data)
							}).catch(err => {
								console.log(err)
							})
						}
					}).catch(err => {
						console.log(err)
					})
		})

			},
			setpassword() {
			  console.log(this.detail.payPassword)
				if(this.detail.payPassword != null) {
					this.$router.push({
						path: '/midefier/boundRawPassword',
						query: {
							set: 1
						}
					})
				} else {
					this.$router.push({
						path: '/midefier/boundRawPassword',
						query: {
							set: 0
						}
					})
				}

			},
			setnickname() {
				this.$router.push('/midefier/revisionname')
			},
			setmobile() {

				if(this.mobile) {
					this.$router.push('/midefier/revisionmobile')
				} else {
					this.$router.push('/midefier/boundmobile')
				}
			},
		},

	}
</script>

<style lang="scss" scoped="scoped">
	#perindex {
		background: #F5F5F5;
		.shop {
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: 10px;
			margin-bottom: .2rem;
		}
		.ps {
			padding: .3rem;
			background: white;
			font-size: .4rem;
			margin-bottom: .1rem;
			display: flex;
			justify-content: space-between;
			span {
				display: inline-block;
			}
		}
		.basic {
			.log {
				line-height: 1.5rem;
				span:last-child {
					width: 1.5rem;
					height: 1.5rem;
					position: relative;
					img {
						border-radius: 10rem;
						width: 90%;
						height: 90%;
					}
				}
				input {
					width: 1.5rem;
					height: 1.5rem;
					opacity: 0;
					position: absolute;
					right: 0;
				}
			}
		}
		.password {
			background: white;
			margin-top: .5rem;
			margin-bottom: .5rem;
		}
		.outs {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: .3rem;
			text-align: center;
			font-size: .4rem;
			color: white;
			background: orangered;
		}
	}
</style>
