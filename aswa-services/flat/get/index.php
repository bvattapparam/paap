<?php
include('../../users/config.php');
include('../../config/log_handler.php');

get_flat_basic_data();

  /** Function to Push Product **/
 function get_flat_basic_data() {

  $data = json_decode(file_get_contents("php://input"));
  
  $qry = "SELECT * FROM VIEW_FLATBASICDETAILS";
  
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
        "ID"                  =>  $rows['ID'],
        "CONTACT_PERSON_1"    =>  $rows['CONTACT_PERSON_1'],
        "CONTACT_PERSON_2"    =>  $rows['CONTACT_PERSON_2'],
        "FLOOR"               =>  $rows['FLOOR'],
        "BLOCK"               =>  $rows['BLOCK'],
        "NAME"                =>  $rows['NAME'],
        "BOOKEDDATE"          =>  $rows['BOOKEDDATE'],
        "ADDRESS"             =>  $rows['ADDRESS']
        );
    }
    
    print_r(json_encode($data));
  }

 
}
?>
