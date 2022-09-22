export const loadRecipe = recipe =>{
    document.getElementById(`recipe_img`).src = `img/${recipe.image}`;
    document.getElementById('recipe_name').innerHTML = `<h1>${recipe.name}</h1>`;
};

export const loadIngredients = recipe =>{
    let ingredientcount=0;
    //let ingredientcontainer = document.createElement('div');
    //ingredientcontainer.classList.add('container');
    //ingredientcontainer.style.width = "25%";
    let ingredienthtml = `
    <div class="p-2 m-2 rounded ingredientlist">
                        `;
    recipe.ingredients.forEach((ingredient,idx) => {
        let count = idx+1;
        let ingredientsplit = ingredient.split(' ', 2);
        let amount = ingredientsplit[0];
        let measurement = ingredientsplit[1];
        let type = ingredient.slice(amount.length+measurement.length+2,ingredient.length);
        //console.log(ingredientsplit[1],ingredientsplit[0]);
        //console.log(amount,measurement,type,count,count%5);
        if(amount=="0"){
            ingredienthtml = ingredienthtml + `
            <p class="lead ingredientline p-1">${measurement} ${type}</p>`;
        }else{
            ingredienthtml = ingredienthtml + `
            <p class="lead ingredientline p-1">${amount} ${measurement} ${type}</p>`;
        }
        
        //ingredientcontainer.insertAdjacentHTML('beforeend',html);
        //push ingredient container into html
        if(idx==recipe.ingredients.length-1){
            ingredienthtml = ingredienthtml + `
            </div>
            `;
        }
        if(count%5==0){
            //document.getElementById(`ingredients`).appendChild(ingredientcontainer)
            //ingredientcontainer.innerHTML="";
            ingredienthtml = ingredienthtml + `
            </div>
            <div class="p-2 m-2 rounded ingredientlist"">
                                                `
            

        }
    });
    
    //console.log(ingredienthtml)
    document.getElementById(`ingredients`).insertAdjacentHTML('beforeend', ingredienthtml);
    //ingredientcontainer.insertAdjacentHTML('beforeend',ingredienthtml);
};

export const loadInstructions = recipe =>{
    let instructionstring = recipe.instructions;
    let chunkedinstructions = instructionstring.split(`/n`);
    document.getElementById(`instructions`).innerHTML=``;
    chunkedinstructions.forEach(step =>{
        //console.log(step);
        document.getElementById(`instructions`).insertAdjacentHTML('beforeend',`<p>${step}</p>`)
    });
};