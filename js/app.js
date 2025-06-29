//Toggle Darkmode Function
        
        function toggleMenu() {
            document.getElementById("sideMenu").classList.toggle("show");
            document.getElementById("overlay").classList.toggle("show");
        }

        function toggleTheme() {
            document.body.classList.toggle("light-mode");
            const mode = document.body.classList.contains("light-mode") ? "light" : "dark";
            localStorage.setItem("theme", mode);
        }


        window.addEventListener("DOMContentLoaded", () => {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "light") {
                document.body.classList.add("light-mode");
            }
        });





//Seach Results Function
      const searchInput = document.getElementById('searchInput');
  const searchResultsBox = document.getElementById('searchResults');

  const blogPosts = [
    { title: "How to Start Blogging in 2025", url: "#post1" },
    { title: "The Future of AI and Creativity", url: "#post2" },
    { title: "Cultural Shifts in a Digital World", url: "#post3" },
    { title: "Politics in the Age of Social Media", url: "#post4" },
    { title: "Why Minimalism is the New Trend", url: "#post5" },
    { title: "Tips for Writing Viral Articles", url: "#post6" }
  ];

  function showSearchResults(query) {
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    if (query === "") {
      searchResultsBox.classList.remove("show");
      searchResultsBox.innerHTML = "";
      return;
    }

    if (results.length === 0) {
      searchResultsBox.innerHTML = "<p>No results found.</p>";
    } else {
      searchResultsBox.innerHTML = `<ul>${results
        .map(post => `<li><a href="${post.url}">${post.title}</a></li>`)
        .join('')}</ul>`;
    }
    searchResultsBox.classList.add("show");
  }

  searchInput.addEventListener("input", (e) => {
    showSearchResults(e.target.value);
  });

  document.addEventListener("click", (e) => {
    if (!searchResultsBox.contains(e.target) && e.target !== searchInput) {
      searchResultsBox.classList.remove("show");
    }
  });   






//Slideshow Funcation
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideshow = document.getElementById('slideshow');
    let interval;

    function startSlideshow() {
      interval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 4000);
    }

    function stopSlideshow() {
      clearInterval(interval);
    }

    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);

    startSlideshow();



    