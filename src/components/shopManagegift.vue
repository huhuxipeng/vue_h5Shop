<template>
  <div class="goods-list-page">
    <commonTop header-type="1" header-title="店长礼包" header-class="bg-white" has-back="true"></commonTop>
    <!--<div class="goods-sort-top"></div>-->

    <section class="goods-list">
      <ul>
        <li v-for="(item,index) in goodList">
          <router-link :to="{ path: '/shopManagegiftDetails', query: { gpId: item.gpId }}">
              <section><img :src="item.image |filterss(2)" :onerror="logo"></section>
              <h2>{{item.gpName}}</h2>
              <span>
                <i><em>￥</em>{{(item.price).toFixed(2)}}</i>
                <i class="pri-line">￥{{(item.mktprice).toFixed(2)}}</i>
              </span>
              <label>
                <u>可获</u>
                <p>红积分:<em>0.00</em></p>
              </label>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="bg-layer"></div>
  </div>
</template>
<script>
import commonTop from '../components/commonTop'
  export default{
    data () {
      return {
        goodList:[],
        logo:'this.src="'+require('../common/image/defaultimg.png')+'"',
      }
    },
    mounted : function(){
    	let token = sessionStorage.getItem("token")
      this.$axios({
      	method:'post',
      	url:'/goods/getGiftPackageList',
      	responseType: 'json',
      	data:{
      		pageNo:0,
      		pageSize:0,
      		token:token
      	}
      }).then(data=>{
      	this.goodList=data.data.res_data.dataList
      }).catch(err=>{
      	console.log(err)
      })
    },
    methods: {

     //商品详情
      details(index){
      		sessionStorage.detail=JSON.stringify(this.goodList[index])
      		var obj=[{productId:this.goodList[index].productId,buyCount:1,cartId:null}]
      		let token = sessionStorage.getItem('token')
      		this.$axios({
      			method:'post',
      			url:'/order/giftOrderCheckout',
      			responseType: 'json',
      			data:{
      				goodsData:JSON.stringify(obj),
      				token:token
      			}
      		}).then(data=>{
            // console.log(data)
      			this.$router.push('/buy')
      			sessionStorage.res_data=JSON.stringify(data.data.res_data)
      		}).catch(err=>{
      			console.log(err)
      		})


      }
    },
    components : {
      'commonTop': commonTop,
    }
  }
</script>
<style lang="scss" scoped="scoped">
.goods-list-page{
  position: relative;
  z-index: 2;
}
.bg-layer{
  background: #f5f5f5;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
