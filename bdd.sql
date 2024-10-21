Users_logs {
	id integer pk increments unique
	email varchar(50)
	password varchar(50)
}

Users_infos {
	id integer(5) increments unique > Users_logs.id
	pseudo varchar(50)
	name varchar(50)
	firstname varchar(50)
	adress varchar(100)
	town varchar(50)
	postal_code numeric(10)
}

Account_infos {
	id integer increments unique > Users_logs.id
	email varchar(50) > Users_logs.email
	password varchar(50) > Users_logs.password
}

Users_website {
	id integer increments unique > Users_logs.id
	project_name varchar(50)
	project_id integer unique
	project_url varchar(100)
}

Billing_infos {
	id integer increments unique > Users_logs.id
	billing_email varchar(50)
	billing_adress varchar(100)
	billing_method varchar(20)
	payement_method varchar(20)
}

Users_forfait {
	id integer(5) increments unique > Users_logs.id
	forfait varchar(50)
}