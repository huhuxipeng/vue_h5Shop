<template>
	<div class="coupon" id="coupon">
		<ul class="tab hu_row">
      <li @click="tabFun(0)" :class="tabIndex==0?'tab_sele':''">未使用({{useData.noUse}})<span></span></li>
      <li @click="tabFun(1)" :class="tabIndex==1?'tab_sele':''">已使用({{useData.use}})<span></span></li>
      <li @click="tabFun(2)" :class="tabIndex==2?'tab_sele':''">已过期({{useData.overdue}})<span></span></li>
    </ul>
    <ul class="voucher" v-if="tabs">
      <li class="hu_row" v-for="(item,index) in o_data" :key="index"  @click="mydetailsFun(index)">
        <div class="voucherImg_box hu_column" :class="[item.voucherImg_boxClass,tabIndex!=0?'voucherImg_box4':'']">
          <div>￥<span>{{item.discountPrice}}</span></div>
          <p>满{{item.minAmount}}可用</p>
        </div>
        <div class="voucher_content hu_column">
          <div class="voucher_content1 hu_column">
            <div class="name hu_row"><span :class="[item.couponClass,tabIndex!=0?'coupon4':'']">{{item.cpnType}}</span>{{item.cpnName}}</div>
            <div class="date hu_row">
              <p>{{item.useBeginTime}}-{{item.useEndTime}}</p>
              <span class="useBtn" :class="[item.useClass]" @click.stop="immediate(index)" v-if="tabIndex==0">立即使用</span>
            </div>
            <div class="details hu_row">查看详情<img src="../common/image/mycoupon/icon6.png" alt="查看详情"></div>
          </div>
          <img v-if="tabIndex==1" class="overdue" src="../common/image/mycoupon/icon3.png" alt="">
        </div>
      </li>
    </ul>
    <div class="binding_voucher hu_row" @click="mybindingFun">
      <img src="../common/image/mycoupon/icon0.png" alt="绑定现金券">绑定现金券
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      voucherImg_boxClass: "",
      couponClass: "",
      o_data: [],
      useData: '',
      tabs: true
    };
  },
  mounted: function() {
    this.token = sessionStorage.getItem("token");

    this.$axios({
      method: 'post',
      url: 'coupon/memberCouponCount',
      responseType: 'json',
      data:{
        token: this.token
      }
    }).then(res => {
      this.useData = res.data.res_data
    })
    this.not(0);
  },
  methods: {
    not(user) {
      this.$axios({
        method: "post",
        url: "coupon/memberCouponList",
        responseType: "json",
        data: {
          isUse: user,
          pageNo: 0,
          pageSize: 0,
          token: this.token
        }
      }).then(res => {
        this.o_data = res.data.res_data.dataList.map(o => {
          o.useBeginTime = new Date(o.useBeginTime).format("yyyy.MM.dd");
          o.useEndTime = new Date(o.useEndTime).format("yyyy.MM.dd");
          o.relType = o.relType1;
          switch (o.cpnType) {
            case 0:
              o.voucherImg_boxClass = "voucherImg_box2";
              o.couponClass = "coupon2";
              o.useClass = 'useClass0';
              o.cpnType = "分类券";
              break;
            case 1:
              o.voucherImg_boxClass = "voucherImg_box3";
              o.couponClass = "coupon3";
              o.useClass = 'useClass1';
              o.cpnType = "商品券";
              break;
            case 2:
              o.voucherImg_boxClass = "voucherImg_box0";
              o.couponClass = "coupon0";
              o.useClass = 'useClass2';
              o.cpnType = "店铺券";
              break;
            case 3:
              o.voucherImg_boxClass = "voucherImg_box1";
              o.couponClass = "coupon1";
              o.useClass = 'useClass3';
              o.cpnType = "通用券";
              break;
          }
          return o;
        });
        this.tabs=true;
      }).catch(err => {
        console.log("数据报错", err);
      });
    },
    tabFun($event) {
      this.tabs=false;
      this.tabIndex = $event;
      this.not($event)
    },
    immediate(idx) {//立即使用
      if(this.o_data[idx].relType!=null){
        this.$api.toRelDetail(this.o_data[idx],this)
      }
    },
    mybindingFun() {
      this.$router.push('/mybinding');
    },
    mydetailsFun(index){
      let cpnId = this.o_data[index].id;
      this.$router.push({
        path: '/mydetails',
        query:{
          cpnId:cpnId,
          tabIndex:this.tabIndex
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.coupon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.hu_row,
.hu_column {
  display: flex;
  display: -webkit-flex;
}
.hu_row {
  flex-direction: row;
}
.hu_column {
  flex-direction: column;
}
.tab {
  justify-content: space-between;
  border-bottom: 0.013333rem solid #eee;
  li {
    position: relative;
    height: 1.16rem;
    flex: 1;
    text-align: center;
    font-size: 0.426667rem;
    color: #333;
    line-height: 1.16rem;
    span {
      display: none;
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 1.706667rem;
      margin-left: -0.853333rem;
      border-bottom: 0.026667rem solid #f23814;
    }
  }
  .tab_sele {
    color: #f23814;
    span {
      display: block;
    }
  }
}
.voucher {
  overflow-y: auto;
  padding: 0.266667rem 0.266667rem 1.2rem;
  li {
    height: 2.906667rem;
    margin-bottom: 0.266667rem;
    .voucherImg_box {
      position: relative;
      width: 2.826667rem;
      height: 2.906667rem;
      color: #fff;
      align-items: center;
      div {
        margin-top: 0.666667rem;
        font-size: 0.426667rem;
        span {
          font-size: 0.96rem;
        }
      }
      p {
        margin-top: 0.24rem;
        font-size: 0.32rem;
      }
    }
    // 不同券不同颜色
    .voucherImg_box0 {
      // 绿色
      background: url(../common/image/mycoupon/bg0.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .voucherImg_box1 {
      // 橙色
      background: url(../common/image/mycoupon/bg1.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .voucherImg_box2 {
      // 紫色
      background: url(../common/image/mycoupon/bg2.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .voucherImg_box3 {
      // 蓝色
      background: url(../common/image/mycoupon/bg3.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .voucherImg_box4 {
      // 灰色
      background: url(../common/image/mycoupon/bg4.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .voucher_content {
      position: relative;
      top: 0.026667rem;
      flex: 1;
      width: 100%;
      .voucher_content1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 2.865rem;
        padding: 0.133333rem;
        justify-content: space-between;
        box-shadow: 0.013333rem 0.013333rem 0.066667rem #ccc;
        .name {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 1.066667rem;
          margin-bottom: 0.106667rem;
          line-height: 0.533333rem;
          font-size: 0.373333rem;
          span {
            margin-right: 0.133333rem;
            padding: 0.08rem 0.133333rem;
            border-radius: 0.213333rem;
            color: #fff;
            font-size: 0.32rem;
          }
          // 不同券不同颜色
          .coupon0 {
            // 绿色
            background: #4bc489;
          }
          .coupon1 {
            // 橙色
            background: #ea8033;
          }
          .coupon2 {
            // 紫色
            background: #9b49c3;
          }
          .coupon3 {
            // 蓝色
            background: #4d7ae8;
          }
          .coupon4 {
            // 灰色
            background: #ccc;
          }
        }
        .date {
          min-height: 0.9rem;
          margin-bottom: 0.1rem;
          padding-bottom: 0.133333rem;
          justify-content: space-between;
          align-items: center;
          font-size: 0.266667rem;
          color: #4a4a4a;
          border-bottom: 1px dashed #dedede;
          .useBtn {
            padding: 0.106667rem 0.266667rem;
            border-radius: 0.266667rem;
          }
          .useClass0{
            color: #9b49c3;
            border: 0.026667rem solid #9b49c3;
          }
          .useClass1{
            color: #4d7ae8;
            border: 0.026667rem solid #4d7ae8;
          }
          .useClass2{
            color: #4bc489;
            border: 0.026667rem solid #4bc489;
          }
          .useClass3{
            color: #ea8033;
            border: 0.026667rem solid #ea8033;
          }
        }
        .details {
          flex: 1;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.266667rem;
          color: #4a4a4a;
          img {
            width: 0.32rem;
            height: 0.32rem;
            margin-left: 0.266667rem;
          }
        }
      }
      .overdue {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.866667rem;
        height: 2.186667rem;
      }
    }
  }
}
.binding_voucher {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 1.173333rem;
  background: #fff;
  justify-content: center;
  align-items: center;
  font-size: 0.426667rem;
  color: #4a4a4a;
  box-shadow: 0.066667rem 0 0.066667rem #ccc;
  img {
    width: 0.533333rem;
    height: 0.533333rem;
    margin-right: 0.266667rem;
  }
}
</style>
