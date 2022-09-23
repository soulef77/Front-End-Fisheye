 async function getData(){
    
    let response = await fetch('/Front-End-Fisheye/data/photographers.json');
        let datas = await response.text();
            fetch("/Front-End-Fisheye/data/photographers.json")
        .then(response => {
        })
        let obj = JSON.parse(datas);
        return obj;
}
