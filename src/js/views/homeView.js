export const clearActive = listtoclear =>{
    listtoclear.forEach(htmlclass =>{
        document.querySelector(`.${htmlclass}`).classList.remove('active')
    });
};

export const suggestedListener = events =>{
    events.forEach(event =>{
    
    });
};

export const populateCarousels = (carouselid,chunkedlist) =>{
    document.getElementById(`${carouselid}`).innerHTML="";
    chunkedlist.forEach(itemlist =>{
        //document.getElementById('suggested').innerHTML="";
        let caritem = document.createElement('div');
        let itmbody = document.createElement(`div`);
        caritem.classList.add(`carousel-item`);
        itmbody.classList.add(`d-flex`,`justify-content-around`,`mx-auto`);
        itmbody.style.width='90%';

        let cardhtml=`
                    <div class="carousel-item">
                        <div class="d-flex justify-content-around mx-auto" style="width: 90%;">
                    `
        itemlist.forEach(item =>{
            cardhtml = cardhtml + `
                                <div class="card" style="background-image: url(../img/${item.image}); background-position: center;" id="${item.id}">
                                    <div class="card-content">
                                        <a class="card-title btn btn-lg" href="/recipe.html?recipe=${item.id}" title="${item.name}">${item.name}</a>
                                    </div>
                                </div>
                                `
        });

        cardhtml=cardhtml + `
                                </div>
                            </div>
                            `
        
        document.getElementById(`${carouselid}`).insertAdjacentHTML('beforeend', cardhtml);
    });

    //mark first carousel item as active
    document.getElementById(`${carouselid}`).querySelector(`.carousel-item`).classList.add(`active`);

    
};

//build html string to populate search table
export const populateSearchedRecipe = (recipe) =>{
            
    document.getElementById('recipelist').style.display = "block";
    let table= document.getElementById('recipetable');
    //console.log(`match found length is ${table.rows.length}`);
    let row = table.insertRow(table.rows.length);
    //cell1 is name and image
    let cell1 = row.insertCell(0);
    //cell2 is ingredient list
    //let cell2 = row.insertCell(1);
    //cell3 is instructions
    //let cell3 = row.insertCell(2);
    
    //<a href=/recipe.html?recipe=${recipe.id}
    cell1.innerHTML=`<a href="/recipe.html?recipe=${recipe.id}">
                    <h5 class="text-center p-2 tablerow">${recipe.name}</h5>
                    <img class="img-fluid img-thumbnail tablerow" src="img/${recipe.image}">
                    </a>
                    `;
    //cell2.innerHTML=`
    //                <ol class="list-group list-group-numbered pt-5 tablerow">
    //                    <li class="list-group-item d-flex justify-content-between align-items-start ingredients tablerow">
    //                        <p class="tablerow">${recipe.ingredients}</p>
    //                        <!--<span class="badge bg-primary rounded-pill">14</span>-->
    //                    </li>
    //                </ol>
    //                `;
    //cell3.innerHTML=`<p class="pt-5 tablerow">${recipe.instructions}</p>`;

    
    //document.getElementById('searchbody').insertAdjacentHTML('beforeend',rowstring);
        
    
};

export const clearTable = ()=>{
    //console.log(`clearing table length ${document.getElementById('recipetable').rows.length}`);
    //document.getElementById('recipetable').innerHTML="";
    let tablelength = document.getElementById('recipetable').rows.length;
    for (let index = tablelength - 1; index > 0; index--) {
        document.getElementById('recipetable').deleteRow(index);
        
    }
}

export const populateCategories = (categories)=>{
    let categoryhtml=``
    categories.forEach(category =>{
        categoryhtml = categoryhtml + `
                        <a class="dropdown-item" href="#">${category}</a>
                        <div class="dropdown-divider"></div>
                        `
    });
    document.getElementById('categorydropdown').innerHTML="";
    document.getElementById('categorydropdown').insertAdjacentHTML('beforeend',categoryhtml);
}

export const populateTags = (tags) =>{
    let tagdropdownhtml=``
    Object.keys(tags).forEach(key =>{
        if(tags[key].count>1 && tags[key].count<=10){
            //populate
            //console.log(tags[key])
            tagdropdownhtml = tagdropdownhtml + `
            <a class="dropdown-item" href="#" id="${key}">${key} <span class="badge badge-info">${tags[key].count}</span></a>
            <div class="dropdown-divider"></div>
            `
        }
        if(tags[key].count>10 && tags[key].count<=20){
            //populate
            //console.log(tags[key])
            tagdropdownhtml = tagdropdownhtml + `
            <a class="dropdown-item" href="#" id="${key}">${key} <span class="badge badge-success">${tags[key].count}</span></a>
            <div class="dropdown-divider"></div>
            `
        }
        if(tags[key].count>20 && tags[key].count<=30){
            //populate
            //console.log(tags[key])
            tagdropdownhtml = tagdropdownhtml + `
            <a class="dropdown-item" href="#" id="${key}">${key} <span class="badge badge-warning">${tags[key].count}</span></a>
            <div class="dropdown-divider"></div>
            `
        }
        if(tags[key].count>30){
            //populate
            //console.log(tags[key])
            tagdropdownhtml = tagdropdownhtml + `
            <a class="dropdown-item" href="#" id="${key}">${key} <span class="badge badge-danger">${tags[key].count}</span></a>
            <div class="dropdown-divider"></div>
            `
        }
    });
    document.getElementById('tagdropdown').innerHTML=""
    document.getElementById('tagdropdown').insertAdjacentHTML('beforeend',tagdropdownhtml);
}