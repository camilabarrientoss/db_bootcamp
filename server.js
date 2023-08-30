const express = require('express');
const app = express();
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const {
    createUser,
    findUserById,
    findAllUsers,
    updateUser,
    deleteUserById
} = require('./app/controllers/user.controller');
const {
    createBootcamp,
    addUserToBootcamp,
    findBootcampById,
    findAllBootcamps,
    updateBootcamp,
    deleteBootcampById
} = require('./app/controllers/bootcamp.controller');

const PORT = process.env.PORT;

// http://localhost:3000/user/create/firstName/Mateo/lastName/Diaz/email/mateodiaz@correo.com
app.get('/user/create/firstName/:firstName/lastName/:lastName/email/:email', async (req, res) => {
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const email = req.params.email;
    try {
        const usuario = await createUser({
            firstName,
            lastName,
            email
        });
        res.status(StatusCodes.CREATED).json({
            message: `usuario ${usuario.firstName} fue creado con éxito`,
            user: usuario
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/create/name/Bootcamp1/title/Javascript/Crearasaplicaciones
app.get('/bootcamp/create/name/:name/tittle/:tittle/description/:description', async (req, res) => {
    const name = req.params.name;
    const tittle = req.params.tittle;
    const description = req.params.description;
    try {
        const boot = await createBootcamp({
            name,
            tittle,
            description
        });
        res.status(StatusCodes.CREATED).json({
            message: `bootcamp ${boot.name} fue creado con éxito`,
            bootcamp: boot
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/adduser/idBootcamp/1/idUser/1
app.get('/bootcamp/adduser/idBootcamp/:idBootcamp/idUser/:idUser', async (req, res) => {
    const idBootcamp = Number(req.params.idBootcamp);
    const idUser = Number(req.params.idUser);
    try {
        const boot = await addUserToBootcamp(idBootcamp, idUser);
        res.status(StatusCodes.CREATED).json({
            message: `Se agregó usuario id ${idUser} al bootcamp id ${idBootcamp}`,
            bootcamp: boot
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/findById/1
app.get('/user/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const usuario = await findUserById(id);
        if (usuario) {
            res.status(StatusCodes.OK).json({
                message: `usuario ${usuario.name} fue encontrado con éxito`,
                user: usuario
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/findById/1
app.get('/bootcamp/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const boot = await findBootcampById(id);
        if (boot) {
            res.status(StatusCodes.OK).json({
                message: `bootcamp ${boot.name} fue encontrado con éxito`,
                bootcamp: boot
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `bootcamp id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user
app.get('/user', async (req, res) => {
    try {
        const usuarios = await findAllUsers();
        res.status(StatusCodes.OK).json({
            message: `se encontraron ${usuarios.length} usuarios`,
            users: usuarios
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp
app.get('/bootcamp', async (req, res) => {
    try {
        const boot = await findAllBootcamps();
        res.status(StatusCodes.OK).json({
            message: `se encontraron ${boot.length} bootcamps`,
            bootcamp: boot
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/update/id/1/nombre/Pedro%20Picapiedra
app.get('/user/update/id/:id/nombre/:nombre', async (req, res) => {
    const id = Number(req.params.id);
    const name = req.params.nombre;
    try {
        const actualizados = await updateUser({
            id,
            name
        });
        if (actualizados) {
            if (actualizados !== -1) {
                res.status(StatusCodes.CREATED).json({
                    message: `usuario id ${id} fue actualizado con éxito`
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: `usuario id ${id} no fue actualizado. No había nada que actualizar.`
                });
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/update/id/1/nombre/Bootcamp%20B
app.get('/bootcamp/update/id/:id/nombre/:nombre', async (req, res) => {
    const id = Number(req.params.id);
    const name = req.params.nombre;
    try {
        const actualizados = await updateBootcamp({
            id,
            name
        });
        if (actualizados) {
            res.status(StatusCodes.CREATED).json({
                message: `bootcamp id ${id} fue actualizado con éxito`
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `bootcamp id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/delete/id/1
app.get('/user/delete/id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const borrados = await deleteUserById(id);
        if (borrados) {
            res.status(StatusCodes.CREATED).json({
                message: `usuario id ${id} fue borrado con éxito`
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/delete/id/1
app.get('/bootcamp/delete/id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const borrados = await deleteBootcampById(id);
        if (borrados) {
            res.status(StatusCodes.CREATED).json({
                message: `bootcamp id ${id} fue borrado con éxito`
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `bootcamp id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));