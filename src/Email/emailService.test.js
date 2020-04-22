const emailService = require('./emailService')

const userFactoryMock = jest.fn((name = 'Charles') => ({
    name,
    isOfAge: () => true
}))

const major = userFactoryMock()
const minor = userFactoryMock()
minor.isOfAge = () => false

describe('Email service test suite', () => {
    test('should send an email', () => {
        const emailSent = emailService.sendEmail(major)
        
        expect(emailSent).toBe(true)
    })
    
    test('should send an email', () => {
        const emailSent = emailService.sendEmail(minor)
        
        expect(emailSent).toBe(false)
    })
    

})
