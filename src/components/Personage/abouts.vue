<template>
  <div id="abouts">
    <mt-header flexd title="关于" class="header">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      <!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
    </mt-header>
    <div class="top">
      <img src="../../common/image/ziying.png" :onerror="logo" alt="">
    </div>
    <div class="main">
      <p @click="users">
        <span>用户协议</span>
        <span><img src="../../common/image/backgo.png" alt=""></span>
      </p>
      <p @click="helpcenter">
        <span>帮助中心</span>
        <span><img src="../../common/image/backgo.png" alt=""></span>
      </p>
      <p @click="opinions">
        <span>意见反馈</span>
        <span><img src="../../common/image/backgo.png" alt=""></span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "abouts",
    data() {
      return {
        logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
      }
    },
    mounted() {
      document.body.style.background = '#eee'
    },
    methods: {
      opinions() {
        this.$router.push('/opinion')
      },
      backgo(){
        document.body.style.background = 'none'
        this.$router.go(-1)
      },
      users(){
        this.$router.push('/users')
      },
      helpcenter(){
        // this.$router.push('/helpcenter')
        this.$router.push('/helpintegra')
      }
    },

  }
</script>

<style scoped lang="scss">
  #abouts {
    background: #eee;
    font-size: .4rem;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 10px;
      color: black;
      font-size: .5rem;
      z-index: 1000;
    }
    .top {
      margin-top: 1rem;

      img {
        border: 1px solid #ccc;
        border-radius: .2rem;
        width: 2rem;
        height: 2rem;
        margin: 40% 40% 5% 40%;
      }
    }
    .main {
      p {
        padding: .2rem;
        padding-top: .3rem;
        padding-bottom: .3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        background: white;
        span {
          display: inline-block;
        }
        span:nth-child(2){
          width: .3rem;
          height: .3rem;
          img{
            width: 40%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
