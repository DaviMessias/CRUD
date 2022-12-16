sap.ui.define([
	"sap/ui/base/ManagedObject"

], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Servicos", {
		NavegarParaRota : function(endPoint, id){
			let rota = this.getOwnerComponent().getRouter();
			rota.navTo( endPoint , {
				id: id
			});
		},

		definirDataValida: function(){
			const idDataPicker = "DP6";
			this.byId(idDataPicker).setMinDate(new Date(1800, 0, 1));
			this.byId(idDataPicker).setMaxDate(new Date);
		},
	});
});
	