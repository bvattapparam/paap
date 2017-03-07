<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

  push_flatstaticpayment_data();

  /** Function to Push Product **/
  function push_flatstaticpayment_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    
    $PAID_DATE            = $data->PAID_DATE;
    $MODE                 = $data->MODE;
    $CHEQUE_NUMBER        = $data->CHEQUE_NUMBER;
    $DD_NUMBER            = $data->DD_NUMBER;
    $WIRETRANSFER_ID      = $data->WIRETRANSFER_ID;
    $MCH_NUMBER           = $data->MCH_NUMBER;
    $PURPOSE              = $data->PURPOSE;
    $RECEIPT_NUMBER       = $data->RECEIPT_NUMBER;
    $AMOUNT               = $data->AMOUNT;
    $CONTACT_PERSON       = $data->CONTACT_PERSON;
    $COMMENT              = $data->COMMENT;



    $qry =  "INSERT INTO VIEW_FLATBASICPAYMENT (PAID_DATE, MODE, CHEQUE_NUMBER, DD_NUMBER, WIRETRANSFER_ID, PURPOSE, RECEIPT_NUMBER, AMOUNT, CONTACT_PERSON, COMMENT) VALUES ('$PAID_DATE', '$MODE', '$CHEQUE_NUMBER', '$DD_NUMBER', '$WIRETRANSFER_ID', '$PURPOSE', '$RECEIPT_NUMBER', '$AMOUNT', '$CONTACT_PERSON', '$COMMENT')";

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
