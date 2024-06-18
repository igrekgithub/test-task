module.exports = {
	"users": [
		{
			"id": "427cbb76-71b8-48ba-aa70-481df459187b",
			"name": "admin",
			"surname": "admin",
			"patronymic": "admin",
			"password": "$2b$04$D4ITdrtkuwe4elO6tGnp3ulJSQxdunZi3dLigv8QirNWr.HcFjy/W",
			"role": "admin"
		},
		{
			"id": "5090673-401a-4b71-a895-38c4d8a47ede",
			"name": "Пётр",
			"surname": "Петров",
			"patronymic": "Петрович",
			"password": "$2b$04$H7L084joRmh95AoW9MFgKO2o9vz7.JCSHeYuD4ZRtyZr9ZouwcYni",
			"role": "user"
		},
		{
			"id": "$f638f991-26bc-474a-b974-7aaed7f75a52",
			"name": "Сергей",
			"surname": "Сергеев",
			"patronymic": "Сергеевич",
			"password": "$2b$04$rZvQ3YRY9PyqcYHHAKrsY.322X1w5Nw86GWiJggh/PAV2csJtDFdO",
			"role": "user"
		},
	],
	"tasks": [
		{
			"id": "1",
			"code": "123",
			"title": "Title 1",
		},
		{
			"id": "2",
			"code": "234",
			"title": "Title 2",
		},
		{
			"id": "3",
			"code": "345",
			"title": "Title 3",
		},
	],
	"problems": [
		{
			"id": "1",
			"creationDate": "01.01.28",
			"solutionDate": "",
			"description": "Description 1 abcdef",
			"solution": "",
			"requestAuthorId": "5090673-401a-4b71-a895-38c4d8a47ede",
			"solutionAuthorId": "$f638f991-26bc-474a-b974-7aaed7f75a52",
			"taskId": "1",
			"status": false,
		},
		{
			"id": "2",
			"creationDate": "01.01.24",
			"solutionDate": "20.01.24",
			"description": "Description 2 defghi",
			"solution": "Solution 2",
			"requestAuthorId": "$f638f991-26bc-474a-b974-7aaed7f75a52",
			"solutionAuthorId": "5090673-401a-4b71-a895-38c4d8a47ede",
			"taskId": "2",
			"status": true,
		},
		{
			"id": "3",
			"creationDate": "01.01.24",
			"solutionDate": "",
			"description": "Description 3 ghijkl",
			"solution": "",
			"requestAuthorId":  "$f638f991-26bc-474a-b974-7aaed7f75a52",
			"solutionAuthorId": "",
			"taskId": "3",
			"status": false,
		},
	]
}