<?php
include('../../users/config.php');
include('../../config/log_handler.php');

get_reference_data();

  /** Main function to get the reference static data from reference tables **/
 function get_reference_data() {

  
$QRY_RENTSTATUS           =   "SELECT * FROM VIEW_REF_RENTSTATUS";
$QRY_TRAVELSTATUS         =   "SELECT * FROM VIEW_REF_TRAVELSTATUS";
$QRY_TRAVELICON           =   "SELECT * FROM VIEW_REF_TRAVELICON";
$QRY_LANDLORDSTATUS       =   "SELECT * FROM VIEW_REF_LANDLORDSTATUS";
$QRY_LANDLORDNAMES        =   "SELECT * FROM VIEW_REF_LANDLORDNAMES";
$QRY_LANDLORDTYPES        =   "SELECT * FROM VIEW_REF_LANDLORDTYPES";
$QRY_LANDLORDTYPEICON     =   "SELECT * FROM VIEW_REF_LANDLORDTYPEICON";
$QRY_MEDICALBILLUSERS     =   "SELECT * FROM VIEW_REF_MEDICALBILLUSERS";
$QRY_MEDICALBILLTYPES     =   "SELECT * FROM VIEW_REF_MEDICALBILLTYPES";
$QRY_FILTERSTATUS         =   "SELECT * FROM VIEW_REF_FILTERSTATUS";
$QRY_GASSUBSTATUS         =   "SELECT * FROM VIEW_REF_GASSUBSTATUS";
$QRY_GASORDERSTATUS       =   "SELECT * FROM VIEW_REF_GASORDERSTATUS";
$QRY_RENTRECEIPT          =   "SELECT * FROM VIEW_REF_RENTRECEIPT";
$QRY_GENERICSTATUS        =   "SELECT * FROM VIEW_REF_GENERICSTATUS";
$QRY_GENERICSTATUSTWO     =   "SELECT * FROM VIEW_REF_GENERICSTATUSTWO";
$QRY_EXPENSECATEGORY      =   "SELECT * FROM VIEW_REF_EXPENSECATEGORY";
$QRY_CART                 =   "SELECT * FROM VIEW_REF_CART";
$QRY_CARTSTATUS           =   "SELECT * FROM VIEW_REF_CARTSTATUS";
$QRY_MOBILEUSERS          =   "SELECT * FROM VIEW_REF_MOBILEUSERS";
$QRY_PAYMENTMODE          =   "SELECT * FROM VIEW_REF_PAYMENTMODE";
$QRY_INSURANCETYPE        =   "SELECT * FROM VIEW_REF_INSURANCE_TYPE";
$QRY_CAR                  =   "SELECT * FROM VIEW_REF_CAR";
$QRY_CARMODULETYPE        =   "SELECT * FROM VIEW_REF_CAR_MODULE_TYPE";
$QRY_CARMODEL             =   "SELECT * FROM VIEW_REF_CAR_MODEL";

	
$RESULT_RENTSTATUS                  =		mysql_query($QRY_RENTSTATUS);
$RESULT_TRAVELSTATUS                =		mysql_query($QRY_TRAVELSTATUS);
$RESULT_TRAVELICON                  =		mysql_query($QRY_TRAVELICON);
$RESULT_LANDLORDSTATUS              =		mysql_query($QRY_LANDLORDSTATUS);
$RESULT_LANDLORDNAMES               =		mysql_query($QRY_LANDLORDNAMES);  
$RESULT_LANDLORDTYPES               =		mysql_query($QRY_LANDLORDTYPES);
$RESULT_LANDLORDTYPEICON            =		mysql_query($QRY_LANDLORDTYPEICON);
$RESULT_MEDICALBILLUSERS            =		mysql_query($QRY_MEDICALBILLUSERS); 
$RESULT_MEDICALBILLTYPES            =		mysql_query($QRY_MEDICALBILLTYPES); 
$RESULT_FILTERSTATUS		            =		mysql_query($QRY_FILTERSTATUS); 
$RESULT_GASSUBSTATUS		            =		mysql_query($QRY_GASSUBSTATUS);
$RESULT_GASORDERSTATUS		          =		mysql_query($QRY_GASORDERSTATUS); 
$RESULT_RENTRECEIPT			            =		mysql_query($QRY_RENTRECEIPT); 
$RESULT_GENERICSTATUS               =		mysql_query($QRY_GENERICSTATUS); 
$RESULT_GENERICSTATUSTWO	          =		mysql_query($QRY_GENERICSTATUSTWO); 
$RESULT_EXPENSECATEGORY		          =		mysql_query($QRY_EXPENSECATEGORY); 
$RESULT_CART 				                =		mysql_query($QRY_CART); 
$RESULT_CARTSTATUS 			            =		mysql_query($QRY_CARTSTATUS); 
$RESULT_MOBILEUSERS                 =   mysql_query($QRY_MOBILEUSERS); 
$RESULT_PAYMENTMODE                 =   mysql_query($QRY_PAYMENTMODE); 
$RESULT_INSURANCETYPE               =   mysql_query($QRY_INSURANCETYPE);
$RESULT_CAR                         =   mysql_query($QRY_CAR);
$RESULT_CARMODULETYPE               =   mysql_query($QRY_CARMODULETYPE); 
$RESULT_CARMODEL                    =   mysql_query($QRY_CARMODEL); 

$DATA  = array();

// Rent Status reference data
while($ROWS_RENTSTATUS	=	mysql_fetch_array($RESULT_RENTSTATUS)){
  $DATA_RENTSTATUS[]	=	array(
    "id"          	=>  $ROWS_RENTSTATUS['ID'],
    "code"   		    =>  $ROWS_RENTSTATUS['CODE'],
    "name"      	  =>  $ROWS_RENTSTATUS['NAME'],
    "status"    	  =>  $ROWS_RENTSTATUS['STATUS']
    );
};


// Travel Status reference data
while($ROWS_TRAVELSTATUS	=	mysql_fetch_array($RESULT_TRAVELSTATUS)){
  $DATA_TRAVELSTATUS[]	=	array(
    "id"          	=>  $ROWS_TRAVELSTATUS['ID'],
    "code"   	    	=>  $ROWS_TRAVELSTATUS['CODE'],
    "name"      	  =>  $ROWS_TRAVELSTATUS['NAME'],
    "status"    	  =>  $ROWS_TRAVELSTATUS['STATUS']
    );
};

 // Travel Icon reference data
while($ROWS_TRAVELICON	=	mysql_fetch_array($RESULT_TRAVELICON)){
  $DATA_TRAVELICON[]	=	array(
    "id"          	=>  $ROWS_TRAVELICON['ID'],
    "code"   		    =>  $ROWS_TRAVELICON['CODE'],
    "name"      	  =>  $ROWS_TRAVELICON['NAME'],
    "status"    	  =>  $ROWS_TRAVELICON['STATUS']
    );
};

// Landlord Status reference data
while($ROWS_LANDLORDSTATUS	=	mysql_fetch_array($RESULT_LANDLORDSTATUS)){
  $DATA_LANDLORDSTATUS[]	=	array(
    "id"          	=>  $ROWS_LANDLORDSTATUS['ID'],
    "code"   		    =>  $ROWS_LANDLORDSTATUS['CODE'],
    "name"      	  =>  $ROWS_LANDLORDSTATUS['NAME'],
    "status"    	  =>  $ROWS_LANDLORDSTATUS['STATUS']
    );
};
// Landlord names reference data
while($ROWS_LANDLORDNAMES	=	mysql_fetch_array($RESULT_LANDLORDNAMES)){
  $DATA_LANDLORDNAMES[]	=	array(
    "id"          	=>  $ROWS_LANDLORDNAMES['ID'],
    "code"   		    =>  $ROWS_LANDLORDNAMES['CODE'],
    "name"      	  =>  $ROWS_LANDLORDNAMES['NAME'],
    "status"    	  =>  $ROWS_LANDLORDNAMES['STATUS']
    );
};

  // Landlord types reference data
  while($ROWS_LANDLORDTYPES	=	mysql_fetch_array($RESULT_LANDLORDTYPES)){
    $DATA_LANDLORDTYPES[]	=	array(
    "id"          	=>  $ROWS_LANDLORDTYPES['ID'],
    "code"   		    =>  $ROWS_LANDLORDTYPES['CODE'],
    "name"      	  =>  $ROWS_LANDLORDTYPES['NAME'],
    "status"    	  =>  $ROWS_LANDLORDTYPES['STATUS']
    );
  };

  // Landlord types icon reference data
  while($ROWS_LANDLORDTYPEICON	=	mysql_fetch_array($RESULT_LANDLORDTYPEICON)){
    $DATA_LANDLORDTYPEICON[]	=	array(
      "id"          	=>  $ROWS_LANDLORDTYPEICON['ID'],
      "code"   		    =>  $ROWS_LANDLORDTYPEICON['CODE'],
      "name"      	  =>  $ROWS_LANDLORDTYPEICON['NAME'],
      "status"    	  =>  $ROWS_LANDLORDTYPEICON['STATUS']
      );
  };
  // Medical Bill Users reference data
  while($ROWS_MEDICALBILLUSERS	=	mysql_fetch_array($RESULT_MEDICALBILLUSERS)){
    $DATA_MEDICALBILLUSERS[]	=	array(
      "id"          	=>  $ROWS_MEDICALBILLUSERS['ID'],
      "code"   		    =>  $ROWS_MEDICALBILLUSERS['CODE'],
      "name"      	  =>  $ROWS_MEDICALBILLUSERS['NAME'],
      "status"      	=>  $ROWS_MEDICALBILLUSERS['STATUS']
      );
  };
   // Medical Bill types reference data
  while($ROWS_MEDICALBILLTYPES	=	mysql_fetch_array($RESULT_MEDICALBILLTYPES)){
    $DATA_MEDICALBILLTYPES[]	=	array(
      "id"          	=>  $ROWS_MEDICALBILLTYPES['ID'],
      "code"   		    =>  $ROWS_MEDICALBILLTYPES['CODE'],
      "name"      	  =>  $ROWS_MEDICALBILLTYPES['NAME'],
      "status"    	  =>  $ROWS_MEDICALBILLTYPES['STATUS']
      );
  };
   // Filter Status reference data
  while($ROWS_FILTERSTATUS	=	mysql_fetch_array($RESULT_FILTERSTATUS)){
    $DATA_FILTERSTATUS[]	=	array(
      "id"          	=>  $ROWS_FILTERSTATUS['ID'],
      "code"   		    =>  $ROWS_FILTERSTATUS['CODE'],
      "name"      	  =>  $ROWS_FILTERSTATUS['NAME'],
      "status"    	  =>  $ROWS_FILTERSTATUS['STATUS']
      );
  };
   
  // Gas Sub Status reference data
  while($ROWS_GASSUBSTATUS	=	mysql_fetch_array($RESULT_GASSUBSTATUS)){
    $DATA_GASSUBSTATUS[]	=	array(
      "id"          	=>  $ROWS_GASSUBSTATUS['ID'],
      "code"   		    =>  $ROWS_GASSUBSTATUS['CODE'],
      "name"      	  =>  $ROWS_GASSUBSTATUS['NAME'],
      "status"    	  =>  $ROWS_GASSUBSTATUS['STATUS']
      );
  };

  // Gas Sub Status reference data
  while($ROWS_GASORDERSTATUS	=	mysql_fetch_array($RESULT_GASORDERSTATUS)){
    $DATA_GASORDERSTATUS[]	=	array(
      "id"          	=>  $ROWS_GASORDERSTATUS['ID'],
      "code"   		    =>  $ROWS_GASORDERSTATUS['CODE'],
      "name"      	  =>  $ROWS_GASORDERSTATUS['NAME'],
      "status"    	  =>  $ROWS_GASORDERSTATUS['STATUS']
      );
  };

  // Rent receipt status reference data
  while($ROWS_RENTRECEIPT	=	mysql_fetch_array($RESULT_RENTRECEIPT)){
    $DATA_RENTRECEIPT[]	=	array(
      "id"          	=>  $ROWS_RENTRECEIPT['ID'],
      "code"   		    =>  $ROWS_RENTRECEIPT['CODE'],
      "name"      	  =>  $ROWS_RENTRECEIPT['NAME'],
      "status"    	  =>  $ROWS_RENTRECEIPT['STATUS']
      );
  };
  // Generic Status reference data
  while($ROWS_GENERICSTATUS	=	mysql_fetch_array($RESULT_GENERICSTATUS)){
    $DATA_GENERICSTATUS[]	=	array(
      "id"          	=>  $ROWS_GENERICSTATUS['ID'],
      "code"   		    =>  $ROWS_GENERICSTATUS['CODE'],
      "name"      	  =>  $ROWS_GENERICSTATUS['NAME'],
      "status"    	  =>  $ROWS_GENERICSTATUS['STATUS']
      );
  };

  // Generic Status two reference data
  while($ROWS_GENERICSTATUSTWO	=	mysql_fetch_array($RESULT_GENERICSTATUSTWO)){
    $DATA_GENERICSTATUSTWO[]	=	array(
      "id"          	=>  $ROWS_GENERICSTATUSTWO['ID'],
      "code"   		    =>  $ROWS_GENERICSTATUSTWO['CODE'],
      "name"      	  =>  $ROWS_GENERICSTATUSTWO['NAME'],
      "status"    	  =>  $ROWS_GENERICSTATUSTWO['STATUS']
      );
  };

  // Expense Category reference data
  while($ROWS_EXPENSECATEGORY	=	mysql_fetch_array($RESULT_EXPENSECATEGORY)){
    $DATA_EXPENSECATEGORY[]	=	array(
      "id"          	=>  $ROWS_EXPENSECATEGORY['ID'],
      "code"   		    =>  $ROWS_EXPENSECATEGORY['CODE'],
      "name"      	  =>  $ROWS_EXPENSECATEGORY['NAME'],
      "status"    	  =>  $ROWS_EXPENSECATEGORY['STATUS']
      );
  };
  // Cart reference data
  while($ROW_CART	=	mysql_fetch_array($RESULT_CART)){
    $DATA_CART[]	=	array(
      "id"          	=>  $ROW_CART['ID'],
      "code"   		    =>  $ROW_CART['CODE'],
      "name"      	  =>  $ROW_CART['NAME'],
      "status"    	  =>  $ROW_CART['STATUS']
      );
  };
  // Cart status reference data
  while($ROW_CARTSTATUS	=	mysql_fetch_array($RESULT_CARTSTATUS)){
    $DATA_CARTSTATUS[]	=	array(
      "id"          	=>  $ROW_CARTSTATUS['ID'],
      "code"   		    =>  $ROW_CARTSTATUS['CODE'],
      "name"      	  =>  $ROW_CARTSTATUS['NAME'],
      "status"    	  =>  $ROW_CARTSTATUS['STATUS']
      );
  };

// mobile users reference data
  while($ROW_MOBILEUSERS = mysql_fetch_array($RESULT_MOBILEUSERS)){
    $DATA_MOBILEUSERS[]  = array(
      "id"            =>  $ROW_MOBILEUSERS['ID'],
      "code"          =>  $ROW_MOBILEUSERS['CODE'],
      "name"          =>  $ROW_MOBILEUSERS['NAME'],
      "status"        =>  $ROW_MOBILEUSERS['STATUS']
      );
  };

  // payment mode reference data
  while($ROW_PAYMENTMODE = mysql_fetch_array($RESULT_PAYMENTMODE)){
    $DATA_PAYMENTMODE[]  = array(
      "id"            =>  $ROW_PAYMENTMODE['ID'],
      "code"          =>  $ROW_PAYMENTMODE['CODE'],
      "name"          =>  $ROW_PAYMENTMODE['NAME'],
      "status"        =>  $ROW_PAYMENTMODE['STATUS']
      );
  };

  //INSURANCE TYPE
  // payment mode reference data
  while($ROW_INSURANCETYPE = mysql_fetch_array($RESULT_INSURANCETYPE)){
    $DATA_INSURANCETYPE[]  = array(
      "id"            =>  $ROW_INSURANCETYPE['ID'],
      "code"          =>  $ROW_INSURANCETYPE['CODE'],
      "name"          =>  $ROW_INSURANCETYPE['NAME'],
      "status"        =>  $ROW_INSURANCETYPE['STATUS']
      );
  };
    

  //CAR 
  while($ROW_CAR = mysql_fetch_array($RESULT_CAR)){
    $DATA_CAR[]  = array(
      "id"            =>  $ROW_CAR['ID'],
      "code"          =>  $ROW_CAR['CODE'],
      "name"          =>  $ROW_CAR['NAME'],
      "status"        =>  $ROW_CAR['STATUS']
      );
  };
 while($ROW_CARMODULETYPE = mysql_fetch_array($RESULT_CARMODULETYPE)){
    $DATA_CARMODULETYPE[]  = array(
      "id"            =>  $ROW_CARMODULETYPE['ID'],
      "code"          =>  $ROW_CARMODULETYPE['CODE'],
      "name"          =>  $ROW_CARMODULETYPE['NAME'],
      "status"        =>  $ROW_CARMODULETYPE['STATUS']
      );
  };
  while($ROW_CARMODEL = mysql_fetch_array($RESULT_CARMODEL)){
    $DATA_CARMODEL[]  = array(
      "id"            =>  $ROW_CARMODEL['ID'],
      "code"          =>  $ROW_CARMODEL['CODE'],
      "name"          =>  $ROW_CARMODEL['NAME'],
      "status"        =>  $ROW_CARMODEL['STATUS']
      );
  };
    //echo json_encode($data_travelstatus);

    $DATA["rentStatus"]            =	  $DATA_RENTSTATUS;
    $DATA["travelStatus"]          =	  $DATA_TRAVELSTATUS;
    $DATA["travelIcon"]            =	  $DATA_TRAVELICON;
    $DATA["landlordStatus"]        =	  $DATA_LANDLORDSTATUS;
    $DATA["landlordNames"]         =	  $DATA_LANDLORDNAMES;
    $DATA["landlordTypes"]         =	  $DATA_LANDLORDTYPES;
    $DATA["landlordTypeIcon"]      =	  $DATA_LANDLORDTYPEICON;
    $DATA["medicalbillUsers"]      =	  $DATA_MEDICALBILLUSERS;
    $DATA["medicalbillTypes"]      =	  $DATA_MEDICALBILLTYPES;
    $DATA["filterStatus"]          =	  $DATA_FILTERSTATUS;
    $DATA["gasSubStatus"]		       =	  $DATA_GASSUBSTATUS;
    $DATA["gasOrderStatus"]        =	  $DATA_GASORDERSTATUS;
    $DATA["rentReceipt"]			     =	  $DATA_RENTRECEIPT;
    $DATA["genericStatus"]         =	  $DATA_GENERICSTATUS;
    $DATA["genericStatusTwo"]      =	  $DATA_GENERICSTATUSTWO;
    $DATA["expenseCategory"]	     =	  $DATA_EXPENSECATEGORY;
    $DATA["cart"]                  =	  $DATA_CART;
    $DATA["cartStatus"]            =	  $DATA_CARTSTATUS;
    $DATA["mobileusers"]           =    $DATA_MOBILEUSERS;
    $DATA["paymentMode"]           =    $DATA_PAYMENTMODE;
    $DATA["insuranceType"]         =    $DATA_INSURANCETYPE;
    $DATA["car"]                   =    $DATA_CAR;
    $DATA["carModuleType"]         =    $DATA_CARMODULETYPE;
    $DATA["carModEL"]              =    $DATA_CARMODEL;

    echo json_encode($DATA);

 
}
?>
