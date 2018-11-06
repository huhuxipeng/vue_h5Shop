<template>
  <div class="goods-detail-page">
    <commonTop header-type="2" header-class="bg-none" has-back="true"></commonTop>
    <!-- 静态banner展示 -->
    <!--<app-banner :listImg="listImgA"></app-banner>-->

    <mt-swipe :auto="5000" class="banner" style='height:10rem;'>
  		<mt-swipe-item v-for="(item,index) in listImgA" >
  			<img :src="item.image |filterss(1)" :onerror="logo" style="width: 100%;height: 100%;"/>
  		</mt-swipe-item>
  	</mt-swipe>

    <section class="short-info">
      <h1>{{detail.gpName}}</h1>
      <div class="clear">
        <section class="fl">
          <span><em>￥</em>{{Number(detail.price).toFixed(2)}}</span>
          <u>￥{{Number(detail.mktprice).toFixed(2)}}</u>
          <u class="sendTips">包邮（偏远地区除外）</u>
        </section>
        <div class="fr points">
          <p>红积分:0<br /></p>
        </div>
      </div>
    </section>
    <!-- <selSpecBar></selSpecBar> -->
    <section class="sel-spec-bar" v-on:click="showGiftBuy">请选择颜色分类<u class="icons"></u></section>



    <section>
      <giftDetailTab tab-value="1" :giftdetail-id="giftDetailId"></giftDetailTab>
      <div class="descript">
        <!-- <section class="desc-pic">
          <img :src="goodsPic" :onerror="logo">
        </section> -->
        <article class="desc-article" v-html="detail.intro">
          <!-- <h2>价格说明</h2>
          <p><font style="color:#000">划线价格：</font>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p>
          <p>&nbsp;</p>
          <p><font style="color:#000">划线价格：</font>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p> -->
        </article>
      </div>
    </section>



    <div class="goods-footer-top"></div>
    <footer class="goods-footer-buy clear">
      <i class="buyNow" v-on:click="showGiftBuy">立即购买</i>
    </footer>
    <div v-if="giftBuyShow">
      <giftFooterBuy :is-show="giftBuyShow" @hide-gift-buy="hideGiftBuy" :shopdetai='details'></giftFooterBuy>
    </div>
  </div>
</template>
<script>

import commonTop from '../components/commonTop'
import giftFooterBuy from '../components/giftFooterBuy'
import giftDetailTab from '../components/giftDetailTab'

  export default{
    data () {
      return {
        msg : '商品详情页面',
        detailId:'',
        detail:[],
        details:[],
        // 静态banner展示
        listImgA:[],
        storeLogo:require('../common/image/upload/store-s.jpg'),
        goodsPic:require('../common/image/upload/goods-detail-1.jpg'),
        logo:'this.src="'+require('../common/image/defaultimg.png')+'"',
        identityId:0,
        shows:false,
        bond:0,
        storeData:'',
        imgs:true,
        giftBuyShow:false,
        giftDetailId:0,
      }
    },
    created(){
    	window.scrollTo(0,0)
      this.giftDetailId = this.$route.query.gpId;
    },
    beforeRouteLeave(to,from,next){
		   if(to.fullPath == "/shopManagegift"){
		       this.$destroy();
		       console.log(this.$destroy())
		    }
		   next();
		},
    mounted : function(){
			this.identityId=JSON.parse(sessionStorage.getItem('identityId'))
    	this.detailId=JSON.parse(sessionStorage.getItem('detail'))
    	sessionStorage.removeItem("catId")
    	switch(this.identityId){
    		case 0:
    			break
    		case 1:
    			this.shows=false
    			break
    		case 2:
    			this.shows=true
    			break
    	}

    	this.$axios({
	  		method:'post',
	  		url:'/goods/giftPackageDetails',
	  		responseType: 'json',
	  		data:{
	  			gpId:this.$route.query.gpId
	  		}
	  	}).then(data=>{
          // console.log(data);
          // console.log('9999999999');
          // console.log(this.details);
          this.details.push(data.data.res_data)
          this.listImgA=data.data.res_data.giftPackageGallery
          if(data.status==200){
          	// sessionStorage.catId= data.data.good.catId
          	// this.bond=data.data.bond
          	this.detail=data.data.res_data.giftPackage

            var str = this.detail.intro;
            var a = str.split("jyimg:/");
            var all = "";
            for (var i=0;i<a.length;i++){
              if (i>=1){
                a[i] = "https://jymall-test.oss-cn-beijing.aliyuncs.com/"+a[i];
              }
              all += a[i]
            }
            this.detail.intro = all
            // console.log(this.detail)
            // console.log('1111111');
            // console.log(this.detail);
          	if(data.data.res_data.shopStore){
          		this.storeData = data.data.res_data.shopStore
          		this.imgs=true
          	}else{
          		this.imgs=false
          	}
            //sessionStorage.productId=JSON.stringify(data.data.productList[0].productId)
          }
	  	}).catch(err=>{
	  		console.log(err)
	  	})

    },
    methods: {
      hideGiftBuy:function(val){
        this.giftBuyShow = val;
      },
      showGiftBuy:function(){
        this.giftBuyShow = true;
      },
     goto(){
     	sessionStorage.buyState=1
//   	sessionStorage.removeItem("productId")
     	this.$router.push("/shop_manager")
     }

    },
    components : {
      'commonTop': commonTop,
      'giftFooterBuy':giftFooterBuy,
      'giftDetailTab':giftDetailTab,
    }
  }
</script>
<style lang="scss" scoped="scoped">
.buyNow{
    width: 100%!important;
}
.shopmanager{
	padding: 5px;
	font-size: .3rem;
	color: white;
	background: orangered;
	border-radius: 20px;
}

</style>
