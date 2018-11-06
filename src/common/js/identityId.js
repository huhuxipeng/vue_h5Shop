import $axios from 'axios'
import router from '../../router'



const identyPath=function(){
  $axios({
    method: "post",
    url: '/member/seletConsumptionSituation',
    responseType: 'json',
    data: {
      token: sessionStorage.token
    }
  }).then(data => {
    console.log(data)
    // sessionStorage.memberId = this.defaul.memberId
    switch (data.data.res_code) {
      //有手机号，消费满200
      case 1:
        router.push('/lastOne');
        break;
      //有手机号，消费不满200
      case 0:
        router.push('/mancenter')
        break;
      //没有手机号，消费不满200
      case 2:
        router.push('/shop_manager')
        break;
      //没有手机号，消费满200
      case 3:
        sessionStorage.res_code = 3
        router.push('/shop_manager')
        break;

      //有手机,充值不满200
      case 4:
        router.push('/mancenter')
        break;
      //有手机,充值满200
      case 5:
        router.push('/lastOne')
        break;
      //没有手机号，充值不满200
      case 6:
        router.push('/shop_manager')
        break;
      //没有手机号，充值满200
      case 7:
        sessionStorage.res_code = 7
        router.push('/shop_manager')
        break;
      //该会员已经购买店长礼包
      case 8:
        router.push('/lastOne')
        break;
    }
  }).catch(err => {
    console.log(err)
  });
}
export default identyPath;

