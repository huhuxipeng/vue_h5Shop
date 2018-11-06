<template>
  <div class="shopping-cart-list-page">
    <commonTop header-title="购物车" header-type="1" header-class="shoppingTop" right-icon="icons" right-router="/shoppingCart/modify"></commonTop>
    <div v-if="!shows">
    <section class="store" v-for="(item,index) in storeLists">
      <div class="store-info" @click.prevent="selStore(index)">
        <label class="sel-box">
            <input type="checkbox" name="storeSel" v-model="item.show">
            <i class="icons"></i>
        </label>
        <span class="icons store-icon"></span>
        <i>{{item.comName}}</i>
        <span class="icons arrow-icon"></span>
      </div>
      <ul class="goods-show">
        <li v-for="(value,key) in item.goodsList" >
          <label class="sel-box" @click.prevent="selGoods(index,key)" >
              <input type="checkbox" name="goodsSel" v-model="value.show" v-if="value.store>0">
              <i class="icons" v-if="value.store>0"></i>
              <img class="export" src="../common/image/exhausted.png" v-if="value.store==0"/>
          </label>
          <div class="goods-info" @click="gooddetail(value)">
            <img :src="value.image |filterss(3)" class="store-logo" :onerror="logo">
            <span>
              <h2>{{value.name}}</h2>
              <p>{{value.specs}}</p>
              <i>￥{{(value.price).toFixed(2)}} <em>￥{{(value.mktprice).toFixed(2)}}</em>
              	<u>X{{value.buyCount}}</u>
              </i>
            </span>
          </div>
        </li>
      </ul>
    </section>
    <Recommend typeCode="3002" v-if="storeLists.length === 0"></Recommend>
    </div>
    <div class="nulls" v-if="shows">
    	<!--<img src="../common/image/kong.png"/>-->
    	<!--<p @click="goshopping">去商城</p>-->
      <Recommend :typeCode="typeCode"></Recommend>
    </div>
    <div class="total-pay-top"></div>
    <div class="total-pay boderBox" v-if="!shows">
      <label class="sel-box" @click.prevent="selAll">
          <input type="checkbox" name="allSel" v-model="allChecked">
          <i class="icons"></i>
          <em>全选</em>
      </label>
      <span>合计：<em v-if='totalPrice!=0'>￥{{totalPrice}}</em></span>
      <aside v-on:click.prevent="paymoney">立即结算</aside>
      <aside @click="clear" v-if="false">删除</aside>
    </div>
    <commonFooter current-menu="3"></commonFooter>
  </div>
