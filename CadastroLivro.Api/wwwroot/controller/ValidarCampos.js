sap.ui.define([
	"sap/ui/base/ManagedObject",

], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.ValidarCampos", {

		validarData : function(dataRecebida){
		
			let valorStatus = "None";
			let falhaValidacao = false;
			if (!dataRecebida.isValidValue() || dataRecebida.getValue() == ""){
				valorStatus = "Error";
				falhaValidacao = true;
			}
			dataRecebida.setValueState(valorStatus);
			dataRecebida.setValueStateText("Data Inválida");
			return falhaValidacao;
			 
		},

        validarEntrada: function (oInput) {

			let valorStatus = "None";
			let falhaValidacao = false;
			let oBinding = oInput.getBinding("value");
            
			try {
				oBinding.getType().validateValue(oInput.getValue());
					falhaValidacao = false;
					valorStatus = "None";
				
			} catch (Exception) {
				valorStatus = "Error";
				falhaValidacao = true;
			}
			
			oInput.setValueState(valorStatus);
			return falhaValidacao;
            
		},
	});
});
	