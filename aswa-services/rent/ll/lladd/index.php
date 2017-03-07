<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');
push_ll_data();


  /** Function to Push Product **/
 function push_ll_data() {
  $data = json_decode(file_get_contents("php://input"));
  $ll_name      =   $data->name;
  $ll_type      =   $data->type;
  $ll_address   =   $data->address;
  $ll_contact   =   $data->contact;
  $ll_dop       =   $data->dop;
  $ll_comment   =   $data->comment;
  $ll_dov       =   $data->dov;
  $ll_status    =   $data->status;
  $ll_code      =   $data->llcode;
  $ll_pan       =   $data->pan;
  $ll_advance   =   $data->advance;

  //$ll_code = 'AA123';
  $qryValidate = "SELECT * FROM tbl_landlord where ll_code = '$ll_code'";
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
      $arr = array('msg' => "", 'error' => 'Landlord is already avaialble');
      $jsn = json_encode($arr);
      trigger_error("LL Code is already avaialble", E_USER_NOTICE);
      print_r($jsn);
    }else {
      $qry = "INSERT INTO tbl_landlord (ll_name,ll_type,ll_address,ll_contact,ll_dop,ll_comment,ll_dov,ll_status,ll_code,ll_pan,ll_advance) VALUES ('$ll_name','$ll_type','$ll_address','$ll_contact','$ll_dop','$ll_comment','$ll_dov','$ll_status','$ll_code','$ll_pan','$ll_advance')";
      $qry_res = mysql_query($qry);
      if ($qry_res) {
        $arr = array('msg' => "Land lord data updated Successfully!!!", 'error' => '');
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
