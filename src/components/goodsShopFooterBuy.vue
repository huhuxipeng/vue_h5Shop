<template>
  <div>
    <div v-if="isShow">
      <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup' closeOnClickModal>
        <div id="wrap">
          <!--关闭按钮-->
          <p class="back" @click="close"><img src="../common/image/qrcodeimg/close.png" slot="icon" /></p>
          <!--弹框内容-->
          <div class="content">
            <div class="conten">
              <p class="productImg"><img :src="detail.image | filterss(2)" :onerror="logo" /></p>
              <p class="title">{{detail.name}}</p>
              <p class="money">￥{{Number(detail.price).toFixed(2)}}</p>
            </div>
            <div v-if="goodsSpecList!=null">
              <div class="category" v-for="(item,index) in goodsSpecList">
                <p style="font-size:.4rem;">{{item.specName}}</p>
                <ul class="cate">
                  <li :class="{'cols':child.show}" v-for="(child,key) in item.detail" @click="stand(child,index,key)">{{child.specValue}}</li>
                </ul>
              </div>
            </div>
            <div class="amount">
              <p>购买数量</p>
              <div class="number">
                <div class="num-btn remove" @click="remove"></div>
                <input type="text" v-model="buyCount" class="input" />
                <div class="num-btn add" @click="adds"></div>
              </div>
            </div>
          </div>
          <div class="footers" v-if="carShow">
            <p class="buynows" style="width:100%" @click="joinca">确定</p>
          </div>
          <div class="footers" v-if="buyShow">
            <!--<p class="addcars" @click="joinca" v-if="!slot">加入购物车</p>-->
            <p class="buynows" @click="purchase" v-if="!slot">立即购买</p>
            <span class="export" v-if="slot">已告罄</span>
          </div>
        </div>
      </mt-popup>
      <mt-popup popup-transition="popup-fade" v-model="showhiden" class='mt-prop'>
        <div class="success">
          <p><img src="../common/image/shopImg/shopcatok.png" /></p>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
