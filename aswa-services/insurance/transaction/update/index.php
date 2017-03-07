<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');
  
  put_insurance_transaction_data();


  /** Function to Push Product **/
  function put_insurance_transaction_data() {
    $data = json_decode(file_get_contents("php://input"));

    $ID                         = $data->ID;
    $POLICYNO                   = $data->POLICYNO;
    $PAID_DATE                  = $data->PAID_DATE;
    $AMOUNT                     = $data->AMOUNT;
    $PAYMENT_MODE               = $data->PAYMENT_MODE;
    $COMMENT                    = $data->COMMENT;

   $qry = "UPDATE VIEW_INSURANCE_TRANSACTION SET POLICYNO='$POLICYNO', PAID_DATE='$PAID_DATE', AMOUNT = '$AMOUNT', PAYMENT_MODE='$PAYMENT_MODE', COMMENT = '$COMMENT' WHERE ID = $ID";

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
