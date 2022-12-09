sap.ui.define([
	"sap/ui/demo/walkthrough/controller/Repositorio",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"

], function (Repositorio,Controller, JSONModel, MessageBox, MessageToast) {
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

		
		exibirLivroSelecionado : function(id){
			let repositorio = new Repositorio();
			let livroRetornado = repositorio.BuscarPorId(id);

			livroRetornado.then(livroDoBanco => {
			let livro = new JSONModel(livroDoBanco)
				this.getView().setModel(livro, "Livro")
			})
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

		aoPressionarExcluir :  function(){
			
			let livroASerDeletadoTeste = this.getView().getModel("Livro").getData();
			let idLivroASerDeletadoTeste = livroASerDeletadoTeste.id

			MessageBox.warning(
				"Confirmar exclusão do livro?",
				{
					title : "Excluir livro?",
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose: async function (oAction) { 
						if (oAction == "OK"){

							let repositorio = new Repositorio();
							repositorio.DeletarLivro(idLivroASerDeletadoTeste);
							MessageToast.show("Livro deletado");
							}
					}
				});
		}
	});
});
