<template>
  <div id="opinion">
    <mt-header flexd title="意见反馈" class="header">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      <!--<mt-button icon="more" slot="right" @click='share'></mt-button>-->
    </mt-header>
    <div class="main">
      <textarea name="" placeholder="巨柚期待与您深入交流，留下您宝贵的建议和意见。" v-model="textareas"></textarea>
      <p class="mint">4-500个字</p>
      <div class="tell">
        <p>联系方式 <span> 非必填项</span></p>
        <p><input type="text" placeholder="QQ号、微信号" v-model="valueone"><input type="text" placeholder="手机号"
                                                                              v-model="valuetwo"></p>
      </div>
    </div>
    <div class="footer" @click="subimt">
      <p>提交意见和反馈</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "opinion",
    data() {
      return {
        textareas: '',
        valueone: '',
        valuetwo: ''
      }
    },
    mounted() {
      document.body.style.background = '#ededed'
    },
    methods: {
      subimt() {
        let token = sessionStorage.token
        if (this.valuetwo != '') {
          var reg = /^1[1-9]\d{9}$/;
          if (!(reg.test(this.valuetwo))) {
            alert('请输入正确的手机号')
            return false
          }
        }
        // console.log(this.textareas)
        // console.log(this.valueone)
        // console.log(this.valuetwo)
        if (this.textareas.length > 4 && this.textareas.length < 500) {

          this.$axios({
            method: 'post',
            url: 'member/feedback',
            data: {
              tencentNum: this.valueone,
              mobile: this.valuetwo,
              content: this.textareas,
              token: token
            },
            responseType: 'json'
          }).then(data => {
            console.log(data)
            if (data.data.res_code == 0) {
              alert(data.data.res_info)
              this.$router.go(-1)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          alert('请按要求输入您的意见')
        }

      },
      backgo() {
        document.body.style.background = 'none'
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped lang="scss">

  #opinion {

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
      textarea {
        resize: none;
        width: 8.8rem;
        height: 4rem;
        padding: .3rem;
        border: none;
        margin-top: .3rem;
        outline: none;
        margin-left: .3rem;
        border-radius: .2rem;
        position: relative;
      }
      .mint {
        position: absolute;
        right: 0.5rem;
        top: 5.2rem;
        color: rgb(204, 204, 204);
        font-size: .4rem;
      }
      .tell {
        margin-top: .3rem;
        padding: .3rem;
        p:first-child {
          font-size: .4rem;
          span {
            color: #ccc;
          }
        }
        p:nth-child(2) {
          margin-top: .2rem;
          display: flex;
          justify-content: space-between;
          input {
            flex: 1;
            margin-left: .2rem;
            border-radius: .2rem;
            padding: .2rem;
            font-size: .3rem;
          }
        }

      }
    }
    .footer {
      position: fixed;
      bottom: .5rem;
      left: 0;
      right: 0;
      p {
        background: orangered;
        color: white;
        text-align: center;
        border-radius: .1rem;
        padding: .3rem;
        font-size: .4rem;
        margin-left: .3rem;
        margin-right: .3rem;
      }
    }
  }
</style>
