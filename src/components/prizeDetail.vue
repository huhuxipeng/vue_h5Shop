<template>
    <div class=" mywrap" :class="{'show':show_mywrap}">
        <div class="header">
            <div class="back" @click="$api.goback()"></div>中奖详情</div>
        <div class="block_wrap">
            <div class="row_wrap">
                <div class="row">
                    <div class="left" style="width:3.6rem;">
                        <img :src="detail.image |filterss(1)" />
                    </div>
                    <div class="right flex_column">
                        <div class="list_title">
                            {{detail.goodsTitle}}
                        </div>
                        <div class="flex" style="line-height:.4rem;">
                            <div class="new_price">
                                ￥{{detail.spellPrice}}
                            </div>
                            <div class="gray">
                                拼团省￥{{detail.goodsPrice-detail.spellPrice |strings}}
                            </div>
                        </div>
                        <div class="flex" style="justify-content: space-between;">
                            <span class="new_price">{{detail.message}}</span>
                            <span class="gray">{{detail.alreadyNum}}人拼团</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row_wrap">
                <div class="row">
                    <div class="left list_title">
                        我的夺宝号
                    </div>
                    <div class="right gray" @click="moreCode()">
                        更多
                    </div>
                </div>
                <div class="row">
                    <div v-for="(value,index) in detail.mySnatchNoList" v-if="index<=2" class="gray child">
                        {{value}}
                    </div>
                </div>
            </div>
            <div class="row_wrap">
                <div class="row">
                    <div class="left list_title">
                        中奖名单
                    </div>
                    <div class="right gray" @click="morePerson()">
                        更多
                    </div>
                </div>
                <div class="row average" v-for="(item,index) in detail.winSnatchNoList" v-if="index<=0">
                    <div class="gray child" style="flex-grow:1;">
                        <div v-if="item.face" class="flex" style="width:auto;">
                            <img class="face" :src="item.face" />
                            <div class="nickname">{{item.nickname}}</div>
                        </div>
                    </div>
                    <div class="orange" style="flex-grow:1;">{{item.snatchNo}}</div>
                    <div class="gray" style="flex-grow:1;justify-content: center;">{{formatPhoneNumber(item.mobile)}}</div>
                </div>
            </div>
            <div class="row_wrap">
                <div class="row">
                    <div class="left list_title">
                        夺宝须知
                    </div>
                    <div class="right gray" @click="explain()">
                        夺宝说明
                    </div>
                </div>
            </div>
        </div>

        <mt-popup v-if="detail.mySnatchNoList" id="code_popup" popup-transition="popup-fade" v-model="showCode">
            <h5>夺宝码</h5>
            <div v-for="(value,index) in detail.mySnatchNoList" style="height:.8rem;" class="gray">
                {{value}}
            </div>
        </mt-popup>
        <mt-popup v-if="detail.winSnatchNoList" id="prize_popup" popup-transition="popup-fade" v-model="showPrize">
            <h5>中奖幸运儿（共{{detail.winSnatchNoList.length}}人中奖）</h5>
            <div v-for="(item,index) in detail.winSnatchNoList" style="height:.8rem;width:100%;" class="gray row">
                <div class="gray name">{{item.nickname}}</div>
                <div class="gray">{{item.snatchNo}}</div>
                <div class="gray">{{formatPhoneNumber(item.mobile)}}</div>
            </div>
        </mt-popup>
        <mt-popup id="explain_popup" popup-transition="popup-fade" v-model="showExplain">
            <h5>夺宝说明</h5>
            1. 拼团有效期 拼团有效期是自开团时刻起的24小时内，如果距离商品失效时间小于24小时，则以商品的结束时间为准。</br>
            2. 拼团失败 超过成团有效期24小时，未达成相应参团人数的团，则该团失败。 拼团失败的订单，系统会在1-2个工作日内处理退款，系统处理后1-10个工作日内原路退回至原支付账户中。 </br>
            3.收到质量问题怎么办？ 如遇产品有质量问题，可联系客服帮您换货或退款。按照国家规定提供七天无理由退货服务。 </br>
            4.巨柚可在法律法规允许范围内对活动进行解释</br>
        </mt-popup>
        <Recommend typeCode="3010"></Recommend>
    </div>
</template>
<script>
import Recommend from "../components/Recommend";
export default {
  data() {
    return {
      show_mywrap: false,
      detail: {},
      showCode: false, //兑换码弹窗
      showExplain: false, //夺宝说明弹窗
      showPrize: false //中奖名单弹窗
    };
  },
  mounted() {
    this.activityId = this.$route.query.activityId;
    this.orderId = this.$route.query.orderId;
    this.getDetail();
  },
  components: {
    Recommend
  },
  methods: {
    moreCode() {
      this.showCode = true;
    },
    morePerson() {
      this.showPrize = true;
    },
    explain() {
      this.showExplain = true;
    },
    formatPhoneNumber(str) {
      let str1 = str.substring(0, str.length - 7);
      let str2 = str.substring(str.length - 2, str.length);
      return str1 + "*****" + str2;
    },
    getDetail() {
      let url = "/spell/getSnatchDetail";
      let params = {
        activityId: this.activityId,
        orderId:this.orderId,
        token: sessionStorage.getItem("token")
      };
      this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        data: params
      }).then(data => {
        let detail = data.data.res_data.activity;
        detail.mySnatchNoList = data.data.res_data.mySnatchNoList;
        detail.winSnatchNoList = data.data.res_data.winSnatchNoList;
        detail.message = data.data.res_data.message;
        this.detail = detail;
        this.show_mywrap = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.row {
  padding: 0.33rem;
}
.block_wrap {
  background: #f5f5f5;
  padding: 0.33rem;
}
.row_wrap {
  background: #ffffff;
  border-radius: 0.2rem;
  margin-bottom: 0.33rem;
}
.left {
  img {
    width: 100%;
  }
}
.list_title {
  font-size: 0.4rem;
  color: #333;
  line-height: 0.44rem;
}
#code_popup {
  width: 6rem;
  height: 5rem;
}
#prize_popup {
  width: 7rem;
  height: 6rem;
}
#explain_popup {
  width: 7rem;
  height: 6rem;
  line-height: 0.5rem;
}
.orange,
.gray {
  display: flex;
  align-items: center;
}
.mint-popup {
  padding: 0.5rem;
  overflow: auto;
  flex-wrap: wrap;
  display: flex;
  border-radius: 0.5rem;
  align-content: flex-start;
  .gray {
    font-size: 0.4rem;
    &.name {
      width: 1.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  h5 {
    width: 100%;
    text-align: center;
    height: 0.7rem;
  }
}
.right {
  &.flex_column {
    justify-content: space-between;
    padding: 0.3rem 0 0.3rem 0.3rem;
    div {
      width: 100%;
    }
  }
}

.row {
  align-items: stretch;
}
.gray {
  color: #b4b4b4;
  font-size: 0.3rem;
  margin: 0 0.1rem;
  width: auto;
}
.new_price {
  font-size: 0.3rem;
  width: auto;
}
</style>

