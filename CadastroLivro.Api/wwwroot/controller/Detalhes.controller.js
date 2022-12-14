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
			let rota = this.getOwnerComponent().getRouter().getRoute('detalhes');
			if(!!rota){
				rota.attachPatternMatched(this._aoCoincidirObjeto, this)
			}
		},

		_aoCoincidirObjeto : function (oEvent) {
			let idDoLivro = window.decodeURIComponent(oEvent.getParameter("arguments").id);
				this.exibirLivroSelecionado(idDoLivro);
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
			const nomeDaRota = "lista";
			const idVazio = "";
			this.NavegarPara(idVazio,nomeDaRota)
		},

		aoPressionarEditar : function(){
			var idLivroASerEditado = this.getView().getModel("Livro").getData().id;
			const nomeDaRota = "editar";

			this.NavegarPara(idLivroASerEditado, nomeDaRota)
		},

		aoPressionarExcluir: function(){
			let livroASerDeletado = this.getView().getModel("Livro").getData();
			const nomeDaRota = "lista";
			MessageBox.warning(
				"Confirmar exclusão do livro?",
				{
					title : "Excluir livro?",
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose: (oAction) => { 
						if (oAction == "OK"){

							let repositorio = new Repositorio();
							 repositorio.DeletarLivro(livroASerDeletado.id);
							this.NavegarPara(livroASerDeletado.id, nomeDaRota)
							} 
					}
				});
		},

		NavegarPara : function(idNavegacao, endPoint){
			let _servico = new Servicos();
			_servico.NavegarParaRota.bind(this)(idNavegacao,endPoint);
		},
	});
});
