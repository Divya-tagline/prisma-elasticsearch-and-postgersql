var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'http://localhost:3000',
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true
  // cloud: {
  //   id: 'i-o-optimized-deployment:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQ4OTgxYmJjOGYwODU0NTI4OWYzOGE3ZThkZjZjZWRhZSQyZDgxY2Y0NGNkMjM0ODhiYjRhNjhiOTYxZjNlNDNlYw==',
  // },
  // auth: {
  //   username: 'elastic',
  //   password: 'gxfWiHMsQVE8x2C1fCdVjHvY'
  // }
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/demo',(req,res,next)=>{
  client.index({
    index : "detail",
    type:"mytype",
    body:req.body
  },(err,response) =>{
    if(err){
      console.log('err => ', err)
      res.error(err)

    }
    else{
      console.log('response', response)
      return res.status(200).send({message:"Sucessfully",data:response}) 
    }
  })
});

module.exports = router;
