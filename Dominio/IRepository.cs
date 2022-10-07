using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio;

namespace Infra
{
    public interface IRepository
    {
        List<Livro> BuscarTodos();
        Livro BuscarPorId(int Id);
        void Adicionar(Livro livro);
        void Editar(Livro livroEditado);
        void Deletar(int Id);

    }
}
