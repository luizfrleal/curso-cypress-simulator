describe("Cypress Simulator - A11y Checks", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("./src/index.html?skipCaptcha=true", {
        onBeforeLoad(win) {
          win.localStorage.setItem("cookieConsent", "accepted")
        }
      })
      //cy.contains("button", "Login").click()*/
      cy.injectAxe()
    })


        it("successfully simulates a Cypress command (e.g., cy.get('button'))`.", () => {
         cy.run("cy.get('button')")
         cy.get("#outputArea")
            .should("contain", "Success:")
            .and("contain", "cy.get('button') // Got element by selector 'button'")
            .and("be.visible")
         cy.checkA11y(".success")
      
        })
      
        it("shows an error when entering and running an invalid Cypress command (e.g., cy.run())`", () => {
          cy.run("('button')")  
          cy.get("#outputArea")
            .should("contain", "Error:")
            .and("contain", "Invalid Cypress command: ('button')")
            .and("be.visible")
            cy.checkA11y(".error")
        });

        it("shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))`", () => {
         cy.run("cy.contains('Login')")
        
          cy.get("#outputArea")
            .should("contain", "Warning:")
            .and("contain", "The `cy.contains` command has not been implemented yet.")
            .and("be.visible")
            cy.checkA11y(".warning")
        });
      
        it("asks for help and gets common Cypress commands and examples with a link to the docs`", () => {
      
          cy.run("help")
          cy.get("#outputArea")
            .should("contain", "Common Cypress commands and examples:")
            .and("contain", "For more commands and details, visit the official Cypress API documentation")
            .and("be.visible")
          cy.contains("#outputArea  a", "official Cypress API documentation")
            .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
            .and("have.attr", "target", "_blank")
            .and("have.attr", "rel", "noopener noreferrer")
            cy.checkA11y("#outputArea")
        });

        it("it maximizes and minimizes a simulation result", () => {
          cy.run("help")
          cy.get("#outputArea")
            .should("contain", "Common Cypress commands and examples:")
            .and("contain", "For more commands and details, visit the official Cypress API documentation")
            .and("be.visible")
          cy.get('.expand-collapse').click()
            .should("have.attr", "aria-expanded", "true")
            cy.checkA11y()
          cy.get('.expand-collapse').click()
            .should("have.attr", "aria-expanded", "false")
        });
      
        it("logs out successfully", () => {
          cy.get("#sandwich-menu").click()
          cy.contains("button", "Logout").click()
          cy.contains("button", "Login").should("be.visible")
          cy.checkA11y()
      
        });
      
        it("shows and hides the logout button", () => {
          cy.get("#sandwich-menu").click()
          cy.contains("button", "Logout").should("be.visible")
          cy.checkA11y()
          cy.get("#sandwich-menu").click()
          cy.contains("button", "Logout").should("not.be.visible")
      
        });
      
      
        it("Running.. state", () => {
          cy.run("cy.get('button')")
          
          cy.contains("button", "Running...")
            .should("be.visible")
          cy.contains("#outputArea", "Running... Please wait.")
          cy.checkA11y()
          cy.contains("button", "Running...")
            .should("not.exist")
          cy.get("#outputArea")
            .should("contain", "Success")
            .and("contain", "cy.get('button') // Got element by selector 'button")
            .and("be.visible")
        });
      
      
        it('checks the run button disabled and enabled states', () => {
        cy.contains("button", "Run")
          .should("be.disabled")      
        cy.get('#codeInput')
          .type("teste")
        cy.get("#runButton")
          .should("not.have.attr", "disabled")
        cy.get('#codeInput')
        .clear("")
        cy.get("#runButton")
        .should("have.attr", "disabled")
      
    });
});
       


  describe("Cypress Simulator - Cookies Consent", () => {
    beforeEach(()=> {
      cy.login()
      cy.visit("./src/index.html?skipCaptcha=true", {
        onBeforeLoad(win) {
    ///  cy.contains("button", "Login")
       // .click()        
    }})
      cy.injectAxe()
    })
  
    it(' consents on the cookies usage', () => {
      cy.get('#acceptCookies')
        .should("be.visible")
      cy.checkA11y()
      cy.get('#acceptCookies')
        .click()
      cy.get('#acceptCookies')
          .should("not.be.visible")
      cy.window().then((win) => {
          const valor = win.localStorage.getItem('cookieConsent');
          expect(valor).to.equal('accepted');
        });
      });
    });
  
  
  
  
  
  
  
describe("Cypress Simulator Captch", () => {
  beforeEach(() => {
    cy.visit("./src/index.html", {
      
    })
    cy.get("button")
      .contains("Login").click()
    cy.injectAxe()
  })
       
it("it finds no a11y issues on all captcha view states (button enabled/disabled and error", () => {

  cy.contains("button", "Verify")
    .should("be.disabled")
  cy.get('#captchaInput')
    .type("26")
  cy.contains("button", "Verify")
    .should("be.enabled")
  cy.checkA11y()
  cy.get('#verifyCaptcha')
    .click()
  cy.contains("#captchaError", "Incorrect answer, please try again.")
    .should("be.visible")
  cy.get('#captchaInput')
    .should("be.empty")
  cy.get('#verifyCaptcha')
    .should('have.attr', 'disabled')
  cy.checkA11y()
})
  });