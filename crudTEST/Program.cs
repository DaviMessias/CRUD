using Infra;
using Microsoft.Extensions.DependencyInjection;
using FluentMigrator.Runner;
using Microsoft.Extensions.Hosting;
using System;
using Crud.Infra.Extensoes;

namespace crudTEST
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            var host = CreateHostBuilder().Build();
            var serviceProvider = host.Services;
            var repositorio = serviceProvider.GetService<IRepository>();
            
            BancoMigracaoConfig.MigracaoConfig(serviceProvider);

            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            Application.Run(new FormularioTelaInteracao(repositorio) ?? throw new Exception("Erro ao buscar repositorio"));
        }

        static IHostBuilder CreateHostBuilder()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) => {
                    services.AddScoped<IRepository, RepositoryLINQ>();
                    services.ConfigurarFluentMigrator();
                });
        }
    }
}