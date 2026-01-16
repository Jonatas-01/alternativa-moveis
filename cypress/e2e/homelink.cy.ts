Cypress.on("uncaught:exception", (err) => {
    // Ignore hydration errors in development
    if (err.message.includes("Hydration failed")) {
        return false;
    }
});

describe("Home Page Links", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Hero Section Links", () => {
        it('should have "Veja Nossos Produtos" link pointing to catalogo', () => {
            cy.contains("a", "Veja Nossos Produtos").should(
                "have.attr",
                "href",
                "/catalogo"
            );
        });

        it('should navigate to catalogo when clicking "Veja Nossos Produtos"', () => {
            cy.contains("a", "Veja Nossos Produtos").click();
            cy.url().should("include", "/catalogo");
        });
    });

    describe("Destaque Section Links", () => {
        it('should have "Ver Catálogo" link pointing to catalogo', () => {
            cy.contains("a", "Ver Catálogo").should(
                "have.attr",
                "href",
                "/catalogo"
            );
        });

        it('should navigate to catalogo when clicking "Ver Catálogo"', () => {
            cy.contains("a", "Ver Catálogo").click();
            cy.url().should("include", "/catalogo");
        });
    });

    describe("Sobre Nós Section Links", () => {
        it('should have "Saiba Mais" link pointing to sobre-nos page', () => {
            cy.get('section[aria-labelledby="sobre-nos-titulo"]')
                .find("a")
                .contains("Saiba Mais")
                .should("have.attr", "href", "/sobre-nos");
        });

        it('should navigate to sobre-nos when clicking "Saiba Mais"', () => {
            cy.get('section[aria-labelledby="sobre-nos-titulo"]')
                .find("a")
                .contains("Saiba Mais")
                .click();
            cy.url().should("include", "/sobre-nos");
        });
    });

    describe("Chamada Section Links", () => {
        it('should have "Fale Conosco" link pointing to contato section', () => {
            cy.get('section[aria-label="Solicitar Orçamento"]')
                .contains("a", "Fale Conosco")
                .should("have.attr", "href", "/sobre-nos#contato");
        });

        it('should navigate to sobre-nos contato when clicking "Fale Conosco"', () => {
            cy.get('section[aria-label="Solicitar Orçamento"]')
                .contains("a", "Fale Conosco")
                .click();
            cy.url().should("include", "/sobre-nos");
            cy.url().should("include", "#contato");
        });
    });
});
