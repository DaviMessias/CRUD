using System.Reflection.PortableExecutable;
using System.Windows.Forms;

namespace crudTEST
{
    public partial class Form1 : Form
    {
        public static List<Livro> list = new List<Livro>();
        public Form1()
        {
            InitializeComponent();
         
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Form2 frm2 = new();
            frm2.ShowDialog();
            //{
            //    AddRows(frm2.Nome, frm2.Autor, frm2.Data, frm2.Editora);
            //}
                 dataGridView1.DataSource=list.ToList();

        }

        private void button2_Click(object sender, EventArgs e)
        {

            Form2 frm2 = new Form2();
            frm2.ShowDialog();

            int rowIndex= dataGridView1.CurrentRow.Index; 


            
        }



        private void button3_Click(object sender, EventArgs e)
        {

        }


        //metodos
        public void AddRows(string nome, string autor, string data, string editora)
        {
            
            Livro novo = new Livro(nome, autor, data, editora) { Nome = nome, Autor = autor, Data = data, Editora = editora };
            list.Add(novo);
            // dataGridView1.Rows.Add(nome, autor);
            dataGridView1.Update();
        }
    }
}