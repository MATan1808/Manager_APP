use personal_expense_manager;
 create table users(
	id INT IDENTITY(1,1) PRIMARY KEY,
	username nvarchar(255) unique not null,
	password nvarchar(255) unique not null,
	email nvarchar(255) unique not null,
	create_at dateTIME DEFAULT GETDATE()
 );

 insert into users(username, password, email) values (N'test_user', '123456', 'nhattanmanguyen123@gmail.com')

 select * from users
 SELECT * FROM users WHERE username = 'test_user2';



 /*
  ALTER LOGIN sa ENABLE;
GO

ALTER LOGIN sa ENABLE;
GO
ALTER LOGIN sa WITH PASSWORD = 'MatKhauMoi123!';
GO

ALTER LOGIN sa WITH CHECK_POLICY = OFF;
GO
 */

 SELECT name, is_disabled FROM sys.sql_logins WHERE name = 'sa';

