<?php
include('../../users/config.php');
include('../../config/log_handler.php');

switch($_GET['action']) {
  case 'get_insurancemaster' :
    get_insurancemaster_data();
  break;
  case 'get_insurancemaster_policyno':
    get_insurancemaster_policyno_data();
  break;
}



  /** Function to Push Product **/
 function get_insurancemaster_data() {

  $data = json_decode(file_get_contents("php://input"));
  
  $qry = "SELECT * FROM VIEW_INSURANCEMASTER";
  
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
      $data[]   = array(
        "ID"                          =>  $rows['ID'],
        "NAME"                        =>  $rows['NAME'],
        "POLICYNO"                    =>  $rows['POLICYNO'],
        "SUM_ASSURED"                 =>  $rows['SUM_ASSURED'],
        "START_DATE"                  =>  $rows['START_DATE'],
        "MATURITY_DATE"               =>  $rows['MATURITY_DATE'],
        "POLICY_TYPE"                 =>  $rows['POLICY_TYPE'],
        "PREMIUM"                     =>  $rows['PREMIUM'],
        "NOMINEE"                     =>  $rows['NOMINEE'],
        "NOMINEE_RELATIONSHIP"        =>  $rows['NOMINEE_RELATIONSHIP'],
        "COMMENT"                     =>  $rows['COMMENT']
        );
    }
    
    print_r(json_encode($data));
  }

 
}

/** Function to get policy number **/
 function get_insurancemaster_policyno_data() {

  $data = json_decode(file_get_contents("php://input"));
  
  $qry = "SELECT POLICYNO, POLICY_TYPE FROM VIEW_INSURANCEMASTER";
  
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
      $data[]   = array(
        "POLICYNO"                    =>  $rows['POLICYNO'],
        "POLICY_TYPE"                 =>  $rows['POLICY_TYPE']
        );
    }
    
    print_r(json_encode($data));
  }

 
}

?>
