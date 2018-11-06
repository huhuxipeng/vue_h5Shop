<template>
  <div class="goods-quality-page">
    <commonTop header-title="详情页" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <giftDetailTab tab-value="2" :giftdetail-id="giftDetailId"></giftDetailTab>
    <ul class="quality-list">
      <li>
        <span>商品编码</span>
        <i>{{detail.goodsSn}}</i>
      </li>
      <li>
        <span>品牌</span>
        <i>韩国</i>
      </li>
      <li>
        <span>分类</span>
        <i>洗发水</i>
      </li>
      <li>
        <span>产地</span>
        <i>巴西</i>
      </li>
      
    </ul>
    <giftFooterBuy></giftFooterBuy>
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
        prop:'',
        detail:[],
        giftDetailId:0,
      }
    },
    created(){
      this.giftDetailId = this.$route.query.gpId;
    },
    mounted : function(){
    	let propId=sessionStorage.getItem('detail')
    	this.prop=JSON.parse(propId)
//  	console.log(this.prop)
    	this.$axios({
    		method:'post',
    		url:'/goods/goodsDetails',
    		responseType: 'json',
    		data:{
    			goodsId:this.prop
    		}
    	}).then(data=>{
    		this.detail=data.data.good
//  		console.log(this.detail)
    	}).catch(err=>{
    		console.log(err)
    	})
    	
    	
    	
    	
    	
    },
    methods: {
      
    },
    components : {
      'commonTop': commonTop,
      'giftFooterBuy':giftFooterBuy,
      'giftDetailTab':giftDetailTab,
    }
  }
</script>
