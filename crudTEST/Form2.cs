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
       // public int Id { get; set; }
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
            this.Close();

           // this.DialogResult = DialogResult.OK;

            //Cadastro();
        }


        private void btnEditar_Click(object sender, EventArgs e)
        {

            EditaLivros();
            //              
            Form1 atualiza = new Form1();
            atualiza.ListarLivros();


            this.Close();
        }

        public void EditaLivros()
        {
            var editar = new Livro(Nome, Autor, Data, Editora);
            editar.Nome = txtNome.Text.ToString();
            editar.Autor = txtAutor.Text.ToString();
            editar.Data = txtData.Text;
            editar.Editora = txtEditora.Text.ToString();


            Form1.listaDeLivros[1].Nome = 
           // Form1.listaDeLivros[Form1.rowIndex] = editar;

           
        }

        public void AddRows1(string nome, string autor, string data, string editora)
        {
            Livro editarLivro = new Livro(nome, autor, data, editora) { Nome = nome, Autor = autor, Data = data, Editora = editora };
            Form1.listaDeLivros.Add(editarLivro);
        }

     
            

        private void txtNome_TextChanged(object sender, EventArgs e)
        {
          
        }
    }
}
