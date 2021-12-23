var mobile = 0;

window.onload=function(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mobile = 1;
  }else{
    mobile = 0;
  }
  var ele = document.getElementById("searchmovie");
 ele.innerHTML = '<br>'

 var ele1 = document.getElementById("movielist");
 ele1.innerHTML = "<label for=\"gump\"><input type=\"radio\" id=\"gump\" name=\"movie\"> Forrest Gump &nbsp; </label> <label for=\"raiders\"> <input type=\"radio\" id=\"raiders\" name=\"movie\">&nbsp;  Raiders of the Lost Ark &nbsp; </label> <label for=\"casinoroyale\"><input type=\"radio\" id=\"casinoroyale\" name=\"movie\">&nbsp;Casino Royale &nbsp;  </label> <label for=\"Clueless\"> <input type=\"radio\" id=\"Clueless\" name=\"movie\">&nbsp; Clueless &nbsp; </label><label for = \"The Shining\"><input type = \"radio\" id=\"The Shining\" name=\"movie\">&nbsp;The Shining&nbsp;</label> <label for = \"The Wizard of Oz\"> <input type = \"radio\" id = \"The Wizard of Oz\" name = \"movie\">&nbsp; The Wizard of Oz</label> &nbsp <label for = \"Shrek\"> <input type = \"radio\" id = \"Shrek\" name = \"movie\"> &nbsp; Shrek</label>"	
 
 var listmovie = 1;
 
document.getElementById("listmovie").addEventListener("click", function(){
  var radio = document.getElementById("entermovie");
 radio.checked = false;
  var ele1 = document.getElementById("movielist");
 ele1.innerHTML =  "<label for=\"gump\"><input type=\"radio\" id=\"gump\" name=\"movie\"> Forrest Gump &nbsp; </label> <label for=\"raiders\"> <input type=\"radio\" id=\"raiders\" name=\"movie\">&nbsp;  Raiders of the Lost Ark &nbsp; </label> <label for=\"casinoroyale\"><input type=\"radio\" id=\"casinoroyale\" name=\"movie\">&nbsp;Casino Royale &nbsp;  </label> <label for=\"Clueless\"> <input type=\"radio\" id=\"Clueless\" name=\"movie\">&nbsp; Clueless &nbsp; </label><label for = \"The Shining\"><input type = \"radio\" id=\"The Shining\" name=\"movie\">&nbsp;The Shining&nbsp;</label> <label for = \"The Wizard of Oz\"> <input type = \"radio\" id = \"The Wizard of Oz\" name = \"movie\">&nbsp; The Wizard of Oz</label> &nbsp <label for = \"Shrek\"> <input type = \"radio\" id = \"Shrek\" name = \"movie\"> &nbsp; Shrek</label>"	
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
    insertMainCharacter(930379, username)
    else if(pick[5].checked)
    insertMainCharacter(105872, username)
    else if(pick[6].checked)
    insertMainCharacter(1186616, username)
    else if(pick[7].checked)
    insertMainCharacter(561315, username)
    else if(pick[8].checked)
    insertMainCharacter(18717177, username)
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

 poster = text.substring(text.search('src="//upload.wikimedia.org/')+7);
 console.log(poster);
 poster = poster.substring(0, poster.search('"'));
 console.log(poster);
 poster = "https://" + poster;

 if(!text.includes("list of episodes")){

  title = text.substring(text.search("font-size: 125%; font-style: italic;") + 38)
  title = title.substring(0, title.search("</th>"));

 text = text.substring(text.search("Edit section: Plot")+80)
 if(text.includes("Voice cast")){
  cast = text.substring(text.search("Voice cast"))
  }
  
 else if(text.includes("Edit section: Cast")){
  cast = text.substring(text.search("Edit section: Cast"))
  if(cast.includes('th scope="row"')){
    console.log('fuck you')
    cast = cast.substring(cast.search('th scope="row">'+17))
    cast = cast.substring(0, cast.search('</th>'))
  }
  console.log(cast)
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

  console.log(text)
 if(text.includes("Edit section: Cast")){     
  text = text.substring(text.search('<p>'))
  text = text.substring(0,text.search("Edit section: Cast")-205) 

  while(text.includes("File:")){
    text1 = text.substring(text.search("div class"))
    text1 = text1.substring(0, text1.search('\n'))
    text = text.replace(text1, '')
  }
  
  if(text.indexOf('<')>text.indexOf('>')){
    text1= text.substring(0, text.search('<')+1)
    text=text.replace(text1,'')
    }
    
    console.log(text)
    
  while(text.includes("<")){
    console.log('heyo')
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

  if(text.includes("Voice cast[edit]")){
    console.log(text.search("Voice cast"))
    text = text.substring(0, text.search("Voice cast"))
    console.log("pussseyso")
    }

    console.log(text);


 let ele = document.getElementById('mainform');

 if(name.slice(-1)!='s')
    name = name + "'s Movie"
  else
    name = name + "' Movie"

 if(document.getElementById("test")==null){
    var text1 = document.createElement("div")
    text1.innerHTML =  "<br></br><p class = 'intro' > " + name + "</p>  <img id = poster src = " + poster  + " > </img> </p> <p class = 'intro' > Inspired by " + title + " </p><br></br>" + '<div id = "summary-text">' + text + '</div>';
    text1.id = "test"
    ele.append(text1)
    if(mobile == 0){
    let height = window.innerHeight * .8
    document.getElementById("inner").style.height = height + "px";
    }
  }
  else {
    document.getElementById("test").innerHTML =  "<br></br><p class = 'intro' > " + name + "</p> <img id = poster src = " + poster  + " > </img> </p><br></br>" + '<div id = "summary-text">' + text + '</div>';
  }
}
  else{
        let ele = document.getElementById('mainform');
        if(document.getElementById("test")==null){
          var text1 = document.createElement("div")
          text1.innerHTML = "Invalid movie, try a different one"
          text1.id = "test"
          ele.append(text1)
        }
        else
          document.getElementById('test').innerHTML = "Invalid movie, try a different one"
  }
  }else{
    let ele = document.getElementById('mainform');
    if(document.getElementById("test")==null){
      var text1 = document.createElement("div")
      text1.innerHTML = "TV shows not supported, try entering a movie"
      text1.id = "test"
      ele.append(text1)
    }
    else
      document.getElementById('test').innerHTML = "TV shows not supported, try entering a movie"
  }
} catch (e) {
 console.error(e);
}

}