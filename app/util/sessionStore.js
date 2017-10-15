const SessionStore = {
	getItem : function(key){
		let value
		try{
			value = sessionStorage.getItem(key)
		}catch(ex){
			if(__DEV__){
				console.error('sessionStorage.getItem方法报错，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}finally{
			return value
		}
	},
	setItem : function(key, value){
		try{
			sessionStorage.setItem(key,value)
		}catch(ex){
			if(__DEV__){
				console.error('sessionStorage.setItem方法报错，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}
	},
	removeItem : function(key){
		try{
			sessionStorage.removeItem(key)
		}catch(ex){
			if(__DEV__){
				console.error('sessionStorage.removeItem方法报错，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}
	},
	clear : function(){
		try{
			sessionStorage.clear()
		}catch(ex){
			if(__DEV__){
				console.error('sessionStorage.clear方法报错，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}
	}
}

export default SessionStore