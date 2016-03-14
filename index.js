/**
 * Created by leel on 3/14/2016.
 */
$(function(){
    $("div.text").dotString({maxHeight:60});
    $("span.text").dotString({lineHeight:20,lineNum:4});
    var dots=$("p.text").dotString({lineHeight:10,lineNum:4,ellipsis:"****"});
    var dots=$("a.text").dotString({maxHeight:20,ellipsis:"****"});
})