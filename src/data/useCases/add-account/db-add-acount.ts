import { AddAccount, AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from "./"
export class DbAddAccount implements AddAccount {
    constructor (
        private readonly encrypter: Encrypter,
        private readonly addAccountRepository: AddAccountRepository
    ) {
        this.encrypter = encrypter
    }

    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encrypter.encrypt(accountData.password)
        const accout = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
        return accout
    }
}
