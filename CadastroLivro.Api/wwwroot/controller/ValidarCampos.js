sap.ui.define([
	"sap/ui/base/ManagedObject",

], function(ManagedObject) { 
	"use strict";

	const caminhoValidarCampos ="sap.ui.demo.walkthrough.controller.ValidarCampos";
	return ManagedObject.extend(caminhoValidarCampos, {
		
		_i18n:null,
		definiri18n : function(modeloI18N){
			this._i18n = modeloI18N;
		},

		validarCampos: function(arrayDeEntradas,dataRecebida){
			let falha_Validacao = false;

			arrayDeEntradas.forEach( entrada => {
				falha_Validacao =  this.validarEntrada(entrada) || falha_Validacao;
			});
			falha_Validacao = this.validarData(dataRecebida) || falha_Validacao;

			return falha_Validacao;
		},

		validarData : function(dataRecebida){
			const erroData = this._i18n.getText("erroData.i18n")
			
			let valorStatus = "None";
			let falhaValidacao = false;
			if (!dataRecebida.isValidValue() || dataRecebida.getValue() == ""){
				valorStatus = "Error";
				falhaValidacao = true;
			}
			dataRecebida.setValueState(valorStatus);
			dataRecebida.setValueStateText(erroData);
			return falhaValidacao;
		},

        validarEntrada: function (entrada) {
			let valorStatus = "None";
			let falhaValidacao = false;
			let oBinding = entrada.getBinding("value");
			try {
				oBinding.getType().validateValue(entrada.getValue());
					falhaValidacao = false;
					valorStatus = "None";
			} catch (Exception) {
				valorStatus = "Error";
				falhaValidacao = true;
			}
			entrada.setValueState(valorStatus);
			return falhaValidacao;
		},
		
		
	});
});
	