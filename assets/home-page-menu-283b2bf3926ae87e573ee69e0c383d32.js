(function(){$(".segment").on("click",function(){var e,s,t,l,o,a,n,i;for(e="#"+$(this).attr("id")+"-box",n=$("li.segment"),t=0,o=n.length;o>t;t++)s=n[t],$(s).hasClass("selected")&&$(s).toggleClass("selected");for(i=$(".unit-section"),l=0,a=i.length;a>l;l++)s=i[l],$(s).hasClass("disabled")===!1&&$(s).toggleClass("disabled");return $(this).toggleClass("selected"),$(e).toggleClass("disabled"),$("html, body").animate({scrollTop:$("#segmented-control").offset().top},500)})}).call(this);