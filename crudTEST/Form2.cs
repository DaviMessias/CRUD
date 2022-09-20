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
            else
            {
                txtNome.Text = livro.Nome;
                txtAutor.Text = livro.Autor;
                dateTimePicker1.Value = DateTime.Parse(livro.Data);
                txtEditora.Text = livro.Editora;
                Livro = livro;
            }
        }
        private void btnSalvar_Click(object sender, EventArgs e)
        {
            if (txtNome.Text.Equals("") || txtAutor.Text.Equals("") || txtEditora.Text.Equals(""))
            {
                MessageBox.Show("Preencha todos os campos antes de salvar. ", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            else if (dateTimePicker1.Value > DateTime.Now)
            {
                MessageBox.Show("Data Inválida", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            else
            {
                Livro.Nome = txtNome.Text;
                Livro.Autor = txtAutor.Text;
                Livro.Data = dateTimePicker1.Value.ToString();
                Livro.Editora = txtEditora.Text;
                DialogResult = DialogResult.OK;

            }


            // this.Close();
            //Cadastro();
        }


        private void btnEditar_Click(object sender, EventArgs e)  // BOTÃO CANCELAR
        {
            DialogResult confirm = MessageBox.Show("Deseja Continuar?", "Cancelar", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2);

            if (confirm.ToString().ToUpper() == "YES")
            {
                this.Close();
            }



            //EditaLivros();
            ////              
            //Form1 atualiza = new Form1();
            //atualiza.ListarLivros();


            //this.Close();
        }


        private void txtNome_TextChanged(object sender, EventArgs e)
        {

        }

        private void txtData_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
