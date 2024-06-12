// variables
const recipeList = document.querySelector('#recipeList');
const favList = document.querySelector('#favList');
const list = new MDCList(document.querySelector('.mdc-list'));
const button1 = document.querySelector('#nextsheet');
const favbtn = document.querySelector('#addtofav');
const sheetimg = document.querySelector("#sheetimg");
const sheettitle = document.querySelector("#sheettitle");
const sheetimg2 = document.querySelector("#sheetimg2");
const sheettitle2 = document.querySelector("#sheettitle2");
let object;

// fetch main page
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0c2da3d67f7047bc86c29dbb0c13f8df&addRecipeNutrition=true&number=10`)
    .then(response =>response.json())
    .then(handleResponce);

// responce main page
    function handleResponce(data) {


        data.results.forEach(element => {

            // create elements
            const li = document.createElement('li');
            const div1 = document.createElement('div');
            const image = document.createElement('img');
            const div2 = document.createElement('div');
            const span = document.createElement('span');

            // add class to listitem
            li.classList.add("mdc-image-list__item");

            // add tags
            if (element.dairyFree == true) {
                li.classList.add("dairyFree");
            } 
            if(element.vegan == true){
                li.classList.add("vegan");
            }
            if(element.glutenFree == true){
                li.classList.add("glutenFree");
            }
            if(element.vegetarian == true){
                li.classList.add("vegetarian");
            }

            // set id for listitem
            li.id = element.title;
            
            // add class to image div
            div1.classList.add("mdc-image-list__image-aspect-container");

            // add class to image
            image.classList.add("mdc-image-list__image");

            // fill image data
            image.src = element.image;
            image.title = element.title;
            image.alt = element;

            // add click event to image
            image.addEventListener('click', () => {
                // check if recipe is favorited
                if (localStorage.getItem("fav") != null) {
                    favs = JSON.parse(localStorage.getItem("fav"));
                    favs.forEach(fav => {
                        if (fav.id == element.id) {
                            favbtn.style.color = 'red';
                        }else{
                            favbtn.style.color = 'white';
                        }
                    });
                }

                // set sheet info
                sheetimg.src = image.src;
                sheettitle.innerHTML = image.title;
                sheetimg2.src = image.src;
                sheettitle2.innerHTML = image.title;
                
                // remove sheet out of view 
                sheet.classList.remove('sheet-out-of-view');

                // set main height
                main.style.overflowY = "hidden";
                main.style.height = (sheet.offsetHeight-56)+"px";

                // set pushstate
                push(image.title);

                // fetch recipe data
                fetch(`https://api.spoonacular.com/recipes/${element.id}/information?apiKey=0c2da3d67f7047bc86c29dbb0c13f8df`)
                        .then(response =>response.json())
                        .then(sheetResponce);
            });

            // add class to text div
            div2.classList.add("mdc-image-list__supporting");
            div2.classList.add("aligni");

            // text span class and text
            span.classList.add("mdc-image-list__label");
            span.innerHTML = element.title;

            // appending Children
            div1.appendChild(image);
            div2.appendChild(span);
            li.appendChild(div1);
            li.appendChild(div2);
            recipeList.appendChild(li);
        });
    }

    // open sheet2
    button1.addEventListener('click', () => {
      sheet2.classList.remove('sheet2-out-of-view');
      main.style.overflowY = "hidden";
      main.style.height = (sheet2.offsetHeight-56)+"px";
    });

    // responce function for sheet
    function sheetResponce(data) {
        
        // fill object with data
        object = data;
        let i = 0;

        // fill discription with text
        document.querySelector('#discription').innerHTML = data.summary;

        // loop thru ingredients
        data.extendedIngredients.forEach(element => {
            i++;
            const li = document.createElement('li');
            li.classList.add("mdc-list-item");
            if (i == 0) {
                li.tabIndex = 0;
            }
            const span1 = document.createElement('span');
            span1.classList.add("mdc-list-item__ripple");
            const span2 = document.createElement('span');
            span2.classList.add("mdc-list-item__text");
            span2.innerHTML = element.amount+" "+element.name
            li.appendChild(span1);
            li.appendChild(span2);
            document.querySelector('#ingrediantslist').appendChild(li);
        });
        i=0;

        // loop thru instructions
        data.analyzedInstructions[0].steps.forEach(element => {
            i++;
            const li = document.createElement('li');
            li.classList.add("mdc-list-item");
            if (i == 0) {
                li.tabIndex = 0;
            }
            const span1 = document.createElement('span');
            span1.classList.add("mdc-list-item__ripple");
            const span2 = document.createElement('span');
            span2.classList.add("mdc-list-item__text");
            span2.innerHTML = element.number+" "+element.step
            li.appendChild(span1);
            li.appendChild(span2);
            document.querySelector('#instructionslist').appendChild(li);
        });
      
    }

    // click event for adding and removing recipes from favorites
    favbtn.addEventListener('click', () => addtofav(object));

    // function for adding and removing recipes from favorites
    function addtofav(object) {

        // resetting variables
        let favs = [];
        let remove = false;

        // check if localstorage "fav" exists
        if (localStorage.getItem("fav") != null) {

            // filling favs with local storage items
            favs = JSON.parse(localStorage.getItem("fav"));
            favs.forEach(element => {
                // checking if recipe is already favorited
                if (element.id == object.id) {
                    remove = true;
                }
            });
        }

        // if for deleting and ading favorite to favs
        if (remove == true) {
            favs = favs.filter(item => item.id !== object.id);
            favbtn.style.color = 'white';
        } else {
            favs.push(object);
            favbtn.style.color = 'red';
        }

        // clearing and adding favorites
        localStorage.clear();
        localStorage.setItem("fav", JSON.stringify(favs));
    }

    // function for loading all favorite recipes 
    function favload() {

        // clearing favlist
        favList.innerHTML = '';

        // looping thru favorites
        JSON.parse(localStorage.getItem("fav")).forEach(element => {

            // creating new elements
            const li = document.createElement('li');
            const div1 = document.createElement('div');
            const image = document.createElement('img');
            const div2 = document.createElement('div');
            const span = document.createElement('span');

            // add class to listitem
            li.classList.add("mdc-image-list__item");

            // add class to image
            image.classList.add("mdc-image-list__image");

            // add data to image
            image.src = element.image;
            image.title = element.title;
            image.alt = element;

            // add class to text div
            div2.classList.add("mdc-image-list__supporting");
            div2.classList.add("aligni");

            // add class to span
            span.classList.add("mdc-image-list__label");

            // add text to
            span.innerHTML = element.title;

            div1.appendChild(image);
            div2.appendChild(span);

            li.appendChild(div1);
            li.appendChild(div2);

            // add click event to image
            image.addEventListener('click', () => {
                sheetimg.src = image.src;
                sheettitle.innerHTML = image.title;
                sheetimg2.src = image.src;
                sheettitle2.innerHTML = image.title;
                favsheet.classList.add('favsheet-out-of-view');
              sheet.classList.remove('sheet-out-of-view');
              main.style.overflowY = "hidden";
              main.style.height = (sheet.offsetHeight-56)+"px";
              push(image.title);
              fetch(`https://api.spoonacular.com/recipes/${element.id}/information?apiKey=0c2da3d67f7047bc86c29dbb0c13f8df`)
                    .then(response =>response.json())
                    .then(sheetResponce);
            });

            favList.appendChild(li);
        });
       

    }