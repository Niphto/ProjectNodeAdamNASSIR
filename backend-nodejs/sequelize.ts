import { Sequelize } from 'sequelize';

const database = 'CardLearning';
const username = 'CardLearningUser';
const password = 'abc';
const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    logging: false,
});
export default sequelize;