-- Active: 1669383125904@@127.0.0.1@3306@proyecto

-- SQLBook: Code

DROP DATABASE proyecto;

CREATE DATABASE if not exists proyecto;

use proyecto;

create table
    if not exists registro_empleado(
        email varchar (30) primary key,
        nombre VARCHAR (30),
        apellido varchar (30),
        cedula VARCHAR (12),
        direccion varchar (30),
        celular varchar (30),
        contrasena varchar (80)
    );

create table
    if not exists registro_cliente(
        id int AUTO_INCREMENT primary key,
        nombre VARCHAR (30),
        apellido VARCHAR (30),
        telefono VARCHAR (30),
        email VARCHAR (30),
        direccion VARCHAR (30),
        Cnombre VARCHAR (30),
        Capellido VARCHAR (30),
        Pnombre VARCHAR (30),
        Praza VARCHAR (30),
        contrasenia VARCHAR (70),
        cedula VARCHAR (12)
    );

SELECT * from registro_empleado;

SELECT * from registro_cliente;