var calUtil={
    //当前日历显示的年份
    showYear: 2017,
    //当前日历显示的月份
    showMonth: 1,
    //事件名称
	eventName:"load",  
	
    showCalendar: function () {
        calUtil.init();
    },

    //初始化日历
    init: function () {
		$(".container table").remove();
        calUtil.setMonthAndDay();
        
        //绑定日历
        var str = calUtil.drawCal(calUtil.showYear, calUtil.showMonth);
        $("#calendar").html(str);
        //绑定日历表头
        var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";  
    	$(".calendar_month_span").html(calendarName);
    	
//  	$(".container").show();
    	//绑定事件
		calUtil.bindEnvent();
    },
    
    //绑定事件  
 	bindEnvent:function(){  
    	//绑定上个月事件  
    	$(".calendar_month_prev").click(function(){
	      	calUtil.eventName="prev";  
	      	calUtil.init();
	      	if(calUtil.isCurrentMonth()){
				$(".current-day").css("background","#ff6060");
			}else{
				$(".current-day").css("background","skyblue");
			}
    	});  
    	//绑定下个月事件  
    	$(".calendar_month_next").click(function(){
	      	calUtil.eventName="next";  
	      	calUtil.init();
	      	if(calUtil.isCurrentMonth()){
				$(".current-day").css("background","#ff6060");
			}else{
				$(".current-day").css("background","skyblue");
			}
    	});
    	//关闭日历
    	$(".cancel").click(function () {
            $(".container").hide();
       	});
        $(".container").on("touchmove",function(event){
            event.preventDefault();
        });
  	},
	
    //获取当前选择的年月
    setMonthAndDay: function () {
        switch(calUtil.eventName)  
	    {  
	      case "load":  
	        var current = new Date();  
	        calUtil.showYear=current.getFullYear();  
	        calUtil.showMonth=current.getMonth() + 1;  
	        break;  
	      case "prev":  
	        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
	        var nowYear=$(".calendar_month_span").html().split("年")[0];
	        calUtil.showMonth=parseInt(nowMonth)-1; 
	        calUtil.showYear=parseInt(nowYear);
	        if(calUtil.showMonth==0)  
	        {  
	            calUtil.showMonth=12;  
	            calUtil.showYear-=1;  
	        }  
	        break;  
	      case "next":  
	        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
	        var nowYear=$(".calendar_month_span").html().split("年")[0];
	        calUtil.showMonth=parseInt(nowMonth)+1;
	       	calUtil.showYear=parseInt(nowYear);
	        if(calUtil.showMonth==13)  
	        {  
	            calUtil.showMonth=1;  
	            calUtil.showYear+=1;  
	        }  
	        break;  
	    }  
    },
    //获取当前年月的最后一天的日期
    getDaysInmonth: function (iMonth, iYear) {
        var dPrevDate = new Date(iYear, iMonth, 0);
        return dPrevDate.getDate();
    },
    //判断是否是当前年月
	isCurrentMonth:function(){
		var current = new Date();  
	        currentYear=current.getFullYear();  
	       	currentMonth=current.getMonth() + 1;
		var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
	    var nowYear=$(".calendar_month_span").html().split("年")[0];
	    if(currentYear!=nowYear||currentMonth!=nowMonth){
	    	return false;
	    }else{
	    	return true;
	    }
	},
    //生成日期列表
    bulidCal: function (iYear, iMonth) {
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        aMonth[6] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1);
        var dCalNext = new Date(iYear, iMonth, 1);
        var dCalLast = new Date(iYear, iMonth - 1, 0);
        var iDayOfNext = dCalNext.getDay();
        var iDayOfLast = dCalLast.getDay();
        var iDayOfFirst = dCalDate.getDay();
        var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
        var iDaysLastInMonth = calUtil.getDaysInmonth(iMonth - 1, iYear);
        var iVarDate = 1;
        var iVarNext = 1;
        var d=0, w=0, m=0;
        aMonth[0][0] = "日";
        aMonth[0][1] = "一";
        aMonth[0][2] = "二";
        aMonth[0][3] = "三";
        aMonth[0][4] = "四";
        aMonth[0][5] = "五";
        aMonth[0][6] = "六";

        //上一个月日期补全；
        if (iDayOfFirst !== 0) {
            for (m = iDayOfLast; m >= 0; m--) {
                aMonth[1][m] = iDaysLastInMonth;
                iDaysLastInMonth--;
            }
        }
        //当月日期填充；
        for (d = iDayOfFirst; d < 7; d++) {
            aMonth[1][d] = iVarDate;
            iVarDate++;
        }
        for (w = 2; w < 7; w++) {
            for (d = 0; d < 7; d++) {
                if (iVarDate <= iDaysInMonth) {
                    aMonth[w][d] = iVarDate;
                }
                 //下一个月日期补全；
		        if((iVarDate==iDaysInMonth)&&(iDayOfNext!==0)){
		        	for(m=iDayOfNext;m<7;m++){
		        		aMonth[w][m] = iVarNext;
		        		iVarNext++;
		        	}
		        }
		        iVarDate++;
            }
        }
        return aMonth;
    },
    //判断标记的天数；
