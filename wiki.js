window.onload=function(){
  var ele = document.getElementById("searchmovie");
 ele.innerHTML = '<br>'
 
 var ele1 = document.getElementById("movielist");
 ele1.innerHTML = "<input type=\"radio\" id=\"gump\" name=\"movie\"> <label for=\"gump\">Forrest Gump &nbsp; </label> <input type=\"radio\" id=\"raiders\" name=\"movie\"><label for=\"raiders\"> &nbsp;  Raiders of the Lost Ark &nbsp; </label><input type=\"radio\" id=\"diehard\" name=\"movie\"><label for=\"diehard\">&nbsp;Die Hard &nbsp;  </label><input type=\"radio\" id=\"Clueless\" name=\"movie\"><label for=\"clueless\">&nbsp;Clueless&nbsp;</label> </label><input type = \"radio\" id=\"The Shining\" name=\"movie\"><label for = \"shining\">&nbsp;The Shining&nbsp;</label> <input type = \"radio\" id = \"The Wizard of Oz\" name = \"movie\"><label for = \"Wizard\"> &nbsp; The Wizard of Oz</label>"	
 
 var listmovie = 1;
 
document.getElementById("listmovie").addEventListener("click", function(){
  var radio = document.getElementById("entermovie");
 radio.checked = false;
  var ele1 = document.getElementById("movielist");
 ele1.innerHTML = "<input type=\"radio\" id=\"gump\" name=\"movie\"> <label for=\"gump\">Forrest Gump &nbsp; </label> <input type=\"radio\" id=\"raiders\" name=\"movie\"><label for=\"raiders\"> &nbsp;  Raiders of the Lost Ark &nbsp; </label><input type=\"radio\" id=\"diehard\" name=\"movie\"><label for=\"diehard\">&nbsp;Die Hard &nbsp;  </label><input type=\"radio\" id=\"Clueless\" name=\"movie\"><label for=\"clueless\">&nbsp;Clueless&nbsp;</label> </label><input type = \"radio\" id=\"The Shining\" name=\"movie\"><label for = \"shining\">&nbsp;The Shining&nbsp;</label> <input type = \"radio\" id = \"The Wizard of Oz\" name = \"movie\"><label for = \"Wizard\"> &nbsp; The Wizard of Oz</label>"		
 var ele2 = document.getElementById("searchmovie");
 ele2.innerHTML = "<br>";
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
var pick = document.getElementsByTagName('input');
                    if(pick[2].checked)
                    insertMainCharacter(41528, username)
                    else if(pick[3].checked)
                    insertMainCharacter(54166, username)
                    else if(pick[4].checked)
                    insertMainCharacter(97646, username)
                    else if(pick[5].checked)
                    insertMainCharacter(105872, username)
                    else if(pick[6].checked)
                    insertMainCharacter(1186616, username)
                    else if(pick[7].checked)
                    insertMainCharacter(561315, username)
}
else{
 var ele2 = document.getElementById('moviename').value;
 var ele3 = document.getElementById('year').value;
 ajax(ele2, ele3, username);
}											

});
}

function ajax (keyword, year, name) { 
fullmovie = keyword + "%20" + "(" + year + " film)";
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
    insertMainCharacter(title, name)
  }
},
error: function () {
 let ele = document.getElementById("summary");
 ele.innerHTML = "Error retrieving search results, please refresh the page";
}
});
}

