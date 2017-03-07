<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

put_ll_data();

  /** Function to Push Product **/
 function put_ll_data() {
  $data = json_decode(file_get_contents("php://input"));
  $ll_id        =   $data->id;
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

  $qry = "UPDATE tbl_landlord SET ll_name = '$ll_name', ll_type = '$ll_type', ll_address = '$ll_address', ll_contact = '$ll_contact', ll_dop = '$ll_dop', ll_comment='$ll_comment', ll_status = '$ll_status', ll_code = '$ll_code', ll_pan = '$ll_pan', ll_advance = '$ll_advance' WHERE ll_id = '$ll_id'";
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
?>