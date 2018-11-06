<template>
	<div class="shopping-cart-list-page shopping-cart-modify-page">
		<commonTop header-title="购物车" header-type="1" header-class="shoppingTop" right-txt="完成" @right-els="rightEls"></commonTop>

		<div v-if="!shows">
			<section class="store" v-for="(item,key) in storeLists">
				<div class="store-info" @click.prevent="selStore(key)">
			        <label class="sel-box">
			            <input type="checkbox" name="storeSel" v-model="item.show">
			            <i class="icons"></i>
			        </label>
			        <span class="icons store-icon"></span>
			        <i>{{item.comName}}</i>
			        <span class="icons arrow-icon"></span>
			    </div>
				<ul class="goods-show">
					<li v-for="(value,index) in item.goodsList">
						<label class="sel-box" @click.prevent="selGoods(key,index)">
			              <input type="checkbox" name="goodsSel" v-model="value.show">
			              <i class="icons"></i>
			            </label>
						<div class="goods-info">
							<img :src="value.image |filterss(3)" class="store-logo" :onerror='logo'>
							<div class="number">
								<div class="icons num-btn remove" @click="remove(key,index)"></div>
								<input type="text" v-model="value.buyCount" class="input" @blur="numbers(key,index,value.buyCount)">
								<div class="icons num-btn add" @click="add(key,index)"></div>
							</div>
							<div class="price">
								￥{{(value.price).toFixed(2)}} <em>￥{{(value.mktprice).toFixed(2)}}</em>
							</div>
						</div>
					</li>
				</ul>
			</section>

		</div>
		<div class="total-pay-top"></div>
		<div class="total-pay boderBox">
			<label class="sel-box" @click.prevent="selAll">
		          <input type="checkbox" name="allSel" v-model="allChecked">
		          <i class="icons"></i>
		          <em>全选</em>
		    </label>
			<aside @click="clear">删除</aside>
		</div>
		<mt-popup popup-transition="popup-fade" v-model="showhiden">
		 <div class="clears">
		 	<p>确定要删除该商品吗？</p>
		 </div>
		 <div class="footers">
		 	<p @click="right">确认</p>
		 	<p @click="abolish">取消</p>
		 </div>
		</mt-popup>

		<commonFooter current-menu="3"></commonFooter>
	</div>
