history.pushState({}, "", location.pathname);
//variables
const topbarElement = document.querySelector('.mdc-top-app-bar');
const topappbar = new MDCTopAppBar(topbarElement);
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const sheet = document.querySelector(".sheet");
const sheet2 = document.querySelector(".sheet2");
const favsheet = document.querySelector(".favsheet");
const searchbar = document.querySelector('#searchbar');
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const tabs = document.querySelectorAll(".mdc-tab-indicator");
const buttons = document.querySelectorAll(".mdc-tab");
const main = document.querySelector("#main1");


// open menu
document.querySelector('#toggle').addEventListener('click', () => {
  drawer.open = true;
});


// close menu
document.querySelector('.mdc-drawer .mdc-list').addEventListener('click', (event) => {
  drawer.open = false;
});


// filter reset
document.querySelector('#title').addEventListener('click', () => {
  tabs.forEach(element => {
    element.classList.remove("mdc-tab-indicator--active");
  });
  buttons.forEach(element => {
    element.classList.remove("mdc-tab--active");
  });
  disablefilter();
});


// tab filters
document.querySelector('#tab1').addEventListener('click', () => {
  filter('vegan');
});
document.querySelector('#tab2').addEventListener('click', () => {
  filter('dairyFree');
});
document.querySelector('#tab3').addEventListener('click', () => {
  filter('glutenFree');
});
document.querySelector('#tab4').addEventListener('click', () => {
  filter('vegetarian');
});


// show and hide search bar
document.querySelector('#search').addEventListener('click', () => {
  searchbar.classList.toggle("hidden");
});


// filter by search
searchbar.addEventListener('keyup', function (e) {
  tabs.forEach(element => {
    element.classList.remove("mdc-tab-indicator--active");
  });
  buttons.forEach(element => {
    element.classList.remove("mdc-tab--active");
  });
  if (e.key === 'Enter' || e.keyCode === 13) {
    searchfilter(searchbar.value);
  }
});


// filter function for filtering recipes
function filter(classname) {
  const placeholders = document.querySelectorAll(".mdc-image-list__item");
  placeholders.forEach(element => {
    element.classList.add('hidden');
    if (element.classList.contains(classname)) {
      element.classList.remove('hidden');
    }
  });
}


// disables all filters
function disablefilter() {
  const placeholders = document.querySelectorAll(".mdc-image-list__item");
  placeholders.forEach(element => {
    element.classList.remove('hidden');
  });
}


// filters recipes by search result
function searchfilter(name) {
  const placeholders = document.querySelectorAll(".mdc-image-list__item");
  placeholders.forEach(element => {
    element.classList.add('hidden');
    if (element.id.toLowerCase().includes(name.toLowerCase())) {
      element.classList.remove('hidden');
    }
  });
}


// close sheet 1
document.querySelector('#closeSheet').addEventListener('click', () => {
  closeSheet();
});

// close sheet 2
document.querySelector('#closeSheet2').addEventListener('click', () => {
  closeSheet2();
});

// close favorites sheet
document.querySelector('#closeFavSheet').addEventListener('click', () => {
  closeFavSheet();
});

// open favorites sheet
document.querySelector('#openFavSheet').addEventListener('click', () => {
  openFavSheet();
});


// function for closing sheet layer 1
function closeSheet() {
  sheet.classList.add('sheet-out-of-view');
  main.style.overflowY = "auto";
  main.style.height = "auto";
  history.pushState({}, "", location.pathname);
}


// function for closing sheet layer 2
function closeSheet2() {
  sheet2.classList.add('sheet2-out-of-view');
  main.style.overflowY = "hidden";
  main.style.height = (sheet.offsetHeight - 56) + "px";
}


// function for closing the favorites sheet
function closeFavSheet() {
  favsheet.classList.add('favsheet-out-of-view');
  main.style.overflowY = "auto";
  main.style.height = "auto";
  history.pushState({}, "", location.pathname);
}


// function for opening the favorites sheet
function openFavSheet() {
  favload();
  favsheet.classList.remove('favsheet-out-of-view');
  requestAnimationFrame(() => {
    main.style.overflowY = "hidden";
    main.style.height = (favsheet.offsetHeight - 56) + "px";
  });
  push("favorites");
}


// function for setting pushstate based on a value
function push(val) {
  const url = new URL(location);
  url.searchParams.set("post", val);
  history.pushState({}, "", url);
}


// event listener for closing sheets
window.addEventListener("popstate", function () {
  closeSheet2();
  closeSheet();
});
