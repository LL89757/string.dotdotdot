/**
 * Created by leel on 3/14/2016.
 */
$(function(){
    $("div.text").dotString({maxHeight:60});
    $("span.text").dotString({lineHeight:20,lineNum:4});
    var dot1=$("p.text").dotString({lineHeight:10,lineNum:4,ellipsis:"****"});
    var dot2=$("a.text").dotString({maxHeight:20,ellipsis:"****"});

    var dot3=$(".text1").dotString({
        maxHeight:40,
        ellipsis:"****",
        callback:function(){
            console.log("height:"+$(this).height());
        }
    });

    $(".text2").dotString({
        lineNum:1
    })
})