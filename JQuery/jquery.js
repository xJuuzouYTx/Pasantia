$(document).ready(()=>{

    $savedElement = null;
    $cont = 0;
    let $calculate = ($cantidad, $valor, $iva) => {
        $iva /= 100;
        return {subtotal: $cantidad * $valor, valoriva: ($cantidad * $valor) * $iva, total:  (($cantidad * $valor) * $iva) + ($cantidad * $valor)}
    };

    $('#form').on('submit',()=>{

        $cont++;
        console.log($('#form').serializeArray());
        $data = $('#form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        console.log($data);
        $dataResult =  $calculate(parseInt($data.cantidad), parseInt($data.valorunitario), parseFloat($data.iva));

        $("#data").append("<tr class='col-data' id='row-"+$cont+"'>");
        $(".col-data:last-child").append(`<td>${$data.producto}</td>`);
        $(".col-data:last-child").append(`<td>${$data.descripcion}</td>`);
        $(".col-data:last-child").append(`<td>${$data.cantidad}</td>`);
        $(".col-data:last-child").append(`<td>${$data.valorunitario}</td>`);
        $(".col-data:last-child").append(`<td>${$data.iva}%</td>`);
        $(".col-data:last-child").append(`<td>${$dataResult.total}</td>`);
        $(".col-data:last-child").append(`<td>${$data.plazo}</td>`);
        $(".col-data:last-child").append(`<td>${$data.tipopeso}</td>`);
        $(".col-data:last-child").append("<td><button type='button' class='btn btn-primary btn-edit'><i class='fa-solid fa-pen'></i></button><button type='button' class='btn btn-danger btn-delete'><i class='fa-solid fa-trash-can'></i></button></td>");
        $('#data').append('</tr>')

        if($savedElement){
            $savedElement.remove();
        }
        $('#form').trigger("reset");

        if($('#btn-add').text() === 'Guardar'){
            $('#btn-add').html('<i class="fa-solid fa-plus"></i> Agregar Producto');
        }
        return false;
    });

    $('body').on('click', '.btn-edit', (event) => {
        let $data = [];
        $($(event.currentTarget).parent().parent()).find('td').each(function(index, element) {
            if($(element).text() !== "Editar" && $(element).text() !== "Eliminar"){
                $data.push($(element).text());
            }
        });
        
        
        $('#sproducto').val($data[0]);
        $('#tadescripcion').val($data[1]);
        $('#ctransacciones').val($data[2]);
        $('#vunitario').val($data[3]);
        $('#siva').val($data[4].replace('%',''));
        $('#splazo').val($data[6]);
        $('#speso').val($data[7]);
        console.log($data);

        $savedElement = $(event.currentTarget).parent().parent();
        $(event.currentTarget).parent().parent().hide();

        $('#btn-add').text("Guardar");
    });

    $('#cancel').on('click', () => {
        $savedElement.show();
    });

    $('body').on('click', '.btn-delete', (event)=>{
       $(event.currentTarget).parent().parent().remove();
    })
});

