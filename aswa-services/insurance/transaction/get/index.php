<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

get_insurancetransaction_data();

  /** Function to Push Product **/
 function get_insurancetransaction_data() {
  
  $data = json_decode(file_get_contents("php://input"));
  $policyno = $_GET['policyno'];

  // QUERY TO GET THE TOTAL COUNT 
  $qry_count = mysql_query("SELECT * FROM VIEW_INSURANCE_TRANSACTION WHERE POLICYNO = '" .$policyno."'");
  $num_rows = mysql_num_rows($qry_count);

  // QUERY TO GET SUM
  $qry_sum = mysql_query("SELECT SUM(AMOUNT) as TOTAL_AMOUNT FROM VIEW_INSURANCE_TRANSACTION  WHERE policyno = '" .$policyno."'");
  $sum_rows = mysql_fetch_assoc($qry_sum); 
  $sum = $sum_rows['TOTAL_AMOUNT'];

  
  $qry = "SELECT * FROM VIEW_INSURANCE_TRANSACTION WHERE POLICYNO ='$policyno'";
  
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
        "ID"                          =>  $rows['ID'],
        "POLICYNO"                    =>  $rows['POLICYNO'],
        "PAID_DATE"                   =>  $rows['PAID_DATE'],
        "AMOUNT"                      =>  $rows['AMOUNT'],
        "PAYMENT_MODE"                =>  $rows['PAYMENT_MODE'],
        "COMMENT"                     =>  $rows['COMMENT']
        );
    }
    
    $data_count=array("COUNT"=> $num_rows);
    $data_total=array("TOTAL"=> $sum);
    $data[]->item = $data_item;
    $data[]->count = $data_count;
    $data[]->total = $data_total;
    echo(json_encode($data));
    return json_encode($data);
  }

 
}
?>
