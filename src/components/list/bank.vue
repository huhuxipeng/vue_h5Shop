<template>
	<div id="bank">
		<ul class="condition">
			<!--<li >
				<span>开户行</span>
				<span></span>
				<img src="../../common/image/topupimg/return.png" slot='icon' width="6" height="10"/>
			</li>-->
			<!--<li @click="chageCapital">
				<span>开户省会</span>
				<span>{{provinc}}</span>
				<img src="../../common/image/topupimg/return.png" slot='icon' width="6" height="10"/>
			</li>-->
			<li>
				<span>开户名</span>
				<span><input type="text"  v-model="name" placeholder="请输入开户名 " :disabled="disabled"/></span>
			</li>
			<li>
				<span>卡号</span>
				<span><input type="text"  v-model="numb" placeholder='请输入卡号' :disabled="disabled"/></span>
			</li>
		</ul>
		<p class="btn" v-if='!disabled'><input type="button" value="保存" @click="save" :disabled="disabled"/></p>


		<!--弹出框-->
		<!--<mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup'>
			<div class="addlit">
				<mt-picker :slots="slots" value-key='addressName' @change="changeProvinc"></mt-picker>
			</div>
		</mt-popup>-->

	</div>
</template>

<script>
//	import { Popup, Picker } from 'mint-ui'
// 	import slot from '../../address.json'
	export default{
		data(){
			return{
				open:'',
				province:'',
				bankname:'',
				name:'',
				numb:'',
				popupVisible:false,
//				slots: [{
//					flex: 1,
//					values:slot, //引入省市区数据\
////					defaultIndex:10,
//					className: 'slot1',
//					textAlign: 'center'
//				}],
//				provinc:'',
//				provId:null,
				token:'',
				detail:{},
				disabled:false
			}
		},
		mounted(){
			this.token= sessionStorage.getItem("token")
			this.$axios({
				method:'post',
				url:'/member/getWithdrawalDetial',
				responseType:'json',
				data:{
					token:this.token
				}
			}).then(data=>{
				if(data.status==200){
					let length=data.data.res_data.bankcardList.length
					this.detail=data.data.res_data.bankcardList
					this.name=this.detail[length-1].accountName
					this.numb=this.detail[length-1].accountNo
					if(this.name&&this.numb){
						this.disabled=true
					}
				}
			}).catch(err=>{
				console.log(err)
			})

		},
		methods:{
			chageCapital(){
				this.popupVisible=true
			},
//			changeProvinc(picker, values){
//				let a=picker.getValues()[0];
//				this.provinc=a.addressName;
//				this.provId = a.provinceId;
//			},
			save(){
				this.$axios({
					method:'post',
					url:'/member/saveWithdrawal',
					responseType:'json',
					data:{
						accountName:this.name,
						accountNo:this.numb,
						drawType:2,
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

<style lang="scss" scoped="scoped">
#bank{
	.font{
		font-size: .6rem !important;
	}
	.condition{
		padding: 10px;
		font-size: .45rem;
		li{
			padding-top:15px;
			padding-bottom:20px;
			input{
				padding: 10px;
				font-size: .4rem;
				outline: none;
			}
			img{
				float: right;
			}
		}
		li:nth-child(1){
			padding-top: 10px;
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
	.popup {
			width: 100%;
			font-size: .5rem;
			text-align: center;
			padding: 10px;
			.addlit {
				height: 8rem;
			}
		}
}
</style>
