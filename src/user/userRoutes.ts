import { UserController } from './userController';
import { UploadUtil } from '../common/uploadUtil';

export class UserRoutes {

    constructor(private userCtrl: UserController, private uploadUtil: UploadUtil) {

    }

    public routes(app): void {
        app.route('/v1/users').post(this.userCtrl.createUser)
        app.route('/v1/users/:id').get(this.userCtrl.getUser)
        app.route('/v1/users/:id').put(this.userCtrl.editUser)
        app.route('/v1/users/:id').delete(this.userCtrl.deleteUser)
        app.route('/v1/users/:id/avatar').post(this.uploadUtil.avatarUpload().single('avatar'), this.userCtrl.uploadAvatar)
        app.route('/v1/users/:id/avatar').get(this.userCtrl.retreiveAvatar)
    }
    
}
