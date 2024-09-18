$(document).ready(function() {
    // Product array
    var products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 15 },
        // Add more products here
    ];

    // Load cart items from local storage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display products
    function displayProducts() {
        $('#products').empty();
        products.forEach(function(product) {
            $('#products').append('<div class="product" data-id="' + product.id + '" data-name="' + product.name + '" data-price="' + product.price + '"><h3>' + product.name + '</h3><p>$' + product.price + '</p><button class="add-to-cart">Add to Cart</button></div>');
        });
    }

    // Function to display cart items
    function displayCart() {
        $('#cart-items').empty();
        if (cart.length === 0) {
            $('#cart-items').html('<tr><td colspan="4">No items in cart</td></tr>');
        } else {
            var total = 0;
            cart.forEach(function(item) {
                var subtotal = parseFloat(item.price) * item.quantity;
                total += subtotal;
                $('#cart-items').append('<tr data-id="' + item.id + '"><td>' + item.name + '</td><td>' + item.quantity + '</td><td>$' + subtotal.toFixed(2) + '</td><td><button class="delete-item">Delete</button></td></tr>');
            });
            $('#cart-items').append('<tr><td colspan="2">Total:</td><td colspan="2">$' + total.toFixed(2) + '</td></tr>');
        }
    }

    // Display initial products and cart
    displayProducts();
    displayCart();

    // Add to cart button click event
    $(document).on('click', '.add-to-cart', function() {
        var product = $(this).closest('.product');
        var id = product.data('id');
        var name = product.data('name');
        var price = product.data('price');
        var existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: id, name: name, price: price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    });

    // Delete item from cart
    $(document).on('click', '.delete-item', function() {
        var id = $(this).closest('tr').data('id');
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    });
});
