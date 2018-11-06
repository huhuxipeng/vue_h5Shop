<template>
	<div class="shopping-cart-add-sel-page pad-bottom">
		<div class="body-content">
			<commonTop header-title="收货地址" header-type="1" header-class="bg-white" has-back="true"></commonTop>
			<div v-if="!noraml" class="noraml-none-data"></div>
			<div v-if="noraml">
				<section class="user-info" v-for="(item,index) in shopadd">
					<div class="sel-box">
						<input type="checkbox" name="allSel" v-model="checked">
						<i class="icons" v-on:click.prevent="checkeds(index)"></i>
					</div>
					<label v-on:click.prevent="checkeds(index)">
			          <h2>收货人：{{item.name}}</h2>
			          <i>{{item.mobile}}</i>
			          <p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.addressDetail}}</p>
			        </label>
				</section>
			</div>
			<div class="bottom-btn">
				<button @click="add">添加新地址</button>
			</div>
		</div>
		<div class="body-bg"></div>
	</div>
</template>
<script>
	import commonTop from '../components/commonTop'
	import commonFooter from '../components/commonFooter'
	export default {
		data() {
			return {
				goodsPic: require('../common/image/upload/goods-2.jpg'),
				checked: 0,
				shopadd: [],
				token: '',
				noraml:false,
			}
		},
		components: {
			'commonTop': commonTop,
			'commonFooter': commonFooter,
		},
		mounted: function() {
			this.token = sessionStorage.getItem("token");
			this.$axios({
				method: 'post',
				url: '/member/queryMemAddressList',
				responseType: 'json',
				data: {
					token: this.token
				}
			}).then(data => {
				this.shopadd = data.data.res_data.memberAddressList
				if(this.shopadd=='' || this.shopadd==null || this.shopadd==undefined){
					console.log('11');
					this.noraml = false;
				}
				else{
					console.log('22');
					this.noraml = true;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			checkeds(index) {
				this.shopadd[index].show = !this.shopadd[index].show
				if(this.shopadd[index].show == true) {
					for(var i = 0; i < this.shopadd.length; i++) {
						if(index==i){
							document.getElementsByClassName('icons')[i+1].style.borderRadius="50%"
							document.getElementsByClassName('icons')[i+1].style.backgroundColor='red'
							document.getElementsByClassName('icons')[i+1].style.border='1px solid #ccc'
							sessionStorage.placeadd=JSON.stringify(this.shopadd[i])
							this.$router.go(-1)
							
						}else{
							document.getElementsByClassName('icons')[i+1].style.background='none'
							document.getElementsByClassName('icons')[i+1].style.border='1px solid #ccc'
							document.getElementsByClassName('icons')[i+1].style.borderRadius="50%"
						}
					} 
				}
			},
			add(){
				this.$router.push('/address/newaddress')
				
			}
			
		},
	}
</script>