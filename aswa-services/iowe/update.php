<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'put_iowe_data' :
  put_iowe_data();
  break;
}
  /** Function to Push Product **/
  function put_iowe_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $id = $data->id;
    $contact      = $data->contact;
    $amount       = $data->amount;
    $owe_date    = $data->date_owe;
    $paid_date    = $data->date_paid;
    $status       = $data->status;
    $category     = $data->category;

    $qry = "UPDATE tbl_iowe SET contact = '$contact', amount='$amount', date_owe='$owe_date', date_paid='$paid_date', status='$status', category='$category' WHERE id = $id";
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
