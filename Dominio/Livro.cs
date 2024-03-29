﻿using LinqToDB.Mapping;

namespace Dominio
{
    public class Livro
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Autor { get; set; }
        public DateTime? Data { get; set; }
        public string? Editora { get; set; }

    }

}