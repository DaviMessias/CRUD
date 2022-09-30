using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace crudTEST
{
    public class RepositoryDB : IRepository
    {
       public SqlConnection conexao()
       {
            SqlConnection conexao = new SqlConnection(ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString);
            conexao.Open();
            return conexao;
       }
        public void Adicionar(Livro livro)
        {
            using (var conn = conexao())
            {
                try
                {
                    var cmd = new SqlCommand("INSERT INTO Livro(nome,autor, data, editora) VALUES (@nome,@autor, @data, @editora)", conn);
                   
                    cmd.Parameters.AddWithValue("@nome", livro.Nome);
                    cmd.Parameters.AddWithValue("@autor", livro.Autor);
                    cmd.Parameters.AddWithValue("@data", livro.Data);
                    cmd.Parameters.AddWithValue("@editora", livro.Editora);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro : " + ex.Message);
                }
            }
        }

        public void Editar(Livro livro)
        {
            using (var conn = conexao())
            {
                try
                {
                    var cmd = new SqlCommand("UPDATE Livro SET nome=@nome, autor=@autor, data=@data, editora=@editora WHERE id=@id", conn);
                    cmd.Parameters.AddWithValue("@id", livro.Id);
                    cmd.Parameters.AddWithValue("@nome", livro.Nome);
                    cmd.Parameters.AddWithValue("@autor", livro.Autor);
                    cmd.Parameters.AddWithValue("@data", livro.Data);
                    cmd.Parameters.AddWithValue("@editora", livro.Editora);
                    cmd.ExecuteNonQuery();

                }
                catch (Exception ex)
                {
                    MessageBox.Show("Erro : " + ex.Message);
                }
            }
        }

        public void Deletar(int Id)
        {
            using (var conn = conexao())
            {
                try
                {
                    var cmd = new SqlCommand("DELETE Livro WHERE id= @id", conn);
                    cmd.Parameters.AddWithValue("@id", Id);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Erro : " + ex.Message);
                }
            }
        }

        public List<Livro> BuscarTodos()
        {
            List<Livro> lista = new List<Livro>();
            using (var conn = conexao())
            {
                try
                {
                    DataTable dt = new DataTable();
                    var cmd = new SqlCommand("SELECT * from Livro", conn);
                    var adapt = new SqlDataAdapter(cmd);

                    adapt.Fill(dt);

                    lista = Conversor.ConverterLivro(dt);

                }
                catch (Exception ex)
                {
                    MessageBox.Show("Erro : " + ex.Message);
                }
            }

            return lista;
        }
        public Livro BuscarPorId(int Id)
        {
            List<Livro> lista = new List<Livro>();
            using (var conn = conexao())
            {
                try
                {
                    DataTable dt = new DataTable();
                    var cmd = new SqlCommand("SELECT * from Livro WHERE id=@id", conn);
                    {
                        cmd.Parameters.AddWithValue("@id", Id);
                    }
                    var adapt = new SqlDataAdapter(cmd);
                    adapt.Fill(dt);
                    lista = Conversor.ConverterLivro(dt);
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Erro : " + ex.Message);
                }
            }

            return lista[0];
        }

    }
}