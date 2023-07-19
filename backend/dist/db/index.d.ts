import { Sequelize, Model } from "sequelize";
export declare const sequelize: Sequelize;
export declare class UserModel extends Model {
    id: number;
    email: string;
    access_token: string;
    nhi_payed: string;
}
declare const db: any;
export default db;
//# sourceMappingURL=index.d.ts.map