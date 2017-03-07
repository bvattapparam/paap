<?php
include('config.php');

switch($_GET['action']) {
case 'add_product' :
add_product();
break;

case 'get_product' :
get_product();
break;

case 'edit_product' :
edit_product();
break;

case 'delete_product' :
delete_product();
break;

case 'update_product' :
update_product();
break;
}



/** Function to Get Product **/

function get_product() {
$qry = mysql_query('SELECT * from tbl_authentication');
$data = array();
while($rows = mysql_fetch_array($qry))
{
$data[] = array(
"firstname" => $rows['firstname'],
"lastname" => $rows['lastname'],
"role" => $rows['role']
);
}
echo(json_encode($data));
//return json_encode($data);
}

?>
