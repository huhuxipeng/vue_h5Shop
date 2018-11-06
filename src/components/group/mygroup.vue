<template>
  <div id="mygroup">
    <mt-header title="我的拼团" class='centers'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>

    <div class="bargain">
      <p>
        <span><img src="../../common/image/my_gold.png" /></span>
        <span>砍价免费拿</span><br/>
        <span>和好友一起砍价，0元拿好货</span>
      </p>
      <p @click="gobargin">
        <span>前往砍价</span>
      </p>
    </div>
    <!-- <div class="tabbanner">
			<p class="myup by"  @click="source()">我发起的拼团</p>
			<p class="myjoins" @click="myjoin()">我参与的拼团</p>
		</div> -->
    <div class="tabbanner flex">
      <a v-for="(o,index) in statusList" class="menu" :class="{'active':o.isActive}" @click="seletStatus(index)">{{o.text}}</a>
    </div>
    <div class="content" style="position:absolute;top:3.6rem;left:0;right:0;bottom:0;">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <section class="goods-simple" v-for="(item,index) in orderList">
          <div class="store-info">
            <span class="icons store-icon"></span>
            <i>{{item.shopStoreName}}</i>
            <span class="icons arrow-icon"></span>
            <u>{{formatStatus(index)}}</u>
          </div>
          <ul class="goods-show">
            <li @click="orderdetail(item)" class="row">
              <img :src="item.image |filterss(3)" class="store-logo left" :onerror="logo">
              <span class="right">
                <h2>{{item.goodsTitle}}</h2>
                <p>规格：{{item.productSpecs}}
                  <i class="nums">X{{item.num}}</i>
                </p>
                <p style="text-align:right;color:black;">合计：￥{{item.orderAmount}}</p>
              </span>
            </li>
          </ul>
          <div class="row order_footer">
            <div class="left" v-if="item.status==1||item.status==3">
              <i>还差{{item.completeNum-item.participateNum}}人拼团成功</i>
            </div>
            <div v-else>
            </div>
            <div class="left times" v-if="item.status==1">
              <i>{{item.endDate | settime}}</i>
            </div>
            <!-- <div class="right flex" v-if="item.status==0">
              <span class="order_action black" @click="cancelOrder(item)">取消订单</span>
              <span class="order_action " @click="pay(item)">立即支付</span>
            </div>
            <div class="right flex" v-if="item.status==1">
              <span class="order_action btn-doing" @click="invinte(item)">邀请好友拼单</span>
            </div>
            <div class="right flex" v-if="item.status==2">
              <span v-if="item.orderStatus==0" class="order_action black" @click="cancelOrder(item)">取消订单</span>
              <span v-if="item.orderStatus==0" class="order_action " @click="pay(item)">立即支付</span>
              <span v-if="item.spellType==1&&item.orderStatus!=3" class="order_action " @click="prizeDetail(item)">中奖详情</span>
              <span v-if="item.orderStatus==2" class="order_action " @click="applyfo(item)">确认收货</span>
              <span v-if="item.orderStatus==3||item.orderStatus==-6" class="order_action black" @click="deleteOrder(item)">删除订单</span>
            </div>
            <div class="right" v-if="item.status==3">
              <span class="order_action black" @click="deleteOrder(item)">删除订单</span>
            </div>
            <div class="right" v-if="item.status==4">
              <span class="order_action black" @click="deleteOrder(item)">删除订单</span>
            </div> -->
            <div class="right flex">
              <span v-if="item.orderStatus==0" class="order_action black" @click="cancelOrder(item)">取消订单</span>
              <span v-if="item.orderStatus==0" class="order_action " @click="pay(item)">立即支付</span>
              <span v-if="item.orderStatus==1" class="order_action " @click="invinte(item)">邀请好友</span>
              <span v-if="item.orderStatus==2" class="order_action " @click="applyfo(item)">确认收货</span>
              <span v-if="item.orderStatus==2||item.orderStatus==3" @click="logistics(item)" class="order_action ">查看物流</span>
              <span v-if="item.orderStatus==3||item.orderStatus==-7||item.orderStatus==-8||item.orderStatus==-9" class="order_action black" @click="deleteOrder(item)">删除订单</span>
              <span v-if="item.orderStatus==4||item.orderStatus==5&&item.spellType==1" class="order_action " @click="prizeDetail(item)">中奖详情</span>
              <span v-if="(item.orderStatus==-6||item.orderStatus==-8)&&item.spellType==1&&item.status==2" class="order_action " @click="prizeDetail(item)">中奖详情</span>

            </div>
          </div>
        </section>
        <Recommend typeCode="3004" v-if="showRecommend"></Recommend>
      </mt-loadmore>
    </div>
    <section class="bottom-layer" v-if="layerShow">
      <div class="layer-content">
        <ul>
          <li class="title">选择付款方式
            <i v-on:click="hideLayer">取消</i>
          </li>
          <li @click="deposit">预存款
            <!--<u class="icons"></u>-->
            <u class="checks"><input type="checkbox" class="check" v-model="checks" /></u>
            <!--￥{{money}}-->
          </li>
          <li @click="wepay();return false">微信支付
            <u class="checks"><input type="checkbox" class="check" v-model="checks" /></u>
          </li>
        </ul>
      </div>
      <div class="layer-bg"></div>
    </section>

    <mt-popup popup-transition="popup-fade" v-model="showhiden">
      <div class="clears">
        <p>请输入支付密码</p>
        <input type="password" v-model="pass" />
      </div>
      <div class="footers">
        <p @click="right">确认</p>
        <p @click="abolish">取消</p>
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
import Recommend from "../Recommend";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      stores: ["未开始", "待拼团", "拼团成功", "拼团失败", "取消拼团"],
      token: "",
      orderList: [],
      layerShow: false,
      showhiden: false,
      checks: "",
      pass: "",
      orderId: 0,
      index: 1,
      clicks: true,
      mobile: "",
      codes: "",
      binding: false,
      states: true,
      menuStatus: 0, //存储选中的菜单状态
      pageNo: 1,
      showRecommend: false,
      allLoaded: false,
      times: [],
      statusList: [
        { text: "全部", value: 0, isActive: true },
        { text: "待付款", value: 1, isActive: false },
        { text: "待分享", value: 2, isActive: false },
        { text: "待发货", value: 3, isActive: false },
        { text: "待收货", value: 4, isActive: false }
      ]
    };
  },
  filters: {
    settime: function(timestamp) {
      let self = this;
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
          format = `${hour}:${min}:${sec}`;
        }
        if (day <= 0 && hour > 0) {
          format = `${hour}:${min}:${sec}`;
        }
        if (day <= 0 && hour <= 0) {
          format = `${"00"}:${min}:${sec}`;
        }
        return format;
      }
    }
  },
  created() {
    if (sessionStorage.token == null) {
      this.logins();
    }
  },
  components: {
    Recommend
  },
  mounted() {
    if (sessionStorage.token != null) {
      this.token = sessionStorage.getItem("token");
      this.getList();
      // if (sessionStorage.groupindex) {
      //   this.demand(sessionStorage.groupindex);
      // } else {
      //   this.demand(this.index);
      // }
    }
  },
  destroyed() {
    this.clearInter();
  },
  methods: {
    logistics(item) {//查看物流
      sessionStorage.orderId = item.orderId;

        sessionStorage.goodsImage = JSON.stringify(
          item.squareImage
        );
        this.$router.push({
          path: "/logistics",
          query:{
            isGroup:true,
          }
        });

    },
    clearInter() {
      this.times.forEach(o => {
        clearInterval(o);
      });
    },
    loadBottom() {
      //加载更多
      console.log("触发下拉加载");
      console.log("pageNo", this.pageNo);
      let url = "/spell/getSpellOrderList";
      var params = {
        token: this.token,
        status: this.menuStatus,
        pageSize: 10
      };
      this.$api.loadMore(this, params, url, this.orderList, data => {
        if (data.data.res_data.total == this.orderList.length) {
          //已经加载完毕
          Toast("没有了");
          this.allLoaded = true;
        } else {
          data.data.res_data.spellList.forEach(o => {
            this.orderList.push(o);
          });
          if (data.data.res_data.total == this.orderList.length) {
            //加载完毕
            // 不知道要不要说点什么
            this.allLoaded = true;
          }
        }
      });
      return;
    },
    cancelOrder(item) {
      //取消订单
      MessageBox.confirm("确认取消订单", "提示").then(o => {
        let params = {
          spellId: item.spellId,
          token: this.token
        };
        let url = "/spell/spellCancel";
        this.$axios({
          method: "post",
          responseType: "json",
          data: params,
          url: url
        })
          .then(o => {
            MessageBox("提示", o.data.res_info);
            this.getList();
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    formatStatus(index) {
      //格式化状态
      let status = this.orderList[index].status;
      let orderStatus = this.orderList[index].orderStatus;
      let spellType = this.orderList[index].spellType;
      //未付款
      if (orderStatus == 0) {
        return "待付款";
      } else if (orderStatus == 1) {
        //已付款
        return "待分享";
      } else if (orderStatus == 2) {
        if (spellType) {
          return "恭喜中奖，已发货";
        }
        return "拼团成功，已发货";
      } else if (orderStatus == 3) {
        return "已完成";
      } else if (orderStatus == 4) {
        return "待开奖";
      } else if (orderStatus == 5) {
        if (spellType) {
          return "恭喜中奖，待发货";
        }
        return "拼团成功，待发货";
      } else if (orderStatus == -6) {
        if (spellType) {
          if(status==3){
            return "拼团失败，退款中"
          }
          return "未中奖，退款中";
        }
        return "退款中";
      } else if (orderStatus == -7) {
        return "已作废";
      } else if (orderStatus == -8) {
        if (spellType) {
          if(status==3){
            return "拼团失败，已退款"
          }
          return "未中奖，已退款";
        }
        return "已退款";
      } else if (orderStatus == -9) {
        return "已取消";
      }
    },
    seletStatus(index) {
      console.log(index);
      this.statusList.forEach(element => {
        element.isActive = false;
      });
      this.statusList[index].isActive = true;
      this.menuStatus = this.statusList[index].value;
      this.clearInter();
      this.getList();
    },
    logins() {
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      let token = sessionStorage.getItem("token");

      if (token == null) {
        if (r == null) {
          location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.$urlstate.appid +
            "&redirect_uri=https%3a%2f%2f" +
            this.$urlstate.url +
            "%2f%23%2fgroup%2fmygroup&response_type=code&scope=snsapi_userinfo#wechat_redirect";
        } else {
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
              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(
                  data.data.res_data.member
                );
                sessionStorage.token = data.data.res_data.token;
              }
              if (data.data.res_data.returnCode == 0) {
                this.binding = true;
              }
              window.location.reload();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    gaincodes() {
      console.log(111);
      let token = sessionStorage.getItem("token");
      if (this.clicks == false) {
        return false;
      }

      var reg = /^1[1-9]\d{9}$/;
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
            this.clearInter();
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
    bidingmobile() {
      if (this.states) {
        this.states = false;
        var member = JSON.parse(sessionStorage.details);
        let obj = {
          authType: 1,
          face: member.face,
          memberStatus: member.memberStatus,
          mobile: this.mobile,
          mobileCode: this.codes,
          nickname: member.nickname,
          openId: member.openId,
          sex: member.sex,
          subscriber: member.subscriber,
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
              alert(data.data.res_info);
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
    backgo() {
      sessionStorage.removeItem("groupindex");
      this.$router.go(-1);
    },
    hideLayer() {
      this.layerShow = false;
    },
    //去砍价
    gobargin() {
      this.$router.push({ path: "/bargain/bargainshop", query: { state: 0 } });
    },
    //我发起的
    source() {
      this.demand(this.index);
    },
    //我参与的
    myjoin() {
      this.demand(this.index + 1);
    },
    getList() {
      let url = "/spell/getSpellOrderList";
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: {
          token: this.token,
          status: this.menuStatus,
          pageNo: 1,
          pageSize: 10
        }
      })
        .then(data => {
          this.orderList = data.data.res_data.spellList;
          let gettime = new Date().getTime();
          if (this.orderList.length == 0) {
            this.showRecommend = true;
          } else {
            this.showRecommend = false;
          }
          for (let i = 0; i < this.orderList.length; i++) {
            if (this.orderList[i].endDate != null) {
              if (this.orderList[i].endDate - gettime > 0) {
                let that = this;

                that.times.push(
                  setInterval(function() {
                    that.orderList[i].endDate -= 1;
                    if (that.orderList[i].endDate - gettime < 0) {
                      this.clearInter();
                    }
                  }, 1000)
                );
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteOrder(item) {
      MessageBox.confirm("是否确认删除订单", "提示").then(o => {
        let params = {
          token: this.token,
          spellId: item.spellId
        };
        let url = "/spell/doDeleteSpellOrder";
        this.$axios({
          method: "post",
          url: url,
          responseType: "json",
          data: params
        })
          .then(o => {
            MessageBox("提示", o.data.res_info);
            this.getList();
          })
          .catch(e => {
            MessageBox("提示", e.data.res_info);
          });
      });
    },
    demand(val) {
      this.orderList = [];
      let urls = "";
      sessionStorage.groupindex = val;
      // if(val==1){
      //   $('.myup').addClass('by');
      //   $('.myjoins').removeClass('by');
      //   urls='/spell/getMySpellList'
      // }else if(val==2){
      //   $('.myjoins').addClass('by');
      //   $('.myup').removeClass('by');
      //   urls='/spell/getMyParticipateSpell'
      // }
      let url = "/spell/getSpellOrderList";
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: {
          token: this.token,
          status: this.status,
          pageNo: 1,
          pageSize: 10
        }
      })
        .then(data => {
          this.orderList = data.data.res_data.spellList;
          let gettime = new Date().getTime();
          for (let i = 0; i < this.orderList.length; i++) {
            if (this.orderList[i].endDate != null) {
              if (this.orderList[i].endDate - gettime > 0) {
                let that = this;

                var times = setInterval(function() {
                  that.orderList[i].endDate -= 1;
                  if (that.orderList[i].endDate - gettime < 0) {
                    this.clearInter();
                  }
                }, 1000);
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pay(val) {
      console.log(val);
      this.layerShow = true;
      this.orderId = val.orderId;
    },
    deposit() {
      this.showhiden = true;
    },
    right() {
      //				确定密码
      this.checks = false;
      this.checks = !this.checks;
      if (this.checks) {
        document.getElementsByClassName("check")[0].style.background = "red";
        document.getElementsByClassName("check")[1].style.background = "none";
        if (this.pass != "") {
          this.$axios({
            method: "post",
            url: "/pay/spellOrderPay",
            responseType: "json",
            data: {
              token: this.token,
              orderId: this.orderId,
              payType: 0,
              reqType: 0,
              payPwd: this.pass
            }
          })
            .then(data => {
              if (data.status == 200) {
                if (data.data.res_code == 0) {
                  this.showhiden = false;
                  this.getList();
                } else if (data.data.res_code == 1) {
                  if (data.data.res_info == "请先设置支付密码...") {
                    let r = confirm(data.data.res_info);
                    if (r == true) {
                      this.$router.push({
                        path: "/midefier/boundRawPassword",
                        query: {
                          set: 0
                        }
                      });
                    }
                  } else {
                    alert("支付"+data.data.res_info);
                    this.showhiden = false;
                  }
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("支付密码不能为空");
        }
        this.layerShow = false;
      } else {
        document.getElementsByClassName("check")[0].style.background = "none";
      }
    },
    abolish() {
      this.showhiden = false;
    },
    // wepay(){
    // 	wxpays(this.token,this.orderId,1,0)
    // },
    wepay() {
      this.checks = false;
      this.checks = !this.checks;

      if (this.checks) {
        // document.getElementsByClassName("check")[1].style.background = "red"
        // document.getElementsByClassName("check")[0].style.background = "none"
        // if(this.addre.addrId == null) {
        //   alert("地址不能为空")
        //   this.layerShow = false;
        // } else {
        console.log("--11wechat--");
        console.log(this.token);
        console.log(this.orderId);
        var appId, paySign, timeStamp, nonceStr, packages, signType;
        if (this.token) {
          this.$axios({
            method: "post",
            url: "/pay/spellOrderPay",
            responseType: "json",
            data: {
              token: this.token,
              orderId: this.orderId,
              payType: 1,
              reqType: 0
            }
          })
            .then(data => {
              sessionStorage.paySuccess = data.data.res_code;
              console.log(data.data.res_data);

              if (data.data.res_code == 0) {
                var datas = data.data.res_data;
                appId = datas.appid;
                nonceStr = datas.noncestr;
                paySign = datas.sign;
                packages = datas.package;
                timeStamp = datas.timestamp;
                signType = "MD5";
                callpay();
                // alert("appId" + ":" + appId + "paySign:" + paySign + "timeStamp:" + timeStamp + "nonceStr:" + nonceStr + "nonceStr:" + nonceStr + "package:" + packages + "signType:" + signType)
                let that = this;

                function onBridgeReady() {
                  WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    {
                      appId: appId, //公众号名称，由商户传入
                      paySign: paySign, //微信签名
                      timeStamp: timeStamp, //时间戳，自1970年以来的秒数
                      nonceStr: nonceStr, //随机串
                      package: packages, //预支付交易会话标识
                      signType: signType //微信签名方式
                    },
                    function(res) {
                      console.log("--微信支付进入，带上的orderId--");
                      console.log(that.orderId);
                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                        that.getList();
                      } else if (
                        res.err_msg == "get_brand_wcpay_request:cancel"
                      ) {
                        alert("支付取消");
                      } else if (
                        res.err_msg == "get_brand_wcpay_request:fail"
                      ) {
                        // alert('支付失败');
                        //												alert(res.err_msg)
                      } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  );
                }

                function callpay() {
                  if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                      document.addEventListener(
                        "WeixinJSBridgeReady",
                        onBridgeReady,
                        false
                      );
                    } else if (document.attachEvent) {
                      document.attachEvent(
                        "WeixinJSBridgeReady",
                        onBridgeReady
                      );
                      document.attachEvent(
                        "onWeixinJSBridgeReady",
                        onBridgeReady
                      );
                    }
                  } else {
                    onBridgeReady();
                  }
                }
              } else {
                alert("统一下单失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert(this.token);
        }
      }

      // }
    },

    //拼团详情
    groupdetail(val) {
      switch (val.status) {
        case 0:
          this.$router.push({
            path: "/group/grouptime",
            query: { spellId: val.spellId, activityId: val.activityId }
          });
          break;
        case 1:
          this.$router.push({
            path: "/group/grouptime",
            query: { spellId: val.spellId, activityId: val.activityId }
          });
          break;
        case 3:
          this.$router.push({
            path: "/group/grouptimes",
            query: { spellId: val.spellId, activityId: val.activityId }
          });
          break;
        case 4:
          this.$router.push({
            path: "/group/grouptime",
            query: { spellId: val.spellId, activityId: val.activityId }
          });
          break;
      }
    },
    //订单详情
    orderdetail(val) {
      this.$router.push({
        path: "/group/grouporderdetail",
        query: { orderId: val.orderId }
      });
    },
    prizeDetail(val) {
      this.$router.push({
        path: "/prizeDetail",
        query: { activityId: val.activityId, orderId: val.orderId }
      });
    },
    //邀请
    invinte(val) {
      this.$router.push({
        path: "/group/grouptime",
        query: { spellId: val.spellId, activityId: val.activityId }
      });
    },
    applyfo(val) {
      this.$axios({
        method: "post",
        url: "/spell/spellOrderRog",
        responseType: "json",
        data: {
          token: this.token,
          orderId: val.orderId
        }
      })
        .then(data => {
          if (data.status == 200) {
            if (data.data.res_code == 0) {
              MessageBox("提示", data.data.res_info);
              this.getList();
              // this.$router.go(-1);
            } else {
              alert(data.data.res_info);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.mint-loadmore-content {
  background: #f5f5f5;
}
</style>


<style lang="scss" scoped="scoped">
#mygroup {
  padding: 0.1rem;
  .row {
    background: white;
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
  .goods-simple {
    .store-info {
      z-index: 0 !important;
    }
  }
  .checks {
    float: right;
    color: #999;
    .check {
      margin-left: 0.3rem;
      vertical-align: middle;
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 50%;
      outline: none;
    }
  }
  .mint-header-title {
    padding: 0.1rem;
  }
  .clears {
    width: 8.125rem;
    height: 1.75rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    p{
      text-align: center;
      margin-top: .2rem;
    }
    input {
      width: 5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      /*padding: 0.2rem;*/
      font-size: 0.6rem;
      margin-top: 0.25rem;
      text-align: center;
    }
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
      line-height: .85rem;
      font-size: 0.4rem;
    }
    p:last-child {
      background: #eee;
    }
    p:first-child {
      background: #f22d07;
      color: white;
    }
  }

  .centers {
    padding: 0.2rem;
    background: #fff;
    color: black;
    height: auto;
    font-size: 0.5rem;
    padding: 0.2px;
  }
  .bargain {
    padding: 0.3rem;
    background: white;
    font-size: 0.3rem;
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
        width: 0.5rem;
        height: 100%;
        background-size: 100%;
        vertical-align: middle;
        line-height: 1.5;
        img {
          width: 13%;
          float: left;
          margin-right: 0.1rem;
          margin-top: -0.1rem;
          vertical-align: middle;
        }
      }
    }
    p:last-child {
      flex: 1;
      margin-top: 0.3rem;
      span {
        color: white;
        text-align: center;
        background: orangered;
        border-radius: 0.1rem;
        padding: 0.2rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
      }
    }
  }
  .tabbanner {
    display: flex;
    justify-content: space-around;
    p {
      flex: 1;
      text-align: center;
      padding: 0.3rem;
      font-size: 0.4rem;
    }
    .by {
      color: orangered;
    }
    .by:after {
      margin-left: 1.4rem;
      margin-top: 0.3rem;
      display: block;
      content: "";
      width: 1.5rem;
      height: 0.1rem;
      background: orangered;
    }
  }
  .content {
    padding: 0.2rem 0;
    background: #f5f5f5;
    .goods-simple {
      margin-bottom: 0.4rem;
    }
    .goods-show {
      padding: 0 0.35rem;
      li span {
        width: 79%;
        margin-bottom: 0.2rem;

        p {
          margin-bottom: 0.1rem;
          line-height: 0.4rem;
        }
        h2 {
          margin-bottom: 0.1rem;
          height: auto;
        }
        i {
          color: red;
        }
        .pri-line {
          text-decoration: line-through;
          color: #ccc;
        }
        .nums {
          display: inline-block;
          float: right;
          color: #ccc;
        }
      }
    }
    .footer {
      display: flex !important;
      justify-content: space-between;
      .left {
        i:last-child {
          display: inline-block;
          color: #333;
          margin-left: 0.2rem;
        }
      }
      .times {
        margin-left: -2rem;
      }
    }
  }
  .menu {
    padding: 0.1rem 0.3rem;
    font-size: 0.4rem;
    &.active {
      color: #f22d07;
      border-bottom: 2px solid #f22d07;
    }
  }
}
.order_footer {
  background: white;
  padding: 0.3rem;
  margin-top: 2px;
}
.order_action {
  color: #f22d07;
  border: 1px solid #f22d07;
  height: 0.7rem;
  line-height: 0.7rem;
  padding: 0 0.3rem;
  display: block;
  border-radius: 0.35rem;
  font-size: 0.3rem;
  margin-left: 0.1rem;
  &.black {
    color: #333;
    border: 1px solid #333;
  }
}
.goods-simple{
 background-color:none;
}
</style>
