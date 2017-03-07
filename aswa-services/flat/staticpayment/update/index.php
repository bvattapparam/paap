<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');
  
  put_flatstaticpayment_data();


  /** Function to Push Product **/
  function put_flatstaticpayment_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $ID                   = $data->ID;
    $PAID_DATE            = $data->PAID_DATE;
    $MODE                 = $data->MODE;
    $CHEQUE_NUMBER        = $data->CHEQUE_NUMBER;
    $DD_NUMBER            = $data->DD_NUMBER;
    $WIRETRANSFER_ID      = $data->WIRETRANSFER_ID;
    $MCH_NUMBER           = $data->MCH_NUMBER;
    $PURPOSE                = $data->PURPOSE;
    $RECEIPT_NUMBER       = $data->RECEIPT_NUMBER;
    $AMOUNT               = $data->AMOUNT;
    $CONTACT_PERSON       = $data->CONTACT_PERSON;
    $COMMENT              = $data->COMMENT;


    $qry = "UPDATE VIEW_FLATBASICPAYMENT SET PAID_DATE = '$PAID_DATE', MODE='$MODE', CHEQUE_NUMBER='$CHEQUE_NUMBER', DD_NUMBER='$DD_NUMBER', WIRETRANSFER_ID = '$WIRETRANSFER_ID', MCH_NUMBER='$MCH_NUMBER', PURPOSE='$PURPOSE', RECEIPT_NUMBER = '$RECEIPT_NUMBER', AMOUNT = '$AMOUNT', CONTACT_PERSON = '$CONTACT_PERSON',  COMMENT = '$COMMENT' WHERE ID = $ID";

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
