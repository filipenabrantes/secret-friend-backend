import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {

    public async index(req: Request, res: Response) {

        const users = await User.find().exec();

        if (!users) {
            console.log('erro ao consultar os usuários');
            return;
        }
        res.json(users)
    }

    public async show(req: Request, res: Response) {

        const { _id: id } = req.params
        const userFound = await User.findById(id).exec();

        if (!userFound) {
            console.log('erro ao consultar os usuários');
            return;
        }
        res.json(userFound)
    }

    public async store(req: Request, res: Response) {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        try {
            const newUser = await user.save();
            res.send({
                message: 'Participante cadastrado',
                newUser
            })
        } catch (error) {
            console.log('deu erro');
        }
    }

    public async update(req: Request, res: Response) {

        const _id = req.params.id
        const { name, email } = req.body
        console.log(req.body);

        await User.findByIdAndUpdate({ _id }, { $set: { name, email } })
        res.json('Atualizado')
    }

    public async destroy(req: Request, res: Response) {
        const userFound = await User.findOne({ _id: req.params.id });
        console.log(`🦋 ${userFound}`);


        if (!userFound) {
            console.log('usuario nao encontrado');
        }
        await User.deleteOne({ _id: userFound?._id })
        res.json('Deletado com sucesso')
    }
}

export default new UserController();
