<?php
include('../../users/config.php');
include('../../config/log_handler.php');

push_cart_data();


  /** Function to Push Product **/
 function push_cart_data() {
  $data = json_decode(file_get_contents("php://input"));
  $orderdate        =   $data->orderdate;
  $deliverydate     =   $data->deliverydate;
  $cart             =   $data->cart;
  $item             =   $data->item;
  $amount           =   $data->amount;
  $status           =   $data->status;
  $ordernum         =   $data->ordernum;
  $comment          =   $data->comment;


  //$ll_code = 'AA123';
  $qryValidate = "SELECT * FROM tbl_cart where ordernum = '$ordernum'";
  $result = mysql_query($qryValidate);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $num_rows =  mysql_num_rows($result);
    if($num_rows > 0){
      $arr = array('msg' => "", 'error' => 'Order Number is already avaialble');
      $jsn = json_encode($arr);
      trigger_error("Order number is already avaialble", E_USER_NOTICE);
      print_r($jsn);
    }else {
      $qry = "INSERT INTO tbl_cart (orderdate, deliverydate, cart, item, amount, status, ordernum, comment) VALUES ('$orderdate', '$deliverydate', '$cart', '$item', '$amount', '$status', '$ordernum', '$comment')";
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
  }

 
}
?>