/*通用商品底部购买组件*/
export default {
  data() {
    return {
      buyCount: 1,
      carNum: "",
      token: "",
      add: "",
      product: [],
      popupVisible: false,
      imgae: require("../common/image/defaultimg.png"),
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      num: false,
      currentSel: false,
      cols: ["白色", "黑色", "月牙白"],
      detail: [],
      productIds: 0,
      store: 0,
      goodsSpecList: "",
      selSpecArr: [],
      selSpecObj: [],
      sortSelSpecArr: [],
      matchProductId: 0,
      showhiden: false,
      showLayerInfo: false,
      details: "",
      slot: false
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    carShow: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    buyShow: {
      type: Boolean,
      default: false
    },
    shopdetai: {
      type: Array
    }
  },
  mounted: function() {
    // console.log(this.shopdetai)
    this.token = sessionStorage.getItem("token");
    if (this.token) {
      this.num = true;
    } else {
      this.num = false;
    }

    this.popupVisible = true;
    //			this.store = this.shopdetai[0].good.store
    this.detail = this.shopdetai[0].good;
    console.log(this.shopdetai);
    this.product = this.shopdetai[0].productList;
    if (this.shopdetai[0].goodsSpecList) {
      this.goodsSpec = true;
      this.goodsSpecList = this.shopdetai[0].goodsSpecList;
      console.log(this.goodsSpecList);
      for (let i = 0; i < this.goodsSpecList.length; i++) {
        for (let j = 0; j < this.goodsSpecList[i].detail.length; j++) {
          this.goodsSpecList[i].detail[j]["show"] = false;
        }
        this.goodsSpecList[i].detail[0]["show"] = true;
        this.selSpecArr.push(this.goodsSpecList[i].detail[0].specValueId);
        // this.selSpecArr.sort();
        this.selSpecObj.push({
          specName: this.goodsSpecList[i].specName,
          specValue: this.goodsSpecList[i].detail[0].specValue,
          specValueId: this.goodsSpecList[i].detail[0].specValueId
        });
      }
      this.$set(this.goodsSpecList, "show", false);
      this.matchElsProductId();
      sessionStorage.setItem("SELSPECOBJ", JSON.stringify(this.selSpecObj));
    } else {
      this.goodsSpec = false;
    }
  },

  methods: {
    //关闭弹框
    close() {
      this.popupVisible = false;
      this.detail.price = JSON.parse(sessionStorage.getItem("detailPrice"));
      this.$emit("hide-buy", false);
      document.body.style.overflow = "auto";
    },
    // 选规格后匹配数据，列出匹配后的productId
    matchElsProductId() {
      // console.log('00000');
      // console.log(this.selSpecArr);
      for (var i = 0; i < this.selSpecArr.length; i++) {
        this.sortSelSpecArr[i] = this.selSpecArr[i];
      }

      // console.log(this.selSpecArr.sort().toString());
      // this.sortSelSpecArr = this.selSpecArr;
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
      // console.log('11111');
      // console.log(this.selSpecArr);
      // console.log(this.sortSelSpecArr);
      let reg = this.sortSelSpecArr.toString();
      console.log(reg);
      // let newProduct = [];
      for (let i in this.product) {
        // newProduct.push({productId: this.product[i].productId,specValueIds: this.product[i].specValueIds});
        if (this.product[i].specValueIds == reg) {
          this.matchProductId = this.product[i].productId;
          this.detail.price = this.product[i].price;
          this.store = this.product[i].store;
          if (this.product[i].store == 0) {
            this.slot = true;
          } else {
            this.slot = false;
          }
          //				        this.details=this.product[i].price
        }
      }
      // console.log(newProduct);
      // let newProduct = this.product;
      // for(let i in newProduct){
      // 	newProduct[i].specValueIds = newProduct[i].specValueIds +',';
      // }
      // console.log('110011');
      // console.log(newProduct);
      // for (var i = 0, l = this.selSpecArr; i < l; i++) {
      // 	if (this.selSpecArr[i] instanceof Array && newProduct[i] instanceof Array) {
      //    if (!this.selSpecArr[i].equals(newProduct[i])){
      //      return false;
      //    }
      //  }
      //  else if (this.selSpecArr[i] != newProduct[i]) {
      //    return false;
      //  }
      // }
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
      // this.selSpecArr.sort();
      this.matchElsProductId();
      // console.log(els.specValue+' '+els.specValueId);
      this.selSpecObj[i].specValue = els.specValue;
      this.selSpecObj[i].specValueId = els.specValueId;
      sessionStorage.setItem("SELSPECOBJ", JSON.stringify(this.selSpecObj));
      //				console.log(this.selSpecObj);
      console.log(this.selSpecArr);
    },
    // 弹出层，选规格，加入购物车事件
    // joinca() {
    //   if (this.matchProductId == 0) {
    //     this.matchProductId = this.product[0].productId;
    //     this.store = this.product[0].store;
    //   }
    //   let that = this;
    //   if (this.buyCount > this.store) {
    //     alert("超出库存");
    //     this.buyCount = this.store;
    //     return false;
    //   } else {
    //     if (this.token) {
    //       // console.log(this.matchProductId);
    //       // console.log('---------00000---');
    //       this.$axios({
    //         method: "post",
    //         url: "/order/addCartGoods",
    //         responseType: "json",
    //         data: {
    //           token: this.token,
    //           productId: this.matchProductId,
    //           buyCount: this.buyCount
    //         }
    //       })
    //         .then(data => {
    //           if (data.status == 200) {
    //             this.popupVisible = false;
    //             if (data.data.res_code == 0) {
    //               this.showhiden = true;
    //               window.setTimeout(function() {
    //                 that.showhiden = false;
    //                 that.$emit("hide-buy", false);
    //               }, 1500);
    //             }
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     } else {
    //       this.$router.push("/login");
    //     }
    //   }
    // },
    //弹出层，选规格，立即购买事件
    purchase() {
      if (this.matchProductId == 0) {
        this.matchProductId = this.product[0].productId;
        this.store = this.product[0].store;
      }
      if (this.buyCount > this.store) {
        alert("超出库存");
        this.buyCount = this.store;
        return false;
      } else {
        if (this.token) {
          // console.log(this.matchProductId);
          // console.log('---------11111---');
          sessionStorage.removeItem("orderId");
          let obj = [
            {
              productId: this.matchProductId,
              buyCount: this.buyCount,
              cartId: ""
            }
          ];
          this.$axios({
            method: "post",
            url: "/order/orderCheckout",
            responseType: "json",
            data: {
              token: this.token,
              goodsData: JSON.stringify(obj)
            }
          })
            .then(data => {
              if (data.status == 200) {
                // console.log(data.data)
                if (data.data.res_code == 1) {
                  alert(data.data.res_info);
                } else {
                  sessionStorage.goodsList = JSON.stringify(data.data.res_data);
                  // console.log('35353535');
                  // console.log(data.data.res_data);
                  this.$router.push("/shoppingCart/shopbalance");
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          sessionStorage.pgths = "/goods/detail?goodsId=" + this.detail.goodsId;
          this.$router.push("/login");
        }
      }
    },
    //增加减少数量
    remove() {
      this.buyCount--;
      if (this.buyCount <= 0) {
        this.buyCount = 1;
      }
    },
    //判断添加的商品有没有超出库存
    adds() {
      this.buyCount++;
      if (this.matchProductId == 0) {
        this.matchProductId = this.product[0].productId;
        this.store = this.product[0].store;
        if (this.buyCount > this.store) {
          alert("超出库存");
          this.buyCount = this.store;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
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
    max-height: 7.5rem;
    overflow: scroll;
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
    .amount {
      font-size: 0.4rem;
      display: flex;
      justify-content: space-between;
      padding-top: 0.5rem;
      .number {
        display: inline-block;
        vertical-align: middle;
        .num-btn {
          width: 0.83rem;
          height: 0.83rem;
          border: #e5e5e5 1px solid;
          border-radius: 0.1rem;
          display: inline-block;
          background: url(../common/image/join.png) no-repeat;
          background-size: 130%;
          vertical-align: middle;
          &.remove {
            background-position: 0.15rem -0.5rem;
          }
          &.add {
            background-position: 0.2rem 0.1rem;
          }
        }
        .input {
          width: 2.24rem;
          text-align: center;
          height: 0.84rem;
          line-height: 0.84rem;
          border: #e5e5e5 1px solid;
          border-radius: 0.1rem;
          color: #999999;
          display: inline-block;
          vertical-align: middle;
          background: none;
        }
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
    /*position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;*/
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

.success {
  width: 6rem;
  text-align: center;
  padding-bottom: 0.3rem;
  p {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mt-prop {
  border-radius: 0.2rem;
}
</style>
