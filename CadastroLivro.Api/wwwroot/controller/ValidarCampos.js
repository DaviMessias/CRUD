sap.ui.define([
	"sap/ui/base/ManagedObject",

], function(ManagedObject) { 
	"use strict";

	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.ValidarCampos", {

		validarCampos: function(arrayDeEntradas,dataRecebida){
			let falha_Validacao = false;

			arrayDeEntradas.forEach( entrada => {
				falha_Validacao =  this.validarEntrada(entrada) || falha_Validacao;
			});
			falha_Validacao = this.validarData(dataRecebida) || falha_Validacao;

			return falha_Validacao;
			
		},

		validarData : function(dataRecebida){
			const textoDeStatusError="Data Inválida"
			
			let valorStatus = "None";
			let falhaValidacao = false;
			if (!dataRecebida.isValidValue() || dataRecebida.getValue() == ""){
				valorStatus = "Error";
				falhaValidacao = true;
			}
			dataRecebida.setValueState(valorStatus);
			dataRecebida.setValueStateText(textoDeStatusError);
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
	