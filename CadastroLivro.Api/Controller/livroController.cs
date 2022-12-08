using Microsoft.AspNetCore.Mvc;
using Dominio;
using Infra;
using System.Net;

namespace CadastroLivro.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]

    public class livroController : ControllerBase
    {
        private readonly IRepository _repository;
            public livroController(IRepository repository)
            {
                _repository = repository;
            }
        
        [HttpGet]
        public ActionResult BuscarTodos()
        {
            try
            {
                var todosOsLivros = _repository.BuscarTodos();
                return Ok(todosOsLivros);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Livro> BuscarPorId(int id)
        {
            try
            {
                var livroSelecionado = _repository.BuscarPorId(id);
                if (livroSelecionado == null)
                {
                    return NotFound("Livro não foi encontrado para busca");
                }
                else
                {
                    return Ok(livroSelecionado);
                }
            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Cadastrar([FromBody] Livro livros)
        {
            try
            {
                _repository.Adicionar(livros);
                return Created("Objeto livro", livros);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult Editar(int id, Livro LivroASerEditado)
        {
            try
            {
                _repository.Editar(LivroASerEditado);
                return Ok(LivroASerEditado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Deletar(int id)
        {
            try
            {
                var livroASerDeletado = _repository.BuscarPorId(id);
                _repository.Deletar(livroASerDeletado.Id);

                return Ok("Livro deletado com sucesso");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
