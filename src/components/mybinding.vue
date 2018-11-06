<template>
	<div class="binding" id="binding">
    <p class="tit">请输入正确的优惠码</p>
    <input class="codeInput" type="text" v-model="code" placeholder="优惠码">
    <p class="receive" @click="receiveFun">立即领取</p>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      code: ''
    };
  },
  mounted: function() {
    this.token = sessionStorage.getItem("token");
    this.cpnId = this.$route.query.cpnId;
    console.log(this.$route.query)//获取参数
  },
  methods: {
    receiveFun(){
      this.$axios({
        method: 'post',
        url: 'coupon/underGetCoupon',
        responseType: 'json',
        data: {
          sn: this.code,
          token: this.token
        }
      }).then(res => {
        console.log('数据',res)
        if(res.data.res_code==0){
          Toast({
            message: res.data.res_info,
            iconClass: 'mint-toast-icon mintui mintui-success'
          });
        }else{
          Toast({
            message: res.data.res_info,
            iconClass: 'mintui'
          });
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
div,input{
  box-sizing: border-box;
}
.binding{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: .373333rem .32rem;
  background-color: #fff;
  .tit{
    margin-bottom: .266667rem;
    font-size: .373333rem;
    color: #9b9b9b;
  }
  .codeInput{
    width: 9.36rem;
    height: .8rem;
    padding: 0 .373333rem;
    background: rgba(0,0,0, 0.05);
    line-height: .8rem;
    border-radius: .4rem;
    color: #999;
    font-size: .373333rem;
  }
  .receive{
    width: 9.36rem;
    height: 1.253333rem;
    margin-top: 1.333333rem;
    background: #F23814;
    border-radius: .626667rem;
    font-size: .48rem;
    color: #fff;
    text-align: center;
    line-height: 1.253333rem;
  }
}


</style>
