<template>
	<div class="goods-category-page">
    <div class="sear">
      <input type="text" value="" id="searcont" placeholder="搜索您喜欢的商品" @focus="searchshop"/>
    </div>
		<!--<commonTop header-title="" header-type="3" right-txt="客服" has-back="true" right-router="consult"></commonTop>-->
		<aside class="aside-menu">
			<ul id="uls">
				<li v-for="(item,index) in titleList" v-on:click.prevent="Once(index)" v-bind:class="{curren:index==clas}">{{item.name}}</li>
			</ul>
		</aside>
		<section class="content">
			<div class="simple-one" v-for='(value,index) in sec'>
				<fieldset class="title">
					<legend>{{value.name}}</legend>
				</fieldset>
				<ul id="goodlist_wrap">
					<li v-for="(val,keys) in value.thirdGoodsCatList" v-on:click="three(val)">
						<i><img :src="val.image |filterss(2)" :onerror='logo' v-if='val.image'></i>
						<i><img src="../common/image/defaultimg.png" v-if='!val.image'/></i>
						<span>{{val.name}}</span>
					</li>
				</ul>
			</div>

		</section>
		<commonFooter current-menu="2"></commonFooter>
	</div>
</template>
<script>
	import commonTop from '../components/commonTop'
	import commonFooter from '../components/commonFooter'
	export default {
		data() {
			return {
				titleList: [],
				secGoodsCatList: [],
				//        show:false,
				sec: [],
				clas: '-1',
				logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
			}
		},
		mounted() {
			sessionStorage.CATERORYnum = 0;
			if(JSON.parse(sessionStorage.getItem('CATERORY'))) {
				this.titleList = JSON.parse(sessionStorage.getItem('titleList'))

				for(let a in this.titleList) {
					if(JSON.parse(sessionStorage.getItem('CATERORY')) == this.titleList[a].name) {
						this.Once(JSON.parse(a))
						sessionStorage.CATERORYnum = 1;
					}

				}
				if(sessionStorage.getItem('CATERORYnum') == 0) {
					this.Once(0)
				}

			} else {

				this.$axios({
					method: 'post',
					url: '/goods/getGoodsCatData',
					responseType: 'json',
				}).then(data => {
					this.titleList = data.data.goodsCat
					sessionStorage.titleList = JSON.stringify(this.titleList)
					for(var i = 0; i < this.titleList.length; i++) {
						for(var j = 0; j < this.titleList[i].secGoodsCatList.length; j++) {
							this.secGoodsCatList.push(this.titleList[i].secGoodsCatList)
							for(let k = 0; k < this.secGoodsCatList.length; k++) {
								if(0 == k) {
									this.sec = this.secGoodsCatList[k]
									this.clas = 0
								}
							}
						}
					}

				}).catch(err => {
					console.log(err)
				});
			}

		},
		updated () {
		console.log('updated');
		},
		methods: {
      searchshop() {
        this.$router.push('/searchShop?state=0')
      },
			Once(index) {
				this.clas = index;
				let curren = document.getElementById('uls');
				if(index > 8) {
					curren.style.top = -index * 35 + 'px';
					if(index == 11) {
						curren.style.top = -index * 15 + 'px';
					}
				} else {
					curren.style.top = 0
				}

				for(var i = 0; i < this.titleList.length; i++) {
					if(index == i) {
						sessionStorage.CATERORY = JSON.stringify(this.titleList[i].name)
						if(this.titleList[i].secGoodsCatList.length == 0) {
							this.sec = ''
						} else {
							for(var j = 0; j < this.titleList[i].secGoodsCatList.length; j++) {
								this.secGoodsCatList.push(this.titleList[i].secGoodsCatList)
								for(let k = 0; k < this.secGoodsCatList.length; k++) {
									this.sec = this.secGoodsCatList[k]
								}
							}
						}

					}
				}

			},
			three(eve) {
				sessionStorage.catId = eve.catId
				console.log(eve.catId)
				 this.$router.push({path:'/goods/list',query:{catId:eve.catId}});
        // sessionStorage.qian = true ;
			}
		},
		components: {
			'commonTop': commonTop,
			'commonFooter': commonFooter,
		}
	}
</script>
