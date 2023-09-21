-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2023 a las 00:04:22
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `electrobikenew`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `nombreCliente` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoDocumentoCliente` varchar(50) NOT NULL,
  `documentoCliente` varchar(200) NOT NULL,
  `telefonoCliente` varchar(50) NOT NULL,
  `correoCliente` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoCliente` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombreCliente`, `tipoDocumentoCliente`, `documentoCliente`, `telefonoCliente`, `correoCliente`, `estadoCliente`) VALUES
(1, 'Cliente de mostrador', 'Cedula', '00000000', '00000000', 'example@gmail.com', 'Activo'),
(2, 'Daniel Guarin G', 'Cedula', '1234456777', '123456765', 'dani@gmail.com', 'Activo'),
(3, 'Heidy Puerta', 'Tarjeta de identidad', '1023625375', '3182678389', 'hypuerta5@gmail.com', 'Activo'),
(4, 'Erika Lopez', 'Cedula', '1035222720', '3013262611', 'eylopez0272@gmail.com', 'Activo'),
(5, 'Juan Jose Suarez B', 'Cedula', '1040571137', '3205017961', 'bonolisjuanjo@gmail.com', 'Activo'),
(9, 'Samuel Restrepo', 'Cedula', '1040571125', '3216549870', 'srestrepo5219@gmail.com', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCompra` int(11) NOT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  `valorT` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fechaCompra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`idCompra`, `idProveedor`, `valorT`, `fechaCompra`) VALUES
(11, 3, '2450000', '2023-01-05'),
(12, 4, '112000', '2023-01-05'),
(13, 4, '247000', '2023-02-08'),
(14, 7, '648000', '2023-02-21'),
(15, 5, '1410000', '2023-03-02'),
(16, 1, '410000', '2023-03-21'),
(17, 8, '1560000', '2023-04-13'),
(18, 7, '2000000', '2023-05-25'),
(19, 9, '2160000', '2023-06-16'),
(20, 7, '1800000', '2023-07-27'),
(21, 5, '2200000', '2023-08-13'),
(22, 3, '840000', '2023-09-05'),
(23, 4, '1928000', '2023-10-02'),
(24, 7, '2456000', '2023-11-24'),
(25, 9, '2000000', '2023-12-06'),
(26, 9, '14000', '2023-09-06'),
(27, 9, '3500000', '2023-09-07'),
(28, 3, '55000', '2023-09-07'),
(29, 7, '565000', '2023-09-07'),
(30, 15, '200000', '2023-09-07'),
(31, 16, '187500', '2023-09-07'),
(32, 16, '150000', '2023-09-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecompra`
--

CREATE TABLE `detallecompra` (
  `idDetalleCompra` int(11) NOT NULL,
  `idProducto` int(4) DEFAULT NULL,
  `idCompra` int(4) DEFAULT NULL,
  `cantidad` int(8) DEFAULT NULL,
  `valor` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detallecompra`
--

INSERT INTO `detallecompra` (`idDetalleCompra`, `idProducto`, `idCompra`, `cantidad`, `valor`) VALUES
(16, 31, 11, 8, 300000),
(17, 13, 11, 10, 5000),
(18, 18, 12, 4, 28000),
(19, 18, 13, 11, 13000),
(20, 20, 13, 8, 8000),
(21, 17, 13, 20, 2000),
(22, 14, 14, 12, 20000),
(23, 12, 14, 3, 100000),
(24, 10, 14, 9, 12000),
(25, 11, 15, 6, 120000),
(26, 6, 15, 23, 30000),
(27, 9, 16, 5, 30000),
(28, 19, 16, 13, 20000),
(29, 11, 17, 2, 600000),
(30, 17, 17, 12, 30000),
(31, 16, 18, 2, 1000000),
(32, 17, 19, 30, 72000),
(33, 12, 20, 3, 600000),
(34, 31, 21, 2, 1100000),
(35, 9, 22, 28, 30000),
(36, 12, 23, 4, 482000),
(37, 19, 24, 23, 72000),
(38, 7, 24, 20, 40000),
(39, 16, 25, 1, 2000000),
(40, 20, 26, 2, 7000),
(41, 19, 27, 5, 200000),
(42, 12, 27, 5, 500000),
(43, 36, 28, 10, 5500),
(44, 12, 29, 5, 100000),
(45, 36, 29, 13, 5000),
(46, 9, 30, 2, 35000),
(47, 11, 30, 1, 130000),
(48, 6, 31, 5, 12500),
(49, 11, 31, 1, 125000),
(50, 6, 32, 2, 25000),
(51, 10, 32, 5, 20000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventa`
--

CREATE TABLE `detalleventa` (
  `idDetalleVenta` int(11) NOT NULL,
  `idProducto` int(4) DEFAULT NULL,
  `idVenta` int(4) DEFAULT NULL,
  `cantidad` int(8) DEFAULT NULL,
  `valor` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalleventa`
--

INSERT INTO `detalleventa` (`idDetalleVenta`, `idProducto`, `idVenta`, `cantidad`, `valor`) VALUES
(6, 6, 5, 5, 100000),
(7, 4, 6, 4, 500000),
(8, 4, 7, 9, 100000),
(9, 31, 8, 6, 500000),
(10, 7, 9, 40, 60000),
(11, 12, 10, 3, 400000),
(12, 6, 11, 5, 70000),
(13, 11, 12, 5, 300000),
(14, 10, 13, 12, 50000),
(15, 11, 14, 6, 300000),
(16, 9, 15, 20, 20000),
(17, 11, 16, 2, 300000),
(18, 6, 17, 3, 40000),
(19, 4, 17, 23, 1000),
(20, 9, 18, 4, 40000),
(21, 19, 19, 3, 80000),
(22, 9, 19, 4, 45000),
(23, 16, 20, 2, 1500000),
(24, 11, 20, 2, 300000),
(25, 6, 21, 5, 60000),
(26, 36, 22, 5, 10000),
(27, 9, 22, 5, 50000),
(28, 9, 23, 2, 45000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantias`
--

CREATE TABLE `garantias` (
  `idGarantia` int(11) NOT NULL,
  `idVenta` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(3) NOT NULL,
  `observaciones` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `garantias`
--

INSERT INTO `garantias` (`idGarantia`, `idVenta`, `idProducto`, `fecha`, `cantidad`, `observaciones`) VALUES
(1, 23, 9, '2023-09-18', 1, 'El freno estaba desgastado y presentaba cortes laterales en la parte inferior izquierda, ademas el disco no tenia lamina y la cinta estaba despegada'),
(2, 22, 9, '2023-09-18', 1, 'Tiene freno abs, frena abeces'),
(3, 23, 9, '2023-09-18', 2, 'Ninguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cantidadProducto` int(6) NOT NULL,
  `categoriaProducto` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoProducto` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombreProducto`, `cantidadProducto`, `categoriaProducto`, `estadoProducto`) VALUES
(2, 'Llanta 29 pulgadas', 0, 'Repuestos baja gama', 'Inactivo'),
(3, 'Tensor', 0, 'Repuestos baja gama', 'Activo'),
(4, 'Cadena', 6, 'Repuestos baja gama', 'Inactivo'),
(6, 'Cuadro de carbono', 7, 'Repuestos alta gama', 'Activo'),
(7, 'Pedales De Plataforma Alta', 20, 'Repuestos baja gama', 'Inactivo'),
(9, 'Freno De Disco Hidráulico', 22, 'Repuestos alta gama', 'Activo'),
(10, 'Asiento de gel', 5, 'Repuestos baja gama', 'Activo'),
(11, 'Bicicleta Specialized', 5, 'Bicicletas baja gama', 'Activo'),
(12, 'Bicicleta Giant', 73, 'Bicicletas baja gama', 'Activo'),
(13, 'Rueda delantera', 10, 'Repuestos baja gama', 'Activo'),
(14, 'Rueda trasera', 12, 'Repuestos baja gama', 'Activo'),
(15, 'Freno de disco mecánico', 20, 'Repuestos alta gama', 'Activo'),
(16, 'Bicicleta Trek', 1, 'Bicicletas alta gama', 'Activo'),
(17, 'Cubierta para llanta', 62, 'Repuestos baja gama', 'Activo'),
(18, 'Pedalier Shimano', 15, 'Repuestos alta gama', 'Activo'),
(19, 'Cassette de 10 velocidad', 38, 'Repuestos alta gama', 'Activo'),
(20, 'Sillín de cuero', 10, 'Repuestos baja gama', 'Activo'),
(31, 'Bicicleta Rin 15', 14, 'Bicicletas alta gama', 'Activo'),
(36, 'Levas', 18, 'Bicicletas alta gama', 'Activo'),
(40, 'Prueba Expo', 0, 'Bicicletas alta gama', 'Activo'),
(41, 'producto Prueba api', 0, 'Repuestos alta gama', 'Activo'),
(42, 'Freno disco', 0, 'Repuestos alta gama', 'Activo'),
(43, 'Prueba', 0, 'Bicicletas alta gama', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `idProveedor` int(11) NOT NULL,
  `nombreProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipoDocumentoProveedor` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `documentoProveedor` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `correoProveedor` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telefonoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoProveedor` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idProveedor`, `nombreProveedor`, `tipoDocumentoProveedor`, `documentoProveedor`, `correoProveedor`, `telefonoProveedor`, `estadoProveedor`) VALUES
(1, 'Proveedor de mostrador', 'Cedula', '00000000', 'example@gmail.com', '00000000', 'Activo'),
(3, 'Samuel Restrepo', 'Cedula', '10405711668', 'srestrepo@gmail.com', '3005356656', 'Activo'),
(4, 'Erika', 'Tarjeta de identidad', '104058888', 'erikita@gmail.com', '3125670987', 'Activo'),
(5, 'BON S.A.S', 'NIT', '3856792', 'bon@gmail.com', '3059864568', 'Activo'),
(16, 'Colbik.SAS', 'NIT', '6565265364634376', 'colbik@gmail.com', '323746738827', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `permisosRol` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estadoRol` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`, `permisosRol`, `estadoRol`) VALUES
(1, 'Administrador', 'Usuarios ,   Roles ,   Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas', 'Activo'),
(3, 'VendedorP', 'Usuarios ,   Roles ,   Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas', 'Activo'),
(10, 'Mecanico', 'Productos', 'Activo'),
(12, 'Cajero', 'Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas', 'Activo'),
(18, 'MecanicoP', 'Proveedores ,   Compras ,   Productos ,   Clientes ,   Ventas', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `tipoDocumentoUsuario` varchar(50) DEFAULT NULL,
  `documentoUsuario` varchar(50) DEFAULT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `contrasenaUsuario` varchar(255) DEFAULT NULL,
  `estadoUsuario` varchar(50) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `tipoDocumentoUsuario`, `documentoUsuario`, `correoUsuario`, `contrasenaUsuario`, `estadoUsuario`, `idRol`) VALUES
(1, 'Elkin Dario Builes', 'Pasaporte', '101333641', 'elkindario@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 1),
(2, 'Daniel Alejandro Guarin', 'Cedula Extranjera', '1040571176', 'alejo.guarin.0214@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 10),
(3, 'Samuel Restrepo Gómez', 'Cedula Extranjera', '1040571122', 'srestrepo5219@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 18),
(4, 'Juan José Suarez Bonolis', 'Cedula', '1040571137', 'bonolisjuanjo@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 3),
(21, 'Samuel Restrepo G', 'Cedula', '15625364732', 'sambu@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 3),
(22, 'Exposicion Prueba X', 'Cedula', '1001000010', 'exposicion@gmail.com', 'MTIzNDU2Nzg=', 'Activo', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idVenta` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `valorT` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fechaVenta` date NOT NULL,
  `garantia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`idVenta`, `idCliente`, `valorT`, `fechaVenta`, `garantia`) VALUES
(5, 3, '500000', '2023-01-12', 0),
(6, 2, '2000000', '2023-02-16', 0),
(7, 4, '900000', '2023-03-17', 0),
(8, 5, '3000000', '2023-05-18', 0),
(9, 1, '2400000', '2023-04-13', 0),
(10, 4, '1200000', '2023-06-23', 0),
(11, 2, '350000', '2023-07-22', 0),
(12, 4, '1500000', '2023-08-03', 0),
(13, 3, '600000', '2023-09-05', 0),
(14, 4, '1800000', '2023-09-05', 0),
(15, 2, '400000', '2023-09-05', 0),
(16, 3, '600000', '2023-09-06', 0),
(17, 2, '143000', '2023-09-06', 0),
(18, 3, '160000', '2023-09-07', 0),
(19, 5, '420000', '2023-09-07', 0),
(20, 2, '3600000', '2023-09-07', 0),
(21, 5, '300000', '2023-09-07', 0),
(22, 9, '300000', '2023-09-07', 1),
(23, 9, '90000', '2023-09-07', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `idProveedor` (`idProveedor`);

--
-- Indices de la tabla `detallecompra`
--
ALTER TABLE `detallecompra`
  ADD PRIMARY KEY (`idDetalleCompra`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCompra` (`idCompra`);

--
-- Indices de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD PRIMARY KEY (`idDetalleVenta`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idVenta` (`idVenta`);

--
-- Indices de la tabla `garantias`
--
ALTER TABLE `garantias`
  ADD PRIMARY KEY (`idGarantia`),
  ADD KEY `idVenta` (`idVenta`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `idCliente` (`idCliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `detallecompra`
--
ALTER TABLE `detallecompra`
  MODIFY `idDetalleCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  MODIFY `idDetalleVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `garantias`
--
ALTER TABLE `garantias`
  MODIFY `idGarantia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallecompra`
--
ALTER TABLE `detallecompra`
  ADD CONSTRAINT `detallecompra_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  ADD CONSTRAINT `detallecompra_ibfk_2` FOREIGN KEY (`idCompra`) REFERENCES `compras` (`idCompra`);

--
-- Filtros para la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD CONSTRAINT `detalleventa_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  ADD CONSTRAINT `detalleventa_ibfk_2` FOREIGN KEY (`idVenta`) REFERENCES `ventas` (`idVenta`);

--
-- Filtros para la tabla `garantias`
--
ALTER TABLE `garantias`
  ADD CONSTRAINT `garantias_ibfk_1` FOREIGN KEY (`idVenta`) REFERENCES `ventas` (`idVenta`),
  ADD CONSTRAINT `garantias_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
