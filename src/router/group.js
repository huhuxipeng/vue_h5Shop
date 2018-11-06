//拼团
export default{
		path:'/group',
		name:'group',
    component: resolve => require(['components/group/group'],resolve),
		children:[{
			path: "groupBooking",
			name: 'groupBooking',
      component: resolve => require(['components/group/groupBooking'],resolve)
		},{
			path: "groupdetail",
			name: 'groupdetail',
      component: resolve => require(['components/group/groupdetail'],resolve)
		},{
			path: "grouptime",
			name: 'grouptime',
      component: resolve => require(['components/group/grouptime'],resolve)
		},{
			path: "grouptimes",
			name: 'grouptimes',
      component: resolve => require(['components/group/grouptimes'],resolve)
		},{
			path: "mygroup",
			name: 'mygroup',
      component: resolve => require(['components/group/mygroup'],resolve)
		},{
			path: "grouporderdetail",
			name: 'grouporderdetail',
      component: resolve => require(['components/group/grouporderdetail'],resolve)
		},]


}
