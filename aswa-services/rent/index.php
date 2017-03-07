<?php
include('../users/config.php');
include('../config/log_handler.php');

switch($_GET['action']) {
  case 'get_ll_data' :
  get_ll_data();
  break;
   case 'get_ll_details' :
  get_ll_details();
  break;
   case 'get_rent_data' :
  get_rent_data();
  break;
  case 'get_rent_data_by_ll' :
  get_rent_data_by_ll();
  break;
  case 'put_rent_data' :
  put_rent_data();
  break;
  case 'push_rent_data' :
  push_rent_data();
  break;
}

/** Function to Get Product **/

function get_rent_data() {

  $limit = $_GET['limit'];
  $offset = $_GET['offset'];
  //print $offset;


  $qry = mysql_query("SELECT TBLRENT.*, TBLLANDLORD.ll_type FROM  tbl_rent TBLRENT INNER JOIN tbl_landlord TBLLANDLORD ON TBLRENT.ll_code =  TBLLANDLORD.ll_code ORDER BY TBLRENT.rent_month DESC LIMIT $limit OFFSET $offset");

$qry_num = mysql_query("SELECT TBLRENT.*, TBLLANDLORD.ll_type FROM  tbl_rent TBLRENT INNER JOIN tbl_landlord TBLLANDLORD ON TBLRENT.ll_code =  TBLLANDLORD.ll_code ORDER BY TBLRENT.rent_month DESC");


  $num_rows = mysql_num_rows($qry_num);

  while($rows = mysql_fetch_array($qry))
  {
    $data_item[] = array(
      "id" => $rows['rent_id'],
      "month" => $rows['rent_month'],
      "amount" => $rows['rent_amount'],
      "llcode" => $rows['ll_code'],
      "status" => $rows['rent_status'],
      "comment" => $rows['rent_comment'],
      "receipt" => $rows['receipt'],
      "lltype"  => $rows['ll_type']
    );
  }

  $data_total=array("TOTAL"=> $num_rows);
  $data[]->item = $data_item;
  $data[]->total = $data_total;

echo(json_encode($data));
return json_encode($data);
}

/** Function to Get Product **/
function get_ll_data() {
  $qry = mysql_query('SELECT * from tbl_landlord');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['ll_id'],
      "llcode" => $rows['ll_code'],
      "name" => $rows['ll_name'],
      "type" => $rows['ll_type'],
      "address" => $rows['ll_address'],
      "contact" => $rows['ll_contact'],
      "dop" => $rows['ll_dop'],
      "status" => $rows['ll_status'],
      "comment" => $rows['ll_comment'],
      "dov"   =>  $rows['ll_dov'],
      "pan"   =>  $rows['ll_pan'],
      "advance"   =>  $rows['ll_advance']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

/** Function to Get Product **/
function get_ll_details() {
  $param  = $_GET['llcode'];
  $qry = mysql_query("SELECT * from tbl_landlord where ll_code='$param'");
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data = array(
      "id" => $rows['ll_id'],
      "llcode" => $rows['ll_code'],
      "name" => $rows['ll_name'],
      "type" => $rows['ll_type'],
      "address" => $rows['ll_address'],
      "contact" => $rows['ll_contact'],
      "dop" => $rows['ll_dop'],
      "status" => $rows['ll_status'],
      "comment" => $rows['ll_comment'],
      "dov"   =>  $rows['ll_dov'],
      "pan"   =>  $rows['ll_pan'],
      "advance"   =>  $rows['ll_advance']

    );
  }
echo(json_encode($data));
return json_encode($data);
}
/** Function to Get Product **/
function get_rent_data_by_ll() {
  $param = $_GET['llcode'];

  $qry = mysql_query("SELECT * from tbl_rent where ll_code = '$param' order by rent_id desc");
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "id" => $rows['rent_id'],
      "month" => $rows['rent_month'],
      "amount" => $rows['rent_amount'],
      "llcode" => $rows['ll_code'],
      "status" => $rows['rent_status'],
      "comment" => $rows['rent_comment'],
      "receipt" => $rows['receipt']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

// update rent data/** Function to Push Product **/
function put_rent_data() {
  $data = json_decode(file_get_contents("php://input"));
  print_r($data);
  $rent_id        =   $data->id;
  $rent_month     =   $data->month;
  $rent_amount    =   $data->amount;
  $ll_code        =   $data->llcode;
  $rent_status    =   $data->status;
  $rent_comment   =   $data->comment;
  $rent_receipt   =   $data->receipt;

  $qry = "UPDATE tbl_rent SET rent_month = '$rent_month', rent_amount = '$rent_amount', ll_code = '$ll_code', rent_status = '$rent_status', rent_comment = '$rent_comment', receipt='$rent_receipt' WHERE rent_id = $rent_id";
  $qry_res = mysql_query($qry);
  if ($qry_res) {
  $arr = array('msg' => "Travel data updated Successfully!!!", 'error' => '');
  $jsn = json_encode($arr);
  // print_r($jsn);
  }
  else {
  $arr = array('msg' => "", 'error' => 'Error In inserting record');
  $jsn = json_encode($arr);
  // print_r($jsn);
  }
}

/** Function to Push Product **/
function push_rent_data() {
  $data = json_decode(file_get_contents("php://input"));
  print_r($data);
  //$rent_id = $data->id;
  $rent_month     =   $data->month;
  $ll_code        =   $data->llcode;
  $rent_status    =   $data->status;
  $rent_amount    =   $data->amount;
  $rent_comment   =   $data->comment;
  $rent_receipt   =   $data->receipt;

  $qry = "INSERT INTO tbl_rent (rent_month, ll_code, rent_amount, rent_status, rent_comment, receipt) VALUES ('$rent_month', '$ll_code', '$rent_amount', '$rent_status', '$rent_comment', '$rent_receipt')";
  $qry_res = mysql_query($qry);

  print_r($qry);
  if ($qry_res) {
  $arr = array('msg' => "Product Added Successfully!!!", 'error' => '');
  $jsn = json_encode($arr);
  // print_r($jsn);
  }
  else {
  $arr = array('msg' => "", 'error' => 'Error In inserting record');
  $jsn = json_encode($arr);
  // print_r($jsn);
  }
}

?>
