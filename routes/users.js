var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
/* GET users listing. */
router.get('/',async function(req, res, next) {
  const allUsers = await prisma.pups.findMany()
  // res.json(allUsers);
  const filteredPosts = await prisma.pups.findMany({
    where: {
      OR: [
        { name: { contains: 'prisma' } },
        { breed: { contains: 'prisma' } },
      ],
    },
  })

  // res.json(filteredPosts);

  const user = await prisma.pups.create({
   data: {
    name: 'Alice',
    breed: 'alice@prisma.io',
    age : 25,
    sex: 'F'
  },
})

  // res.json(user);

  const post = await prisma.pups.update({
    where: { id: 9 },
    data: { name: 'true' },
  })
  res.json(post);

});

module.exports = router;
