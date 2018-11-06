<template>
  <div id="set">
    <mt-header flexd title="设置" class="header">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      <!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
    </mt-header>
    <div class="main">
      <div class="top">
        <p @click="setlogin">
          <span >登陆密码修改</span>
          <span v-if="detail.password==''">未设置</span>
          <span v-else></span>
          <span><img src="../../common/image/backgo.png" alt=""></span>
        </p>
        <p @click="setpaypassword">
          <span>支付密码</span>
          <span  v-if="detail.payPassword==''">未设置</span>
          <span v-else></span>
          <span><img src="../../common/image/backgo.png" alt=""></span>
        </p>
      </div>
      <div class="center">
        <p @click="setmobile">
          <span >手机绑定</span>
          <span v-if="mobile!=''">{{mobile}}</span>
          <span v-else>未设置</span>
          <span><img src="../../common/image/backgo.png" alt=""></span>
        </p>
        <p @click="clears">
          <span>清除缓存</span>
          <span></span>
          <span><img src="../../common/image/backgo.png" alt=""></span>
        </p>
      </div>
      <!--<div class="bottom">-->
        <!--&lt;!&ndash;<p @click="opinions">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>意见反馈</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>》</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</p>&ndash;&gt;-->
        <!--<p @click="abouts">-->
          <!--<span>关于我们</span>-->
          <!--<span></span>-->
          <!--<span><img src="../../common/image/backgo.png" alt=""></span>-->
        <!--</p>-->
      <!--</div>-->
    </div>


  </div>
</template>

<script>
  export default {
    name: "set",
    data() {
      return {
        detail: {},
        token: '',
        mobile: ''
      }
    },
    mounted() {
      this.token = sessionStorage.getItem('token')
      this.$axios({
        method: 'post',
        url: '/member/jifenyuetongji',
        responseType: 'json',
        data: {
          token: this.token
        }
      }).then(data => {
        this.detail = data.data.res_data.member
        this.mobile = this.detail.mobile
        this.mobile = this.detail.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      // opinions() {
      //   this.$router.push('/opinion')
      // },
      clears() {
        alert('清除成功')
      },
      setmobile() {
        this.$router.push('/midefier/boundmobile')
      },
      setpaypassword() {
        let payword = JSON.parse(sessionStorage.details);
        if (payword.payPassword == ''||payword.payPassword == null) {
          this.$router.push({path: '/midefier/boundRawPassword', query: {set: 0}})
        } else {
          this.$router.push({path: '/midefier/boundRawPassword', query: {set: 1}})
        }

      },
      setlogin() {
        this.$router.push('/forgetPassword')
      },
      backgo() {
        this.$router.go(-1)
      },
    },

  }
</script>

<style scoped lang="scss">
  #set {
    background: #eeeeee;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 10px;
      color: black;
      font-size: .5rem;
      /*border-bottom: 1px solid #ccc;*/
      z-index: 1000;
    }
    .main {
      margin-top: 1rem;
      font-size: .4rem;
      font-weight: bolder;
      p {
        padding: .2rem;
        padding-top: .3rem;
        padding-bottom: .3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeez;
        background: white;
        span {
          display: inline-block;
        }
        span:first-child{
          width: 3rem;
        }
        span:nth-child(2){
          float: right;
          margin-left: 4rem;
          color: #ccc;
        }
        span:nth-child(3){
          width: .3rem;
          height: .3rem;
          img{
            width: 40%;
            height: 100%;
          }
        }
      }
      .top, .center, .bottom {
        margin-bottom: .3rem;
      }
    }
  }
</style>
