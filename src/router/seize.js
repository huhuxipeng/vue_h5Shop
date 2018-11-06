//夺宝团
import seize from 'components/seize/seize'
import seizeIndex from 'components/seize/seizeIndex'
import seizeDetail from 'components/seize/seizeDetail'

export default{
  path:'/seize',
  name:'seize',
  component: resolve => require(['components/seize/seize'],resolve),
  children:[{
    path: "seizeIndex",
    name: 'seizeIndex',
    component: resolve => require(['components/seize/seizeIndex'],resolve)
  },
    {
      path: "seizeDetail",
      name: 'seizeDetail',
      component: resolve => require(['components/seize/seizeDetail'],resolve)
    }]
}
