using System.ComponentModel;
using Dominio;

namespace crudTEST
{

    //1

    public partial class Form1 : Form
    {
        private RepositoryDB repository = new RepositoryDB();
        private List<Livro> listaDeLivros;
        public static int indexSelecionado;

        public Form1()      
        {
          InitializeComponent();
          AtualizarDataGrid();
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e)
        {
            try
            {
              var formulario2 = new Form2(null);
              formulario2.ShowDialog();
                
              if (formulario2.DialogResult == DialogResult.OK)
              {
                 repository.Adicionar(formulario2.Livro);
                 AtualizarDataGrid();
              }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            try
            {
                if (listaDeLivros.Count == 0)
                {
                    MessageBox.Show("N�o h� livros para editar!", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                else
                {
                    indexSelecionado = dataGridView1.CurrentRow.Index;

                    if (dataGridView1.CurrentRow.Selected)
                    {
                        var idSelecionado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                        var livroSelecionado = repository.BuscarPorId(idSelecionado);
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
                        MessageBox.Show("� preciso selecionar um livro para editar.", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AoClicarEmExcluir(object sender, EventArgs e)
        {
            try
            {
                if (listaDeLivros.Count == 0)
                {
                    MessageBox.Show("N�o h� livros para remover. ", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
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
                        MessageBox.Show("O Livro n�o foi removido. ");
                    }
                }
                else if (dataGridView1.SelectedRows.Count == 0)
                {
                    MessageBox.Show("Nenhum Item Selecionado", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        public void AtualizarDataGrid()
        {
            listaDeLivros = repository.BuscarTodos();
            dataGridView1.DataSource = listaDeLivros;
        }


    }
}