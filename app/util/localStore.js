const LocalStore = {
	getItem : function(key){
		let value
		try{
			value = localStorage.getItem(key)
		}catch(ex){
			//开发环境下-无痕浏览
			if(__DEV__){
				console.error('localStorage.getItem方法报错，阁下是否启动了无痕浏览模式？',ex.message)
			}
		}finally{
			return value
		}
	},
	setItem : function(key,value){
		try{
			localStorage.setItem(key,value)
		}catch(ex){
			if(__DEV__){
				console.error('localStorage.setItem方法报错，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}
	},
	removeItem : function(key){
		try{
			localStorage.removeItem(key)
		}catch(ex){
			if(__DEV__){
				console.error('localStorage.removeItem方法错误，阁下是否启动了无痕浏览模式？', ex.message)
			}
		}
	},
	clear : function(){
		try{
			localStorage.clear()
		}catch(ex){
			if(__DEV__){
				console.error('localStorage.clear方法报错，阁下是否启动了无痕浏览模式？',ex.message)
			}
		}
	}
}

export default LocalStore