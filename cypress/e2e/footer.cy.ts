Cypress.on("uncaught:exception", (err) => {
    // Ignore hydration errors in development
    if (err.message.includes("Hydration failed")) {
        return false;
    }
});

describe("Footer Links", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Footer Links", () => {
        it('should have "Início" link in footer pointing to home', () => {
            cy.get("footer")
                .contains("a", "Início")
                .should("have.attr", "href", "/");
        });

        it('should have "Catálogo" link in footer pointing to catalogo', () => {
            cy.get("footer")
                .contains("a", "Catálogo")
                .should("have.attr", "href", "/catalogo");
        });

        it('should have "Serviços" link in footer pointing to servicos section', () => {
            cy.get("footer")
                .contains("a", "Serviços")
                .should("have.attr", "href", "#servicos");
        });

        it('should have "Sobre Nós" link in footer pointing to sobre-nos', () => {
            cy.get("footer")
                .contains("a", "Sobre Nós")
                .should("have.attr", "href", "/sobre-nos");
        });

        it("should have phone link with correct tel href", () => {
            cy.get("footer")
                .find('a[href^="tel:"]')
                .should("have.attr", "href", "tel:+556232150996");
        });

        it("should have email link with correct mailto href", () => {
            cy.get("footer")
                .find('a[href^="mailto:"]')
                .should(
                    "have.attr",
                    "href",
                    "mailto:leonardo.alternativamoveis@gmail.com"
                );
        });

        it("should have WhatsApp link in footer with correct href", () => {
            cy.get("footer")
                .contains("a", "Whatsapp")
                .should("have.attr", "href")
                .and("include", "api.whatsapp.com");
        });

        it("should have WhatsApp link in footer with target blank", () => {
            cy.get("footer")
                .contains("a", "Whatsapp")
                .should("have.attr", "target", "_blank");
        });

        it("should have Instagram link with correct href", () => {
            cy.get("footer")
                .contains("a", "Instagram")
                .should("have.attr", "href")
                .and("include", "instagram.com");
        });

        it("should have Instagram link with target blank", () => {
            cy.get("footer")
                .contains("a", "Instagram")
                .should("have.attr", "target", "_blank");
        });

        it("should have Login link pointing to auth login page", () => {
            cy.get("footer")
                .contains("a", "Login")
                .should("have.attr", "href", "/auth/login");
        });

        it("should navigate to footer links correctly", () => {
            cy.get("footer").contains("a", "Catálogo").click();
            cy.url().should("include", "/catalogo");
        });
    });

    describe("Anchor Links Navigation", () => {
        it("should scroll to servicos section when clicking #servicos link", () => {
            cy.get("footer").contains("a", "Serviços").click();
            cy.get("#servicos").should("be.visible");
        });
    });
});
