window.onload=function(){

  document.getElementById("submit").addEventListener("click", function(){
    username = document.getElementById("user_name").value;
    
    var ele = document.getElementsByTagName('input');
                        if(ele[1].checked)
                             WD("Forrest_Gump", username)
                        else if(ele[2].checked)
                              WD("Raiders_of_the_Lost_Ark", username)
                        else if(ele[3].checked)
                              WD("Die_Hard", username)
                        else if(ele[4].checked)
                              WD("Clueless", username)
  });
 }
 
 
 const WD = async function(item, name) {
 const url = "https://en.wikipedia.org/w/api.php?" +
     new URLSearchParams({
         origin: "*",
         action: "parse",
         page: item,
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
     if(cast.includes("/wiki/")){
         cast = cast.substring(cast.search('>')+1)
         }
     
     if(cast.includes('<'))
         cast = cast.substring(0, cast.search('<'))
     text = text.substring(0,text.search("Edit section: Cast")-200) 
     text = text.substring(text.search(">")+5)
         
     while(text.includes("<")){
       text1 = text.substring(text.search("<"), text.search(">")+1)
       text = text.replace(text1,'')
       if((text.length-text.search("<"))<20){
         console.log("hey1")
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
 } catch (e) {
     console.error(e);
 }
 
 }