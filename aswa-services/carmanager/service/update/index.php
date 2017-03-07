<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');
  
  put_service_data();


  /** Function to Push Product **/
  function put_service_data() {

    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $ID                     = $data->ID;
    $DATE                   = $data->DATE;
    $SERVICE_STATION        = $data->SERVICE_STATION;
    $CAR                    = $data->CAR;
    $AMOUNT                 = $data->AMOUNT;
    $COMMENT                = $data->COMMENT;


    $qry = "UPDATE VIEW_CAR_SERVICE SET SERVICE_STATION = '$SERVICE_STATION', DATE = '$DATE', CAR='$CAR', AMOUNT='$AMOUNT', COMMENT = '$COMMENT' WHERE ID = $ID";

    $qry_res = mysql_query($qry);
    if ($qry_res) {
    $arr = array('msg' => "Data updated Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    print_r($jsn);
    }
    else {
    $arr = array('msg' => "", 'error' => 'Error In inserting record');
    $jsn = json_encode($arr);
     print_r($jsn);
    }
  }




?>
