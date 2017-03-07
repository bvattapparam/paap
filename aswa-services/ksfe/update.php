<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'put_br_data' :
  put_br_data();
  break;
}
  /** Function to Push Product **/
  function put_br_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $id = $data->id;
    $item = $data->item;
    $billdate = $data->billdate;
    $status = $data->status;
    $amount = $data->amount;

    $qry = "UPDATE tbl_billreminders SET item = '$item', billdate='$billdate', status='$status', amount='$amount' WHERE id = $id";
    $qry_res = mysql_query($qry);
    print_r($qry);
    if ($qry_res) {
    $arr = array('msg' => "BR data updated Successfully!!!", 'error' => '');
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
