"use strict";define(["jquery","template"],function(o,n){var i=window.location.search.split("?")[1].split("=")[1];o.getJSON("/book/detail",{source_id:i},function(e){e.items.filter(function(e,t){e.source_id===i&&n(o("#detail").html(),e,".wrap2","append")})}),o.getJSON("/book/data",{indexId:i},function(e){console.log(e),n(o("#wrap").html(),e.item,".wrapper","append"),o(".startBtn").on("click",function(){o.ajax({url:"/loginSearch",async:!1,success:function(e){e=JSON.parse(e);console.log(e),"false"===e.result?confirm("请先登录")&&(location.href="/page/login.html"):location.href="/page/read.html"}})})})});