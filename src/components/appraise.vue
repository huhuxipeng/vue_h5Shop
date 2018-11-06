<template>
  <div id="appraise">
    <mt-header title="评价" class='center'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="main">
      <div class="contents" v-for="(item,index) in images" v-bind:key="index">
        <div class="goods">
          <p><img :src="item.goodsImage |filterss(3)" :onerror='logo' /></p>
          <p >
            <span>评价</span>
            <span @click="good(index,'good')">
              <i class="icons good"></i>
              <em>好评</em>
            </span>
            <span @click="cent(index,'cent')">
              <i class="icons cent"></i>
              <em>中评</em>
            </span>
            <span @click="bad(index,'bad')">
              <i class="icons bad"></i>
              <em>差评</em>
            </span>
          </p>

        </div>
        <div class="content">
          <textarea rows="8" cols="44" placeholder="请输入评价内容" value="" class="textarea"></textarea>
        </div>
        <ul class="photos">
          <li>
            <div v-if="hidden" class="person">
              <p v-for='(values,key) in item.arr' :key="key">
                <i @click.prevent="deletes(index,key)"></i>
                <img :src="values" />
              </p>
            </div>
            <p class="personImg">
              <input type="file" @change="upchanges(index,$event)" />
            </p>

          </li>
        </ul>

      </div>
      <label class="sel-box" @click.prevent="noname">
        <input type="checkbox" name="goodsSel" v-model="check">
        <i class="icons"></i>
        匿名提交
      </label>
    </div>

    <p class="btn" @click="submit">提交</p>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      logo: 'this.src="' + require("../common/image/defaultimg.png") + '"',
      hidden: false,
      images: [],
      upload: [],
      arr: [],
      face: [],
      no: 0,
      check: ""
    };
  },

  mounted() {
    this.face = JSON.parse(sessionStorage.getItem("APPRAISE"));
    this.images = this.face;
    for (let i = 0; i < this.face.length; i++) {
      this.upload.push(new Object());
      this.upload[i]["itemId"] = this.face[i].itemId;
      this.upload[i]["content"] = "";
      this.upload[i]["score"] = "";
      // this.upload[i]["image"] = "";
    }
  },

  methods: {
    backgo() {
      this.$router.go(-1);
    },
    //评价图标
    good(index, val) {
      this.upload[index].score = 0;

      let goods = document.getElementsByClassName("good")[index];
      goods.style.backgroundPosition = " -.79rem -.75rem";

      let bad = document.getElementsByClassName("bad")[index];
      bad.style.backgroundPosition = "-1.55rem 0";

      let cent = document.getElementsByClassName("cent")[index];
      cent.style.backgroundPosition = "-.05rem 0";
    },
    cent(index, val) {
      this.upload[index].score = 1;

      let cent = document.getElementsByClassName("cent")[index];
      cent.style.backgroundPosition = "-.05rem -.75rem";

      let goods = document.getElementsByClassName("good")[index];
      goods.style.backgroundPosition = " -.79rem 0";

      let bad = document.getElementsByClassName("bad")[index];
      bad.style.backgroundPosition = "-1.55rem 0";
    },
    bad(index, val) {
      this.upload[index].score = 2;

      let bad = document.getElementsByClassName("bad")[index];
      bad.style.backgroundPosition = "-1.55rem -.75rem";

      let goods = document.getElementsByClassName("good")[index];
      goods.style.backgroundPosition = " -.79rem 0";

      let cent = document.getElementsByClassName("cent")[index];
      cent.style.backgroundPosition = "-.05rem 0";
    },

    //删除图片
    deletes(index, keys) {
      let personImg = document.getElementsByClassName("personImg")[index];
      this.images[index].arr.splice(keys, 1);

      if (this.images[index].arr.length <= 2) {
        personImg.style.display = "block";
      }
    },
    //选择图片
    upchanges(index, even) {
     if(even.target.files.length==0)return;
      let personImg = document.getElementsByClassName("personImg")[index];
      let img = document.createElement("img");
      let file = even.target.files;
      this.$api.photoCompress(file[0], 220, o => {
        let that = this;
        var index_ = index;
        that.hidden = true;
        for (let i = 0; i < that.images.length; i++) {
          if (index_ == i) {
            that.images[i].arr.push(o);

            that
              .$axios({
                method: "post",
                url: "/member/anon/base64UploadImg",
                responseType: "json",
                data: {
                  data: o.substring(o.indexOf(',')+1),
                  type: 9
                }
              })
              .then(data => {
                that.arr.push(data.data.data.filePath);

                that.upload[i].imageList = that.arr.join(",");
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });

      if (this.images[index].arr.length == 2) {
        personImg.style.display = "none";
      }
    },
    noname() {
      this.check = !this.check;
      if (this.check) {
        return (this.no = 1);
      } else {
        return (this.no = 0);
      }
    },
    submit() {
      let token = sessionStorage.getItem("token");
      //循环的到输入框中的值
      for (var i = 0; i < this.images.length; i++) {
        if ($(".textarea")[i].value.length > 100) {
          alert("评价过长");
          return false;
        } else {
          this.upload[i].content = $(".textarea")[i].value;
        }
      }
      let params = {
        dataList:this.upload
      }
      this.$axios({
        method: "post",
        url: "/order/doOrderComment",
        responseType: "json",
        data: {
          anonFlag: this.no,
          commentData: JSON.stringify(params),
          orderSn: this.face[0].orderSn,
          token: token,
          orderType:this.$route.query.orderType,
        }
      })
        .then(data => {
          if (data.data.res_code == 0) {
            sessionStorage.removeItem("APPRAISE");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss' scoped="scoped">
#appraise {
  background: #f5f5f5;
  .center {
    background: #fff;
    color: black;
    height: auto;
    font-size: 0.5rem;
    padding: 10px;
  }
  .main {
    /*margin-bottom: 1.8rem;*/
    .goods {
      display: flex;
      justify-content: space-between;
      max-height: 2rem;
      padding: 0.3rem;
      background: white;
      .icons {
        display: inline-block;
        width: 0.6rem;
        height: 0.7rem;
        background: url(../common/image/appraise/total.png) no-repeat;
        background-size: 1000%;
      }
      p:first-child {
        flex: 1;
        margin-right: 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p:last-child {
        flex: 3;
        margin-top: 0.5rem;
        span {
          font-size: 0.4rem;
          margin-left: 0.2rem;
          vertical-align: middle;
          .good {
            background-position: -0.79rem 0;
          }
          .cent {
            background-position: -0.05rem 0;
          }
          .bad {
            background-position: -1.55rem 0;
          }
        }
      }
    }
    .content {
      background: white;
      padding: 0.3rem;
      textarea {
        width: 9rem;
        padding: 0.2rem;
        resize: none;
        font-size: 0.4rem;
      }
    }
    .photos {
      padding: 0.3rem;
      padding-top: 0px;
      height: 2rem;
      background: white;
      input {
        width: 2rem;
        height: 2rem;
        opacity: 0;
      }
      li {
        display: flex;
        justify-content: flex-start;
        .personImg {
          width: 2rem;
          height: 2rem;
          border: 1px solid #ccc;
          background: url(../common/image/appraise/camera.png) no-repeat;
          background-size: 100%;
        }
        .person {
          /*margin-right: .2rem;*/
          display: flex;
          justify-content: flex-start;
          p {
            border: 1px solid #ccc;
            margin-right: 0.2rem;
            width: 2rem;
            height: 2rem;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            i {
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              position: absolute;
              right: -0.1rem;
              top: -0.2rem;
              background: red;
              border-radius: 10rem;
              background: url(../common/image/appraise/back.png) no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
    .sel-box {
      padding: 0.3rem;
      vertical-align: middle;
      margin-bottom: 1.8rem;
    }
  }
  .btn {
    /*display: none;*/
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.3rem;
    text-align: center;
    color: white;
    background: orangered;
    font-size: 0.5rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    letter-spacing: 0.2rem;
    z-index: 100;
  }
}
</style>
