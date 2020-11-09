create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer not null
)

create table stocks (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid,
	count integer not null,
	foreign key ('product_id') references 'products' ('id')
)

insert into products (title, description, price) values
('Манчкин: Подземелье', '"Манчкин: Подземелье" – это самостоятельная настольная игра, действие которое происходит в мире популярной карточной игры "Манчкин".', 70),
('Взрывные котята', '"Взрывные котята" – это нашумевший карточный хит с площадки "Кикстартер", где он побил все мыслимые рекорды и сразу же влюбил в себя более двухсот тысяч человек по всему миру.', 14);

insert into stocks (product_id, count) values
('74ee2388-d457-4d64-a349-8984110f6895', 4),
('2026a80c-8b41-4c8c-adae-909aed9ebc49', 12);

--create extension if not exists "uuid-ossp";
