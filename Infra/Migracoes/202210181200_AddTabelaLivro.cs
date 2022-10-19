using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentMigrator.SqlServer;
using System.Threading.Tasks;

namespace Infra.Migracoes
{
    [Migration(202210181200)]
    public class _202210181200_AddTabelaLivro : Migration
    {
        public override void Up()
        {
            Create.Table("Livro")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Nome").AsString()
                .WithColumn("Autor").AsString()
                .WithColumn("Data").AsDateTime()
                .WithColumn("Editora").AsString();
        }

        public override void Down()
        {
            Delete.Table("Livro");
        }
    }
}
