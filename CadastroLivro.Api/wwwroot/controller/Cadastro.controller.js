    sap.ui.define([
		"sap/ui/demo/walkthrough/controller/Servicos",
		"sap/ui/demo/walkthrough/controller/Repositorio",
		"sap/ui/demo/walkthrough/controller/ValidarCampos",
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageBox",

    ], function(Servicos, Repositorio, ValidarCampos, Controller, JSONModel, MessageBox) {
    "use strict";
	
    const caminhoCadastro= "sap.ui.demo.walkthrough.controller.Cadastro";
    return Controller.extend(caminhoCadastro, {
		_servico: null,
		_repositorio: null,
		_validacao:null,

        onInit: function () {
			const modelo= "i18n";
			this.inicializarServicos();

			let modeloI18N = this.getOwnerComponent().getModel(modelo).getResourceBundle();
			this._validacao.definiri18n(modeloI18N);

			let rotaDaView = sap.ui.core.UIComponent.getRouterFor(this);
			rotaDaView.attachRoutePatternMatched(this._aoCoincidirObjeto, this);
		},

		_aoCoincidirObjeto : function (evento) {
			const nomeDaRota = "editar";
			const nome = "name";
			this._servico.definirDataValida.bind(this)();
			this._servico.limparCampos.bind(this)();

			let id;
			let rotaPraEditar = evento.getParameter(nome) == nomeDaRota;
			
			rotaPraEditar
				? (id = window.decodeURIComponent(evento.getParameter("arguments").id),
				  this.carregarLivro(id))
				: this._criarModeloDoLivro();
		},
		
		aoPressionarSalvar: function () {
			const nomeModelo = "Livro";
			const idDataPicker = "DP6";
			const idInputs = ["input-nome", "input-autor", "input-editora"];
			const mensagemDeErroValidacao = "erroAoSalvar.i18n";
			const mensagemDeErroi18n = this.buscari18n(mensagemDeErroValidacao)

			let livro = this.getView().getModel(nomeModelo).getData();
			let dataInputada = this.getView().byId(idDataPicker);

			let arrayDeEntradas=[];
			let tela= this.getView();
			for(let i in idInputs){
				arrayDeEntradas[i] = tela.byId(idInputs[i]);
			}

			let falha_Validacao = this._validacao.validarCampos(arrayDeEntradas, dataInputada);

			if (falha_Validacao) {
				MessageBox.alert(mensagemDeErroi18n)
				return;
			}
			
			livro.id
				? this.editarLivro(livro)
				: this.criarLivro(livro)
		},

		criarLivro: function (livroASerCriado){
			const nomeDaRota = "detalhes";

			this._repositorio.CriarNovoLivro(livroASerCriado)
				.then(livroCriado => 
					this._servico.NavegarParaRota.bind(this)(nomeDaRota, livroCriado.id));
		},

		editarLivro: function(livroASerEditado) {
			const nomeDaRota = "detalhes";

			this._repositorio.EditarLivro(livroASerEditado)
				this._servico.NavegarParaRota.bind(this)(nomeDaRota, livroASerEditado.id);
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

			this._repositorio.BuscarPorId(id)
				.then(livroDoBanco => {
				this.getView().setModel(new JSONModel(livroDoBanco), nomeModelo)
			})
		},
		
		aoMudarData: function(evento) {
			let dataInputada = evento.getSource();
			this._validacao.validarData(dataInputada);
		},

		aoMudarEntrada: function(evento) {
			let entrada = evento.getSource();
			this._validacao.validarEntrada(entrada);
		},

		aoClicarEmVoltar: function(){
			const nomeDaRota = "lista";
			const mensagemMensageBox =  "mensagemAoClicarVoltar";
			const tituloMensageBox = "tituloMensagemAoClicarVoltar";
			
			MessageBox.warning(
				this.buscari18n(mensagemMensageBox),
				{
				title : this.buscari18n(tituloMensageBox),
				actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
				phasizedAction: MessageBox.Action.OK,
				initialFocus: MessageBox.Action.CANCEL,
				onClose: (oAction) => { 
					if (oAction === "OK"){
						this._servico.NavegarParaRota.bind(this)(nomeDaRota, null)
						}
					}
				});
		},

		buscari18n: function(chave) {
			const modelo = "i18n";
			let i18n = this.getView().getModel(modelo).getResourceBundle();
			return i18n.getText(chave);
		},

		inicializarServicos: function(){
			this._repositorio = new Repositorio();
			this._servico = new Servicos();
			this._validacao = new ValidarCampos();
		},
	});
});
