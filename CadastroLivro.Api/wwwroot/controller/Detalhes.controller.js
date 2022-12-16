sap.ui.define([
	"sap/ui/demo/walkthrough/controller/Servicos",
	"sap/ui/demo/walkthrough/controller/Repositorio",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",

], function (Servicos,Repositorio,Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this._aoCoincidirObjeto, this);
		},

		_aoCoincidirObjeto : function (oEvent) {
			const parametroDoEvento = 'arguments';

			let idDoLivro = window.decodeURIComponent(oEvent.getParameter(parametroDoEvento).id);
				this.carregarLivroSelecionado(idDoLivro);
		},

		carregarLivroSelecionado : function(id){
			const nomeModelo = "Livro";

			let _repositorio = new Repositorio();

			let livroRetornado = _repositorio.BuscarPorId(id);

			livroRetornado.then(livroDoBanco => {
			let livro = new JSONModel(livroDoBanco)
				this.getView().setModel(livro, nomeModelo)
			})
		},

		aoClicarEmBotaoVoltar: function () {
			const nomeDaRota = "lista";
			this.NavegarPara(nomeDaRota, null)
		},

		aoPressionarEditar : function(){
			let idLivroASerEditado = this.getView().getModel("Livro").getData().id;
			const nomeDaRota = "editar";

			this.NavegarPara(nomeDaRota, idLivroASerEditado)
		},

		aoPressionarExcluir: function(){
			let livroASerDeletado = this.getView().getModel("Livro").getData();
			const nomeDaRota = "lista";
			MessageBox.warning(
				"Confirmar exclusão do livro",
				{
					title : "Excluir livro?",
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose: (oAction) => { 
						if (oAction == "OK"){

							let _repositorio = new Repositorio();
							 _repositorio.DeletarLivro(livroASerDeletado.id);
							this.NavegarPara(nomeDaRota, livroASerDeletado.id)
							} 
					}
				});
		},

		NavegarPara : function(endPoint, idNavegacao){
			let _servico = new Servicos();
			_servico.NavegarParaRota.bind(this)(endPoint,idNavegacao);
		},
	});
});
