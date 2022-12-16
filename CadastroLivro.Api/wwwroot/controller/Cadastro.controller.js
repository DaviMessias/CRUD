    sap.ui.define([
		"sap/ui/demo/walkthrough/controller/Servicos",
		"sap/ui/demo/walkthrough/controller/Repositorio",
		"sap/ui/demo/walkthrough/controller/ValidarCampos",
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageBox",
	

    ], function(Servicos,Repositorio,ValidarCampos,Controller, JSONModel, MessageBox ) {
    "use strict";
    
    return Controller.extend("sap.ui.demo.walkthrough.controller.Cadastro", {
        onInit: function () {
			let rotaDaView = sap.ui.core.UIComponent.getRouterFor(this);
			rotaDaView.attachRoutePatternMatched(this._aoCoincidirObjeto, this);
		},

		_aoCoincidirObjeto : function (evento) {
			const nomeDaRota = "editar";
			let _servicos = new Servicos();
			_servicos.definirDataValida.bind(this)()

			this.limparCampos();

			let id;
			let rotaPraEditar = evento.getParameter("name") == nomeDaRota;
			
			rotaPraEditar
				? (id = window.decodeURIComponent(evento.getParameter("arguments").id),
				  this.carregarLivro(id))
				: this._criarModeloDoLivro();
		},
		
		aoPressionarSalvar: function () {
			const nomeModelo = "Livro";
			const idDataPicker = "DP6";
			const idInputs = ["input-nome", "input-autor", "input-editora"];
			const mensagemDeErroValidacao = "Ocorreu um erro de validação. Complete todos os campos primeiro.";

			let livro = this.getView().getModel(nomeModelo).getData();
			let dataInputada = this.getView().byId(idDataPicker);
			let _validacao = new ValidarCampos();

			let tela = this.getView(),
				arrayDeEntradas = [ 
				tela.byId(idInputs[0]),
				tela.byId(idInputs[1]),
				tela.byId(idInputs[2]),
			]
			let falha_Validacao = _validacao.validarCampos(arrayDeEntradas, dataInputada);

			if (falha_Validacao) {
				MessageBox.alert(mensagemDeErroValidacao)
				return;
			}
			
			livro.id
				? this.editarLivro(livro)
				: this.criarLivro(livro)
		},

		criarLivro: function (livroASerCriado){
			const nomeDaRota = "detalhes";

			let _repositorio = new Repositorio();
			return _repositorio.CriarNovoLivro(livroASerCriado)
				.then(livroCriado => 
					this.navegarPara(nomeDaRota, livroCriado.id));
		},

		editarLivro: function(livroASerEditado) {
			const nomeDaRota = "detalhes";
			let _repositorio = new Repositorio();
			debugger

			_repositorio.EditarLivro(livroASerEditado)
				this.navegarPara(nomeDaRota, livroASerEditado.id);
		},


		_criarModeloDoLivro: function(){
			const nomeModelo = "Livro";
			const stringVazia= "";
			
			let modeloLivro = new JSONModel({
				nome: stringVazia,
				autor: stringVazia,
				editora: stringVazia,
				data: stringVazia,
			});
			this.getView().setModel(modeloLivro, nomeModelo);
		},

		carregarLivro: function(id){
			const nomeModelo = 'Livro';
			this.limparCampos();
			let modeloLivro = new JSONModel();

			let _repositorio = new Repositorio();
			_repositorio.BuscarPorId(id)
					.then(livroDoBanco => {
					this.getView().setModel(modeloLivro = livroDoBanco, nomeModelo)
			})
		},

		
		aoMudarData: function(evento) {
			let _validacao = new ValidarCampos();
			let dataInputada = evento.getSource();
			_validacao.validarData(dataInputada);
		},

		aoMudarEntrada: function(evento) {
			let _validacao = new ValidarCampos();
			let entrada = evento.getSource();
			_validacao.validarEntrada(entrada);
		},

		limparCampos : function(){
			const estadoDoCampo = "None"
			const idInputs = ["input-nome","input-autor","input-editora","DP6"]

			let tela = this.getView(),
			arrayDeEntradas = [
			tela.byId(idInputs[0]),
			tela.byId(idInputs[1]),
			tela.byId(idInputs[2]),
			tela.byId(idInputs[3]),
			]
				arrayDeEntradas.forEach(element => element.setValueState(estadoDoCampo));
		},

		aoClicarEmVoltar: function(){
			const nomeDaRota = "lista";

			MessageBox.warning(
				"As edições feitas neste livro não serão salvas.",
				{
				title : "Sair da página?",
				actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
				phasizedAction: MessageBox.Action.OK,
				initialFocus: MessageBox.Action.CANCEL,
				onClose: (oAction) => { 
					if (oAction === "OK"){
						this.navegarPara(nomeDaRota, null)
					}
				}
				});
		},

		navegarPara: function(endPoint, idNavegacao){			
			let _servico = new Servicos();
			_servico.NavegarParaRota.bind(this)(endPoint, idNavegacao);
		},
	});
});
