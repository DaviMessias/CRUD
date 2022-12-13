sap.ui.define([
	"sap/ui/base/ManagedObject"

], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Servicos", {
		
		mudarRota :  function(rota, nomeDaRota){
			
			return rota.navTo(nomeDaRota);
		},
	});
});
	