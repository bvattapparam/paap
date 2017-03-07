<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

get_flatstaticpayment_data();

  /** Function to Push Product **/
 function get_flatstaticpayment_data() {
   $limit = $_GET['limit'];
  $offset = $_GET['offset'];

  $data = json_decode(file_get_contents("php://input"));

  $qry_count = mysql_query("SELECT * from VIEW_FLATBASICPAYMENT");
  $num_rows = mysql_num_rows($qry_count);
  
  $qry = "SELECT * FROM VIEW_FLATBASICPAYMENT LIMIT $limit OFFSET $offset";
  
  $result = mysql_query($qry);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data  = array();
    while($rows = mysql_fetch_array($result)){
      $data_item[]   = array(
        "ID"                  =>  $rows['ID'],
        "PAID_DATE"           =>  $rows['PAID_DATE'],
        "MODE"                =>  $rows['MODE'],
        "CHEQUE_NUMBER"       =>  $rows['CHEQUE_NUMBER'],
        "DD_NUMBER"           =>  $rows['DD_NUMBER'],
        "MCH_NUMBER"          =>  $rows['MCH_NUMBER'],
        "WIRETRANSFER_ID"     =>  $rows['WIRETRANSFER_ID'],
        "PURPOSE"             =>  $rows['PURPOSE'],
        "RECEIPT_NUMBER"      =>  $rows['RECEIPT_NUMBER'],
        "AMOUNT"              =>  $rows['AMOUNT'],
        "CONTACT_PERSON"      =>  $rows['CONTACT_PERSON'],
        "COMMENT"             =>  $rows['COMMENT']
        );
    }
    
    $data_total=array("TOTAL"=> $num_rows);
  $data[]->item = $data_item;
  $data[]->total = $data_total;
  echo(json_encode($data));
  return json_encode($data);
  }

 
}
?>
