<template>
		<div class="content">
			<div class="main">
				<div class="title">
					<p class="depoist">可提现</p>
					<p class="datas" v-if="integrals.redPoint==(null||0)">0.00</p>
					<p class="datas" v-if="integrals.redPoint">{{Number(integrals.redPoint).toFixed(2)}}</p>
				</div>
				<div class="dep">
					<a><span @click="deposit">提现</span></a>
				</div>
			</div>
			<div class="message">
				<div class="top">
					<div class="income" @click="detail">
						<p>累计收入</p>
						<p v-if="integrals.redPonitIncome==(null||0)">0.00</p>
						<p v-if="integrals.redPonitIncome">{{Number(integrals.redPonitIncome).toFixed(2)}}</p>
					</div>
					<div class="await" @click="TBC">
						<p>待确认</p>
						<p v-if="integrals.redPointToBeConfirmed==(null||0)">0.00</p>
						<p v-if="integrals.redPointToBeConfirmed">{{Number(integrals.redPointToBeConfirmed).toFixed(2)}}</p>
					</div>
				</div>
				<div class="footer">
					<div class="proceed" @click="depositing">
						<p>提现中</p>
						<p v-if="integrals.redPonitWithdrawals==(null||0)">0.00</p>
						<p v-if="integrals.redPonitWithdrawals">{{Number(integrals.redPonitWithdrawals).toFixed(2)}}</p>
					</div>
					<div class="finish" @click="deposited">
						<p>已提现</p>
						<p v-if="integrals.redPointAlreadyPresente==(null||0)">0.00</p>
						<p v-if="integrals.redPointAlreadyPresente">{{Number(integrals.redPointAlreadyPresente).toFixed(2)}}</p>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
export default{

	data(){
		return{
      integrals:{},
		}
	},
	mounted(){
    this.token=sessionStorage.getItem('token');
    this.$axios({
      method:'post',
      url:'/member/getMemberRedPointInfo',
      responseType:'json',
      data:{
        token:this.token
      }
    }).then(data=>{
      this.integrals=data.data.res_data

    }).catch(err=>{
      console.log(err)
    })
	},
	methods:{
		//提现
		deposit(){
			this.$router.push('/integralWay');
			sessionStorage.red='red'
		},
		detail(){
		  sessionStorage.red='red'
			sessionStorage.pointStatus=1;
			sessionStorage.top='top'
			this.$router.push('/codeDetails')
		},
		TBC(){
      sessionStorage.red='red'
      sessionStorage.jifen='red'
			sessionStorage.pointStatus=0;
			sessionStorage.top='top'
			this.$router.push('/codeDetails')
		},
		deposited(){
      sessionStorage.red='red'
			sessionStorage.pointStatus=2;
			this.$router.push('/codeDetails')
		},
		depositing(){
      sessionStorage.red='red'
			sessionStorage.pointStatus=0;
			this.$router.push('/codeDetails')
		}
	}
}
</script>

<style lang="scss" scoped="scoped">
.content{
		background: white;
		.main{
			padding: 10px;
			display: flex;

			.title{
				flex: 3;
				padding-top: 20px;
				padding-bottom: 20px;
				padding-left:10%;
				line-height: 2em;
				background:url(../../common/image/shopImg/goad.png) no-repeat;
				background-position:0 50%;
				background-size:10%;
				.depoist{
					font-size: .3rem;
				}
				.datas{
					margin-top:5px;
					font-size:.6rem;
				}
			}
			.dep{
				display: flex;
				text-align:center;
				a{
					align-self: center;
					span{
						border: 1px solid #f22d07;
						color:#f22d07;
						border-radius: 20px;
						padding: 5px;
						padding-left: 20px;
						padding-right: 20px;
					}
				}

			}
		}
		.message{
			text-align: center;
			.top{
				width: 100%;
				display:table;
				p:nth-child(2){
					font-size:.5rem;
					line-height:.8rem;
				}
				p:nth-child(1){
					font-size:.4rem ;
				}
				/*累计*/
				.income{
					display: table-cell;
					width: 50%;
					padding:.4rem;
					border: .1px solid #EEEEEE;
				}
				/*待确认*/
				.await{
					display: table-cell;
					width: 50%;
					padding:.4rem;
					border: .1px solid #EEEEEE;
				}
			}
			.footer{
				width: 100%;
				display: table;
				p:nth-child(2){
					font-size:.5rem ;
					line-height:.8rem;
				}
				p:nth-child(1){
					font-size:.4rem ;
				}
				/*提现中*/
				.proceed{
					display: table-cell;
					width: 50%;
					padding:.4rem;
					border: .1px solid #EEEEEE;
				}
				/*完成*/
				.finish{
					display: table-cell;
					width: 50%;
					padding:.4rem;
					border: .1px solid #EEEEEE;
				}
			}
		}
	}
</style>
