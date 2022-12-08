    sap.ui.define([
		"sap/ui/demo/walkthrough/controller/ValidarCampos",
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/Core",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
	

    ], function(ValidarCampos,Controller, JSONModel,Core, MessageBox , MessageToast) {
    "use strict";
    
    return Controller.extend("sap.ui.demo.walkthrough.controller.Cadastro", {
        onInit: function () {
			var rotaDaView = sap.ui.core.UIComponent.getRouterFor(this);
			rotaDaView.attachRoutePatternMatched(this._aoCoincidirObjeto, this);

			var oView = this.getView(),
			oMM = Core.getMessageManager();

			oMM.registerObject(oView.byId("input-nome"), true);
			oMM.registerObject(oView.byId("input-autor"), true);
			oMM.registerObject(oView.byId("input-editora"), true);

			
			
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
				var salvarId = window.decodeURIComponent(oEvent.getParameter("arguments").id);
				this.exibirLivro(salvarId);
			}
		},
		
		aoPressionarSalvar: async function () {

		//	let data= "DP6"
			let livro = this.getView().getModel("Livro").getData();	

			//primeiro validar campos para salvar/editar
			var validacao = new ValidarCampos();

			// collect input controls
			var oView = this.getView(),
				aInputs = [
				oView.byId("input-nome"),
				oView.byId("input-autor"),
				oView.byId("input-editora"),
			],
				falhaValidacao = false;

			var dataRecebida = this.getView().byId("DP6");

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				falhaValidacao = validacao.validarEntrada(oInput) || falhaValidacao;
			}, this);

			falhaValidacao = validacao.validarData(dataRecebida) || falhaValidacao;
			

			if (!falhaValidacao) {
						if(!livro.id){
							this.criarLivro();
						}else{
							this.editarLivro();
						}
			} else {
				MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
			}

			//let livro = this.getView().getModel("Livro").getData();	
			// if(!livro.id){
			// 	this.criarLivro();
			// }else{
			// 	this.editarLivro();
			// }
			//var oRouter = this.getOwnerComponent().getRouter();
			//oRouter.navTo("lista");
		},

		criarLivro : async function (){
			const idCampoData = "walkthrough---cadastroDeLivros--DP6";

			let livro = this.getView().getModel("Livro").getData();
			livro.data = new Date(this.byId(idCampoData)
				.getValue())
				.toISOString();

			await fetch(' https://localhost:7187/api/livro', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(livro)
			})
			.then((resposta) => resposta.json())
			
			 MessageToast.show("Livro cadastrado");
		},

		editarLivro : async function() {
			let livroASerEditado = this.getView().getModel("Livro").getData();
			let idLivroParaEdicao = livroASerEditado.id;

			await fetch(`https://localhost:7187/api/livro/${idLivroParaEdicao}`, {
				method: 'PUT',
				headers: {
                    'Accept': 'application/json',
					'content-type': 'application/json'
				},
				body: JSON.stringify(livroASerEditado)
			})
			.then((resposta) => resposta.json())

			MessageToast.show("Usuário editado")
		},

		exibirLivro : function (idLivro){
			this.buscarLivro(idLivro)
				.then(livroDoBanco => {
				let livro = new JSONModel(livroDoBanco)
				this.getView().setModel(livro, "Livro")
			})
		},

		buscarLivro: async function(idLivro){
			return await fetch(`https://localhost:7187/api/livro/${idLivro}`)
			.then(res => res.json())
		},
	
		aoClicarEmBotaoVoltar: function(){
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("lista");
		},

		aoMudarData: function(evento) {
			var validacao = new ValidarCampos();
			var dataRecebida = evento.getSource();
			validacao.validarData(dataRecebida);
		},

		aoMudarEntrada: function(evento) {
			var validacao = new ValidarCampos();
			var entrada = evento.getSource();
			validacao.validarEntrada(entrada);
		}

	});
});




