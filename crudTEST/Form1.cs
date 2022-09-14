namespace crudTEST
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            List<Livro> list = new List<Livro>();
            Livro l = new Livro();
            list.Add(l);

            InitializeComponent();
            dataGridView1.DataSource = list.ToList();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form2 frm2 = new Form2();
            frm2.ShowDialog();
        }

        private void button2_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {

        }
    }
}