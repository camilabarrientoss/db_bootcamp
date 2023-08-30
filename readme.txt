URL repositorio: 
https://github.com/camilabarrientoss/db_bootcamp

Para clonar: 
git clone https://github.com/camilabarrientoss/db_bootcamp.git

Crear base de datos:
psql -U postgres
CREATE USER node_user WITH PASSWORD 'node_password'; 
CREATE DATABASE db_bootcamp OWNER node_user; --creo la base de datos
\q 
--me conecto a la bd
psql -U node_user -d db_bootcamp
\conninfo

Se crean usuarios:
http://localhost:3000/user/create/firstName/Mateo/lastName/Diaz/email/mateo.diaz@correo.com
http://localhost:3000/user/create/firstName/Santiago/lastName/Mejias/email/santiag,omejias@correo.com
http://localhost:3000/user/create/firstName/Lucas/lastName/Rojas/email/lucas.rojas@correo.com
http://localhost:3000/user/create/firstName/Facundo/lastName/Fernandez/email/facundo.fernandez@correo.com

Se crean Bootcamps:
http://localhost:3000/bootcamp/create/name/:name/tittle/:tittle/description/:description