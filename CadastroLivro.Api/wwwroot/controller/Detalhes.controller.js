sap.ui.define([
	"sap/ui/demo/walkthrough/controller/Servicos",
	"sap/ui/demo/walkthrough/controller/Repositorio",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"

], function (Servicos,Repositorio,Controller, JSONModel, MessageBox, MessageToast) {
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
			var _servicos = new Servicos()
			var rota = this.getOwnerComponent().getRouter();
			_servicos.mudarRota(rota,"lista")
			
		},

		aoPressionarEditar : function(){
			var idLivroASerEditado = this.getView().getModel("Livro").getData().id
			var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("editar", {
						id: idLivroASerEditado
				});
		},

		aoPressionarExcluir : function(){
			let livroASerDeletado = this.getView().getModel("Livro").getData();
			const nomeDaRota = "lista";
			MessageBox.warning(
				"Confirmar exclusão do livro?",
				{
					title : "Excluir livro?",
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose:(oAction) => { 
						if (oAction == "OK"){

							let repositorio = new Repositorio();
							 repositorio.DeletarLivro(livroASerDeletado.id);
							MessageToast.show("Livro deletado");
							this.mudarRota(nomeDaRota)
							} 
					}
				});
		},

		mudarRota :  function(nomeRota){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(nomeRota);
		},
	});
});
