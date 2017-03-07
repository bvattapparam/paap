<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_gas_data' :
  get_gas_data();
  break;
  case 'get_agent_data' :
  get_agent_data();
  break;
}

/** Function to Get Product **/
function get_gas_data() {
  $qry = mysql_query('SELECT * from tbl_gas order by id desc');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['id'],
      "month" => $rows['month'],
      "amount_paid" => $rows['amount_paid'],
      "sub_amount" => $rows['sub_amount'],
      "sub_status" => $rows['sub_status'],
      "order_date" => $rows['order_date'],
      "delivered_date" => $rows['delivered_date'],
      "bill" => $rows['bill'],
      "order_status" => $rows['order_status'],
      "comment" => $rows['comment']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

/** Function to Get Product **/
function get_agent_data() {
  $qry = mysql_query('SELECT * from tbl_gas_agent');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data = array(
      "id" => $rows['id'],
      "name" => $rows['name'],
      "customerid" => $rows['customerid'],
      "phone" => $rows['phone'],
      "address" => $rows['address']
    );
  }
echo(json_encode($data));
return json_encode($data);
}


?>
