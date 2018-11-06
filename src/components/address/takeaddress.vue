<template>
  <div id="take">
    <mt-header flexd title="收货地址" class="header">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="main">
      <ul class="matter">
        <li v-for="(item,$index) in arr">
          <div class="topmatter">
            <p>
              <span>收货人：</span>
              <span>{{item.name}}</span>
              <span class="phone">{{item.mobile || item.tel}}</span>
            </p>
            <p class="add">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.addressDetail}}</p>
          </div>
          <div class="bottommatter">
            <p :id="'name'+item.addrId" @click="defaults($index,$event)">
              <span class="mo" :class="{active:item.show}">
                <input type="checkbox" value="" class="radio" checked="true" v-model="redi" /> 设为默认值
              </span>
            </p>
            <p>
              <span @click="complie($index,$event)" class="redact"><img src="../../common/image/editor.png" slot="icon" />编辑</span>
              <span @click="clear($index)" class="clear"><img src="../../common/image/del.png" slot='icon' />删除</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <p @click="append">添加新地址</p>
    </div>
    <mt-popup popup-transition="popup-fade" v-model="showhiden" closeOnClickModal>
      <div class="clears">
        <p>确定要删除该地址吗？</p>
      </div>
      <div class="footers">
        <p @click="right">确认</p>
        <p @click="abolish">取消</p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup, Toast } from "mint-ui";
export default {
  data() {
    return {
      showhiden: false,
      bol: false,
      redi: "",
      arr: [],
      images: require("../../common/image/shopImg/right.png"),
      token: "",
      index: ""
    };
  },
  mounted() {
    //获取数据
    console.log("2345");
    this.token = sessionStorage.getItem("token");
    this.$axios({
      url: "/member/queryMemAddressList",
      method: "post",
      responseType: "json",
      data: {
        token: this.token
      }
    })
      .then(data => {
        this.arr = data.data.res_data.memberAddressList.map(o => {
          if (o.defAddr) {
            o.show = true;
          } else {
            o.show = false;
          }
          return o;
        });

        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    // arr() {
    //   this.arr.forEach((element, index) => {
    //     console.log(element.show);
    //     let radios = document.getElementsByClassName("radio");
    //     let mo = document.getElementsByClassName("mo");
    //     if (element.show) {
    //       console.log("#name" + element.addrId);
    //       radios[index].style.backgroundImage = "url(" + this.images + ")";
    //       radios[index].style.backgroundSize = "100%";
    //       mo[index].style.color = "red";
    //       // setTimeout(function(){
    //       // 	$("#name"+element.addrId).click()
    //       // },1000)
    //     } else {
    //       radios[index].style.background = "none";
    //       mo[index].style.color = "black";
    //     }
    //   });
    // }
  },
  updated() {},
  methods: {
    //设置为默认值
    defaults(index, even) {
      // this.arr[index].show = !this.arr[index].show;
      this.arr.forEach(element => {
        element.show = false;
      });
      this.$axios({
        method: "post",
        url: "/member/editDefAddr",
        responseType: "json",
        data: {
          addrId: this.arr[index].addrId,
          token: this.token
        }
      })
        .then(data => {
          this.arr[index].show = true;
          Toast("设置成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    append() {
      sessionStorage.removeItem("add");
      this.$router.push("/address/newaddress");
    },
    //编辑地址
    complie(index, even) {
      this.arr[index].show = !this.arr[index].show;
      for (var i = 0; i < this.arr.length + 1; i++) {
        if (i == index) {
          let str = JSON.stringify(this.arr[index]);
          sessionStorage.setItem("add", str);
          // console.log(str);
          sessionStorage.bol = 1;
          //路径跳转
          this.$router.push("/address/newaddress");
        }
      }
    },
    backgo() {
      this.$router.go(-1);
    },
    clear(index) {
      this.index = index;
      this.showhiden = true;
    },
    abolish() {
      this.showhiden = false;
    },
    right() {
      //删除地址
      this.$axios({
        method: "post",
        url: "/member/delMemAddress",
        data: {
          addrId: this.arr[this.index].addrId,
          token: this.token
        },
        responseType: "json"
      })
        .then(data => {
          //					console.log(data)
        })
        .catch(err => {
          console.log(err);
        });
      this.arr.splice(this.index, 1);
      this.showhiden = false;
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
#take {
  .header {
    background: white;
    padding: 10px;
    color: black;
    font-size: 0.6rem;
    border-bottom: 1px solid #eee;
  }
  .main {
    margin-top: 10px;
    .matter {
      li {
        background: white;
        line-height: 0.6rem;
        margin-bottom: 0.3rem;
        .topmatter {
          padding-bottom: 10px;
          font-size: 0.4rem;
          padding-left: 10px;
          padding-right: 10px;
          .phone {
            color: red;
            float: right;
          }
          .add {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .bottommatter {
          padding-left: 10px;
          padding-right: 10px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 0.3rem;
          .radio {
            display: inline-block;
            width: 0.35rem;
            height: 0.35rem;
            margin-right: 5px;
            border: 1px solid #ccc;
            border-radius: 50%;
            vertical-align: middle;
            outline: none;
          }
          p:nth-child(2) {
            span:nth-child(2) {
              margin-left: 0.3rem;
            }
            img {
              width: 0.35rem;
              height: 0.45rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
  .footer {
    p {
      padding: 10px;
      text-align: center;
      line-height: 0.5rem;
      color: white;
      font-size: 0.5rem;
      background: #f22d07;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .clears {
    width: 8.125rem;
    height: 2rem;
    border-radius: 20px;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
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
      line-height: 1rem;
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
  .mint-popup {
    border-radius: 0.2rem;
  }
}
.mo.active {
  color: red;
}
.mo.active input {
  background-image: url("../../common/image/shopImg/right.png");
  background-size: 100%;
}
</style>