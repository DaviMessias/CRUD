sap.ui.define([
	"sap/ui/base/ManagedObject"

], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Servicos", {
		NavegarParaRota : function(idTeste, endPoint){
			let rota = this.getOwnerComponent().getRouter();
			rota.navTo( endPoint , {
				id: idTeste
			});
		}
	});
});
	