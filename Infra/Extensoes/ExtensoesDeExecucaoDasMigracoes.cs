using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using System.Reflection;

namespace Crud.Infra.Extensoes
{
    public static class ExtensoesDeExecucaoDasMigracoes
    {
        public static void ConfigurarFluentMigrator(this IServiceCollection servicos)
        {
            servicos
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString)
                    .ScanIn(Assembly.GetExecutingAssembly()).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }
    }
}