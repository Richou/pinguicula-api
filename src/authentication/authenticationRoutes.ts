import { AuthenticationController } from './authentication.controller';

export class AuthenticationRoutes {

    constructor(private authenticationCtrl: AuthenticationController) {

    }

    public routes(app): void {
        app.route('/v1/login').post(this.authenticationCtrl.login)
    }
}