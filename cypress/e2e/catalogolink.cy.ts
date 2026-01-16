Cypress.on("uncaught:exception", (err) => {
    // Ignore hydration errors in development
    if (err.message.includes("Hydration failed")) {
        return false;
    }
});

describe("Catalogo Page Links", () => {
    beforeEach(() => {
        cy.visit("/catalogo");
    });

    describe("Product Cards Links", () => {
        it("should have product cards with links to product detail", () => {
            cy.get('a[href^="/catalogo/"]')
                .first()
                .should("have.attr", "href")
                .and("match", /\/catalogo\/[a-zA-Z0-9-]+/);
        });

        it("should navigate to product detail when clicking a product card", () => {
            cy.get('a[href^="/catalogo/"]').first().click();
            cy.url().should("match", /\/catalogo\/[a-zA-Z0-9-]+/);
        });
    });
});

describe("Product Detail Page Links", () => {
    beforeEach(() => {
        // First visit catalogo and click on first product
        cy.visit("/catalogo");
        cy.get('a[href^="/catalogo/"]').first().click();
        cy.url().should("match", /\/catalogo\/[a-zA-Z0-9-]+/);
    });

    describe("Breadcrumb Links", () => {
        it("should have breadcrumb link to Catálogo", () => {
            cy.get("nav ol")
                .contains("a", "Catálogo")
                .should("have.attr", "href", "/catalogo");
        });

        it('should navigate to catalogo when clicking breadcrumb "Catálogo"', () => {
            cy.get("nav ol").contains("a", "Catálogo").click();
            cy.url().should("eq", Cypress.config().baseUrl + "/catalogo");
        });

        it("should navigate to filtered catalogo when clicking category breadcrumb", () => {
            cy.get("nav ol").find('a[href*="/catalogo?categoria="]').click();
            cy.url().should("include", "/catalogo");
        });
    });

    describe("WhatsApp Link", () => {
        it("should have WhatsApp contact button with correct href", () => {
            cy.contains("a", "Contate-nos pelo Whatsapp")
                .should("have.attr", "href")
                .and("include", "api.whatsapp.com");
        });

        it("should have WhatsApp contact button with target blank", () => {
            cy.contains("a", "Contate-nos pelo Whatsapp").should(
                "have.attr",
                "target",
                "_blank"
            );
        });
    });

    describe("Related Products Links", () => {
        it("should have related product links if available", () => {
            cy.get("body").then(($body) => {
                if (
                    $body.find('h2:contains("Você também pode gostar")')
                        .length > 0
                ) {
                    cy.contains("h2", "Você também pode gostar")
                        .parent()
                        .find('a[href^="/catalogo/"]')
                        .should("have.length.at.least", 1);
                }
            });
        });

        it("should navigate to related product when clicking", () => {
            cy.get("body").then(($body) => {
                if (
                    $body.find('h2:contains("Você também pode gostar")')
                        .length > 0
                ) {
                    cy.contains("h2", "Você também pode gostar")
                        .parent()
                        .find('a[href^="/catalogo/"]')
                        .first()
                        .click();
                    cy.url().should("match", /\/catalogo\/[a-zA-Z0-9-]+/);
                }
            });
        });
    });

    describe("Header Links on Product Detail", () => {
        it("should navigate to home when clicking on logo", () => {
            cy.get("header").find("a").first().click();
            cy.url().should("eq", Cypress.config().baseUrl + "/");
        });

        it('should navigate to catalogo when clicking "Catálogo"', () => {
            cy.get("nav").contains("a", "Catálogo").click();
            cy.url().should("include", "/catalogo");
        });
    });
});
