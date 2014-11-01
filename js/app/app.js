var startApp = function() {
};


$(function() {
	$( ".slider" ).slider({
  		stop: function( event, ui ) {
  			console.log();
  			$.ajax({url:"http://megabox/switch.html?device=" + event.target.attributes.getNamedItem("device").value + "&cmd=" + event.target.value,success:function(result){
    			//$("#div1").html(result);
  			}});
  		}
	});


	setInterval(function() { Refresh(); }, 2000);
	Refresh();



	function Refresh() {
		$.ajax({url:"http://megabox/switch.html?cmd=status",success:function(result){
		var statuses = JSON.parse(result);
		$('select').each(function(device) { 
			if (statuses[$(this)[0].attributes.getNamedItem("device").value]) {
				$(this).val(statuses[$(this)[0].attributes.getNamedItem("device").value]);
				$(this).slider('refresh');
				$(this).slider({ disabled: false });
			} else {
				$(this).slider({ disabled: true });
			}
		});
  		}});
	}
});
