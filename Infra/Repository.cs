using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio;
using Infra;

namespace crudTEST
{
    public class Repository : IRepository
    {
        protected List<Livro> listaDeLivros = Singleton.Instance();

        public void Adicionar(Livro livro)
        { 
            listaDeLivros.Add(livro);
        }

        public void Deletar(int Id)
        {
            Livro livro = BuscarPorId(Id);
            listaDeLivros.Remove(livro);
        }

        public void Editar(Livro livroEditado)
        {
            var livroAtual= BuscarPorId(livroEditado.Id);
            livroAtual = livroEditado;
        }

        public Livro? BuscarPorId(int Id)
        {
            var livroSelecionado = listaDeLivros.Find(x => x.Id == Id);
            return livroSelecionado;
        }

        public List<Livro> BuscarTodos()
        {
            return listaDeLivros;
        }
    }
}
