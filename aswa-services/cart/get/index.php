<?php
include('../../users/config.php');
include('../../config/log_handler.php');

get_cart_data();

  /** Function to Push Product **/
 function get_cart_data() {

  $data = json_decode(file_get_contents("php://input"));
 /* $billstartmonth    =   $data->billstartmonth;
  $billendmonth      =   $data->billendmonth;*/

   $qry = "SELECT * FROM tbl_cart";
   //echo

   /*if($billstartmonth && $billendmonth){
    $qry .= " WHERE billmonth >= '$billstartmonth' AND billmonth <= '$billendmonth'";
   }
   if($billstartmonth && !$billendmonth){
    $qry .= " WHERE billmonth >= '$billstartmonth'"; 
   }
  if(!$billstartmonth && $billendmonth){
    $qry .= " WHERE billmonth <='$billendmonth'"; 
   }*/
  
  $result = mysql_query($qry);
  if(!$result){
    $arr = array('msg' => "", 'error' => 'Unknown Exception occurred.');
    $jsn = json_encode($arr);
    trigger_error("Issue with mysql_query. Please check the detailed log", E_USER_NOTICE);
    trigger_error(mysql_error());
    print_r($jsn);
  }else{
    $data   = array();
    while($rows = mysql_fetch_array($result)){
      $data[]   = array(
        "id"            =>  $rows['id'],
        "orderdate"     =>  $rows['orderdate'],
        "deliverydate"  =>  $rows['deliverydate'],
        "cart"          =>  $rows['cart'],
        "amount"        =>  $rows['amount'],
        "item"          =>  $rows['item'],
        "status"        =>  $rows['status'],
        "ordernum"      =>  $rows['ordernum'],
        "comment"       =>  $rows['comment']
        );
    }
    print_r(json_encode($data));
    //return json_encode($data);
  }

 
}
?>
