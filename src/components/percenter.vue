<template>
  <div id="percenter">
    <div class="top">
      <div class="sets" @click="goset">
        <p>设置</p>
      </div>
      <div class="topleft">

        <div class="titimg" @click="perDetail">
          <div>
            <img :src="defaul.face |filterss(3)" class="log" :onerror="logo"/>
          </div>
          <!--<div v-if="defaul.weixinFace!=null">-->
          <!--<img :src="defaul.weixinFace |filterss(3)" class="log" :onerror="logo"/>-->
          <!--</div>-->
          <!--普通会员-->
          <div class="lable" v-if="member">
            <img src="../common/image/percenterImg/lable.png"/>
          </div>
          <!--店长-->
          <div class="lable" v-if="!member">
            <img src="../common/image/percenterImg/label_mana.png"/>
          </div>
        </div>
        <div class="data">
          <!--<p class="name" v-if="defaul.nickname!=null">{{defaul.nickname}}</p>-->
          <p class="name">{{defaul.nickname}}</p>
          <p>ID:{{defaul.memberId}}</p>
          <p v-if="numdetail.advance==null"><span class="mon">0.00</span><br>余额(元)
            <router-link to='/topup'><span class="topup">充值</span></router-link>
          </p>
          <p v-if="numdetail.advance!=null"><span class="mon">{{Number(numdetail.advance).toFixed(2)}}</span><br>余额(元)
            <router-link to='/topup'><span class="topup">充值</span></router-link>
          </p>

        </div>
      </div>

    </div>
    <div class="shopping">
      <div class="app">
        <div class="borderapp">
          <span class="jewel"><img :src="jewelimg" alt=""></span>
          <span class="apps" v-if="member" @click="setuoshop"><i></i>普通用户</span>
          <span class="markmoney" @click="setuoshop">{{hints}} <img src="../common/image/矩形-24.png" alt=""></span>
          <span v-if="!member">店长会员</span>
        </div>
      </div>
      <ul class="integral">
        <li v-for="(item,index) in integral" :key="index" @click="integralDetail(index)">
          <p>{{item.name}}</p>
          <p>{{Number(item.integral).toFixed(2)}}</p>
        </li>
      </ul>
    </div>

    <!--我的订单-->
    <div class="indent">
      <ul class="lineitem">
        <li v-for="(item,index) in deta" :key="index" @click="shop(index)">
          <span class="num" v-if="item.num"></span>
          <span><img :src="item.imgs" :onerror="logo"/></span><br/>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="bargain">
      <p>
        <span><img src="../common/image/my_gold.png"/></span>
        <span>砍价拿好货</span><br/>
        <span>和好友一起砍价，拿好货</span>
      </p>
      <p @click="gobargin"><span>前往砍价</span></p>
    </div>

    <div class="list" v-if="!member">
      <ul class="listtitle">
        <li @click="myqrcode">
          <span><img src="../common/image/percenterImg/mycode.png"/></span>
          <span>店长邀请码<br><span>开启店长</span></span>
        </li>
        <li @click="route('commodity')">
          <span><img src="../common/image/percenterImg/mucom.png"/></span>
          <span>我的商品 <br><span>您推荐的商品</span></span>
        </li>
        <!--<li @click="route('client')">-->
        <!--<span><img src="../common/image/percenterImg/my.png"/></span><br/>-->
        <!--<span>我的客户</span>-->
        <!--</li>-->
        <!--<li @click="route('way')">-->
        <!--<span><img src="../common/image/percenterImg/myclient.png"/></span><br/>-->
        <!--<span>提现方式</span>-->
        <!--</li>-->
      </ul>
      <ul class="listtitle">
        <!--<li @click="myqrcode">-->
        <!--<span><img src="../common/image/percenterImg/mycode.png"/></span><br/>-->
        <!--<span>我的二维码</span>-->
        <!--</li>-->
        <!--<li @click="route('commodity')">-->
        <!--<span><img src="../common/image/percenterImg/mucom.png"/></span><br/>-->
        <!--<span>我的商品</span>-->
        <!--</li>-->
        <li @click="route('client')">
          <span><img src="../common/image/percenterImg/my.png"/></span>
          <span>我的客户 <br><span>客户越多收益越高</span></span>
        </li>
        <li @click="route('bank/banklist?back=1')">
          <span><img src="../common/image/percenterImg/myclient.png"/></span>
          <span>我的银行卡 <br><span>提现银行卡管理</span></span>
        </li>
      </ul>
    </div>

    <div class="layout">
      <ul class="layouts">
        <!-- v-if="member"-->
        <li @click="poster"><i class="hb_code"></i><span>分享海报二维码</span><span></span></li>
        <li @click="myCoupon"><i class="my_yhq"></i><span>我的优惠券</span><span></span></li>
        <li v-if="member" @click="myqrcode"><i class="d"></i><span>我的邀请码</span><span></span></li>
        <li @click="gocollect"><i class="a"></i><span>商品收藏</span><span></span></li>
        <li v-if="member" @click="bank"><i class="f"></i><span>银行卡管理</span><span></span></li>
        <li @click="route('address')">
          <i></i><span>收货地址</span><span></span>
        </li>
        <!--<li @click="route('memberCard')">会员中心</li>-->
        <li @click="popupPhone=true"><i class="e"></i><span>我的客服</span><span></span></li>

        <!--<li @click="nos">
                    <span>我的优惠券</span>
                    <span></span>
                </li>-->
        <li @click="mygold">
          <i class="g"></i>
          <span>关于我们</span>
          <span></span>
        </li>

      </ul>

    </div>
    <commonFooter current-menu="4"></commonFooter>

    <mt-popup v-model="popupPhone" position="center">
      <div class="mint-msgbox" style="width:8rem;padding: .2rem">

        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">提示</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message padding">
            客服热线：{{phoneNum}}
          </div>

        </div>

        <div class="mint-msgbox-btns" style="justify-content: space-around;">
          <a @click="popupPhone=false" style="width:50%;text-align:center;">取消</a>
          <a :href=telPhoneNum style="color:#26a2ff;width:50%;text-align:center;">确定</a>
        </div>
      </div>
    </mt-popup>

    <!-- <img @click="scanCode" src="../common/image/goldCion.png"> -->
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import commonFooter from "../components/commonFooter";

