sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._aoCoincidirObjeto , this);
		},


		_aoCoincidirObjeto : function (oEvent) {
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

		aoPressionarEditar : function(){
				var idLivroASerEditado = this.getView().getModel("Livro").getData().id
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("editar", {
					id: idLivroASerEditado
				});
				
		},

		aoPressionarExcluir : async function(){
				//var oRouter = this.getOwnerComponent().getRouter();

				let LivroASerDeletado = this.getView().getModel("Livro").getData();
				let idLivroASerDeletado = LivroASerDeletado.id

				 fetch(`https://localhost:7187/api/livro/${idLivroASerDeletado}`, {
					method: 'DELETE'
					})

				MessageToast.show("Livro deletado");
		}
	});
});
