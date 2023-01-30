import { AllAutor } from "./all.autor";
import { AllComentario } from "./all.comentario";
import { AllEditorial } from "./all.editorial";
import { AllLibro } from "./all.libro";

export class LibroWithAuEd extends AllLibro{
    autores?:Array<AllAutor>;
    editoriales?:Array<AllEditorial>;
    comentarios?:Array<AllComentario>;
}