const calcularTotales = (cantidad, valor, iva) =>{
    return { subtotal : parseFloat((cantidad * valor)).toFixed(2), valoriva: parseFloat((cantidad * valor) * (iva / 100)).toFixed(2), total: parseFloat(((cantidad * valor) + ((cantidad * valor) * (iva / 100))).toFixed(2))};
}

const imprimirConsola = (producto, cantidad, vunitario, vtotal, plazo, tpeso, iva, descripcion) => {
    console.log("Producto: " + producto + '\n' +
        "Cantidad: " + cantidad + '\n' +
        "Valor unitario: " + vunitario + '\n' +
        "Valor total: " + vtotal + '\n' +
        "Plazo para el pago: " + plazo + '\n' +
        "Tipo de peso: " + tpeso + '\n' +
        "Iva: " + iva + '%\n' +
        "Descripción: " + descripcion + '\n' +
        " " + '\n');
};

const obtenerDatos = () => {
    let producto = document.getElementById('sproducto').value;
    let ctransacciones = parseInt(document.getElementById('ctransacciones').value);
    let vunitario = parseInt(document.getElementById('vunitario').value);
    let splazo = parseInt(document.getElementById('splazo').value);
    let speso = document.getElementById('speso').value;
    let siva = parseInt(document.getElementById('siva').value);
    let tadescripcion = document.getElementById('tadescripcion').value;

    return {producto, ctransacciones, vunitario, splazo, speso, siva, tadescripcion};
}

const submitForm = (e) => {
    //Prevenir que el formulario se envie
    e.preventDefault();
    let formData = document.getElementById('form').elements;

    for (let i = 0; i < formData.length; i++) {
        if (!formData[i].value && formData[i].id !== 'vtotal' && formData[i].type !== 'button') {
            console.log(formData[i]);
            alert("Por favor completa todos los campos");
            break;
        } else {
            
            //Funcion para obtener los datos del form
            const {producto, ctransacciones, vunitario, splazo, speso, siva, tadescripcion} = obtenerDatos();

            //Usar funcion de multiplicación
            let {subtotal, valoriva, total} = calcularTotales(ctransacciones, vunitario, siva);
          
            //Imprimir por consola los productos creados en el form
            imprimirConsola(producto, ctransacciones, vunitario, total, splazo, speso, siva, tadescripcion);

            //Dubijar datos en el form
            let tbodyRef = document.getElementById('data');
            var newRow = tbodyRef.insertRow();

            var cantidadCell = newRow.insertCell(-1);
            cantidadCell.innerHTML = ctransacciones;
            var valorCell = newRow.insertCell(-1);
            valorCell.innerHTML = vunitario;
            var ivaCell = newRow.insertCell(-1);
            ivaCell.innerHTML = siva;
            var subtotalCell = newRow.insertCell(-1);
            subtotalCell.innerHTML = subtotal;
            var valorIvaCell = newRow.insertCell(-1);
            valorIvaCell.innerHTML = valoriva;
            var totalCell = newRow.insertCell(-1);
            totalCell.innerHTML = total;

            //Resetear formulario
            document.getElementById('form').reset();
            break;
        }
    }
    return false;
}