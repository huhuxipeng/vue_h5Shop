<template>
	<div>
    <mt-header title='我的金币' class='center' style="font-weight: 500;">
      <mt-button icon="back" @click="goback" slot="left"></mt-button>
    </mt-header>
		<div>
			<div  class="top">
				<img :src="require('common/image/my_gold.png')"> 我的金币
				<label>{{gold+golds}}</label>
				<button class="button" @click="checkIn"> {{btn}}</button>
			</div>
			<div style="padding: 10px">
				<calendar :marked-date="marked"></calendar>
			</div>
		</div>

		<mt-popup popup-transition="popup-fade" v-model="showhiden">
			<div class="pop">
				<img src="../common/image/my_gold.png" />
				<p><span>+</span><span>{{golds}}</span></p>
				<p>恭喜您获得{{golds}}金币<br />记得每天来签到哦~</p>
				<p class='btn' @click='oks'>知道了</p>
			</div>
		</mt-popup>

	</div>

</template>

<script>
	import Calendar from './calendar/calendar';
	import { Popup } from 'mint-ui';
	export default {
		components: {
			"calendar": Calendar
		},
		data: function() {
			return {
				marked: [],
				token: '',
				gold: 0,
				showhiden: false,
				golds: 0,
				datestring: '',
				btn:'签到领金币'
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token');
			this.datestring = sessionStorage.getItem('DATES');

			this.$axios({
				method: 'post',
				url: '/member/returnSignAndCoin',
				responseType: 'json',
				data: {
					token: this.token,
					month: new Date().getMonth() + 1
				}
			}).then(data => {
				this.gold = data.data.res_data.coins
				for(let i = 0; i < data.data.res_data.signList.length; i++) {
					this.marked.push(this.cycle(data.data.res_data.signList[i].createTime));
				}
				if(this.cycle(this.marked[this.marked.length - 1]) == this.cycle(new Date().getTime())) {
					this.btn='已签到'
				}
			}).catch(err => {
				console.log(err)
			})
		},

		methods: {
		  goback(){
		    this.$router.go(-1)
      },
			cycle(timestamp) {
				var date = new Date(timestamp);
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = date.getDate() + ' ';
				return Y + M + D;
			},
			oks() {
				this.showhiden = false;
			},
			checkIn() {
				let data = new Date();
				let year = data.getFullYear();
				let month = (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1);
				let day = data.getDate();
				let dates = year + '.' + month + '.' + day
				sessionStorage.DATES = year + '.' + month + '.' + day;
				this.$axios({
					method: 'post',
					url: '/member/sign',
					responseType: 'json',
					data: {
						token: this.token,
						coinType: 5
					}
				}).then(data => {

					if(data.data.res_code == 0) {
						this.marked.push(dates);
						this.showhiden = true;
						this.btn='已签到'
						this.golds = data.data.res_data.coinNum
					} else {

						alert(data.data.res_info)
					}

				}).catch(err => {
					console.log(err)
				})

			}
		}
	}
</script>
<style>
	body {
		background: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.mint-header {
		background: #fff;
		color: #000;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 14px;
		color: #333;
		font-size: 12px;
		background: #fff;
		img {
			height: 43px;
			margin-bottom: 6px;
		}
		label {
			margin: 15px 0;
			font-size: 30px;
		}
		.button {
			width: 150px;
			padding: .3rem;
			background: white;
			border-color: orangered;
			color: orangered;
			border-radius: 25px;
			margin-bottom: 23px;
		}
	}

	.mint-popup {
		background: none;
		.pop {
			width: 6rem;
			height: 9rem;
			background: url(../common/image/goldbg.png) no-repeat;
			background-size: 100% 100%;
			text-align: center;
			img {
				width: 1rem;
				margin-top: 4rem;
			}
			p {
				span {
					font-size: .7rem;
				}
				line-height: 2;
			}
			.btn {
				position: fixed;
				bottom: 0;
				left: .4rem;
				right: .45rem;
				background: red;
				padding: .2rem;
				text-align: center;
				color: white;
				font-size: .4rem;
			}
		}
	}
</style>
