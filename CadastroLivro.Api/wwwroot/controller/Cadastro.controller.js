    sap.ui.define([
		"sap/ui/demo/walkthrough/controller/Repositorio",
		"sap/ui/demo/walkthrough/controller/ValidarCampos",
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/Core",
		"sap/m/MessageBox",
	

    ], function(Repositorio,ValidarCampos,Controller, JSONModel,Core, MessageBox ) {
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

		_aoCoincidirObjeto : function (oEvent) {
			if (oEvent.getParameter("name") == "cadastroDeLivros") {
				let modeloLivro = new JSONModel({
					nome: "",
					autor: "",
					editora: "",
					data: "",
				});
				this.getView().setModel(modeloLivro, "Livro");
				 
				this.byId("DP6").setMinDate(new Date(1800, 0, 1));
			 	this.byId("DP6").setMaxDate(new Date);
				
			} else {
				let idDoLivro = window.decodeURIComponent(oEvent.getParameter("arguments").id);
				this.carregarLivro(idDoLivro);
				
				this.limparCampos()
			}
		},
		
		aoPressionarSalvar: function () {
			//const nomeDaRota = 'lista';
			let livro = this.getView().getModel("Livro").getData();	
			let dataRecebida = this.getView().byId("DP6");
			var _validacao = new ValidarCampos();

				//coletar controles de entrada
				var oView = this.getView(),
					aInputs = [
					oView.byId("input-nome"),
					oView.byId("input-autor"),
					oView.byId("input-editora"),
				],
					falha_Validacao = false;

			aInputs.forEach( function (oInput) {
				falha_Validacao =  _validacao.validarEntrada(oInput) || falha_Validacao;
			}, this);

			falha_Validacao =  _validacao.validarData(dataRecebida) || falha_Validacao;

			if (!falha_Validacao) {
						if(!livro.id){
							 this.criarLivro()
								 this.mudarRota()

						}else{
							 this.editarLivro()
							 	this.mudarRota()
						}
			} else {
				 MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
			}
		},

		criarLivro : function (){
			let livroASerCriado = this.getView().getModel("Livro").getData();
			var _repositorio = new Repositorio();
			
			_repositorio.CriarNovoLivro(livroASerCriado)
		},

		editarLivro : function() {
			let livroASerEditado = this.getView().getModel("Livro").getData();
			let _repositorio = new Repositorio();

			_repositorio.EditarLivro(livroASerEditado)
		},

		carregarLivro : function(id){
			let _repositorio = new Repositorio();

			_repositorio.BuscarPorId(id)
				.then(livroDoBanco => {
				this.getView().setModel(new JSONModel(livroDoBanco), "Livro")
			})
		},

		aoMudarData: function(evento) {
			var _validacao = new ValidarCampos();
			var dataRecebida = evento.getSource();
			_validacao.validarData(dataRecebida);
		},

		aoMudarEntrada: function(evento) {
			var _validacao = new ValidarCampos();
			var entrada = evento.getSource();
			_validacao.validarEntrada(entrada);
		},

		aoClicarEmVoltar: function(){
			//const nomeDaRota = "lista";
			MessageBox.warning(
				"As edições feitas neste livro não serão salvas.",
				{
					title : "Sair da página?",
					actions : [MessageBox.Action.CANCEL, MessageBox.Action.OK],
					phasizedAction: MessageBox.Action.OK,
					initialFocus: MessageBox.Action.CANCEL,
					onClose: (oAction) => { 
						if (oAction === "OK"){
							this.mudarRota()
						}
					}
				});
		},

		limparCampos : function(){
				const estadoDoCampo = "None"
				let oView = this.getView(),
				aInputs = [
				oView.byId("input-nome"),
				oView.byId("input-autor"),
				oView.byId("input-editora"),
				oView.byId("DP6"),
			]
			aInputs.forEach(element => element.setValueState(estadoDoCampo));

		},

		mudarRota: function(){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("lista");
		}
	});
});
