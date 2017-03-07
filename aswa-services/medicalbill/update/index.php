<?php
include('../../users/config.php');
include('../../config/log_handler.php');

put_medicalbill_data();

  /** Function to Push Product **/
 function put_medicalbill_data() {
  $data       =   json_decode(file_get_contents("php://input"));
  $id         =   $data->id;
  $billmonth  =   $data->billmonth;
  $billno     =   $data->billno;
  $billtype   =   $data->billtype;
  $user       =   $data->user;
  $amount     =   $data->amount;
  $comment    =  $data->comment;

  $qry = "UPDATE tbl_medicalbill SET billmonth = '$billmonth', billno = '$billno', billtype = '$billtype', amount = '$amount', user = '$user', comment = '$comment' WHERE id = '$id'";
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