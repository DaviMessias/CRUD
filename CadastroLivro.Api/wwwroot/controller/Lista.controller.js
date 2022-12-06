sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
"use strict";

return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

        onInit :  function () {
        this.exibirLivros();
           
    },
    exibirLivros : function(){
        let listaRetornada = this.buscarLivros();
        listaRetornada.then(lista =>{
            let modelo = new JSONModel(lista)
            this.getView().setModel(modelo, "listaDosLivros")
        })
    },

    buscarLivros : async function(){
        
        let livrosRetornados;
        await fetch("https://localhost:7187/api/livro")
        .then(response => response.json())
        .then(data => livrosRetornados = data)

        return livrosRetornados
    },

    aoFiltrarLivros: function (oEvent) {
        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("titulo", FilterOperator.Contains, sQuery));
        }

        var oList = this.byId("listaDosLivros");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
    },

    
    aoPressionarLivro: function (oEvent) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detalhes", {
            id: window.encodeURIComponent(oItem.getBindingContext("listaDosLivros").getProperty('id'))
        });
    },

    aoClicarEmCadastrar: function(){
        var oRouter = this.getOwnerComponent().getRouter();
		    oRouter.navTo("cadastroDeLivros")
    }

    });
});
