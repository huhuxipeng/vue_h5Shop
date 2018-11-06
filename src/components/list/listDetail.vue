<template>
	<div id="listDetail">
		<mt-header flexd title="明细" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="content">
			<div class="contop">
				<p>
					<span>积分</span>
					<span>{{CodeDetail.point}}</span>
				</p>
				<p>
					<span>类型</span>
					<span>{{states[CodeDetail.type]}}</span>
				</p>
			</div>
			<div class="concenter">
				<p>
					<span>订单号</span>
					<span>{{CodeDetail.orderSn}}</span>
				</p>
				<p>
					<span>状态</span>
					<span>{{states[Number(CodeDetail.pointStatus)+3]}}</span>
				</p>
			</div>
			<div class="confooter">
				<p>
					<span>支付时间</span>
					<span v-if="CodeDetail.paymentTime==null">无法获取时间</span>
					<span v-else>{{CodeDetail.paymentTime | cycle}}</span>
				</p>
				<p>
					<span>确认时间</span>
					<span>{{CodeDetail.createTime | cycle}}</span>
				</p>
			</div>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				CodeDetail:[],
				states:['获取','消费','提现','待确认','已确认'],
			}
		},
		mounted(){
			this.CodeDetail=JSON.parse(sessionStorage.getItem("CodeDetail"))
		},
		filters:{
			//时间转换
			cycle:function (timestamp) {
			        var date = new Date(timestamp);
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        var D = date.getDate() + ' ';
			        var h = date.getHours() + ':';
			        var m = date.getMinutes() + ':';
			        var s = date.getSeconds();
			        return Y+M+D+h+m+s;
			    }
		},
		methods:{
			backgo(){
				this.$router.go(-1)
				sessionStorage.removeItem("CodeDetail")
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
#listDetail{
	background: #F5F5F5;
	.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.content{


		font-size: .3rem;
		color: rgb(153, 153, 153);
		span:first-child{
			color:black;
			font-size: .4rem;
		}
		span:last-child{
			float:right;
		}
		p{
			padding-top: 15px;
			padding-bottom:15px;
		}
		.contop{
			padding: 10px;
			background: white;
		}
		.concenter{
			padding: 10px;
			background: white;
			margin-top: .3rem;
		}
		.confooter{
			padding: 10px;
			margin-top: .3rem;
			background: white;
		}
	}


}



</style>
