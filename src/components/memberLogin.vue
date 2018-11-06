<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div class="member-login-page">
		<commonTop header-title="登录" header-type="1" header-class="bg-white" right-router="/register" right-txt="注册"></commonTop>

		<!--right-txt="注册"-->
		<section class="content" v-if="transfrom">

			<div class="input-bar" >
				<u class="icons name-icon"></u>
				<input type="text" placeholder="手机号" v-model="searchOptions.name" class="input">
			</div>
			<div class="input-bar" >
				<u class="icons pw-icon"></u>
				<input type="number" placeholder="请输验证码" v-model="searchOptions.codes" class="input" @keydown="keydown">
				<i class="btn codebtn" v-on:click="gaincodess">获取验证码</i>
			</div>
			<button class="btn large-btn btn-login" v-on:click="login(1)">立即登录</button>
			<!--<button class="btn normal-btn red-btn btn-newUser" v-on:click="register" v-if="this.$urlstate.numb==1">新用户注册</button>-->
        <div class="pass">
          <span @click="forgetPw">忘记密码</span>
          <span></span>
          <span @click="passwordlogin">密码登录</span>
        </div>
		</section>

    <section class="content" v-if="!transfrom">

      <div class="input-bar">
        <u class="icons name-icon"></u>
        <input type="text" placeholder="手机号" v-model="mobile" class="input">
      </div>
      <div class="input-bar">
        <u class="icons pw-icon"></u>
        <input type="password" placeholder="请输密码" v-model="password" class="input" @keydown="keydown">
        <!--<i class="btn codebtn" v-on:click="codes">获取验证码</i>-->
      </div>
      <button class="btn large-btn btn-login" v-on:click="login(2)">立即登录</button>
      <!--<button class="btn normal-btn red-btn btn-newUser" v-on:click="register" v-if="this.$urlstate.numb==1">新用户注册</button>-->
      <div class="pass">
        <span @click="forgetPw">忘记密码</span>
        <span></span>
        <span @click="mobilelogin">短信验证登录</span>
      </div>
    </section>

    <!--<div class="other-login-top"></div>-->
    <!--<div class="other-login boderBox">-->
      <!--<fieldset>-->
        <!--<legend>第三方账号登录</legend>-->
      <!--</fieldset>-->
      <!--<div class="icons we-chart-icon" @click="weclogin"></div>-->
    <!--</div>-->


    <mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>
      <div class="bindingmobile">
        <p>欢迎登录</p>
        <p>
          <u class="icons name-icon"></u>
          <input type="text" placeholder="手机号" v-model="phonemobile" class="input">
        </p>
        <p>
          <u class="icons pw-icon"></u>
          <input type="number" placeholder="请输验证码" v-model="phonecodes" class="input">
          <i class="btn codebtn" @click="gaincodes">获取验证码</i>
        </p>
        <p @click="bidingmobile">确认登录</p>
      </div>
    </mt-popup>

	</div>

