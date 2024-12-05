const {convertToMongoObjectId} =require('../utils')
const {ObjectId} = require('mongoose').Types

describe('Checking the function changes JSON parsed MongoDB Id strings back into mongoDB ObjectId data types', () => {
    test('test the function returns the correct data type', () => {
        const input = '67518b740d04e3eb1bdb968f'
        const result = convertToMongoObjectId(input)
        expect(result).toBeInstanceOf(ObjectId)
        expect(result.toString()).toBe(input)
    })
    test('test the function returns same string input when converted back to string', () => {
        const input = '67518b740d04e3eb1bdb968f'
        const result = convertToMongoObjectId(input)
        expect(result.toString()).toBe(input)
    })
    test('test the throws when passed invalid ID string', () => {
        const input = 'Invalid String'
        expect(() => {
            convertToMongoObjectId(input)
        }).toThrow()
    })
})