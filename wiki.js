window.onload=function(){
  var ele = document.getElementById("movielist");
 ele.innerHTML = ''
 
 var ele1 = document.getElementById("movielist");
 ele1.innerHTML = "<input type=\"radio\" id=\"gump\" name=\"movie\"> <label for=\"gump\">Forrest Gump &nbsp; </label> <input type=\"radio\" id=\"raiders\" name=\"movie\"><label for=\"raiders\"> &nbsp;  Raiders of the Lost Ark &nbsp; </label><input type=\"radio\" id=\"diehard\" name=\"movie\"><label for=\"diehard\">&nbsp;Die Hard &nbsp;  </label><input type=\"radio\" id=\"Clueless\" name=\"movie\"><label for=\"diehard\">&nbsp;Clueless</label>"	
 
 var listmovie = 1;
 
document.getElementById("listmovie").addEventListener("click", function(){
  var radio = document.getElementById("entermovie");
 radio.checked = false;
  var ele1 = document.getElementById("movielist");
 ele1.innerHTML = "<input type=\"radio\" id=\"gump\" name=\"movie\"> <label for=\"gump\">Forrest Gump &nbsp; </label> <input type=\"radio\" id=\"raiders\" name=\"movie\"><label for=\"raiders\"> &nbsp;  Raiders of the Lost Ark &nbsp; </label><input type=\"radio\" id=\"diehard\" name=\"movie\"><label for=\"diehard\">&nbsp;Die Hard &nbsp;  </label><input type=\"radio\" id=\"Clueless\" name=\"movie\"><label for=\"diehard\">&nbsp;Clueless</label>"	
 var ele2 = document.getElementById("searchmovie");
 ele2.innerHTML = "";
 listmovie = 1;
});

document.getElementById("entermovie").addEventListener("click", function(){
 var radio = document.getElementById("listmovie");
 radio.checked = false;
  var ele = document.getElementById("movielist");
 ele.innerHTML = ""		
 var ele1 = document.getElementById("searchmovie");
 ele1.innerHTML = "<p> Movie Name: <input type=\'text\' id = \"moviename\"/> Year: <input type=\'text\' id = \"year\"/> &nbsp; <br> (e.g. Movie Name: Forrest Gump, Year: 1994)   </p>"
 listmovie = 0;
});

document.getElementById("submit").addEventListener("click", function(){
username = document.getElementById("user_name").value;
if(listmovie == 1){
console.log("hey");
var pick = document.getElementsByTagName('input');
                    if(pick[2].checked)
                         WD(41528, username)
                    else if(pick[3].checked)
                          WD(54166, username)
                    else if(pick[4].checked)
                          WD(97646, username)
                    else if(pick[5].checked)
                          WD(105872, username)
}
else{
 var ele2 = document.getElementById('moviename').value;
 var ele3 = document.getElementById('year').value;
 ajax(ele2, ele3, username);
}											

});
}

function ajax (keyword, year, name) { 
fullmovie = keyword + "%20" + year;
$.ajax({ 
url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + fullmovie + "&prop=info&inprop=url&utf8=&format=json",
dataType: "jsonp",
success: function(response) {
  if (response.query.searchinfo.totalhits === 0) {
     let ele = document.getElementById("summary");
     ele.innerHTML = "Invalid movie, try a different one";
  }

  else {
    var title = response.query.search[0].pageid;
    WD(title, name)
  }
},
error: function () {
 let ele = document.getElementById("summary");
 ele.innerHTML = "Error retrieving search results, please refresh the page";
}
});
}

const WD = async function(item, name) {
const url = "https://en.wikipedia.org/w/api.php?" +
 new URLSearchParams({
     origin: "*",
     action: "parse",
     pageid: item,
     format: "json",
 });
 
 
try {
 const req = await fetch(url);
 const json = await req.json();
 text = json.parse.text["*"]
 text = text.substring(text.search("Edit section: Plot")+80)
 cast = text.substring(text.search("Edit section: Cast"))
 cast = cast.substring(cast.search("<li>"))
 cast = cast.substring(cast.search(" as ")+3, cast.search("\n"))                  
 if(cast.includes(':'))
      cast = cast.substring(0, cast.search(':'))
 if(cast.includes("/wiki/"))
     cast = cast.substring(cast.search('>')+1)
 if(cast.includes('<'))
     cast = cast.substring(0, cast.search('<'))   
 if(cast.includes('/'))
      cast = cast.substring(0, cast.search('/'))     
       
 if(text.includes("Edit section: Cast")){     
 text = text.substring(0,text.search("Edit section: Cast")-205) 
 text = text.substring(text.search(">")+5)     
 while(text.includes("<")){
   text1 = text.substring(text.search("<"), text.search(">")+1)
   text = text.replace(text1,'')
   if((text.length-text.search("<"))<20){
     break
     }
 }
 while(text.includes("{")){
  text1 = text.substring(text.search("{"), text.search("}")+1)
  text = text.replace(text1,'')
  if((text.length-text.search("{"))<20){
    break
    }
}
 text = text.replaceAll('\n', '<br><br>')
 
 var x = 0
 
 for(let i = 0; i < cast.length; i++){
   if(cast[i] == ' ')
     x++
   else
     break
 }
 
 cast = cast.substring(x)  

 if(cast.includes(" ")){
      firstname = cast.substring(0, cast.search(" "))
      lastname = cast.substring(cast.search(" ")+1)
      if(name.includes(" ")){
        userFirst = name.substring(0, name.search(" "))
        userLast = name.substring(name.search(" ")+1)
         text = text.replaceAll(firstname, userFirst)
         text = text.replaceAll(lastname, userLast)  
      }
      else{
      text = text.replaceAll(cast, name)
      text = text.replaceAll(lastname, name)
      text = text.replaceAll(firstname, name)
      }
    }
    else
      text=text.replaceAll(cast, name)
    
    
 let ele = document.getElementById("summary");
 ele.innerHTML = text
 }
 else{
       let ele = document.getElementById("summary");
       ele.innerHTML = "Invalid movie, try a different one"
 }
} catch (e) {
 console.error(e);
}

}