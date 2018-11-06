import $axios from 'axios'
var yyywxlogin=function(){
  var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  let token = sessionStorage.getItem("token")
  if (token == null){
    $axios({
      method: 'post',
      url: 'basics/anon/yyyLogin',
      responseType: 'json',
      data: {
        code: r[2]
      },
    }).then(data => {
      // alert("1")
      // if (data.data.res_data.member){
      localStorage.identityId = data.data.res_data.member.identityId
      localStorage.token = data.data.res_data.token
      // alert(data.data.res_data.token)
      localStorage.details = JSON.stringify(data.data.res_data.member)
      sessionStorage.token = localStorage.getItem('token');
      sessionStorage.details = localStorage.getItem('details');
      // }
    }).catch(err => {
      console.log(err)
    })
  }
}
export default yyywxlogin
