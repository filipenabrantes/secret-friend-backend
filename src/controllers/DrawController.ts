import { Request, Response } from 'express';
import { User, UserInterface } from '../models/User';
import EmailService from '../services/EmailService';
class DrawController {

    public drawFriends = async (req: Request, res: Response) => {
        const users = await User.find().exec()

        const arrayLength = users.length
        let arraySorteds: Number[] = []
        let numSorted
        let count = 0

        while (arraySorteds.length < arrayLength) {
            numSorted = Math.floor(Math.random() * arrayLength);

            if (!arraySorteds.includes(numSorted)) {
                if (users[numSorted].name != users[count].name) {
                    users[count].friend = users[numSorted].name
                    await users[count].save()
                    await this.sendMail(users[count])
                    arraySorteds.push(numSorted)
                    count++
                }
            }
        }
        res.json(users)
    }

    public async sendMail(user: UserInterface) {
        console.log(`👠 ${user}`);

        EmailService.to = user.email
        EmailService.message = user.friend

        await EmailService.sendMail()
        return
    }
}

export default new DrawController()