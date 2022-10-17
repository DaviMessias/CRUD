using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio;

namespace crudTEST
{

    public class Singleton
    {
        private static List<Livro> listaDeLivros;

        public static List<Livro> Instance()
        {
            
            {
                if (listaDeLivros == null)
                    {
                        listaDeLivros = new List<Livro>();
                    }
                
                    return listaDeLivros;
            }
        }

        public static int AdicionarId()
        {
            var idASerInserido = 0;

            if (listaDeLivros.Count != 0)
            {
                idASerInserido = listaDeLivros.Last().Id;
            }
            idASerInserido++;

            return idASerInserido;
        }
    }
}
