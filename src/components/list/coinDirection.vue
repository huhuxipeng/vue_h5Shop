<template>
  <div id="helps">
    <mt-header flexd title="金币指南" class="shop" v-if="indexs==0">
      <mt-button icon="back" @click="backgo" slot="left"></mt-button>
    </mt-header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in contents">
          <p>{{(index+1)+':'+item.title}}</p>
          <p>{{item.content}}</p>
        </li>
        <!--<li>-->
        <!--<p>A:云积分怎么提现</p>-->
        <!--<p>B:打开提现页面，点击提现，选择提现方式，支付成功</p>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "helpintegra",
    data(){
      return{
        p:1,
        col:true,
        yellow:false,
        help:false,
        titles:[],
        contents:[],
        indexs:0,
      }
    },
    mounted(){
      if(this.$route.query.indexs){
        this.indexs=this.$route.query.indexs
      }

      this.$axios({
        method:'post',
        url:'/basics/anon/getHelpPage',
        responseType:'json',
        data:{
          pageNo:0,
          pageSize:0,
          helpTypeId:10
        }
      }).then(data=>{
        this.titles=data.data.res_data.typeList;
        this.contents=data.data.res_data.helpList
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      backgo(){
        this.$router.go(-1)
      },
      synthesis(val,index){
        this.p=index+1
        this.$axios({
          method:'post',
          url:'/basics/anon/getHelpPage',
          responseType:'json',
          data:{
            helpTypeId:val.helpTypeId,
            pageNo:0,
            pageSize:0,
          }
        }).then(data=>{
          this.contents=data.data.res_data.helpList
          console.log(data)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #helps{
    .shop {
      background: #fff;
      color: black;
      height: auto;
      font-size: .5rem;
      padding: 10px;
      display: flex;
    }
    .nav{
      border-bottom:1px solid #eee;
      background: white;
      width: 100%;
      ul{

        font-size: 0;
        display: flex;
        justify-content: flex-start;
        color: black;
        overflow: scroll;
        li{
          /*flex: 1;*/
          text-align: center;
          font-size: .4rem;
          margin-left: -2px;
          padding-bottom: 0;
          span{
            display: inline-block;
            width:3rem;
            padding-bottom:10px;
            letter-spacing: 2px;

          }
          .bor{
            border-bottom: 2px solid red;
          }
        }
      }
    }
    .content{
      padding: .2rem;
      font-size: .35rem;
      ul{
        li{
          line-height: .6rem;
          margin-bottom: .3rem;
        }
      }
    }

  }
</style>
