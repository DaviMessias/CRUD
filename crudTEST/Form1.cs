using System.Reflection.PortableExecutable;
using System.Windows.Forms;

namespace crudTEST
{


    //FOI TUDO
    public partial class Form1 : Form
    {
        public static List<Livro> listaDeLivros = new List<Livro>();
        public static int rowIndex;

        
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Form2 frm2 = new Form2();
            frm2.ShowDialog();
            {
                AddRows(frm2.Nome, frm2.Autor, frm2.Data, frm2.Editora);
            }
            ListarLivros();
            
            dataGridView1.ClearSelection();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            
            if(listaDeLivros.Count == 0)
            {
                MessageBox.Show("Não há livros para editar");
            }
            else
            {
                rowIndex = dataGridView1.CurrentRow.Index;
                if (dataGridView1.CurrentRow.Selected)
                {
                    
                    Form2 frm2 = new Form2();

                    frm2.txtNome.Text = dataGridView1.CurrentRow.Cells[1].Value.ToString();
                    frm2.txtAutor.Text = dataGridView1.CurrentRow.Cells[2].Value.ToString();
                    frm2.txtData.Text = dataGridView1.CurrentRow.Cells[3].Value.ToString();
                    frm2.txtEditora.Text = dataGridView1.CurrentRow.Cells[4].Value.ToString();

                    frm2.ShowDialog();
                    
                }
                else { MessageBox.Show("É preciso selecionar um livro para editar!!"); }

                
            }
        }
            



        private void button3_Click(object sender, EventArgs e)
        {
            
        }


        //metodos
        public void AddRows(string nome, string autor, string data, string editora)
        {
            var idAtual = 0;
            var idASerInserido = 0;

            Livro novo = new Livro(nome, autor, data, editora) { Nome = nome, Autor = autor, Data = data, Editora = editora };
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
            dataGridView1.DataSource = listaDeLivros.ToList();
            //dataGridView1.Rows.Add(nome, autor);
            dataGridView1.Update();
            dataGridView1.Refresh();

            return listaDeLivros.ToList();
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}