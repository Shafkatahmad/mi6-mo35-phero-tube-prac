const loadCategories = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json();
    displayCategories(data.categories);
  }
  catch(error) {
    console.error("Error fetching Categories data");
  }
}

// create display categories button
const displayCategories = async (category) => {
  const categoryContainer = document.getElementById('category');

  category.forEach( (item) => {
    const btn = document.createElement("button");
    btn.classList = "btn";
    btn.innerHTML = `
    ${item.category}
    `

    // add the button to the category container
    categoryContainer.append(btn);
  })
}

loadCategories();