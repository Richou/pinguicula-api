import { Request, Response} from 'express';
import { ContactController } from './contactController';

export class ContactRoutes {

    constructor(private contactCtrl: ContactController) {

    }

    public routes(app): void {
        app.route('/v1/contacts').get((request: Request, response: Response) => this.contactCtrl.getContacts(request, response))
    }
    
}
