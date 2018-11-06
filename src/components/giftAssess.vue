<template>
  <div class="goods-assess-page">
    <commonTop header-title="详情页" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <giftDetailTab tab-value="3" :giftdetail-id="giftDetailId"></giftDetailTab>
    <ul class="assess-list">
      <li>
        <img class="user" :src="userPic">
        <em>铭**萨</em>
        <i>2017.09.09 12:23</i>
        <div class="article-list">
          <p>这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶不
错这茶壶不错这茶壶不错这茶壶不错这茶壶不错这
茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶
不错这茶壶不错这茶壶不错这茶壶不错这茶壶不错
这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错！</p>
          <section>
            <img :src="assessPic">
            <img :src="assessPic">
            <img :src="assessPic">
          </section>
        </div>
      </li>
      <li>
        <img class="user" :src="userPic">
        <em>铭**萨</em>
        <i>2017.09.09 12:23</i>
        <div class="article-list">
          <p>这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶不
错这茶壶不错这茶壶不错这茶壶不错这茶壶不错这
茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶
不错这茶壶不错这茶壶不错这茶壶不错这茶壶不错
这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错！</p>
          <section>
            <img :src="assessPic">
            <img :src="assessPic">
            <img :src="assessPic">
          </section>
        </div>
      </li>
      <li>
        <img class="user" :src="userPic">
        <em>铭**萨</em>
        <i>2017.09.09 12:23</i>
        <div class="article-list">
          <p>这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶不
错这茶壶不错这茶壶不错这茶壶不错这茶壶不错这
茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶
不错这茶壶不错这茶壶不错这茶壶不错这茶壶不错
这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错！</p>
          <section>
            <img :src="assessPic">
            <img :src="assessPic">
            <img :src="assessPic">
          </section>
        </div>
      </li>
      <li>
        <img class="user" :src="userPic">
        <em>铭**萨</em>
        <i>2017.09.09 12:23</i>
        <div class="article-list">
          <p>这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶不
错这茶壶不错这茶壶不错这茶壶不错这茶壶不错这
茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶
不错这茶壶不错这茶壶不错这茶壶不错这茶壶不错
这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错！</p>
          <section>
            <img :src="assessPic">
            <img :src="assessPic">
            <img :src="assessPic">
          </section>
        </div>
      </li>
      <li>
        <img class="user" :src="userPic">
        <em>铭**萨</em>
        <i>2017.09.09 12:23</i>
        <div class="article-list">
          <p>这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶不
错这茶壶不错这茶壶不错这茶壶不错这茶壶不错这
茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶壶
不错这茶壶不错这茶壶不错这茶壶不错这茶壶不错
这茶壶不错这茶壶不错这茶壶不错这茶壶不错这茶
壶不错这茶壶不错！</p>
          <section>
            <img :src="assessPic">
            <img :src="assessPic">
            <img :src="assessPic">
          </section>
        </div>
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
        userPic:require('../common/image/upload/user.jpg'),
        assessPic:require('../common/image/upload/assess-pic.jpg'),
        giftDetailId:0,
      }
    },
    created(){
      this.giftDetailId = this.$route.query.gpId;
    },
    mounted : function(){
      
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
