<template>
	<div id="register">
		<commonTop header-title="注册" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="mobile input-bar">
				<u class="icons name-icon"></u>
				<input type="number" v-model="phones" placeholder="手机号码" />
			</div>
			<div class="code">
				<u class="icons pw-icons"></u>
				<input type="number" v-model="codes" placeholder="验证码" />
				<button class="time" @click="gets">获取验证码</button>
			</div>
			<div class="password">
				<u class="icons pw-icon"></u>
				<input type="password" v-model="passwords" placeholder="密码（6-18位字符）"/>
			</div>
			<p class="registerSubmit" @click="register">注册</p>
      <p class="blu">注册视为同意《巨柚商城用户协议》</p>
		</div>

	</div>
</template>

<script>
	import commonTop from '../components/commonTop'
	export default {
		data() {
			return {
				phones: '',
				codes: '',
				passwords: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {

		},
		methods: {

			gets() {
				let token = sessionStorage.getItem("token");
        var reg = /^1[1-9]\d{9}$/;
        if(!(reg.test(this.phones))) {
          alert("号码不正确")
        } else {
          var times = 60;
          var tim = document.getElementsByClassName("time")[0];
          tim.setAttribute("disabled", "disabled")
          tim.innerHTML = times + "S";
          var time = setInterval(function() {
            times--;
            tim.innerHTML = times + "S";
            if(times == 0) {

              tim.removeAttribute("disabled");
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);

          this.$axios({
            method:'post',
            url:"/basics/anon/sendMobileCode",
            responseType: 'json',
            data:{
              mobile:this.phones,
              type:1
            }
          }).then(data=>{
            console.log(data)
            if(data.data.res_code!=0){
              alert(data.data.res_info)
              clearInterval(time);
              tim.innerHTML = "获取验证码";
            }
          }).catch(err=>{
            console.log(err);
          })


        }

			},
			register() {
			  if(this.passwords.length>5&&this.passwords.length<19){
          this.$axios({
            method:'post',
            url:'/basics/anon/memberRegister',
            responseType:'json',
            data:{
              code:this.codes,
              password:this.passwords,
              mobile:this.phones,
              type:1
            }
          }).then(data=>{
            if(data.data.res_code==0){
              alert('注册成功')
              this.$router.push('/login')
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
			    alert('密码（6-18位字符）')
        }


			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#register {
		.main {
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
      width: 80%;
      margin: auto;
			.icons {
				width: 0.59rem;
				height: 0.7rem;
				display: inline-block;
				vertical-align: middle;
				margin-right: 0.33rem;
			}
			input {
				font-size: .4rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.mobile {
				border-bottom: 1px solid #5A5A5A;
				margin-bottom: .3rem;
				.name-icon {
					background-position: -2.56rem -1.7rem;
				}
			}
			.code {
				border-bottom: 1px solid #5A5A5A;
				margin-bottom: .3rem;
        .pw-icons{
          background-position: -3.55rem -3.95rem !important;
        }
				.time {
					padding: .2rem;
					font-size: .3rem;
					display: inline-block;
					position: absolute;
					right: 8%;
					vertical-align: middle;
					background: white;
					border: none;
					border-left: 1px solid #ccc;
					outline: none;
          color: red;
				}
			}
			.password {
				border-bottom: 1px solid #5A5A5A;
				margin-bottom: .3rem;
				.pw-icon {
					background-position: -2.56rem -2.4rem;
				}

			}
			.registerSubmit {
				margin-top: .5rem;
				margin-left: .5rem;
				margin-right: .5rem;
        margin-bottom: .5rem;
				border: 1px solid orangered;
				text-align: center;
				padding: .3rem;
				border-radius: .1rem;
				font-size: .4rem;
        background: orangered;
        color: white;
			}
      .blu{
        color: blue;
        text-align: center;
      }
		}
	}
</style>
