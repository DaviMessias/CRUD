sap.ui.define([
    "sap/ui/base/ManagedObject"
], function(ManagedObject) {
    "use strict";

    return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Repositorio", {

        BuscarTodos : async function (){
            let livrosRetornados;
            await fetch("https://localhost:7187/api/livro")
            .then(res => res.json())
            .then(data => livrosRetornados = data)
        return livrosRetornados

        },
        
        BuscarPorId : function(id){
            let livro = fetch (`https://localhost:7187/api/livro/${id}`)
            .then(res => res.json())
            .then(data=> livro = data )
            return livro;
        },

        DeletarLivro : async function(idLivroASerDeletado) {
				await fetch(`https://localhost:7187/api/livro/${idLivroASerDeletado}`, {
					method: 'DELETE'
				})
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview");
        }
       
    })
})