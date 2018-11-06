<template>
  <div id="integral">
    <mt-header :title='msg' class='center' style="font-weight: 500;">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      <mt-button @click="helps" slot="right" class="assist">帮助</mt-button>
    </mt-header>
    <div class="nav">
      <ul>
        <li @click="re">
          <span :class="{'bor':p==1}">红积分</span>
        </li>
        <!--<li @click="yel">-->
          <!--<span :class="{'bor':p==2}">黄积分</span>-->
        <!--</li>-->
        <li @click="cloud">
          <span :class="{'bor':p==3}">云积分</span>
        </li>
      </ul>
    </div>
    <Red v-if='col'></Red>
    <yellow v-if='yellow'></yellow>
    <cloud v-if='clouds'></cloud>
    <!--<div class="upway" @click="goway">-->
    <!--<p>提现方式</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Red from './red'
  import Yellow from './yellow'
  import cloud from './cloud'

  import HELPS from './helpintegra'

  export default {
    data() {
      return {
        msg: "红积分",
        col: true,
        yellow: false,
        clouds: false,
        p: 1,
        integrals: {},
        token: '',
      }
    },
    components: {
      Red,
      Yellow,
      cloud,
      HELPS
    },
    mounted() {
      if (this.$route.query.indexs == 1) {
        this.re()
      } else if (this.$route.query.indexs == 2) {
        this.yel()
      } else if (this.$route.query.indexs == 3) {
        this.cloud();
      }

    },
    methods: {
      re() {
        this.col = true;
        this.yellow = false;
        this.clouds = false;
        this.p = 1;
        this.msg = "红积分"
      },
      yel() {
        this.col = false;
        this.yellow = true;
        this.clouds = false;
        this.p = 2;
        this.msg = "黄积分"
      },
      cloud() {
        this.col = false;
        this.yellow = false;
        this.clouds = true;
        this.p = 3;
        this.msg = "云积分"
      },
      backgo() {
        this.$router.push('/percenter')
      },
      goway() {
        this.$router.push('/Way')
      },
      helps() {
        this.$router.push('/helpintegra')
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  #integral {
    background: #f5f5f5;
    .center {
      background: #fff;
      color: black;
      height: auto;
      font-size: .55rem;
      padding: 10px;
      .assist {
        font-size: .35rem;
        color: orangered;
      }
    }
    .nav {
      overflow: hidden;
      border-bottom: 1px solid #eee;
      background: white;
      ul {
        font-size: 0;
        display: flex;
        color: black;
        li {
          flex: 1;
          text-align: center;
          font-size: .4rem;
          margin-left: -2px;
          padding: 20px;
          padding-bottom: 0;
          span {
            display: inline-block;
            padding-bottom: 10px;
            letter-spacing: 2px;

          }
          .bor {
            border-bottom: 2px solid red;
          }
        }
      }
    }
    .upway {
      padding: 10px;
      margin-top: .2rem;
      background: white;
      font-size: .4rem;
    }
    .is-right {
      .mint-button-text {
        font-size: .3rem !important;
      }
    }
  }

</style>
