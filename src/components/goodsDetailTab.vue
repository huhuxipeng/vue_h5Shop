<template>
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">商品详情</mt-tab-item>
        <mt-tab-item id="2">评价</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1" style="min-height:6rem;width:10rem;">
          <article class="desc-article" v-html="intro">
          </article>
        </mt-tab-container-item>
        <mt-tab-container-item class="goods-assess-page" id="2">
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
          <img class="no_data" v-if="CommentList.length==0" src="../common/image/pic_nodata.png" />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
</template>

<script>
/*通用商品底部购买组件*/
export default {
  data () {
    return {
      tabDetail:false,
      tabAuality:false,
      tabAssess:false,
      detailId:'',
      selected:1,
      CommentList:[],
    }
  },
  props: ['intro','tabValue'],
  mounted:function(){
  this.selected = this.tabValue
    // if(this.tabValue == '1'){
    //   this.tabDetail = true;
    //   this.tabAuality = false;
    //   this.tabAssess = false;
    // }
    // else if(this.tabValue == '2'){
    //   this.tabDetail = false;
    //   this.tabAuality = true;
    //   this.tabAssess = false;
    // }
    // else if(this.tabValue == '3'){
    //   this.tabDetail = false;
    //   this.tabAuality = false;
    //   this.tabAssess = true;
    // }
  },
  watch: {
    selected(newValue){
    // this.$emit('tabValue', newValue);
    if(newValue=='2'){
      this.getCommentList();
    }
    }
  },
  methods:{
    getCommentList(){
      let detailId = this.$route.query.goodsId;
      this.$axios({
      	method:"post",
      	url:'/goods/goodsCommentList',
      	responseType:'json',
      	data:{
      		goodsId:detailId,
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
    goDetail:function(){
      var agent = navigator.userAgent.toLowerCase();
      if (agent.match(/MicroMessenger/i) == "micromessenger") {
        if(this.$route.path == "/goods/detail")return;
        this.$api.goback();
  // this.$router.push({path:'/goods/detail',query:{'goodsId':this.detailId}});
      }
    },
    goQuality:function(){
      this.$router.push({path:'/goods/qualite',query:{'goodsId':this.$route.query.goodsId}});
    },
    goAssess:function(){
      var agent = navigator.userAgent.toLowerCase();
      if (agent.match(/MicroMessenger/i) == "micromessenger") {
        this.$router.push({path:'/goods/assess',query:{'goodsId':this.$route.query.goodsId}});
      }
    },
  },
}
</script>
<style lang="scss" scoped>
	.middle-tab{
		display: flex;
		justify-content: space-around;
		li{
			flex: 1;
		}
	}
</style>
