import Axios from 'axios'
import router from '../router/index'
var httpss=function(token,orderId,payType,reqType,payPwd){
	Axios({
    	method:'post',
    	url:'/pay/giftOrderPay',
    	responseType: 'json',
		data:{
			token:token,
			orderId:orderId,
			payType:payType,
			reqType:reqType,
			payPwd:payPwd,
		}
    }).then(data=>{
    	if(data.status==200){
    		sessionStorage.paySuccess=data.data.res_code
    		sessionStorage.orderId=orderId
    		router.push('/lastOne')
			if(data.data.res_code==0){
				// sessionStorage.removeItem('cartIds')
				sessionStorage.removeItem('productId')
				sessionStorage.removeItem('placeadd')
				sessionStorage.removeItem('GIFTLIST')
//				sessionStorage.removeItem('orderId')
			}
    	}
    }).catch(err=>{
    	console.log(err)
    })
	}
export default httpss
