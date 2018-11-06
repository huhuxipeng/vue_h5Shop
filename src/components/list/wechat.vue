<template>
	<div id="wechat">
		<ul class="main">
			<li>
				<span>微信昵称</span>
				<span><input type="text" v-model="wechatname" placeholder="请输入您的微信昵称"/></span>
			</li>
			<li>
				<span>认证姓名</span>
				<span><input type="text"  v-model="names" placeholder="请输入您的真实姓名"/></span>
			</li>
		</ul>
		<p class="btn"><input type="button" value="保存" @click="save" :disabled="disabled"/></p>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				wechatname:'',
				names:'',
				token:'',
				detail:{},
				disabled:false
			}
		},
		mounted(){
			this.token= sessionStorage.getItem("token");
			this.$axios({
				method:'post',
				url:'/member/getWithdrawalDetial',
				responseType:'json',
				data:{
					token:this.token
				}
			}).then(data=>{
				
				this.detail=data.data.res_data.wechatInfo
				this.names=this.detail.accountName
				this.wechatname=this.detail.accountNo
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{
			//保存
			save(){
				
				if(this.names==this.detail.accountName && this.wechatname==this.detail.accountNo){
					alert('数据已经被保存');
				}else{
					this.$axios({
						method:'post',
						url:'/member/saveWithdrawal',
						responseType:'json',
						data:{
							accountName:this.names,
							accountNo:this.wechatname,
							drawType:1,
							token:this.token,
						}
					}).then(data=>{
//						console.log(data)
						if(data.status==200){
							this.disabled=true
						}
					}).catch(err=>{
						console.log(err)
					})
				}
				
				
			}
		}
	}
</script>

<style lang='scss' scoped>
#wechat{
	.main{
		padding: 10px;
		font-size:.4rem ;
		li{
			padding-top: 20px;
			padding-bottom: 20px;
			span:nth-child(1){
				margin-right: 10px;
			}
			input{
				padding: 10px;
				padding-left: 0;
				outline: none;
			}
		}
	}
	.btn{
		position: absolute;
		left:0;
		right: 0;
		bottom: 0;
		padding: 0;
		input{
			background:#ff403c;
			outline: none;
			padding-top:10px;
			padding-bottom: 10px;
			width: 100%;
			color: white;
			font-size: .5rem;
			letter-spacing: 2px;
			position: fixed;
			bottom: 0;
		}
	}
}
</style>