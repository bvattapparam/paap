<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_grandtotal_data' :
  get_grandtotal_data();
  break;
}

/** Function to Get I Owe data **/
function get_grandtotal_data() {
 //$qry = mysql_query('SELECT id, item,amount,billdate,status, FROM_UNIXTIME(billdate) from tbl_billreminders WHERE MONTH(FROM_UNIXTIME(billdate)) = MONTH(CURDATE()) AND YEAR(FROM_UNIXTIME(billdate)) = YEAR(CURDATE())');
  $qry = mysql_query('SELECT (SELECT SUM(rent_amount) FROM tbl_rent) AS rentTotal, (SELECT SUM(amount) FROM tbl_medicalbill) AS medicalbillTotal, (SELECT SUM(amount_paid) FROM tbl_gas) AS gasTotal, (SELECT SUM(sub_amount) FROM tbl_gas) as subsTotal, (SELECT SUM(amount) FROM tbl_mobile) as mobileTotal, (SELECT SUM(travel_amount) FROM tbl_travel) as travelTotal, (SELECT SUM(AMOUNT) FROM VIEW_FLATBASICPAYMENT) as FLATBASIC_PAYMENT_TOTAL, (SELECT SUM(PREMIUM) FROM VIEW_INSURANCEMASTER) as INSURANCE_POLICY_TOTAL, (SELECT SUM(AMOUNT) FROM VIEW_CAR_FUEL) as CAR_FUEL_TOTAL,(SELECT SUM(AMOUNT) FROM VIEW_CAR_SERVICE) as CAR_SERVICE_TOTAL, (SELECT SUM(AMOUNT) FROM VIEW_CAR_OTHERS) as CAR_OTHERS_TOTAL');
  $data = array();
  while($rows = mysql_fetch_array($qry))
  {
    $data[] = array(
      "rentTotal"                 =>    $rows['rentTotal'],
      "gasTotal"                  =>    $rows['gasTotal'],
      "subsTotal"                 =>    $rows['subsTotal'],
      "medicalbillTotal"          =>    $rows['medicalbillTotal'],
      "mobileTotal"               =>    $rows['mobileTotal'],
      "travelTotal"               =>    $rows['travelTotal'],
      "FLATBASIC_PAYMENT_TOTAL"   =>    $rows['FLATBASIC_PAYMENT_TOTAL'],
      "INSURANCE_POLICY_TOTAL"    =>    $rows['INSURANCE_POLICY_TOTAL'],
      "CAR_FUEL_TOTAL"            =>    $rows['CAR_FUEL_TOTAL'],
      "CAR_SERVICE_TOTAL"         =>    $rows['CAR_SERVICE_TOTAL'],
      "CAR_OTHERS_TOTAL"          =>    $rows['CAR_OTHERS_TOTAL']
    );
  }
echo(json_encode($data));
return json_encode($data);
}

?>
