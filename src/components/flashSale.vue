<template>
  <div class="mywrap">
    <header>
      <img :src="headerImg" />
      <commonTop header-type="5" hide-car="false" header-class="bg-none" has-back="true"></commonTop>

    </header>
    <div class="menu flex">
      <div v-for="(item,i) in activeData" @click="seletActive(i)" class="flex_column" :class="{'active':item.active}">
        <div>{{new Date(item.beginTime).format('hh:mm')}}</div>
        <div>{{formatState(item)}}</div>
      </div>
    </div>
    <div style="position:absolute;top:5.7rem;left:0;right:0;bottom:0">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
        <div class="title" v-if="state==0">限时限量先到先得</div>
        <div class="title" v-if="state==1&&countTime">距下一场开始 还剩（{{FormatTime(countTime)}}）</div>
        <div class="title" v-if="state==2">设置提醒，好物不错过</div>
        <div v-for="(item,i) in listData" @click="showDetail(i)" style="align-items:stretch;" class="row">
          <div class="left">
            <img style="width:3.6rem;" :src="item.goodsImage |filterss(2)" />
          </div>
          <div class="right flex_column goods_detail">
            <div>{{item.flashsaleGoodsName}}</div>
            <div>限时价
              <span class="new_price">￥{{item.flashsalePrice}} </span>
              <span class="old_price">￥{{item.goodsPrice}} </span>
            </div>
            <div class="row" style="width:100%;padding:0;position:relative;">
              <!-- <span class="orange">限量{{item.activityStock?item.activityStock:'0'}}件</span> -->
              <mt-progress :value="100*item.activityStock/item.activityInitStock" :bar-height="15" style="height:.7rem;width:3rem;">
              </mt-progress>
              <div v-if="item.activityStock" class="activeity_stock">仅剩{{item.activityStock}}件</div>
              <div v-else class="activeity_stock">仅剩0件</div>
              <a class="begin_remind" :class="{'disabled' :!item.activityStock||item.activityStock=='0'}" @click.stop="doSth(i,item.activityStock)">{{formatButton(item.activityStock)}}</a>
            </div>
          </div>

        </div>
      </mt-loadmore>
    </div>

    <!-- <img src="../../static/image/fs_bg.png" style="width:100%;" /> -->
  </div>
</template>
<script>
import { MessageBox, Toast, Progress } from "mint-ui";

