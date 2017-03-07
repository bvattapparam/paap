<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  push_insurance_transaction_data();

  /** Function to Push Product **/
  function push_insurance_transaction_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    
    $POLICYNO                   = $data->POLICYNO;
    $PAID_DATE                  = $data->PAID_DATE;
    $AMOUNT                     = $data->AMOUNT;
    $PAYMENT_MODE               = $data->PAYMENT_MODE;
    $COMMENT                    = $data->COMMENT;



    $qry =  "INSERT INTO VIEW_INSURANCE_TRANSACTION (POLICYNO, PAID_DATE, AMOUNT, PAYMENT_MODE, COMMENT) VALUES('$POLICYNO', '$PAID_DATE', '$AMOUNT', '$PAYMENT_MODE', '$COMMENT')";

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
