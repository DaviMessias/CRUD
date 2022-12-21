sap.ui.define([
    "sap/ui/demo/walkthrough/controller/Servicos",
    "sap/ui/demo/walkthrough/controller/Repositorio",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator" 
], function(Servicos,Repositorio,Controller, JSONModel, Filter, FilterOperator) {
"use strict";

const caminhoLista= "sap.ui.demo.walkthrough.controller.Lista";
return Controller.extend(caminhoLista, {
            _servico: null,
            onInit :  function () {
                const nomeDaRota = "lista"
                this._servico = new Servicos();
                
                let rota = this.getOwnerComponent().getRouter();
			    rota.getRoute(nomeDaRota).attachPatternMatched(this._aoCoincidirObjeto, this);
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
                let id = window
                    .encodeURIComponent(oItem.getBindingContext(modeloParaBusca)
                    .getProperty(propriedadeParaBusca));
                    
                this._servico.NavegarParaRota.bind(this)(nomeDaRota, id)
            },

            aoClicarEmCadastrar: function(){
                const nomeDaRota = "cadastroDeLivros";
                this._servico.NavegarParaRota.bind(this)(nomeDaRota, null)
            },

            aoFiltrarLivros: function (evento) {
                const lista = "Lista";
                const parametroDeBusca = "nome";
                const parametroDoEvento = "query";
                const items = "items";

                let listaLivros = [];
                let parametroPesquisa = evento.getParameter(parametroDoEvento);
                listaLivros.push(new Filter(parametroDeBusca, FilterOperator.Contains, parametroPesquisa));
                let listaDeLivros = this.byId(lista);
                let oBinding = listaDeLivros.getBinding(items);
                oBinding.filter(listaLivros);
            }
    });
});
