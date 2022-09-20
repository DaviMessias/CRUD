using System.ComponentModel;

namespace crudTEST
{

    //dateTime

    public partial class Form1 : Form
    {
        public static List<Livro> listaDeLivros = new List<Livro>();
        public static int indexSelecionado;

        public Form1()
        {
            InitializeComponent();
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e) // BOTÃO ADICIONAR
        {
            var frm2 = new Form2(null);
            frm2.ShowDialog();

            if (frm2.DialogResult == DialogResult.OK)
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

                frm2.Livro.Id = idASerInserido;
                listaDeLivros.Add(frm2.Livro);

                dataGridView1.DataSource = null;
                dataGridView1.DataSource = listaDeLivros;

                //dataGridView1.DataSource = listaDeLivros;
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)  // BOTÃO EDITAR (PUXA OS VALORES PARA SEREM EDITADOS)
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
                        listaDeLivros.RemoveAt(indexSelecionado);

                        frm2.Livro.Id = indexSelecionado + 1;

                        listaDeLivros.Insert(indexSelecionado, frm2.Livro);

                        dataGridView1.DataSource = null;
                        dataGridView1.DataSource = new BindingList<Livro>(listaDeLivros);
                    }
                }
                else { MessageBox.Show("É preciso selecionar um livro para editar.", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information); }
            }
        }

        private void AoClicarEmExcluir(object sender, EventArgs e)  // BOTÃO EXCLUIR
        {
            if (listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para remover. ", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else if (dataGridView1.CurrentRow.Selected)
            {
                DialogResult confirm = MessageBox.Show("Deseja Continuar?", "Cancelar", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation, MessageBoxDefaultButton.Button2);

                if (confirm.ToString().ToUpper() == "YES")
                {
                    listaDeLivros.RemoveAt(dataGridView1.CurrentRow.Index);
                    dataGridView1.DataSource = null;
                    dataGridView1.DataSource = new BindingList<Livro>(listaDeLivros);

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
            else
            {

            }
        }

        //metodos
        //public void AddRows(string nome, string autor, string data, string editora) // ADICIONA OS VALORES AO DataGrid E IMPLEMENTA ID
        //{
        //    var idAtual = 0;
        //    var idASerInserido = 0;

        //    Livro novo = new Livro() { Nome = nome, Autor = autor, Data = data, Editora = editora };
        //    if (listaDeLivros.Count == 0)
        //    {
        //    }
        //    else
        //    {
        //        idAtual = listaDeLivros.Last().Id;
        //    }

        //    idASerInserido = ++idAtual;

        //    novo.Id = idASerInserido;
        //    listaDeLivros.Add(novo);
        //}

        public List<Livro> ListarLivros()
        {
            dataGridView1.DataSource = new BindingList<Livro>(listaDeLivros);

            //  dataGridView1.Update();
            //dataGridView1.Refresh();
            return listaDeLivros.ToList();


            //var bindingList = new BindingList<Livro>(listaDeLivros);
            //var source = new BindingSource(bindingList, null);
            //dataGridView1.DataSource = listaDeLivros;

            //dataGridView1.DataSource = source;

            // dataGridView1.DataSource = listaDeLivros.ToList();
            //dataGridView1.Rows.Add(nome, autor);

        }
    }
}