</template>
<script>
import commonTop from "../components/commonTop";
import commonFooter from "../components/commonFooter";
import Recommend from "../components/Recommend";
export default {
  data() {
    return {
      allChecked: "",
      totalPrice: "",
      token: "",
      storeLists: [], //商品数组
      idnumber: [],
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      shows: false,
      typeCode: "3002"
    };
  },
  components: {
    commonTop: commonTop,
    commonFooter: commonFooter,
    Recommend: Recommend
  },
  mounted() {
    sessionStorage.removeItem("CATERORY");
    // if(localStorage.token!=null){
    // 	sessionStorage.token=localStorage.getItem('token');
    //   sessionStorage.identityId=localStorage.getItem('identityId');
    //   sessionStorage.details=localStorage.getItem('details');
    // }

    this.token = sessionStorage.getItem("token");
    if (this.token) {
      this.$axios({
        method: "post",
        url: "/order/pageCart",
        responseType: "json",
        data: {
          token: this.token
        }
      })
        .then(data => {
          // console.log(data);
          this.storeLists = data.data.res_data.dataList;
          console.log(this.storeLists);
          if (this.storeLists.length == 0) {
            // console.log('true');
            this.shows = true;
          } else {
            // console.log('false');
            this.shows = false;
            for (let i in this.storeLists) {
              this.storeLists[i]["show"] = false;
              for (let j = 0; j < this.storeLists[i].goodsList.length; j++) {
                this.storeLists[i].goodsList[j]["show"] = false;
              }
            }
            this.$set(this.storeLists, "show", false);
            // console.log(this.storeLists);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    gooddetail(val) {
      sessionStorage.ORDERID = 1;
      this.$router.push("/goods/detail?goodsId=" + val.goodsId);
    },

    // 全选选择
    selAll: function() {
      // alert(this.allChecked)
      this.allChecked = !this.allChecked;
      // alert(this.allChecked)
      let goodsAllPri = 0;
      if (this.allChecked == true) {
        for (let t in this.storeLists) {
          for (let a in this.storeLists[t].goodsList) {
            this.storeLists[t].show = true;
            this.storeLists[t].goodsList[a].show = true;
            this.idnumber.push(this.storeLists[t].goodsList[a].goodsId);
            goodsAllPri =
              goodsAllPri +
              parseFloat(this.storeLists[t].goodsList[a].price) *
                parseFloat(this.storeLists[t].goodsList[a].buyCount);
          }
        }
      } else {
        for (let t in this.storeLists) {
          for (let a in this.storeLists[t].goodsList) {
            this.storeLists[t].show = false;
            this.storeLists[t].goodsList[a].show = false;
            this.idnumber.splice(0, this.storeLists.length);
          }
        }
      }
      this.totalPrice = goodsAllPri.toFixed(2);
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    // 店铺选择
    selStore: function(index) {
      this.storeLists[index].show = !this.storeLists[index].show;
      // 店铺全选与取消
      let storeOnePri = 0;
      if (this.storeLists[index].show == true) {
        for (let a in this.storeLists[index].goodsList) {
          this.storeLists[index].goodsList[a].show = true;
          this.idnumber.push(this.storeLists[index].goodsList[a].goodsId);
          storeOnePri =
            storeOnePri +
            parseFloat(this.storeLists[index].goodsList[a].price) *
              parseFloat(this.storeLists[index].goodsList[a].buyCount);
        }
        // console.log(this.idnumber);
        // console.log('---------');
      } else {
        // console.log(index);
        // console.log(this.idnumber);
        // this.idnumber.splice(index,1)
        // console.log(this.idnumber);
        for (let a in this.storeLists[index].goodsList) {
          this.storeLists[index].goodsList[a].show = false;
          this.removeByValue(
            this.idnumber,
            this.storeLists[index].goodsList[a].goodsId
          );
          // this.idnumber.splice(0,this.storeLists.length)
        }
        console.log(this.idnumber);
      }
      this.totalPrice = storeOnePri.toFixed(2);

      // 店铺选择数量为全部，则全选
      let storeAllLen = 0;
      let storeCheckedAll = 0;
      let storeAllPri = 0;
      for (let a = 0; a < this.storeLists.length; a++) {
        storeAllLen++;
        if (this.storeLists[a].show == true) {
          storeCheckedAll = storeCheckedAll + 1;
          for (let r = 0; r < this.storeLists[a].goodsList.length; r++) {
            storeAllPri =
              storeAllPri +
              parseFloat(this.storeLists[a].goodsList[r].price) *
                parseFloat(this.storeLists[a].goodsList[r].buyCount);
          }
        }
      }
      this.totalPrice = storeAllPri.toFixed(2);
      if (storeCheckedAll == storeAllLen) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },

    // 商品选择
    selGoods: function(index, key) {
      // console.log(index+' '+key);
      this.storeLists[index].goodsList[key].show = !this.storeLists[index]
        .goodsList[key].show;
      let changeData = this.storeLists[index].goodsList[key].show;
      this.$delete(this.storeLists, "show");
      this.$set(this.storeLists, "show", changeData);
      if (this.storeLists[index].goodsList[key].show == true) {
        this.idnumber.push(this.storeLists[index].goodsList[key].goodsId);
      } else {
        for (let k = 0; k < this.idnumber.length; k++) {
          if (
            this.idnumber[k] == this.storeLists[index].goodsList[key].goodsId
          ) {
            this.idnumber.splice(k, 1);
          }
        }
      }

      let goodsLen = this.storeLists[index].goodsList.length;
      let goodsCheckedNum = 0;
      let goodsCheckedPri = 0;
      for (let p in this.storeLists[index].goodsList) {
        if (this.storeLists[index].goodsList[p].show == true) {
          goodsCheckedNum = goodsCheckedNum + 1;
        }
      }
      // console.log(goodsCheckedNum+' '+goodsLen);
      // 商品选择数量，等于店铺总数
      if (goodsCheckedNum == goodsLen) {
        this.storeLists[index].show = true;
      } else {
        this.storeLists[index].show = false;
      }
      // 商品逐个多选
      let goodsAllLen = 0;
      let goodsCheckedAll = 0;
      let goodsCheckedAllPri = 0;
      for (let t in this.storeLists) {
        for (let a in this.storeLists[t].goodsList) {
          goodsAllLen++;
          if (this.storeLists[t].goodsList[a].show == true) {
            goodsCheckedAll = goodsCheckedAll + 1;
            goodsCheckedAllPri =
              goodsCheckedAllPri +
              parseFloat(this.storeLists[t].goodsList[a].price) *
                parseFloat(this.storeLists[t].goodsList[a].buyCount);
          }
        }
      }
      this.totalPrice = goodsCheckedAllPri.toFixed(2);
      if (goodsCheckedAll == goodsAllLen) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    paymoney() {
      let placeOrder = [];
      let arr = [];
      for (let i = 0; i < this.storeLists.length; i++) {
        for (let a in this.storeLists[i].goodsList) {
          // for (let j = 0; j < this.idnumber.length; j++) {
          // }
          if (this.storeLists[i].goodsList[a].show == true) {
            // if(this.storeLists[i].goodsList[a].goodsId==this.idnumber[j]){
            placeOrder.push({
              cartId: this.storeLists[i].goodsList[a].cartId,
              productId: this.storeLists[i].goodsList[a].productId,
              buyCount: this.storeLists[i].goodsList[a].buyCount
            });
            // let obj={cartId:this.storeLists[i].goodsList[a].cartId,productId:this.storeLists[i].goodsList[a].productId,buyCount:this.storeLists[i].goodsList[a].buyCount}
            // placeOrder.push(obj)
          }
        }
      }
      let placeOrderstr = JSON.stringify(placeOrder);
      let checkPostData = {
        token: this.token,
        goodsData: placeOrderstr
      };
      // console.log(checkPostData);
      if (placeOrderstr == "[]") {
        alert("请选择商品！");
      } else {
        this.$axios({
          method: "post",
          url: "/order/orderCheckout",
          responseType: "json",
          data: checkPostData
        })
          .then(data => {
            if (data.status == 200) {
              sessionStorage.goodsList = JSON.stringify(data.data.res_data);
              this.$router.push("/shoppingCart/balance");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    remove: function(index) {
      if (this.storeLists[index].buyCount > 1) {
        this.storeLists[index].buyCount =
          parseInt(this.storeLists[index].buyCount) - 1;
        this.num = this.storeLists[index].buyCount;
        this.$axios({
          method: "post",
          url: "/order/editCartOfBuyCount",
          responseType: "json",
          data: {
            buyCount: this.num,
            productId: this.storeLists[index].productId,
            token: this.token
          }
        })
          .then(data => {
            if (data.status == 200) {
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("不能小于1");
      }
    },
    // 增加
    add: function(index) {
      this.storeLists[index].buyCount =
        parseInt(this.storeLists[index].buyCount) + 1;
      this.num = this.storeLists[index].buyCount;

      this.$axios({
        method: "post",
        url: "/order/editCartOfBuyCount",
        responseType: "json",
        data: {
          buyCount: this.num,
          productId: this.storeLists[index].productId,
          token: this.token
        }
      })
        .then(data => {
          if (data.status == 200) {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goshopping() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.nulls {
  text-align: center;
  img {
    margin-top: 2rem;
    width: 50%;
  }
  p {
    padding: 10px;
    text-align: center;
    font-size: 0.5rem;
    margin-right: 3rem;
    margin-left: 3rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
</style>
