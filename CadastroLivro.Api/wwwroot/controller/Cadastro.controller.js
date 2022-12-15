    sap.ui.define([
		"sap/ui/demo/walkthrough/controller/Servicos",
		"sap/ui/demo/walkthrough/controller/Repositorio",
		"sap/ui/demo/walkthrough/controller/ValidarCampos",
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/Core",
		"sap/m/MessageBox",
	

    ], function(Servicos,Repositorio,ValidarCampos,Controller, JSONModel,Core, MessageBox ) {
    "use strict";
    
    return Controller.extend("sap.ui.demo.walkthrough.controller.Cadastro", {
        onInit: function () {
			let rotaDaView = sap.ui.core.UIComponent.getRouterFor(this);
			rotaDaView.attachRoutePatternMatched(this._aoCoincidirObjeto, this);

			let tela = this.getView(),
			oMM = Core.getMessageManager();
			oMM.registerObject(tela.byId("input-nome"), true);
			oMM.registerObject(tela.byId("input-autor"), true);
			oMM.registerObject(tela.byId("input-editora"), true);
		},

		_aoCoincidirObjeto : function (evento) {
			if (evento.getParameter("name") == "editar") {
				let idDoLivro = window.decodeURIComponent(evento.getParameter("arguments").id);
				this.carregarLivro(idDoLivro);
				this.limparCampos();
			} else {
				let modeloLivro = new JSONModel({
					nome: "",
					autor: "",
					editora: "",
					data: "",
				});
				this.getView().setModel(modeloLivro, "Livro");
				this.limparCampos();
				this.byId("DP6").setMinDate(new Date(1800, 0, 1));
			 	this.byId("DP6").setMaxDate(new Date);
			}
		},
		
		aoPressionarSalvar: function () {
			const nomeDaRota = "detalhes"
			let livro = this.getView().getModel("Livro").getData();	
			let dataRecebida = this.getView().byId("DP6");
			let _validacao = new ValidarCampos();

			let tela = this.getView(),
				arrayDeEntradas = [
				tela.byId("input-nome"),
				tela.byId("input-autor"),
				tela.byId("input-editora"),
			],
				falha_Validacao = false;

			arrayDeEntradas.forEach( function (entrada) {
				falha_Validacao =  _validacao.validarEntrada(entrada) || falha_Validacao;
			}, this);

			falha_Validacao =  _validacao.validarData(dataRecebida) || falha_Validacao;

			if (!falha_Validacao) {
					if(!livro.id){
						this.criarLivro(livro)
							.then(livroCriado => 
							this.navegarPara(nomeDaRota,livroCriado.id));

					}else{
							this.editarLivro(livro)
								this.navegarPara(nomeDaRota,livro.id);
					}
			} else {
				 MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
			}
		},

		criarLivro : function (livroASerCriado){
			let _repositorio = new Repositorio();
			return _repositorio.CriarNovoLivro(livroASerCriado)
		},

		editarLivro : function(livroASerEditado) {
			let _repositorio = new Repositorio();
			_repositorio.EditarLivro(livroASerEditado)
		},

		aoMudarData: function(evento) {
			let _validacao = new ValidarCampos();
			let dataRecebida = evento.getSource();
			_validacao.validarData(dataRecebida);
		},

		aoMudarEntrada: function(evento) {
			let _validacao = new ValidarCampos();
			let entrada = evento.getSource();
			_validacao.validarEntrada(entrada);
		},

		carregarLivro : function(id){
			let _repositorio = new Repositorio();
			_repositorio.BuscarPorId(id)
				.then(livroDoBanco => {
				this.getView().setModel(new JSONModel(livroDoBanco), "Livro")
			})
		},

		limparCampos : function(){
			const estadoDoCampo = "None"
			let tela = this.getView(),
			arrayDeEntradas = [
			tela.byId("input-nome"),
			tela.byId("input-autor"),
			tela.byId("input-editora"),
			tela.byId("DP6"),
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
						this.navegarPara(nomeDaRota,null)
					}
				}
				});
		},

		navegarPara: function(endPoint,idNavegacao){			
			let _servico = new Servicos();
			_servico.NavegarParaRota.bind(this)(endPoint,idNavegacao);
		}
	});
});
