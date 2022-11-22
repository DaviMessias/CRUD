using Infra;
using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();


    builder.Services.AddCors();
    builder.Services.AddScoped<IRepository, RepositoryLINQ>();
}

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()
       );
    app.UseAuthentication();
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseStaticFiles(new StaticFileOptions()
    {
        ContentTypeProvider = new FileExtensionContentTypeProvider
        {
            Mappings = { [".properties"] = "application/x-msdownload" }
        }
    });
    app.MapControllers();
    app.Run();
}
