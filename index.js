const  expressHandlebars = require('express-handlebars') 
const express = require('express')
const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs',
    helpers: {
        getDate: function() {
			let date = new Date();
			
			let year  = date.getFullYear();
			let month = date.getMonth() + 1;
			let day   = date.getDate();
			
			return year + '-' + month + '-' + day;
		},
        square: function(num) {
            return num * num;
        },
        upper: function() {
            return this.toUpperCase();
        },
        cube: function(num) {
            return num * num * num;
        },
        sum: function(num1, num2) {
            return num1 + num2;
        },
        format: function() {
            return this.name + ' ' + this.surname;
        },
        count: function(num1, num2) {
            return num1 * num2
        },
        link: function(href, ancor) {
            return '<a href="'+ href +'">' + ancor + '</a>';
        }
	}
});


let app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
let titles = {
	index:    'главная страница',
	about:    'о нас',
	conctacs: 'контакты',
	price:    'наш прайс'
}

app.get('/', function (req, res) {
    res.render('index', {title: titles.index},  (err, html) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        res.send('Не найдено');
      } else {
        res.send(html);
      }
    });
  });
  app.get('/admin', function (req, res) {
    res.render('page', {
		test: 'data',
        users: [
			{
				name: 'name1',
				surname: 'surname1'
			},
			{
				name: 'name2',
				surname: 'surname2'
			},
			{
				name: 'name3',
				surname: 'surname3'
			},
		],
        purchase: {
			name: 'food',
			cost: 1000,
			amount: 5
		},
        summ: +req.query?.test1 + +req.query?.test2,
		layout: 'admin'
	},  (err, html) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        res.send('Не найдено');
      } else {
        res.send(html);
      }
    });
  });


app.get('/:page/', function (req, res) {
    res.render(req.params.page, {title: titles[req.params.page], user: [{name: 'sam', age: 30}, {name: 'sam2', age: 31}], show: {
        show1: true,
        show2: false,
        show3: false,
    }},  (err, html) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        res.send('Не найдено');
      } else {
        res.send(html);
      }
    });
  });

app.listen(3001)