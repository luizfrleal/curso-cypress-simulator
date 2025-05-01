

beforeEach(() => {
  cy.login()
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        //win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
  
  })
  
  
  describe("Cypress Simulator", () => {

    it(' consents on the cookies usage', () => {
        cy.get('#acceptCookies').click()
       
        cy.get('#acceptCookies')
            .should("not.be.visible")

            cy.window().then((win) => {
                const valor = win.localStorage.getItem('cookieConsent');
                expect(valor).to.equal('accepted');
              });
            });

    it(' consents on the cookies usage', () => {
        cy.get('#declineCookies').click()
               
        cy.get('#declineCookies')
            .should("not.be.visible")
        
        cy.window().then((win) => {
            const valor = win.localStorage.getItem('cookieConsent');
            expect(valor).to.equal('declined');
                
        
    });
});
  
 
    })