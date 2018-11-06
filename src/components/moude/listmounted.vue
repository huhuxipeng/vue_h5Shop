<template>
  <div v-if="listdata.length>0">
    <div class="footer">
      <!--<div class="title">-->
      <!--<span class="wire"></span>-->
      <!--<span>推荐商品</span>-->
      <!--<span class="wire"></span>-->
      <!--</div>-->
      <!--<ul class="goods-sort">-->
      <!--<li class="all current" @click="synth">综合</li>-->
      <!--<li class="price down" @click="moneys">价格<span><i></i><i></i></span></li>-->
      <!--<li class="time down" @click="tim">时间<span><i></i><i></i></span></li>-->
      <!--<li class="sell down" @click="sales">销量<span><i></i><i></i></span></li>-->
      <!--</ul>-->
      <ul class="listshop">
        <li class="shops" v-for="(item,index) in listdata" @click="details(item)" >
          <p><img :src="item.image |filterss(2)" :onerror='logo'></p>
          <p>{{item.name}}</p>
          <!--<p></p>-->
          <p><span>￥{{item.price}}</span><span>￥{{item.mktprice}}</span></p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: "listmounted",
    props: ['listdata'],
    data() {
      return {
        logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
        num: 1
      }
    },
    mounted() {
      // console.log(this.listdata)
    },
    methods: {
      // touchStart(e){//记录点击的Y坐标
      //   this.click_y=$(e.target).offset().top;
      // },
      details(val,e){
        // if(this.click_y-$(e.target).offset().top>40){//这是在滑动，应该是在下拉加载，所以不允许触发点击事件
        // return;
        // }

        this.$router.push({path:'goods/detail',query:{goodsId:val.goodsId}})
      },
      synth() {
      },
      moneys(even) {
        if (this.num == 1) {
          this.num = 0
          even.target.classList.remove('down')
        } else {
          this.num = 1
          even.target.classList.add('down')
        }

      },
      tim(even) {
        if (this.num == 1) {
          this.num = 0
          even.target.classList.remove('down')
        } else {
          this.num = 1
          even.target.classList.add('down')
        }

      },
      sales(even) {
        if (this.num == 1) {
          this.num = 0
          even.target.classList.remove('down')
        } else {
          this.num = 1
          even.target.classList.add('down')
        }


      },
    }
  }
</script>

<style scoped lang="scss">
  .footer {
    padding: .2rem;
    position: relative;
    .title {
      margin-bottom: .3rem;
      text-align: center;
      span:nth-child(2) {
        margin-right: .2rem;
        margin-left: .2rem;
      }
      span {
        font-size: .4rem;
        vertical-align: middle;
        display: inline-block;
      }
      .wire {
        border: 1px solid #ccc;
        width: 15%;
      }
    }
    .goods-sort {
      position: inherit;
      top: 0;
    }
    .listshop {
      display: flex;
      flex-wrap: wrap;
      .shops:nth-child(2n+1) {
      }
      .shops:nth-child(2n) {
      margin-left: .17rem;
      }
      .shops {
        background: white;
        padding: .1rem;
        width: 47%;
        min-height: 6.1rem;
        margin-bottom: .2rem;
        p:first-child {
          img {
            width: 100%;
           
          }
        }
        p:nth-child(2) {
          font-size: .3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          line-height: .39rem;
          padding:.1rem 0;
        }
        p:last-child {
          font-size: .4rem;
          span:first-child {
            color: red;
            margin-right: .1rem;
          }
          span:last-child {
            color: #ccc;
            text-decoration: line-through;
          }
        }
      }
    }
    .listshop:after{
      content: "";
      display: block;
      clear: both;
    }

  }
</style>
