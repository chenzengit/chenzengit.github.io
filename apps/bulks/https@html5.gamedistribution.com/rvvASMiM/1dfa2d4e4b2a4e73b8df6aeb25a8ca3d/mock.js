console.log("window.XHRMock >: ",window.XHRMock);XHRMock.setup();XHRMock.get("../../../https@cpgc.phonecoolgame.com/material/getMaterials@appid=wxe57bfaaa884daed6",function(e,a){return a.status(200).body(JSON.stringify({ecode:0,data:{},sharePoints:{}}))});XHRMock.get("https://cpgc.phonecoolgame.com/adc/getBannerAdInfo?appid=wxe57bfaaa884daed6&ptform=2",function(e,a){return a.status(200).body(JSON.stringify({justgdt:1,bannerAdType:0,bannerAdInfo:[]}))});XHRMock.get("https:../../../https@cpgc.phonecoolgame.com/adc/getAdexpInfo@appid=wxe57bfaaa884daed6&ptform=2",function(e,a){return a.status(200).body(JSON.stringify({}))});XHRMock.get("https://cpgc.phonecoolgame.com/adc/getAd4Reborn?appid=wxe57bfaaa884daed6&ptform=2",function(e,a){return a.status(200).body(JSON.stringify({}))});XHRMock.get("https:../../../https@cpgc.phonecoolgame.com/adc/getMoreInfo@appid=wxe57bfaaa884daed6&ptform=2",function(e,a){return a.status(200).body(JSON.stringify({forward:1}))});XHRMock.post("../../../https@qmljf.phonecoolgame.com/server/protocol@sessionId=undefined",(e,a)=>{console.log("mock /server/protocol >: ",e,e.body());var t=JSON.parse(e.body());var s;switch(t.className){case"ReqWxAccount":{s=JSON.stringify({code:1,rspList:[{className:"RspWxAccount",openId:"oenuZ5VSRxaXpEKxdA_loWvnxv9I",seskey:"QcReQp+9kLVnZAX0jUtQBA=="}]});break}case"ReqWxAccount":{s=JSON.stringify({code:1,rspList:[{className:"RspLoginAccount",resultMsg:"success",tokenId:"75a604827c914ed58035898d4669254aHEN",userId:14569541},{auto:false,className:"RspNews"}]});break}case"ReqLoginAccount":{s=JSON.stringify({code:1,rspList:[{className:"RspLoginAccount",resultMsg:"success",tokenId:"75a604827c914ed58035898d4669254aHEN",userId:14569541},{auto:false,className:"RspNews"}]});break}}return a.status(200).body(s)});XHRMock.post("../../../https@qmljf.phonecoolgame.com/server/protocol@sessionId=75a604827c914ed58035898d4669254aHEN",(e,a)=>{var t=JSON.parse(e.body());var s=t.className;if(s!=="ReqHeart"){console.log("../../../https@qmljf.phonecoolgame.com/server/protocol@sessionId=75a604827c914ed58035898d4669254aHEN >: ",t)}var r;switch(s){case"ReqLoginGame":var o=parseInt(localStorage.getItem("coin")||"0");var i=parseInt(localStorage.getItem("gold")||"0");var n=1;var l=localStorage.getItem("pre-free-zhuanpan-time");if(l&&new Date(parseInt(l)).getDate()===(new Date).getDate()){n=0}var m=parseInt(localStorage.getItem("tv-zhuanpan-times")||"8");l=localStorage.getItem("pre-tv-zhuanpan-time");if(l&&new Date(parseInt(l)).getDate()!==(new Date).getDate()){m=8;localStorage.setItem("tv-zhuanpan-times",m)}var c=parseInt(localStorage.getItem("share-zhuanpan-times")||"8");l=localStorage.getItem("pre-share-zhuanpan-time");if(l&&new Date(parseInt(l))!==(new Date).getDate()){c=8;localStorage.setItem("share-zhuanpan-times",c)}var d=parseInt(localStorage.getItem("kaijubianda-times-today")||"4");var l=parseInt(localStorage.getItem("pre-use-kaijubianda-time")||"0");if(new Date(l).getDate()!==(new Date).getDate()){d=4}localStorage.setItem("kaijubianda-times-today",d);localStorage.setItem("pre-use-kaijubianda-time",Date.now());var p=true;var g=localStorage.getItem("pre-supply-time");if(g&&new Date(parseInt(g)).getDate()===(new Date).getDate()){p=false}var u=parseInt(localStorage.getItem("medal")||"0");{r=JSON.stringify({code:1,rspList:[{className:"RspLoginGame",resultMsg:"success",serverTime:1544844098502},{adPrizeTimes:333333,bannerTime:2,billDoubleTimes:0,className:"RspRoleInfo",coin:o,effectId:310001,eggFoodSign:0,gjEggTimes:0,gold:i,isAgshapon:true,isCanBillDoubleTv:true,isFirstLoginToday:false,isJcyx:true,isMoreGame:false,isOnlineCDReduce:false,isOpenCC:0,isQmrw:false,isShopGuide:true,isSupply:p,itemBag:[],largerTimes:d<0?0:d,maxScore:0,medal:u,name:"ç©å®¶14569541",onlinePrizeTime:0,ownSkins:[],ptEggTimes:0,resultShareCd:0,sccapTimes:3,scoreLv:1,shareLifeCd:5,simulateShareFg:"1#2000#4000",skinId:300001,speedLv:1,taskDoubleTimes:0,tryReliveFlag:true,turnFreeTimes:n,turnTvTimes:m,turnshareTimes:c,userId:14569541,versFlag:10,zp_flag:false},{className:"RspSevenDayList",drawList:[true,false,false,false,false,false,false],times:2}]});break}case"ReqShare":{r=JSON.stringify({code:1,rspList:[{className:"RspShareHeadList",list:[],type:1}]});break}case"ReqShop":{var h=t.page;var I;switch(h){case 2:{I={code:1,rspList:[{className:"RspShopList",page:2,shops:[{id:100003,status:0},{id:100002,status:0},{id:100001,status:0}]}]};break}case 3:{I={code:1,rspList:[{className:"RspShopList",page:3,shops:[{id:300002,status:0},{id:300001,status:1},{id:300011,status:0},{id:300010,status:0},{id:300013,status:0},{id:300012,status:0},{id:300007,status:0},{id:300008,status:0},{id:300009,status:0},{id:300003,status:0},{id:300004,status:0},{id:300005,status:0},{id:300006,status:0}]}]};break}case 4:{I={code:1,rspList:[{className:"RspShopList",page:4,shops:[{id:310012,status:0},{id:310011,status:0},{id:310010,status:0},{id:310008,status:0},{id:310009,status:0},{id:310006,status:0},{id:310007,status:0},{id:310004,status:0},{id:310005,status:0},{id:310002,status:0},{id:310003,status:0},{id:310001,status:1},{id:310013,status:0}]}]};break}}r=JSON.stringify(I);break}case"ReqFight":{if(t.opType===2){var i=parseInt(localStorage.getItem("gold")||"0");i-=10;localStorage.setItem("gold",i);r=JSON.stringify({code:1,rspList:[{className:"RspBagItem",item:{amount:i,id:2,type:1},way:6103},{className:"RspRelive",code:1e3}]});break}var f=["Trần Đức Lương","Nông Đức Mạnh","Phan Văn Khải"," Võ Nguyên Giáp"," Nguyễn Phú Trọng","Nguyễn Tấn Dũng","Nguyễn Minh Triết"," Trần Dũng Khải","Phan minh","Khải"," Lương dung","ÇAĞLA f Turkish"," ÇAĞRİ f Turkish","GÜL f Turkish","GÜLBAHAR f Turkish","HÜLYA f Turkish"," ÖZGE f Turkish"," UĞUR m Turkish","ÜLKÜ f Turkish","ÜMİT m Turkish","NİLÜFER f Turkish","Inés Pérez Castro","Eugênia Câmara","Letícia","José Basilio da Gam","Márcia","José Américo de Almeida","Luís Filipe de Menezes Lopes","Cristóvão Lopes","Leilah Assunção","Elma Yeates"," Daphne Ted","Carl Saxton","Natalie Carey"," Kerwin Black","Vivian Joyce"," Viola Robin"," Tracy Harte"," Orville Daisy","Ronald Wolf","Mark Cissie","Kennedy Hazlitt"," Donna Tennyson","Odelia Tate"," Jay Lindsay"," Jim I.Ida Morse","Conrad Pearson","Bart Ernest","Tabitha Hutt"," Alice McCarthy","Ernest Woolley"," Edwiin Ferguson"," Alberta Chapman"," Winni Adams","George Adela","Luther Benson","Cash Spender","Claude Curme","Poppy Dierser","Antonio Frances","JuliaFelix","MiloClarissa","AllenAnderson","ηκηβ"," κηκλη"," ζβκμζθξ","τΒΓχω"," Саша"," Шура","Толя"," Аркаша"," Боря"," Вава"," Дима"," Валя","じゅんやすひろ","ふたばやまみか"," いちざわひろし","こしごうかつひこ"," ほりすぎかおり"," たけちとしこ","ぬまのいともこ","かいだごういち","みぞぐちなるみ","できやまゆい"," こうたかきくえ","あさもとすみこ","김지혜"," 박지선"," 유은정"," 최효경"," 조현경"," 김수정"," 함우선","나다훈"," 정승수","전우혁","시수종"," 변승아 "];function y(){return f[Math.floor(Math.random()*1e5)%f.length]}function S(){return"avatars/"+Math.ceil(Math.random()*1e8)%200+".png"}var N=localStorage.getItem("is-larger")==="Y";localStorage.setItem("is-larger","N");r=JSON.stringify({code:1,rspList:[{className:"RspFight",isLarger:N,list:[{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()},{head:S(),name:y()}]}]});break}case"ReqBill":{var o=parseInt(localStorage.getItem("coin")||"0");o+=50;localStorage.setItem("coin",o);var u=parseInt(localStorage.getItem("medal")||"0");u+=10;localStorage.setItem("medal",u);r=JSON.stringify({code:1,rspList:[{className:"RspCommon",rspType:-7,value:1},{className:"RspBagItem",item:{amount:o,id:1,type:1},way:6102},{className:"RspBill",gradePrizes:[],id:7,maxScore:1553,medal:u,prizes:[{amount:50,id:1,type:1}]}]});break}case"ReqWeal":if(t.opType===7){var o=parseInt(localStorage.getItem("coin")||"0");o+=2500;localStorage.setItem("coin",o);localStorage.setItem("pre-supply-time",Date.now());r=JSON.stringify({code:1,rspList:[{className:"RspBagItem",item:{amount:o,id:1,type:1},way:4112},{className:"RspBagItem",item:{amount:4,id:402003,type:1},way:4112},{className:"RspBagItem",item:{amount:4,id:402002,type:1},way:4112},{className:"RspBagItem",item:{amount:1,id:300010,type:1},way:4112},{className:"RspCommon",rspType:-33,value:0}]});break}var v=_.pluck(D.turntable||[],"field");var R=v[Math.floor(Math.random()*1e4)%v.length];var k=_.filter(D.turntable||[],function(e){return e.field===R});var b=k[Math.floor(Math.random()*1e4)%k.length];var w=parseInt(localStorage.getItem("item-amount-"+b.itemId)||"0");w+=b.num;localStorage.setItem("item-amount-"+b.itemId,w);switch(b.itemId){case 1:{var o=parseInt(localStorage.getItem("coin")||"0");o+=b.num;localStorage.setItem("coin",o);w=o;break}case 2:{var i=parseInt(localStorage.getItem("gold")||"0");i+=b.num;localStorage.setItem("gold",i);w=i;break}}var T=-25,L=0;var A=localStorage.getItem("pre-free-zhuanpan-time");A=A&&parseInt(A);A=A&&new Date(A);if(A&&A.getDate()===(new Date).getDate()){L=parseInt(localStorage.getItem("tv-zhuanpan-times")||"8");L-=1;L=L<0?0:L;localStorage.setItem("tv-zhuanpan-times",L);T=-26}else{localStorage.setItem("pre-free-zhuanpan-time",Date.now());localStorage.setItem("tv-zhuanpan-times",8)}var M=0;{r=JSON.stringify({code:1,rspList:[{className:"RspBagItem",item:{amount:w,id:b&&b.itemId,type:1,way:G.GET_ITEM_WAY.ZHUAN_PAN},way:4110},{className:"RspTurntable",field:R,id:b&&b.id},{className:"RspCommon",rspType:T,value:L}]});break}case"ReqAd":{var L=parseInt(localStorage.getItem("kaijubianda-times-today")||"4");var l=parseInt(localStorage.getItem("pre-use-kaijubianda-time")||"0");if(new Date(l).getDate()!==(new Date).getDate()){localStorage.removeItem("is-larger");L=4}var N=localStorage.getItem("is-larger");if(N!=="Y"){L-=1;localStorage.setItem("kaijubianda-times-today",L);localStorage.setItem("pre-use-kaijubianda-time",Date.now());localStorage.setItem("is-larger",L<0?"N":"Y")}r=JSON.stringify({code:1,rspList:[{className:"RspCommon",rspType:-30,value:L<0?0:L}]});break}case"ReqRoleEx":{r=JSON.stringify({code:1,rspList:[{className:"RspBagItem",item:{amount:20,id:2,type:1},way:1201},{className:"RspCommon",rspType:-31,value:2}]});break}case"ReqExit":case"ReqWx":case"ReqHeart":{r=JSON.stringify({code:1});break}default:{throw new Error(e.body())}}return a.status(200).body(r)});