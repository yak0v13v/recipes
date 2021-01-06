var express = require('express');
var router = express.Router();
const GlobalService = require('../services/GlobalService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/users', async function(req, res, next) {
  try {
    const data = await GlobalService.getUsers();

    res.status(200).json(data.rows);
  } catch (err) {
    res.status(400).json({err});
  }
});

router.get('/api/v1/login', (req, res)=>{
  res.status(200).json({status: 'success'});
})

router.get('/api/v1/sql', (req, res)=>{
  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="migrationUp.sql"',
    }
  }
  res.status(200).sendFile('/migrationUp.sql', options);
})

module.exports = router;
