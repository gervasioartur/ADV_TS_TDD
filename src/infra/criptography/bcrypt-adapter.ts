import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class bcryptAdapter implements Encrypter {
    constructor(
        private readonly salt: number
    ) {
        this.salt = salt
    }
    async encrypt(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, 12)
        return hash
    }
}