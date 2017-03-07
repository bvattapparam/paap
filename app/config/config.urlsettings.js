(function(){
	var urlsettings = {
		"validationConfigService.getValidationConfig"	: 	"../validation/validator.json",
		"rent.getdata" 								: 	"../aswa-services/rent/?action=get_rent_data",
		"rent.updatedata"							:	"../aswa-services/rent/?action=put_rent_data",
		"rent.adddata"								:	"../aswa-services/rent/?action=push_rent_data",
		"rent.getll"								:	"../aswa-services/rent/?action=get_ll_data",
		"rent.getlandlorddetails"					:	"../aswa-services/rent/?action=get_ll_details&llcode",
		"rent.getrentdatabyll"						:	"../aswa-services/rent/?action=get_rent_data_by_ll&llcode",
		
		"gas.getdata"								:	"../aswa-services/gas/?action=get_gas_data",
		"gas.getagent"								:	"../aswa-services/gas/?action=get_agent_data",

		"dashboard.getiowe"							:	"../aswa-services/iowe/?action=get_iowe_data",
		"dashboard.getbr"							:	"../aswa-services/billreminders/?action=get_br_data",
		"dashboard.getgrandtotal"					:	"../aswa-services/grandtotal/?action=get_grandtotal_data",
		"dashboard.getksfedetails"					:	"../aswa-services/ksfe/?action=get_ksfe_data",

		"landlord.updatedata"						: 	"../aswa-services/rent/ll/llupdate/",
		"landlord.adddata"							: 	"../aswa-services/rent/ll/lladd/",

		"mobile.getmobile"							: 	"../aswa-services/mobile/get/",
		"medicalbill.getmedicalbill"				: 	"../aswa-services/medicalbill/get/",
		"medicalbill.adddata"						: 	"../aswa-services/medicalbill/add/",
		"medicalbill.updatedata"					: 	"../aswa-services/medicalbill/update/",

		"cart.getcart"								: 	"../aswa-services/cart/get/",
		"cart.adddata"								: 	"../aswa-services/cart/add/",
		"cart.updatedata"							: 	"../aswa-services/cart/update/",
		"reference.getreferencedata"				: 	"../aswa-services/references/get/",

		"flatData.getflatbasicdetails"				: 	"../aswa-services/flat/get/",
		"flatData.pushFlatStaticPaymentData"		: 	"../aswa-services/flat/staticpayment/add/",
		"flatData.getFlatStaticPaymentData"			: 	"../aswa-services/flat/staticpayment/get/",
		"flatData.putFlatStaticPaymentData"			: 	"../aswa-services/flat/staticpayment/update/",

		"insuranceData.getInsuranceMasterDetails"			: 	"../aswa-services/insurance/get/?action=get_insurancemaster",
		"insuranceData.putInsuranceData"					: 	"../aswa-services/insurance/update/",
		"insuranceData.pushInsuranceData"					: 	"../aswa-services/insurance/add/",
		
		"insuranceData.pushInsuranceTrnxData"				: 	"../aswa-services/insurance/transaction/add/",
		"insuranceData.putInsuranceTrnxData"				: 	"../aswa-services/insurance/transaction/update/",
		"insuranceData.getInsuranceTrnxDetails"				: 	"../aswa-services/insurance/transaction/get/?policyno",
		"insuranceData.getInsurancePolicy"					: 	"../aswa-services/insurance/get/?action=get_insurancemaster_policyno",

		"carmanager.getFuel"						: 	"../aswa-services/carmanager/fuel/get/?carmodel",
		"carmanager.pushFuelData"					: 	"../aswa-services/carmanager/fuel/add/",
		"carmanager.putFuelData"					: 	"../aswa-services/carmanager/fuel/update/",
		"carmanager.getService"						: 	"../aswa-services/carmanager/service/get/?carmodel",
		"carmanager.pushServiceData"				: 	"../aswa-services/carmanager/service/add/",
		"carmanager.putServiceData"					: 	"../aswa-services/carmanager/service/update/",
		"carmanager.getOthers"						: 	"../aswa-services/carmanager/others/get/?carmodel",
		"carmanager.pushOthersData"					: 	"../aswa-services/carmanager/others/add/",
		"carmanager.putOthersData"					: 	"../aswa-services/carmanager/others/update/"
	}

	angular.module('aswa').constant('urlsettings',urlsettings);
})();
