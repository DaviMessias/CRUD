sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._onObjectMatched, this);
		},


		_onObjectMatched: function (oEvent) {
			var salvarId = window.decodeURIComponent(oEvent.getParameter("arguments").id);
				this.exibirLivroSelecionado(salvarId);
		},

		
		exibirLivroSelecionado : function(idLivro){

			this.buscarLivroSelecionado(idLivro)
				.then(livroDoBanco => {
				let livro = new JSONModel(livroDoBanco)
				this.getView().setModel(livro, "Livro")

			})
		},
	
		buscarLivroSelecionado: async function(idLivro){
			
			return await fetch(`https://localhost:7187/api/livro/${idLivro}`)
			.then(res => res.json())

			
		},
		aoClicarEmBotaoVoltar: function () {
			
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("lista");
		},

		aoPressionarEditar : function(oEvent){
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("editar");
		},

		aoPressionarExcluir : function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("lista");
		}
	});
});
