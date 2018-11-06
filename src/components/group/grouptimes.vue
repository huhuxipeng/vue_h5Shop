<template>
  <div id="grouptime">
    <mt-header title="拼团详情" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="shoptop">
      <p><img :src="participateDetails.image |filterss(3)" :onerror="logo" /></p>
      <p>
        <span>{{participateDetails.goodsTitle}}</span>
        <span>
          <em>￥{{participateDetails.spellPrice}}</em>拼团省{{Number(participateDetails.goodsPrice-participateDetails.spellPrice).toFixed(2)}}元</span>
        <span>{{participateDetails.participateNum}}人拼团</span>
      </p>
    </div>
    <!--<div class="top">-->

    <!--</div>-->

    <section>
      <p class="sucStatus" v-if="participateDetails.status === 2">拼团成功</p>
      <p class="falStatus" v-if="participateDetails.status === 3">拼团失败</p>

      <!--<p class="fail_group" v-if='participateDetails.status==3'>-->
      <!--<span><img src="../../common/image/group/wran.png" /></span>-->
      <!--<span>拼团失败，款项将原路返回</span>-->
      <!--</p>-->
      <!--<p class="fail_group" v-if='participateDetails.status==2'>-->
      <!--<span><img src="../../common/image/group/wran.png" /></span>-->
      <!--<span>拼团成功</span>-->
      <!--</p>-->
      <!-- 如果没在团，并且团没满 -->
      <p class="losebtn" @click="invite('1')" v-if="participateDetails.status==1&&!offered">立即参团，右上角点击分享邀请</p>
      <!-- 如果团满了 -->
      <p class="losebtn" @click="invite('2')" v-else-if="participateDetails.status==2">我要继续开团</p>
      <!-- 如果团没满了，但是当前用户已经参团 -->
      <p class="losebtn" @click="invite('2')" v-else="offered">马上去开团，右上角点击分享邀请</p>

      <p class="time" v-if="participateDetails.status !== 2 && participateDetails.status !== 3 ">
        <span>{{times.hour || '00'}}</span>
        <span class="dian">:</span>
        <span>{{times.min || '00'}}</span>
        <span class="dian">:</span>
        <span>{{times.sec || '00'}}</span>
      </p>

      <ul class="grouplist">
        <li v-for="(item,index) in participateDetails.participateDetails">
          <p>
            <span v-if="index==0">拼主</span><img :src="item.face |filterss(3)" :onerror="logo" /></p>
        </li>
      </ul>
      <p v-if="participateDetails.status !== 2 && participateDetails.status !== 3 ">还差{{participateDetails.completeNum-participateDetails.participateNum>0?participateDetails.completeNum-participateDetails.participateNum:0}}人，人满才算拼团成功</p>
      <p v-if="participateDetails.status == 2 ">已满{{participateDetails.completeNum}}人，恭喜您拼团成功~</p>
      <p v-if="participateDetails.status == 3 ">拼团失败，款项将原路返回</p>

      <p class="notice">
        <span>拼团须知</span>
        <span>人满发货 人不满退款 拼团说明</span>
      </p>

    </section>

    <div class="footer">
      <ul class="desc">
        <li v-for="val in goodsList" @click="goodsdetail(val)">
          <div class="desc_img">
            <img :src="val.image |filterss(3)" :onerror='logo' />
          </div>
          <div class="name">
            <p>{{val.goodsName}}</p>
            <p>
              <span>￥{{Number(val.goodsPrice).toFixed(2)}}</span>
              <span></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' closeOnClickModal>
      <div id="wrap">
        <!--关闭按钮-->
        <p class="back" @click="close"><img src="../../common/image/qrcodeimg/close.png" slot="icon" /></p>
        <!--弹框内容-->
        <div class="content">
          <div class="conten">
            <p class="productImg"><img :src="participateDetails.image |filterss(3)" :onerror="logo" /></p>
            <p class="title">{{participateDetails.name}}</p>
            <p class="money">￥{{participateDetails.spellPrice}}</p>
          </div>
          <div v-if="goodsSpecList!=null">
            <div class="category" v-for="(item,index) in goodsSpecList">
              <p style="font-size:.4rem;">{{item.specName}}</p>
              <ul class="cate">
                <li :class="{'cols':child.show}" v-for="(child,key) in item.detail" @click="stand(child,index,key)">{{child.specValue}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footers">
          <p class="buynows" style="width:100%" @click="goshop">确定</p>
        </div>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" position="center" v-model='code' closeOnClickModal>
      <div class="code">
        <!--巨柚-->
        <p v-if="this.$urlstate.numb==2"><img src="../../common/image/attentionCode.jpg"></p>
        <!--天禾露-->
        <p v-else><img src="../../common/image/tattentioncode.jpg"></p>
        <p>
          <span>长按二维码关注公众号</span><br>
          <span>关注后点击右上角按钮刷新页面</span>
        </p>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" position="center" v-model='binding' closeOnClickModal>
      <div class="bindingmobile">
        <p>绑定手机号码!</p>
        <p>
          <u class="icons name-icon"></u>
          <input type="text" placeholder="手机号" v-model="mobile" class="input">
        </p>
        <p>
          <u class="icons pw-icon"></u>
          <input type="number" placeholder="请输验证码" v-model="codes" class="input">
          <i class="btn codebtn" @click="gaincodes">获取验证码</i>
        </p>
        <p @click="bidingmobile">确认绑定</p>
      </div>
    </mt-popup>
    <mt-popup popup-transition="popup-fade" position="center" v-model='moress' class='popups' closeOnClickModal>
      <div class="morelist" v-if="participateDetails.participateDetails">
        <p class="title"><img :src="participateDetails.participateDetails[0].face |filterss(3)" :onerror="logo" /></p>
        <p>参与拼团，每天拿好货~</p>
        <p>
          <span>你也可以参与拼团低价拿哦，<br />快去挑选心仪的商品吧~</span>
        </p>
        <p @click="goapp">去APP拼团拿好货</p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import wxlogin from "../../common/js/wxlogin";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      participateDetails: {},
      goodsList: [],
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      moress: false,
      popupVisible: false,
      shopdetai: [],
      product: [],
      matchProductId: "",
      goodsSpecList: "",
      selSpecObj: [],
      selSpecArr: [],
      sortSelSpecArr: [],
      code: false,
      binding: false,
      states: true,
      clicks: true,
      offered: false, //是否已参团
      mobile: "",
      codes: "",
      times: {
        houe: "",
        min: "",
        sec: ""
      }
    };
  },
  mounted() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
      console.log(sessionStorage.getItem("token"));
      if (sessionStorage.getItem("token") == null) {
        wxlogin(
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2fgroup%2fgrouptimes%3factivityId%3d" +
            this.$route.query.activityId +
            "%26spellId%3d" +
            this.$route.query.spellId +
            "&response_type=code&scope=snsapi_userinfo#wechat_redirect",
          this,
          o => {
            this.getSpellDetail();
          }
        );
      } else {
        this.getSpellDetail();
      }
    }
  },
  methods: {
    getSpellDetail() {
      this.$axios({
        method: "post",
        url: "/spell/anon/getSpellDetail",
        responseType: "json",
        data: {
          spellId: this.$route.query.spellId,
          token: sessionStorage.getItem("token")
        }
      })
        .then(data => {
          this.goodsList = data.data.res_data.recomendedList;
          this.participateDetails = data.data.res_data.spell;
          console.log("member", sessionStorage.details);
          this.offered = false;
          this.participateDetails.participateDetails.forEach(element => {
            if (
              element.memberId == JSON.parse(sessionStorage.details).memberId
            ) {
              //遍历参团成员列表，如果当前用户在里面就是已参团
              this.offered = true; //已参团
            }
          });
          // alert("是否可以参团"+this.participateDetails.isParticipate)
          let us = window.location.href.split("#")[0];
          this.fenxiang(us);
          this.settime(this.participateDetails.endDate);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fenxiang(a) {
      this.$axios({
        method: "post",
        url: "/basics/anon/wxSign",
        responsetype: "json",
        data: {
          url: a
        }
      })
        .then(data => {
          let datas = data.data.res_data.sign_info;
          this.wxInit(datas);
        })
        .catch(err => {
          console.log(err);
        });
    },
    wxInit(res) {
      let that = this;
      console.log("init");
      wx.config({
        // debug: true,
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareQZone",
          "hideMenuItems"
        ]
      });
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let imgsurl = that.participateDetails.shareImage;
      let href = window.location.href;
      wx.ready(function() {
        let obj = {
          title: that.participateDetails.shareTitle,
          desc: that.participateDetails.shareDescribe,
          link: href,
          imgUrl: imgsurl,
          success: function(res) {
            console.log(res);
          },
          cancel: function(err) {
            console.log(err);
          }
        };
        console.log("obj", obj);
        wx.onMenuShareAppMessage(obj);
        wx.onMenuShareTimeline(obj);
        wx.onMenuShareQQ(obj);
        wx.onMenuShareQZone(obj);
      });
    },
    wxfree(token) {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      var orderid = this.$route.query.spellId;
      var activity = this.$route.query.activityId;
      if (token == null) {
        // if(sessionStorage.numberss=='3'){
        //   sessionStorage.clear();
        //   location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.$urlstate.appid+'&redirect_uri=https%3a%2f%2f'+this.$urlstate.url+'%2f%23%2fgroup%2fgrouptimes%3fspellId%3D' + orderid + '%26activityId%3d' + activity +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        // }
        if (r == null) {
          location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2fgroup%2fgrouptimes%3fspellId%3D" +
            orderid +
            "%26activityId%3d" +
            activity +
            "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
        } else {
          this.$axios({
            method: "post",
            url: "/basics/wxLogin",
            responseType: "json",
            data: {
              code: r[2],
              reqType: 0
            }
          })
            .then(data => {
              sessionStorage.token = data.data.res_data.token;
              sessionStorage.details = JSON.stringify(
                data.data.res_data.member
              );
              // this.$router.push({
              // 	path: '/group/grouptimes',
              // 	query: {
              // 		spellId: this.$route.query.spellId,
              // 		activityId:this.$route.query.activityId
              // 	}
              // })
            })
            .catch(err => {
              console.log(err);
            });

          // this.$axios({
          //   method:'post',
          //   url:'/basics/anon/appWxAuth',
          //   responseType:'json',
          //   data:{
          //     code: r[2],
          //     reqType: 0
          //   }
          // }).then(data=>{
          //   console.log(data)
          //   sessionStorage.details = JSON.stringify(data.data.res_data);
          //   if(data.data.res_data.member){
          //     // let details=data.data.res_data.member
          //     // details['memberStatus']=data.data.res_data.memberStatus
          //
          //     sessionStorage.details=JSON.stringify(data.data.res_data.member)
          //     sessionStorage.token=data.data.res_data.token
          //   }
          //   if(data.data.res_data.returnCode==0){
          //     this.binding=true;
          //   }
          // }).catch(err=>{
          //   console.log(err)
          // })
        }
      }
    },

    bidingmobile() {
      console.log(this.states);
      if (this.states) {
        if (!this.mobile) {
          MessageBox("提示", "手机号码不能为空");
          this.states = true;
          return;
        }
        if (!this.$api.checkPhone(this.mobile)) {
          this.states = true;
          return;
        }
        if (!this.codes) {
          MessageBox("提示", "请输入验证码");
          this.states = true;
          return;
        }
        this.states = false;
        var member = JSON.parse(sessionStorage.details);
        console.log(member);
        let obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.memberStatus,
          mobile: this.mobile,
          mobileCode: this.codes,
          nickname: member.nickname,
          openId: member.openId,
          sex: member.sex,
          subscribe: member.subscribe,
          type: 8,
          unionId: member.unionId
        };
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
              sessionStorage.details = JSON.stringify(
                data.data.res_data.member
              );
              sessionStorage.token = data.data.res_data.token;
            } else {
              MessageBox("提示", data.data.res_info);
              this.states = true;
            }

            if (data.data.res_data.member.subscribe != 1) {
              sessionStorage.clear();
              localStorage.clear();
              sessionStorage.numberss = 3;
              this.code = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    gaincodes() {
      console.log(111);
      let token = sessionStorage.getItem("token");
      if (this.clicks == false) {
        return false;
      }

      var reg = /^1[3|5|8|7][0-9]\d{8}$/;
      console.log(reg.test(this.mobile));
      if (!reg.test(this.mobile)) {
        alert("号码不正确");
      } else {
        this.clicks = false;
        let times = 60;
        var tim = document.getElementsByClassName("codebtn")[0];
        tim.innerHTML = times + "S";
        let _this = this;
        var time = setInterval(function() {
          times--;
          tim.innerHTML = times + "S";
          if (times == 0) {
            _this.clicks = true;
            tim.innerHTML = "获取验证码";
            clearInterval(time);
          }
        }, 1000);
        this.$axios({
          method: "post",
          url: "/basics/anon/sendMobileCode",
          responseType: "json",
          data: {
            mobile: this.mobile,
            type: 8
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
    settime(timestamp) {
      console.log(timestamp);
      let that = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor(t / 3600000);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";

          if (day > 0) {
            // 		  if(day-1>0){
            //   hour=Number(hour)+(day-1)*24;
            //   that.times.hour=hour
            //   that.times.min=min
            //   that.times.sec=sec
            // }else{
            that.times.hour = hour;
            that.times.min = min;
            that.times.sec = sec;
            // }
            // format = `${hour}: ${min}: ${sec}`;
          }
          if (day <= 0 && hour > 0) {
            that.times.hour = hour;
            that.times.min = min;
            that.times.sec = sec;
            // format = `${hour}: ${min}: ${sec}`;
          }
          if (day <= 0 && hour <= 0) {
            that.times.hour = "";
            that.times.min = min;
            that.times.sec = sec;
            // format = `${'00'}: ${min}: ${sec}`;
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);
    },
    goapp() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.location.href =
          "http://sj.qq.com/myapp/detail.htm?apkName=com.qingyayuan.jymall";
      } else if (isiOS) {
        window.location.href =
          "https://itunes.apple.com/cn/app/id1236603713?mt=8";
      }
    },

    backgo() {
      // this.$router.push('/group/groupBooking')
      this.$router.go(-1);
    },
    close() {
      this.popupVisible = false;
      this.shopdetai.splice(0, this.shopdetai.length);
    },
    invite(val) {
      if (val == "1") {
        //立即参团
        if (
          this.participateDetails.status == 3 ||
          this.participateDetails.status == 4
        ) {
          this.$router.push("/group/groupBooking");
        } else if (this.participateDetails.status == 2) {
          this.$router.push("/group/mygroup");
        } else {
          this.popupVisible = true;
          this.specification();
        }
      } else if (val == "2") {
        //立即开团
        if (this.participateDetails.spellType) {
          //夺宝团
          this.$router.push("/seize/seizeIndex");
        } else {
          this.$router.push("/group/groupBooking");
        }
      }

      // 	if(this.participateDetails.status==3||this.participateDetails.status==4){
      //   this.$router.push('/group/groupBooking')
      // 	}else if(this.participateDetails.status==2){
      //   this.$router.push('/group/mygroup')
      // }else{
      //   this.popupVisible = true
      //   this.specification()
      // 	}
    },
    specification(goodsId) {
      //   if(sessionStorage.subscribe!=1){
      //     sessionStorage.clear();
      //     localStorage.clear();
      //     sessionStorage.numberss=3
      //   this.code=true
      // }else{
      this.$axios({
        method: "post",
        url: "/goods/anon/queryProductList",
        responseType: "json",
        data: {
          goodsId: this.participateDetails.goodsId
        }
      })
        .then(data => {
          this.shopdetai = data.data.res_data.goodsSpecList;
          this.product = data.data.res_data.productList;
          if (this.shopdetai[0].detail) {
            this.goodsSpecList = this.shopdetai;
            for (let i = 0; i < this.goodsSpecList.length; i++) {
              for (let j = 0; j < this.goodsSpecList[i].detail.length; j++) {
                this.goodsSpecList[i]["show"] = false;
              }
              this.goodsSpecList[i].detail[0]["show"] = true;

              this.selSpecArr.push(this.goodsSpecList[i].detail[0].specValueId);
              this.selSpecObj.push({
                specName: this.goodsSpecList[i].specName,
                specValue: this.goodsSpecList[i].detail[0].specValue,
                specValueId: this.goodsSpecList[i].detail[0].specValueId
              });
            }
            this.$set(this.goodsSpecList, "show", false);
            this.matchElsProductId();
          }
        })
        .catch(err => {
          console.log(err);
        });
      // }
    },

    matchElsProductId() {
      for (var i = 0; i < this.selSpecArr.length; i++) {
        this.sortSelSpecArr[i] = this.selSpecArr[i];
      }

      var len = this.sortSelSpecArr.length, // 数组的长度
        value, // 当前比较的值
        i, // 未排序部分的当前位置
        j; // 已排序部分的当前位置
      for (i = 0; i < len; i++) {
        // 储存当前位置的值
        value = this.sortSelSpecArr[i];
        /*
                     * 当已排序部分的当前元素大于value，
                     * 就将当前元素向后移一位，再将前一位与value比较
                     */
        for (j = i - 1; j > -1 && this.sortSelSpecArr[j] > value; j--) {
          this.sortSelSpecArr[j + 1] = this.sortSelSpecArr[j];
        }
        this.sortSelSpecArr[j + 1] = value;
      }

      let reg = this.sortSelSpecArr.toString();
      for (let i in this.product) {
        if (this.product[i].specValueIds == reg) {
          this.matchProductId = this.product[i].productId;
          //						this.store = this.product[i].store
        }
      }
      console.log(this.matchProductId);
    },
    // 选规格事件
    stand(els, i, j) {
      for (let b = 0; b < this.goodsSpecList[i].detail.length; b++) {
        this.goodsSpecList[i].detail[b].show = false;
      }

      els.show = true;
      let changeData = this.goodsSpecList[i].detail[j].show;
      this.$delete(this.goodsSpecList, "show");
      this.$set(this.goodsSpecList, "show", changeData);
      this.selSpecArr.splice(i, 1, els.specValueId);
      this.matchElsProductId();
      this.selSpecObj[i].specValue = els.specValue;
      this.selSpecObj[i].specValueId = els.specValueId;
    },
    goshop() {
      if (this.matchProductId == 0) {
        this.matchProductId = this.product[0].productId;
      }
      sessionStorage.spellId = this.$route.query.spellId;
      this.$router.push({
        path: "/groupBlance",
        query: {
          productId: this.matchProductId,
          activityId: this.$route.query.activityId,
          spellId: this.$route.query.spellId
        }
      });
    },
    goodsdetail(val) {
      console.log(val);
      this.$router.push({
        path: "/goods/detail",
        query: { goodsId: val.goodsId }
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
#grouptime {
  background: #eee;
  .centers {
    padding: 0.3rem;
    background: #fff;
    color: black;
    height: auto;
    font-size: 0.5rem;
  }
  .top {
    padding: 0.2rem;
    background: white;
    text-align: center;
    margin-bottom: 0.2rem;
    .time {
      height: 0.8rem;
      background: url(../../common/image/group/outtime.png) no-repeat;
      background-size: 100% 100%;
      width: 2.5rem;
      margin: 0.6rem auto 0;
      color: white;
      text-align: center;
      margin-bottom: 0.3rem;
    }
    p:nth-child(2) {
      font-size: 0.4rem;
      margin-bottom: 0.5rem;
    }
    p:last-child {
      font-size: 0.4rem;
      color: white;
      background: orangered;
      border-radius: 0.2rem;
      padding: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }
  }
  .shoptop {
    padding: 0.2rem;
    display: flex;
    background: white;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    p:nth-child(1) {
      flex: 1;
      margin-right: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p:nth-child(2) {
      flex: 2;
      span:nth-child(1) {
        font-size: 0.4rem;
        display: block;
        height: 2.2rem;
      }
      span:nth-child(2) {
        color: #999;
        margin-bottom: 0.15rem;
        display: block;
        em {
          color: red;
          font-size: 0.5rem;
          margin-right: 0.2rem;
        }
      }
      span:last-child {
        color: #999;
      }
    }
  }
  /*.btnDiv{*/
  /*margin: .2rem 0;*/
  /*background: white;*/
  /*text-align: center;*/
  /*}*/
  section {
    padding: 0.2rem 0.2rem 0.2rem 0.2rem;
    background: white;
    text-align: center;

    .sucStatus {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.4rem;
      border-bottom: solid 0.05rem rgb(240, 240, 240);
    }
    .falStatus {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.4rem;
      border-bottom: solid 0.05rem rgb(240, 240, 240);
    }

    .time {
      margin-bottom: 0.3rem;
      font-size: 0.3rem;
      display: inline-block;
      line-height: 0.6rem;
      span {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        background: rgb(51, 51, 51);
        color: white;
      }
      .dian {
        display: inline-block;
        height: 0.6rem;
        width: 0.1rem;
        line-height: 0.6rem;
        background: white;
        border: none;
        color: black;
      }
    }
    .grouplist {
      display: flex;
      justify-content: center;
      padding-bottom: 0.5rem;
      li {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
        p {
          position: relative;
          border-radius: 100%;
          span {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0.2rem;
            background: orangered;
            color: white;
          }
        }
      }
    }
    .shopname {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.3rem;
      span {
        display: inline-block;
      }
      span:last-child {
        width: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ccc;
        white-space: nowrap;
      }
    }
    .notice {
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      padding-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
      }
      span:last-child {
        width: auto;
        max-width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ccc;
        white-space: nowrap;
      }
    }
    .losebtn {
      margin-top: 0.2rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-bottom: 0.2rem;
      background: orangered;
      color: white;
      text-align: center;
      padding: 0.3rem;
      border-radius: 0.2rem;
      font-size: 0.4rem;
    }
    .fail_group {
      font-size: 0.35rem;
      margin-bottom: 0.1rem;
      vertical-align: middle;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.3rem;
        margin-bottom: 0.1rem;
        vertical-align: middle;
      }
    }
  }
  .footer {
    padding: 0.2rem;
    .desc li:nth-child(2n + 1) {
      margin-right: 2%;
    }
    .desc li {
      box-sizing: border-box;
      width: 49%;
      border: 1px solid #e6e6e6;
      margin-right: -1px;
      margin-bottom: 0.2rem;
      float: left;
      background: white;
      .desc_img {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          min-height: 5rem;
          max-height: 5rem;
        }
      }
    }
    .name {
      padding: 5px;
      overflow: hidden;
      p:nth-child(1) {
        height: 0.8rem;
      }
      p:nth-child(2) {
        width: 100%;
        min-height: 24px;
        margin-top: 10px;
        line-height: 20px;
        /*float: left;*/
        margin-left: -0.1rem;
        font-size: 0.4rem;
        display: flex;
        justify-content: space-between;
        span:first-child {
          color: red;
          display: inline-block;
        }
        span:last-child {
          color: #ccc;
          text-decoration: line-through;
          display: inline-block;
        }
      }
    }
  }
  .footer:after {
    content: "";
    display: block;
    clear: both;
  }
  .mint-popup {
    border-radius: 0.2rem;
    width: 90%;
    .morelist {
      background: white !important;
      margin: auto;
      padding: 0.3rem;
      width: 80%;
      text-align: center;
      margin-bottom: 0.3rem;
      p:nth-child(2) {
        margin-top: 0.5rem;
        color: #ccc;
      }
      .title {
        margin-top: -1rem;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
      }
      p:nth-child(3) {
        font-size: 0.4rem;
        margin-top: 0.3rem;
        line-height: 2.5;
      }
      p:nth-child(4) {
        /*margin-left: .4rem;*/
        /*margin-right: .4rem;*/
        background: orangered;
        color: white;
        text-align: center;
        padding: 0.3rem;
        border-radius: 0.2rem;
      }
    }
  }
  .mint-popup {
    width: 100%;
    #wrap {
      min-height: 6.83rem;
      min-width: 10rem;
      background: white;
      overflow: visible;
      .back {
        width: 0.83rem;
        position: absolute;
        top: -0.5rem;
        right: 0.33rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        padding: 10px;
        height: 80%;
        overflow: hidden;
        margin-bottom: 1rem;
        .conten {
          padding-bottom: 0.5rem;
          height: 2.5rem;
          .productImg {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 5px;
            float: left;
            margin-right: 0.5rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title {
            padding-top: 0.5rem;
            line-height: 0.4rem;
            font-weight: 800;
            overflow: hidden;
            max-height: 1rem;
            max-width: 5rem;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
          }
          .money {
            font-size: 0.4rem;
            color: red;
            line-height: 0.6rem;
          }
        }
        .category {
          clear: both;
          padding-bottom: 0.5rem;
          .cate {
            padding-top: 0.5rem;
            li {
              background: #eee;
              font-size: 0.4rem;
              border-radius: 0.5rem;
              margin-right: 0.4rem;
              margin-bottom: 0.16rem;
              padding: 0.2rem;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              float: left;
            }
            .cols {
              background: red;
              color: white;
            }
          }
          .cate:after {
            content: "";
            display: block;
            clear: both;
          }
        }
      }
      .footers {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        .addcars {
          padding: 0.5rem;
          background: #eeeeee;
          flex: 1;
        }
        .buynows {
          flex: 1;
          padding: 0.5rem;
          background: #f23c18;
          color: white;
          position: fixed;
          bottom: 0;
        }
        .export {
          display: inline-block;
          text-align: center;
          color: orangered;
          width: 100%;
          height: 1.3rem;
          float: right;
          line-height: 1.3rem;
          font-size: 0.4rem;
          background: #e0e0e0;
        }
      }
    }
  }
  .mint-popup {
    background: none;

    .code {
      border-radius: 0.2rem;
      width: 90%;
      margin: auto;
      text-align: center;
      background: white;
      p:nth-child(1) {
        line-height: 3rem;
        font-size: 0.5rem;
      }
      p:nth-child(2) {
        background: white;
        line-height: 2;
        text-align: center;
        font-size: 0.5rem;
        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }
      img {
        margin-top: 5%;
        width: 80%;
        height: 80%;
        vertical-align: bottom;
      }
    }
  }
  .bindingmobile {
    width: 80%;
    margin: auto;
    background: white;

    p:first-child {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bolder;
    }
    p {
      padding: 0.2rem;
      margin-bottom: 0.2rem;
    }
    p:last-child {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: orangered;
      color: white;
      padding: 0.2rem;
    }
    .codebtn {
      color: orangered;
    }
    .icons {
      width: 0.59rem;
      height: 0.7rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.33rem;
      &.name-icon {
        background-position: -2.56rem -1.7rem;
      }
      &.pw-icon {
        background-position: -3.55rem -3.95rem;
      }
    }
    .input {
      display: inline-block;
      font-size: 0.32rem;
      color: #999;
      width: 4.3rem;
    }
  }
}
</style>
