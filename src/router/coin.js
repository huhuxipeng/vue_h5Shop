//金币兑换商场
export default{
  path:'/coin',
  name:'coin',
  component: resolve => require(['components/coin/coin'],resolve),
  children:[{
    path: "coinIndex",
    name: 'coinIndex',
    component: resolve => require(['components/coin/coinIndex'],resolve)
  },{
    path: "coinDetail",
    name: 'coinDetail',
    component: resolve => require(['components/coin/coinDetail'],resolve)
  }]
}
