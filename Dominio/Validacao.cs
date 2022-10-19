using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Validacao
    {
        public static bool ValidarCampo(Livro livro)
        {
            if (livro.Nome.Equals(String.Empty))
            {
                throw new Exception("Nome inválido");
            } 
            else if (livro.Autor.Equals(String.Empty))
            {
                throw new Exception("Autor inválido");
            }
            else if (livro.Editora.Equals(String.Empty))
            {
                throw new Exception("Editora inválida");
            }
            else if (livro.Data.Value >= DateTime.Now)
            {
                throw new Exception("Data inválida");
            }
            else { return true; }
        }
    }
}
