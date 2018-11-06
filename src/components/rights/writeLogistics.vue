<template>
	<div id="writeLogistics">
		<commonTop header-title="退货物流" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<p @click="change">
				<span>物流公司</span>
				<span><input type="text" v-model="name" placeholder="选择物流信息" disabled="disabled"/></span>
				<span><img src="../../common/image/percenterImg/iconkey.png"/></span>
			</p>
			<p>
				<span>物流单号</span>
				<span><input type="number" v-model="odd" placeholder="填写物流单号"/></span>
				<span></span>
			</p>
			<p>
				<span>退货说明</span>
				<span><input type="text" v-model='value' placeholder="选填"/></span>
				<span></span>
			</p>
		</div>

		<div class="footer" @click="submit">
			<p>提交</p>
		</div>

		<mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup'>
			<div class="popupTop">
				<p>选择物流公司</p>
				<p class="cancle" @click="cancle">取消</p>
			</div>
			<ul class="content">
				<li v-for="(item,index) in contents" @click="changevalu(index)">
					<span><input type="checkbox" class="check" v-model="checks"/></span>
					<span>{{item.logiName}}</span>
				</li>
			</ul>
		</mt-popup>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	import { Popup, Picker } from 'mint-ui'
	export default {
		data() {
			return {
				value: '',
				rightOrderId: 0,
				odd: '',
				checks: false,
				popupVisible: false,
				name: '',
				contents: [],
				token: '',
				logiId: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.rightOrderId = this.$route.query.id
			this.token = sessionStorage.getItem("token");
		},
		methods: {
			change() {
				this.popupVisible = true
				this.$axios({
					method: 'post',
					url: '/order/right/inputDelivery',
					responseType: 'json',
					data: {
						rightOrderId: this.rightOrderId,
						token: this.token
					}
				}).then(data => {
					this.contents = data.data.res_data.logiList
					console.log(data)
				}).catch(err => {
					console.log(err)
				})

			},
			cancle() {
				this.popupVisible = false
				this.name = '选择物流信息'
			},
			submit() {
				if(this.odd == ''||this.name=='') {
					alert("请填写完整数据")
				} else {
					this.$axios({
						method: 'post',
						url: 'order/right/submitDelivery',
						rsponseType: 'json',
						data: {
							logiId: this.logiId,
							logiNo: this.odd,
							rightOrderId: this.rightOrderId,
							token: this.token
						}
					}).then(data => {
						if(data.status==200) {
							if(data.data.res_code==1){
								alert(data.data.res_info)
							}else{
								this.$router.go(-1)
							}
						}
					}).catch(err => {
						console.log(err)
					})
				}

			},
			changevalu(index) {
				this.checks = !this.checks;
				for(let i = 0; i < this.contents.length; i++) {
					if(index == i) {
						document.getElementsByClassName("check")[i].style.background = "red";
						this.name = this.contents[i].logiName
						this.logiId = this.contents[i].logiId
						this.popupVisible = false
					} else {
						document.getElementsByClassName("check")[i].style.background = "none"
					}
				}

			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#writeLogistics {
		background: #DCDCDC;
		.main {
			p {
				display: flex;
				font-size: .4rem;
				vertical-align: middle;
				background: white;
				padding: .3rem;
				span {
					flex: 1;
					display: inline-block;
					input {
						padding: .2rem;
						background: white;
					}
				}
				span:first-child {
					padding-top: .2rem;
				}
			}
			p:first-child {
				span:last-child {
					flex: 1;
					text-align: right;
					img {
						padding-top: .1rem;
					}
				}
			}
			p:last-child {
				margin-top: .4rem;
			}
		}
		.footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			p {
				padding: .3rem;
				text-align: center;
				color: white;
				background: orangered;
				font-size: .4rem;
			}
		}
		.popup {
			width: 100%;
			font-size: .5rem;
			padding: 10px;
			.addlit {
				height: 5rem;
			}
			.popupTop {
				text-align: center;
				.cancle {
					/*border: 1px solid #ccc;
					border-radius: 5px;*/
					float: right;
					padding: .2rem;
					font-size: .4rem;
					margin-right: .3rem;
					margin-top: -.5rem;
				}
			}
			.content {
				li {
					margin-bottom: .3rem;
					font-size: .4rem;
					span:first-child {
						.check {
							margin-left: .3rem;
							vertical-align: middle;
							width: .4rem;
							height: .4rem;
							border: 1px solid #ccc;
							border-radius: 50%;
							outline: none;
						}
					}
				}
			}
		}
	}
</style>