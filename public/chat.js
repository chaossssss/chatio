window.onload = function(){
	var socket = io.connect();//建立连接
	socket.on('connect',function(){//监听connect事件
		// var username = prompt("111");
		// alert(username);测试用户名传输问题
		socket.emit('join',prompt('请输入你的用户名'));

		//显示聊天窗口
	document.getElementById('chat').style.display = 'block';
	socket.on('announcement',function(msg){
		var li = document.createElement('li');
		li.className = 'announcement';
		li.innerHTML = msg;
		document.getElementById('message').appendChild(li);
		});
	});

	function addMessage(from,text){
		var li = document.createElement('li');
		var signal = document.createElement('span');
		li.className = 'message';
		signal.className = 'confirmed';
		li.innerHTML = '<b>' + from + ':</b>' + text ;
		document.getElementById('message').appendChild(li).appendChild(signal);
		// document.getElementById('message').appendChild(signal);
		// return li;
	}


	var input = document.getElementById('input');
	document.getElementById('form').onsubmit = function(){

		var li = addMessage('我',input.value);
		socket.emit('text',input.value
		// 	,function(){
		// 	li.className = 'confirmed';
		// 	li.title = date;
		// }
		);
		socket.value = '';
		input.focus();
		input.value = '';
		return false;
	}
	socket.on('text', addMessage);
}