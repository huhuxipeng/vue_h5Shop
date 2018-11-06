<template>
    <div id="discount">
      <mt-header flexd title="会员折扣" class="header">
        <mt-button icon="back" @click="backgo" slot="left"></mt-button>
        <!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
      </mt-header>
      <div class="main" :class="{bgx:1==1}">
        <p class="apply" @click="applys" v-if="identityId!=1">申请成为店长</p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "discount",
      data(){
          return{
            identityId:0,

          }
      },
      mounted(){

      },
      methods:{
        backgo(){
          this.$router.go(-1)
        },
        applys(){
          alert(1111)
        },
      },
    }
</script>

<style scoped lang="scss">
#discount{
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 10px;
    color: black;
    font-size: .5rem;
    border-bottom: 1px solid #ccc;
    z-index: 1000;
  }
  .main{
    margin-top: 1rem;
    position: relative;
    .apply{
      width: 30%;
      position: absolute;
      left: 30%;
      top: 57%;
      padding: .3rem;
      color: white;
      text-align: center;
      font-size: .4rem;
      background: orangered;
      border-radius: .2rem;
    }
  }
.bgx{
  width: 100%;
  height: 17rem;
  background: url("../../common/image/pic_没有数据@2x.png") no-repeat;
  background-size: 100% 100%;
}






}
</style>
