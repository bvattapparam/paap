<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  push_fuel_data();

  /** Function to Push Product **/
  function push_fuel_data() {

    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    
    $FILLED_DATE            = $data->FILLED_DATE;
    $CAR                    = $data->CAR;
    $AMOUNT                 = $data->AMOUNT;
    $COMMENT                = $data->COMMENT;



    $qry =  "INSERT INTO VIEW_CAR_FUEL (FILLED_DATE,AMOUNT,CAR,COMMENT) VALUES ('$FILLED_DATE', '$AMOUNT', '$CAR', '$COMMENT')";

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
