<?php
include('../../../users/config.php');
include('../../../config/log_handler.php');

get_carfuel_data();

  /** Function to Push Product **/
 function get_carfuel_data() {

  // PARAMETERS FROM PL SIDE
  $carmodel = $_GET['carmodel'];
  $limit = $_GET['limit'];
  $offset = $_GET['offset'];

  $data = json_decode(file_get_contents("php://input"));

  // QUERY TO GET THE TOTAL COUNT 
  $qry_count = mysql_query("SELECT * FROM VIEW_CAR_FUEL WHERE CAR = '" .$carmodel."'");
  $num_rows = mysql_num_rows($qry_count);

  // QUERY TO GET SUM
  $qry_sum = mysql_query("SELECT SUM(AMOUNT) as TOTAL_AMOUNT FROM VIEW_CAR_FUEL  WHERE CAR = '" .$carmodel."'");
  $sum_rows = mysql_fetch_assoc($qry_sum); 
  $sum = $sum_rows['TOTAL_AMOUNT'];

  // QUERY TO GET THE LIST OF ITEMS
  $qry = "SELECT * FROM VIEW_CAR_FUEL WHERE CAR = '" .$carmodel."' LIMIT $limit OFFSET $offset" ;
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
      $data_item[]   = array(
        "ID"                  =>  $rows['ID'],
        "CAR"                 =>  $rows['CAR'],
        "FILLED_DATE"         =>  $rows['FILLED_DATE'],
        "AMOUNT"              =>  $rows['AMOUNT'],
        "COMMENT"             =>  $rows['COMMENT']
        );
    }
    $data_count=array("COUNT"=> $num_rows);
    $data_total=array("TOTAL"=> $sum);
    $data[]->item = $data_item;
    $data[]->count = $data_count;
    $data[]->total = $data_total;
    echo(json_encode($data));
    return json_encode($data);
  }

 
}
?>
