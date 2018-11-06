<template>
  <div style="line-height:0;">
    <!--1001-->
    <div class="navs" v-if="moudenum.modelId=='1001'">
      <div class="navbtn">
        <ul class="bannerbtn">
          <li v-for="(item,index) in moudenum.pageFloorModuleList" @click="bannerpath(item,index)" :class="{odd:(index+1)%2==0}">
            <p><img :src="item.pic |filterss(5)" :onerror='logo'></p>
          </li>
        </ul>
      </div>
      <!--<p class="roll"><span class="rollbtn"></span></p>-->
    </div>
    <!--1002-->
    <div class="indesmoude" v-if="moudenum.modelId=='1002'" :style="b">
      <div class="ads" :style="a">
        <!--<p>{{moudedata[0].relType}}</p>-->
        <mt-swipe :auto="2500" class="banners">
          <mt-swipe-item v-for="(item,index) in moudenum.pageFloorModuleList">
            <img :src="item.pic |filterss(1)" :onerror='logo' @click="goshop(item)" />
          </mt-swipe-item>
        </mt-swipe>
      </div>

    </div>
    <!--1003-->
    <div class="indesmoude" v-if="moudenum.modelId=='1003'">

      <div class="mains">
        <div class="left1">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(2)" :onerror='logo'></p>
        </div>
        <div class="right1">
          <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(2)" :onerror='logo'></p>
        </div>
      </div>
    </div>
    <!--1004-->
    <div class="indesmoude" v-if="moudenum.modelId=='1004'">

      <div class="mains">
        <div class="left2">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center2">
          <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="right2">
          <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
      </div>
    </div>
    <!--1005-->
    <div class="indesmoude" v-if="moudenum.modelId=='1005'">

      <div class="mains">
        <div class="left3">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(2)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="right3">
          <div class="righttop3">
            <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(2)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="rightbottom3">
            <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(2)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <!--1006-->
    <div class="indesmoude" v-if="moudenum.modelId=='1006'">

      <div class="mains">
        <div class="left4">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center4left">
          <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center4right">
          <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(4)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="right4">
          <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic |filterss(4)" :onerror='logo'></p>
          <p></p>
        </div>
      </div>
    </div>
    <!--1007-->
    <div class="indesmoude" v-if="moudenum.modelId=='1007'">

      <div class="mains">
        <div class="left4">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(5)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center4left">
          <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(5)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center4right">
          <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(5)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center5right1">
          <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic |filterss(5)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="right4">
          <p @click="goshop(moudedata[4])"><img :src="moudedata[4].pic |filterss(5)" :onerror='logo'></p>
          <p></p>
        </div>
      </div>
    </div>
    <!--1008-->
    <div class="indesmoude" v-if="moudenum.modelId=='1008'">

      <div class="mains">
        <div class="left6">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center6">
          <div class="center6top6">
            <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="center6bottom6">
            <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
        <div class="right6">
          <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
      </div>
    </div>
    <!--1009-->
    <div class="indesmoude" v-if="moudenum.modelId=='1009'">

      <div class="mains">
        <div class="left7">
          <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="center7">
          <div class="center7top7">
            <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="center7bottom7">
            <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
        <div class="right7">
          <div class="right7top7">
            <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="right7bottom7">
            <p @click="goshop(moudedata[4])"><img :src="moudedata[4].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <!--1010-->
    <div class="indesmoude" v-if="moudenum.modelId=='1010'">

      <div class="mains">
        <div class="left8">
          <div class="left8top8">
            <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="left8bottom8">
            <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
        <div class="center8">
          <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic |filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
        <div class="right8">
          <div class="right8top8">
            <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="right8bottom8">
            <p @click="goshop(moudedata[4])"><img :src="moudedata[4].pic |filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <!--1011-->
    <div class="indesmoude" v-if="moudenum.modelId=='1011'">

      <div class="mains">
        <div class="left9">
          <div class="left9top9">
            <p @click="goshop(moudedata[0])"><img :src="moudedata[0].pic|filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="left9bottom9">
            <p @click="goshop(moudedata[1])"><img :src="moudedata[1].pic|filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
        <div class="center9">
          <div class="center9top9">
            <p @click="goshop(moudedata[2])"><img :src="moudedata[2].pic|filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
          <div class="center9bottom9">
            <p @click="goshop(moudedata[3])"><img :src="moudedata[3].pic|filterss(3)" :onerror='logo'></p>
            <p></p>
          </div>
        </div>
        <div class="right9">
          <p @click="goshop(moudedata[4])"><img :src="moudedata[4].pic|filterss(3)" :onerror='logo'></p>
          <p></p>
        </div>
      </div>
    </div>
    <!--1012-->
    <div class="indesmoude" v-if="moudenum.modelId=='1012'">

      <ul class="listmounted">
        <p class="lis12" v-for="(item,index) in moudedata" @click="goshop(item)"><img :src="item.pic" :onerror='logo'>
        </p>
      </ul>
      <!--</div>-->
    </div>
    <!--1013-->
    <div class="indesmoude" v-if="moudenum.modelId=='1013'">

      <ul class="listmounted">
        <li class="lis13" v-for="(item,index) in moudedata" @click="goshop(item)"><img :src="item.pic" :onerror='logo'>
        </li>
      </ul>
      <!--</div>-->
    </div>
    <!--title-->
    <div class="title" v-if="moudenum=='1'">
      <span class="wire"></span>
      <span>{{moudedata.num}}</span>
      <span class="wire"></span>
    </div>
  </div>

