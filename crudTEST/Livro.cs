using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace crudTEST
{
  
    public class Livro
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Autor { get; set; }
        public string Data { get; set; }
        public string Editora { get; set; }

       

        public Livro(string nome, string autor, string data, string editora)
        {
            this. Nome = nome;
            this.Autor = autor;
            this. Data = data;
            this.Editora = editora;
            
           
        }
        public Livro()
        {

        }
        
    }
}
