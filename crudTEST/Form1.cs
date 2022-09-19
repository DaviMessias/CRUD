using System.ComponentModel;
using System.Reflection.PortableExecutable;
using System.Windows.Forms;

namespace crudTEST
{

    //testando
    
    public partial class Form1 : Form
    {
        public static List<Livro> listaDeLivros = new List<Livro>();
        public static int rowIndex;

        
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e) // BOTÃO ADICIONAR
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
                dataGridView1.DataSource = new BindingList<Livro>(listaDeLivros);
                //dataGridView1.DataSource = listaDeLivros;

            }
            else
            {
                MessageBox.Show("Erro ao salvar livro");
            }
        }


        private void button2_Click(object sender, EventArgs e)  // BOTÃO EDITAR (PUXA OS VALORES PARA SEREM EDITADOS)
        {
            Livro livro = new Livro();
            
            if(listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para editar!", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                rowIndex = dataGridView1.CurrentRow.Index;
                if (dataGridView1.CurrentRow.Selected)
                {
                    
                    Form2 frm2 = new Form2(livro);

                    frm2.txtNome.Text = dataGridView1.CurrentRow.Cells[1].Value.ToString();
                    frm2.txtAutor.Text = dataGridView1.CurrentRow.Cells[2].Value.ToString();
                    frm2.txtData.Text = dataGridView1.CurrentRow.Cells[3].Value.ToString();
                    frm2.txtEditora.Text = dataGridView1.CurrentRow.Cells[4].Value.ToString();

                    frm2.ShowDialog();
                    
                }
                else { MessageBox.Show("É preciso selecionar um livro para editar.", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information); }

                
            }
        }

        private void button3_Click(object sender, EventArgs e)  // BOTÃO EXCLUIR
        {

            if (listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para remover. ", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else if (dataGridView1.CurrentRow.Selected)
            {
                dataGridView1.Rows.Remove(dataGridView1.CurrentRow);
            }
            else if (dataGridView1.SelectedRows.Count == 0)
                {
                    MessageBox.Show("Nenhum Item Selecionado", "Atenção", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }
        }

        //metodos
        public void AddRows(string nome, string autor, string data, string editora) // ADICIONA OS VALORES AO DataGrid E IMPLEMENTA ID
        {
            var idAtual = 0;
            var idASerInserido = 0;

            Livro novo = new Livro() { Nome = nome, Autor = autor, Data = data, Editora = editora };
            if (listaDeLivros.Count == 0)
            {
            }
            else
            {
                idAtual = listaDeLivros.Last().Id;
            }

            idASerInserido = ++idAtual;

            novo.Id = idASerInserido;
            listaDeLivros.Add(novo);
        }

        public List<Livro> ListarLivros()   
        {
            dataGridView1.DataSource = new BindingList<Livro>(listaDeLivros);

            dataGridView1.Update();
            dataGridView1.Refresh();
            return listaDeLivros.ToList();


            //var bindingList = new BindingList<Livro>(listaDeLivros);
            //var source = new BindingSource(bindingList, null);
            //dataGridView1.DataSource = listaDeLivros;

            //dataGridView1.DataSource = source;

           // dataGridView1.DataSource = listaDeLivros.ToList();
            //dataGridView1.Rows.Add(nome, autor);

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}