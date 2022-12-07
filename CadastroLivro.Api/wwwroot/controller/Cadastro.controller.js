    sap.ui.define([
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/Core",
		"sap/m/MessageBox",
		"sap/m/MessageToast"
    ], function(Controller, JSONModel, Core, MessageBox, MessageToast) {
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
			if (oEvent.getParameter("name") == "editar") {
				var salvarId = window.decodeURIComponent(oEvent.getParameter("arguments").id);
				this.exibirLivro(salvarId);
			} else {
				let modeloLivro = new JSONModel({
					nome: "",
					autor: "",
					editora: "",
					data: "",
				});
				this.getView().setModel(modeloLivro, "Livro");
				 
				this.byId("DP6").setMinDate(new Date(1800, 0, 1));
			 	this.byId("DP6").setMaxDate(new Date);
			 	this.byId("DP6").setDateValue(new Date);
			}
		},

		validarInput: function (oInput) {
			var valorStatus = "None";
			var booleanValidacao = false;
			var oBinding = oInput.getBinding("value");

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				valorStatus = "Error";
				booleanValidacao = true;
			}

			oInput.setValueState(valorStatus);

			return booleanValidacao;
		},

		aoSalvar: function () {
			// coleta os controles de entrada
			var oView = this.getView(),
				aInputs = [
				oView.byId("input-nome"),
				oView.byId("input-autor"),
				oView.byId("input-editora"),
				
			],
				booleanValidacao = false;

			// verifica se as entradas não estão vazias.
			// A validação não ocorre durante a vinculação de dados, pois ela é acionada apenas por ações do usuário.

			aInputs.forEach(function (oInput) {
				booleanValidacao = this.validarInput(oInput) || booleanValidacao;
			}, this);

			if (!booleanValidacao) {

				if(!oView.byId("DP6").isValidValue()){
					MessageBox.alert("Data Inválida");
				 }
				 
			} else {
				MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
			}
		},
		
		aoPressionarSalvar: async function () {

			this.aoSalvar()
			this.validarInput();
			
			let livro = this.getView().getModel("Livro").getData();
			if(!livro.id){
				this.criarLivro();
			}else{
				this.editarLivro();
			}
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("lista");
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
		
		validar : function(){
			let livro = this.getView().getModel("Livro").getData();

			if (livro.nome == '' ||livro.autor== ''  ||livro.editora == '' || livro.data == '' ) {
					MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
					livro.focus();
			}
		},


	});
});




