CalculaEntrega = () => {
    //GUARDAMOS LA FECHA DE HOY
    let maniana = new Date();
    // Y DEVOLVEMOS DIA, MES Y AÑO
    return maniana.getDate() + '/' + (maniana.getMonth() + 1) + '/' + maniana.getFullYear();
};

CalculaDevolucion = (d, fecha) => {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';//OBTENEMOS LA POSICIÓN DEL CARACTER NO NUMÉRICO SEPARADOR
    var aFecha = sFecha.split(sep);//LOS QUITAMOS DEL STRING
    var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];//INVERTIMOS EL ORDEN
    fecha= new Date(fecha);
    fecha.setDate(fecha.getDate()+parseInt(d));
    var anno=fecha.getFullYear();
    var mes= fecha.getMonth()+1;
    var dia= fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia+sep+mes+sep+anno;
    return (fechaFinal);

};

module.exports = {
    CalculaEntrega,
    CalculaDevolucion
};