</template>
<script>
import commonTop from "../components/commonTop";
export default {
  data() {
    return {
      searchOptions: {
        name: "",
        codes: ""
      },
      datas: [],
      code: "",
      transfrom: true,
      mobile: "",
      password: "",
      states: true,
      binding: false,
      phonemobile: "",
      phonecodes: ""
    };
  },

  methods: {
    forgetPw: function() {
      this.$router.push({
        path: "/forgetPassword"
      });
    },
    mobilelogin() {
      this.transfrom = true;
    },
    passwordlogin() {
      this.transfrom = false;
    },
    //code
    gaincodess() {
      if (this.states == false) {
        return false;
      }

      var reg = /^1[1-9]\d{9}$/;
      console.log(this.searchOptions.name);
      console.log(reg.test(this.searchOptions.name));
      if (!reg.test(this.searchOptions.name)) {
        alert("号码不正确");
      } else {
        this.states = false;
        let times = 60;
        var tim = document.getElementsByClassName("codebtn")[0];
        tim.innerHTML = times + "S";
        let _this = this;
        var time = setInterval(function() {
          times--;
          tim.innerHTML = times + "S";
          if (times == 0) {
            _this.states = true;
            tim.innerHTML = "获取验证码";
            clearInterval(time);
          }
        }, 1000);
        this.$axios({
          method: "post",
          url: "/basics/anon/sendMobileCode",
          responseType: "json",
          data: {
            mobile: this.searchOptions.name,
            type: 7
          }
        })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    keydown(even) {
      let eve = even || window.event;

      if (eve.keyCode == 13) {
        this.login();
      }
    },
    login(val) {
      console.log(val);
      var obj = {};
      var url = "";
      if (val == 1) {
        obj = {
          mobile: this.searchOptions.name,
          code: this.searchOptions.codes,
          type: 7
        };
        url = "/basics/anon/checkCodeLogin";
        if (this.searchOptions.name == "") {
          alert("请输入用户名");
          return false;
        } else if (this.searchOptions.codes == "") {
          alert("请输入验证码");
          return false;
        }
      } else {
        obj = { uname: this.mobile, password: this.password };
        url = "/basics/onLogin";
        if (this.mobile == "") {
          alert("请输入用户名");
          return false;
        } else if (this.password == "") {
          alert("请输入密码");
          return false;
        }
      }

      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: obj
      })
        .then(data => {
          if (data.data.res_code == 0) {
            sessionStorage.token = data.data.res_data.token;
            sessionStorage.identityId = data.data.res_data.member.identityId;
            sessionStorage.details = JSON.stringify(data.data.res_data.member);
            sessionStorage.subscribe = data.data.res_data.member.subscribe;
            sessionStorage.openId = data.data.res_data.member.openId;

            // if(sessionStorage.getItem('needBack')){
            //   sessionStorage.removeItem('needBack');
            //   this.$router.go(-1);
            // }
            if (sessionStorage.pgths) {
              this.$router.push(sessionStorage.pgths);
              sessionStorage.removeItem("pgths");
            } else {
              this.$router.push({
                path: "/"
              });
            }
          } else {
            alert(data.data.res_info);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //微信登陆
    weclogin() {
      //				sessionStorage.removeItem('CODETYPE')
      //测试appid：wxf3c95148add7878f   回调地址：hh.cheertea.com //wx424ed7380f724652

      //线上appid：wxb4868f50223328db   线上的回调地址：wx.cheertea.com

      location.href =
        "http://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        this.$urlstate.appid +
        "&redirect_uri=https%3a%2f%2f" +
        this.$urlstate.url +
        "%2f%23%2flogin&response_type=code&scope=snsapi_userinfo#wechat_redirect";
    },
    gaincodes() {
      if (this.states == false) {
        return false;
      }

      var reg = /^1[3|5|8|7|9][0-9]\d{8}$/;
      console.log(reg.test(this.mobile));
      if (!reg.test(this.mobile)) {
        alert("号码不正确");
      } else {
        this.states = false;
        let times = 60;
        var tim = document.getElementsByClassName("codebtn")[0];
        tim.innerHTML = times + "S";
        let _this = this;
        var time = setInterval(function() {
          times--;
          tim.innerHTML = times + "S";
          if (times == 0) {
            _this.states = true;
            tim.innerHTML = "获取验证码";
            clearInterval(time);
          }
        }, 1000);
        this.$axios({
          method: "post",
          url: "/member/mobileCheck",
          responseType: "json",
          data: {
            mobile: this.mobile,
            token: token,
            type: 5
          }
        })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    bidingmobile() {
      let token = sessionStorage.getItem("token");
      let member = JSON.parse(sessionStorage.details);
      var reg = new RegExp("(^|&)" + "state" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      var regs = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var rs = window.location.search.substr(1).match(regs);
      //				alert(r[2])
      var match = /(\w+)\W/gi.exec(r);
      let obj = {};
      if (r[2]) {
        //parentId
        obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.subscriber,
          mobile: this.phonemobile,
          mobileCode: this.phonecodes,
          nickname: member.nickname,
          openId: member.openId,
          parentId: r[2],
          sex: member.sex,
          subscriber: member.subscriber,
          type: 8,
          unionId: member.unionId
        };
      } else if (match[1] == "state") {
        obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.subscriber,
          mobile: this.phonemobile,
          mobileCode: this.phonecodes,
          nickname: member.nickname,
          openId: member.openId,
          sex: member.sex,
          subscriber: member.subscriber,
          type: 8,
          unionId: member.unionId
        };
      }

      this.$axios({
        method: "post",
        url: "/basics/anon/loginAuthorizedCode",
        responseType: "json",
        data: obj
      })
        .then(data => {
          console.log(data);
          if (data.data.res_code == 0) {
            this.binding = false;
            if (sessionStorage.pgths) {
              this.$router.push(sessionStorage.pgths);
              sessionStorage.removeItem("pgths");
            } else {
              this.$router.go(-1);
            }
          } else {
            alert(data.data.res_info);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    commonTop: commonTop
  },
  mounted: function() {
    if (location.href.length > 50) {
      var reg = new RegExp("(^|&)" + "state" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      var regs = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var rs = window.location.search.substr(1).match(regs);
      //				alert(r[2])
      var match = /(\w+)\W/gi.exec(r);
      if (this.$urlstate.numb == 2) {
        if (match[1] == "state") {
          this.$axios({
            method: "post",
            url: "/basics/anon/appWxAuth",
            responseType: "json",
            data: {
              code: r[2],
              reqType: 0
            }
          })
            .then(data => {
              console.log(data);
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if (data.data.res_data.memberStatus == -1) {
                this.binding = true;
                return;
              }
              if (sessionStorage.pgths) {
                sessionStorage.removeItem("pgths");
                this.$router.push(sessionStorage.pgths);
              } else {
                this.$router.push("/Percenter?hz=%23mp.weixin.qq.com");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
