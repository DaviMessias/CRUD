using Dominio;
using LinqToDB;
using LinqToDB.DataProvider.SqlServer;
using System.Configuration;

namespace Infra
{
    public class  RepositoryLINQ : IRepository
    {
        public static string ConexaoLinq()
        {
            return ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString;
        }

        public void Adicionar(Livro livro)
        {
            using var db = SqlServerTools.CreateDataConnection(ConexaoLinq());
            try
            {
                db.Insert(livro);
            }
            catch (Exception ex)
            {
                throw new Exception("O livro não foi salvo", ex);
            }
        }

        public void Editar(Livro livroASerEditado)
        {
            using var db = SqlServerTools.CreateDataConnection(ConexaoLinq());
            try
            {
                db.Update(livroASerEditado);
            }
            catch (Exception ex)
            {
                throw new Exception("O livro não foi editado", ex);
            }
        }

        public void Deletar(int Id)
        {
            using var db = SqlServerTools.CreateDataConnection(ConexaoLinq());
            try
            {
                db.GetTable<Livro>()
               .Where(livro => livro.Id == Id)
               .Delete();
            }
            catch (Exception ex)
            {
                throw new Exception("O livro não foi deletado", ex);
            }
        }

        public Livro? BuscarPorId(int Id)
        {
            using var db = SqlServerTools.CreateDataConnection(ConexaoLinq());
            try
            {
                var livroBuscado = db.GetTable<Livro>().First(livro => livro.Id == Id);
                return livroBuscado;
            }
            catch (Exception ex)
            {
                throw new Exception("Livro não foi encontrado para busca", ex);
            }
        }

        public List<Livro> BuscarTodos()
        {
            using var db = SqlServerTools.CreateDataConnection(ConexaoLinq());
            try
            {
                var listaDeLivros = from livro in db.GetTable<Livro>() select livro;
                return listaDeLivros.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("O livro não foi encontrado", ex);
            }
        }
    }
}
