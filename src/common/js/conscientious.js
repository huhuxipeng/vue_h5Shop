import axios from 'axios'

var conscientious = function() {
	var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	let token = sessionStorage.getItem("token")

	if(token == null) {
		if(r == null) {
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb4868f50223328db&redirect_uri=https%3a%2f%2fwx.cheertea.com%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect';
		} else {
			axios({
				method: 'post',
				url: '/basics/wxLogin',
				responseType: 'json',
				data: {
					code: r[2],
					reqType: 0
				},
			}).then(data => {
				localStorage.identityId = data.data.res_data.member.identityId
				localStorage.token = data.data.res_data.token
				localStorage.details = JSON.stringify(data.data.res_data.member)
				sessionStorage.token = localStorage.getItem('token');
				sessionStorage.details = localStorage.getItem('details');
				this.$router.push('/')
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
export default conscientious
