beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    //Assignement 4.1
    it('User can use only same both first and validation passwords', ()=> {
        // Add test steps for filling in only mandatory fields  
        inputValidData();
        // Type a confirmation password that is different from the first password
        cy.get('input[name="confirm"]').clear().type('DifferentMyPass');
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled');

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible');

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible');
    })


    //Assignement 4.2
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        inputValidData();
        cy.get('#cssFavLanguage').check();
        cy.get('input.checkbox#vehicle1').check();
        cy.get('input.checkbox#vehicle2').check();
        cy.get('input.checkbox#vehicle3').check();

        // Selecting a dropdown option by text
        cy.get('#cars').select('Audi');

        // Selecting a dropdown option by text
        cy.get('#animal').select('mouse');

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled');

        // Click the submit button
        cy.get('button.submit_button').click();

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible');
    })


    //Assignement 4.3
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        inputValidData();

        // Selecting a dropdown option by text
        cy.get('#cars').select('Audi');
        
        // Selecting a dropdown option by text
        cy.get('#animal').select('mouse');

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled');

        // Click the submit button
        cy.get('button.submit_button').click();

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible');
        
    })


    //Assignement 4.4
    it('The submit button is not enabled when mandatory user field is not present.', ()=>{
        // You can use the function to enter the correct data and then just clear the input field, that you are currently testing!
        inputValidData();
        cy.get('input[data-testid="user"]').clear();
        cy.get('h2').contains('Password').click()
        
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled');

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible');

        // Assert that error message is visible
        cy.get('#input_error_message').should('be.visible');        
    })
})







/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    //Example code
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    //Assignment 5.2
    // Create similar test for checking second picture
    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check cypress_logo source and size');
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').and('include', 'cypress_logo');
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.within', 88, 116);
    }) 

    //Example code
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    //Assignment 5.3
    // Check that URL to Cerebrum Hub page is correct and clickable
    it('Check navigation part to cerebrumhub.com', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'https://cerebrumhub.com/').click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    //Example code
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    //Assignment 5.4
    // Check favorite transport checkboxes
    it('Check favorite transport checkboxes', () => {
        //There are three checkbox buttons present and unchecked.
        cy.get('.checkbox.vehicles').should('have.length', 3).and('not.be.checked')

        //Verify the label of each checkbox
        cy.get('.checkbox.vehicles').next().eq(0).should('have.text','I have a bike').scrollIntoView();
        cy.get('.checkbox.vehicles').next().eq(1).should('have.text','I have a car')
        cy.get('.checkbox.vehicles').next().eq(2).should('have.text','I have a boat')
        
        //Check 1 and 2 and check them and verify
        cy.get('#vehicle1').check().should('be.checked');
        cy.get('#vehicle2').check().should('be.checked');
        cy.get('#vehicle1, #vehicle2').should('be.checked');

    });      

    //Example code
    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    //Assignment 5.5
    it('Your favourite animal dropdown', () => {

        // The animal dropdown has six choices
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('h2').contains('Select your favourite animal').scrollIntoView();

        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')        
        
        //Verify dropdown list options
        cy.get('#animal').find('option').eq(0).should('have.value','dog')
        cy.get('#animal').find('option').eq(1).should('have.value','cat')
        cy.get('#animal').find('option').eq(2).should('have.value','snake')
        cy.get('#animal').find('option').eq(3).should('have.value','hippo')
        cy.get('#animal').find('option').eq(4).should('have.value','spider')
        cy.get('#animal').find('option').eq(5).should('have.value','mouse')
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('SomeUsername')
    cy.get('#email').type('mickey@disney.com')
    cy.get('[data-cy="name"]').type('Mickey')
    cy.get('#lastName').type('Mouse')
    cy.get('[data-testid="phoneNumberTestId"]').type('123123123')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').clear().type('MyPass')
    cy.get('#confirm').clear().type('MyPass')
}