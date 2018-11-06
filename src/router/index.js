import Vue from 'vue'
import Router from 'vue-router'
import route from './route.js'
import group from './group.js'
import seize from './seize.js'
import bank from './bank.js'
import coin from './coin.js'

//中奖详情
Vue.use(Router)


export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'threeIndex',
      component: resolve => require(['components/threeIndex'],resolve)
    },
    {
      path: '/openShopStore',
      name: 'openShopStore',
      component: resolve => require(['components/openShopStore'],resolve)
    },

    {
      path: '/specials',
      name: 'specials',
      component: resolve => require(['components/specials'],resolve)
    },
    {
      path:'/prizeDetail',
      name:'prizeDetail',
      component: resolve => require(['components/prizeDetail'],resolve)
    },
    {//
      path:'/flashSale',
      name:'flashSale',
      component: resolve => require(['components/flashSale'],resolve)
    },{//
      path:'/goldChanger',
      name:'goldChanger',
      component: resolve => require(['components/goldChanger'],resolve)
    },
    // {
    //   path: '/',
    //   name: 'SpecialIndex',
    //   component: SpecialIndex
    // },

    {
      path: '/searchShop',
      name: 'searchShop',
      component: resolve => require(['components/searchShop'],resolve)
    },
    {
      path: '/Recommend',
      name: 'Recommend',
      component: resolve => require(['components/Recommend'],resolve)
    },
    {
      path: '/bannerTest',
      name: 'BannerTest',
      component: resolve => require(['components/BannerTest'],resolve)
    },
    {
      path: '/integralWay',
      name: 'IntegralWay',
      component: resolve => require(['components/list/integralWay'],resolve)
    },
    {
      path: '/listDetail',
      name: 'ListDetail',
      component: resolve => require(['components/list/listDetail'],resolve)
    },
    {
      path: '/mobilecode',
      name: 'Mobilecode',
      component: resolve => require(['components/list/mobilecode'],resolve)
    },

    {
      path: '/enter',
      name: 'Enter',
      component: resolve => require(['components/enter/Enter'],resolve)
    },
    {
      path: '/percenter',
      name: 'Percenter',
      component: resolve => require(['components/Percenter'],resolve)
    },
    {
      path: '/myCoupon',
      name: 'myCoupon',
      component: resolve => require(['components/myCoupon'],resolve)
    },
    {
      path: '/mybinding',
      name: 'mybinding',
      component: resolve => require(['components/mybinding'],resolve)
    },
    {
      path: '/mydetails',
      name: 'mydetails',
      component: resolve => require(['components/mydetails'],resolve)
    },
    {
      path: '/poster',
      name: 'poster',
      component: resolve => require(['components/poster'],resolve)
    },
    {
      path: '/collarVoucher',
      name: 'collarVoucher',
      component: resolve => require(['components/collarVoucher'],resolve)
    },
    {
      path: '/perIndex',
      name: 'PerIndex',
      component: resolve => require(['components/Personage/perIndex'],resolve)
    },

    {
      path: '/midefier',
      name: 'Midefier',
      component: resolve => require(['components/Personage/midefier'],resolve),
      children: [
        {
          path: 'boundmobile',
          name: 'boundmobile',
          component: resolve => require(['components/Personage/boundmobile'],resolve)
        },
        //设置支付密码
        {
          path: 'setPassword',
          name: 'setPassword',
          component: resolve => require(['components/password/setPassword'],resolve)
        },
        {
          path: 'boundRawPassword',
          name: 'boundRawPassword',
          component: resolve => require(['components/Personage/boundRawPassword'],resolve)
        },
        {
          path: 'mobileRaw',
          name: 'mobileRaw',
          component: resolve => require(['components/Personage/mobileRaw'],resolve)
        },
        {
          path: 'revisionname',
          name: 'revisionname',
          component: resolve => require(['components/Personage/revisionname'],resolve)
        },
        {
          path: 'revisionmobile',
          name: 'revisionmobile',
          component: resolve => require(['components/Personage/revisionmobile'],resolve)
        },
        {
          path: 'revisionmobiles',
          name: 'revisionmobiles',
          component: resolve => require(['components/Personage/revisionmobiles'],resolve)
        },
      ]
    },
    {
      path: '/topup',
      name: 'Topup',
      component: resolve => require(['components/topup'],resolve)
    },
    {
      path: '/topupPotocol',
      name: 'TopupPotocol',
      component: resolve => require(['components/list/topupPotocol'],resolve)
    },
    {
      path: '/topSuccess',
      name: 'TopSuccess',
      component: resolve => require(['components/list/topSuccess'],resolve)
    },
    {
      path: '/detail',
      name: 'Detail',
      component: resolve => require(['components/list/detail'],resolve)
    },
    //维权
    {
      path: '/rightslist',
      name: 'rightslist',
      component: resolve => require(['components/rights/rightList'],resolve)
    },

    {
      path: '/shop_manager',
      name: 'ShopManager',
      component: resolve => require(['components/shop_manager'],resolve)
    },

    {
      path: '/howPercenter',
      name: 'howPercenter',
      component: resolve => require(['components/howPercenter'],resolve)
    },
    {
      path: '/procotol',
      name: 'Proco',
      component: resolve => require(['components/procotol'],resolve)
    },
    {
      path: '/mancenter',
      name: 'Mancenter',
      component: resolve => require(['components/mancenter'],resolve)
    },
    {
      path: "/client",
      name: 'Client',
      component: resolve => require(['components/list/client'],resolve)
    },
    {
      path: '/buy',
      name: 'Buy',
      component: resolve => require(['components/buy'],resolve)
    },
    {
      path: '/lastOne',
      name: 'LastOne',
      component: resolve => require(['components/lastOne'],resolve)
    },
    {
      path: '/last',
      name: 'Last',
      component: resolve => require(['components/last'],resolve)
    },
    {
      path: '/shopManagegift',
      name: 'shopManagegift',
      component: resolve => require(['components/shopManagegift'],resolve)
    },
    {
      path: '/shopManagegiftDetails',
      name: 'shopManagegiftDetail',
      component: resolve => require(['components/shopManagegiftDetail'],resolve)
    },
    {
      path: '/giftQuality',
      name: 'giftQuality',
      component: resolve => require(['components/giftQuality'],resolve)
    },
    {
      path: '/giftAssess',
      name: 'giftAssess',
      component: resolve => require(['components/giftAssess'],resolve)
    },
    {
      path: '/applySuccess',
      name: 'Apply',
      component: resolve => require(['components/applySuccess'],resolve)
    },
    {
      path: '/integral',
      name: 'Integral',
      component: resolve => require(['components/list/integral'],resolve)
    },
    {
      path: '/helpintegra',
      name: 'helpintegra',
      component: resolve => require(['components/list/helpintegra'],resolve)
    },
    {
      path: '/coinDirection',
      name: 'coinDirection',
      component: resolve => require(['components/list/coinDirection'],resolve)
    },
    // {
    //   path: '/serviceCenter',
    //   name: 'serviceCenter',
    //   component: serviceCenter
    // },
    {
      path: '/codeDetails',
      name: 'CodeDetail',
      component: resolve => require(['components/list/codeDetails'],resolve)
    },
    {
      path: '/way',
      name: 'Way',
      component: resolve => require(['components/list/way'],resolve)
    },
    {
      path: '/commodity',
      name: 'Commodity',
      component: resolve => require(['components/list/commodity'],resolve)
    },
    {
      path: '/collectshop',
      name: 'collectshop',
      component: resolve => require(['components/list/collectshop'],resolve)
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: resolve => require(['components/list/deposit'],resolve)
    },
    {
      path: '/depositsuccess',
      name: 'Depositsuccess',
      component: resolve => require(['components/list/depositsuccess'],resolve)
    },

    {
      path: '/myQrcode',
      name: 'MyQrcode',
      component: resolve => require(['components/list/myQrcode'],resolve)
    },
    {
      path: '/goods',
      name: 'goods',
      component: resolve => require(['components/goods'],resolve),
      children: [{
        path: '',
        redirect: 'category'
      },
        {
          path: 'category',
          name: 'goodsCategory',
          component: resolve => require(['components/goodsCategory'],resolve)
        },
        {
          path: 'list',
          name: 'goodsList',
          component: resolve => require(['components/goodsList'],resolve)
        },
        {
          path: 'detail',
          name: 'goodsDetail',
          component: resolve => require(['components/goodsDetail'],resolve)
        },
        {
          path: 'shopdetail',
          name: 'goodsShopDetail',
          component: resolve => require(['components/goodsShopDetail'],resolve)
        },
        {
          path: 'qualite',
          name: 'goodsQuality',
          component: resolve => require(['components/goodsQuality'],resolve)
        },
        {
          path: 'assess',
          name: 'goodsAssess',
          component: resolve => require(['components/goodsAssess'],resolve)
        },
        {
          path: 'store',
          name: 'goodsStore',
          component: resolve => require(['components/goodsStore'],resolve)
        },
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'memberLogin',
      component: resolve => require(['components/memberLogin'],resolve)
    },
    //注册
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['components/register'],resolve)
    },

    //找回密码
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: resolve => require(['components/password/forgetPassword'],resolve)
    },
    // 订单
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['components/order'],resolve),
      children: [{
        path: '',
        redirect: 'list'
      },
        {
          path: 'list',
          name: 'orderList',
          component: resolve => require(['components/orderList'],resolve)
        },
        {
          path: 'listYYY',
          name: 'orderListYYY',
          component: resolve => require(['components/orderListYYY'],resolve)
        },
        {
          path: 'detail',
          name: 'orderDetail',
          component: resolve => require(['components/orderDetail'],resolve)
        },
      ]
    },
    // 购物车
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: resolve => require(['components/shoppingCart'],resolve),
      children: [{
        path: '',
        redirect: 'list'
      },
        {
          path: 'list',
          name: 'shoppingCartList',
          component: resolve => require(['components/shoppingCartList'],resolve)
        },
        {
          path: 'modify',
          name: 'shoppingCartModify',
          component: resolve => require(['components/shoppingCartModify'],resolve)
        },
        {
          path: 'addSel',
          name: 'shoppingCartAddSel',
          component: resolve => require(['components/shoppingCartAddSel'],resolve)
        },
        {
          path: 'balance',
          name: 'shoppingCartBalance',
          component: resolve => require(['components/shoppingCartBalance'],resolve)
        },
        {
          path: 'shopbalance',
          name: 'shoppingShopCartBalance',
          component: resolve => require(['components/shoppingShopCartBalance'],resolve)
        }
      ]
    },
    // 支付成功
    {
      path: '/payState',
      name: 'commonPayState',
      component: resolve => require(['components/commonPayState'],resolve)
    },
    {
      path: '/address',
      name: 'Address',
      component: resolve => require(['components/address/address'],resolve),
      children: [{
        path: '',
        redirect: 'takeaddress'
      },
        {
          path: 'takeaddress',
          name: 'Takeaddress',
          component: resolve => require(['components/address/takeaddress'],resolve)
        },
        {
          path: 'newaddress',
          name: 'Newaddress',
          component: resolve => require(['components/address/newaddress'],resolve)
        }
      ]
    },
    {
      path: '/logistics',
      name: 'Logistics',
      component: resolve => require(['components/address/logistics'],resolve)
    },
    {
      path: "/memberCard",
      name: 'MemberCard',
      component: resolve => require(['components/memberCard'],resolve)
    },

    //1.1.0
    //  商家入驻
    {
      path: "/enterType",
      name: 'EnterType',
      component: resolve => require(['components/enter/enterType'],resolve)
    },
    {
      path: "/enter",
      name: 'enter',
      component: resolve => require(['components/enter/Enter'],resolve),
      children: [{
        path: "shopEnterOne",
        name: 'shopEnterOne',
        component: resolve => require(['components/enter/shopEnterOne'],resolve)
      },
        {
          path: "shopEnterTwo",
          name: 'shopEnterTwo',
          component: resolve => require(['components/enter/shopEnterTwo'],resolve)
        },
        {
          path: "shopEnterThree",
          name: 'shopEnterThree',
          component: resolve => require(['components/enter/shopEnterThree'],resolve)
        },

      ]
    },

    //申请维权
    {
      path: "/rightDetail",
      name: 'rightDetail',
      component: resolve => require(['components/rights/rightsDetail'],resolve)
    },
    {
      path: "/rightDetails",
      name: 'rightDetails',
      component: resolve => require(['components/rights/rightDetails'],resolve)
    },
    {
      path: "/writeLogistics",
      name: 'writeLogistics',
      component: resolve => require(['components/rights/writeLogistics'],resolve)
    },

    {
      path: "/rightOrder",
      name: 'rightOrder',
      component: resolve => require(['components/rights/rightOrder'],resolve)
    },
    {
      path: "/Appraise",
      name: 'Appraise',
      component: resolve => require(['components/appraise'],resolve)
    }, {
      path: "/myGold",
      name: 'MyGold',
      component: resolve => require(['components/myGold'],resolve)
    },
    {
      path: "/consult",
      name: 'consult',
      component: resolve => require(['components/chat/consult'],resolve)
    },
    //拼团支付
    {
      path: "/groupBlance",
      name: 'groupBlance',
      component: resolve => require(['components/group/groupBlance'],resolve)
    },
    //会员折扣
    {
      path: "/discount",
      name: 'discount',
      component: resolve => require(['components/list/discount'],resolve)
    },
    //用户协议
    {
      path: "/users",
      name: 'users',
      component: resolve => require(['components/Personage/users'],resolve)
    },
    //帮助中心
    {
      path: "/helpcenter",
      name: 'helpcenter',
      component: resolve => require(['components/Personage/helpcenter'],resolve)
    },
    //set
    {
      path: "/set",
      name: 'set',
      component: resolve => require(['components/Personage/set'],resolve)
    },
    {
      path: "/opinion",
      name: 'opinion',
      component: resolve => require(['components/chat/opinion'],resolve)
    },
    {
      path: "/abouts",
      name: 'abouts',
      component: resolve => require(['components/Personage/abouts'],resolve)
    },
    route,
    group,
    bank,
    seize,
    coin,
  ]
})



