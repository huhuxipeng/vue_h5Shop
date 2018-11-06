<template>
    <div>
      <!-- 状态1，背景白色，返回333色,标题333色 -->
      <div class="top-header" :class="[headerClass]" v-if="headerType=='1'">
          <i class="icons icon-back" v-if="hasBack" v-on:click="goBack"></i>
          <span class="title mine">{{headerTitle}}</span>
          <u class="sure-btn" :class="[rightIcon]" v-on:click="goRightPage">{{rightTxt}}</u>
      </div>
      <div class="top-header" :class="[headerClass]" v-if="headerType=='6'">
        <i class="icons icon-back" v-if="hasBack" v-on:click="goBackA"></i>
        <span class="title">{{headerTitle}}</span>
        <u class="sure-btn" :class="[rightIcon]" v-on:click="goRightPage">{{rightTxt}}</u>
      </div>
      <div class="top-header-space" v-if="headerType=='1'"></div>
      <!-- 状态2，背景透明，返回按钮白色 -->
      <div class="top-header" :class="[headerClass]" v-if="headerType=='2'">
          <i class="icons icon-back" v-if="hasBack" v-on:click="goBack"></i>
          <span>{{headerTitle}}</span>
          <u class="sure-btn" :class="[rightIcon]" v-on:click="goRightPage">{{rightTxt}}</u>
      </div>
      <!-- 状态3，背景白色，返回333色,搜索框 -->
      <div class="top-header" :class="[headerClass]" v-if="headerType=='3'">
          <i class="icons icon-back" v-if="hasBack" v-on:click="goBack"></i>
          <span class="search">
            <em class="icons search-btn"></em>
            <input type="text" placeholder="请输入商品名称" v-model="searchOptions.goods" class="input">
            <em class="icons clear-btn"></em>
          </span>
      </div>
      <div class="top-header-space" v-if="headerType=='3'"></div>
      <!-- 状态4，背景红色，返回白色,搜索框,右侧客服链接 -->
      <div class="top-header" :class="[headerClass]" v-if="headerType=='4'">
          <i class="icons icon-back" v-if="hasBack" v-on:click="goBack"></i>
          <span class="search">
            <em class="icons search-btn"></em>
            <input type="text" placeholder="搜索你想要的商品" v-model="searchOptions.product" class="input" @focus="search">
            <em class="icons clear-btn"></em>
          </span>
          <u class="service" v-on:click="goRightPage"><em class="icons service-icon"></em><p>{{rightTxt}}</p></u>
      </div>
      <!-- 状态5，返回，分享，购物车 -->
      <div class="top-header-space" v-if="headerType=='4'"></div>
      <div class="toolbar" v-if="headerType=='5'">
			<div class="left flex">
				<div  v-if="hasBack"  class="back" @click="goBack" ></div>
			</div>
			<div class="right flex">
        <!-- 先隐藏分享按钮 -->
				<!-- <div class="share" @click="sharefun"></div> -->
				<div class="shoppingcar" v-if="!hideCar"  @click="gocarfun"></div>
			</div>
		</div>
    </div>
</template>

<script>
/*通用头部组件*/
export default {
  data () {
    return {
      searchOptions:{
        goods:'',
        product:'',
        paySuccess:1
      }
    }
  },
  props:["hideCar","headerTitle","headerType","hasBack","headerClass","rightTxt","rightRouter","rightIcon",'gocarfun','sharefun'],
  mounted:function(){
    this.paySuccess=sessionStorage.getItem('paySuccess')
  },
  methods:{
    goBack:function(){
    	if(this.paySuccess==0 || this.paySuccess==false){
    		this.$router.push('/shoppingCart/list')
    		sessionStorage.removeItem("paySuccess")
    		sessionStorage.removeItem("orderId")
    	}else{
        this.$router.go(-1);
    		if(!sessionStorage.getItem('ORDERID')){
    			sessionStorage.removeItem("orderId")
    		}
    		if(sessionStorage.getItem('detailPrice')){
    			sessionStorage.removeItem('detailPrice')
    			sessionStorage.removeItem('SELSPECOBJ')
    		}
    		sessionStorage.removeItem('ORDERID')

    	}

    },
    goBackA:function(){
      // if(this.paySuccess==0 || this.paySuccess==false){
        this.$router.push('/order/listYYY')
      //   sessionStorage.removeItem("paySuccess")
      //   sessionStorage.removeItem("orderId")
      // }else{
      //   this.$router.push('/order/list')
      //   this.$router.go(-1);
      //   if(!sessionStorage.getItem('ORDERID')){
      //     sessionStorage.removeItem("orderId")
      //   }
      //   if(sessionStorage.getItem('detailPrice')){
      //     sessionStorage.removeItem('detailPrice')
      //     sessionStorage.removeItem('SELSPECOBJ')
      //   }
      //   sessionStorage.removeItem('ORDERID')
      //
      // }

    },
    goRightPage:function(){
    	if(this.rightRouter=='consult'){
    		this.$router.push({path:'/consult',query:{outId:0}});
    		return false
    	}else{
    		 if(this.rightRouter != undefined){
		        this.$router.push({path:this.rightRouter});
		     }else{
		        this.$emit('right-els',true);
		      }
    	}




    },
    search(){
    	this.$router.push('/searchShop?state=0')
    }
  },
}
</script>
<style lang="scss" scoped="scoped">
  .mine{
    background: white;
  }
</style>
