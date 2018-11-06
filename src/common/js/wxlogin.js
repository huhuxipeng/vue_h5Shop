import $axios from 'axios'
var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
let token = sessionStorage.getItem("token")
var wxlogin = function (path, obj, callback) {
  console.log('hhhhha')
  if (token == null) {
    if (r == null) {
      location.href = path;
    } else {
      $axios({
        method: 'post',
        url: '/basics/anon/appWxAuth',
        responseType: 'json',
        data: {
          code: r[2],
          reqType: 0
        },
      }).then(data => {
        if (data.data.res_data.member) {
          sessionStorage.details = JSON.stringify(data.data.res_data.member)
          sessionStorage.token = data.data.res_data.token
        } else {
          sessionStorage.details = JSON.stringify(data.data.res_data);
        }

        if (data.data.res_data.returnCode == 0) {
          obj.binding = true;
        }
        if (callback) {
          callback();
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
export default wxlogin
