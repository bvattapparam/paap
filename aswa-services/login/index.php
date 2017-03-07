<?php
include('../users/config.php');

switch($_GET['action']) {
  case 'get_user_data' :
  get_user_data();
  break;

}

/** Function to Get Product **/
function get_user_data() {
  $data = json_decode(file_get_contents("php://input"));
  $passkey = $data->passkey;
  $qry = "SELECT * from VIEW_AUTH where password = '$passkey'";
  $qry_res = mysql_query($qry);
    $data = array();
  while($rows = mysql_fetch_array($qry_res))
  {
    $data[] = array(
      "userId" => $rows['userid'],
      "user" => $rows['user'],
      "firstName" => $rows['firstname'],
      "lastName" => $rows['lastname'],
      "role" => $rows['role']
    );
  }
  echo(json_encode($data));
return json_encode($data);
}

?>
