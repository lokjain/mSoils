function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			var devversion=device.version;
			var osversion=device.platform;
			checkConnection();
			 navigator.splashscreen.hide(); 
		}
		function checkConnection() {
		 	var networkState = navigator.connection.type;
			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';
		    if (states[networkState]=="No network connection"){
			    alert(" No Network Connection mAgIDS will Exit Now!");

		    	if (navigator.app) {
		            navigator.app.exitApp();
		        }
		        else if (navigator.device) {
		            navigator.device.exitApp();
		        }
		    }
		}
		$(document).ready(function(){
			var lang="EN";
			var myWebHost="http://www.pau.edu/mobapps/mSoils/server/";
//			var myWebHost="http://localhost/mSoils/server/";
			function mPage(eleid){
				$.mobile.changePage($(eleid), {
					  allowSamePageTransition : true,
					  transition : 'none',
					  showLoadMsg : true,
					  reloadPage : true
					 });
			}	
			myInit();
			function loadMyPagePost(lclstrid,data,elementid,lclstrname){
				var d = new Date();
				var n = d.getFullYear();
				var myfooter='http://www.pau.edu  All rights reserved.';
//				+'. All rights reserved.<a id=mAbt href=# data-role=button data-help=abtpage class=ui-btn-right data-icon=info>About</a>';
				$('div[data-role="footer"]').html(myfooter);
				$('div[data-role="footer"]').trigger('create');
				$(elementid).html("");
				$(elementid).trigger('create');
					$(elementid).html(data);
					$(elementid).trigger('create');
					$(elementid).on('load',function(){		
						$.mobile.loading( 'hide');
					});
					myInit();
			}
			function isDate (x) { 
				  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
			}
			function loadMyPage(lclstrid,url,elementid,lclstrname){
				var d = new Date();
				var n = d.getFullYear();
				var myfooter='http://www.pau.edu  All rights reserved.';

//				+'. All rights reserved.<a id=mAbt href=# data-role=button data-help=abtpage class=ui-btn-right data-icon=info>About</a>';
				$('div[data-role="footer"]').html(myfooter);
				$('div[data-role="footer"]').trigger('create');
				$(elementid).html("");
				$(elementid).trigger('create');
				$.get(url+lclstrid, function(data) {
					$(elementid).html(data);
					$(elementid).trigger('create');
					$(elementid).on('load',function(){		
						$.mobile.loading( 'hide');
					});
					myInit();
				});
			}

			function scriptHelp(lnk,lng){
				if (lng==null){lng="EN";}
				urll=myWebHost+'help/'+lnk+'.html';
		//		alert(urll);
				$("#div_help").load(urll);
				$.get(urll, function(data) {
				//	alert(data);
					$('#div_help').html(data);
					$('#div_help').trigger('create');
				});
				mPage('#pagehelp');
			}

			$(document).on('pagebeforeshow','#transid', function(){
				myLocalLang=window.localStorage["myLangs"];
				ag_process_name=window.localStorage["ag_process_sel"];
				componentID=window.localStorage["Component"];
				resourceID=window.localStorage["resourceID"];
				tid=window.localStorage["tid"];
				myBlockID=window.localStorage["myBlockID"];
				mypaging();
			});
			function mypaging(){
					var othParameter="&tid="+tid+"&ag_pr_id="+ag_process_name+"&ag_pr_comp_id="+componentID;
					var urltid=myWebHost+'jsp/tid_analysis.jsp?language='+myLocalLang+othParameter;
					loadMyPage('',urltid,'#div_tcid',"");
			}
			function myInit(){
					$.fn.stars = function() {
						return $(this).each(function() {
						$(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
						});
			}

			$('select').on("change",function(){
											 
				$.mobile.loading( 'show', {
					  text: "Loading.....",
					  theme: "a", 
					  textonly: true 
					  });	
				var mySel =$(this).attr("ID");
				var mySelTxt=$(this).val();
				switch (true){
				case (mySel==="lang"):
					lng=mySelTxt;
					lang=lng
					loadMyPage('',myWebHost+'crop.php?language='+lng,'#NT11',"");
					mPage('#NT');
					break;
				case (mySel==="TOOL"):
					if(mySelTxt=='GS'){	
						loadMyPage('',myWebHost+'gspag1.php?language='+lng,'#GPAGEXB1',"");
						mPage('#GPAGEX1');
					}
					if(mySelTxt=='LCC'){	
						loadMyPage('',myWebHost+'lccpag1.php?language='+lng,'#LPAGEXB1',"")
						mPage('#LPAGEX1');
					}
					break;
				default:
					break;
				}
				$.mobile.loading( 'hide');	
			});
//			$('#team').load(myWebHost+'abt.php?language='+lang);
			$("a").unbind().click(function() {
				//Stuff
				});
			$("a").on("click",function(){
				$.mobile.loading( 'show', {
					  text: "Loading Page.....",
					  theme: "a", 
					  textonly: true 
				});	
				var myID = $(this).attr("id");
				switch (true) {
					case (myID==="mHelp"):
						hlp=$(this).attr("data-help");
						scriptHelp(hlp,myLocalLang);				
						break;
					case (myID==="mAbt"):
						loadMyPage('',myWebHost+'abt.php?language='+lng,'#ABOUTB1',"");
						mPage('#ABOUT1');
						break;
					case (myID==="EN" || myID==="HN" || myID==="PB"):
						lng=myID;
						loadMyPage('',myWebHost+'crop.php?language='+lng,'#NT11',"");
						mPage('#NT');
						break;
					case (myID==="CR"):
						$.post(myWebHost+'main.php',$('#cropform').serialize(),function(data){
							loadMyPagePost('',data,'#CROPSB',"")
						});
						mPage('#CROPS');
						break;
					case (myID==="GS"):
						loadMyPage('',myWebHost+'gspag1.php?language='+lng,'#GPAGEXB1',"");
						mPage('#GPAGEX1');
						break;
					case (myID==="GSP2"):
						var Gchkbox=$('#GSchkbox').is(':checked');
						if(Gchkbox===true){
							loadMyPage('',myWebHost+'gspag2.php?language='+lng,'#GPAGEXB2',"");
							mPage('#GPAGEX2');
						} else {						
							if(lng=='PB'){ alert('ਸਾਵਧਾਨੀਆਂ ਨੂੰ ਮੰਨਣ ਲਈ ਟਿੱਕ ਲਗਾ ਕੇ ਸਹਿਮਤੀ ਦਿਓ। ');	}
							if(lng=='EN'){ alert('Please read and agree to the precautions');}
							if(lng=='HN'){ alert('सावधानी बरतने के लिए टिक लगा कर पुष्टि करें। ');}
							event.preventDefault();						
					 	    $.mobile.loading('hide');
							mPage('#GPAGEX1');
						}
						break;
					case (myID==="GSF2"):
						var Gchkbox2=$('#GSchkbox2').is(':checked');
						if(Gchkbox2===true){
							loadMyPage('',myWebHost+'gs.php?language='+lng,'#GSB1',"")
								mPage('#GS1');
							    var dtToday = new Date();
    
								var month = dtToday.getMonth() + 1;
								var day = dtToday.getDate();
								var year = dtToday.getFullYear();
								if(month < 10)
									month = '0' + month.toString();
								if(day < 10)
									day = '0' + day.toString();
								
								var maxDate = year + '-' + month + '-' + day;
//								alert(maxDate);
								$('#DAS').attr('max', maxDate);


						} else {						
							if(lng=='PB'){alert('ਉਪਰੋਕਤ ਸਿਫ਼ਾਰਸ਼ਾਂ ਨੂੰ ਮੰਨਣ ਲਈ ਟਿੱਕ ਲਗਾ ਕੇ ਸਹਿਮਤੀ ਦਿਓ। ');	}
							if(lng=='EN'){alert('Please read and agree before you proceed');}
							if(lng=='HN'){alert('सिफारिशों को स्वीकार करने के लिए टिक करें। ');}
							event.preventDefault();						
					 	    $.mobile.loading('hide');
							mPage('#GPAGEX2');
						}
						break;
					case (myID==="GSF"):
						var DAS=$('#gsdata #DAS').val();
						var mydate = new Date(DAS);
						var TP1=$('#gsdata #TP1').val();
						var TP2=$('#gsdata #TP2').val();
						var TP3=$('#gsdata #TP3').val();
						var RP1=$('#gsdata #RP1').val();
						var RP2=$('#gsdata #RP2').val();
						var RP3=$('#gsdata #RP3').val();
						if(TP1=='' || TP2=='' || TP3=='' || RP1=='' || RP2=='' || RP3==''){
							if(lng=='EN'){ alert('Please feed GreenSeeker readings');}
							if(lng=='PB'){ alert('ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੀਆਂ ਗਰੀਨਸੀਕਰ ਰੀਡਿੰਗਾਂ ਭਰੋ। ');}
							if(lng=='HN'){ alert('कृपया सभी गरीनसीकर रीडिंग्स को भरें।');}
						} else {
							var tt='';
							if(TP1<0 || TP1>1){
								if(lng=='EN'){
									tt=tt+'Field reading 1, ';
								}
								if(lng=='HN'){
									tt=tt+'Field reading 1, ';
								}
								if(lng=='PB'){
									tt=tt+'ਗਰੀਨਸੀਕਰ ਰੀਡਿੰਗ 1, ';
								}
							}
							if(TP2<0 || TP2>1){
								if(lng=='EN'){
									tt=tt+'Field reading 2, ';
								}
								if(lng=='HN'){
									tt=tt+'Field reading 2, ';
								}
								if(lng=='PB'){
									tt=tt+'ਗਰੀਨਸੀਕਰ ਰੀਡਿੰਗ 2, ';
								}
							}
							if(TP3<0 || TP3>1){
								if(lng=='EN'){
									tt=tt+'Field reading 3, ';
								}
								if(lng=='HN'){
									tt=tt+'Field reading 3, ';
								}
								if(lng=='PB'){
									tt=tt+'ਗਰੀਨਸੀਕਰ ਰੀਡਿੰਗ 3, ';
								}
							}
							if(RP1<0 || RP1>1){
								if(lng=='EN'){
									tt=tt+'OF reading 1, ';
								}
								if(lng=='HN'){
									tt=tt+'OF reading 1, ';
								}
								if(lng=='PB'){
									tt=tt+'OF ਰੀਡਿੰਗ 1, ';
								}
							}
							if(RP2<0 || RP2>1){
								if(lng=='EN'){
									tt=tt+'OF reading 2, ';
								}
								if(lng=='HN'){
									tt=tt+'OF reading 2, ';
								}
								if(lng=='PB'){
									tt=tt+'OF ਰੀਡਿੰਗ 2, ';
								}
							}
							if(RP3<0 || RP3>1){
								if(lng=='EN'){
									tt=tt+'OF reading 3, ';
								}
								if(lng=='HN'){
									tt=tt+'OF reading 3, ';
								}
								if(lng=='PB'){
									tt=tt+'OF ਰੀਡਿੰਗ 3, ';
								}
							}
							if(tt){
								tt=tt.substr(0,tt.length-2);
							if(lng=='EN'){alert('Feed correct readings. All the readings should be between 0 and 1.');}
							if(lng=='PB'){alert('ਠੀਕ ਰੀਡਿੰਗ ਭਰੋ। ਰੀਡਿੰਗ 0 ਅਤੇ 1 ਦੇ ਵਿਚਕਾਰ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।');}
							if(lng=='HN'){alert('सही रीडिंग भरें। रीडिंग 0 और 1 के बीच होनी चाहिए।');}
							} else {
								if(isDate(mydate)){	
									$.post(myWebHost+'gsres.php',$('#gsdata').serialize(),function(data){
										loadMyPagePost('',data,'#GSRB1',"")
									});
									mPage('#GSR1');
								} else {
									if(lng=='PB'){alert('ਬਿਜਾਈ ਦੀ ਮਿਤੀ ਲਿਖੋ ਜੀ।');} 
									if(lng=='EN'){alert('Please enter date of sowing');}
									if(lng=='HN'){alert('बुआई की तारीख भरें');}
								}
							}
						}
						break;
					case (myID==="LCC"):
						loadMyPage('',myWebHost+'lccpag1.php?language='+lng,'#LPAGEXB1',"")
						mPage('#LPAGEX1');
						break;
					case (myID==="LCC1"):
						var Gchkbox=$('#LCCchkbox').is(':checked');
						if(Gchkbox===true){
							loadMyPage('',myWebHost+'lccpag2.php?language='+lng,'#LPAGEXB2',"");
							mPage('#LPAGEX2');
						} else {	
							if(lng=='PB'){ alert('ਸਾਵਧਾਨੀਆਂ ਨੂੰ ਮੰਨਣ ਲਈ ਟਿੱਕ ਲਗਾ ਕੇ ਸਹਿਮਤੀ ਦਿਓ।');	}
							if(lng=='EN'){ alert('Please read and agree to the precautions');}
							if(lng=='HN'){ alert('सावधानी बरतने के लिए टिक लगा कर पुष्टि करें।');}
							event.preventDefault();						
					 	    $.mobile.loading('hide');
							mPage('#LPAGEX1');
						}
						break;
					case (myID==="LCC2"):
						var Gchkbox=$('#LCCchkbox2').is(':checked');
						if(Gchkbox===true){
							loadMyPage('',myWebHost+'lcc.php?language='+lng,'#LCCB1',"")
								mPage('#LCC1');
						} else {						
							if(lng=='PB'){alert('ਉਪਰੋਕਤ ਸਿਫ਼ਾਰਸ਼ਾਂ ਨੂੰ ਮੰਨਣ ਲਈ ਟਿੱਕ ਲਗਾ ਕੇ ਸਹਿਮਤੀ ਦਿਓ।');	}
							if(lng=='EN'){alert('Please read and agree before you proceed');}
							if(lng=='HN'){alert('सिफारिशों को स्वीकार करने के लिए टिक करें।');}
							
							event.preventDefault();						
					 	    $.mobile.loading('hide');
							mPage('#LPAGEX2');
						}
						break;
					case (myID==="LCCR"):
						var lcc0=Number($('#lcc0').val());
						var lcc1=Number($('#lcc1').val());
						var lcc2=Number($('#lcc2').val());
						var lcc3=Number($('#lcc3').val());
						var lcc4=Number($('#lcc4').val());
						var lcc5=Number($('#lcc5').val());
						var lcc6=Number($('#lcc6').val());
						var lcc7=Number($('#lcc7').val());
						var lcc8=Number($('#lcc8').val());
						var lcc9=Number($('#lcc9').val());
						var lcc10=Number($('#lcc10').val());
						var lcc=0;
						lcc=lcc0+lcc1+lcc2+lcc3+lcc4+lcc5+lcc6+lcc7+lcc8+lcc9+lcc10;
						var DAS1=$('#DASLCC').val();
						var mydate = new Date(DAS1);
//						alert('HEllo   '+mydate);
						if(isDate(mydate)){
							if (lcc<10){
								if (lcc==0){ 
									if(lng=='PB'){ var k='ਘੱਟੋ ਘੱਟ 10 ਪੱਤਿਆਂ ਦੀ ਰੀਡਿੰਗ ਲਓ ਜੀ। ';	}
									if(lng=='EN'){ var k='Please feed data for at least 10 leaves.';}
									if(lng=='HN'){ var k='कम से कम 10 पत्तियां की रीडिंग लें।';}
									
									 
								} else {
									if(lng=='PB'){ var k='ਘੱਟੋ ਘੱਟ 10 ਪੱਤਿਆਂ ਦੀ ਰੀਡਿੰਗ ਲਓ ਜੀ। ਤੁਸੀਂ ਸਿਰਫ '+ lcc +' ਪੱਤਿਆਂ ਦੀ ਰੀਡਿੰਗ ਪ੍ਰਦਾਨ ਕੀਤੀ ਹੈ।';	}
									if(lng=='EN'){ var k='You have provided data for only '+lcc+' leaves. Please feed data for at least 10 leaves.';}
									if(lng=='HN'){ var k='कम से कम 10 पत्तों की रीडिंग लें। आपने केवल '+ lcc +' पत्तों की रीडिंग प्रदान की है।';}
									}
								alert(k);
								
							} else{
								$.post(myWebHost+'lccr.php',$('#lccdata').serialize(),function(data){
									loadMyPagePost('',data,'#LCRB1',"")
								});
								mPage('#LCR1');
							}
						} else{
									if(lng=='PB'){alert('ਬਿਜਾਈ ਦੀ ਮਿਤੀ ਲਿਖੋ ਜੀ।');} 
									if(lng=='EN'){alert('Please enter date of sowing');}
									if(lng=='HN'){alert('बुआई की तारीख भरें');}
						}
						break;
					default:
						break;
					}
				$.mobile.loading('hide');	
			});
		}
	});