import commonTop from "../components/commonTop";
export default {
  data() {
    return {
      headerImg: require("../common/image/flashSale.jpg"),
      activeData: [],
      set: "",
      pageNo: 1,
      pageSize: 10,
      allLoaded: false, //是否全部加载完毕,
      listData: [],
      state: "",
      remind: "",
      countTime: "",
      url:"/flashsale/anon/getFlashsaleGoodsList",
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.getData();
  },
  components: {
    commonTop: commonTop
  },
  methods: {
    loadBottom() {
      //加载更多
      console.log("触发下拉加载");
      var params = {
        flashsaleId: this.flashsaleId,
        pageSize: this.pageSize
      };
      this.$api.loadMore(this, params, this.url, this.listData, data => {
        if (
          data.data.res_data.total == this.listData.length
        ) {
          //已经加载完毕
          Toast("没有了");
          this.allLoaded = true;
        } else {
          data.data.res_data.dataList.forEach(o => {
            this.listData.push(o);
          });
          if (
            data.data.res_data.total ==
            this.listData.length
          ) {
            //加载完毕
            // 不知道要不要说点什么
            this.allLoaded = true;
          }
        }
      });
    },
    startRemind(index) {
      //开抢提醒

      MessageBox.prompt(
        "请留下您的手机号，商品开抢前巨柚会第一时间通知您",
        "设置开抢通知",
        {
          inputType: "number"
        }
      ).then(({ value, action }) => {
        if (value) {
          var reg = /^1[2|3|4|5|6|8|7|9][0-9]\d{8}$/;
          console.log(reg.test(value));
          if (!reg.test(value)) {
            MessageBox("提示", "号码不正确");
            return;
          }
          let url = "flashsale/anon/flashsaleNotify";
          let params = {
            flashsaleGoodsId: this.listData[index].flashsaleGoodsId,
            flashsaleId: this.flashsaleId,
            mobile: value
          };
          this.$axios({
            method: "post",
            url: url,
            responsetype: "json",
            data: params
          }).then(o => {
            console.log(o);
            if (o.data.res_data.state == 0) {
              MessageBox("提示", "设置抢购提醒成功！");
            }
          });
        } else {
          MessageBox("提示", "密码不能为空");
        }
      });
    },
    doSth(index, stock) {
      console.log(index, stock);
      if (!stock || stock == "0") return;
      if (this.state == 2) {
        this.startRemind(index);
      } else {
        this.showDetail(index);
      }
    },
    showDetail(index) {
      this.$router.push({
        path: "/goods/detail",
        query: {
          goodsId: this.listData[index].goodsId,
          flashsaleGoodsId: this.listData[index].flashsaleGoodsId,
          flashsaleId: this.flashsaleId
        }
      });
    },
    scrollToCenter(index) {
      //  var left = $('.menu .active').offset();

      console.log($("body").width());
      let perWidth = $("body").width() / 5;
      let left = 0;
      if (index > 2) {
        left = perWidth * (index - 1);
      }
      $(".menu").scrollLeft(left);
    },
    seletActive(index) {
      //选择活动
      if (this.activeData[index].active) return;
      this.activeData = this.activeData.map(o => {
        o.active = false;
        return o;
      });
      this.$set(this.activeData[index], "active", true);
      console.log(JSON.parse(JSON.stringify(this.activeData[index])));
      this.flashsaleId = this.activeData[index].flashsaleId;
      this.pageNo = 1;
      this.state = this.activeData[index].flag;

      this.getGoodList();
      // this.scrollToCenter(index);
    },
    getGoodList() {
      var params = {
        flashsaleId: this.flashsaleId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.$axios({
        method: "post",
        url: "/flashsale/anon/getFlashsaleGoodsList",
        responseType: "json",
        data: params
      })
        .then(data => {
            this.listData = data.data.res_data.dataList;
            this.allLoaded = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatButton(num) {
      if (!num || num == "0") {
        return "已抢完";
      }
      switch (this.state) {
        case 0:
          return "马上抢";
          break;
        case 1:
          return "马上抢";
          break;
        case 2:
          return "开抢提醒";
      }
    },
    formatState(item) {
      //格式化活动状态
      switch (item.flag) {
        case 0:
          return "已开抢";
          break;
        case 1:
          return "抢购中";
          break;
        case 2:
          return "即将开抢";
      }
      // let now = Date.parse(new Date());
      // if (item.endTime < now) {
      //   return "已开抢";
      // }
      // if (item.endTime >= now && item.beginTime <= now) {
      //   return "抢购中";
      // }
      // if (item.beginTime > now) {
      //   if (
      //     new Date(item.beginTime).format("dd") ==
      //     new Date(item.beginTime).format("dd")
      //   ) {
      //     //是同一天
      //     return "即将开抢";
      //   } else {
      //     return "明日开抢";
      //   }
      // }
    },
    getCountTime(Time, nowTime) {
      console.log(Time);
      //获取倒计时
      let countTime = Time - nowTime;
      if (countTime > 0) {
        this.$set(this, "countTime", countTime);
      } else {
        this.$set(this, "countTime", 0);
      }
      this.setTime = setInterval(o => {
        countTime = countTime - 1000;
        if (countTime > 0) {
          this.$set(this, "countTime", countTime);
        } else {
          this.$set(this, "countTime", 0);
          window.clearInterval(this.setTime);
        }
      }, 1000);
    },
    FormatTime(timestamp) {
      let t = timestamp;
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
    },
    getData() {
      this.$axios({
        method: "get",
        url: "/flashsale/anon/getFlashsaleActivityList",
        responseType: "json"
      })
        .then(data => {
          let now = Date.parse(new Date());
          let i = undefined;
          let second = false;
          this.activeData = data.data.res_data.activityList.map(
            (element, index) => {
              if (element.flag == "1") {//如果正在抢购
                i = index;
              }
              if (element.flag == "2") {
                if (!second) {
                  //如果是第一个即将开抢
                  if(!i&&i!=0){//如果没有正在抢购的
                   i = index;
                  }
                  second = true;
                  this.getCountTime(element.beginTime, element.nowTime);
                }
              }
              return element;
            }
          );
          if (i || i == 0) {
            setTimeout(o => {
              this.scrollToCenter(i);//滚到已选中活动为中心
            }, 100);
            this.seletActive(i);//选中活动
          }

          $(".mywrap").css("visibility", "visible"); //显示优化，加载完数据再显示
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.mt-progress-progress {
  background-color: #fbc0b4 !important;
}
</style>

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
  color: white;
  flex-shrink: 0;
  flex-grow: 1;
  padding: 0.22rem 0;
  background: #5a5a5a;
  &.active {
    background: #f37d66;
  }
  div {
    &:nth-child(odd) {
      font-weight: bold;
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
  padding: 0.3rem 0.4rem 0.3rem 0.4rem;
  align-items: flex-start;
  color: #333;
  .new_price {
    padding-left: 0.2rem;
  }
  .old_price {
    padding-left: 0.2rem;
  }
}
.activeity_stock {
  position: absolute;
  left: 0.6rem;
  top: 0.2rem;
  z-index: 4;
  color: #f22d07;
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
</style>