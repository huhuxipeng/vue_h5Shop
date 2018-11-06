<template>
  <div class="goods-assess-page">
    <commonTop header-title="详情页" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <goodsDetailTab tab-value="3"></goodsDetailTab>
    <ul class="assess-list">
      <li v-for="(item,index) in CommentList">
        <img class="user" :src="item.weixinFace | filterss(3)">
        <em class="shotName">{{item.uanme}}</em>
        <i>{{item.commentTime | cycle}}</i>
        <div class="article-list">
          <p>{{item.content}}</p>
          <section v-if="item.image!=''&&item.image!=null" v-for="val in item.image">
            <img :src="val |filterss(1)">
          </section>
        </div>
      </li>
    </ul>

    <!--<goodsFooterBuy></goodsFooterBuy>-->
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
        detailId:'',
        CommentList:[],
      }
    },
    mounted : function(){
    	this.detailId = this.$route.query.goodsId;
      this.$axios({
      	method:"post",
      	url:'/goods/goodsCommentList',
      	responseType:'json',
      	data:{
      		goodsId:this.detailId,
      		pageNo:0,
      		pageSize:6
      	}
      }).then(data=>{
      	this.CommentList=data.data.res_data.dataList
      	for(let i=0;i<this.CommentList.length;i++){

      		if(this.CommentList[i].image==''||this.CommentList[i].image==null){
      			this.CommentList[i].image=null

      		}else{
      			this.CommentList[i].image=this.CommentList[i].image.split(',')
      		}

      	}
      		console.log(this.CommentList)
      }).catch(err=>{
      	console.log(err)
      })
    },
    filters:{
			//时间转换
			cycle:function (timestamp) {
			        var date = new Date(timestamp);
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        var D = date.getDate() + ' ';
			        var h = date.getHours() + ':';
			        var m = date.getMinutes() + ':';
			        var s = date.getSeconds();
			        return Y+M+D+' '+h+m+s;
			    }
		},
    methods: {

    },
    components : {
      'commonTop': commonTop,
      'goodsFooterBuy':goodsFooterBuy,
      'goodsDetailTab':goodsDetailTab,
    }
  }
</script>
<style  lang="scss" scoped="scoped">
.shotName{
  width:2.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
