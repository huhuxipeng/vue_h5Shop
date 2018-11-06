<template>
  <div id="collectsop">
    <mt-header title="商品收藏" class='center'>
      <router-link slot="left" to="/percenter">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button slot="right" style='font-size:.3rem;' v-on:click='compiles'>{{compiletitle}}</mt-button>-->
    </mt-header>
    <div class="main">
      <ul>
        <li class="shoplist" v-if="datalist.length>0" v-for="(item,index) in datalist">
          <p @click="goshop(item)"><img :src="item.image |filterss(3)" :onerror='logo'></p>
          <p>
            <span @click="goshop(item)">{{item.name}}</span>
            <span @click="goshop(item)">￥{{Number(item.price).toFixed(2)}}</span>
            <span @click="goshop(item)">￥{{Number(item.mktprice).toFixed(2)}}</span>
            <span @click="clear(item,index)">取消收藏</span>
          </p>
        </li>
      </ul>
    </div>

    <!--//空列表推荐，判断数据是都为空，，需要参数，数据链接以及参数类型-->
    <Recommend :typeCode="typeCode" v-if="datalist.length === 0"></Recommend>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import Recommend from '../../components/Recommend'
  export default {
    name: "collectshop",
    data() {
      return {
        logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
        token: '',
        datalist: [],
        typeCode:'3007'
      }
    },
    mounted() {
      this.token = sessionStorage.token;
      this.$axios({
        method: 'post',
        url: '/goods/goodsCollectionList',
        responseType: 'json',
        data: {
          token: this.token,
          pageNo: 0,
          pageSize: 10,
        }
      }).then(data => {
        console.log(data.data.res_data.dataList.length)
        this.datalist = data.data.res_data.dataList
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      clear(val, index) {
        this.$axios({
          method: 'post',
          url: '/goods/collectGoods',
          responseType: 'json',
          data: {
            token: this.token,
            flag: true,
            goodsType: val.goodsType,
            currencyId:val.currencyId
          }
        }).then(data => {
          // console.log(JSON.parse(JSON.stringify(data)))
          if (data.data.res_code == 0) {
            MessageBox('提示',data.data.res_info)
            this.datalist.splice(index, 1)
          }

        }).catch(err => {
          console.log(err)
        })
      },
      goshop(val) {
        if(val.goodsType==2){//这里需要去拼团页面
        this.$router.push({path: '/group/groupdetail', query: {activityId: val.currencyId}});
        return
        }
        this.$router.push({path: '/goods/detail', query: {goodsId: val.currencyId}})
      }
    },
    components:{
      Recommend: Recommend
    }

  }
</script>

<style scoped lang="scss">
  #collectsop {
    .center {
      background: #fff;
      color: black;
      height: auto;
      font-size: .5rem;
    }
    .main {
      padding: .2rem;
      .shoplist {
        height:2.5rem;
        background: white;
        padding: .1rem;
        margin-bottom: .2rem;
        display: flex;
        p:first-child {
          flex: 0.8;
          img {
            width: 100%;
            height: 100%;
            margin-right: .2rem;
          }
        }
        p:nth-child(2) {
          flex: 2;
          margin-left: .2rem;
          span {
            display: block;
          }
          span:first-child {
            height: 1.5rem;
            font-size: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
          }
          span:nth-child(2) {
            width: 50%;
            font-size: .5rem;
            color: orangered;
          }
          span:nth-child(3) {
            width: 50%;
            color: #ccc;
            font-size: .4rem;
            text-decoration: line-through;
          }
          span:last-child {
            float: right;
            margin-top: -.8rem;
            font-size: .35rem;
            border: 1px solid orangered;
            padding: .1rem;
            border-radius: .2rem;
            color: orangered;
          }
        }

      }

    }
  }
</style>
