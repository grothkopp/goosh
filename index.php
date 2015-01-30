<?
        header('Content-Type: text/html; charset=utf-8');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>goosh.org - the unofficial google shell.</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />  
<style type="text/css">
<? include("goosh.css"); ?>
</style>
<script src="//www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">
//<!--
<? include("notice.txt");?>
<? 
if($_GET['deploy'] != "") 
 include("goosh.js.compr");
else
 include("goosh.js");

?>
//-->
</script>
<meta name="description" content="goosh is a google-interface that behaves similar to a unix-shell."/>
<meta name="keywords" content="google, shell, google shell, commandline, cli, bash, interface, ajax, api, unix, search"/>
<meta name="author" content="Stefan Grothkopp"/>
</head>
<body id="body">
    <div id="mysite_webResult">
      <table class="gs-webResult gs-result" data-vars="{longUrl:function() { var u = ' '+visibleUrl; var i = u.indexOf('www.'); return i < 1 ? visibleUrl : visibleUrl.substring(i+3);}, count:function () { window.i++; window.goosh.config.urls[window.i] = unescapedUrl; return  window.i;} }">
<tr>
<td valign='top' class='less num'><span data-body="count()"></span>)&nbsp;</td>
<td>
<a data-attr="{href:unescapedUrl,target:target}" data-body="html(title)"></a>
<br/>
<span class="gs-snippet" data-body="html(content)"></span>
<br/>
<a class="info" style="text-decoration:none;" data-attr="{href:unescapedUrl}" data-body="unescapedUrl"></a>
<br/>
&nbsp;<br>
</td></tr>

    </table>
  </div>


<div id="output">

 <? date_default_timezone_set('UTC'); ?>

<span class='less'>Goosh goosh.org 0.6.0-beta #1 <? echo str_replace("+0000","UTC",date(DATE_RFC822,@filemtime("goosh.js.compr")));?> Google/Ajax</span><br/> 
 <br/>
<span class='info'>Welcome to goosh.org - the unofficial google shell.</span><br/>
 <br/>
This google-interface behaves similar to a unix-shell.<br/>
You type commands and the results are shown on this page.<br/>
<br/>
goosh is powered by <a href='https://www.google.com/cse/' target='_blank'>google</a> custom search.
<br/>
<br/>
goosh is written by <a href='http://stefan.grothkopp.com/'>Stefan Grothkopp</a> 
<script type="text/javascript">
// <!--
var gmail = "xsg.de";
document.write("&lt;<a href='mailto:goosh"+"@"+gmail+"?subject=goosh.org' style='text-decoration:none; color: #000;'>goosh"+"@"+gmail+"</a>&gt;");
//-->
</script>
<br/>
it is NOT an official google product!<br/>
goosh is <a href='http://code.google.com/p/goosh/' target='_blank'>open source</a> under the Artistic License/GPL.<br/>
<? include("ad.html"); ?>
<br/>
 Enter <span class='info'>help</span> or <span class='info'>h</span> for a list of commands.
<br/>
 <br/>
</div>
<div id="input">
<form name='f' onsubmit='return false;' class='cmdline' action=''>
<table class="inputtable"><tr><td><div id='prompt' class='less'></div></td><td class="inputtd"><input id='inputfield' name='q' type='text' class='cmdline' autocomplete='off' value="" /></td></tr></table>
</form>
</div>
<script type="text/javascript">
//<!--
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
//-->
</script>
<script type="text/javascript">
//<!--
var pageTracker = _gat._getTracker("UA-118992-4");
pageTracker._initData();
pageTracker._trackPageview();
//-->
</script>
</body>
</html>
