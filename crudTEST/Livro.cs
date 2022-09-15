using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace crudTEST
{


    public class Livro
    {
        public string Nome { get; set; }
        public string Autor { get; set; }
        public string Data { get; set; }
        public string Editora { get; set; }

       

        public Livro(string nome, string autor, string data, string editora)
        {
         Nome = nome;
         Autor = autor;
         Data = data;
         Editora = editora;
        }
      
    }
}
