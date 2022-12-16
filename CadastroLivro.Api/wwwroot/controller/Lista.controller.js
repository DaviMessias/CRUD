sap.ui.define([
    "sap/ui/demo/walkthrough/controller/Servicos",
    "sap/ui/demo/walkthrough/controller/Repositorio",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator" 
], function(Servicos,Repositorio,Controller, JSONModel, Filter, FilterOperator) {
"use strict";

return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
            onInit :  function () {
                let rotaDaView = sap.ui.core.UIComponent.getRouterFor(this);
			    rotaDaView.attachRoutePatternMatched(this._aoCoincidirObjeto, this);
            },

            _aoCoincidirObjeto: function() {
                this.carregarLivros();
            },

            carregarLivros : function(){
                const nomeModelo = "listaDosLivros";
                let _repositorio = new Repositorio()
                let livrosSalvos = _repositorio.BuscarTodos()
                    livrosSalvos.then(lista =>{
                        let modelo = new JSONModel(lista)
                            this.getView().setModel(modelo, nomeModelo)
                    })
            },

            aoPressionarLivro: function (oEvent) {
                const nomeDaRota = "detalhes";
                const propriedadeParaBusca = "id";
                const modeloParaBusca = "listaDosLivros";
                
                let oItem = oEvent.getSource();
                let id = window.encodeURIComponent(oItem.getBindingContext(modeloParaBusca).getProperty(propriedadeParaBusca))
                this.NavegarPara(nomeDaRota, id)
            },

            aoClicarEmCadastrar: function(){
                const nomeDaRota = "cadastroDeLivros";
                this.NavegarPara(nomeDaRota,null)
            },

            aoFiltrarLivros: function (evento) {
                const lista = "Lista";
                const parametroDeBusca = "nome";
                const parametroDoEvento = "query";

                let listaLivros = [];
                let parametroPesquisa = evento.getParameter(parametroDoEvento);
                listaLivros.push(new Filter(parametroDeBusca, FilterOperator.Contains, parametroPesquisa));
                let listaDeLivros = this.byId(lista);
                let oBinding = listaDeLivros.getBinding("items");
                oBinding.filter(listaLivros);
            },

            NavegarPara: function(endPoint, idNavegacao){
                let _servico = new Servicos();
                _servico.NavegarParaRota.bind(this)(endPoint, idNavegacao)
            }
    });
});
