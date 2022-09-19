using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace crudTEST
{
    public partial class Form2 : Form
    {
        public Livro Livro { get; set; }
        public Form2(Livro livro)
        {
            InitializeComponent();

           if (livro == null)
            {
                Livro = new Livro();
            }
        }
        private void btnSalvar_Click(object sender, EventArgs e)
        {
            Livro.Nome = txtNome.Text;
            Livro.Autor = txtAutor.Text;
            Livro.Data = txtData.Text;
            Livro.Editora = txtEditora.Text;

            DialogResult = DialogResult.OK;

            this.Close();


            //Cadastro();
        }


        private void btnEditar_Click(object sender, EventArgs e)
        {
            this.Close();


            //EditaLivros();
            ////              
            //Form1 atualiza = new Form1();
            //atualiza.ListarLivros();


            //this.Close();
        }
     

        private void txtNome_TextChanged(object sender, EventArgs e)
        {
          
        }

   
    }
}
