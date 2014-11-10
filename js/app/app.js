var startApp = function() {
};


$(function() {

	var socket = new WebSocket("ws://megabox:3000");
	socket.onmessage = function(msg){
		var data=JSON.parse(msg.data);
		if (data.hosts) {
			var hosts=[];
			for (var i=0; i<data.hosts.length; i++) { 
				hosts[data.hosts[i].name]=data.hosts[i];
			}
			$('select').each(function(device) { 
				var devicename=$(this)[0].attributes.getNamedItem("device").value;
				if (hosts[devicename]) {
					if (hosts[devicename].state == true) {
						$(this).val('on');
					} else {
						$(this).val('off');	
					}
					$(this).slider('refresh');
					$(this).slider({ disabled: false });
				} else {
					$(this).slider({ disabled: true });
				}
			})
		}
	}
	socket.onopen = function(){
   		socket.send('discover');
	} 

	$( ".slider" ).slider({
  		stop: function( event, ui ) {
  			var socketSwitch = new WebSocket("ws://megabox:3000");
			socketSwitch.onopen = function(){
   				socketSwitch.send(event.target.attributes.getNamedItem("device").value + ":" + event.target.value);
  			} 	
		}
	});

	$("#quit").click(function() { 
        navigator.notification.confirm(
            'Do you really want to exit?',  // message
            exitFromApp,              // callback to invoke with index of button pressed
            'Exit',            // title
            'Cancel,OK'         // buttonLabels
        );
    } );
 
    
    function exitFromApp(buttonIndex) {
      if (buttonIndex==2){
       navigator.app.exitApp();
    	}
    };


});
