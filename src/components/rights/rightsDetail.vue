<template>
	<div id="rightdetail">
		<commonTop header-title="申请维权" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="shoping" v-if="!shopNumber">
			<p><img :src="goodsList.goodsImage |filterss(3)" :onerror='logo' /></p>
			<p>
				<span>{{goodsList.goodsName}}</span>
				<span>分类:{{goodsList.specs}}</span>
			</p>
		</div>
		<!--<div class="shopings" v-if="shopNumber">
			<p class="btn" @click="compile">
				<span>维权商品</span>
				<span>添加和编辑</span>
			</p>
			<ul class="shows">
				<li v-for='(item,index) in goodsList'>
					<p><img :src="item.image" :onerror='logo' /></p>
					<p>￥{{item.price}}</p>
				</li>
			</ul>
		</div>-->
		<div class="main">
			<p>
				<span>退款类型</span>
				<span @click="change('type')" class='type'>请选择</span>
			</p>
			<p>
				<span>退款原因</span>
				<span @click="change('reason')" class="reason">请选择</span>
			</p>
			<p>
				<span>退款金额</span>
				<span><input class="noborder" style="text-align:right;" @change="changePrice" v-model="totalPrice" /></span>
			</p>
			<!-- <p v-if="goodsList.orderStatus!=3"><span>退款金额<em>￥{{goodsList.goodsPrice*this.goodsList.buyCount}}</em></span><span></span></p> -->
			<!-- <p v-else><span>退款金额<em>￥{{goodsList.goodsPrice*this.goodsList.buyCount+goodsList.shipAmount}}</em></span><span></span></p> -->
			<span class="hint">最多￥{{goodsList.orderAmount}}（含邮费）</span>
		</div>

		<p class="submit" @click="submit">提交</p>

		<mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup'>
			<ul>
				<li v-for="(item,index) in content" @click="out(index)" ref='noble'>{{item}}</li>
			</ul>
		</mt-popup>

	</div>
</template>

<script>
import commonTop from "../../components/commonTop";
import {MessageBox} from 'mint-ui';
export default {
  data() {
    return {
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      goodsList: [],
      shopNumber: false,
      type: ["仅退款", "退货退款"],
      types: ["仅退款", "退货退款"],
      reason: [
        "商家发货太慢",
        "商品描述不符合",
        "质量问题",
        "快递一直收不到",
        "无理由，不想买了",
        "其他"
      ],
      popupVisible: false,
      content: [],
      states: [],
      changes: "",
      totalPrice: "",
      num: 0
    };
  },
  components: {
    commonTop: commonTop
  },
  mounted() {
    this.goodsList = JSON.parse(sessionStorage.getItem("RIGHT"));
    console.log(this.goodsList);
    if (this.goodsList.length > 1) {
      this.shopNumber = true;
    } else {
      this.shopNumber = false;
    }
  },
  methods: {
    changePrice() {
      if (this.totalPrice > this.goodsList.orderAmount) {
        this.totalPrice = this.goodsList.orderAmount;
      }
    },
    change(val) {
      this.popupVisible = true;
      if (val == "type") {
        if (this.goodsList.orderStatus == 3) {
          this.content = this.type;
        } else {
          this.content = this.types;
        }
      } else if (val == "reason") {
        this.content = this.reason;
      }
      this.changes = val;
    },
    out(index) {
      if (this.changes == "type") {
        this.states.splice(0, 1, this.$refs.noble[index].innerText);
        $(".type").text(this.$refs.noble[index].innerText);
        this.num = index;
      } else {
        this.states.splice(1, 1, this.$refs.noble[index].innerText);
        $(".reason").text(this.$refs.noble[index].innerText);
      }
      this.popupVisible = false;
    },
    submit() {
      console.log(this.goodsList);
      let token = sessionStorage.getItem("token");
      if(!this.totalPrice){
        MessageBox('提示','请输入订单金额');
        return;
      }
      if (this.states.length == 0) {
        MessageBox('提示','选择维权原因');
      } else {
        this.$axios({
          method: "post",
          url: "/order/right/submit",
          responseType: "json",
          data: {
            itemsIds: this.goodsList.itemId,
            price: this.totalPrice,
            reason: this.states[1],
            itemsType:this.$route.query.orderType,
            token: token,
            type: this.num
          }
        })
          .then(data => {
            if (data.data.res_code == 0) {
              this.$router.push({
                path: "/rightDetails",
                query: { id: data.data.res_data.rightOrder.id }
              });
            } else {
              alert(data.data.res_info);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    compile() {
      this.$router.push("/rightslist");
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
#rightdetail {
  background: #e0e0e0;
  .shoping {
    background: white;
    padding: 0.3rem;
    display: flex;
    border-bottom: 1px solid #b3b3b3;
    margin-bottom: 0.3rem;
    p:first-child {
      flex: 1;
      max-height: 2rem;
      margin-right: 0.1rem;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    p:last-child {
      flex: 2;
      font-size: 0.3rem;
      span {
        display: block;
        line-height: 1.5;
      }
      span:last-child {
        margin-top: 0.3rem;
        font-size: 0.2rem;
        color: #c8c8cd;
      }
    }
  }
  /*多个商品*/
  .shopings {
    background: white;
    .btn {
      span {
        display: inline-block;
        font-size: 0.4rem;
      }
      span:nth-child(2) {
        border: 1px solid orangered;
        border-radius: 0.2rem;
        text-align: center;
        padding: 0.2rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        color: orangered;
        font-size: 0.3rem;
        margin-left: 5rem;
      }
    }
    .shows {
      padding: 0.3rem;
      padding-left: 1.3rem;
      li {
        float: left;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.2rem;
        position: relative;
        p:first-child {
          height: 2.4rem;
          border-radius: 0.2rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
          }
        }
        p:last-child {
          font-size: 0.4rem;
          color: red;
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          line-height: 0.8rem;
          background: rgba(255, 255, 255, 0.5);
          height: 0.8rem;
          border-bottom-right-radius: 0.2rem;
          border-bottom-left-radius: 0.2rem;
        }
      }
    }
    .shows:after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .main {
    p {
      background: white;
      padding: 0.3rem;
      margin-bottom: 0.3rem;
      display: flex;
      span {
        flex: 1;
        font-size: 0.3rem;
        display: inline-block;
      }
      span:last-child {
        text-align: right;
      }
    }
    .hint {
      display: inline-block;
      padding: 0.3rem;
      margin-bottom: 0.3rem;
    }
  }
  .upimg {
    /*padding: .3rem;*/
    margin: 0.3rem;
    position: relative;
    .shopImgs {
      border: 1px solid #ccc;
      width: 2rem;
      height: 2rem;
      position: absolute;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .shopImgs:after {
      content: "上传图片";
      display: block;
      position: absolute;
      top: 0.7rem;
      left: 0.3rem;
      z-index: -2;
    }
  }
  .submit {
    color: white;
    text-align: center;
    padding: 0.3rem;
    background: orangered;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 0.4rem;
  }
  .popup {
    width: 100%;
    font-size: 0.5rem;
    text-align: center;
    padding: 10px;
    ul {
      font-size: 0.4rem;
      li {
        line-height: 1rem;
        border-bottom: 1px solid #ccc;
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
