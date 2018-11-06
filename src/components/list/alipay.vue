<template>
	<div id="alipay">
		<ul class="main">
			<li>
				<span>支付宝账号</span>
				<span><input type="text" v-model="phonenum" placeholder="手机号/邮箱" @blur="phones" class="phones"/></span>
			</li>
			<li>
				<span>认证姓名</span>
				<span><input type="text" value="" v-model="alipayname" placeholder="您的真实姓名"/></span>
			</li>
		</ul>
		<p class="btn" @click="save"><input type="button" value="保存" :disabled="disabled"/></p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				phonenum:'',
				alipayname:'',
				detail:{},
				disabled:false
			}
		},
		mounted(){
			this.token=sessionStorage.getItem("token")
			this.$axios({
				method:'post',
				url:'/member/getWithdrawalDetial',
				responseType:'json',
				data:{
					token:this.token
				}
			}).then(data=>{
				this.detail=data.data.res_data.alipayInfo
				this.alipayname=this.detail.accountName
				this.phonenum=this.detail.accountNo
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{
			//输入框失焦判断手机号
			phones(){
				var phones = document.getElementsByClassName("phones")[0];
				var reg=/^1[3|5|7|8]\d{9}$/;
				if(!reg.test(this.phonenum)){
					phones.style.border='1px solid red'
				}else{
					phones.style.border='none'
					
				}
			},
			save(){
				
				this.$axios({
					method:'post',
					url:'/member/saveWithdrawal',
					responseType:'json',
					data:{
						accountName:this.alipayname,
						accountNo:this.phonenum,
						drawType:0,
						token:this.token,
					}
				}).then(data=>{
//					console.log(data)
					if(data.status==200){
						this.disabled=true
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
#alipay{
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