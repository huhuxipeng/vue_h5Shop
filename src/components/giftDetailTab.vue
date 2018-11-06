<template>
    <div>
      <ul class="middle-tab">
        <li :class="{'current':tabDetail}"  v-on:click="goDetail"><span>商品详情</span></li>
        <!--<li :class="{'current':tabAuality}" v-on:click="goQuality"><span>商品属性</span></li>-->
        <!--<li :class="{'current':tabAssess}" v-on:click="goAssess"><span>评价（34）</span></li>-->
      </ul>
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
    }
  },
  props: ['tabValue','giftdetailId'],
  mounted:function(){
    if(this.tabValue == '1'){
      this.tabDetail = true;
      this.tabAuality = false;
      this.tabAssess = false;
    }
    else if(this.tabValue == '2'){
      this.tabDetail = false;
      this.tabAuality = true;
      this.tabAssess = false;
    }
    else if(this.tabValue == '3'){
      this.tabDetail = false;
      this.tabAuality = false;
      this.tabAssess = true;
    }
    // console.log('0011000');
    // console.log(this.giftdetailId);
    // console.log('0011000');
  },
  methods:{
    goDetail:function(){
      this.$router.push({path:'/shopManagegiftDetails',query:{ gpId: this.giftdetailId}})
    },
    goQuality:function(){
      this.$router.push({path:'/giftQuality',query:{ gpId: this.giftdetailId}});
    },
    goAssess:function(){
      this.$router.push({path:'/giftAssess',query:{ gpId: this.giftdetailId}});
    },
  },  
}
</script>
