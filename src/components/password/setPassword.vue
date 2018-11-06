<template>
	<div id="setpassword">
		<!--<commonTop header-title="设置支付密码" header-type="1" header-class="bg-white" has-back="true" v-if="msg"></commonTop>-->
    <commonTop header-title="设置登陆密码" header-type="1" header-class="bg-white" has-back="true"></commonTop>

    <div class="main">
			<div class="passwording">
        <u class="icons pw-icon"></u>
				<input type="number" v-model="passwording" placeholder="新密码(6-18位)" @keyup="keys"/>
			</div>
			<div class="passworded">
        <u class="icons pw-icon"></u>
				<input type="number" v-model="passworded" placeholder="确认密码(6-18位)" @keyup="keysed"/>
			</div>
			<p class="next" @click="success">完成</p>
		</div>
		<mt-popup popup-transition="popup-fade" v-model="showhiden">
			<div class="clears">
				<p>您未绑定手机，请先绑定<br />以便忘记密码后找回</p>
			</div>
			<div class="footers">
				<p @click="right">确认</p>
			</div>
		</mt-popup>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	import { Popup } from 'mint-ui';
	export default {
		data() {
			return {
				passwording: '',
				passworded: '',
				showhiden: false,
        // msg:true,
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {

		},
		methods: {
      keys(){
        if (this.passwording.length>18){
          alert('密码过长')
          this.passwording=this.passwording.slice(0,18)
        }
      },
      keysed(){
        if (this.passworded.length>18){
          alert('密码过长')
          this.passworded=this.passworded.slice(0,18)
        }
      },
			success() {
			  if (this.passwording==this.passworded){
			    if (this.passwording.length>5&&this.passwording.length<19){
            this.$axios({
              method:'post',
              url:'/member/anon/resetLoginPassword',
              responseType:'json',
              data:{
                mobile:this.$route.query.phones,
                newpassword:this.passwording
              }
            }).then(data=>{
              alert('修改成功')
              this.$router.push('/login')
            }).catch(err=>{
              console.log(err)
            })
          } else{
			      alert('密码（6-18位字符）')
          }

        } else{
			    alert('两次密码不一致')
        }

			},
			right(){
				this.showhiden=false
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#setpassword {
		.main {
      width: 90%;
      margin: auto;
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
      vertical-align: middle;
			.num {
				width: 2rem;
				height: 0.59rem;
				display: inline-block;
				vertical-align: middle;
				font-size: .4rem;
				text-align: right;
			}
			input {
				font-size: .4rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.passwording,
			.passworded {
				margin-bottom: .4rem;
        vertical-align: middle;

			}
			.next {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				padding: .3rem;
				font-size: .4rem;
				color: white;
				background: orangered;
			}
      .pw-icon {
        display: inline-block;
        width: .59rem;
        height: .59rem;
       vertical-align: middle;
        background-position: -2.5rem -2.4rem !important;
      }
		}
		.clears {
			width: 8.125rem;
			height: 2rem;
			border-radius: 20px;
			font-size: .4rem;
			text-align: center;
			line-height: 1rem;
		}
		.footers {
			display: flex;
			justify-content: space-between;
			text-align: center;
			p {
				flex: 1;
				padding: 5px;
				padding-left: 20px;
				padding-right: 20px;
				line-height: 1rem;
				font-size: .4rem;
			}
			p:last-child {
				background: #eee;
			}
			p:first-child {
				background: #f22d07;
				color: white;
			}
		}
	}
</style>
