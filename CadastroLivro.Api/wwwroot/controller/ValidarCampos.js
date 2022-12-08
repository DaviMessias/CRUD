sap.ui.define([
	"sap/ui/base/ManagedObject"
], function( ManagedObject) { 
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


	// Tenho que definir as datas aceitas
			// var valorStatus = "None";
			// var falhaValidacao = false;
			// var valorData=dataRecebida.getValue();

			// if(dataRecebida == ''){
			// 	MessageBox.alert("Preencha a data");
			// 	valorStatus = "Error"
			// 	falhaValidacao = true;
			// }else{
			// var dataCerta = new Date(dataRecebida).toISOString();

            //  let dataMin = new Date(1860, 0, 1).toISOString();
            //  let dataMax = new Date().toISOString();
			// 		if(dataCerta < dataMin || dataCerta > dataMax){
			// 			falhaValidacao = true;
			// 			valorStatus = "Error";
								
			// 		}else{
			// 			MessageBox.alert("Data Inválida");
			// 		}
			// }




        // validarInput: function (oInput) {
		// 	var valorStatus = "None";
		// 	var falhaValidacao = false;
		// 	var oBinding = oInput.getBinding("value");

		// 	try {
		// 		oBinding.getType().validateValue(oInput.getValue());
		// 	} catch (oException) {
		// 		valorStatus = "Error";
		// 		falhaValidacao = true;
		// 	}

		// 	oInput.setValueState(valorStatus);

		// 	return falhaValidacao;
		// },

		// coletarInputs: function () {
		// 	// coleta os controles de entrada
		// 	var oView = this.getView(),
		// 		aInputs = [
		// 		oView.byId("input-nome"),
		// 		oView.byId("input-autor"),
		// 		oView.byId("input-editora"),
				
		// 	],
		// 		falhaValidacao = false;

		// 	// verifica se as entradas não estão vazias.
		// 	// A validação não ocorre durante a vinculação de dados, pois ela é acionada apenas por ações do usuário.

		// 	aInputs.forEach(function (oInput) {
		// 		falhaValidacao = this.validarInput(oInput) || falhaValidacao;
		// 	}, this);

		// 	if (!falhaValidacao) {

		// 		if(!oView.byId("DP6").isValidValue()){
		// 			MessageBox.alert("Data Inválida");
		// 		 }
				 
		// 	} else {
		// 		MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
		// 	}
		// },
