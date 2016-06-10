/**
 * Created by Administrator on 2016/5/21.
 */

$(function(){

    function hideiw(){
        $(".jl-sel-o, .y-bg").hide();
        $(".i-w").removeClass("cur");
        $(".i-w").parent().css("z-index",0);
       soYoung();
    }
    $("body").bind("click",function(){
        $(".jl-sel-o, .y-bg").hide();
        hideiw();
    });
   $(".i-w").hover(function(){
        $("body").unbind("click");
    },function(){
       $("body").bind("click",function(){
           $(".jl-sel-o,.y-bg").hide();
           hideiw();
       });
   });
   var jydate={
       y:new Date().getFullYear(),
       m:new Date().getMonth() + 1,
       d:new Date().getDate(),
       min:18,
       max:99

   };
    function insertYear(){
        var html='';
        for(var i=9;i>2;i--){
            html += '<li><span>';
            html += i;
            html += '0\u540e\uff1a';//'0后
            html += '</span>';
            for(var j=0;j<10;j++)
            {
                var temp=1990+i*10+j;
                if(jydate.y-temp<jydate.min||jydate.y-temp>jydate.max){
                    continue;
                }
                html += '<a href="#">';
                html += temp;
                html += '</a>';
            }
            html += '</li>';

        }
        return html;
    }
    function insertMD(arg){
        var html='<li>';
        for(var i=1;i<=arg;i++)
        {
            html += '<a href="#">';
            html += i;
            html += '</a>';
        }
        html += '</li>';
        return html;
    }
    //生日
    $("#year").click(function(){
        hideiw();
        $(".jl-sel-o,.y-bg").hide();
        $("#year-o ul").html(insertYear());//设置ul的值
        $("#y-bg,#year-o").show();
        $(this).parents("dd").css("z-index",1);
           $("#ageTip").removeClass("errorTip")
           $("#ageTip").prev().show();
           $("#ageTip").hide();
    }).blur(function(){
        borthEmpty();
    });
    $("#year-o a").live("click",function(){
        var text = $(this).text();
        $("#year").val(text);
        $("#y-bg").hide();
        $("#year-o").hide();
        if(jydate.y-text === jydate.min){
            $("#month-o ul").html(insertMD(jydate.m));
        }else{
            $("#month-o ul").html(insertMD(12));
        }
        $("#m-bg,#month-o").show();
        reg_trace("year","processTraceUser",{},true);
        borthEmpty();
        return false;
    }).blur(function(){
        borthEmpty();
    });
    function borthEmpty(){
        if($("#year").val() == "" ||$("#year").val()=="请选择"||$("#month").val() == "" ||$("#month").val()=="请选择"||$("#day").val() == "" ||$("#day").val()=="请选择"){
            $("#ageTip").removeClass("errorTip");
            $("#ageTip").prev().hide();
            $("#ageTip").addClass("errorTip").children("p").text("请你完整填写生日");
            $("#ageTip").show();
        }else{
            $("#ageTip").show();
            $("#ageTip").prev().show();
            $("#ageTip").removeClass("errorTip");
            $("#ageTip").hide();
        }

    }

    //验证未满18岁
    function soYoung(){
        var mInput=parseInt($("#month").val());
        var dInput=parseInt($("#day").val());
        if(!($("#ageTip p").text()=='请完整填写生日' && $("#ageTip").css("display")=='block')){
            if(jydate.y-$("#year").val()===jydate.min && mInput > jydate.m){
                $("#ageTip").addClass("errorTip").children("p").text("未满18岁哦");
                $("#ageTip").show();
                $("#ageTip").prev().hide();
            }else if(jydate.y-$("#year").val()===jydate.min && mInput > jydate.m &&dInput > jydate.d){
                $("#ageTip").addClass("errorTip").children("p").text("未满18岁哦");
                $("#ageTip").show();
                $("#ageTip").prev().hide();
            }else
            {
                $("#ageTip").hide();
                $("#ageTip").prev().show();
            }
            if($("#ageTip p").text()=='请完整填写生日'){
                borthEmpty();
            }
        }
    }
});