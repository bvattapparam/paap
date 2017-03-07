<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'push_iowe_data' :
  push_iowe_data();
  break;
}

  /** Function to Push Product **/
  function push_iowe_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    //$rent_id = $data->id;
    $contact      = $data->contact;
    $amount       = $data->amount;
    $owe_date    = $data->date_owe;
    $paid_date    = $data->date_paid;
    $status       = $data->status;
    $category     = $data->category;

    $qry = "INSERT INTO tbl_iowe (contact, amount, category, date_owe, date_paid,status) VALUES ('$contact', '$amount', '$category', '$owe_date', '$paid_date', '$status')";
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
