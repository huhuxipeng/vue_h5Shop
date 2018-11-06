<template>
	<div id="codeDetail">
		<mt-header flexd :title="msg" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="total">
			<p><span v-if="pointstatu!='top'">￥</span>{{Number(sum).toFixed(2)}}</p>
		</div>
		<div class="list">
			<ul class="listdetail">
				<li v-for="(item,index) in dataList" @click='golist(index)'>
					<p>
						<span>{{(states[item.type])||(styles[item.style])}}</span><br />
						<span>{{(item.createTime)||(item.auditTime) | cycle}}</span>
					</p>
					<p>
						<span class="money"  v-if="!money">+{{(item.point)}}</span><br />
						<span class="money" v-if="money">+{{(item.amount)}}</span><br />
						<span>{{(states[Number(item.pointStatus)+3])||(status[item.status])}}</span>
					</p>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[],
				states:['获取','消费','提现','待确认','已确认'],
				status:['待审核','待打款','已打款','已到账','已拒绝'],
				styles:['支付宝','微信','银行卡'],
				sum:0,
				money:false,
				msg:'',
        pointstatu:'',
			}
		},
		mounted(){
			let token = sessionStorage.getItem("token");
			let jifen=sessionStorage.jifen;
      let  red=sessionStorage.red;
			let  yellow=sessionStorage.yellow;
      let cloud=sessionStorage.cloud;
			let pointStatus=JSON.parse(sessionStorage.getItem('pointStatus'))
      this.pointstatu=sessionStorage.getItem("top")
			let top= sessionStorage.getItem("top")
			let urls;
			if(pointStatus==1&&top=='top'){
        this.msg='累计收入'
			  if(red){
          urls='getMemberRedPointGainConfirmedList'
        }else if(yellow){
          urls='getMemberYellowPointGainConfirmedList'
        }else if(cloud){
          urls='getMemberCloudPointGainConfirmedList'
        }
			}else if(pointStatus==0&&top=='top'){
				this.msg='待确认';
				if (jifen === "red"){
          urls='getMemberRedPointGainUnconfirmedList'
        }else if(jifen === "cloud"){
          urls='getMemberCloudPointGainUnconfirmedList'
        }
			}else if(pointStatus==2){
				this.msg='已提现'
        if(red){
          urls='getMemberRedPointDrawList'
        }if(yellow){
          urls='getMemberYellowPointDrawList'
        }
			}else if(pointStatus==0){
				this.msg='提现中'
        if(red){
          urls='getMemberRedPointDrawList'
        }else if(yellow){
          urls='getMemberYellowPointDrawList'
        }
			}

			if(top=="top"){
				this.$axios({
					method:'post',
					url:'/member/'+urls,
					responseType:'json',
					data:{
						token:token,
					}
				}).then(data=>{
          console.log(data)
          if(jifen === "red"){
            this.dataList=data.data.res_data.memberRedPointGainList
          }else if(yellow){
            this.dataList=data.data.res_data.memberYellowPointGainList
          }else if(jifen == "cloud"){
            this.dataList=data.data.res_data.memberCloudPointGainList
          }
					for(let i=0;i<this.dataList.length;i++){
						this.sum+=this.dataList[i].point
					}
				}).catch(err=>{
					console.log(err)
				})
			}else{
				this.$axios({
					method:'post',
					url:'/member/'+urls,
					resposeType:'json',
					data:{
						pageNo:0,
						pageSize:0,
						token:token,
						status:pointStatus
					}
				}).then(data=>{
					let detail=data.data.res_data.memberPointDrawList
					this.dataList=detail;
					this.money=true;
					this.sum=data.data.res_data.rmbDrawSum

				}).catch(err=>{
					console.log(err)
				})
			}

		},
		filters:{
			//时间转换
			cycle:function (timestamp) {
			        var date = new Date(timestamp);
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        var D = date.getDate() + ' ';
			        return Y+M+D;
			    }
		},
		methods:{
			backgo(){
				this.$router.go(-1)
				sessionStorage.removeItem("pointStatus")
				sessionStorage.removeItem("top")
        sessionStorage.removeItem('red')
        sessionStorage.removeItem('yellow')
			},
			golist(index){
				sessionStorage.CodeDetail=JSON.stringify(this.dataList[index])
				let top= sessionStorage.getItem("top")
				if(top=='top'){
					//累加积分
					this.$router.push('/listDetail')
				}else{
					//提现
					this.$router.push('/deposit')
				}


			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
#codeDetail{
	background: #F5F5F5;
	.shop{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.total{
		background: white;
		text-align: center;
		line-height:2rem;
		font-size: .8rem;
		margin-bottom:.3rem;
	}
	.list{
		background:white;
		padding: 10px;
		.listdetail{
			font-size:.4rem;
			li{
				display: flex;
				height:1.5rem;
				justify-content: space-between;
				padding-top: .3rem;
				padding-bottom: .3rem;
				border-bottom: 1px solid #eee;
				p:nth-child(2){
					text-align: center;
				}
				p{
					margin-top:.35rem;
					span{
						text-align: center;
					}
					span:last-child{
						color: #CCCCCC;
					}
					.money{
						font-size: .5rem;
					}
				}
			}
		}
	}
}



</style>
