sap.ui.define([
	"sap/ui/model/json/JSONModel",
	
	"sap/ui/core/mvc/Controller",
], function (Controller,JSONModel,) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {

		onInit: function () {
			this.exibirLivroSelecionado();
			
		},
		
		aoSelecionarLivro: function (oEvent) {
            var idParametro = window.decodeURIComponent(oEvent.getParameter("arguments").id);
            this.carregarLivros(idParametro);
		},
		
		exibirLivroSelecionado : function(){

			let livroRetornado = this.buscarLivroSelecionado();
			livroRetornado.then(lista =>{
				let modelo = new JSONModel(lista)
				this.getView().setModel(modelo, "livro")
			})

		},
	
		buscarLivroSelecionado : async function(idLivro){
			
			let livroSelecionado = await fetch(`https://localhost:7187/api/livro/${idLivro}`)
			.then(response => response.json())
			.then(data => console.log(data))
	
			return livroSelecionado
		},

		aoClicarEmBotaoVoltar: function () {
			
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("lista");
			}
	});
});
