using System.ComponentModel;

namespace crudTEST
{

   //          26/09

    public partial class Form1 : Form
    {
        private Repository repository = new Repository();
        private List<Livro> listaDeLivros = Singleton.Instance();
        public static int indexSelecionado;

        public Form1()
        {
            InitializeComponent();
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e) // BOTÃO ADICIONAR
        {
            try
            {
                var formulario2 = new Form2(null);
                formulario2.ShowDialog();

                if (formulario2.DialogResult == DialogResult.OK)
                {
                    var idAtual = 0;
                    var idASerInserido = 0;

                    if (listaDeLivros.Count == 0)
                    {
                        idASerInserido = 1;
                    }
                    else
                    {
                        idAtual = listaDeLivros.Last().Id;
                    }

                    idASerInserido = ++idAtual;

                    formulario2.Livro.Id = idASerInserido;

                    repository.Adicionar(formulario2.Livro);

                    AtualizarDataGrid();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)  // BOTÃO EDITAR (PUXA OS VALORES PARA SEREM EDITADOS)
        {
            try
            {
            if (listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para editar!", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                indexSelecionado = dataGridView1.CurrentRow.Index;
                if (dataGridView1.CurrentRow.Selected)
                {
                   var livroSelecionado = dataGridView1.Rows[indexSelecionado].DataBoundItem as Livro;
                   Form2 frm2 = new Form2(livroSelecionado) ?? throw new Exception("erro ao selecionar livro");

                   frm2.ShowDialog();
                if (frm2.DialogResult == DialogResult.OK)
                {
                   repository.Editar(frm2.Livro);

                   AtualizarDataGrid();
                }
                }  
                else 
                    { 
                        MessageBox.Show("É preciso selecionar um livro para editar.", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information); 
                    }
            }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        private void AoClicarEmExcluir(object sender, EventArgs e)  // BOTÃO EXCLUIR
        {
            try
            {
            if (listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para remover. ", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else if (dataGridView1.CurrentRow.Selected)
            {
                DialogResult confirm = MessageBox.Show("Deseja Continuar?", "Excluir", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2);

                if (confirm.ToString().ToUpper() == "YES")
                {
                    int IdSelecionado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                    repository.Deletar(IdSelecionado);
                

                    AtualizarDataGrid();

                }
                else
                {
                    MessageBox.Show("O Livro não foi removido. ");
                }
            }
            else if (dataGridView1.SelectedRows.Count == 0)
            {
                MessageBox.Show("Nenhum Item Selecionado", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            } catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }
     
        public void AtualizarDataGrid()
        {
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = listaDeLivros;
        }

    }
}