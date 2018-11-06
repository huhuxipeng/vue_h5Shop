//银行卡
import bank from 'components/joinBank/bank'
import banklist from 'components/joinBank/banklist'
import joinbank from 'components/joinBank/joinbank'
import lastjoinbank from 'components/joinBank/lastjoinbank'
import bankcode from 'components/joinBank/bankcode'
import lastone from 'components/joinBank/lastone'



export default{
	path:'/bank',
	name:'bank',
	component:bank,
		children:[{
			path:'banklist',
			name:'banklist',
			component:banklist,
		},{
			path:'joinbank',
			name:'joinbank',
			component:joinbank,
		},{
			path:'lastjoinbank',
			name:'lastjoinbank',
			component:lastjoinbank,
		},{
			path:'bankcode',
			name:'bankcode',
			component:bankcode,
		},{
			path:'lastone',
			name:'lastone',
			component:lastone,
		}]
}
