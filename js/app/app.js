var startApp = function() {
};


$(function() {
	$( ".slider" ).slider({
  		stop: function( event, ui ) {
  			console.log(event.target.value);
  			$.ajax({url:"http://megabox/switch.html?state=" + event.target.value,success:function(result){
    			//$("#div1").html(result);
  			}});
  		}
	});
});
