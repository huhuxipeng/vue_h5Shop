<template>
	<div id="boundmobile">
		<commonTop header-title="手机验证" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="code">
				<u class="num">+86</u>
				<input type="number" v-model="phones" placeholder="请输入您的手机号码" />
				<button class="time" @click="gets">获取验证码</button>
			</div>
			<div class="mobile">
				<u class="num">验证码</u>
				<input type="number" v-model="codes" placeholder="验证码" />
			</div>
			<p class="next" @click="nexts">立即绑定</p>
		</div>

	</div>
</template>

<script>
import commonTop from "../../components/commonTop";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      codes: "",
      phones: ""
    };
  },
  components: {
    commonTop: commonTop
  },
  mounted() {},
  methods: {
    gets() {
      if (!this.phones) {
        MessageBox("提示", "手机号码不能为空");
        return;
      }
      var reg = /^1[3|4|5|8|7|9][0-9]\d{8}$/;
      console.log(reg.test(this.phones));
      if (!reg.test(this.phones)) {
        MessageBox("提示", "号码不正确");
      }
      let token = sessionStorage.getItem("token");
      let times = 60;
      var tim = document.getElementsByClassName("time")[0];
      tim.setAttribute("disabled", "disabled");
      tim.innerHTML = times + "S";
      var time = setInterval(function() {
        times--;
        tim.innerHTML = times + "S";
        if (times == 0) {
          tim.removeAttribute("disabled");
          tim.innerHTML = "获取验证码";
          clearInterval(time);
        }
      }, 1000);

      this.$axios({
        method: "post",
        url: "/member/mobileCheck",
        responseType: "json",
        data: {
          mobile: this.phones,
          type: 5,
          token
        }
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    nexts() {
      let token = sessionStorage.getItem("token");
      this.$axios({
        method: "post",
        url: "/member/checkCode",
        responseType: "json",
        data: {
          code: this.codes,
          mobile: this.phones,
          token: token,
          type: 5
        }
      })
        .then(data => {
          if (data.data.res_code == 0) {
            Toast("提示信息");
            this.$router.push("/perIndex");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
#boundmobile {
  .main {
    padding: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    input {
      font-size: 0.35rem;
      margin-bottom: 0.2rem;
      outline: none;
      padding: 0.2rem;
    }
    .num {
      width: 1.5rem;
      height: 0.59rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.33rem;
      font-size: 0.4rem;
    }
    .mobile {
      margin-bottom: 0.3rem;
    }
    .code {
      margin-bottom: 0.3rem;
      .time {
        padding: 0.2rem;
        font-size: 0.3rem;
        display: inline-block;
        position: absolute;
        right: 8%;
        vertical-align: middle;
        background: white;
        border: none;
        border-left: 1px solid #ccc;
        outline: none;
      }
    }
    .next {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 0.3rem;
      font-size: 0.4rem;
      color: white;
      background: orangered;
    }
  }
}
</style>