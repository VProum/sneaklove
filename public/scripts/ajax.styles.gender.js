import APIHandler from "./APIHandler.js";
const fetchDiv = document.querySelector("#products_grid");
const tagList = document.querySelectorAll(".tag-list-item");
const inputList = document.querySelectorAll(".tag-list-item input");
const filterAPI = new APIHandler()

// console.log(Qs);

window.addEventListener("load", () => {
  tagList.forEach((tag) => tag.addEventListener("click", clickhandler));
});

async function clickhandler() {
  try {
    let selectedTags = [];
    const arrayList = [... inputList];
    // console.log(arrayList);
    selectedTags = arrayList.filter(input => input.checked);
    // console.log(selectedTags);
    let tagId = [];
    selectedTags.forEach(tag => tagId.push(tag.dataset.tagId));
    // console.log(tagId);
    const arrayURL = window.location.pathname.split("/");
    let gender = arrayURL[arrayURL.length-1]
    const filterTags = await filterAPI.getSelectedTagsGender(gender, tagId);
    console.log(filterTags);
    fetchDiv.innerHTML = "";
    filterTags.data.forEach(function (shoe) {
      fetchDiv.innerHTML += `<a href="/one-product/${shoe._id}" class="product-item-wrapper">
      <div class="product-img">
          <img src="${shoe.image}" alt="${shoe.name} : what a nice pair of kicks">
      </div>
      <p class="product-name">${shoe.name}</p>
      <p class="product-cat">${shoe.category}</p>
      <p class="product-price">${shoe.price}</p>
  </a>`;
    });
  } catch (error) {
    console.log(error);
  }
}

