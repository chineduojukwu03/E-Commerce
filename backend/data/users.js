import bcrypt from 'bcryptjs'
const user = [
    {
        name: 'Admin User',
        email: 'Admin@example',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Chinedu Ojukwu',
        email: 'chineduojukwu03@gmail.com',
        password: bcrypt.hashSync('12345', 10)
    },
    {
        name: 'ojukwu Chinedu',
        email: 'ohyukwuc72@gmail.com',
        password: bcrypt.hashSync('12345', 10)
    }

]
export default users