<template>
  <div id="integral">
    <mt-header title='金币明细' class='center' style="font-weight: 500;">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="nav">
      <ul>
        <li @click="all">
          <span :class="{'bor':p==1}">全部记录</span>
        </li>
        <li @click="gain">
          <span :class="{'bor':p==2}">获得记录</span>
        </li>
        <li @click="hao">
          <span :class="{'bor':p==3}">消耗记录</span>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="article" v-if="topMenu">
        <div class="top leftTop">
          <div class="left_logo">
            <img src="../../common/image/goldCion.png" alt="">
          </div>
          <div class="right_message">
            <p class="coin">累计金币</p>
            <p class="num">{{coinSum}}</p>
          </div>
        </div>
        <div class="top">
          <div class="left_logo">
            <img src="../../common/image/goldCion.png" alt="">
          </div>
          <div class="right_message">
            <p class="coin">剩余金币</p>
            <p class="num">{{coinLess}}</p>
          </div>
        </div>
      </div>
      <div class="table_list">
        <!--<div class="table_title">-->
          <!--<ul>-->
            <!--<li>类型</li>-->
            <!--<li class="timeItem">时间</li>-->
            <!--<li class="item">金币</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="line"></div>-->
        <div class="table_content">
          <ul v-for="item in List">
            <li >{{item.coinType}}</li>
            <!--<li class="timeItem"></li>-->
            <li class="item">
              <p class="coinNum">{{item.coinNum>=0?'+'+item.coinNum:item.coinNum}}</p>
              <p class="timeItem">{{dateSwitch(item.createTime)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        col: true,
        yellow: false,
        clouds: false,
        p: 1,
        integrals: {},
        token: '',
        topMenu:true,
        coinSum:'',
        coinLess:'',
        List:[]
      }
    },
    components: {
      // Red,
      // Yellow,
      // cloud,
      // HELPS
    },
    mounted() {
      this.token = sessionStorage.token;
      this.$axios({
        method:'post',
        url:'member/memberCoinDetails',
        responseType: 'json',
        data:{
          coinType:'0',
          token:this.token
        }
      }).then(data=>{
         this.coinSum = data.data.res_data.memberCoinNum.coinSum;
        this.coinLess = data.data.res_data.memberCoinNum.coin;
        this.List = data.data.res_data.memberCoinDetails
      }).catch(err=>{
        console.log(err)
      })

    },
    methods: {
      backgo() {
        this.$router.go(-1);
      },
      gain(){
        this.topMenu = false
        this.p = 2
        this.$axios({
          method:'post',
          url:'member/memberCoinDetails',
          responseType: 'json',
          data:{
            coinType:'1',
            token:this.token
          }
        }).then(data=>{
          this.coinSum = data.data.res_data.memberCoinNum.coinSum;
          this.coinLess = data.data.res_data.memberCoinNum.coin;
          this.List = data.data.res_data.memberCoinDetails
        }).catch(err=>{
          console.log(err)
        })
      },
      all(){
        this.topMenu = true
        this.p = 1
        this.$axios({
          method:'post',
          url:'member/memberCoinDetails',
          responseType: 'json',
          data:{
            coinType:'0',
            token:this.token
          }
        }).then(data=>{
          this.coinSum = data.data.res_data.memberCoinNum.coinSum;
          this.coinLess = data.data.res_data.memberCoinNum.coin;
          this.List = data.data.res_data.memberCoinDetails
        }).catch(err=>{
          console.log(err)
        })
      },
      hao(){
        this.topMenu = false
        this.p = 3
        this.$axios({
          method:'post',
          url:'member/memberCoinDetails',
          responseType: 'json',
          data:{
            coinType:'2',
            token:this.token
          }
        }).then(data=>{
          this.coinSum = data.data.res_data.memberCoinNum.coinSum;
          this.coinLess = data.data.res_data.memberCoinNum.coin;
          this.List = data.data.res_data.memberCoinDetails
        }).catch(err=>{
          console.log(err)
        })
      },
      add0(m){
        return m<10?'0'+m:m;
      },
      dateSwitch(timestamp){
          var time = new Date(timestamp);
          var year = time.getFullYear();
          var month = time.getMonth()+1;
          var date = time.getDate();
          var hours = time.getHours();
          var minutes = time.getMinutes();
          var seconds = time.getSeconds();
          return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
        }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  #integral {
    background: #f5f5f5;
    .container{
      .article{
        height: 2.88rem;
        background-color: rgb(242,242,242);
        padding: .3rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .top{
          width: 4.5rem;
          height: 100%;
          background-color: white;
          display: flex;
          justify-content: space-around;
          .left_logo{
            width: .8rem;
            height: .8rem;
            margin-top: 1.2rem;
            /*background-color: #34ad2b;*/
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right_message{
            margin-top: .7rem;
            margin-left: -1rem;
            .coin{
              font-size: .4rem;
            }
            .num{
              text-align: center;
              font-size: .6rem;
              color: rgb(255,102,51);
              padding-top: .3rem;
              margin-left: -.12rem;
            }
          }
        }
        .leftTop{
          border-right: solid .1rem rgb(242,242,242);
        }

      }
      .table_list{
        font-size: .35rem;
        background-color: rgb(242,242,242);
        .line{
          height: .05rem;
          background-color: rgb(242,242,242);
        }
        .table_title ul{
          background-color: white;
          display: flex;
          justify-content: space-between;
          padding: .3rem;
          li{
            width: 30%;
            text-align: center;
          }
          .item{
            text-align: center;
          }
          .timeItem{
            width: 40%;
          }
        }
        .table_content ul{
          background-color: white;
          display: flex;
          justify-content: space-around;
          padding: .4rem;
          margin-bottom: .05rem;
          li:nth-child(1){
            padding-top: .15rem;
            width: 45%;
            text-align: left;
          }
          li:nth-child(2){
            width: 45%;
            text-align: right;
          }
          .item{
            /*text-align: center;*/
            p{
              /*text-align: center;*/
            }
            .coinNum{
              font-size: .38rem;
            }
          }
          .timeItem{
            font-size: .2rem;
            /*width: 40%;*/
            color: #999999;
            padding-top: .15rem;
          }
        }
      }
    }
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
