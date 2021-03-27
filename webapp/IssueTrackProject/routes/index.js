var express = require('express');
var router = express.Router();
const { uuid } = require('uuidv4');

const issues = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('lista', issues.length);
  issues.forEach((issue) => {
    console.log('ret:', issue.descricao);
  });
  res.render('index', { issues });
});

router.get('/newIssue', function (req, res, next) {
  res.render('newIssue', { title: 'Nova Issue', issue: {}, action: '/new' });
});

router.post('/new', function (req, res, next) {
  const { descricao, data, status, responsavel } = req.body;
  console.log(descricao);
  console.log(data);
  console.log(status);
  console.log(responsavel);
  let issue = {
    id: uuid(),
    descricao,
    data,
    status,
    responsavel,
  };
  issues.push(issue);
  res.redirect('/');
});

router.post('/edit/:id', function (req, res, next) {
  const id = req.params.id;
  const issueIndex = issues.findIndex((issue) => issue.id === id);
  issue = issues[issueIndex];
  const { descricao, data, status, responsavel } = req.body;
  issue.descricao = descricao;
  issue.data = data;
  issue.status = status;
  issue.responsavel = responsavel;
  issues[issueIndex] = issue;

  res.redirect('/?edit=true');
});

router.get('/edit/:id', function (req, res, next) {
  const id = req.params.id;
  const issueIndex = issues.findIndex((issue) => issue.id === id);
  issue = issues[issueIndex];
  console.log(issue.descricao);
  console.log(issue.data);
  console.log(issue.status);
  console.log(issue.responsavel);

  res.render('newIssue', {
    title: 'Edição de Issue',
    issue,
    action: '/edit/' + issue.id,
  });
});

router.get('/delete/:id', function (req, res, next) {
  const { id } = req.params;
  const issueIndex = issues.findIndex((issue) => issue.id === id);
  issues.splice(issueIndex, 1);
  res.redirect('/?delete=true');
});

module.exports = router;
