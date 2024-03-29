sap.ui.define([
    "sap/ui/base/ManagedObject"
], function(ManagedObject) {
    "use strict";

    const caminhoRepositorio = "sap.ui.demo.walkthrough.controller.Repositorio";
    return ManagedObject.extend(caminhoRepositorio, {

        BuscarTodos : async function (){
            return await fetch('https://localhost:7187/api/livro/')
            .then(res => res.json());
        },
        
        BuscarPorId : async function(id){
            return await fetch (`https://localhost:7187/api/livro/${id}`)
            .then(res => res.json());
        },

        CriarNovoLivro: async function (livroASerCriado){
            return await fetch(' https://localhost:7187/api/livro', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(livroASerCriado)
			})
			.then((resposta) => resposta.json())
            .then(data => data);
		},

        EditarLivro : async function(livroASerEditado) {
			return await fetch(`https://localhost:7187/api/livro/${livroASerEditado.id}`, {
				method: 'PUT',
				headers: {
                    'Accept': 'application/json',
					'content-type': 'application/json'
				},
				body: JSON.stringify(livroASerEditado)
			    })
			.then((resposta) => resposta.json());
        },

        DeletarLivro : async function(idLivroASerDeletado) {
            await fetch(`https://localhost:7187/api/livro/${idLivroASerDeletado}`, {
                method: 'DELETE'
            });
        }
    })
})