const mvTradeData = Array.from({ length: 1000 }, (_, index) => ({
  TipoDcto: `TD${index % 3}`,
  NroDcto: `ND${index}`,
  Bodega: `Bodega ${index % 10}`,
  CantOrig: Math.floor(Math.random() * 1000),
  Cantremis: Math.floor(Math.random() * 500),
  Codcc: `CC${index % 5}`,
  CodUbica: `UB${index % 20}`,
  Detalle: `Detalle ${index}`,
  Producto: `Producto ${index % 100}`,
  CodRete: `CR${index % 10}`,
  CodRetica: `CR${index % 10 + 10}`,
  Cantidad: Math.floor(Math.random() * 100),
  ValorUnit: Math.floor(Math.random() * 1000),
  Descuento: Math.floor(Math.random() * 20),
  IVA: Math.floor(Math.random() * 20),
}));

const tipoDctoData = Array.from({ length: 3 }, (_, index) => ({
  TipoDcto: `TD${index}`,
  Origen: `Origen ${index % 5}`,
  DctoMae: index % 2 === 0 ? 'NC' : 'FC',
  Positivo: index % 2 === 0 ? 1 : 0,
}));

const tradeData = Array.from({ length: 1000 }, (_, index) => ({
  Origen: `Origen ${index % 5}`,
  TipoDcto: `TD${index % 3}`,
  NroDcto: `ND${index}`,
  Fecha: `2023-10-${String(index % 30 + 1).padStart(2, '0')}`,
  NIT: `NIT${index}`,
  TipoCar: `TC${index % 3}`,
  TipoMvto: `TM${index % 4}`,
  CodVen: `Vendedor ${index % 15}`,
  Nota: `Nota ${index}`,
  Enviadoa: `Enviado ${index % 10}`,
  CiudadCli: `Ciudad ${index % 20}`,
  Orden: `OC${index}`,
  PASSWORDIN: `CF${index}`,
  otroimpu: Math.floor(Math.random() * 20),
  DSCTOCOM: Math.floor(Math.random() * 10),
}));

const mockData = mvTradeData.map((mv) => {
  const td = tipoDctoData.find((td) => td.TipoDcto === mv.TipoDcto);
  const t = tradeData.find((t) => t.TipoDcto === mv.TipoDcto && t.NroDcto === mv.NroDcto);

  return {
    NumeroDocumento: `${mv.TipoDcto}${mv.NroDcto}`,
    Bodega: mv.Bodega,
    Cant_Original: mv.CantOrig,
    Cant_Remisionada: mv.Cantremis,
    Centro_Costos: mv.Codcc,
    Cod_Ubicacion: mv.CodUbica,
    Detalle: mv.Detalle,
    Fecha_Dcto: t.Fecha,
    Cliente: t.NIT,
    Tipo_Cartera: t.TipoCar,
    Tipo_Mvto: t.TipoMvto,
    Vendedor: t.CodVen,
    Nota: t.Nota,
    Enviadoa: t.Enviadoa,
    CodCiudadEnvio: t.CiudadCli,
    OrdenCompra: t.Orden,
    CREO_FACT: t.PASSWORDIN,
    Impuestos: t.otroimpu,
    nit: t.NIT,
    Producto: mv.Producto,
    CodRete: mv.CodRete,
    CodRetica: mv.CodRetica,
    Total_Bruto: td.DctoMae === 'NC' || td.Positivo === 1 ? (mv.Cantidad * mv.ValorUnit) * -1 : (mv.Cantidad * mv.ValorUnit),
    Total_Prod: td.DctoMae === 'NC' || td.Positivo === 1
      ? ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)) * -1
      : ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)),
    Total_IVA: td.DctoMae === 'NC' || td.Positivo === 1
      ? (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)) * mv.IVA / 100) * -1
      : (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)) * mv.IVA / 100),
    Total_Neto: td.DctoMae === 'NC' || td.Positivo === 1
      ? ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100) + ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)) * mv.IVA / 100) * -1
      : ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100) + ((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100) - (((mv.Cantidad * mv.ValorUnit) - ((mv.Cantidad * mv.ValorUnit) * mv.Descuento / 100)) * t.DSCTOCOM / 100)) * mv.IVA / 100),
    Origen: t.Origen,
    TipoDcto: t.TipoDcto,
    NroDcto: t.NroDcto,
  };
});

export default mockData;