const insertMainCharacter = async function(item, name) {
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
 if(!text.includes("list of episodes")){
 text = text.substring(text.search("Edit section: Plot")+80)
 if(text.includes("Voice cast")){
  cast = text.substring(text.search("Voice cast"))
  }
  
 else if(text.includes("Edit section: Cast")){
  cast = text.substring(text.search("Edit section: Cast"))
}

 cast = cast.substring(cast.search("<li>"))
 cast = cast.substring(cast.search(" as ")+3, cast.search("\n"))   
 if(cast.includes(':')){
      cast = cast.substring(0, cast.search(':'))
 }
 if(cast.includes('<li>')){
      cast = cast.substring(cast.search('<li>')+4)
 }


 if(cast.includes("/wiki/"))
     cast = cast.substring(cast.search('>')+1)              
 
 if(cast.includes('<'))
     cast = cast.substring(0, cast.search('<'))  
 if(cast.includes('/'))
      cast = cast.substring(0, cast.search('/'))     
 if(cast.includes(','))
      cast = cast.substring(0, cast.search(','))

  while(cast.slice(-1)== ' ')
      cast = cast.substring(0, cast.length-1);

  var x = 0

  for(let i = 0; i < cast.length; i++){
    if(cast[i] == ' ')
      x++
    else
      break
  }
  cast = cast.substring(x)  

 if(text.includes("Edit section: Cast")){     
  text = text.substring(0,text.search("Edit section: Cast")-205) 
  text = text.substring(text.search(">")+5)     

  while(text.includes("File:")){
    text1 = text.substring(text.search("div class"))
    text1 = text1.substring(0, text1.search('\n'))
    text = text.replace(text1, '')
  }
  
  if(text.indexOf('<')>text.indexOf('>')){
    text1= text.substring(0, text.search('<')+1)
    text=text.replace(text1,'')
    }
    

  while(text.includes("<")){
    text1 = text.substring(text.search("<"), text.search(">")+1)
    text = text.replace(text1,'')
    if((text.length-text.search("<"))<50){
      break
      }
  }

while(text.includes("&#91")){
  text1 = text.substring(text.search("&#91;"), text.search("&#93;")+5)
  text = text.replace(text1,'')
  if((text.length-text.search("&#91;"))<20){
    break
    }
 
}

 text = text.replaceAll('\n', '<br><br>')

 if(name != ""){
 if(cast.includes(" ")){
   
      firstname = cast.substring(0, cast.search(" "))
      
      if(cast.includes('"')){
        nickname = cast.substring(cast.search('"')+1, cast.lastIndexOf('"'))
        text = text.replaceAll(nickname, firstname)
      }

      if(cast.includes(')')){
        console.log("slgken")
        parenthetical = cast.match(/\((.*?)\)/)[0]
        parenthetical = parenthetical.substring(1,parenthetical.length-1)
        text = text.replaceAll(parenthetical, firstname)
        console.log(parenthetical)
      }
  
      console.log(cast)

      lastname = cast.substring(cast.lastIndexOf(" ")+1)
      
      if(name.includes(" ")){
        userFirst = name.substring(0, name.search(" "))
        userLast = name.substring(name.search(" ")+1)
         text = text.replaceAll(firstname, userFirst)
         text = text.replaceAll(lastname, userLast)  
         if(firstname.slice(-1)!='s')
         text = text.replaceAll(userFirst+"' ", userFirst+"'s ")
         if(lastname.slice(-1)!='s')
         text = text.replaceAll(userLast+"' ", userLast+"'s ")

         if(text.includes(userFirst + " " + userFirst)){
          text1 = userFirst + " " + userFirst
          text = text.replaceAll(text1, userFirst)
          }
          if(text.includes(userFirst + ' "' + userFirst + '"')){
            text1 = userFirst + ' "' + userFirst + '"'
            text = text.replaceAll(text1, userFirst)
          }
      }
      else{
      text = text.replaceAll(cast, name)
      text = text.replaceAll(lastname, name)
      text = text.replaceAll(firstname, name)
      if(name.slice(-1)!='s'){
      text = text.replaceAll(name+"' ", name+"'s ")
      }

      if(text.includes(name + ' "' + name + '"')){
        console.log("slknegsenlkg")
        text1 = name + ' "' + name + '"'
        text = text.replaceAll(text1, name)
      }

      if(text.includes(name + " " + name)){
        text1 = name + " " + name
        text = text.replaceAll(text1, name)
      }

      }
    }
    else{
      text=text.replaceAll(cast, name)
      if(name.slice(-1)!='s')
      text = text.replaceAll(name+"' ", name+"'s ")
    }
  }
  else{
    if(cast.includes(" ")){
   
      firstname = cast.substring(0, cast.search(" "))
      
      if(cast.includes('"')){
        nickname = cast.substring(cast.search('"')+1, cast.lastIndexOf('"'))
        text = text.replaceAll(nickname, firstname)
      }

      if(cast.includes(')')){
        console.log("slgken")
        parenthetical = cast.match(/\((.*?)\)/)[0]
        parenthetical = parenthetical.substring(1,parenthetical.length-1)
        text = text.replaceAll(parenthetical, firstname)
        console.log(parenthetical)
      }
  
      console.log(cast)

      lastname = cast.substring(cast.lastIndexOf(" ")+1)
      
      if(text.includes(firstname + ' "' + firstname + '"')){
        console.log("slknegsenlkg")
        text1 = firstname + ' "' + firstname + '"'
        text = text.replaceAll(text1, "")
      }

      if(text.includes(firstname + " " + firstname)){
        text1 = firstname + " " + firstname
        text = text.replaceAll(text1, "")
      }

      text = text.replaceAll(firstname, "")
      text = text.replaceAll(lastname, "")
      text = text.replaceAll(name, "")

      }
    else{
      text = text.replaceAll(name, "")
    }

  }
  
  text = text.replaceAll("<br><br><br><br>", "<br><br>")
  text = text.substring(0, text.lastIndexOf('.')+1)
  while(text.search("<br>")==0){
    text = text.substring(4);
  }
  text = text += "<br><br><br><br>"

  console.log(text)

 let ele = document.getElementById("summary");
 ele.innerHTML = text
 }
 else{
       let ele = document.getElementById("summary");
       ele.innerHTML = "Invalid movie, try a different one"
 }
}else{
  let ele = document.getElementById("summary");
  ele.innerHTML = "TV shows not supported, try entering a movie"
}
} catch (e) {
 console.error(e);
}

}