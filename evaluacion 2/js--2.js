$(document).ready(function() {
    // Función para calcular la edad
    function calcularEdad(fechaNacimiento) {
        var fechaActual = new Date();
        var fechaNac = new Date(fechaNacimiento);
        var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
        var mes = fechaActual.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
            edad--;
        }
        return edad;
    }

    // Función para validar el RUT
    function validarRut(rut) {
        var regex = /^[0-9]+-[0-9kK]{1}$/;
        if (!regex.test(rut)) {
            return false;
        }

        var rutSinGuion = rut.replace('-', '');
        var cuerpo = rutSinGuion.slice(0, -1);
        var dvIngresado = rutSinGuion.slice(-1).toUpperCase();

        var suma = 0;
        var multiplo = 2;
        for (var i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            if (multiplo < 7) {
                multiplo += 1;
            } else {
                multiplo = 2;
            }
        }
        var dvEsperado = 11 - (suma % 11);
        if (dvEsperado === 11) {
            dvEsperado = 0;
        } else if (dvEsperado === 10) {
            dvEsperado = 'K';
        }

        return dvIngresado === dvEsperado.toString();
    }

    // Función para generar la carta de presentación
    function generarCarta() {
        var rut = $('#rut').val();
        var apellidoPaterno = $('#apellidoPaterno').val();
        var apellidoMaterno = $('#apellidoMaterno').val();
        var nombre = $('#nombre').val();
        var fechaNacimiento = $('#fechaNacimiento').val();
        var edad = $('#edad').val();
        var genero = $('#genero').val();
        var email = $('#email').val();
        var celular = $('#celular').val();
        var profesion = $('#profesion').val();
        var motivacion = $('#motivacion').val();

        if (rut === '' || apellidoPaterno === '' || apellidoMaterno === '' || nombre === '' || fechaNacimiento === '' || edad === '' || genero === '' || email === '' || celular === '' || profesion === '' || motivacion === '') {
            alert('Por favor completa todos los campos del formulario.');
            return;
        }

        if (!validarRut(rut)) {
            alert('El RUT ingresado no es válido.');
            return;
        }

        if (parseInt(edad) < 18 || parseInt(edad) > 35) {
            alert('La edad debe estar entre 18 y 35 años.');
            return;
        }

        var carta = `Carta de presentación:

        Estimado equipo de Chile Limpio,

        Me llamo ${nombre} ${apellidoPaterno} ${apellidoMaterno}, RUT ${rut}, y deseo postular al trabajo de apoyo ambiental en la isla de Chiloé. Tengo ${edad} años y soy ${genero}. Mi fecha de nacimiento es ${fechaNacimiento}.

        Soy ${profesion} y me motiva profundamente la oportunidad de contribuir al cuidado y preservación del medio ambiente en esta hermosa isla. ${motivacion}.

        Quedo a su disposición para cualquier consulta adicional.

        Atentamente,
        ${nombre}`;

        $('#carta').val(carta);
    }

    $('#crearCartaBtn').click(function() {
        generarCarta();
    });

    // Calcular edad al ingresar la fecha de nacimiento
    $('#fechaNacimiento').change(function() {
        var fechaNacimiento = $(this).val();
        var edad = calcularEdad(fechaNacimiento);
        $('#edad').val(edad);
    });

    // Agregar +569 automáticamente al enfocar el campo de celular
    $('#celular').focus(function() {
        var valor = $(this).val();
        if (valor === '') {
            $(this).val('+569');
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let cart = {};

    cartIcon.onclick = function() {
        cartModal.style.display = "block";
        displayCartItems();
    }

    closeModal.onclick = function() {
        cartModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    }

    function addToCart(item) {
        if(cart[item.id]) {
            cart[item.id].quantity++;
        } else {
            cart[item.id] = item;
            cart[item.id].quantity = 1;
        }
        updateCartCount();
        displayCartItems();
    }

    function removeFromCart(itemId) {
        delete cart[itemId];
        updateCartCount();
        displayCartItems();
    }

    function updateCartCount() {
        const totalItems = Object.keys(cart).reduce((sum, key) => sum + cart[key].quantity, 0);
        cartCount.textContent = `(${totalItems})`;
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        for (const [key, item] of Object.entries(cart)) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
        cartTotal.textContent = total.toFixed(2);
    }
});


