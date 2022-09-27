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
                    dateTimePicker1.Value = DateTime.Parse(livro.Data);
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
                if (txtNome.Text.Equals("") || txtAutor.Text.Equals("") || txtEditora.Text.Equals("")) //validação
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
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }


        private void AoClicarEmCancelar(object sender, EventArgs e)  // BOTÃO CANCELAR
        {
            try
            {
                DialogResult confirm = MessageBox.Show("Deseja Continuar?", "Cancelar", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2);

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
