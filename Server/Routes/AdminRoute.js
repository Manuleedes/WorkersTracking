import express, { response } from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()

router.post('/adminlogin',(req,res) =>{
    const sql = "SELECT * from admin where email = ? and password = ?"
    con.query(sql,[req.body.email, req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus: false, Error: "Query error"})
            if(result.length > 0){
                const email = result[0].email;
                const token = jwt.sign({role: "admin",email:email},
                    "jwt_secret_key",{expiresIn: '1d'})

                    res.cookie('token',token)
                    return res.json({loginStatus: true})
            }else{
                return res.json({loginStatus: false, Error: "Wrong Email or password"})
            }
           
    })
    
})
router.get('/cartegory',(req,res)=>{
    const sql = "SELECT * FROM cartegory"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error"})

            return res.json({Status: true, Result:result})
    })
})


router.post('/add_cartegory',(req, res)=>{
    const sql = "INSERT INTO cartegory (`name`) VALUES(?)"
    con.query(sql, [req.body.cartegory],(err,result)=>{
        if(err) 
            return res.json({Status:false,Error:"Query error"})

            return res.json({Status: true})
    })
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null , 'Public/Images')
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + "_" +Date.now() +path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
router.post('/add_employee',upload.single('image'),(req,res)=>{
      const sql = `INSERT INTO employee 
       (name,email,password,address,salary, image,cartegory_id) VALUES(?)`
       bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err) 
            return res.json({Status:false,Error:"Query error"})
        const values =[
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.cartegory_id
        ]
        con.query(sql,[values],(err,result)=>{
            if(err) 
                return res.json({Status:false,Error:"Query error"})
            return res.json({Status: true})
        })
       })
})
router.get('/employee',(req,res)=>{
    const sql = "SELECT * FROM cartegory"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error"})

            return res.json({Status: true, Result:result})
    })
})

router.get('/employee/:id',(req,res)=>{
    const id =req.params.id
    const sql = "SELECT * FROM employee WHERE id = ?"
    con.query(sql,[id],(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error"})

            return res.json({Status: true, Result:result})
    })

})
router.put('/edit_employee/:id',(req, res)=> {
    const id = req.params.id
    const sql = "UPDATE employee set name= ?,email= ? salary= ?, address = ?, cartegory_id= ? Where id = ?"
    const values =[
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.cartegory_id
    ]

    con.query(sql,[...values,id],(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })

})
router.delete('/delete_employee/:id',(req,res)=>{
    const id= req.params.id
    const sql= "DELETE FROM EMPLOYEE WHERE id = ?"
    con.query(sql,[id],(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })

})
router.get('/admin_count',(req,res)=>{
    const sql = "select count(id) as admin from admin"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })
})
router.get('/employee_count',(req,res)=>{
    const sql = "select count(id) as employee from employee"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })
})
router.get('/salary_count',(req,res)=>{
    const sql = "select sum(salary) as salary from employee"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })
})

router.get('/admin_records',(req,res)=>{
    const sql= "select * from admin"
    con.query(sql,(err,result) =>{
        if(err) 
            return res.json({Status:false,Error:"Query error" +err})

            return res.json({Status: true, Result:result})
    })

})
router.get('/logout',(req,res)=>{
    response.clearCookie('token')
    return res.json({Status: true})
})
export {router as adminRouter}