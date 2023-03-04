const express  = require ('express');
const mysql = require ('mysql');

const app = express()

app.use(express.json())

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portafolio'
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  app.get('/', (req,res) =>{
    res.json({
        text:'App running'
    })
  })

  app.post('/inicio-sesion',(req,res) =>{
    console.log(req.body)

    const {user, password} = req.body
    const values = [user,password]
    const sql = 'select * from login where user = ? and password = ?'
    console.log('values', values)

    conectBD.query(sql,values,(err,result)=>{
      if(err){
        res.status(500).send(err)
      } else{
        if(result.length > 0){
          console.log(result)
          res.status(200).send({
            "idlogin": result[0].idlogin,
            "user": result[0].user,
            // "password": result[0].password
          })
        }else{
          res.status(400).send('Usuario no existe')
        }
      }
    })

  })


app.listen(3001, console.log('Server running in port 3001'))
