sap.ui.define([
    "sap/ui/base/ManagedObject"
], function(ManagedObject) {
    "use strict";

    return ManagedObject.extend("sap.ui.demo.walkthrough.controller.Repositorio", {

        BuscarTodos : async function (){
            return await fetch("https://localhost:7187/api/livro")
            .then(res => res.json());
        },
        
        BuscarPorId : async function(id){
            return await fetch (`https://localhost:7187/api/livro/${id}`)
            .then(res => res.json());
        },

        CriarNovoLivro : async function (livroASerCriado){
            let livroCriado;
			await fetch(' https://localhost:7187/api/livro', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(livroASerCriado)
			})
			.then((resposta) => resposta.json())
            .then(data => livroCriado = data)
            return livroASerCriado;
		},

        EditarLivro : async function(livroASerEditado) {
			await fetch(`https://localhost:7187/api/livro/${livroASerEditado.id}`, {
				method: 'PUT',
				headers: {
                    'Accept': 'application/json',
					'content-type': 'application/json'
				},
				body: JSON.stringify(livroASerEditado)
			    })
			.then((resposta) => resposta.json())
        },

        DeletarLivro : async function(idLivroASerDeletado) {
            await fetch(`https://localhost:7187/api/livro/${idLivroASerDeletado}`, {
                method: 'DELETE'
            });
        }
    })
})