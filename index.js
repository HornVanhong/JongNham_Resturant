$(document).ready(function () {
  // Load Home page by default
  $("#content").load("./components/home.html");

  // Navigation link events
  $("#homelink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/home.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#aboutlink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/about.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // startCarousel();
      // closeMenu(); // Close the menu
    });
  });

  $(".nav-link.icon").click(function () {
    // closeMenu(); // Close the menu when icon is clicked
  });

  $("#menulink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/menu.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      renderMenu(); // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });

  $("#teamlink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/team.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#categorieslink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/gallery.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#bloglink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/blog.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  $("#contactlink").click(function (e) {
    e.preventDefault();
    $("#content").load("./components/contact.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // closeMenu(); // Close the menu
    });
  });

  // Handle "Our Menu" and "Contact Us" buttons within loaded content
  $(document).on("click", "#home-btn-menu", function (e) {
    e.preventDefault(); // Prevent default anchor action
    $("#content").load("./components/menu.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      renderMenu(); // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });
  $(document).on("click", "#home-btn-team", function (e) {
    e.preventDefault(); // Prevent default anchor action
    $("#content").load("./components/team.html", function () {
      window.scrollTo(0, 0); // Scroll to the top of the page after loading content
      // Call the function to render the menu
      // closeMenu(); // Close the menu
    });
  });

  $(document).ready(function () {
    // Use event delegation for #home-btn-reservation and #reservationlink
    $(document).on(
      "click",
      "#reservationlink, #home-btn-reservation",
      function () {
        $(".about-section").toggle(); // Hide or show the 'Reserve Now' section
        $(".reservation-container").toggle(); // Toggle reservation form visibility
      }
    );

    // Add event listener to the reservation form
    $("#reservation-form").on("submit", function (e) {
      e.preventDefault();

      // Retrieve form values
      const name = $("#name").val();
      const date = $("#date").val();
      const time = $("#time").val();
      const guests = $("#guests").val();

      // Create a confirmation message
      const confirmationMessage = `Thank you, ${name}! Your reservation for ${guests} guest(s) on ${date} at ${time} has been confirmed.`;

      // Display the confirmation message
      $("#confirmation-message").text(confirmationMessage);

      // Hide the reservation form and show the confirmation message
      $("#reservation-form").addClass("reservation-hidden");
      $("#confirmation").removeClass("reservation-hidden");

      // Set timeout to reset the form and make it ready for the next submission
      setTimeout(function () {
        // Reset the form
        $("#reservation-form")[0].reset(); // Reset the form fields (including time)

        // Hide confirmation message and show the form again
        $("#reservation-form").removeClass("reservation-hidden");
        $("#confirmation").addClass("reservation-hidden");
      }, 1500); // Adjust the timeout as needed (1500ms = 1.5 seconds)
    });
  });

  $(document).on("click", "#home-btn-contact", function (e) {
    e.preventDefault();
    $("#content").load("./components/contact.html", function () {
      window.scrollTo(0, 0);
      // closeMenu(); // Close the menu
    });
  });

  // Load the footer content
  loadFooter();

  // Function to load the footer content
  function loadFooter() {
    fetch("./components/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Footer content could not be loaded");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("footer-container").innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }

  // Cart functionality
  // Cart array to hold items
  let cart = [];

  // Handle adding items to the cart
  $(document).on("click", ".add-to-cart", function () {
    const itemName = $(this).data("item");
    const itemImage = $(this).data("image");
    const itemPrice = $(this).data("price");

    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
      // If item exists, increase its quantity
      existingItem.quantity += 1;
    } else {
      // If item doesn't exist, add it to the cart with quantity = 1
      cart.push({
        name: itemName,
        image: itemImage,
        price: itemPrice,
        quantity: 1,
      });
    }

    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
  });

  // Handle removing item from the cart
  $(document).on("click", ".remove-item", function () {
    const index = $(this).data("index");
    cart.splice(index, 1); // Remove item from cart
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
  });

  // Handle increase item quantity
  $(document).on("click", ".increase-quantity", function () {
    const index = $(this).data("index");
    cart[index].quantity += 1; // Increase quantity by 1
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
  });

  // Handle decrease item quantity
  $(document).on("click", ".decrease-quantity", function () {
    const index = $(this).data("index");

    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1; // Decrease quantity by 1
      renderCart(); // Re-render the cart
      updateCartCount(); // Update the cart count
    }
  });

  // Function to update the cart count display
  function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Get the total number of items in the cart
    $("#viewCart span").text(cartCount); // Update the count in the cart icon
  }

  // Function to render cart items
  function renderCart() {
    const cartItemsList = $("#cart-items");
    cartItemsList.empty(); // Clear existing cart items

    if (cart.length === 0) {
      cartItemsList.append("<li>Your cart is empty.</li>");
    } else {
      cart.forEach((item, index) => {
        const cartItemHtml = `
        <li class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="image-cart" />
          <div>${item.name} - ${item.price}</div>
          <div class="quantity-controls">
            <button class="decrease-quantity" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-quantity" data-index="${index}">+</button>
          </div>
          
        </li>
      `;
        cartItemsList.append(cartItemHtml); // Append the item HTML to the cart
      });
    }

    calculateTotal(); // Calculate the total price
  }

  // Function to calculate the total cost
  function calculateTotal() {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", "")); // Convert price string to number
      return sum + price * item.quantity; // Multiply price by quantity
    }, 0);
    $("#total-cost").text(`$${total.toFixed(2)}`); // Update the total cost in the cart
  }

  // Clear the cart
  $("#clear-cart-btn").click(function () {
    cart = [];
    renderCart(); // Re-render the cart after clearing
    updateCartCount(); // Update the cart count
  });

  // Close the cart popup
  $("#close-cart-popup").click(function () {
    $("#cart-popup").hide(); // Close the cart popup when the close button is clicked
  });

  // Handle the close button
  $("#close-cart-popup").on("click", function () {
    $("#cart-popup").hide(); // Hide the cart popup
    $("#cart-popup-overlay").hide(); // Hide the overlay
  });

  // Ensure the popup can still be toggled open using the "View Cart" button
  $("#viewCart").on("click", function () {
    $("#cart-popup").show(); // Show the cart popup
    $("#cart-popup-overlay").show(); // Show the overlay
  });

  // Checkout logic with cart validation and loader simulation
  $("#checkout-btn").on("click", function () {
    if (cart.length === 0) {
      // alert("Your cart is empty. Add items to proceed.");
      return;
    }

    const loader = $("#checkout-loader");
    const successMessage = $("#checkout-success");

    // Show loader
    loader.removeClass("hidden");

    // Simulate checkout process with a timeout
    setTimeout(() => {
      // Hide loader
      loader.addClass("hidden");

      // Show success message
      successMessage.removeClass("hidden");

      // Clear the cart after a successful checkout
      cart.length = 0;
      renderCart(); // Re-render the cart to update UI
      updateCartCount(); // Update cart count

      // Hide the success message after a few seconds
      setTimeout(() => {
        successMessage.addClass("hidden");
      }, 3000); // Hide the success message after 3 seconds
    }, 2000); // Simulate a 2-second delay for the loader
  });

  // Checkout total calculation
  $("#checkout-btn").on("click", function () {
    if (cart.length === 0) {
      // alert("Your cart is empty. Add items to proceed.");
    } else {
      // Calculate total price
      const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return sum + price;
      }, 0);
      // alert(`Your total is $${total.toFixed(2)}. Proceeding to checkout.`);
      // Redirect to checkout page or handle checkout logic
      // window.location.href = "/checkout.html";
    }
  });

  // Clear cart button logic
  $("#clear-cart-btn").on("click", function () {
    if (cart.length === 0) {
      // alert("Your cart is already empty.");
    } else {
      if (confirm("Are you sure you want to clear the cart?")) {
        cart.length = 0; // Clear the cart array
        renderCart(); // Re-render the cart to update UI
        updateCartCount(); // Update cart count
        // alert("Cart cleared!");
      }
    }
  });

  // Function to render menu items
  function renderMenu() {
    // Fetch the JSON data
    $.getJSON("menuData.json", function (menuData) {
      // Generate the menu initially with all items (this is the default)
      generateMenu(menuData);

      // When a filter is clicked, set the active class and filter the menu
      $(".filter h2").click(function () {
        $(".filter h2").removeClass("active-filter");
        $(this).addClass("active-filter");

        const selectedCategory = $(this).data("category");
        const filteredMenu =
          selectedCategory && selectedCategory !== "all"
            ? menuData.filter((item) =>
                item.categories.includes(selectedCategory)
              )
            : menuData;

        generateMenu(filteredMenu); // Re-render the menu based on the filtered data
      });

      // Search filter
      $("#searchInput").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();
        const filteredMenu = menuData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
        generateMenu(filteredMenu);
      });
    });
  }
  // Function to generate the HTML for the menu items
  function generateMenu(items) {
    $("#menuGrid").empty(); // Clear the menu grid before adding new items
    items.forEach((item) => {
      const menuItemHtml = `
        <div class="menu-item"  data-aos="zoom-in">
          <img src="${item.image}" alt="${item.name}" />
          <div class="menu-flex">
            <strong>${item.name}</strong> - <span style="color: #ff0000;">${item.price}</span>
            <p>${item.description}</p>
            <button class="add-to-cart" data-item="${item.name}" data-image="${item.image}" data-price="${item.price}">Add to Cart</button>
          </div>
        </div>
      `;
      $("#menuGrid").append(menuItemHtml); // Append the item HTML to the menu grid
    });
  }
});
