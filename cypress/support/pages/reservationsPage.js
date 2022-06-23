import {BasePage} from "../basePage";

export class ReservationsPage extends BasePage {
    constructor() {
        super();
        this._url = `${this._url}/reservations`;
    }

    visit() {
        cy.visit(this._url);
    }
}
