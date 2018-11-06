<template>
	<div id="rightlist">
		<mt-header title="选择商品" class='center'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div>
			<section class="store">
				<ul class="goods-show">
					<li v-for="(item,index) in shoplist" @click.prevent="selGoods(index,item)">
						<label class="sel-box">
				            <input type="checkbox" name="goodsSel" v-model="item.show">
				            <i class="icons"></i>
				        </label>
						<div class="goods-info">
							<img :src="item.image |filterss(3)" class="store-logo" :onerror="logo">
							<span>
				              <h2>{{item.name}}</h2>
				              <p>{{item.specs}}</p>
				              <i>￥{{item.price}}
				              	<br />
				              	<u>X{{item.buyCount}}</u>
				              </i>
				            </span>
						</div>
					</li>

				</ul>
			</section>
		</div>
		<div class="total-pay boderBox">
			<label class="sel-box" @click.prevent="selAll">
	          <input type="checkbox" name="allSel" v-model="allChecked">
	          <i class="icons"></i>
	          <em>全选</em>
	      </label>
			<aside v-on:click.prevent="paymoney">确定</aside>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				shoplist: [{
					'name': '玩玩1玩玩1玩玩1','specs':'顔色','price':'222','mktprice':'333','buyCount':'2','show':false,'goodsId':'22','image':'../../common/image/defaultimg.png'
				}, {
					'name': '玩玩2玩玩2玩玩2','specs':'顔色','price':'222','mktprice':'333','buyCount':'2','show':false,'goodsId':'33','image':'../../common/image/defaultimg.png'
				}],
				allChecked: '',
				arr:[]
			}
		},
		mounted(){
			this.$set(this.shoplist, 'show', false);
			console.log(this.shoplist)
			let token=sessionStorage.getItem('token')
			console.log(token)
		},
		methods: {
			backgo() {
				this.$router.go(-1)
			},
			selGoods: function(index,value) {
				this.shoplist[index].show = !this.shoplist[index].show;
				this.arr.push(value)
//				let changeData = this.storeLists[index].goodsList[key].show;
//				this.$delete(this.storeLists, 'show');
//				this.$set(this.storeLists, 'show', changeData);
//				if(this.storeLists[index].goodsList[key].show == true) {
//					this.idnumber.push(this.storeLists[index].goodsList[key].goodsId)
//				} else {
//					for(let k = 0; k < this.idnumber.length; k++) {
//						if(this.idnumber[k] == this.storeLists[index].goodsList[key].goodsId) {
//							this.idnumber.splice(k, 1)
//						}
//					}
//				}
//
//				let goodsLen = this.storeLists[index].goodsList.length;
//				let goodsCheckedNum = 0;
//				let goodsCheckedPri = 0;
//				for(let p in this.storeLists[index].goodsList) {
//					if(this.storeLists[index].goodsList[p].show == true) {
//						goodsCheckedNum = goodsCheckedNum + 1;
//					}
//				}
//				// console.log(goodsCheckedNum+' '+goodsLen);
//				// 商品选择数量，等于店铺总数
////				if(goodsCheckedNum == goodsLen) {
////					this.storeLists[index].show = true;
////				} else {
////					this.storeLists[index].show = false;
////				}
				// 商品逐个多选
				let goodsCheckedAll = 0;
				let goodsCheckedAllPri = 0;
				for(let t in this.shoplist){
					if(this.shoplist[t].show==true){
						goodsCheckedAll = goodsCheckedAll + 1;
					}

				}

				if(goodsCheckedAll == this.shoplist.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			selAll() {
				this.allChecked = !this.allChecked
				if(this.allChecked==true){
					for(let i=0;i<this.shoplist.length;i++){
						this.shoplist[i].show=true
						this.arr.push(this.shoplist[i])
					}
				}else{
					for(let i=0;i<this.shoplist.length;i++){
						this.shoplist[i].show=false
						this.arr.splice(0,this.shoplist.length)
						console.log(this.arr)
					}
				}

			},
			paymoney(){
				if(this.arr.length<=0){
					alert('选择商品')
				}else{
					sessionStorage.rightArr=JSON.stringify(this.arr)
					this.$router.push('/rightDetail');
				}

			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#rightlist {
		background: #F5F5F5;
		.center {
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: 10px;
		}
		.store{
			.goods-info{
				span{
					h2,p{
						width: 5rem;
					}
					i{
						height:2rem;
						float: right;
						margin-top: -1.5rem;
						font-size:.5rem;
						u{
							font-size: .3rem;
							display: inline-block;
							margin-top: 1rem;
						}
					}
				}
			}
		}
		.boderBox{
			bottom: 0;
		}
	}
</style>
