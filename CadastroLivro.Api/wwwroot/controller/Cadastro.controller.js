    sap.ui.define([
        "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/SimpleType",
		"sap/ui/model/ValidateException",
		"sap/ui/core/Core",
		"sap/m/MessageBox",
		"sap/m/MessageToast"
    ], function(Controller, JSONModel, SimpleType, ValidateException, Core, MessageBox, MessageToast) {
    "use strict";
    
    return Controller.extend("sap.ui.demo.walkthrough.controller.Cadastro", {
        onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("cadastroDeLivros").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function () {
			var oView = this.getView(),
				oMM = Core.getMessageManager();

			oView.setModel(new JSONModel({ id: "", titulo: "", autor: "", editora: "", data: "", }));

			oMM.registerObject(oView.byId("input-id"), true);
			oMM.registerObject(oView.byId("input-titulo"), true);
			oMM.registerObject(oView.byId("input-autor"), true);
			oMM.registerObject(oView.byId("input-editora"), true);
			oMM.registerObject(oView.byId("input-data"), true);
			
		},

		_validateInput: function (oInput) {
			var sValueState = "None";
			var bValidationError = false;
			var oBinding = oInput.getBinding("value");

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);

			return bValidationError;
		},

		aoMudarNome: function(oEvent) {
			var oInput = oEvent.getSource();
			this._validateInput(oInput);
		},


		aoPressionarSalvar: function () {
			// collect input controls
			var oView = this.getView(),
				aInputs = [
				oView.byId("input-id"),
				oView.byId("input-titulo"),
				oView.byId("input-autor"),
				oView.byId("input-editora"),
				oView.byId("input-data")
			],
				bValidationError = false;

			// Verifique se as entradas não estão vazias.
			// A validação não ocorre durante a vinculação de dados, pois ela é acionada apenas por ações do usuário.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);

			if (!bValidationError) {
				MessageToast.show("Livro adicionado com sucesso");
			} else {
				MessageBox.alert("Ocorreu um erro de validação. Complete todos os campos primeiro.");
			}
		},



		aoClicarEmBotaoVoltar: function(){
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("lista", {});
			}

	});
});
