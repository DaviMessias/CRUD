using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace crudTEST
{
    public partial class Form2 : Form
    {
        public string Nome { get; set; }
        public string Autor { get; set; }
        public string Data { get; set; }
        public string Editora { get; set; }

        public Form2()
        {
            InitializeComponent();
      
        }
        private void Form2_load (object sender, EventArgs e)
        {
            txtNome.Text = this.Nome;
            txtAutor.Text = this.Autor;
            txtData.Text = this.Data;
            txtAutor.Text = this.Editora;

        }
        private void btnSalvar_Click(object sender, EventArgs e)
        {
            this.Nome= txtNome.Text;
            this.Autor = txtAutor.Text;
            this.Data = txtData.Text;
            this.Editora = txtEditora.Text;
            this.DialogResult = DialogResult.OK;

            //Cadastro();
            //this.Close();
        }

        

        //public void Cadastro()
        //{
        //    string nomeLivro= txtNome.Text;
        //    string autorLivro= txtAutor.Text;
        //    string dataLivro= txtData.Text;
        //    string editoraLivro= txtEditora.Text;

        //    Form1.list.Add(new Livro() { Nome= nomeLivro, Autor=autorLivro, Data = dataLivro, Editora= editoraLivro});
        //}

        private void btnEditar_Click(object sender, EventArgs e)
        {
            Form2 editar = new Form2();
            
        }
    }
}
