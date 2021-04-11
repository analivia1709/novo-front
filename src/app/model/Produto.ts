import { Categoria } from "./Categoria";
import { Usuario } from "./Usuario";

export class Produto{
    public idProduto: number;
    public nomeProduto: string;
    public preco: number;
    public descricao: string;
    public fotoProduto1: string;
    public fotoProduto2: string;
    public fotoProduto3: string;
    public fotoProduto4: string;
    public videoProduto: string;
    public categoria: Categoria;
    public usuario: Usuario;
    public favoritadoPor: Usuario[];
    public compradoPor: Usuario[];
}