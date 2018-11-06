import $axios from 'axios'

var wxpay = function(token,order,paytype,reqtype) {
	$axios({
		method: 'post',
		url: '/pay/spellOrderPay',
		responseType: 'json',
		data: {
			token:token,
			orderId:order,
			payType:paytype,
			reqType: reqtype
		}
	}).then(data => {
		sessionStorage.paySuccess = data.data.res_code
		console.log(data.data.res_data);

		if(data.data.res_code == 0) {
			var datas = data.data.res_data;
			appId = datas.appid;
			nonceStr = datas.noncestr;
			paySign = datas.sign;
			packages = datas.package;
			timeStamp = datas.timestamp;
			signType = 'MD5';
			callpay();
			//								alert("appId"+":"+ appId+"paySign:"+ paySign+"timeStamp:" +timeStamp+"nonceStr:"+nonceStr+"nonceStr:"+nonceStr+"package:"+packages+"signType:"+signType)
			let that = this;

			function onBridgeReady() {

				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": appId, //公众号名称，由商户传入
						"paySign": paySign, //微信签名
						"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
						"nonceStr": nonceStr, //随机串
						"package": packages, //预支付交易会话标识
						"signType": signType //微信签名方式
					},
					function(res) {
						console.log('--微信支付进入，带上的orderId--');

						if(res.err_msg == "get_brand_wcpay_request:ok") {
              alert('支付成功')
              location.href = 'http://test.cheertea.com/?code=02152cFC0FlMIc2AHvFC09dhFC052cF2&state=#/group/mygroup'
						} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
							alert('支付取消');

						} else if(res.err_msg == "get_brand_wcpay_request:fail") {
							alert('支付失败');
							//												alert(res.err_msg)

						} //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
					}
				);
			}

			function callpay() {
				if(typeof WeixinJSBridge == "undefined") {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					}
				} else {
					onBridgeReady();
				}
			}
		} else {
			alert("统一下单失败");
		}

	}).catch(err => {
		console.log(err)
	})

}

export default wxpay
