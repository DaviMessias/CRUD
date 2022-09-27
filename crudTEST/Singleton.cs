using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

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
    }
}
