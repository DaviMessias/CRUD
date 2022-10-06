using System.Data;


namespace crudTEST
{
    public class Conversor
    {
        public static List<Livro> ConverterLivro(DataTable dt)
        {
            var list = new List<Livro>();

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Livro livro = new()
                {
                    Id = Convert.ToInt32(dt.Rows[i]["id"]),
                    Nome = dt.Rows[i]["nome"].ToString(),
                    Autor = dt.Rows[i]["autor"].ToString(),
                    Data = DateTime.Parse(dt.Rows[i]["data"].ToString()),
                    Editora = dt.Rows[i]["editora"].ToString()
                };

                list.Add(livro);
            }

            return list;
        }
    }
}
