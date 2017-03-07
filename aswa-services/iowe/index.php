<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_iowe_data' :
  get_iowe_data();
  break;
}

/** Function to Get I Owe data **/
function get_iowe_data() {
  $qry = mysql_query('SELECT * from tbl_iowe');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['id'],
      "contact" => $rows['contact'],
      "amount" => $rows['amount'],
      "description" => $rows['description'],
      "category" => $rows['category'],
      "date_owe" => $rows['date_owe'],
      "date_paid" => $rows['date_paid'],
      "status" => $rows['status']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>
