<template>
  <div class="mywrap">
    <header>
      <commonTop header-type="5" hide-car="false" header-class="bg-none" has-back="true"></commonTop>
      <img :src="headerImg" />
      <div class="flex_column">
        <div>可用金币</div>
        <div>{{memberCoin}}</div>
        <div>金币换好礼 会员专享 每月更新</div>
      </div>
    </header>
    <div class="menu flex">
      <div v-for="(item,i) in activeData" @click="seletActive(i)" class="flex_column" :class="{'active':item.active}">
        <div>{{item.value}}</div>
      </div>
    </div>
    <div style="position:absolute;top:5.3rem;left:0;right:0;bottom:0">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <div v-for="(item,i) in listData" @click="showDetail(i)" style="align-items:stretch;" class="row">
          <div class="left" style="min-height:3.4rem;">
            <img style="width:3.6rem;" :src="item.squareImage?item.squareImage:item.rectangleImage |filterss(2)" />
          </div>
          <div class="right flex_column goods_detail" style="flex-grow:1">
            <div style="line-height: .4rem;
    letter-spacing: .02rem;">{{item.exchangeName}}</div>
            <div style="margin-top: 0.33rem;">
              <span class="new_price" style="font-weight:normal;">{{item.exchangeCoin}}金币</span>
            </div>
            <div class="row" style="width:100%;padding:0;">
              <span class="old_price">￥{{item.mktPrice |strings}} </span>

              <!-- <span class="orange">限量{{item.activityNum}}件</span> -->
              <a class="begin_remind" :class="{'disabled' : (item.activityNum== 0)}" @click.stop="doSth(i)">{{formatButton(item)}}</a>
            </div>
          </div>

        </div>
      </mt-loadmore>

    </div>
    <!-- <img src="../../static/image/fs_bg.png" style="width:100%;" /> -->
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import commonTop from "../components/commonTop";
export default {
  data() {
    return {
      headerImg: require("../common/image/gold_header.jpg"),
      activeData: [],
      set: "",
      pageNo: 1,
      pageSize: 10,
      allLoaded: false, //是否全部加载完毕,
      listData: [],
      state: "",
      memberCoin: 0,
      url: "/goods/anon/pageCoinExchangeGoods"
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.getData();
  },
  components: {
    commonTop
  },
  methods: {
    loadBottom() {
      //加载更多
      console.log("触发下拉加载");
      var params = {
        max: this.max,
        min: this.min,
        pageSize: 10,
        token: this.token
      };
      this.$api.loadMore(this, params, this.url, this.listData, data => {
        if (data.data.res_data.coinExchangeGoodsList.total == this.listData.length) {
          //已经加载完毕
          Toast("没有了");
          this.allLoaded = true;
        } else {
          data.data.res_data.coinExchangeGoodsList.rows.forEach(o => {
            this.listData.push(o);
          });
          if (data.data.res_data.coinExchangeGoodsList.total == this.listData.length) {
            //加载完毕
            // 不知道要不要说点什么
            this.allLoaded = true;
          }
        }
      });
    },
    doSth(index) {
      if (
        this.listData[index].activityNum ==0
      ) {
        console.log("没有了看不见吗，点什么点");
      } else {
        this.showDetail(index);
      }
      // e.preventDefault()
    },
    showDetail(index) {
      console.log(this.listData[index]);
      this.$router.push({
        path: "/goods/detail",
        query: {
          goldChangerId: this.listData[index].id
        }
      });
    },
    seletActive(index) {
      //选择活动
      if (this.activeData[index].active) return;
      this.activeData = this.activeData.map(o => {
        o.active = false;
        return o;
      });
      this.$set(this.activeData[index], "active", true);
      this.max = this.activeData[index].max;
      this.min = this.activeData[index].min;
      this.pageNo = 1;
      this.getGoodList();
    },
    getGoodList() {
      var params = {
        max: this.max,
        min: this.min,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        token: this.token
      };
      this.$axios({
        method: "post",
        url: "/goods/anon/pageCoinExchangeGoods",
        responseType: "json",
        data: params
      })
        .then(data => {
          console.log(data);
          this.listData = data.data.res_data.coinExchangeGoodsList.rows;
          if (data.data.res_data.memberCoin) {
            this.memberCoin = data.data.res_data.memberCoin;
          }
          this.allLoaded = false;
          $(".mywrap").css("visibility", "visible"); //显示优化，加载完数据再显示
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatButton(item) {
      if (item.activityNum== 0) {
        //如果活动数量小于等于已购基数
        return "已兑完";
      } else {
        return "立即兑换";
      }
    },
    getData() {
      this.activeData = [
        { value: "全部", min: 0, max: 10000000 },
        { value: "0-999", min: 0, max: 999 },
        { value: "1000-2999", min: 1000, max: 2999 },
        { value: "3000-5999", min: 3000, max: 5999 },
        { value: "6000-9999", min: 6000, max: 9999 },
        { value: "10000+", min: 10000, max: 99999999 }
      ];
      this.seletActive(0);
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
header {
  line-height: 0;
}
header img {
  width: 100%;
}
.menu {
  display: flex;
  overflow-x: scroll;
  padding: 0;
}
.menu > div {
  width: 2rem;
  color: #666;
  flex-shrink: 0;
  flex-grow: 1;
  padding: 0.22rem 0;
  min-width: 2.5rem;
  &.active {
    color: #f37d66;
    border-bottom: 2px solid #f37d66;
    position: relative;
    bottom: -2;
  }
  div {
    &:nth-child(odd) {
      font-size: 0.4rem;
      margin-bottom: 0.1rem;
    }
    &:nth-child(even) {
      font-size: 0.3rem;
    }
  }
}
.title {
  color: #414141;
  font-size: 0.4rem;
  text-align: center;
  padding: 0.3rem;
}
.goods_detail {
  justify-content: space-between;
  padding: 0.3rem 0.3rem 0.3rem 0.6rem;
  align-items: flex-start;
  color: #333;
  .new_price {
    padding-left: 0.2rem;
  }
  .old_price {
    padding-left: 0.2rem;
  }
}
.begin_remind {
  border: 0.2rem;
  color: white;
  padding: 0.2rem;
  background: #f22d07;
  border-radius: 0.17rem;
  &.disabled {
    background: #ccc;
  }
}
header {
  position: relative;
  .flex_column {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    padding: 0;
    justify-content: center;
    color: white;
    div {
      line-height: 0.8rem;
    }
  }
}
</style>