</template>

<script>
import identyPath from "../../common/js/identityId";
export default {
  name: "indexNoude",
  props: ["moudenum", "moudedata", "moudepath"],
  data() {
    return {
      logo: 'this.src="' + require("../../common/image/defaultimg.png") + '"',
      widths: 0,
      a: "height:4rem",
      b: "margin-bottom:.2rem"
    };
  },
  mounted() {
    $(".bannerbtn").css({ width: (15 / 2).toFixed(0) * 2 + "rem" });
    this.widths = document.body.clientWidth;
    let b = this.widths / (this.moudenum.modelWidth / this.moudenum.modelHight);

    this.a = "height: " + b + "px;";
    this.b =
      "margin-bottom:" +
      this.moudenum.modelBelowEdge +
      "px;margin-top:" +
      this.moudenum.modelTopEdge +
      "px";
  },
  methods: {
    bannerpath(val, index) {
      console.log(val, index);
      this.paths(val);
    },
    goshop(val) {
      console.log(val);
      this.paths(val);
    },
    paths(val) {
      this.$api.toRelDetail(val,this);
    },
    sendToThreeIndex(pickCouponList){//传参给首页
        console.log('pickCouponList', pickCouponList)
        this.$emit('noudeBackFun', pickCouponList)
    },
  }
};
</script>

<style scoped lang="scss">
.navs {
  padding: 0.2rem;
  padding-top: 0;
  padding-bottom: 0;
  /*height: 5.6rem;*/
  .navbtn {
    overflow-x: scroll;
    overflow-y: hidden;
    .bannerbtn {
      li {
        font-size: 0.4rem;
        text-align: center;
        float: left;
        width: 1.9rem;
        /*margin-bottom: .2rem;*/
        img {
          width: 100%;
        }
      }
      .odd {
        color: yellow;
        margin-top: 1.9rem;
        margin-left: -1.95rem;
      }
    }
  }
  .roll {
    clear: both;
    width: 4rem;
    height: 0.1rem;
    margin: 0 auto;
    border-radius: 0.1rem;
    background: #ccc;
    box-sizing: border-box;
    span {
      display: inline-block;
      width: 50%;
      height: 100%;
      border-radius: 0.1rem;
      background: orangered;
    }
  }
}

.indesmoude {
  /*padding-left: .2rem;*/
  /*padding-right: .2rem;*/
  .ads {
    img {
      width: 100%;
    }
  }

  .mains {
    display: flex;
    justify-content: flex-start;
    img {
      width: 100%;
    }
    div {
      flex: 1;
      /*margin-bottom: .2rem;*/
    }
  }
}
.indesmoude:after {
  display: block;
  content: "";
  clear: both;
}

/*1012*/
.listmounted {
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  .lis12 {
    img {
      width: 4rem;
    }
  }
  .lis13 {
    img {
      width: 4.5rem;
    }
  }
}

.title {
  margin-bottom: 0.3rem;
  text-align: center;
  span:nth-child(2) {
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }
  span {
    font-size: 0.4rem;
    vertical-align: middle;
    display: inline-block;
  }
  .wire {
    border: 1px solid #ccc;
    width: 15%;
  }
}
</style>
