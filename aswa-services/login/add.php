<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'push_rent_data' :
  push_rent_data();
  break;
}

/*
"id" => $rows['rent_id'],
"month" => $rows['rent_month'],
"amount" => $rows['rent_amount'],
"llcode" => $rows['ll_code'],
"status" => $rows['rent_status'],
"comment" => $rows['rent_comment']
*/
  /** Function to Push Product **/
  function push_rent_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    //$rent_id = $data->id;
    $rent_month = $data->rentmonth;
    $ll_code = $data->landlord;
    $rent_status = $data->status;
    $rent_amount = $data->amount;
    $rent_comment = $data->comment;

    $qry = "INSERT INTO tbl_rent (rent_month, ll_code, rent_amount, rent_status, rent_comment) VALUES ('$rent_month', '$ll_code', '$rent_amount', '$rent_status', '$rent_comment')";
    $qry_res = mysql_query($qry);
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
