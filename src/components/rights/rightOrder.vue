<template>
	<div id="rightOrder">
		<commonTop header-title="维权订单" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="content">
			<section class="goods-simple" v-for="(item,index) in shoppList">
				<div class="store-info">
					<span class="icons store-icon"></span>
					<i>{{item.order.comName}}</i>
					<span class="icons arrow-icon"></span>

				</div>
				<ul class="goods-show">
					<li v-for="(value,key) in item.items" @click="rightdetail(key,item)">
						<img :src="value.goodsImage |filterss(3)" class="store-logo" :onerror="logo">
						<span>
			                <h2>{{value.goodsName}}</h2>
			                <p>规格：{{value.productSpec}}</p>
			            </span>
						<aside>
							<i>×{{value.buyCount}}</i>
							<br />
							<i>￥{{value.price}}</i>
							<i></i>
						</aside>
					</li>
				</ul>
				<!--type[Number(item.type)]-->
				<p class="state"><span>{{item.type}}</span><span>{{item.status}}</span>{{item.showTime | settime}}</p>
				<!--<div class="total-action">
					<span class="btn normal-btn red-btn btn-check" v-if="shoppList[index].orderStatus==3" @click="rightdetail">填写物流信息</span>
					<span class="btn normal-btn red-btn btn-doing" v-if="shoppList[index].orderStatus==6">填写物流信息</span>
				</div>-->
			</section>

		</div>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'

	export default {
		data() {
			return {
				shoppList: [],
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				token: '',
				type: ['仅退款', '退货退款'],
				times: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		filters: {
			//时间转换
			cycle: function(timestamp) {
				var data = new Date(timestamp);

				var Y = data.getFullYear() + '-';
				var M = (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1) + '-';
				var D = (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()) + ' ';
				var h = (data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ':';
				var m = (data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) + ':';
				var s = (data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds());

				return Y + M + D + h + m + s;
			},
			settime(timestamp) {
				let self = this
				let timer = setInterval(function() {
					let nowTime = new Date();
					let endTime = new Date(timestamp * 1000);
					let t = endTime.getTime() - nowTime.getTime();
					if(t > 0) {
						let day = Math.floor(t / 86400000);
						let hour = Math.floor((t / 3600000) % 24);
						let min = Math.floor((t / 60000) % 60);
						let sec = Math.floor((t / 1000) % 60);
						hour = hour < 10 ? "0" + hour : hour;
						min = min < 10 ? "0" + min : min;
						sec = sec < 10 ? "0" + sec : sec;
						let format = '';
						if(day > 0) {
							format = `${day}天${hour}小时${min}分${sec}秒`;
						}
						if(day <= 0 && hour > 0) {
							format = `${hour}小时${min}分${sec}秒`;
						}
						if(day <= 0 && hour <= 0) {
							format = `${min}分${sec}秒`;
						}
						return format
					}
				}, 1000);
			},

		},
		mounted() {
			sessionStorage.removeItem("RIGHT")

			let time = new Date().getTime();

			this.token = sessionStorage.getItem("token");

			this.$axios({
				method: 'post',
				url: '/order/right/page',
				responseType: 'json',
				data: {
					pageNo: 0,
					pageSize: 0,
					token: this.token
				}
			}).then(data => {
				this.shoppList = data.data.res_data.dataList.dataList
				for(let i = 0; i < this.shoppList.length; i++) {
					if(this.shoppList[i].showTime != null) {
						this.shoppList[i].showTime = parseInt((new Date().getTime()) / 1000 + this.shoppList[i].showTime)
					}
					let that = this
					let time = setInterval(function() {
						that.shoppList[i].showTime -= 1
						if(that.shoppList[i].showTime == 0) {
							clearInterval(time);
						}
					}, 1000)
				}

			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			rightdetail(index, val) {
				sessionStorage.RIGHT = JSON.stringify(val)
				this.$router.push({
					path: '/rightDetails',
					query: {
						"id": val.id
					}
				})
			},
			writelog() {
				this.$router.push('/writeLogistics')
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#rightOrder {
		background: #eee;
		.content {
			.goods-simple {
				.state {
					padding: .3rem;
					background: white;
					/*margin-bottom: .3rem;*/
					span:last-child {
						color: orangered;
						margin-left: .3rem;
					}
				}
				.total-action {
					text-align: right;
					padding: 0 0.32rem 0.16rem 0.32rem;
					font-size: 0.32rem;
					background: white;
					margin-bottom: .3rem;
					i {
						display: block;
						padding: 0.32rem 0;
						margin-bottom: 0.16rem;
						border-bottom: #eeeeee 1px solid;
					}
					span {
						display: inline-block;
						margin-left: 0.15rem;
						.btn-check {
							border: #1b1b1b 1px solid;
							color: #1b1b1b;
						}
					}
				}
			}
		}
	}
</style>
