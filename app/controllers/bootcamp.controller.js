const { 
    Bootcamp,
    User 
} = require('../models');


const createBootcamp = async (bootcamp) => {
    try {
        const boot = await Bootcamp.create({
            name: bootcamp.name,
            tittle: bootcamp.tittle,
            description: description.bootcamp
        });
        console.log(`Se ha creado el bootcamp ${JSON.stringify(boot, null, 4)}`);
        return boot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addUserToBootcamp = async (bootcampId, userId) => {
    try {
        const boot = await Bootcamp.findByPk(bootcamptId);
        if (!boot) {
            console.log(`No se encontró bootcamp con id ${bootcampId}`);
            return null;
        }
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            console.log(`No se encontró usuario con id ${userId}`);
            return null;
        }
        await boot.addUser(usuario);
        console.log(`Agredado el usuario id ${usuario.id} al bootcamp con id ${bootcamp.id}`);
        return boot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findBootcampById = async (id) => {
    try {
        const boot = await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se ha encontrado el bootcamp ${JSON.stringify(boot, null, 4)}`);
        return boot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllBootcamps = async () => {
    try {
        const boot = await Bootcamp.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los bootcamps ${JSON.stringify(boot, null, 4)}`);
        return boot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateBootcamp = async (bootcamp) => {
    try {
        const actualizados = await Bootcamp.update({
            name: bootcamp.name
        }, {
            where: { id: bootcamp.id }
        });
        console.log(`actualizados: ${actualizados}`);
        console.log(`Bootcamp id ${bootcamp.id} fue actualizado con éxito`);
        return actualizados[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteBootcampById = async (id) => {
    try {
        const borrados = await Bootcamp.destroy({ 
            where: { id }
        });
        console.log(`borrados: ${borrados}`);
        console.log(`Bootcamp id ${id} fue borrado con éxito`);
        return borrados;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createBootcamp,
    addUserToBootcamp,
    findBootcampById,
    findAllBootcamps,
    updateBootcamp,
    deleteBootcampById
}