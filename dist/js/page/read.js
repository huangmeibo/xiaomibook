"use strict";define(["jquery","base64","hand","template"],function(n,e,t,r){var c=null;n.getJSON({url:"/book/chapterList",success:function(e){r(n("#chapter-content").html(),e.item,".chapter-list","html"),c=e.item.toc}}),n(".reader__ft-toc").on("click",function(){n(".chapter-dialog").addClass("show")}),n(".top_back").on("click",function(){n(".chapter-dialog").removeClass("show")});var d=window.localStorage.getItem("pagenum")||1;function a(){n.getJSON({url:"/book/reader",data:{step:d},success:function(e){var t,o;t=e.jsonp,(o=document.createElement("script")).src=t,window.duokan_fiction_chapter=function(e){var t=JSON.parse(n.base64().decode(e));r(n("#p-content").html(),t,n(".reader__content"),"html");var a=c.length;n("#Tag__81").html(d+"/"+a),window.localStorage.setItem("pagenum",d),document.head.removeChild(o)},document.head.appendChild(o)}})}n(".chapter-list").on("click","li",function(){d=n(this).data("id"),n(".chapter-dialog").removeClass("show"),a()}),a(),n(".wrap").on("click",function(){n(".reader").hasClass("reader_op")?(n(".reader__font").css("display","none"),n(".reader").removeClass("reader_op")):n(".reader").addClass("reader_op")}),n(".reader__prev-chapter").on("click",function(){if(--d<=0)return!1;a()}),n(".reader__next-chapter").on("click",function(){if(++d>c.length)return!1;a()}),n(".reader__ft-font").on("click",function(){"none"===n(".reader__font").css("display")?n(".reader__font").css("display","block"):n(".reader__font").css("display","none"),event.stopPropagation()});var o=window.localStorage.getItem("fontS")||16;function i(e){var t=parseInt(n(".reader__bd").css("font-size"));n(".reader__bd").css("font-size",t+e+"px"),window.localStorage.setItem("fontS",t),event.stopPropagation()}n(".reader__bd").css("font-size",o+"px"),n(".reader__font-large").on("click",function(){i(2)}),n(".reader__font-small").on("click",function(){i(-2)});var s=window.localStorage.getItem("bg");n(".reader__bd").css("background",s),n(".reader__font-bg>a[data-bg]").on("click",function(){var e=n(this).css("background");n(".reader__bd").css("background",e),window.localStorage.setItem("bg",e),event.stopPropagation()});var l=(new Date).getHours(),_=window.localStorage.getItem("night")||1;console.log(_),console.log(l),n(".reader__ft-night").on("click",function(){0==n(".reader_op").attr("data-night")?n(".reader_op").attr("data-night",1):n(".reader_op").attr("data-night",0),window.localStorage.setItem("night",n(".reader_op").attr("data-night")),event.stopPropagation()})});