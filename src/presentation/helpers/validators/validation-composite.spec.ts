import { MissingParamError } from "../../errors"
import { Validation } from "../../protocols/validation"
import { ValidationComposite } from "./validation-composite"

interface SutTypes {
    sut: ValidationComposite
    validationStubs: Validation[]
}

const makeValidation = (): Validation => {
    class ValidatioSTub implements Validation {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidatioSTub()
}

const makeSut = (): SutTypes => {
    const validationStubs = [makeValidation(),makeValidation()]
    const sut = new ValidationComposite(validationStubs)
    return {
        sut,
        validationStubs
    }
}

describe('Validation Composite', () => {
    it('should return an error if any validation fails', () => {
        const { sut, validationStubs } = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
        const error = sut.validate({ field: 'any_value' })
        expect(error).toEqual(new MissingParamError('field'))
    })

    it('should return the frist error if more than one validation fails', () => {
        const { sut, validationStubs } = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
        const error = sut.validate({ field: 'any_value' })
        expect(error).toEqual(new Error())
    })

    it('should not return  if  validation succeeds', () => {
        const { sut, validationStubs } = makeSut()
        const error = sut.validate({ field: 'any_value' })
        expect(error).toBeFalsy()
    })
})