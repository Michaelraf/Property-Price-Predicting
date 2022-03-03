const http = require("http");
const express = require("express");
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const port = 3000;
const router = require('express').Router();

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/', express.static(process.cwd()+'/Machine_Learning_web'));

app.get('/', (req, res)=>{
    res.sendFile(process.cwd()+'/Machine_Learning_web/index.html');
})

app.post('/', (req, res)=>{
    let body = req.body;
    console.log(body)
    let spawn = require('child_process').spawn;
    let process = spawn('python', ["./python/model/predicting.py",
                                    body.typeOfProperty,
                                    body.erfSize,
                                    body.floorSize,
                                    body.bedrooms, 
                                    body.bathrooms,
                                    body.ratesAndTaxes,
                                    body.petsAllowed,
                                    body.garage,
                                    body.garden,
                                    body.pool,
                                    body.internetAccess,
                                    body.description,
                                    body.kitchens,
                                    body.lounges,
                                    body.diningRooms,
                                    body.security,
                                    body.nearbyPublicTransport,
                                    body.kitchen,
                                    body.lounge,
                                    body.diningRoom,
                                    body.domesticRooms,
                                    body.receptionRooms
                                ]);
    process.stdout.on('data', (data)=>{
        res.json({
            sucess: true,
            message : "Values uploaded sucessfully",
            predict : data.toString().replace('[','').replace(']','').replace('\n',''),
        })
    })


})
app.use(router);

server.listen(portprocess.env.PORT || port, ()=>{
    console.log("App runing on PORT : " + port);
    
})
