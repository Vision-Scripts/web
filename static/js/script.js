document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle animations or loading of content based on viewport visibility
    function handleViewport() {
        var sections = document.querySelectorAll('.section'); // Adjust this selector based on your HTML structure
        sections.forEach(function(section) {
            if (isInViewport(section) && !section.classList.contains('loaded')) {
                section.classList.add('loaded'); // Add a class to mark it as loaded
                // Implement your animation or loading logic here
            }
        });
    }

    // Call handleViewport initially
    handleViewport();

    var customCursor = document.querySelector('.custom-cursor');
    
    // Function to position the custom cursor
    function moveCursor(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    }

    // Function to activate custom cursor
    function activateCursor() {
        customCursor.classList.add('active');
    }

    // Function to deactivate custom cursor
    function deactivateCursor() {
        customCursor.classList.remove('active');
    }

    // Apply custom cursor to entire document
    document.addEventListener('mousemove', function(e) {
        moveCursor(e);
    });

    // Check background color and adjust cursor color accordingly
    function checkBackgroundColor() {
        var body = document.body;
        
        if (getComputedStyle(body).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
            body.classList.remove('dark-bg');
            body.classList.add('light-bg');
        } else {
            body.classList.remove('light-bg');
            body.classList.add('dark-bg');
        }

        // Trigger cursor color update on background change
        customCursor.classList.remove('active');
        setTimeout(function() {
            customCursor.classList.add('active');
        }, 10); // Adjust timing as needed
    }

    // Initial check and listen for changes in background color
    checkBackgroundColor();
    window.addEventListener('resize', checkBackgroundColor);
});
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Fetch products and render on page load
    fetchProducts();

    // Form submission handler
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(productForm);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            cost_price: parseFloat(formData.get('cost-price')),
            selling_price: parseFloat(formData.get('selling-price')),
            discount: parseFloat(formData.get('discount'))
        };

        // POST request to add product
        const response = await fetch('/api/add_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            productForm.reset();
            fetchProducts();
        }
    });

    // Function to fetch products from API
    async function fetchProducts() {
        const response = await fetch('/api/get_products');
        const products = await response.json();

        productList.innerHTML = products.map(product => `<li>${product.name} - ${product.price}</li>`).join('');
    }
});
