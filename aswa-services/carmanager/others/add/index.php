<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  push_others_data();

  /** Function to Push Product **/
  function push_others_data() {

    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    
    $DATE                   = $data->DATE;
    $ITEM                   = $data->ITEM;
    $CAR                    = $data->CAR;
    $AMOUNT                 = $data->AMOUNT;
    $COMMENT                = $data->COMMENT;



    $qry =  "INSERT INTO VIEW_CAR_OTHERS (ITEM,DATE,AMOUNT,CAR,COMMENT) VALUES ('$ITEM','$DATE', '$AMOUNT', '$CAR', '$COMMENT')";

 //$qry =  "INSERT INTO VIEW_CAR_SERVICE (DATE,SERVICE_STATION) VALUES ('$DATE',$SERVICE_STATION')";


    $qry_res = mysql_query($qry);
    if ($qry_res) {
    $arr = array('msg' => "Entry Added Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    // print_r($jsn);
    }
    else {
    $arr = array('msg' => "", 'error' => 'Error In inserting record');
    $jsn = json_encode($arr);
    // print_r($jsn);
    }
  }




?>
