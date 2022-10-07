﻿using Dominio;

namespace crudTEST
{
    public partial class Form2 : Form
    {
        public Livro Livro { get; set; }
        public Form2(Livro livro)
        {
            InitializeComponent();

            try
            {
                if (livro == null)
                {
                    Livro = new Livro();
                }
                else
                {
                    txtNome.Text = livro.Nome;
                    txtAutor.Text = livro.Autor;
                    dateTimePicker1.Text = livro.Data.ToString();
                    txtEditora.Text = livro.Editora;
                    Livro = livro;
                    
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        private void AoCLicarEmSalvar(object sender, EventArgs e)
        {
            try
            {
                    Livro.Nome = txtNome.Text;
                    Livro.Autor = txtAutor.Text;
                    Livro.Data = dateTimePicker1.Value;
                    Livro.Editora = txtEditora.Text;

                  if( Validacao.ValidarCampo(Livro) == true)  
                  {
                    DialogResult = DialogResult.OK;
                  }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }


        private void AoClicarEmCancelar(object sender, EventArgs e)
        {
            try
            {
                DialogResult confirm = MessageBox.Show("Deseja Cancelar?", "Cancelar", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2);

                if (confirm.ToString().ToUpper() == "YES")
                {
                    this.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
