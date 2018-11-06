<template>
    <div>
      <!--<div class="footer-menu-top"></div>-->
      <footer class="footer-menu" style="padding-bottom: .2rem;">
        <ul>
          <li :class="{'current':tabHome}" v-on:click="goHome">
            <span class="icons home-icon"></span>
            <i>首页</i>
          </li>
          <li :class="{'current':tabCategory}" v-on:click="goCategory">
            <span class="icons category-icon"></span>
            <i>分类</i>
          </li>
          <li :class="{'current':tabCar}" v-on:click="goCar">
            <span class="icons car-icon"></span>
            <i>购物车</i>
          </li>
          <li :class="{'current':tabUser}" v-on:click="goUser">
            <span class="icons user-icon"></span>
            <i>个人中心</i>
          </li>
        </ul>
      </footer>
    </div>
</template>

<script>
/*通用头部组件*/
export default {
  data () {
    return {
      tabHome:true,
      tabCategory:false,
      tabCar:false,
      tabUser:false,
    }
  },
  props:["currentMenu"],
  mounted:function(){
    if(this.currentMenu == '1'){
      this.tabHome = true;
      this.tabCategory = false;
      this.tabCar = false;
      this.tabUser = false;
    }
    else if(this.currentMenu == '2'){
      this.tabHome = false;
      this.tabCategory = true;
      this.tabCar = false;
      this.tabUser = false;
    }
    else if(this.currentMenu == '3'){
      this.tabHome = false;
      this.tabCategory = false;
      this.tabCar = true;
      this.tabUser = false;
    }
    else if(this.currentMenu == '4'){
      this.tabHome = false;
      this.tabCategory = false;
      this.tabCar = false;
      this.tabUser = true;
    }
  },
  methods:{
    goHome:function(){
      this.$router.push({path:'/'});
    },
    goCategory:function(){
      this.$router.push({path:'/goods/category'});
    },
    goCar:function(){
      this.$router.push({path:'/shoppingCart/list'});
    },
    goUser:function(){
      var hz='#mp.weixin.qq.com'
      this.$router.push({path:'/Percenter',query:{hz}});
    },
  },
}
</script>
