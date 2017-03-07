<?php
 
/****************************************************
			Database configuration						
****************************************************/
 
$host = "localhost"; 
$user = "PAAPUSER"; 
$pass = "GENPAAPUSER"; 
$database = "paap";
$con = mysql_connect($host,$user,$pass);
 
if (!$con) {
die('Sorry not able to connect, please contact DB administrator for more details ' . mysql_error());
}
 
mysql_select_db($database,$con);

?>