export default {
  data() {
    return {
      popupPhone: false,
      phoneNum: 18950017127,
      telPhoneNum: "tel:" + 18950017127,
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      jewelimg: require("../common/image/threeindex/manager(1).png"),
      hints: "当店长，赚收益",
      member: false,
      defaul: [],
      integral: [
        {
          name: "红积分",
          integral: "0"
        },
        {
          name: "金币",
          integral: "0"
        },
        {
          name: "云积分",
          integral: "0"
        }
      ],
      deta: [
        {
          name: "购买订单",
          imgs: require("../common/image/percenterImg/gopay.png"),
          num: 0
        },
        {
          name: "拼团订单",
          imgs: require("../common/image/percenterImg/bargains.png"),
          num: 0
        },
        {
          name: "维权订单",
          imgs: require("../common/image/percenterImg/groups.png"),
          num: 0
        },
        {
          name: "兑换订单",
          imgs: require("../common/image/percenterImg/change.png"),
          num: 0
        }
      ],
      head: "",
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      headname: "",
      token: "",
      memberRedInfo: [],
      numdetail: []
    };
  },
  components: {
    commonFooter: commonFooter
  },
  mounted() {
        console.log('this.$route.matched', this.$route.matched)
    // this.fenxang();
    sessionStorage.removeItem("CATERORY");
    sessionStorage.removeItem("managerDetail");
    sessionStorage.removeItem("shop");
    this.token = sessionStorage.getItem("token");

    if (this.token) {
      this.$axios({
        method: "post",
        url: "/member/jifenyuetongji",
        responseType: "json",
        data: {
          token: this.token
        }
      })
        .then(data => {
          this.defaul = data.data.res_data.member;
          this.numdetail = data.data.res_data.member;
          this.integral[0].integral = this.numdetail.redPoint;
          this.integral[1].integral = this.numdetail.coin;
          this.integral[2].integral = this.numdetail.cloudPoint;

          sessionStorage.memberId = this.defaul.memberId;
          sessionStorage.details = JSON.stringify(this.numdetail);
          sessionStorage.identityId = this.numdetail.identityId;
          switch (this.numdetail.identityId) {
            case 1:
              this.head = require("../common/image/percenterImg/vip.png");
              this.headname = "店长";
              this.member = false;
              this.hints = "分享邀请";
              this.jewelimg = require("../common/image/threeindex/manager(1).png");
              break;
            case 2:
            case null:
              this.headname = "普通用户";
              this.member = true;
              this.hints = "当店长，赚取收益";
              this.jewelimg = require("../common/image/threeindex/manager(2).png");
              break;
          }
          this.$axios({
            method: "post",
            url: "order/orderCount",
            responseType: "json",
            data: {
              token: this.token
            }
          })
            .then(data => {
              let num = data.data.res_data.orderCount;

              for (var i = 0; i < num.length; i++) {
                switch (num[i].orderStatus) {
                  case "po":
                    this.deta[0].num = num[i].count;
                    break;
                  case "so":
                    this.deta[1].num = num[i].count;
                    break;
                  case "ro":
                    this.deta[2].num = num[i].count;
                    break;
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  methods: {
    // fenxang() {
    //   let us = window.location.href.split("#")[0];
    //   let that = this;
    //   // alert(us)
    //   this.$axios({
    //     method: "post",
    //     url: "/basics/anon/wxSign",
    //     responsetype: "json",
    //     data: {
    //       url: us
    //     }
    //   }).then(data => {
    //       let datas = data.data.res_data.sign_info;
    //       this.wxInit(datas);
    //     })
    //     .catch(err => {
    //       console.log('分享失败',err);
    //     });
    // },

    // wxInit(res) {
    //   let that = this;
    //   wx.config({
    //     appId: res.appId, // 必填，公众号的唯一标识
    //     timestamp: res.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: res.nonceStr, // 必填，生成签名的随机串
    //     signature: res.signature, // 必填，签名，见附录1
    //     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideMenuItems'],
    //   });
    //   let tokens=encodeURIComponent(that.$route.query.token)
    //   let imgsurl=that.filter(this.bargainGoods.goodsImage)
    //   wx.ready(function() {
    //     let obj = {
    //       title: that.bargainGoods.shareTitle,
    //       desc: that.bargainGoods.shareDescribe ,
    //       // link: 'http://test.cheertea.com/?#/bargain/bargainContfree?orderid=' + that.$route.query.orderid + '&token=' + that.$route.query.token,
    //       link:'http://'+that.$urlstate.url+'/?#/bargain/bargainContfree?orderid=' + that.$route.query.orderid + '&token=' +tokens,
    //       imgUrl:imgsurl, // 分享图标
    //       success: function(res) {
    //         console.log('成功',res)
    //       },
    //       cancel: function(err) {
    //         console.log('失败',err)
    //       }
    //     }
    //     wx.onMenuShareAppMessage(obj)
    //     wx.onMenuShareTimeline(obj)
    //     wx.onMenuShareQQ(obj)
    //     wx.onMenuShareQZone(obj)
    //   })
    // },
    //扫一扫
    // scanCode() {
    //   wx.scanQRCode({
    //     needResult : 1,
    //     scanType : [ "qrCode", "barCode" ],
    //     success : function(res) {
    //       console.log(res)
    //       alert(JSON.stringify(res));
    //       var result = res.resultStr;
    //     },
    //     fail : function(res) {
    //       console.log(res)
    //       alert(JSON.stringify(res));
    //     }
    //   });
    // },


    goset() {
      this.$router.push("/set");
    },

    nos() {
      alert("暂未开通，敬请期待");
    },
    mygold() {
      this.$router.push("/abouts");
    },
    //bangain
    bargain() {
      this.$router.push({ path: "/bargain/bargainlist", query: { state: 1 } });
    },
    gobargin() {
      this.$router.push({ path: "/bargain/bargainshop", query: { state: 0 } });
    },
    //grouporder
    groups() {
      sessionStorage.groupindex = 1;
      this.$router.push("/group/mygroup");
    },
    gocollect() {
      this.$router.push("/collectshop");
    },
    poster(){
      this.$router.push("/poster");
    },
    myCoupon() {
      this.$router.push("/myCoupon");
    },
    //路径跳转
    route(val) {
      this.$router.push("/" + val);
    },
    bank() {
      this.$router.push("/bank/banklist");
    },
    myqrcode() {
      this.$router.push({
        path: "/myQrcode",
        query: {
          memberId: this.defaul.memberId
        }
      });
    },
    //积分
    integralDetail(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: "/integral", query: { indexs: 1 } });
          break;
        case 1:
          // this.$router.push({path: '/integral', query: {indexs: 2}});

          this.$router.push({ path: "/coin/coinDetail" });
          break;

        case 2:
          this.$router.push({ path: "/integral", query: { indexs: 3 } });
          break;
      }
    },

    setuoshop() {
      if (this.member) {
        this.$axios({
          method: "post",
          url: "/member/seletConsumptionSituation",
          responseType: "json",
          data: {
            token: this.token
          }
        })
          .then(data => {
            console.log(data);
            // sessionStorage.memberId = this.defaul.memberId
            switch (data.data.res_code) {
              //有手机号，消费满200
              case 1:
                this.$router.push("/lastOne");
                break;
              //有手机号，消费不满200
              case 0:
                this.$router.push("/mancenter");
                break;
              //没有手机号，消费不满200
              case 2:
                this.$router.push("/shop_manager");
                break;
              //没有手机号，消费满200
              case 3:
                sessionStorage.res_code = 3;
                this.$router.push("/shop_manager");
                break;

              //有手机,充值不满200
              case 4:
                this.$router.push("/mancenter");
                break;
              //有手机,充值满200
              case 5:
                this.$router.push("/lastOne");
                break;
              //没有手机号，充值不满200
              case 6:
                this.$router.push("/shop_manager");
                break;
              //没有手机号，充值满200
              case 7:
                sessionStorage.res_code = 7;
                this.$router.push("/shop_manager");
                break;
              //该会员已经购买店长礼包
              case 8:
                this.$router.push("/lastOne");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push({
          path: "/myQrcode",
          query: { memberId: this.defaul.memberId }
        });
      }
    },
    // how() {
    //   this.$router.push('/howPercenter')
    //
    // },
    shop(index) {
      if (this.token) {
        switch (index) {
          case 0:
            this.$router.push("/order/list");
            sessionStorage.shop = 0;
            break;
          case 1:
            this.$router.push("/group/mygroup");
            break;
          case 2:
            this.$router.push("/rightOrder");
            break;
          case 3: //兑换订单列表
            this.$router.push({
              path: "/order/list",
              query: {
                isGoldChanger: true
              }
            });
            break;
        }
      } else {
        this.$router.push("/login");
      }
    },
    all() {
      if (this.token) {
        sessionStorage.shop = 0;
        this.$router.push("/order/list");
      } else {
        this.$router.push("/login");
      }
    },
    //会员
    //			renew(){
    //				this.$router.push("/memberCard")
    //			},

    //个人信息修改
    perDetail() {
      //个人信息
      this.$router.push("/perIndex");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/mixin.scss";

/** {*/
/*margin: 0;*/
/*padding: 0;*/
/*}*/

/*body {*/
/*height: 100%;*/
/*}*/

#percenter {
  height: 100%;
  background: #f5f5f5;
  padding-bottom: 1.36rem;
}

.padding {
  padding: 20px 0;
}
.top {
  height: 4rem;
  background: url(../common/image/percenterImg/headerbg.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  padding-bottom: 30px;
  .sets {
    float: right;
    p {
      margin-top: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  .topleft {
    width: 90%;
    height: 2rem;
    overflow: hidden;
    position: absolute;
    left: 15px;
    top: 50px;

    .titimg {
      width: 1.5rem;
      height: 1.5rem;
      background: white;
      text-align: center;
      margin-right: 10px;
      border-radius: 50%;
      float: left;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid red;
      }
      .log {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .lable {
        margin-top: -0.4rem;
        img {
          width: 80%;
          height: 80%;
        }
      }
    }
    .data {
      font-size: 0.3rem;
      font-weight: 200;
      line-height: 1.8;
      .name {
        font-size: 0.4rem;
        width: 37%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p:nth-child(2) {
        width: auto;
        margin-left: 0.3rem;
        font-size: 0.4rem;
      }
      p:nth-child(3) {
        margin-top: -1.5rem;
        text-align: center;
        float: right;
        z-index: 100;
        .mon {
          font-size: 0.5rem;
        }
        .topup {
          display: inline-block;

          margin-left: 0.3rem;
          /*margin-top:.5rem;*/
          text-align: center;
          width: 2rem;
          font-size: 0.35rem;
          border-radius: 0.2rem;
          color: black;
          border: 1px solid black;
        }
      }
    }
  }
  .topright {
    color: white;
    font-size: 0.35rem;
    text-align: center;
    position: absolute;
    right: 15px;
    top: 50px;
    line-height: 0.5rem;
    img {
      width: 60%;
      height: 60%;
    }
    .btns {
      display: inline-block;
      background: white;
      border-radius: 10px;
      padding: 1px;
      color: black;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
  }
  .login {
    font-size: 0.8rem;
    border-radius: 20px;
    border: 1px solid #fff;
    color: white;
    text-align: center;
    padding: 0.1rem;
    margin: 1.5rem 4em;
  }
}

.shopping {
  width: 90%;
  margin: auto;
  background: white;
  position: relative;
  top: -20px;
  border-radius: 10px;
  a {
    color: black;
  }
  .app {
    border-bottom: 1px solid #eee;
    .borderapp {
      padding: 0.3rem;
      .apps {
        display: inline-block;
        font-size: 0.4rem;
        width: 40%;
      }
      .markmoney {
        display: inline-block;
        font-size: 0.3rem;
        color: orangered;
        float: right;
        img {
          width: 0.2rem;
          height: 0.3rem;
          vertical-align: middle;
        }
      }
      .jewel {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        img {
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .integral {
    margin: auto;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    li {
      width: 33.33%;
      display: inline-block;
      line-height: 0.6rem;
      font-size: 0.4rem;
      float: left;
      padding: 20px;
      overflow: hidden;
      text-align: center;
      color: #ccc;
      p:nth-child(2) {
        color: black;
        font-weight: 600;
        font-size: 0.4rem;
      }
    }
  }
}

.list {
  background: white;
  padding: 10px;
  margin-bottom: 10px;
  .listtitle {
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      margin: 10px;
      font-size: 0.3rem;
      color: #666;
      vertical-align: middle;
      span {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        span {
          color: #ccc;
          margin-top: 0.05rem;
        }
      }
      img {
        width: 0.7rem;
        margin-right: 0.05rem;
        margin-left: 0.2rem;
      }
    }
  }
}

.indent {
  background: white;
  .indenttop {
    border-bottom: 1px solid #eee;
    padding: 10px;
    span:nth-child(1) {
      font-weight: 500;
    }
    span {
      font-size: 0.4rem;
      display: inline-block;
      width: 48%;
    }
    span:nth-child(2) {
      text-align: right;
      color: #999;
    }
  }
  .lineitem {
    padding: 10px;
    background: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    li {
      float: left;
      text-align: center;
      line-height: 0.5rem;
      color: #666;
      position: relative;
      min-width: 60px;
      img {
        width: 1.2rem;
      }
      .num {
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top: -0.1rem;
        right: 0rem;
        background: orangered;
        border-radius: 100%;
      }
      /*.num {
          width: .6rem;
          height: .4rem;
          line-height: .4rem;
          display: inline-block;
          background: orangered;
          color: white;
          text-align: center;
          border-top-left-radius: .3rem;
          border-top-right-radius: .2rem;
          border-bottom-right-radius: .3rem;
          position: absolute;
          top: -.2rem;
          right: -0.1rem;
          font-size: 10px;
        }*/
    }
  }
}

.layout {
  margin-bottom: 5px;
  .layouts {
    li {
      font-size: 0.4rem;
      color: #5c5c5c;
      padding: 20px;
      height: 10px;
      background: white;
      border-bottom: 1px solid #eee;
      i {
        margin-right: 0.2rem;
        display: inline-block;
        width: 12.8px;
        height: 12.8px;
        vertical-align: middle;
        background: url("../common/image/threeindex/zuhe.png") no-repeat;
        background-size: 2000%;
        background-position: -1px -1px;
      }
      .hb_code{
        margin-bottom: 0.09rem;
        background: url("../common/image/mycoupon/icon8.png") no-repeat;
        background-size: 100% 100%;
      }
      .my_yhq{
        margin-bottom: 0.09rem;
        background: url("../common/image/mycoupon/icon7.png") no-repeat;
        background-size: 100% 100%;
      }
      .a {
        background-position: -25.6px 0px;
        background-size: 1760%;
      }
      .d {
        background-position: -0.5px -12px;
        background-size: 1760%;
      }
      .f {
        background-position: -13.5px -13px;
        background-size: 1760%;
      }
      .e {
        background-position: -38.7px 0px;
        background-size: 1760%;
      }
      .g {
        background-position: -13.5px 0px;
        background-size: 1760%;
      }
      span:nth-child(3) {
        float: right;
        display: inline-block;
        width: 0.2rem;
        height: 0.3rem;
        background: url("../common/image/矩形-24.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .out {
    text-align: center;
    font-size: 0.4rem;
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    span {
      text-align: center;
      display: inline-block;
      padding: 0.1rem 0.2rem 0.1rem 0.4rem;
      letter-spacing: 0.2rem;
      border: 1px solid orangered;
      color: orangered;
      border-radius: 10rem;
    }
  }
}

.bargain {
  padding: 0.3rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  background: white;
  font-size: 0.4rem;
  display: flex;
  margin-bottom: 0.2rem;
  p:first-child {
    flex: 3;
    color: #9e9e9e;
    span:nth-child(2) {
      font-size: 0.4rem;
      font-weight: bolder;
      color: black;
    }
    span:first-child {
      width: 0.4rem;
      height: 100%;
      background-size: 100%;
      vertical-align: middle;
      line-height: 1.5;
      img {
        width: 12%;
        float: left;
        margin-right: 0.1rem;
      }
    }
  }
  p:last-child {
    flex: 1;
    margin-top: 0.3rem;
    font-size: 0.3rem;
    span {
      color: white;
      text-align: center;
      background: orangered;
      border-radius: 0.2rem;
      padding: 0.2rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }
  }
}
</style>
