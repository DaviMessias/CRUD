sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.ValidarCampos", {

		validarData : function(dataRecebida){
		
			var valorStatus = "None";
			var falhaValidacao = false;
			if (!dataRecebida.isValidValue() || dataRecebida.getValue() == ""){
				valorStatus = "Error";
				falhaValidacao = true;
			}
			dataRecebida.setValueState(valorStatus);
			dataRecebida.setValueStateText("Data Inválida");
			return falhaValidacao;
			 
		},

        validarEntrada: function (oInput) {

            //setando status
			var valorStatus = "None";
			var falhaValidacao = false;
			var oBinding = oInput.getBinding("value");
            
			try {
				oBinding.getType().validateValue(oInput.getValue());
					falhaValidacao = false;
					valorStatus = "None";
				
			} catch (Exception) {
				valorStatus = "Error";
				falhaValidacao = true;
				//oInput.setValueStateText("Campo Inválido");
			}

			oInput.setValueState(valorStatus);
			return falhaValidacao;
            
		},
	});
});
	