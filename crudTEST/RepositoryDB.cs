using System.Data;
using System.Data.SqlClient;

namespace crudTEST
{
    public class RepositoryDB : IRepository
    {
        const string connectionString = "Data Source=.;Initial Catalog=db_crud;Integrated Security=True;";
        SqlConnection conn = new SqlConnection(connectionString);

        public void Adicionar(Livro livro)
        {
            using (conn = new SqlConnection("Data Source=.;Initial Catalog=db_crud;Integrated Security=True;"))
            {
                try
                {
                    var cmd = new SqlCommand("INSERT INTO Livro(nome,autor, data, editora) VALUES (@nome,@autor, @data, @editora)", conn);
                    conn.Open();
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

        public void Editar(Livro livro)
        {
            using (conn = new SqlConnection("Data Source=.;Initial Catalog=db_crud;Integrated Security=True;"))
            {
                try
                {
                    var cmd = new SqlCommand("UPDATE Livro SET nome=@nome, autor=@autor, data=@data, editora=@editora WHERE id=@id", conn);
                    conn.Open();
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
            using (conn = new SqlConnection("Data Source=.;Initial Catalog=db_crud;Integrated Security=True;"))
            {
                try
                {
                    var cmd = new SqlCommand("DELETE Livro WHERE id= @id", conn);
                    conn.Open();
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
            using (conn = new SqlConnection("Data Source=.;Initial Catalog=db_crud;Integrated Security=True;"))
            {
                try
                {
                    DataTable dt = new DataTable();
                    var cmd = new SqlCommand("SELECT * from Livro", conn);
                    var adapt = new SqlDataAdapter(cmd);

                    conn.Open();
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
            var cmd = new SqlCommand("SELECT * from Livro WHERE id= @id", conn);
            cmd.Parameters.Add("@dev", SqlDbType.Text);
            cmd.Parameters["@id"].Value = Id;

            long id = (long)cmd.ExecuteScalar();
            throw new NotImplementedException();
        }
    }
}
