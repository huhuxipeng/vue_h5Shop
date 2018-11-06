<template>
	<div id="logistics">
		<mt-header flexd title="物流信息" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="main">
			<div class="topmain">
				<img :src="goodsImage |filterss(3)" :onerror='logo' />
				<span class="name">{{logistics.expName}}</span><br />
				<span class="number">运单号：
					<span>{{logistics.number}}</span>
				</span>
			</div>
			<div class="contents">
				<ul class="content">
					<li v-for="item in logistics.list" class="list">
						<p class="time">
							<span style="font-size: .4rem;">{{item.time.split(' ')[1]}}</span>
							<span style="font-size: .4rem;">{{item.time.split(' ')[0]}}</span>
						</p>
						<p class="state">{{item.status}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      sho: false,
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      logistics: [],
      goodsImage: "",
      time: "",
      times: ""
    };
  },
  methods: {
    backgo() {
      this.$router.go(-1);
      sessionStorage.removeItem("goodsImage");
    }
  },
  mounted() {
    let orderId = JSON.parse(sessionStorage.getItem("orderId"));
    let token = sessionStorage.getItem("token");
    this.goodsImage = sessionStorage.getItem("goodsImage");
    let urls = "";

    if (sessionStorage.getItem("managerDetail")) {
      urls = "/order/giftLogisticsInfo"; //店长礼包
      var data = { orderId: orderId, token: token };
    } else if (sessionStorage.getItem("RIGHTs")) {
      urls = "/order/right/logiInfo"; //维权
      var data = { rightOrderId: orderId, token: token };
    } else if (sessionStorage.getItem("BARGAIN")) {
      urls = "/order/LogisticsInfo"; //砍价
      var data = { orderId: orderId, token: token, type: 4 };
    } else if (this.$route.query.isGroup) {
      urls = "/order/LogisticsInfo"; //group
      var data = { orderId: orderId, token: token, type: 5 };
    } else if (this.$route.query.isGoldChanger) {
      urls = "/order/LogisticsInfo"; //金币订单
      var data = { orderId: orderId, token: token, type: 6 };
    } else if (this.$route.query.isFlashSaleOrder) {
      urls = "/order/LogisticsInfo"; //抢购订单
      var data = { orderId: orderId, token: token, type: 7 };
    } else {
      urls = "/order/LogisticsInfo"; //普通订单
      var data = { orderId: orderId, token: token, type: 0 };
    }

    this.$axios({
      method: "post",
      url: urls,
      responseType: "json",
      data: data
    })
      .then(data => {
        this.logistics = data.data.res_data.logiInfo;
      })
      .catch(err => {
        console.log(err);
        alert("该单号暂无物流进展，请稍后再试");
      });
  }
};
</script>

<style lang="scss" scoped="scoped">
#logistics {
  background: #f5f5f5;
  .shop {
    background: #fff;
    color: black;
    height: auto;
    font-size: 0.5rem;
    padding: 10px;
  }
  .main {
    .topmain {
      margin-bottom: 0.3rem;
      padding: 10px;
      height: 2.5rem;
      line-height: 0.5rem;
      background: white;
      margin-top: 0.2rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        float: left;
        margin-right: 0.2rem;
      }
      .name {
        clear: both;
        display: inline-block;
        margin-top: 0.5rem;
        font-size: 0.4rem;
        line-height: 0.8rem;
      }
      .number {
        color: #999999;
        font-size: 0.3rem;
      }
    }
  }
  .contents {
    clear: both;
    padding: 5px;
    background: white;
    height: 1rem;
    .content {
      li {
        max-height: 2rem;
        padding-bottom: 1rem;
        font-size: 0.2rem;
        display: flex;
        justify-content: space-between;
        background: url(../../common/image/xian.png) no-repeat;
        background-position-x: 2.9rem;
        background-size: 0.5% 100%;
        .time {
          flex: 2;
          text-align: center;
          position: relative;
        }
        .state {
          margin-left: 1.5rem;
          flex: 5;
          font-size: 0.4rem;
          line-height: 0.5rem;
          position: relative;
          color: #ccc;
        }
        .state:before {
          content: "";
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: url(../../common/image/topupimg/noright.png) no-repeat;
          background-size: 100%;
          position: absolute;
          left: -1.15rem;
        }
      }
      li:last-child {
        background: none;
      }
      li:first-child {
        .state:last-child:before {
          background: url(../../common/image/shopImg/right.png) no-repeat;
          background-size: 100%;
        }
        .state:last-child {
          color: black;
        }
      }
    }
  }
}
</style>
