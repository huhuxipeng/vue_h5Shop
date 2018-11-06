<template>
	<div>
	<div v-if="isShow">
		<div class='mint-popup popup mint-popup-bottom' style="z-index: 2001;">
			<div id="wrap">
				<!--关闭按钮-->
				<p class="back" @click="close"><img src="../common/image/qrcodeimg/close.png" slot="icon" /></p>
				<!--弹框内容-->
				<div class="content">
					<div class="conten">
						<p class="productImg"><img :src="detail.image |filterss(3)" :onerror="logo" /></p>
						<p class="title">{{detail.name}}</p>
						<p class="money">￥{{Number(detail.price).toFixed(2)}}</p>
					</div>
					<div class="category" v-for="(item,index) in goodsSpecList">
						<p style="font-size:.4rem;">{{item.specName}}</p>
						<ul class="cate">
							<li :class="{'cols':child.show}" v-for="(child,key) in item.detail" @click.prevent="stand(child,index,key)">{{child.specValue}}</li>
						</ul>
					</div>
					<div class="amount">
						<p>购买数量</p>
						<div class="number">
							<div class="num-btn remove" @click="remove"></div>
							<input type="text" v-model="buyCount"  class="input">
							<div class="num-btn add" @click="adds"></div>
						</div>
					</div>
				</div>
				<div class="footers">
					<!-- <p class="addcars" @click="joinca">加入购物车</p> -->
					<p class="buynows" @click="purchase">立即购买</p>
				</div>
			</div>
		</div>
		<div class="v-modal" style="z-index: 2000;"></div>
		<mt-popup popup-transition="popup-fade" v-model="showhiden">
			<div class="success">
				<p><img src="../common/image/shopImg/shopcatok.png" /></p>
			</div>
		</mt-popup>
		</div>
	</div>
</template>

