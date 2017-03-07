<?php
include('../../users/config.php');
include('../../config/log_handler.php');

put_cart_data();

  /** Function to Push Product **/
 function put_cart_data() {
  $data       =   json_decode(file_get_contents("php://input"));
  $id               =   $data->id;
  $orderdate        =   $data->orderdate;
  $deliverydate     =   $data->deliverydate;
  $cart             =   $data->cart;
  $item             =   $data->item;
  $amount           =   $data->amount;
  $status           =   $data->status;
  $ordernum         =   $data->ordernum;
  $comment          =   $data->comment;

  $qry = "UPDATE tbl_cart SET orderdate = '$orderdate', deliverydate = '$deliverydate', cart = '$cart', item = '$item', amount='$amount', status='$status', ordernum = '$ordernum', comment = '$comment' WHERE id = '$id'";
  $qry_res = mysql_query($qry);
  if ($qry_res) {
    $arr = array('msg' => "Data updated Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    print_r($jsn);
  }else {
    $arr = array('msg' => "", 'error' => 'Application Error occured, Please check the LOG file for more details or contact system Administrator');
    $jsn = json_encode($arr);
    trigger_error(mysql_error());
    print_r($jsn);
  }
}
?>