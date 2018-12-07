import { Request, Response} from 'express';
import { ContactController } from './ContactController';

export class ContactRoutes {

    constructor(private contactCtrl: ContactController) {

    }

    public routes(app): void {
        app.route('/v1/contacts').get((request: Request, response: Response) => this.contactCtrl.getContacts(request, response))
    }

    
}
