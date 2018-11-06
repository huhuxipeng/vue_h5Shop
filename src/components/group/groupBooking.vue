<template>
	<div id="groupBooking">
		<!--<commonTop header-title="拼团" header-type="1" header-class="bg-white" has-back="true"></commonTop>-->
    <mt-header title="拼团" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
		<mt-swipe :auto="3000" class="banner">
			<mt-swipe-item>
				<img src="../../common/image/specialIndex/groupbanner.jpg" :onerror="logo" />
			</mt-swipe-item>
		</mt-swipe>
		<div class="title">
			<span></span>
			<span>大家正在拼</span>
			<span></span>
			<div class="cont">
				<ul>
					<li class="grouplist" v-for="(item,index) in recommend" @click="groupdetail(item,index)">
						<p><img :src="item.image |filterss(2)" :onerror="logo" /></p>
						<p>￥{{Number(item.spellPrice).toFixed(2)}}</p>
					</li>
				</ul>
			</div>
		</div>
		<ul class="goods-sort">
			<li class="all current" @click="synth">综合</li>
			<li class="price down" @click="moneys">价格<span><i></i><i></i></span></li>
			<li class="time down" @click="tim">时间<span><i></i><i></i></span></li>
			<li class="sell down" @click="sales">销量<span><i></i><i></i></span></li>
		</ul>
		<div class="main">
			<ul>
				<li v-for="(item,index) in groupList" @click="gogroup(item)">
					<p><img :src="item.image |filterss(2)" :onerror="logo" /></p>
					<p><span>{{item.goodsTitle}}</span></p>
					<p>
						<span class="prices">￥{{Number(item.spellPrice).toFixed(2)}}</span><span class="priced">已拼成{{item.alreadyNum}}件</span><br />
						<span>去开团</span>
					</p>
				</li>
			</ul>
		</div>
    <mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>
      <div class="bindingmobile">
        <p>欢迎登录</p>
        <p>
          <u class="icons name-icon"></u>
          <input type="text" placeholder="手机号" v-model="mobile" class="input">
        </p>
        <p>
          <u class="icons pw-icon"></u>
          <input type="number" placeholder="请输验证码" v-model="codes" class="input">
          <i class="btn codebtn" @click="gaincodes">获取验证码</i>
        </p>
        <p @click="bidingmobile">确认登录</p>
      </div>
    </mt-popup>
	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				recommend:[],
				groupList: [],
        num:1,
        clicks:true,
        mobile:"",
        codes:'',
        binding:false,
        states:true
			}
		},
		components: {
			'commonTop': commonTop,
		},
    created(){
		  if(sessionStorage.token==null){
        this.logins()
      }

    },
		mounted() {
      if(sessionStorage.token!=null) {
        sessionStorage.removeItem('detail')
        this.$axios({
          method: 'post',
          url: '/spell/anon/getSpellActivityPage',
          responseType: 'json',
          data: {
            pageNo: 0,
            pageSize: 0,
            sortType: 0,
            sortWay: 0,
          }
        }).then(data => {
          this.recommend = data.data.res_data.recommendedList
          // if(this.recommend.length>4){
          //   this.recommend=this.recommend.splice(0,4)
          // }
          this.groupList = data.data.res_data.spellActivityList
        }).catch(err => {
          console.log(err)
        })
      }
		},
		methods: {
      logins(){
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        let token = sessionStorage.getItem("token")

        if(token == null) {
          if(r == null) {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fgroup%2fgroupBooking&response_type=code&scope=snsapi_userinfo#wechat_redirect';
          } else {

            this.$axios({
              method:'post',
              url:'/basics/anon/appWxAuth',
              responseType:'json',
              data:{
                code: r[2],
                reqType: 0
              }
            }).then(data=>{
              console.log(data)
              sessionStorage.details = JSON.stringify(data.data.res_data);
              if(data.data.res_data.member){
                sessionStorage.details=JSON.stringify(data.data.res_data.member)
                sessionStorage.token=data.data.res_data.token

              }
              if(data.data.res_data.returnCode==0){
                this.binding=true;
              }
              window.location.reload()
            }).catch(err=>{
              console.log(err)
            })


          }
        }
      },
      bidingmobile(){
        if(this.states) {
          this.states = false

          var member = JSON.parse(sessionStorage.details)
          console.log(member)
          let obj = {
            'authType': 1,
            'face': member.face,
            'memberStatus': member.memberStatus,
            'mobile': this.mobile,
            'mobileCode': this.codes,
            'nickname': member.nickname,
            'openId': member.openId,
            'sex': member.sex,
            'subscriber': member.subscriber,
            'type': 8,
            'unionId': member.unionId
          }
          this.$axios({
            method: 'post',
            url: "/basics/anon/loginAuthorizedCode",
            responseType: 'json',
            data: obj
          }).then(data => {
            console.log(data)
            if (data.data.res_code == 0) {
              this.binding = false
              sessionStorage.details = JSON.stringify(data.data.res_data.member)
              sessionStorage.token = data.data.res_data.token
            } else {
              alert(data.data.res_info)
              this.states=true
            }

            if (data.data.res_data.member.subscribe != 1) {
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss = 3
              this.code = true
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
      gaincodes(){
        console.log(111)
        let token = sessionStorage.getItem("token");
        if(this.clicks==false){
          return false
        }

        var reg = /^1[1-9]\d{9}$/;
        console.log(reg.test(this.mobile))
        if(!(reg.test(this.mobile))) {
          alert("号码不正确")
        } else {
          this.clicks=false
          let times = 60;
          var tim = document.getElementsByClassName("codebtn")[0];
          tim.innerHTML = times + "S";
          let _this=this;
          var time = setInterval(function () {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              _this.clicks=true
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);
          this.$axios({
            method:'post',
            url:"/basics/anon/sendMobileCode",
            responseType: 'json',
            data:{
              mobile:this.mobile,
              type:8
            }
          }).then(data=>{
            console.log(data)
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      backgo(){
        this.$router.push('/')
      },
			//排序
			synth() {
				this.$axios({
					method: 'post',
					url: '/spell/anon/getSpellActivityPage',
					responseType: 'json',
					data: {
						pageNo: 0,
						pageSize: 0,
						sortType: 0,
						sortWay: 0,
					}
				}).then(data => {
					this.groupList = data.data.res_data.spellActivityList
				}).catch(err => {
					console.log(err)
				})
			},
			moneys(even) {
        if(this.num==1){
          this.num=0
          even.target.classList.remove('down')
        }else{
          this.num=1
          even.target.classList.add('down')
        }
				this.$axios({
					method: 'post',
					url: '/spell/anon/getSpellActivityPage',
					responseType: 'json',
					data: {
            sortType: 1,
            sortWay:this.num,
					}
				}).then(data => {
					console.log(data)
					this.groupList = data.data.res_data.spellActivityList
				}).catch(err => {
					console.log(err)
				})
			},
			tim(even) {
        if(this.num==1){
          this.num=0
          even.target.classList.remove('down')
        }else{
          this.num=1
          even.target.classList.add('down')
        }
				this.$axios({
					method: 'post',
					url: '/spell/anon/getSpellActivityPage',
					responseType: 'json',
					data: {

						sortType: 2,
						sortWay:this.num,
					}
				}).then(data => {
					console.log(data)
					this.groupList = data.data.res_data.spellActivityList
				}).catch(err => {
					console.log(err)
				})
			},
			sales(even) {
        if(this.num==1){
          this.num=0
          even.target.classList.remove('down')
        }else{
          this.num=1
          even.target.classList.add('down')
        }
				this.$axios({
					method: 'post',
					url: '/spell/anon/getSpellActivityPage',
					responseType: 'json',
					data: {
						sortType: 3,
						sortWay:this.num,
					}
				}).then(data => {
					console.log(data)
					this.groupList = data.data.res_data.spellActivityList
				}).catch(err => {
					console.log(err)
				})
			},
			groupdetail(val){
				console.log(val)
				this.$router.push({path:'/group/groupdetail',query:{activityId:val.activityId}})
			},
			gogroup(val) {

				this.$router.push({path:'/group/groupdetail',query:{activityId:val.activityId}})
			},

		}
	}
</script>

<style lang="scss" scoped="scoped">
	#groupBooking {
    .bindingmobile{
      width: 80%;
      margin: auto;
      background: white;

      p:first-child{
        text-align: center;
        font-size: .4rem;
        font-weight: bolder;
      }
      p{
        padding: .2rem;
        margin-bottom: .2rem;
      }
      p:last-child{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: orangered;
        color: white;
        padding: .2rem;
      }
      .codebtn{
        color: orangered;
      }
      .icons{
        width: 0.59rem;
        height: 0.7rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.33rem;
        &.name-icon{
          background-position: -2.56rem -1.7rem;
        }
        &.pw-icon{
          background-position:-3.55rem -3.95rem;
        }
      }
      .input{
        display: inline-block;
        font-size:0.32rem;
        color: #999;
        width: 4.3rem;
      }
    }
    .centers {
      background: #fff;
      color: black;
      height: auto;
      font-size: .5rem;
    }
		.banner {
			height: 3.5rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.goods-sort {
			position: relative;
			top: 0;
		}
		.title {
			margin-top: .3rem;
			margin-bottom: .3rem;
			text-align: center;
			line-height: 1;
			span {
				width: 1.5rem;
				vertical-align: middle;
				font-size: .4rem;
				display: inline-block;
				border: 1px solid #ccc;
			}
			span:nth-child(2) {
				width: 2.5rem;
				border: none;
			}
      .cont{
        padding:.2rem;
        ul{
          display: flex;
          justify-content: flex-start;
          color: orangered;
          font-size: .4rem;
          overflow: scroll;
          .grouplist{
            margin-right:.2rem;
            background:white;
            p:first-child{
              width: 2rem;
              height:2rem;
              margin-bottom: .2rem;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
          .grouplist:last-child{
            margin-right: 0;
          }

        }

      }
		}
		.main {
			ul {

				li {
					margin-bottom: .3rem;
					line-height: 1;
					p:first-child {
						width: 100%;
						text-align: center;
						img {
							width:100%;
							height:35%;
						}
					}
					p:nth-child(2) {
            padding: .2rem;
						font-size: .4rem;
						margin-top: .2rem;
						line-height: 1.5;
						color: #ccc;
						max-height: 1.5rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						word-break: break-all;
					}
					p:last-child {
            padding: .2rem;
            font-size: .3rem;
						margin-top: .3rem;
						display: flex;
						justify-content: space-between;
						vertical-align: middle;
						font-weight: 400;
						span:first-child {
							color: red;
							font-size: .5rem;
						}
						span:nth-child(2) {
							color: #CCCCCC;
							margin-left: 3.6rem;
						}
						span:last-child {
							padding: .2rem;
							color: white;
							background: orangered;
							text-align: center;
							border-radius: .2rem;
						}
						.priced,
						.prices {
							margin-top: .3rem;
						}
						.priced{
							font-size: .3rem;
						}
					}
				}
			}
		}
	}
</style>
