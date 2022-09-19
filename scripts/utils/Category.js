class Category {
    constructor(json){
        json && Object.assign(this, json);
    }

   createCard(){
        return ` <div class= "card" data-id = ${this.id}>
                <div class= "title"> ${this.name} </div>
                <div class= "picture">
                <img src= ${this.img}>
                </div> 
                </div>`;

    }
}