<template>
	<div id="consult">
		<mt-header title="客服" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<ul class="content">
				<li v-for='(item,index) in chatcontent' class="list" :class="{'self':item.type==1}">
					<span class="lang" v-if='item.type==1'><i></i>{{item.content}}<i></i></span>
					<img :src="item.face |filterss(4)" :onerror='logo' />
					<span class="lang" v-if='item.type==2'><i></i>{{item.content}}<i></i></span>
				</li>
			</ul>
		</div>
		<div class="footer">
			<input type="text" id="" v-model="textcontent" />
			<button class="btn" @click="submit" disabled>发送</button>
		</div>
	</div>
</template>

<script>
	import '../../api/stomp'
	export default {
		data() {
			return {
				textcontent: '',
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				chatcontent: [],
				indexId: 0,
				token: '',
				stompClient:null,
				num:0
			}
		},

		mounted() {
			if(localStorage.getItem('andro')) {
				alert(localStorage.getItem('andro'))
			}
			this.num=this.$route.query.outId
			this.token = sessionStorage.getItem("token")
			this.connect();
		},
		methods: {
			connect() {
				var that = this;
//				var stompClient = null;
				var socket = new SockJS('http://124.72.51.186:13003/ricky-websocket');
				that.stompClient = Stomp.over(socket);
				that.stompClient.connect({
					login: that.token,
					outId:that.num
				}, function(frame) {
					that.stompClient.subscribe('/user/topic/greetings', function(greeting) {
						let bodys = JSON.parse(greeting.body)
						console.log(greeting.body)
						that.indexId = that.chatcontent.length + 1;
						that.chatcontent.push({
							'type': 2,
							'id': that.indexId,
							'face': require('../../common/image/defaultimg.png'),
							'content': bodys.content
						})

					});
				});
			},
			disconnect() {
				if(this.stompClient != null) {
					this.stompClient.disconnect();
				}
				console.log("Disconnected");
			},
			backgo() {
//				sessionStorage.chatContent=JSON.stringify(this.chatcontent)
				this.disconnect();
				this.$router.go(-1)
			},
			submit() {
				this.indexId = this.chatcontent.length + 1;
				this.chatcontent.push({
					'type': 1,
					'id': this.indexId,
					'face': JSON.parse(sessionStorage.getItem("details")).weixinFace || '',
					'content': this.textcontent
				})

				this.$axios({
					method: 'post',
					url: '/member/sendInfo',
					responseType: 'json',
					data: {
						token: this.token,
						sendMessage: this.textcontent,
						outId:this.$route.query.outId
					}
				}).then(data => {
					if(data.status == 200) {
						this.textcontent = '';
					}
				}).catch(err => {
					console.log(err)
				})

			},

		},
		watch: {
			textcontent() {
				if(this.textcontent == '') {
					$('.btn').attr('disabled', true)
				} else {
					$('.btn').removeAttr('disabled')
				}
			},
			chatcontent() {

			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#consult {
		.center {
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: 10px;
		}
		.main {
			padding: .3rem;
			overflow: hidden;
			.content {
				.list {
					width: 9.35rem;
					height: auto;
					vertical-align: middle;
					float: left;
					img {
						width: 1rem;
						height: 1rem;
						border-radius: .1rem;
						vertical-align: middle;
						margin-right: .3rem;
					}
					.lang {
						height: .7rem;
						background: orange;
						padding: .2rem;
						border-radius: .2rem;
						color: white;
						text-align: center;
						padding-left: .4rem;
						i:first-child {
							display: inline-block;
							width: 0;
							height: 0;
							border-bottom: .2rem solid transparent;
							border-top: .2rem solid transparent;
							border-right: 10px solid orange;
							margin-left: -.6rem;
							margin-top: 1rem;
						}
						i:last-child {
							display: inline-block;
							width: 0;
							height: 0;
							border-bottom: .2rem solid transparent;
							border-top: .2rem solid transparent;
							border-left: 10px solid orange;
							margin-right: -.4rem;
							margin-top: 1rem;
						}
						i:first-child {
							display: inline-block;
						}
						i:last-child {
							display: none;
						}
					}
				}
				.self {
					vertical-align: bottom;
					text-align: right;
					img {
						margin-left: .3rem;
						margin-right: 0;
						border-radius: .1rem;
					}
					.lang {
						i:first-child {
							display: none;
						}
						i:last-child {
							display: inline-block;
						}
					}
				}
			}
		}
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			padding: .3rem;
			.btn {
				flex: 1;
				padding: .2rem;
				padding-left: .3rem;
				padding-right: .3rem;
				text-align: center;
				border: none;
				border-radius: .2rem;
				color: yellow;
				background: orangered;
				float: right;
			}
			input {
				flex: 4;
				border: 1px solid #ccc;
				border-radius: .2rem;
				padding: .2rem;
				margin-right: .1rem;
			}
		}
	}
</style>
