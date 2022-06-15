import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount, Validation } from './singup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SingUpController implements Controller {
    constructor (
        private readonly addAccount: AddAccount,
        private readonly validation: Validation
    ) {
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = httpRequest.body
            const account = await this.addAccount.add({
                name,
                email,
                password
            })
            return ok(account)
        } catch (error) {
            return serverError(error)
        }
    }
}
