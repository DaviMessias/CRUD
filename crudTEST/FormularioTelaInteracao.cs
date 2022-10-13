using System.ComponentModel;
using Dominio;
using Infra;

namespace crudTEST
{
    public partial class FormularioTelaInteracao : Form
    {
        private readonly IRepository _repository;
        private List<Livro> listaDeLivros;
        public static int indexSelecionado;

        public FormularioTelaInteracao(IRepository repository)      
        {
            _repository = repository;
          InitializeComponent();
          AtualizarDataGrid();
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e)
        {
            try
            {
                var formulario2 = new FormularioUsuarioEdicao(null);
                formulario2.ShowDialog();
                  
                if (formulario2.DialogResult == DialogResult.OK)
                {
                   _repository.Adicionar(formulario2.Livro);
                   AtualizarDataGrid();
                }
            }
            catch (Exception ex)
            {
                var mensagem = $"{ex.Message}. {ex.InnerException?.Message}";
                MessageBox.Show(mensagem);
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            try
            {
                if (listaDeLivros.Count == 0)
                {
                    MessageBox.Show("N�o h� livros para editar.", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                else
                {
                    indexSelecionado = dataGridView1.CurrentRow.Index;

                    if (dataGridView1.CurrentRow.Selected)
                    {
                        var idSelecionado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                        var livroSelecionado = _repository.BuscarPorId(idSelecionado);
                        FormularioUsuarioEdicao frm2 = new FormularioUsuarioEdicao(livroSelecionado) ?? throw new Exception("erro ao selecionar livro");

                        frm2.ShowDialog();
                        if (frm2.DialogResult == DialogResult.OK)
                        {
                            _repository.Editar(frm2.Livro);
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
                    DialogResult confirm = MessageBox.Show("Deseja excluir o livro selecionado?", "Excluir", MessageBoxButtons.YesNo, MessageBoxIcon.Error, MessageBoxDefaultButton.Button2);

                    if (confirm.ToString().ToUpper() == "YES")
                    {
                        int IdSelecionado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                        _repository.Deletar(IdSelecionado);
                        AtualizarDataGrid();
                    }
                    else
                    {
                        MessageBox.Show("Nenhum livro foi removido. ", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                }
                else if (dataGridView1.SelectedRows.Count == 0)
                {
                    MessageBox.Show("Nenhum Item Selecionado.", "Aten��o", MessageBoxButtons.OK, MessageBoxIcon.Information);
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
            listaDeLivros = _repository.BuscarTodos();
            dataGridView1.DataSource = listaDeLivros;
        }
    }
}