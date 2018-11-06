<template>
	<div id="SpecialIndex">
		<mt-swipe :auto="2500" class="banner">
			<mt-swipe-item v-for="(item,index) in images">
				<img :src="item.img" @click="specials(10)" />
			</mt-swipe-item>
		</mt-swipe>
		<div class="item">
			<ul>
				<li @click="synth('sign')"><img src="../common/image/specialIndex/ico_sign@2x.png" :onerror='logo' /><span>签到</span></li>
				<li @click="synth('bargain')"><img src="../common/image/specialIndex/bargain.png" :onerror='logo' /><span>砍价</span></li>
				<li @click="synth('group')"><img src="../common/image/specialIndex/groups.png" :onerror='logo' /><span>拼团</span></li>

				<li @click="synth('percenter')"><img src="../common/image/specialIndex/icon_Manager@2x.png" :onerror='logo' /><span>{{percenterlist.name}}</span></li>
			</ul>
		</div>
		<div class="ad">
			<mt-swipe :auto="2500" class="banner">
				<mt-swipe-item v-for="(item,index) in special">
					<img :src="item.img" @click="specials(index)" />
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="main">
			<div class="live work">
				<p class="header">
					<span>办公用品</span>
					<span @click="category('办公用品')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contnetfooter">
						<p @click="categorys('497')">
							<img src="../common/image/specialIndex/a1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('498')">
							<img src="../common/image/specialIndex/a2@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('499')">
							<img src="../common/image/specialIndex/a3@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live">
				<p class="header">
					<span>生活超市</span>
					<span @click="category('生活超市')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('1007')">
							<img src='../common/image/specialIndex/b1@2x.png' :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1005')">
							<img src='../common/image/specialIndex/b2@2x.png' :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('1019')">
							<img src='../common/image/specialIndex/b3@2x.png' :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1018')">
							<img src='../common/image/specialIndex/b4@2x.png' :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1015')">
							<img src='../common/image/specialIndex/b5@2x.png' :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live foods" style="margin-bottom: 0;">
				<p class="header">
					<span>食品生鲜</span>
					<span @click="category('食品生鲜')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('560')">
							<img src="../common/image/specialIndex/c1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('290')">
							<img src="../common/image/specialIndex/c2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live fitness">
				<!--<p class="header">
					<span>滋补保健</span>
					<span @click="category('滋补保健')">更多>></span>
				</p>-->
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('808')">
							<img src="../common/image/specialIndex/c3@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('561')">
							<img src="../common/image/specialIndex/c4@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live skin">
				<p class="header">
					<span>美妆护肤</span>
					<span @click="category('美妆护肤')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('795')">
							<img src="../common/image/specialIndex/d1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1053')">
							<img src="../common/image/specialIndex/d2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<!--<div class="live fitness">
				<p class="header">
					<span>滋补保健</span>
					<span @click="category('滋补保健')">更多>></span>
				</p>
				<div class="livecontent" @click="category('滋补保健')">
					<div class="contenttop">
						<p>
							<img src="../common/image/specialIndex/m1.png" :onerror='logo' alt="" />
						</p>
						<p>
							<img src="../common/image/specialIndex/m2.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>-->
			<div class="live furniture">
				<p class="header">
					<span>居家家具</span>
					<span @click="category('居家家具')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('1026')">
							<img src="../common/image/specialIndex/e1@2x.png" :onerror='logo' alt="" />
						</p>
						<!--<p>
							<img src="../common/image/specialIndex/c2.png" :onerror='logo' alt="" />
						</p>-->
						<p @click="categorys('1031')">
							<img src="../common/image/specialIndex/e2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('1032')">
							<img src="../common/image/specialIndex/e3@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1033')">
							<img src="../common/image/specialIndex/e4@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('1071')">
							<img src="../common/image/specialIndex/e5@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live mom">
				<p class="header">
					<span>母婴用品</span>
					<span @click="category('母婴用品')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('914')">
							<img src="../common/image/specialIndex/f1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('979')">
							<img src="../common/image/specialIndex/f2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('917')">
							<img src="../common/image/specialIndex/f3@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('918')">
							<img src="../common/image/specialIndex/f4@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('922')">
							<img src="../common/image/specialIndex/f5@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live teawater">
				<p class="header">
					<span>茶饮酒水</span>
					<span @click="category('茶饮酒水')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('463')">
							<img src="../common/image/specialIndex/g1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('479')">
							<img src="../common/image/specialIndex/g2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>

			<div class="live appliances">
				<p class="header">
					<span>数码家电</span>
					<span @click="category('数码家电')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('958')">
							<img src="../common/image/specialIndex/h1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('959')">
							<img src="../common/image/specialIndex/h2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('969')">
							<img src="../common/image/specialIndex/h3@2x.png" :onerror='logo' alt="" />
						</p>

						<p @click="categorys('970')">
							<img src="../common/image/specialIndex/h4@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live fruits">
				<p class="header">
					<span>水果生鲜</span>
					<span @click="category('水果生鲜')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('972')">
							<img src="../common/image/specialIndex/i1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('973')">
							<img src="../common/image/specialIndex/i2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('974')">
							<img src="../common/image/specialIndex/i3@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('975')">
							<img src="../common/image/specialIndex/i4@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('976')">
							<img src="../common/image/specialIndex/i5@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>

			<div class="live shose">
				<p class="header">
					<span>鞋服箱包</span>
					<span @click="category('鞋服箱包')">更多>></span>
				</p>
				<div class="livecontent">

					<div class="contnetfooter">
						<p @click="categorys('395')">
							<img src="../common/image/specialIndex/j1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('399')">
							<img src="../common/image/specialIndex/j2@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('791')">
							<img src="../common/image/specialIndex/j3@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live overseas">
				<p class="header">
					<span>海外产品</span>
					<span @click="category('海外产品')">更多>></span>
				</p>
				<div class="livecontent">
					<div class="contenttop">
						<p @click="categorys('543')">
							<img src="../common/image/specialIndex/k1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('509')">
							<img src="../common/image/specialIndex/k2@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
					<div class="contnetfooter">
						<p @click="categorys('992')">
							<img src="../common/image/specialIndex/k3@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('994')">
							<img src="../common/image/specialIndex/k4@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('996')">
							<img src="../common/image/specialIndex/k5@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live ACC">
				<p class="header">
					<span>生活配饰</span>
					<span @click="category('生活配饰')">更多>></span>
				</p>
				<div class="livecontent">

					<div class="contnetfooter">
						<p @click="categorys('398')">
							<img src="../common/image/specialIndex/l1@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('401')">
							<img src="../common/image/specialIndex/l2@2x.png" :onerror='logo' alt="" />
						</p>
						<p @click="categorys('981')">
							<img src="../common/image/specialIndex/l3@2x.png" :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>
			<div class="live sexs">
				<p class="header">
					<span>两性用品</span>
					<span @click="category('两性用品')">更多>></span>
				</p>
				<div class="livecontent">

					<div class="contnetfooter">
						<p @click="categorys('925')">
							<img src='../common/image/specialIndex/m1@2x.png' :onerror='logo' alt="" />
						</p>
						<p @click="categorys('976')">
							<img src='../common/image/specialIndex/m2@2x.png' :onerror='logo' alt="" />
						</p>
					</div>
				</div>
			</div>

		</div>
		<commonFooter current-menu="1"></commonFooter>
    <mt-popup popup-transition="popup-fade" position="center" v-model='code' class='popups' closeOnClickModal>
      <div class="code">
        <!--巨柚-->
        <p v-if="this.$urlstate.numb==2"><img src="../common/image/attentionCode.jpg" ></p>
        <!--天禾露-->
        <p v-else><img src="../common/image/attentionCode.jpg" ></p>
        <p><span>长按二维码关注公众号</span><br><span>关注后点击右上角按钮刷新页面</span></p>
      </div>
    </mt-popup>
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
	import commonFooter from '../components/commonFooter'
  import inidexNoude from '../components/moude/indexNoude'
	export default {
		data() {
			return {
        // content:[{'num':"1001"},{'num':"1"},{'num':"1004"},{'num':"1"},{'num':"1003"}],
				images: [{
					'img': require('../common/image/specialIndex/bargainbanner.jpg')
				}],
				special: [
          {
            'img': require('../common/image/specialIndex/ricebanner.jpg')
          },
				  {
						'img': require('../common/image/specialIndex/sanitarynapkin.jpg')
					}, {
						'img': require('../common/image/specialIndex/groupbanner.jpg')
					},
					{
						'img': require('../common/image/specialIndex/tissue.jpg')
					},
				],
				logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
				percenterlist: {
					'name': '申请店长'
				},
				indexs: 0,
        code:false,
        binding:false,
        mobile:"",
        codes:'',
        states:true,
        member:{},
        clicks:true,
			}
		},
		components: {
			'commonFooter': commonFooter,
      'inidexNoude':inidexNoude
		},

		mounted() {

		  sessionStorage.removeItem('CATERORY');
			sessionStorage.removeItem('CATERORYnum');

      var agent = navigator.userAgent.toLowerCase();
      if(agent.match(/MicroMessenger/i) == "micromessenger") {
        if(sessionStorage.numberss=='3'){
          this.login();
        }else{
          if(sessionStorage.getItem("token")==null){
            this.login();
          }
        }
      } else {
        return false;
      }

			this.indexs = sessionStorage.identityId
      console.log(this.indexs)
      if(this.indexs ==1){
        this.percenterlist.name='我是店长'

      }else if(this.indexs==2){
        this.percenterlist.name='申请店长'

      }else {
        this.percenterlist.name='申请店长'
      }

		},
		methods: {
      bidingmobile(){
        if(this.clicks){
          this.clicks=false
          var member=JSON.parse(sessionStorage.details)
          var regs = new RegExp("(^|&)" + 'state' + "=([^&]*)(&|$)");
          var rs = window.location.search.substr(1).match(regs);

          let parentId=rs[2]

          var obj={'authType':1,'face':member.face,'parentId':parentId,'memberStatus':member.memberStatus,'mobile':this.mobile,'mobileCode':this.codes,'nickname':member.nickname,'openId':member.openId,'sex':member.sex,'subscribe':member.subscribe,'type':8,'unionId':member.unionId}

          this.$axios({
            method:'post',
            url:"/basics/anon/loginAuthorizedCode",
            responseType: 'json',
            data:obj
          }).then(data=>{
            console.log(data)
            if(data.data.res_code==0){
              this.binding=false
              sessionStorage.details=JSON.stringify(data.data.res_data.member)
              sessionStorage.token=data.data.res_data.token
            }else {
              alert(data.data.res_info)
              this.clicks=true
            }

            if(data.data.res_data.member.subscribe!=1){
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss=3
              this.code=true
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      },

      login(){
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);

        let token = sessionStorage.getItem("token")

        if(token == null) {
          // alert(this.$urlstate.appid)
          // alert(this.$urlstate.url)
          if(sessionStorage.numberss=='3'){
            sessionStorage.removeItem('numberss');
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect'
          }
          if(r == null) {
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect';
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
            }).catch(err=>{
              console.log(err)
            })

          }
        }
      },
			category(value) {

				let header = document.getElementsByClassName("header")[0];
				sessionStorage.CATERORY = JSON.stringify(value);
				this.$axios({
					method: 'post',
					url: '/goods/getGoodsCatData',
					responseType: 'json',
				}).then(data => {
					this.titleList = data.data.goodsCat
					sessionStorage.titleList = JSON.stringify(this.titleList)
					this.$router.push('/goods/category')
				}).catch(err => {
					console.log(err)
				});

			},
			categorys(index) {
				sessionStorage.catId = index
				this.$router.push('/goods/list')
			},
			specials(index) {

				switch(index) {
					case 2:
            this.$router.push({
              path: '/group/groupBooking'})
						break;
					case 3:
            this.$router.push({
              path: '/goods/detail',
              query: {
                goodsId:7729
              }
            })
						break;
					case 0:
            this.$router.push({
              path: '/goods/detail',
              query: {
                goodsId:7717
              }
            })
						break;
					case 1:
            this.$router.push({
              path: '/goods/detail',
              query: {
                goodsId:7600
              }
            })
						break;
					case 10:
						this.$router.push({
							path: '/bargain/bargainshop',
							query: {
								state: 0
							}
						})
						break;
				}
			},
			synth(value) {
				if(value == 'sign') {
					this.$router.push('/myGold')
				} else
				if(value == 'bargain') {
					this.$router.push({
						path: '/bargain/bargainshop',
						query: {
							state: 0
						}
					})
				} else if(value == 'percenter') {
					this.percenter();
				} else {
          this.$router.push({path:'/group/groupBooking'})
			// 		alert('暂未开通')
				}

			},
			percenter() {
				let token = sessionStorage.getItem("token")
//				if(token) {
					if(this.indexs == 0) {
						this.$router.push('/Percenter')
					} else {
						let memberIds = JSON.parse(sessionStorage.getItem("details"));

						this.$axios({
							method: "post",
							url: '/member/seletConsumptionSituation',
							responseType: 'json',
							data: {
								token: token
							}
						}).then(data => {
							console.log(data)
							sessionStorage.memberId = memberIds.memberId
							switch(data.data.res_code) {
								//有手机号，消费满200
								case 1:
									this.$router.push('/lastOne');
									break;
									//有手机号，消费不满200
								case 0:
									this.$router.push('/mancenter')
									break;
									//没有手机号，消费不满200
								case 2:
									this.$router.push('/shop_manager')
									break;
									//没有手机号，消费满200
								case 3:
									sessionStorage.res_code = 3
									this.$router.push('/shop_manager')
									break;

									//有手机,充值不满200
								case 4:
									this.$router.push('/mancenter')
									break;
									//有手机,充值满200
								case 5:
									this.$router.push('/lastOne')
									break;
									//没有手机号，充值不满200
								case 6:
									this.$router.push('/shop_manager')
									break;
									//没有手机号，充值满200
								case 7:
									sessionStorage.res_code = 7
									this.$router.push('/shop_manager')
									break;
									//该会员已经购买店长礼包
								case 8:
									this.$router.push('/lastOne')
									break;
							}
						}).catch(err => {
							console.log(err)
						});
					}
//				} else {
//					this.$router.push('/login')
//				}
			},
      gaincodes(){
        console.log(111)
        let token = sessionStorage.getItem("token");
        if(this.states==false){
          return false
        }

        var reg = /^1[1-9]\d{9}$/;
        console.log(reg.test(this.mobile))
        if(!(reg.test(this.mobile))) {
          alert("号码不正确")
          this.states=true
        } else {
          this.states=false
          let times = 60;
          var tim = document.getElementsByClassName("codebtn")[0];
          tim.innerHTML = times + "S";
          let _this=this;
          var time = setInterval(function () {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              _this.states=true
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
		}
	}
</script>