<script>
	import { Popup } from 'mint-ui'
	/*通用商品底部购买组件*/
	export default {
		data() {
			return {
				buyCount:1,
				carNum: '',
				token: '',
				add: '',
				product: [],
				popupVisible: false,
				imgae: require('../common/image/defaultimg.png'),
				logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
				num:false,
				currentSel:false,
				cols:['白色','黑色','月牙白'],
				detail:[],
				productIds:0,
				store:0,
				goodsSpecList:'',
				selSpecArr:[],
				selSpecObj:[],
				sortSelSpecArr:[],
				matchProductId:0,
				showhiden:false
			}
		},
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
			shopdetai:{
		        type:Array
		    }
		},
		// props:['shopdetai'],
		mounted: function() {
			this.selSpecArr=[];
			this.token = sessionStorage.getItem('token')
			if(this.token){
				this.num=true

			}else{
				this.num=false
			}

			this.popupVisible = true
			// console.log(this.shopdetai)
	  		this.store=this.shopdetai[0].giftPackage.store
	  		this.detail=this.shopdetai[0].giftPackage
	  		this.product=this.shopdetai[0].giftPackageProductList
//			console.log(this.shopdetai[0])
//			alert(this.shopdetai[0].giftPackageSpecList)
	  		if(this.shopdetai[0].giftPackageSpecList){
	  			this.goodsSpecList = this.shopdetai[0].giftPackageSpecList
//	  			alert(this.goodsSpecList.length)
	  			for(let i in this.goodsSpecList){
			        for(let j in this.goodsSpecList[i].detail){
			        	this.goodsSpecList[i].detail[j]['show'] = false;
			        }
			        this.goodsSpecList[i].detail[0]['show'] = true;
			        this.selSpecArr.push(this.goodsSpecList[i].detail[0].specValueId);
//			        alert(this.selSpecArr.toString())
			        // this.selSpecArr.sort();
			        this.selSpecObj.push({specName: this.goodsSpecList[i].specName,specValue: this.goodsSpecList[i].detail[0].specValue,specValueId: this.goodsSpecList[i].detail[0].specValueId});
			    }
			    this.$set(this.goodsSpecList, 'show', false);
			    this.matchElsProductId();
			    sessionStorage.setItem("GIFSELSPECOBJ", JSON.stringify(this.selSpecObj));
	  		}

		},

		methods: {
			//关闭弹框
			close() {
				this.popupVisible = false
				this.$emit('hide-gift-buy',false);
			},
			// 选规格后匹配数据，列出匹配后的productId
			matchElsProductId(){
				for(var i=0;i<this.selSpecArr.length;i++){
				    this.sortSelSpecArr[i] = this.selSpecArr[i]

				}
					this.sortSelSpecArr=this.sortSelSpecArr.slice(0,this.goodsSpecList.length)
//					alert('赋值'+this.sortSelSpecArr)
//					alert(this.sortSelSpecArr)
//				var len = this.sortSelSpecArr.length,
//			        value,               // 当前比较的值
//			        i,                   // 未排序部分的当前位置
//			        j;       			// 已排序部分的当前位置
//			    for (i=0; i < len; i++) {
//
//			        value = this.sortSelSpecArr[i];
//			     	console.log(value)
//			        for (j=i-1; j > -1 && this.sortSelSpecArr[j] > value; j--) {
//			            this.sortSelSpecArr[j+1] = this.sortSelSpecArr[j];
//			        }
//			        this.sortSelSpecArr[j+1] = value;
//			        console.log(this.sortSelSpecArr)
//			    }
			    ///jgvubujbjb

				let reg = this.sortSelSpecArr.toString();
//				alert(reg)

				for(let i=0;i<this.product.length;i++){
					if(this.product[i].specValueIds == reg){
				        this.matchProductId = this.product[i].gpProductId;
//				        alert(this.matchProductId)
				    }
				}
//				alert('for(var i=0;i<this.selSpecArr.length;i++){'+
//				    'this.sortSelSpecArr[i] = this.selSpecArr[i]'+
//				'}'+
//				'var len = this.sortSelSpecArr.length,'+
//			        'value,i, j;'+
//			   ' for (i=0; i < len; i++) '+
//			       ' value = this.sortSelSpecArr[i];	'+
//
//			       ' for (j=i-1; j > -1 && this.sortSelSpecArr[j] > value; j--) {'+
//			         '   this.sortSelSpecArr[j+1] = this.sortSelSpecArr[j];'+
//			       ' }'+
//			        'this.sortSelSpecArr[j+1] = value;'+
//			   ' }'+
//
//				'let reg = this.sortSelSpecArr.toString();')
			},
			// 选规格事件
			stand(els,i,j){
				for(let b = 0 ; b < this.goodsSpecList[i].detail.length; b++){
		        	this.goodsSpecList[i].detail[b].show = false;
		        }
				els.show = true;
				let changeData = this.goodsSpecList[i].detail[j].show;
				this.$delete(this.goodsSpecList, 'show');
				this.$set(this.goodsSpecList, 'show', changeData);
				this.selSpecArr.splice(i, 1, els.specValueId);
				// this.selSpecArr.sort();
				this.matchElsProductId();
				// console.log(els.specValue+' '+els.specValueId);
				this.selSpecObj[i].specValue = els.specValue;
				this.selSpecObj[i].specValueId = els.specValueId;
				sessionStorage.setItem("GIFSELSPECOBJ", JSON.stringify(this.selSpecObj));
				// console.log(this.selSpecObj);
			},
			//弹出层，选规格，立即购买事件
			purchase() {
				if(this.token) {
					// console.log(this.token);
					// console.log(this.matchProductId);
					// console.log('---------11111---');
					if(this.matchProductId==0){
						this.matchProductId=this.product[0].gpProductId
					}

					if(this.buyCount>this.store){
						alert("超出库存")
						return;
					}
					let obj = [{
						productId:this.matchProductId,
						buyCount:this.buyCount,
					}];
					this.$axios({
						method:'post',
						url:'/order/giftOrderCheckout',
						responseType: 'json',
						data:{
							token:this.token,
							goodsData:JSON.stringify(obj)
						}
					}).then(data=>{
						if(data.status==200){
							// console.log(data.data)
							if(data.data.res_code==1){
								alert(data.data.res_info)
							}else{
								sessionStorage.setItem("GIFTLIST", JSON.stringify(data.data.res_data));
								// sessionStorage.giftList=JSON.stringify(data.data.res_data)
								// console.log('35353535');
								// console.log(data.data.res_data);
								this.$router.push("/buy")
							}
						}
					}).catch(err=>{
						console.log(err)
					})
				} else {
					this.$router.push('/login')
				}
			},
			//增加减少数量
			remove(){
				this.buyCount--
				if(this.buyCount<=0){
					this.buyCount=1
				}
			},
			//判断添加的商品有没有超出库存
			adds(){
				this.buyCount++
				if(this.buyCount>this.store){
					alert("超出库存")
					this.buyCount=this.store
				}
			},

		},
	}
