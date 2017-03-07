<?php
include('../../users/config.php');
include('../../config/log_handler.php');
  
  put_insurance_data();


  /** Function to Push Product **/
  function put_insurance_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);

    $ID                         = $data->ID;
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


    $qry = "UPDATE VIEW_INSURANCEMASTER SET NAME = '$NAME', POLICYNO='$POLICYNO', SUM_ASSURED='$SUM_ASSURED', START_DATE='$START_DATE', MATURITY_DATE = '$MATURITY_DATE', POLICY_TYPE='$POLICY_TYPE', PREMIUM='$PREMIUM', NOMINEE = '$NOMINEE', NOMINEE_RELATIONSHIP = '$NOMINEE_RELATIONSHIP',  COMMENT = '$COMMENT' WHERE ID = $ID";




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
