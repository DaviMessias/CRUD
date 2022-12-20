sap.ui.define([
	"sap/ui/base/ManagedObject",
	
], function(ManagedObject) { 
	"use strict";

	const caminhoServicos = "sap.ui.demo.walkthrough.controller.Servicos"
	return ManagedObject.extend(caminhoServicos, {

		NavegarParaRota : function(nomeDaRota, id){
			let rota = this.getOwnerComponent().getRouter();
			rota.navTo( nomeDaRota , {
				id: id
			});
		},

		definirDataValida: function(){
			const idDataPicker = "DP6";
			this.byId(idDataPicker).setMinDate(new Date(1800, 0, 1));
			this.byId(idDataPicker).setMaxDate(new Date);
		},

		limparCampos: function(){
			const estadoDoCampo = "None"
			const idInputs = ["input-nome","input-autor","input-editora","DP6"]

			let arrayDeEntradas = [];
			let tela = this.getView();

			for(let i in idInputs){
				arrayDeEntradas[i] = tela.byId(idInputs[i]);
			};
				arrayDeEntradas.forEach(element => element.setValueState(estadoDoCampo));
		}
	});
});
	