</template>
<script>
	import { Popup } from 'mint-ui';
	import commonTop from '../components/commonTop'
	import commonFooter from '../components/commonFooter'
	export default {
		data() {
			return {
				showhiden:false,
				allChecked: '',
				num: '',
				product: '',
				token: '',
				storeLists: [],
				logo:'this.src="'+require('../common/image/defaultimg.png')+'"',
				idnumber: [],
				shows:false
			}
		},
		components: {
			'commonTop': commonTop,
			'commonFooter': commonFooter,
		},
		mounted() {
			//  	let shop=JSON.parse(sessionStorage.getItem("shop"));
			this.listModify();
		},
		methods: {
			listModify(){
				this.token = sessionStorage.getItem("token");
				this.$axios({
					method: 'post',
					url:'/order/pageCart',
					// url: '/order/pageCart',
					responseType: 'json',
					data: {
						token: this.token,
					}
				}).then(data => {
					this.storeLists = data.data.res_data.dataList
					if(this.storeLists.length==0){
						this.shows=true
						for(let i in this.storeLists){
			              this.storeLists[i]['show'] = false;
			              for(let j = 0 ; j < this.storeLists[i].goodsList.length; j++){
			                this.storeLists[i].goodsList[j]['show'] = false;
			              }
			            }
			            this.$set(this.storeLists, 'show', false);
					}
					else{
						this.shows=false
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 完成事件保存，数据提交事件
			rightEls: function(obj) {
				if(obj == true) {
					this.$router.push('/shoppingCart/list');
				}
			},
			// 删减
			remove: function(index,key) {
				if(this.storeLists[index].goodsList[key].buyCount > 1) {
					this.storeLists[index].goodsList[key].buyCount = parseInt(this.storeLists[index].goodsList[key].buyCount) - 1;
					this.num = this.storeLists[index].goodsList[key].buyCount;
					this.$axios({
						method: 'post',
						url: '/order/editCartOfBuyCount',
						responseType: 'json',
						data: {
							buyCount: this.num,
							productId: this.storeLists[index].goodsList[key].productId,
							token: this.token,
						}
					}).then(data => {

					}).catch(err => {
						console.log(err)
					})
				}
				else {
					alert('不能小于1');
				}
			},
			// 增加
			add: function(index,key) {
				this.storeLists[index].goodsList[key].buyCount = parseInt(this.storeLists[index].goodsList[key].buyCount) + 1;
				this.num = this.storeLists[index].goodsList[key].buyCount
				// console.log(this.num);

				this.$axios({
					method: 'post',
					url: '/order/editCartOfBuyCount',
					responseType: 'json',
					data: {
						buyCount: this.num,
						productId: this.storeLists[index].goodsList[key].productId,
						token: this.token,
					}
				}).then(data => {

				}).catch(err => {
					console.log(err)
				})
			},
			numbers(index,key,buyCount){

				this.$axios({
					method: 'post',
					url: '/order/editCartOfBuyCount',
					responseType: 'json',
					data: {
						buyCount: JSON.parse(buyCount),
						productId: this.storeLists[index].goodsList[key].productId,
						token: this.token,
					}
				}).then(data => {

				}).catch(err => {
					console.log(err)
				})
			},
			// 全选选择
			selAll: function() {
				this.allChecked = !this.allChecked;
		        if(this.allChecked == true){
		          for(let t in this.storeLists){
		            for(let a in this.storeLists[t].goodsList){
		              this.storeLists[t].show = true;
		              this.storeLists[t].goodsList[a].show = true;
		              this.idnumber.push(this.storeLists[t].goodsList[a].cartId)
		            }
		          }
		       }
		       else{
		          for(let t in this.storeLists){
		            for(let a in this.storeLists[t].goodsList){
		              this.storeLists[t].show = false;
		              this.storeLists[t].goodsList[a].show = false;
		              this.idnumber.splice(0,this.storeLists.length)
		            }
		          }
		        }

				// this.allChecked = !this.allChecked;
				// if(this.allChecked == true) {
				// 	for(let i = 0; i < this.storeLists.length; i++) {
				// 		this.storeLists[i].show = true;
				// 		//          for(let k=0;k<this.storeLists[i].length;k++){
				// 		//            this.storeLists[i].show = true;
				// 		//          }
				// 		this.idnumber.push(this.storeLists[i].cartId)
				// 	}
				// } else {
				// 	for(let i = 0; i < this.storeLists.length; i++) {
				// 		this.storeLists[i].show = false;
				// 		this.idnumber.splice(0, this.idnumber.length)
				// 	}
				// }
			},
			// 店铺选择
			//    selStore:function(index){
			//      this.storeLists[index].show = !this.storeLists[index].show;
			//      // 店铺全选与取消
			//      if(this.storeLists[index].show == true){
			//        for(let i=0;i<this.storeLists[index].goodsList.length;i++){
			//          this.storeLists[index].goodsList[i].show = true;
			//        }
			//      }else{
			//        for(let i=0;i<this.storeLists[index].goodsList.length;i++){
			//          this.storeLists[index].goodsList[i].show = false;
			//        }
			//      }
			//
			//      // 店铺选择数量为全部，则全选
			//      let storeAllLen = 0;
			//      let storeCheckedAll = 0;
			//      for(let a=0;a<this.storeLists.length;a++){
			//          storeAllLen++;
			//          if(this.storeLists[a].show ==true){
			//            storeCheckedAll = storeCheckedAll + 1;
			//          }
			//      };
			//      if(storeCheckedAll == storeAllLen){
			//        this.allChecked = true;
			//      }
			//      else{
			//        this.allChecked = false;
			//      }
			//    },
			// 店铺选择
		    selStore:function(index){
		      this.storeLists[index].show = !this.storeLists[index].show;
		      let changeData = this.storeLists[index].show;
		      this.$delete(this.storeLists, 'show');
		      this.$set(this.storeLists, 'show', changeData);
		      // 店铺全选与取消
		      // let storeOnePri = 0;
		      if(this.storeLists[index].show == true){
		       for(let a in this.storeLists[index].goodsList){
		         this.storeLists[index].goodsList[a].show = true;
		         this.idnumber.push(this.storeLists[index].goodsList[a].cartId)
		         // storeOnePri = storeOnePri + parseFloat(this.storeLists[index].goodsList[a].price)*parseFloat(this.storeLists[index].goodsList[a].buyCount);
		        }

		      }
		      else{
		        for(let a in this.storeLists[index].goodsList){
		          this.storeLists[index].goodsList[a].show = false;
		          this.idnumber.splice(0,this.storeLists.length)
		        }
		      }
		      // this.totalPrice = storeOnePri.toFixed(2);

		      // 店铺选择数量为全部，则全选
		      let storeAllLen = 0;
		      let storeCheckedAll = 0;
		      let storeAllPri = 0;
		      for(let a=0;a<this.storeLists.length;a++){
		         storeAllLen++;
		         if(this.storeLists[a].show == true){
		           storeCheckedAll = storeCheckedAll + 1;
		              // for(let r=0;r<this.storeLists[a].goodsList.length;r++){
		              //   storeAllPri = storeAllPri + parseFloat(this.storeLists[a].goodsList[r].price)*parseFloat(this.storeLists[a].goodsList[r].buyCount);
		              // }
		         }
		      };
		      // this.totalPrice = storeAllPri.toFixed(2);
		      if(storeCheckedAll == storeAllLen){
		       this.allChecked = true;
		      }
		      else{
		       this.allChecked = false;
		      }
		    },
			// 商品选择
			selGoods: function(index,key) {
				// this.storeLists[index].show = !this.storeLists[index].show;
				// this.idnumber.push(this.storeLists[index].cartId)
				// // 商品选择个数都选择，则全选
				// let goodsAllLen = 0;
				// let goodsCheckedAll = 0;
				// for(let a = 0; a < this.storeLists.length; a++) {
				// 	goodsAllLen++;
				// 	if(this.storeLists[a].show == true) {
				// 		goodsCheckedAll = goodsCheckedAll + 1;

				// 	}
				// };
				// if(goodsCheckedAll == goodsAllLen) {
				// 	this.allChecked = true;
				// } else {
				// 	this.allChecked = false;
				// }
					// console.log(this.storeLists);
				  this.storeLists[index].goodsList[key].show = !this.storeLists[index].goodsList[key].show;
			      let changeData = this.storeLists[index].goodsList[key].show;
			      this.$delete(this.storeLists, 'show');
			      this.$set(this.storeLists, 'show', changeData);
			      if(this.storeLists[index].goodsList[key].show==true){
			        this.idnumber.push(this.storeLists[index].goodsList[key].cartId)
			      }else{
			        for(let k=0;k<this.idnumber.length;k++){
			          if(this.idnumber[k]==this.storeLists[index].goodsList[key].cartId){
			            this.idnumber.splice(k,1)
			          }
			        }
			      }

			      let goodsLen = this.storeLists[index].goodsList.length;
			      let goodsCheckedNum = 0;
			      let goodsCheckedPri = 0;
			      for(let p in this.storeLists[index].goodsList){
			        if(this.storeLists[index].goodsList[p].show == true){
			          goodsCheckedNum = goodsCheckedNum + 1;
			        }
			      }
			      // console.log(goodsCheckedNum+' '+goodsLen);
			      // 商品选择数量，等于店铺总数
			      if(goodsCheckedNum == goodsLen){
			        this.storeLists[index].show = true;
			      }
			      else{
			        this.storeLists[index].show = false;
			      }
			      // 商品逐个多选
			      let goodsAllLen = 0;
			      let goodsCheckedAll = 0;
			      let goodsCheckedAllPri = 0;
			      for(let t in this.storeLists){
			        for(let a in this.storeLists[t].goodsList){
			          goodsAllLen++;
			          if(this.storeLists[t].goodsList[a].show == true){
			            goodsCheckedAll = goodsCheckedAll + 1;
			            goodsCheckedAllPri = goodsCheckedAllPri +parseFloat(this.storeLists[t].goodsList[a].price)*parseFloat(this.storeLists[t].goodsList[a].buyCount);
			          }
			        }
			      };
			        this.totalPrice = goodsCheckedAllPri.toFixed(2);
			        if(goodsCheckedAll == goodsAllLen){
			          this.allChecked = true;
			        }
			        else{
			          this.allChecked = false;
			        }
			},
			clear() {
				this.showhiden=true
				if(this.storeLists.length==0){
					this.showhiden=false;
					this.allChecked=!this.allChecked
				}
			},
			//删除商品
			clearshop:function(index){
				let that = this;
				let token= sessionStorage.getItem("token");
				// console.log(this.idnumber);
				for(let i in this.idnumber) {
					for(let j in this.storeLists) {
						for(let k in this.storeLists[j].goodsList) {
							// console.log('666666666');
							if(this.storeLists[j].goodsList[k].cartId == this.idnumber[i]) {
								let cartId = this.idnumber.join(',')
								// this.token = sessionStorage.getItem("token");
								// console.log(cartId);
								// console.log(this.token);
								// console.log('33333333');
								this.$axios({
									method: 'post',
									url: '/order/delCartGoods',
									responseType: 'json',
									data: {
										cartIds:cartId,
										token:this.token
									}
								}).then(data=>{
									if(data.status==200){
										this.showhiden=false;
										this.listModify();
										// if(this.allChecked){
										// 	this.storeLists.splice(0,this.storeLists.length);
										// }else{
										// 	this.storeLists.splice(j,1);
										// }
										// this.showhiden=false;
										// if(this.storeLists.length==0){
										// 	this.allChecked=!this.allChecked
										// }
									}
								}).catch(err=>{
									console.log(err)
								})
							}
						}
					}
				}
			},
			right(){
				this.clearshop()

			},
			abolish(){
				this.showhiden=false
			}


		}

	}
</script>
<style lang="scss" scoped="scoped">
	.clears{
			width: 8.125rem;
			height: 2rem;
			border-radius:20px;
			font-size: .4rem;
			text-align: center;
			line-height: 1rem;
		}
		.footers{
			display: flex;
			justify-content: space-between;
			text-align: center;
			p{
				flex: 1;
				padding: 5px;
				padding-left:20px;
				padding-right: 20px;
				line-height:1rem;
				font-size: .4rem;
			}
			p:last-child{
				background:#eee ;
			}
			p:first-child{
				background: #f22d07;
				color: white;
			}
		}
</style>
