import {pool} from './database.js';

class LibrosController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res) {
        try{
                const libro = req.body;
                const id_libro = parseInt(libro.id);
                const [result] = await pool.query(`select * from libros where id=?`, [id_libro]);
                if (result[0]!=undefined){
                    res.json(result);
                }else{
                    res.json({"Error": "No se ha encontrado un libro con la Id especificada"});
                }
            }catch(e) {
                console.log(e);
        }  
    }

    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
        res.json({"Id insertado": result.insertId});
    }


}

export const libro = new LibrosController();