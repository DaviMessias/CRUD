sap.ui.define([
    "sap/ui/demo/walkthrough/controller/Repositorio",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator" 
], function(Repositorio,Controller, JSONModel, Filter, FilterOperator) {
"use strict";

return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
            onInit :  function () {
                this.exibirLivros();
            },

            exibirLivros : function(){

                var repositorio = new Repositorio()
                var livrosSalvos = repositorio.BuscarTodos()
                    livrosSalvos.then(lista =>{
                        let modelo = new JSONModel(lista)
                            this.getView().setModel(modelo, "listaDosLivros")
                    })
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
