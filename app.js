const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const dataBase = require('./routes/configDB');
const { response } = require('express');
const { render } = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/public/', express.static('./public'));

const port = 3000;

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/registro-empleados', (req, res) => {
    res.render('registro_empleados')
})

app.post('/empleados', (req, res) => {

    let {email, nombre, apellido, cc, direccion, celular,contrasena } =  req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(contrasena, salt);

    dataBase.query('insert into registro_empleado (email, nombre, apellido, cedula, direccion, celular, contrasena) values (?,?,?,?,?,?;?)',
        [email, nombre, apellido, cc, direccion, celular, hash],
        (error) => {
            if (error) throw error;
            res.send('registro exitoso')
            console.log("Inserción de datos exitosa");
            console.log("User:", email, "Hash:", hash);
        });
});

app.get('/registro-cliente', (req, res) => {
    res.render('registro_cliente');
});

app.post('/cliente', (req, res) => {

    let { nombre, apellido, telefono, email, direccion, Cnombre, Capellido, Pnombre, Praza, cedula, contrasenia } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(contrasenia, salt);

    dataBase.query('insert into registro_cliente (nombre, apellido, telefono, email, direccion, Cnombre, Capellido, Pnombre, Praza,cedula, contrasenia) values (?,?,?,?,?,?,?,?,?,?,?)',
        [nombre, apellido, telefono, email, direccion, Cnombre, Capellido, Pnombre, Praza, cedula, hash],
        (error) => {
            if (error) throw error;
            res.send('registro exitoso')
            console.log("Inserción de datos exitosa");
        });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let cleint1 = req.body.cleint1;
    
    console.log(req.body);
    if (cleint1 == "cliente") {
        dataBase.query("SELECT contrasenia FROM registro_cliente WHERE email=?", [email], (error, data) => {
            if (error) throw error;

            if (data.length > 0) {

                let contraseniaEncriptada = data[0].password;

                if (bcrypt.compareSync(password, contraseniaEncriptada)) {

                    console.log('Inicio de sesion exitoso');
                    return res.send('inicio de sesion exitoso');
                }
                return res.send('Usuario o contraseña incorrecta');
            }
            return res.send('Usuario o contraseña incorrecta');
        });
    } else {

        dataBase.query("SELECT contrasena FROM registro_empleado WHERE cedula=?", [email], (error, data) => {
            if (error) throw error;

            if (data.length > 0) {

                let contraseniaEncriptada = data[0].password;

                if (bcrypt.compareSync(password, contraseniaEncriptada)) {

                    console.log('Inicio de sesion exitoso');
                    return res.send('inicio de sesion exitoso');
                }
                return res.send('Usuario o contraseña incorrecta');
            }
            return res.send('Usuario o contraseña incorrecta');
        });
    }

});

app.listen(port, (req, res) => {
    console.log('¡Server up!');
});