import { ContactController } from './contactController';

export class ContactRoutes {
    constructor(private contactCtrl: ContactController) {

    }
    public routes(app): void {
        app.route('/v1/contacts').get(this.contactCtrl.getContacts)
    }
}
