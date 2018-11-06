<template>
	<div id="client">
		<mt-header flexd title="我的客户" class="header">
			<router-link slot="left" to="/percenter">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="main">
			<ul class="clients">
				<li v-for="(item,index) in clientDetail">
					<div class="left">
						<p><img :src="item.weixinFace|filterss(4)" :onerror="logo"/></p>
						<p><span>{{item.nickname?item.nickname:item.name}}</span>&nbsp;<span class="mod">{{item.identityId==1?'店长':'普通会员'}}</span></p>
						<p>ID：{{item.memberId}}</p>
						<p>{{item.subscribe==0?'未关注':'已关注'}}</p>
					</div>
					<div class="right">
						<p>
							<span>总交易金额：</span>
							<span>￥{{(item.amount).toFixed(2)}}</span>
						</p>
						<p>
							<span>累计贡献红积分：</span>
							<span>￥{{item.redPoint |strings}}</span>
						</p>
						<!--<p>-->
							<!--<span>累计贡献黄积分：</span>-->
							<!--<span>￥{{(item.yellowPoint).toFixed(2)}}</span>-->
						<!--</p>-->
					</div>
				</li>

			</ul>
			<div class="sum">
				<p><span>总人数：</span><span>{{clientDetail.length}}人</span></p>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
				logo:'this.src="'+require('../../common/image/defaultimg.png')+'"',
				log:require('../../common/image/defaultimg.png'),
				clientDetail:[]
			}
		},
		mounted(){
			let memberId=sessionStorage.getItem('memberId')
			let token=sessionStorage.getItem('token')
			this.$axios({
				method:'post',
				url:'member/myChildMemberList',
				responseType:'json',
				data:{
					memberId:memberId,
					token:token
				},
			}).then(data=>{
				console.log(data)
				this.clientDetail=data.data.res_data.childMemberList
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{

		},
	}
</script>

<style lang="scss" scoped="scoped">
#client{
	.header{
			background:white;
			padding:10px;
			color:black;
			font-size:.5rem;
		}
		.main{
			.clients{
				padding: 10px;
				li{
					padding-bottom: 20px;
					display: flex;
					.left{
						flex: 1;
						font-size: .3rem;
						line-height:.6rem;
						.mod{
							border: 1px solid #ff403c;
							color: #ff403c;
							font-size: .2rem;
							border-radius: 20px;
							padding-left:.1rem;
							padding-right: .1rem;
						}
						p:nth-child(4){
							color: #ff403c;
						}
						img{
							border: 1px solid #eee;
							border-radius: 50%;
							margin-right:.3rem;
							width: 1.7rem;
							height: 1.7rem;
							float: left;
						}
					}
					.right{
						line-height:.6rem;
						font-size: .25rem;
						flex: 1;
						p{
							text-align: right;
							overflow: hidden;
							span:nth-child(2){
								color: #ff403c;
								display: inline-block;
								text-align: -webkit-auto;
								width:1.5rem;
								text-overflow: ellipsis;
								overflow: hidden;
							}
							span:nth-child(1){
								overflow: hidden;
								display: inline-block;
								text-align: right;
								margin-top: -.1rem;
							}
						}
					}
				}

			}
			.sum{
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				font-size: .3rem;
				color: #a6a6a6;
				padding-top:10px;
				padding-bottom: 10px;
				p{
					text-align: center;
				}

			}
		}
}
</style>
