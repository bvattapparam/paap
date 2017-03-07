<?php
include('../users/config.php');
switch($_GET['action']) {
  case 'get_ksfe_data' :
  get_ksfe_data();
  break;
}

/** Function to Get I Owe data **/
function get_ksfe_data() {
 //$qry = mysql_query('SELECT id, item,amount,billdate,status, FROM_UNIXTIME(billdate) from tbl_billreminders WHERE MONTH(FROM_UNIXTIME(billdate)) = MONTH(CURDATE()) AND YEAR(FROM_UNIXTIME(billdate)) = YEAR(CURDATE())');
  $qry = mysql_query('SELECT * from tbl_ksfe');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['id'],
      "amount" => $rows['amount'],
      "month" => $rows['month'],
      "status" => $rows['status'],
      "comment" => $rows['comment']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>
