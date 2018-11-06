<template>
  <div class="goods-quality-page">
    <commonTop header-title="详情页" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <goodsDetailTab tab-value="2"></goodsDetailTab>
    <ul class="quality-list">
      <li>
        <span>商品编码</span>
        <i>{{detail.goodsSn}}</i>
      </li>
      <li>
        <span>商品分类</span>
        <i>{{detail.catName}}</i>
      </li>
       <li>
        <span>重量</span>
        <i>{{detail.weight}}</i>
      </li>
      <li>
        <span>单位</span>
        <i>{{detail.unit}}</i>
      </li>
      
    </ul>
  </div>
</template>
<script>
import commonTop from '../components/commonTop'
import goodsFooterBuy from '../components/goodsFooterBuy'
import goodsDetailTab from '../components/goodsDetailTab'
  export default{
    data () {
      return {
        msg : '商品详情页面',
        prop:'',
        detail:[]
      }
    },
    mounted : function(){
    	
    	this.prop=this.$route.query.goodsId;
    	this.$axios({
    		method:'post',
    		url:'/goods/goodsDetails',
    		responseType: 'json',
    		data:{
    			goodsId:this.prop
    		}
    	}).then(data=>{
    		this.detail=data.data.good
    		console.log(this.detail)
    	}).catch(err=>{
    		console.log(err)
    	})
    	
    	
    	
    	
    	
    },
    methods: {
      
    },
    components : {
      'commonTop': commonTop,
      'goodsDetailTab':goodsDetailTab,
    }
  }
</script>
