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
        try {
            const libro = req.body;
            if (!libro.nombre || !libro.autor || !libro.categoria || !libro.año_publicacion || !libro.ISBN) {
                res.status(400).json({ error: "Todos los campos deben estar completos." });
            } else {

                const [checkResult] = await pool.query("SELECT id FROM libros WHERE nombre=? AND autor=?", [libro.nombre, libro.autor]);
                if (checkResult[0]) {
                    res.status(409).json({ Error: `Ya existe un libro con el mismo nombre y autor.` });
                } else {
                    const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
                    res.json({"Id insertado": result.insertId});
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: "Hubo un fallo al crear el libro." });
            
        }
    }

    async delete(req, res) {
        try{
                const libro = req.body;
                const isbn_libro = libro.ISBN;
                
                const [checkResult] = await pool.query("SELECT id FROM libros WHERE ISBN=?", [isbn_libro]);
                
                if (checkResult[0]) {
                    
                    await pool.query(`DELETE FROM libros where ISBN=?`, [isbn_libro]);
                    res.json({"Aviso":"El libro ha sido eliminado."});
                }else{
                    res.status(404).json({ "Error": "No se ha encontrado un libro con el ISBN especificado." });
                    
                }
            }catch(e) {
                console.log(e);
                res.status(500).json({"Error":"Hubo un fallo al eliminar el libro." });
        }   
    }

}

export const libro = new LibrosController();