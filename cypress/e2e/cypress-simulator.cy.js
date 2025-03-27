

beforeEach(() => {
  cy.login()
  cy.visit("./src/index.html?skipCaptcha=true", {
    onBeforeLoad(win) {
      win.localStorage.setItem("cookieConsent", "accepted")
    }
  })

  //cy.get("button")
   // .contains("Login").click()

})


describe("Cypress Simulator", () => {

  it("successfully simulates a Cypress command (e.g., cy.get('button'))`.", () => {
    cy.run("cy.get('button')")
    
    cy.get("#outputArea")
      .should("contain", "Success:")
      .and("contain", "cy.get('button') // Got element by selector 'button'")
      .and("be.visible")

  })

  it("shows an error when entering and running an invalid Cypress command (e.g., cy.run())`", () => {
    cy.run("cy.run()")
  
    cy.get("#outputArea")
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")

  });
  it("shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))`", () => {
  cy.run("cy.contains('Login')")
    cy.get("#runButton").click()


    cy.get("#outputArea")
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
  });
  it("it shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)", () => {
    cy.run("cy.visit")  
    cy.get("#outputArea")
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
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
  });
  it("it maximizes and minimizes a simulation result", () => {

    cy.run("help")
    

    cy.get("#outputArea")
      .should("contain", "Common Cypress commands and examples:")
      .and("contain", "For more commands and details, visit the official Cypress API documentation")
      .and("be.visible")

    cy.get('.expand-collapse').click()
      .should("have.attr", "aria-expanded", "true")
    cy.get('.expand-collapse').click()
      .should("have.attr", "aria-expanded", "false")
  });

  it("logs out successfully", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()
    cy.contains("button", "Login").should("be.visible")
  });

  it("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("be.visible")
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("not.be.visible")

  });

  it("Running.. state", () => {
    cy.run("cy.get('button')")
    cy.contains("button", "Running...")
      .should("be.visible")
    cy.contains("#outputArea", "Running... Please wait.")
    cy.contains("button", "Running...")
      .should("not.exist")
    cy.get("#outputArea")
      .should("contain", "Success")
      .and("contain", "cy.get('button') // Got element by selector 'button")
      .and("be.visible")

    //.and("contain","Common Cypress commands and examples:")
    //.and("contain", "For more commands and details, visit the official Cypress API documentation")
    //.and("be.visible")

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

  it(" clears the code input when logging off then logging in again", () => {
    
    cy.run("teste")
    
    cy.get('#sandwich-menu')
      .click()

    cy.contains("button", "Logout")
      .click()
      cy.contains("button", "Login")
      .click()
     

    cy.get("#codeInput")
      .should("be.value", "")
    

  });
  it("disables the run button when logging off then logging in again", () => {
      cy.get('#codeInput')
      .type("cy.get('button')")
    
    cy.get('#sandwich-menu')
      .click()

    cy.contains("button", "Logout")
      .click()
      cy.contains("button", "Login")
      .click()
      cy.get('#codeInput')

    cy.contains("button", "Run")
      .should("be.disabled")

  });
  it("it clears the code output when logging off then logging in again", () => {

    cy.get('#codeInput')
    .type("cy.get('button')")

    cy.contains("button", "Run")
      .click()
    cy.get('#sandwich-menu')
    .click()

    cy.contains("button", "Logout")
    .click()
    cy.contains("button", "Login")
    .click()
    cy.get("#outputArea")
    .should("be.value", "")

  });
  it("it doesn't show the cookie consent banner on the login page", () => {

    cy.clearAllLocalStorage()
    cy.reload()
    cy.contains("button", "Login")
    .should("be.visible")
    cy.get("#cookieConsent")
      .should("not.be.visible")
  });
})








