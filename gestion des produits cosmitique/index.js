let errnom = document.getElementById("errnom");
let errmarque = document.getElementById("errmarque");
let errprix= document.getElementById("errprix");
let errdate = document.getElementById("errdate");  
let errpromotion= document.getElementById("errpromotion");
let errtype = document.getElementById("errtype");
let  promo = document.getElementsByName("promotion");


class article {
  constructor(nom,marque,prix,date,type){
    this.nom=nom;
    this.marque=marque;
    this.prix=prix;
    this.date=date;
    this.type=type;
    this.promotion=this.Promotion();
  }

  Promotion(){
    if ( document.getElementById("oui").checked) {
    return "Promotion";
    }else{
    return "Sans Promotion";
    }
  }
}


  let strogedata =[];
  if (localStorage.product != null) {
    strogedata = JSON.parse(localStorage.product);
  }else{
      strogedata = [];
  }


function charger(){
    var compt; 
    compt=0;
    var nom=document.getElementById("nom");
    var marque =document.getElementById("marque");
    var prix=  document.getElementById("prix") ;
    
    var date=document.getElementById("date");
    var type = document.getElementById("typeselect");
    var t =type.value
    var  promotion = document.getElementsByName("promotion");
    var btn=document.getElementById("charge");
    var span=document.getElementById("Detail");
    
    
    if(nom.value.length >0 && nom.value.length <=30){
      errnom.innerHTML = ""; 
      nom.style.borderColor="rgb(227, 225, 225)";
    }else{
      errnom.innerHTML = "veuillez saisir votre nom correcte"; 
      errnom.style.color="red";
      nom.style.borderColor="red";
      compt++;
    } 
    
    if(marque.value.length >0 && marque.value.length <=30){
      errmarque.innerHTML = " ";
      marque.style.borderColor="rgb(227, 225, 225)";
    }else{
      errmarque.innerHTML = "veuillez saisir votre marque  ";
      errmarque.style.color="red";
      marque.style.borderColor="red";
      compt++;
    }
    
    
    if( prix.value.length == 0 || prix.value.match(/^[0-9]*[.|,]+[0-9]$/)){
      errprix.innerHTML = " veuillez saisir votre prix correcte et number doit etre reel";
      errprix.style.color="red";
      prix.style.borderColor="red";
      compt++;
    }else{
      errprix.innerHTML = " ";
      prix.style.borderColor="rgb(227, 225, 225)";
    } 
    
    if(date.value.length == 0){
      errdate.innerHTML = " veuillez saisir votre date correcte";
      errdate.style.color="red";
      date.style.borderColor="red";
      compt++;
    } else{
      errdate.innerHTML = " ";
      date.style.borderColor="rgb(227, 225, 225)";
    }
    var select =0;
    
    for(i=0;i<type.length;i++){
      if(type[i].selected){
        errtype.innerHTML = "";
        select++;
      }
    }
    if(select == 0){
      errtype.innerHTML = "veuillez choisir votre type de produit";
      errtype.style.color="red";
      compt++;
    }
    
    empty = true;
    var check ="";
    
    
    for(i=0;i<promotion.length;i++){
      if(promotion[i].checked){ 
        empty=false;
        check=promotion[i].value;
      } 
    }
    if(empty == true){
      errpromotion.innerHTML = " veuillez choisir votre promotion ";
      errpromotion.style.color="red";
      compt++;
    }else{
      errpromotion.innerHTML = " ";
    }
    
    
    if(compt==0){ 
      
      let tablecharge = {
        nom:nom.value,
        marque:marque.value,
        prix:prix.value,
        date:date.value,
            type:type.value,
            promotion:check
      }
      strogedata.push(tablecharge);
      strogedata.sort((a,b) => (a.nom.toLowerCase() > b.nom.toLowerCase()) ? 1 : ((b.nom.toLowerCase() > a.nom.toLowerCase()) ? -1 : 0));
          
      localStorage.setItem('product', JSON.stringify(strogedata)); 
      //Convert array to string + store data in product  
      //key/value
          
      let art=new article(nom.value,marque.value,prix.value,date.value,type.value);
          
          
      PrintData();
    }
  nom.value="";
  marque.value="";
  prix.value="";
  date.value="";
  document.getElementById("oui").checked=false;
  document.getElementById("non").checked=false;
        
}
        
function PrintData(){
  document.getElementById("charge").value = "Ajouter";
  let table = '';
  for(let i = 0 ; i < strogedata.length ; i++){
    table += `
      <tr>
      <td>${strogedata[i].nom}</td>
      <td>${strogedata[i].marque}</td>
      <td>${strogedata[i].prix}</td>
      <td>${strogedata[i].date}</td>
      <td>${strogedata[i].type}</td>
      <td>${strogedata[i].promotion}</td>
      <td><button onclick = "ModifiData( ${i} )" id = "" class= "btn-warning">Modify</button></td>
      <td><button onclick = "DleteData(  ${i}  )" id = "" class= "btn-danger">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
}

PrintData();

function DleteData(i){
  strogedata.splice(i,1);
  localStorage.product = JSON.stringify(strogedata); //Add a array after deleting it
  PrintData();
}
    
function ModifiData(i){
  var type = document.getElementById("typeselect");
  var nom=document.getElementById("nom");
  var marque =document.getElementById("marque");
  var prix=  document.getElementById("prix") ;

  var date=document.getElementById("date");   
  var  promotion = document.getElementsByName("promotion");
 
  nom.value = strogedata[i].nom;
  marque.value = strogedata[i].marque;
  prix.value = strogedata[i].prix ;
  date.value = strogedata[i].date;
  type.value=strogedata[i].type;

  if(strogedata[i].promotion == "oui"){
    document.getElementById("oui").checked=true;
  }else{
     document.getElementById("non").checked=true;
  }
  document.getElementById("charge").value = "Modifier";    
  document.getElementById("charge").onclick = ModifierdeAjouterRow;

  function ModifierdeAjouterRow() {
    strogedata[i].nom= nom.value ; 
    strogedata[i].marque=marque.value ;
    strogedata[i].prix =prix.value ;
    strogedata[i].date= date.value ;
    strogedata[i].type=type.value;  
           
    if (document.getElementById("oui").checked == true) {
      strogedata[i].promotion =document.getElementById("oui").value;
    }else{
      strogedata[i].promotion =
      document.getElementById("non").value;
    }
    localStorage.product = JSON.stringify(strogedata); 
    PrintData();
  }
    
}

document.getElementById("charge").onclick = charger;
  
