<?php
include('../../users/config.php');
include('../../config/log_handler.php');

  push_insurance_data();

  /** Function to Push Product **/
  function push_insurance_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    
    $NAME                       = $data->NAME;
    $POLICYNO                   = $data->POLICYNO;
    $SUM_ASSURED                = $data->SUM_ASSURED;
    $START_DATE                 = $data->START_DATE;
    $MATURITY_DATE              = $data->MATURITY_DATE;
    $POLICY_TYPE                = $data->POLICY_TYPE;
    $PREMIUM                    = $data->PREMIUM;
    $NOMINEE                    = $data->NOMINEE;
    $NOMINEE_RELATIONSHIP       = $data->NOMINEE_RELATIONSHIP;
    $COMMENT                    = $data->COMMENT;



    $qry =  "INSERT INTO VIEW_INSURANCEMASTER (NAME, POLICYNO, SUM_ASSURED, START_DATE, MATURITY_DATE, POLICY_TYPE, PREMIUM, NOMINEE, NOMINEE_RELATIONSHIP, COMMENT) VALUES ('$NAME', '$POLICYNO', '$SUM_ASSURED', '$START_DATE', '$MATURITY_DATE', '$POLICY_TYPE', '$PREMIUM', '$NOMINEE', '$NOMINEE_RELATIONSHIP', '$COMMENT')";

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
