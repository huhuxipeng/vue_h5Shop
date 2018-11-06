<template>
  <div id="threeIndex">
    <mt-header :title="relHref" class='center'>
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    
    <div v-if="indexcontent" style="position:absolute;top:1.2rem;left:0;right:0;bottom:0;">
      <div v-if="mounteds" >
        <inidexNoude v-for="(item,index) in mounteds" :moudenum="item"
                   :moudedata="item.pageFloorModuleList"></inidexNoude>
    </div>
      <mt-loadmore  style="padding-top:0.2rem;" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="allLoaded">
      <listmounted :listdata="indexcontent"></listmounted>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import inidexNoude from '../components/moude/indexNoude'
  import listmounted from '../components/moude/listmounted'

  export default {
    name: "specials",
    data() {
      return {
        mounteds: [],
        indexcontent: [],
        relId:null,
        relHref:"",
        pageId:'',
        url: "/basics/anon/getPageGoodsListByPageId", //获取列表的接口地址
      pageNo: 1,
      allLoaded: false //是否全部加载完毕
      }
    },
    components: {
      'inidexNoude': inidexNoude,
      'listmounted': listmounted
    },
    created(){
      this.relId=this.$route.query.relId
    },
    watch: {
      '$route' (to, from) {
        console.log(to)
        if(to.query.relId!=this.relId){
          window.location.reload()
        }
      }
    },
    mounted() {

      this.$axios({
        method: 'post',
        url: '/basics/anon/getPageDataByRelInfo',
        responseType: 'json',
        data: {
          relType:3,
          relId:this.relId
        }
      }).then(data => {
        if (data.data.res_code == 0) {
          console.log(data)
          this.mounteds = data.data.res_data.pageFloorList
          document.getElementById('threeIndex').style.background = data.data.res_data.pageColor
          this.pageId = data.data.res_data.pageId
          this.indesdata(data.data.res_data.pageId)
          this.relHref = data.data.res_data.pageName
        }
      }).catch(err => {
        console.log(err)
      })

    },
    methods: {
      loadBottom() {
      //加载更多
      var params = {
        goodName: this.product,
        pageSize: 10,
        pageId:this.pageId,
      };
      this.$api.loadMore(this, params, this.url, this.indexcontent,o=>{
        if (o.data.res_code == 0) {
            o.data.res_data.pageFloorList.forEach(element => {
              this.indexcontent.push(element);
            });
          }
      });
    },
      indesdata(val) {
        this.$axios({
          method: 'post',
          url: '/basics/anon/getPageGoodsListByPageId',
          responseType: 'json',
          data: {
            pageNo:1,
            pageSize: 10,
            pageId: val
          }
        }).then(data => {
          if (data.data.res_code == 0) {
            this.indexcontent = data.data.res_data.pageFloorList

          }
        }).catch(err => {
          console.log(err)
        })
      },
      backgo(){
        this.$router.go(-1)
      },
    },

  }
</script>

<style scoped lang="scss">
  #threeIndex {
    .center{
      background:#fff;
      color:black;
      height:auto;
      font-size:.5rem;
    }
    .sear {
      padding-top: .5rem;
      border: none;
      border-radius: 20px;
      flex: 4;
      margin-right: .2rem;
      margin-left: .2rem;
      input {
        box-sizing: border-box;
        padding-left: 1rem;
        padding-bottom: 10px;
        padding-top: .2rem;
        font-size: .4rem;
        border: 1px solid #ccc;
        border-radius: .1rem;
        width: 100%;
        height: 100%;
        outline: none;
        background: url(../common/image/search.png) no-repeat, #e5e5e5;
        background-position: .3rem;
        background-size: .5rem;
      }
      margin-bottom: .3rem;
    }
    .nav {
      .navtop {
        box-sizing: border-box;
        width: 90%;
        background: #fffefe;
        height: .7rem;
        li {
          font-size: .4rem;
          float: left;
          padding: .1rem;
          padding-right: .2rem;
          padding-left: .2rem;
          text-align: center;
        }
        .bot {
          color: orangered;
          border-bottom: 1px solid orangered;
        }
      }
      .pull-down {
        width: 1rem;
        height: .7rem;
        float: right;
        background: white;
        margin-top: -.7rem;
        img {
          width: 70%;
          height: 50%;
          text-align: center;
          margin-left: 20%;
          margin-top: 20%;
        }
      }

    }
    .showsnav {
      width: 100%;
      height: 100%;
      background: white;
      position: relative;
      padding: .2rem;
      z-index: 12;
      li {
        font-size: .4rem;
        float: left;
        margin-right: .2rem;
        margin-left: .2rem;
        padding: .1rem;
      }
      .hidenav {
        background: orangered;
        color: white;
        border-radius: .2rem;
      }
    }
    .mast {
      position: fixed;
      top: 2.5rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      z-index: 10;
    }
    .showsnav:after {
      display: block;
      content: "";
      clear: both;
    }
    .message {
      display: none;
      position: fixed;
      top: 2.7rem;
      left: .2rem;
      z-index: 9;
      border-radius: .1rem;
      padding: .1rem;
      background: rgba(0, 0, 0, 0.5);
      p {
        color: white;
        vertical-align: middle;
        span {
          line-height: auto;
          vertical-align: middle;
        }
        img {
          margin-right: .2rem;
          vertical-align: middle;
          width: .5rem;
          height: .5rem;
          border-radius: .1rem;
        }
      }
    }
    .banner {
      height: 3.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
