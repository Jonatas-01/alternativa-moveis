Cypress.on("uncaught:exception", (err) => {
    // Ignore hydration errors in development
    if (err.message.includes("Hydration failed")) {
        return false;
    }
});

describe("Sobre Nós Page Links", () => {
    beforeEach(() => {
        cy.visit("/sobre-nos");
    });

    describe("Chamada Section Links", () => {
        it('should have "Fale Conosco" link pointing to contato section', () => {
            cy.contains("a", "Fale Conosco").should(
                "have.attr",
                "href",
                "/sobre-nos#contato"
            );
        });

        it('should scroll to contato section when clicking "Fale Conosco"', () => {
            cy.contains("a", "Fale Conosco").click();
            cy.get("#contato").should("be.visible");
        });
    });

    describe("Contato Section Links", () => {
        it("should have email link with correct mailto href", () => {
            cy.get("#contato")
                .find('a[href^="mailto:"]')
                .should(
                    "have.attr",
                    "href",
                    "mailto:leonardo.alternativamoveis@gmail.com"
                );
        });

        it("should display correct email address", () => {
            cy.get("#contato")
                .find('a[href^="mailto:"]')
                .should("contain.text", "leonardo.alternativamoveis@gmail.com");
        });

        it("should have phone link with correct tel href", () => {
            cy.get("#contato")
                .find('a[href^="tel:"]')
                .should("have.attr", "href", "tel:(62) 3215-0996");
        });

        it("should display correct phone number", () => {
            cy.get("#contato")
                .find('a[href^="tel:"]')
                .should("contain.text", "(62) 3215-0996");
        });

        it("should have WhatsApp contact button with correct href", () => {
            cy.get("#contato")
                .contains("a", "Contate-nos pelo Whatsapp")
                .should("have.attr", "href")
                .and("include", "api.whatsapp.com");
        });

        it("should have WhatsApp contact button with target blank", () => {
            cy.get("#contato")
                .contains("a", "Contate-nos pelo Whatsapp")
                .should("have.attr", "target", "_blank");
        });

        it("should have WhatsApp contact button with noopener noreferrer", () => {
            cy.get("#contato")
                .contains("a", "Contate-nos pelo Whatsapp")
                .should("have.attr", "rel", "noopener noreferrer");
        });

        it("should have Google Maps iframe embedded", () => {
            cy.get("#contato")
                .find('iframe[title="Localização Alternativa Móveis"]')
                .should("exist")
                .and("have.attr", "src")
                .and("include", "google.com/maps");
        });
    });
});
