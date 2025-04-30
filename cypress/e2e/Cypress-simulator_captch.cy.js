


beforeEach(() => {
cy.visit("./src/index.html", {
      
})
  
cy.get("button")
  .contains("Login").click()

  })
  
describe("Cypress Simulator Captch", () => {


it('shows an error on a wrong captcha answer and goes back to its initial state', () => {
  
  cy.get('#captchaInput').type("2000")
  cy.get('#verifyCaptcha').click()
  cy.contains("#captchaError", "Incorrect answer, please try again.")
    .should("be.visible")  
  cy.get('#captchaInput').should("be.empty")
  cy.get('#verifyCaptcha')
  .should('have.attr', 'disabled')
});

it('disables the captcha verify button when no answer is provided or its cleared', () => {

  cy.contains("button", "Verify").should("be.disabled") 
  cy.get('#captchaInput').type("2a")
  cy.contains("button", "Verify")
  .should("be.enabled")
  cy.get('#captchaInput').clear()
  cy.contains("button", "Verify")
    .should("be.disabled")
});
  })