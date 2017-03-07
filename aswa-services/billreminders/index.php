<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_br_data' :
  get_br_data();
  break;
}

/** Function to Get I Owe data **/
function get_br_data() {
 //$qry = mysql_query('SELECT id, item,amount,billdate,status, FROM_UNIXTIME(billdate) from tbl_billreminders WHERE MONTH(FROM_UNIXTIME(billdate)) = MONTH(CURDATE()) AND YEAR(FROM_UNIXTIME(billdate)) = YEAR(CURDATE())');
  $qry = mysql_query('SELECT * from tbl_billreminders where YEAR(billdate) = YEAR(CURDATE()) AND MONTH(billdate) = MONTH(CURDATE())');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['id'],
      "item" => $rows['item'],
      "amount" => $rows['amount'],
      "billdate" => $rows['billdate'],
      "status" => $rows['status']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>
