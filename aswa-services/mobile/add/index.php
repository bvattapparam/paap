<?php
include('../../users/config.php');
include('../../config/log_handler.php');

push_mobile_data();


  /** Function to Push Product **/
 function push_mobile_data() {
  $data = json_decode(file_get_contents("php://input"));
  $billmonth      =   $data->billmonth;
  $billno         =   $data->billno;
  $amount         =   $data->amount;
  $user           =   $data->user;
  $comment        =   $data->comment;

  //$ll_code = 'AA123';
  $qryValidate = "SELECT * FROM tbl_mobile where billno = '$billno'";
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
      $arr = array('msg' => "", 'error' => 'Bill Number is already avaialble');
      $jsn = json_encode($arr);
      trigger_error("Bill number is already avaialble", E_USER_NOTICE);
      print_r($jsn);
    }else {
      $qry = "INSERT INTO tbl_mobile (billmonth, billno, amount, user, comment) VALUES ('$billmonth', '$billno', '$amount', '$user', '$comment')";
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