//ifHasSigned : function(signList,day){
// var signed = false;
// $.each(signList,function(index,item){
//  if(item.signDay == day) {
//   signed = true;
//   return false;
//  }
// });
// return signed ;
//},
    //判断上个月天数；
    ifLastMonth: function (myMonth, w) {
        var last = false;
        if ((myMonth >= 23) && (w == 1)) {
            last = true;
        }
        return last;
    },
    //判断下个月天数；
    ifNextMonth: function (myMonth, w) {
        var next = false;
        if ((myMonth < 7) && (w > 4)) {
            next = true;
        }
        return next;
    },
    //判断是否是当前天
    ifNowDay:function(myMonth){
    	var now=false;
    	var oDate=new Date();
    	var oDay=oDate.getDate();
		if(myMonth==oDay){
			now=true;
		}
		return now;
    },
    //生成日期节点
    drawCal: function (iYear, iMonth) {
        var myMonth = calUtil.bulidCal(iYear, iMonth);
        var htmls = new Array();

        htmls.push("<div class='sign_main' id='sign_layer'>");
        htmls.push("<div class='sign_succ_calendar_title'>");
        htmls.push("<div class='calendar_month_next'></div>");
        htmls.push("<div class='calendar_month_prev'></div>");
        htmls.push("<div class='calendar_month_title'></div>");
        htmls.push("<div class='calendar_month_span'></div>");
        htmls.push("<div class='cancel'></div>");
        htmls.push("</div>");
        htmls.push("<div class='sign' id='sign_cal'>");
        htmls.push("<table>");
        htmls.push("<tr class='fl-top'>");
        htmls.push("<th>" + myMonth[0][0] + "</th>");
        htmls.push("<th>" + myMonth[0][1] + "</th>");
        htmls.push("<th>" + myMonth[0][2] + "</th>");
        htmls.push("<th>" + myMonth[0][3] + "</th>");
        htmls.push("<th>" + myMonth[0][4] + "</th>");
        htmls.push("<th>" + myMonth[0][5] + "</th>");
        htmls.push("<th>" + myMonth[0][6] + "</th>");
        htmls.push("</tr>");
        var d, w;

        for (w = 1; w < 7; w++) {
            htmls.push("<tr>");
            for (d = 0; d < 7; d++) {
                var ifLast = calUtil.ifLastMonth(myMonth[w][d], w);
                var ifNext = calUtil.ifNextMonth(myMonth[w][d], w);
				var ifNow = calUtil.ifNowDay(myMonth[w][d]);
                //判断日期月份种类；
                if (ifLast) {
                    htmls.push("<td class='last'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                }
                if (ifNext) {
                    htmls.push("<td class='next'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                }
                if ((!ifLast) && (!ifNext)) {
                	if(ifNow){
                		htmls.push("<td class='current'>" +"<div class='current-day'>"+(!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ")+"</div></td>");
                	}else{
                		htmls.push("<td class='current'>"+(!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ")+"</td>");
                	}
                }

            }
            htmls.push("</tr>");
        }
        htmls.push("</table>");
        htmls.push("</div>");
        htmls.push("</div>");
        htmls.push("</div>");
        return htmls.join('');
    }
}
