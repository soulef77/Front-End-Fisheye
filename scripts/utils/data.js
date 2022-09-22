 async function getData(){
    // let result= await fetch('/Front-End-Fisheye/data/photographers.json');
    // console.log(" test2 "+ result.json);
    // return result.json();


    let response = await fetch('/Front-End-Fisheye/data/photographers.json');
        let datas = await response.text();
            fetch("/Front-End-Fisheye/data/photographers.json")
        .then(response => {
        //   return response.json();
        })
        // .then(jsondata => console.log(jsondata))
        let obj = JSON.parse(datas);
        // console.log(datas+ "longuer  " + datas.length+ " name " + obj.city);
            // console.log("DATA "+ obj);
         return obj;
}
