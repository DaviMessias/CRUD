sap.ui.define([
	"sap/ui/demo/walkthrough/controller/Servicos",
	"sap/ui/demo/walkthrough/controller/Repositorio",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",

], function (Servicos,Repositorio,Controller, JSONModel, MessageBox) {
	"use strict";

	
	const caminhoDetalhes = "sap.ui.demo.walkthrough.controller.Detalhes";
	return Controller.extend(caminhoDetalhes, {
		_servico: null,
		_repositorio: null,

		onInit: function () {
			const nomeDaRota = "detalhes";

			this._servico = new Servicos();
			this._repositorio = new Repositorio();

			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(nomeDaRota).attachPatternMatched(this._aoCoincidirObjeto, this);
		},

		_aoCoincidirObjeto : function (oEvent) {
			const parametroDoEvento = 'arguments';

			let idDoLivro = window.decodeURIComponent(oEvent.getParameter(parametroDoEvento).id);
				this.carregarLivroSelecionado(idDoLivro);
		},

		carregarLivroSelecionado : function(id){
			const nomeModelo = "Livro";
			this._repositorio.BuscarPorId(id)
				.then(livroDoBanco => {
				let livro = new JSONModel(livroDoBanco)
					this.getView().setModel(livro, nomeModelo)
				})
		},

		aoClicarEmBotaoVoltar: function () {
			const nomeDaRota = "lista";

			this._servico.NavegarParaRota.bind(this)(nomeDaRota, null)
		},

		aoPressionarEditar : function(){
			const nomeModelo = "Livro";
			const nomeDaRota = "editar";

			let idLivroASerEditado = this.getView().getModel(nomeModelo).getData().id;

			this._servico.NavegarParaRota.bind(this)(nomeDaRota, idLivroASerEditado)
		},

		aoPressionarExcluir: function(){
			const nomeModelo = "Livro";
			const nomeDaRota = "lista";
			const mensagemConfirmacao = "mensagemAoClicarExcluir";
			const tituloMensagemAoClicarExcluir= "tituloMensagemAoClicarExcluir";

			let livroASerDeletado = this.getView().getModel(nomeModelo).getData();
			
			MessageBox.warning(
				this.buscari18n(mensagemConfirmacao),
				{
					title : this.buscari18n(tituloMensagemAoClicarExcluir),
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose: (oAction) => { 
						if (oAction == "OK"){
							this._repositorio.DeletarLivro(livroASerDeletado.id);
							this._servico.NavegarParaRota.bind(this)(nomeDaRota,null)
							} 
					}
				});
		},

		buscari18n: function(chave) {
			const modelo = "i18n";
			let i18n = this.getView().getModel(modelo).getResourceBundle();
			return i18n.getText(chave);
		}
	});
});