</script>
<style lang="scss" scoped="scoped">
	.buyNow{
		width: 100%!important;
	}
	#wrap {
		min-height: 9.2rem;
		min-width: 10rem;
		background: white;
		overflow: visible;
		.back {
			width: .83rem;
			position: absolute;
			top: -.5rem;
			right: .33rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.content {
			padding: 10px;
			height: 80%;
			overflow: hidden;
			.conten {
				padding-bottom: .5rem;
				height: 2.5rem;
				.productImg {
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 5px;
					float: left;
					margin-right: .5rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.title {
					padding-top: .5rem;
					line-height: .4rem;
					font-weight: 800;
				}
				.money {
					font-size: .4rem;
					color: red;
					line-height: .6rem;
				}
			}
			.category {
				clear: both;
				padding-bottom: .5rem;

				.cate{
					padding-top:.5rem;
					li{
						background: #eee;
						font-size: .4rem;
						border-radius: .5rem;
						margin-right: .4rem;
						margin-bottom: .16rem;
						padding: .2rem;
						padding-left: .5rem;
						padding-right: .5rem;
						float: left;
					}
					.cols{
						background: red;
						color: white;
					}
				}
				.cate:after{
					content: "";
					display: block;
					clear: both;
				}
			}
			.amount{
				font-size: .4rem;
				display: flex;
				justify-content: space-between;
				padding-top:.5rem;
				.number{
					display: inline-block;
					vertical-align: middle;
				.num-btn{
					width: 0.83rem;
					height: 0.83rem;
					border:#e5e5e5 1px solid;
					border-radius:0.1rem;
					display: inline-block;
					background:url(../common/image/join.png) no-repeat;
					background-size:130%;
					vertical-align: middle;
					&.remove{
						background-position:.15rem -.5rem;
					}
					&.add{
						background-position: .2rem .1rem;
					}
				}
				.input{
					width: 2.24rem;
					text-align: center;
					height: 0.84rem;
					line-height: 0.84rem;
					border:#e5e5e5 1px solid;
					border-radius:0.1rem;
					color: #999999;
					display: inline-block;
					vertical-align: middle;
					background:none;
				}
			}


			}
		}
		.footers{
			margin-top:.5rem;
			display: flex;
			justify-content: space-between;
			font-size: .4rem;
			text-align: center;
			line-height: .4rem;
			.addcars{
				padding: .5rem;
				background: #eeeeee;
				flex: 1;
			}
			.buynows{
				flex: 1;
				padding: .5rem;
				background: #f23c18;
				width: 100%!important;
				color: white;
			}
		}

	}
	.success {
		width: 6rem;
		text-align: center;
		p{
			img {
				width:100%;
				height:100%;
			}
		}
	}
</style>
