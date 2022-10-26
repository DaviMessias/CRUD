using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;

namespace Infra
{
    public class BancoMigracaoConfig
    {
        public static void MigracaoConfig(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                AtualizarDB(scope.ServiceProvider);
            }
        }

        private static void AtualizarDB(IServiceProvider serviceProvider)
        {
            var executar = serviceProvider.GetRequiredService<IMigrationRunner>();

            executar.MigrateUp();
        }
    }
}