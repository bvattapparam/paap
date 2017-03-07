<?php
include('../../users/config.php');
  put_travel_data();


  /** Function to Push Product **/
  function put_travel_data() {
    $data = json_decode(file_get_contents("php://input"));
    print_r($data);
    $travel_id = $data->id;
    $travel_icon = $data->icon;
    $travel_source = $data->source;
    $travel_destination = $data->destination;
    $travel_pnr = $data->pnr;
    $travel_date = $data->traveldate;
    $travel_booked_date = $data->bookeddate;
    $travel_status = $data->status;
    $travel_amount = $data->amount;
    $travel_comment = $data->comment;

    $qry = "UPDATE tbl_travel SET travel_icon = '$travel_icon', travel_source='$travel_source', travel_destination='$travel_destination', travel_date='$travel_date', travel_booked_date = '$travel_booked_date', travel_status='$travel_status', travel_amount='$travel_amount', travel_comment = '$travel_comment' WHERE travel_id = $travel_id";
    $qry_res = mysql_query($qry);
    if ($qry_res) {
    $arr = array('msg' => "Travel data updated Successfully!!!", 'error' => '');
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
