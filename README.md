Easy-Shop

Overview

This project is a fully functional e-commerce website built using HTML, CSS, and JavaScript. It features a responsive design with a product catalog, search and filter functionality, a shopping cart, and a checkout system. The website includes a modern UI with animations, tooltips for product details, and a sticky header with a marquee banner.

Features

Responsive Design: Adapts seamlessly to different screen sizes, including mobile and desktop.

Product Catalog: Displays a list of products with images, names, prices, and ratings.

Search and Filter: Allows users to search products by name, filter by category, price range, and sort by price or rating.

Shopping Cart: Users can add/remove items, view cart contents, and see the total price.

Tooltips: Hovering over a product displays a tooltip with detailed information (name, description, availability, and specifications).

Animations: Includes smooth transitions, hover effects, and a marquee banner for promotions.

Sticky Header: Navigation and search bar remain accessible at the top of the page.

Cart Sidebar: A slide-in cart panel for easy access to cart items and checkout.

Files

styles.css: Contains all CSS styles, including layout, animations, and responsive design.

script.js: Handles the dynamic functionality, including product filtering, cart management, and tooltips.

Setup Instructions

Clone or Download: Clone the repository or download the project files.

Open index.html: Place all files (index.html, styles.css, script.js) in the same directory and open index.html in a web browser.

Dependencies: The project uses the Poppins font from Google Fonts, included via a CDN in styles.css. No additional setup is required.

Run Locally: Use a local server (e.g., VS Code Live Server or python -m http.server) for the best experience, as some features may not work correctly when opening index.html directly.

Usage

Browse Products: View the product catalog on the main page.

Search: Use the search bar in the header to find products by name.

Filter: Select a category, adjust the price range slider, or choose a sorting option (price ascending/descending or rating) in the filter section.

Add to Cart: Click the "Add to Cart" button on a product to add it to the cart. The cart count updates automatically.

View Cart: Click the cart icon in the header to open the cart sidebar, where you can view items, remove them, or proceed to checkout.

Checkout: Click the "Checkout" button in the cart sidebar to simulate a checkout process (clears the cart and displays a confirmation).

Tooltips: Hover over a product to see detailed information in a tooltip.

Product Data

The product data is defined in script.js as a JavaScript array (products). Each product includes:

id: Unique identifier.

name: Product name.

price: Price in INR (₹).

image: URL to the product image.

rating: Star rating (out of 5).

category: Product category (e.g., electronics, home, clothing).

description: Brief product description.
availability: Stock status (e.g., In Stock, Out of Stock).
spec: Technical specifications.

To add or modify products, update the products array in script.js.

Styling
CSS Framework: Custom CSS with no external frameworks, ensuring lightweight performance.
Fonts: Uses Poppins (via Google Fonts) for a modern look.
Animations: Includes fade-in, marquee, pulse, and rotate animations for an engaging user experience.
Responsive Design: Media queries in styles.css ensure compatibility with mobile devices (max-width: 768px).

JavaScript Functionality
Product Display: Dynamically renders products based on filters and search input.
Cart Management: Handles adding/removing items and updating the cart total.
Tooltips: Displays product details on hover with dynamic positioning to stay within the viewport.
Event Listeners: Manages user interactions like clicks, mouseovers, and input changes.

Limitations

Static Data: Product data is hardcoded in script.js. For a production environment, consider integrating a backend API.
Checkout: The checkout process is a placeholder (displays an alert). A real payment gateway would be needed for actual transactions.
Tooltip on Mobile: Tooltips are disabled on mobile devices (max-width: 768px) due to hover limitations.
Image Loading: Product images are loaded from external URLs, which may depend on internet connectivity.

Future Improvements
Integrate a backend (e.g., Node.js, Express) for dynamic product data and user authentication.
Add a real payment gateway for checkout functionality.
Implement user accounts for order history and saved carts.
Enhance accessibility (e.g., ARIA labels, keyboard navigation).
Add pagination or infinite scroll for large product catalogs.

License

This project is for educational purposes and not licensed for commercial use. Product images and data are sourced from external websites (e.g., Amazon, Unsplash) and used for demonstration only.
