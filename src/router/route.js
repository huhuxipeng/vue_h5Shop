export default{
			path:'/bargain',
			name:'bargain',
      component: resolve => require(['components/bargain/bargain'],resolve),
			children:[{
				path:'bargainshop',
				name:'bargainshop',
        component: resolve => require(['components/bargain/bargainshop'],resolve)
			},{
				path:'bargainCont',
				name:'bargainCont',
        component: resolve => require(['components/bargain/bargainCont'],resolve)
			},{
				path:'bargainlist',
				name:'bargainlist',
        component: resolve => require(['components/bargain/bargainlist'],resolve)
			},{
				path:'bargainBlance',
				name:'bargainBlance',
        component: resolve => require(['components/bargain/bargainBlance'],resolve)
			},{
				path:'bargainContfree',
				name:'bargainContfree',
        component: resolve => require(['components/bargain/bargainContfree'],resolve)
			},]
}

