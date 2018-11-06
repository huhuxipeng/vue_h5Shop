<template>
  <div id="forgetpassword">
    <commonTop header-title="找回密码" header-type="1" header-class="bg-white" has-back="true"></commonTop>
    <div class="main">
      <div class="mobile">
        <u class="icons name-icon"></u>
        <input type="number" v-model="phones" placeholder="注册时填写的手机号码"/>
      </div>
      <div class="code">
        <u class="icons pw-icon"></u>
        <input type="number" v-model="codes" placeholder="验证码"/>
        <button class="time" @click="gets">获取验证码</button>
      </div>
      <p class="next" @click="nexts">下一步</p>
    </div>

  </div>
</template>

<script>
  import commonTop from '../../components/commonTop'

  export default {
    data() {
      return {
        phones: '',
        codes: ''
      }
    },
    components: {
      'commonTop': commonTop,
    },
    mounted() {

    },
    methods: {
      gets() {
        var reg = /^1[3|5|7|8]\d{9}$/;
        if (reg.test(this.phones)) {
          let token = sessionStorage.getItem("token");
          let times = 60;
          var tim = document.getElementsByClassName("time")[0];
          tim.setAttribute("disabled", "disabled")
          tim.innerHTML = times + "S";
          var time = setInterval(function () {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              tim.removeAttribute("disabled");
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);

          this.$axios({
            method: 'post',
            url: "/member/anon/sendMobileCodeNoToken",
            responseType: 'json',
            data: {
              mobile: this.phones,
              type: 2
            }
          }).then(data => {

          }).catch(err => {
            console.log(err);
          })
        } else {
          alert('手机号不正确')
        }
      },
      nexts() {
        this.$axios({
          method: 'post',
          url: "/member/anon/checkCodeNoToken",
          responseType: 'json',
          data: {
            mobile: this.phones,
            code: this.codes,
            type: 2
          }
        }).then(data => {
          if (data.data.res_code == 0) {
            this.$router.push({path: '/midefier/setPassword', query: {phones: this.phones}})
          } else {
            alert(data.data.res_info)
          }
        }).catch(err => {
          console.log(err);
        })

      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  #forgetpassword {
    width: 80%;
    background: white;
    margin: auto;
    margin-top: 2rem;
    .main {
      padding: .3rem;
      padding-left: .5rem;
      padding-right: .5rem;

      input {
        font-size: .4rem;
        margin-bottom: .2rem;
        outline: none;
        padding: .2rem;

      }
      .icons {
        width: 0.59rem;
        height: 0.59rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.33rem;
      }
      .mobile {
        border-bottom: 1px solid #ccc;
        margin-bottom: .3rem;
        .name-icon {
          background-position: -2.56rem -1.76rem;
        }
      }
      .code {
        border-bottom: 1px solid #ccc;
        margin-bottom: .3rem;
        .pw-icon {
          background-position: -3.55rem -3.95rem !important;
        }
        .time {
          padding: .2rem;
          font-size: .3rem;
          display: inline-block;
          position: absolute;
          right: 15%;
          vertical-align: middle;
          background: white;
          border: none;
          border-left: 1px solid #ccc;
          outline: none;
        }
      }
      .next {
        background: orangered;
        color: white;
        border: 1px solid orangered;
        border-radius: .2rem;
        text-align: center;
        padding: .3rem;
        font-size: .4rem;
      }
    }
  }
</style>
