<!--本模块暂时未上线不再做-->
<template>
  <div id="helps">
    <mt-header flexd title="客服中心" class="shop" v-if="indexs==0">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="content">

    </div>
  </div>
</template>

<script>
  export default {
    name: "helpintegra",
    data(){
      return{
        indexs:0,
      }
    },
    mounted() {
      if(this.$route.query.indexs){
        this.indexs=this.$route.query.indexs
      }
    },
    methods:{
      backgo(){
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped lang="scss">
  #helps{
    .shop {
      background: #fff;
      color: black;
      height: auto;
      font-size: .5rem;
      padding: 10px;
      display: flex;
    }
    .content{
      padding: .2rem;
      font-size: .35rem;

    }

  }
</style>
