// One query, example code:
function trigger(){
	username = document.getElementById("user_name").value;
	WD("Forrest Gump", username)
  console.log("hey")
}

function WD(item, name) {
    url = "https://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + item.toString() + "&prop=revisions&rvprop=content";
    $.getJSON(url, function (json) {
        var item_id = Object.keys(json.query.pages)[0]; // THIS DO THE TRICK !
        sent = json.query.pages[item_id].revisions[0]["*"];
        sent = sent.substring(sent.search("Plot")+7)
        sent = sent.substring(0, sent.search("Production"))
        
        	while(sent.includes('\[')){
        	str = sent.substring(sent.search('\\[\\['), sent.search('\\]\\]')+2)
          str1 = str.substring(2, str.search('\\]\\]'))
          if(str1.includes('|')){
             str1 = str1.substring(str1.search('\\|')+1)
             }
          sent = sent.replace(str, str1)
          }      
          
          var x = 0
          var y = 0
          var start
          for (let i = 0; i < sent.length; i++) {
  					if(sent[i] == '\{'){
            	x++
              if(y == 0)
              	start = i
              y = 1
              }
            if(sent[i] == '\}')
            	x--
            
            if(x == 0 && y == 1){
            		sent1 = sent.substring(start, i+1)
                sent2 = sent.substring(start+2, i-1)
                if(sent2 == "snd"){
                sent2 = sent2.replace("snd", '—')
                sent = sent.replace(sent1, sent2)
                }
                else
                sent = sent.replace(sent1, ' ')
                y = 0
            }
				}  
          

				sent = sent.replaceAll('\n', '<br>')
        
        cast = sent.substring(sent.search("Cast"))
        cast = cast.substring(cast.search(/[*]/g))
        cast = cast.substring(cast.search("as"))
        cast = cast.substring(3, cast.search('<br>'))
        if(cast.includes(':'))
        	cast = cast.substring(0, cast.search(':'))
        if(cast.includes('/'))
          cast = cast.substring(0, cast.search('/'))
        if(cast.includes("\("))
          cast = cast.substring(0, cast.search("\\(")-1) 
        sent = sent.substring(0, sent.search("Cast"))
        sent = sent.replaceAll(cast, name)
        
        if(cast.includes(" ")){
        	firstname = cast.substring(0, cast.search(" "))
          lastname = cast.substring(cast.search(" ")+1)
          
          if(name.includes(" ")){
        		userFirst = name.substring(0, cast.search(" ")-1)
            userLast = name.substring(cast.search(" ")-1)
           	sent = sent.replaceAll(firstname, userFirst)
         		sent = sent.replaceAll(lastname, userLast)           
          }
          else{
          sent = sent.replaceAll(firstname, name)
          sent = sent.replaceAll(lastname, name)
          }
				}
        sent = sent.substring(0, sent.search("=="))
        
        result = sent;
        
        let ele = document.getElementById('summary');
        ele.innerHTML = result;
        
    });
}
