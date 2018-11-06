<template>
  <div class="pay-state-page">
    <commonTop header-title="支付结果" header-type="1" has-back="true"></commonTop>
    <section class="success state-bar" v-if="success">
      <span class="icons-pay"></span>
      <p>支付成功</p>
      <button @click="detail">查看订单详情</button>
    </section>
    <section class="fail state-bar" v-if="failed">
      <span class="icons-pay"></span>
      <p>支付失败</p>
      <button @click="back">重新支付</button>
    </section>
  </div>
</template>

<script>
import commonTop from "../components/commonTop";
export default {
  data() {
    return {
      success: false,
      failed: false,
      orderId: ""
    };
  },
  components: {
    commonTop: commonTop
  },
  mounted: function() {
    let sate = JSON.parse(sessionStorage.getItem("paySuccess"));
    var that = this;

    if (!sate) {
      this.success = true;
      this.failed = false;
      history.pushState(null, null, document.URL); //添加一次假地址，浏览器第一次后退的时候，返回真地址，目的是让后退无实际效果
      window.addEventListener("popstate", this.goDetail);//添加我自己的后退事件
    } else {
      this.failed = true;
      this.success = false;
    }
  },
  methods: {
    goDetail() {
      //去对应的商品详情
      window.removeEventListener("popstate", this.goDetail); //避免重复添加事件,每次点击后退，都把这个事件删了
      let params = JSON.parse(sessionStorage.getItem("goodsDetailQuery"));
      this.$router.push({
        path: "goods/detail",
        query: params
      });
    },
    detail() {
      // this.$router.push('order/detail')
      localStorage.orderId = sessionStorage.getItem("orderId");
      this.orderId = this.$route.query.orderId;
      console.log("--微信支付完成，带上的orderId--");
      console.log(this.orderId);

      // alert(this.$route.query.orderId+' '+localStorage.getItem('orderId')+' '+sessionStorage.getItem('orderId'));
      if (
        this.$route.query.orderId == "" ||
        this.$route.query.orderId == null ||
        this.$route.query.orderId == undefined
      ) {
        console.log("--orderId为undefined的时候--");
        console.log(JSON.parse(localStorage.getItem("orderId")));
        console.log(JSON.parse(sessionStorage.getItem("orderId")));
        this.$router.push("order/detail");
      } else {
        console.log("--orderId设置Hash上--");
        localStorage.orderId = this.$route.query.orderId;
        sessionStorage.orderId = this.$route.query.orderId;
        this.isGoldChanger = this.$route.query.isGoldChanger;
        this.isFlashSaleOrder = this.$route.query.isFlashSaleOrder;
        let params = {
          orderId: this.orderId
        };
        if (this.isGoldChanger) {
          params.isGoldChanger = this.isGoldChanger;
          params.goldChangerId = this.$route.query.goldChangerId;
        }
        if (this.isFlashSaleOrder) {
          params.isFlashSaleOrder = this.isFlashSaleOrder;
        }
        this.$router.push({ path: "order/detail", query: params });
      }

      //
      //		sessionStorage.removeItem("paySuccess")
      sessionStorage.removeItem("catId");
      sessionStorage.removeItem("SELSPECOBJ");
    },
    back() {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter(to,from,next){
    if(from.name == "goodsDetail"){
      // this.$router.push({path:"/"})
      window.location.href = "https://"+this.$urlstate.url;
    }
    else{
      next()
    }
  }
};
</script>
