fetch('/getjewellerydata', {
    method:'get',
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.length)
    
    for(var i=0; i < data.length; i++){
        console.log(i)
    var newDiv = document.createElement('div');
    newDiv.id = 'r'+i;
    newDiv.className = 'col-lg-3 col-md-6 col-sm-12 pb-1';
    var newdiv2 = document.createElement('div');
    newdiv2.className = "card product-item border-0 mb-4"
    var newdiv3 = document.createElement('div')
    newdiv3.className = "card-header product-img position-relative overflow-hidden bg-transparent border p-0"
    var image = document.createElement('img')
    image.className =  "img-fluid w-100"
    image.src = "img/jewellery/"+data[i].images
    newdiv3.appendChild(image)
    newdiv2.appendChild(newdiv3)
    var new_sub = document.createElement('div')
    new_sub.className = "card-body border-left border-right text-center p-0 pt-4 pb-3" 
    var heading = document.createElement('h6')
    heading.className = "text-truncate mb-3"
    heading.innerHTML = data[i].product_name
    var new_sub1 = document.createElement('div')
    new_sub1.className = "d-flex justify-content-center"
    var heading_sub1 = document.createElement('h6')
    heading_sub1.innerHTML = data[i].price
    

    var new_sub2 = document.createElement('div')
    new_sub2.className = "card-footer d-flex justify-content-between bg-light border"

    var anchar = document.createElement('a')
    anchar.className = "btn btn-sm  p-0"
    anchar.style.color = "white"
    anchar.innerHTML = "View Details"
    
    var list = document.createElement("i")
    list.className = "fas fa-eye mr-1"
    list.style.color = "white"

    anchar.appendChild(list)


    var anchar2 = document.createElement('a')
    anchar2.className = "btn btn-sm  p-0"
    anchar2.style.color = "white"
    anchar2.innerHTML = "Add To Cart"

    var list2 = document.createElement("i")
    list2.className = "fas fa-eye mr-1"
    list2.style.color = "white"

    anchar2.appendChild(list2)

    new_sub2.appendChild(anchar)
    new_sub2.appendChild(anchar2)
    new_sub.appendChild(heading);
    new_sub1.appendChild(heading_sub1)
    new_sub.appendChild(new_sub1)
    newdiv2.appendChild(new_sub)
    newdiv2.appendChild(new_sub2)
    newDiv.appendChild(newdiv2)
    document.getElementById('photos').appendChild(newDiv);
        console.log(newDiv)
    }
})
  