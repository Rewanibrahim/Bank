import express from 'express'
import DBconnection from './DB/DBconnection.js'
import userRoutes from './routes/user.routes.js';
import accountRoutes from './routes/account.routes.js';

const app = express();

app.use(express.json());

app.use('/bank', userRoutes);
app.use('/bank', accountRoutes);


DBconnection()

app.use('/', (req ,res,next) => {
    const err = new Error(`Invalid URL ${req.originalUrl}`,{cause:404})
    next(err)
})
//error handling middleware
app.use((err,req,res,next) => {
res.status(err["cause"]).json({msg:"Error!",err:err.message})
})
const port = 4000
app.listen(port, () => console.log(`Example on port ${port}!`))