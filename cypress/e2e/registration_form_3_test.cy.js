beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
import 'cypress-file-upload'
function inputValidData() {
    cy.log('Data will be filled')
    cy.get('#name').clear().type('SomeUsername')
    cy.get('[name="email"]').type('mickey@disney.com')
    cy.get('#country').select('Spain')
    cy.get('#city').select('Malaga')
    cy.contains('Date of birth').next().type('1999-01-01')
    cy.get('[value="Daily"]').check()
    cy.get('#birthday').type('1999-01-01')
    cy.get('[type="checkbox"]').eq(0).check()
    cy.get('[type="checkbox"]').eq(1).check()
}


//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe.only('Testi nimi', () => {
    it.only('blah', () => {
        inputValidData()
        cy.get('input[type="file"]').click().attachFile('load_this_file_reg_form_3.txt');
        cy.get('input[name="filename"]').should('be.visible');
        cy.get('[type="submit"]').should('be.enabled');
        cy.get('[type="submit"]').last().click();

        cy.get('h1').should('have.text', 'Submission received')
        

    });
});























describe('Section 1: visual tests', ()=> {
    it('This is my first test', () => {
        // This is empty template
        inputValidData();
    });
})

//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */