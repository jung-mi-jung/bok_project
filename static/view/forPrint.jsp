<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<title>페이지인쇄하기</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="robots" content="all" />
<link rel="stylesheet" href="/static/jslibrary/bootstrap/css/bootstrap.css" />
<link type="text/css" rel="stylesheet" href="/static/font/NotoSans/notosans.css" />
<link type="text/css" rel="stylesheet" href="/static/font/font-awesome-4.7.0/css/font-awesome.min.css" />
<link type="text/css" rel="stylesheet" href="/static/font/themify-icons/themify-icons.css" />
<link type="text/css" rel="stylesheet" href="/static/portal/css/common.css" />
<link type="text/css" rel="stylesheet" href="/static/portal/css/default.css" />
<style type="text/css">
<!--
	body{background-image: url(none);padding:0 20px;}
	#wrap{width: auto ;margin: 0 0 0 0;background-image:none;min-width: 750px;}
	#wraper{background-image: url(none);width: auto;}
	#container,
	#content{float:none;margin: 0;padding: 0;background-image:none;margin: 0 auto;zoom:1; }
	#content{}
	.print_btn_set{text-align: center;  }
	.spot_visual{position: relative;top:0;}
	.snsPrint, .bdViewNav, .btnSet {visibility:hidden;}
	.dbData {min-height:60px;}
	.open_soce,
	.contents_adm
	{display:none;margin: 0;}
	.paging li * {overflow:hidden;}
	@media print{
		.print_tit,
		.print_set,
		#btn_print{display:none;}

	}
.print_tit{padding: 15px 0 14px 5px;}
.print_set{margin-left: 5px;width: 770px;height: 315px;overflow:hidden;background: url(/portal/images/common/print/print_box.gif) no-repeat 0 0;}
.print_set .fl{width: 422px;}
.print_set .fl img{padding: 15px 0 0 9px;}
.print_set .fr{width: 335px;}
.print_set .fr p{font-weight: bold;padding: 16px 0 10px 0;}
.print_set .fr h2{margin: 5px 0 4px 0;}
.print_set .fr ol{}
.print_set .fr ol li{background: url(/portal/images/common/print/print_num_1.gif) no-repeat 0 0;padding-left: 35px;line-height: 14px;margin-bottom: 10px;min-height: 23px}
.print_set .fr ol li.num2{background-image: url(/portal/images/common/print/print_num_2.gif);}
.print_set .fr ol li.num3{background-image: url(/portal/images/common/print/print_num_3.gif);}
.print_set .fr ol li em{color: #f54009;}
-->
</style>
<script type="text/javascript">
//<![CDATA[
window.document.onkeydown=function()	{return false}
window.document.onclick=function()		{return false}
window.document.ondblclick=function()	{return false}
window.document.oncontextmenu=function(){return false}
window.document.ondragstart=function()	{return false}
window.document.onselectstart=function(){return false}
//]]>
</script>
</head>
<body>
<!-- <h1 class="print_tit"><img src="/portal/images/common/print/print_tit.gif" alt="고객프린터 환경설정" /></h1>
<div class="print_set">
	<div class="fl"><img src="/portal/images/common/print/print_help2.gif" alt="" /></div>
	<div class="fr">
		<p>프린터 출력 시 LINE 및 이미지등이 안보이실 경우에 고객님의 프린터의 환경을 설정하셔야 합니다.</p>
		<h2>인터넷익스플로러 7이하</h2>
		<ol >
			<li class="num1">  익스플로러의 ‘도구’ 클릭 → "<em>인터넷 옵션</em>" 선택</li>
			<li class="num2" > "고급" 탭을 선택하세요. → "인쇄" 항목에서 <br />"<em>배경색 및 이미지 인쇄</em>"를 선택</li>
			<li class="num3" > "<em>적용</em>" 버튼 클릭</li>
		</ol>
		<h2>인터넷익스플로러 8이상</h2>
		<ol >
			<li class="num1"> 익스플로러의 ‘파일’ 클릭 → "<em>페이지 설정</em>" 선택</li>
			<li class="num2" > 용지옵션 → "<em>배경색 및 이미지 인쇄</em>" 체크</li>
			<li class="num3" > "<em>확인</em>" 버튼 클릭</li>
		</ol>
	</div>
</div> -->
<div id="btn_print" style="display:none; height:55px; text-align:center;padding:10px 0;">
	<div">
		<a href="#btn_print" class="btn lg bg-blue b-print" onclick="window.print();return false;" onkeypress="this.onclick();">인쇄하기</a>
		<a href="#btn_print" class="btn lg bg-gray b-close" onclick="window.close();return false;" onkeypress="this.onclick();">창닫기</a>
	</div>
</div>
<script type="text/javascript">
//<![CDATA[
	//var openerHtml = opener.printBody.innerHTML ;
	var contentObj = opener.document.getElementById("content");
	if(contentObj)
	{
		var openerHtml = contentObj.innerHTML;
	//	var re1 = /<\s*a/gi
	//	var re2 = /<\/\s*a/gi
	//	openerHtml = openerHtml.replace(re1, "<span");
	//	openerHtml = openerHtml.replace(re2, "<\/span");
			var str = "<div id='wrap'>\n"
					+ "<div id='container' onselectstart='return false'>\n"
					+ "<div id='content'>\n"
					+ openerHtml
					+ "<\/div>";
					+ "<\/div>";
					+ "<\/div>";
			document.write(str);
	}else{
		var containerObj = opener.document.getElementById("container")
		if(containerObj)
		{
			var openerHtml = containerObj.innerHTML;
		//	var re1 = /<\s*a/gi
		//	var re2 = /<\/\s*a/gi
		//	openerHtml = openerHtml.replace(re1, "<span");
		//	openerHtml = openerHtml.replace(re2, "<\/span");
				var str = "<div id='wrap'>\n"
						+ "<div id='container' onselectstart='return false'>\n"
						+ "<div id='content'>\n"
						+ openerHtml
						+ "<\/div>";
						+ "<\/div>";
						+ "<\/div>";
				document.write(str);
		}
	}
//]]>
</script>
<noscript>
	<p style="margin-bottom:5px;">자바스크립트가 작동 되지 않는 환경입니다. 현재 창을 닫으시고, 브라우저 메뉴의 인쇄기능을 이용하십시오.</p>
</noscript>
<script type="text/javascript">
	document.getElementById("btn_print").style.display = "";
</script>
<noscript>
	<p style="margin-bottom:5px;">자바스크립트가 작동 되지 않는 환경입니다. 현재 창을 닫으시고, 브라우저 메뉴의 인쇄기능을 이용하십시오.</p>
</noscript>
</body>
</html>

