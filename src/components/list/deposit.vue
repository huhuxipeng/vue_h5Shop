<template>
	<div id="deposit">
		<mt-header flexd title="明细" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="content">
			<div class="contop">
				<p>
					<span>金额</span>
					<span>{{CodeDetail.amount}}</span>
				</p>
				<p>
					<span>类型</span>
					<span>{{styles[CodeDetail.style]}}</span>
				</p>
			</div>
			<div class="concenter">
				<p>
					<span>状态</span>
					<span>{{states[CodeDetail.status]}}</span>
				</p>
			</div>
			<div class="confooter">
				<p>
					<span>提现单号</span>
					<span>{{CodeDetail.billNo}}</span>
				</p>
				<p>
					<span>申请时间</span>
					<span>{{CodeDetail.createTime | cycle}}</span>
				</p>
				<p v-if='dispose'>
					<span >处理时间</span>
					<span>{{CodeDetail.accountTime | cycle}}</span>
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
				states:['待审核','待打款','已打款','已到账','已拒绝'],
				styles:['提现中','微信','银行卡'],
				dispose:false
				
			}
		},
		mounted(){
			this.CodeDetail=JSON.parse(sessionStorage.getItem("CodeDetail"))
			console.log(this.CodeDetail)
			switch(this.CodeDetail.status){
				case 0:case 1:
					this.dispose=false;
					break;
				case 2:case 3:
					this.dispose=true;
					break;
			}
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
#deposit{
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