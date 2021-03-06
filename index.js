'use strict'
const md5 = require('md5');
const sha1 = require('sha1');

Object.defineProperty(exports, "__esModule", { value: true });

var AppresString = /** @class */ (function () {

    function AppresString() {

    }
    
    function genForPlist(strings, langId, hash) {
        let rawstring = '/* Localized versions of plist keys */\n';
        rawstring += '/* ' + langId + " */\n";
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }

            let id = doc.id;
            if(hash=="md5") id = md5(id);
            else if(hash=="sha1") id = sha1(id);

            let str = doc.get(langId);
            if(str==null) str = doc.get("default");
            if(str==null) str = "";
            rawstring += id + " = \"" + str + "\";\n";
        });
        rawstring += "\n";
        return rawstring;
    }
    function genForXML(strings, langId, hash) {
        let rawstring = '<?xml version="1.0" encoding="UTF-8"?>\n';
        rawstring += "<string>\n";
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }

            let id = doc.id;
            if(hash=="md5") id = md5(id);
            else if(hash=="sha1") id = sha1(id);

            let str = doc.get(langId);
            if(str==null) str = doc.get("default");
            if(str==null) str = "";
            rawstring += "\t<" + id + ">" + str + "</" + id + ">\n";
        });
        rawstring += "</string>\n";
        return rawstring;
    }
    function genForJson(strings, langId, key, hash) {
        let result = {};
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }
            if(key!=null && key!="key") {
                let id = doc.get(key);                
                if(hash=="md5") id = md5(id);
                else if(hash=="sha1") id = sha1(id);

                let str = langId ? doc.data()[langId] : doc.data();
                if(str!=null) result[id] = str;
            } else {
                let id = doc.id;
                if(hash=="md5") id = md5(id);
                else if(hash=="sha1") id = sha1(id);

                let str = langId ? doc.data()[langId] : doc.data();
                if(str!=null) result[id] = str;
            }
        });
        return result;
    }
    function genForKeyValue(strings, langId, hash) {
        let rawstring = "";
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }

            let id = doc.id;
            if(hash=="md5") id = md5(id);
            else if(hash=="sha1") id = sha1(id);

            let str = doc.data()[langId];
            if(str==null) str = doc.data()["default"];
            if(str==null) str = "";          
            rawstring += id + " = \"" + str + "\";\n";      
        });
        return rawstring;
    }
    function genForDict(strings, langId, hash) {
        let rawstring = "<dict>\n";
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }
            let id = doc.id;
            if(hash=="md5") id = md5(id);
            else if(hash=="sha1") id = sha1(id);

            let str = doc.get(langId);
            if(str==null) str = doc.get("default");
            if(str==null) str = "";
            rawstring += "\t<key>" + id + "</key>\n";
            rawstring += "\t<string>" + str + "</string>\n";      
        });
        rawstring += "</dict>\n";
        return rawstring;
    }
    
    
    function genForApple(strings, langId, isDefault, keyMode, hash) {
        /*
        Localizable.strings
        Albumbook
     
        Created by KANGGYUYOUNG on 8/8/16.
        Copyright © 2016 KANGGYUYOUNG. All rights reserved.
         
        "%d Selected" = "%d 個選択した";
        "%d Photos Selected" = "%d 個写真選択した";
        "%d Photo Selected" = "%d 個写真選択した";
        "%d Videos Selected" = "%d ビデオ選択した";
        "%d Video Selected" = "%d ビデオ選択した";
        */
    
        let rawstring = "/*\nLocalizable.strings\n";
        rawstring += langId + "\n";
        rawstring += "*/\n\n";
    
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }

            let id = doc.id;    

            let def = null;
            let str = null;
            let opt = "";
      
            let formatted = "";
            if(id.endsWith(">")) {
              let pos = id.lastIndexOf("<");
              if(pos>0) {
                formatted = id.substring(pos);
                if(formatted.indexOf("formatted=false")>0) {
                  formatted = "<formatted=\"false\">";
                }
                id = id.substring(0, pos);
              }
            }
            
            def = doc.get("default");
            if (def == "" || def == null) {
              def = id;
            }  
      
            if(!isDefault) {
              str = doc.get(langId);
            }
            if (str == "" || str == null) {
              str = def;
            }
      
            if(keyMode || (def.startsWith("<string-array>") && def.endsWith("</string-array>"))) {
              def = id;
            } else {
              opt += "<key=\""+id+"\">";
            }
      
            opt += formatted;
      
            if(opt!="") {
              opt = "\t/*" + opt + "*/";
            }

            if(hash=="md5") def = md5(def);
            else if(hash=="sha1") def = sha1(def);
      
            rawstring += "\"" + def + "\" = \"" + str + "\";"+opt+"\n";
        });

        rawstring += "\n";
        return rawstring;
    }
    
    function genForAndroid(strings, langId, isDefault, hash) {
        /*
        Android Strings Sample
        <?xml version="1.0" encoding="utf-8"?>
        <resources>
          <string name="app_name">アルバムブック</string>
          <string name="menu_reduce_s"><![CDATA["   "]]>Reduce</string>
          <string name="COPYRIGHT">Copyright &#169; 2017 SMARTDISK ORG. All rights reserved.</string>
          <string name="album_photo_cover_page_format">%d PAGE</string>
          <string name="album_photo_cover_pages_format">%d PAGES</string>
          <string name="album_photo_cover_page_inside_format">%d PAGE INSIDE</string>
          <string name="album_photo_cover_pages_inside_format">%d PAGES INSIDE</string>
          <string name="album_photo_inner_page_format" formatted="false">%d / %d</string>        
    
          <string-array name="algorithm_array">
              <item>SHA1</item>
          </string-array>
          <string-array name="digits_array">
              <item>6</item>
              <item>8</item>
          </string-array>
          <string-array name="period_array">
              <item>30</item>
              <item>60</item>
          </string-array>
    
        </resources>
        */
    
        let rawstring = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n";
        strings.forEach(doc => {
            if(doc.payload) {
                doc = doc.payload.doc;
            }
            let str = null;
            let id = doc.id;
            let opt = "";
            if(id.endsWith(">")) {
                let pos = id.lastIndexOf("<");
                if(pos>0) {
                    opt = id.substring(pos);
                    if(opt.indexOf("formatted=false")>0) {
                        opt = " formatted=\"false\"";
                    } else {
                        opt = "";
                    }
                    id = id.substring(0, pos);
                  }
              }
            str = doc.get(langId);
            if(!isDefault) {
                if (str == "" || str == null) {
                    str = doc.get("default");
                }
            }
            if (str == "" || str == null) {
                str = id;
            }

            if(hash=="md5") id = md5(id);
            else if(hash=="sha1") id = sha1(id);

            if(str.startsWith("<string-array>") && str.endsWith("</string-array>")) {
                let s = str.substring(14, str.length-15);
                rawstring += "\t<string-array name=\""+id+"\">\n";
                let a = s.split(",");
                for(let as of a) {
                    rawstring += "\t\t<item>"+as+"</item>\n";
                }
                rawstring += "\t</string-array>\n";
            } else {
                rawstring += "\t<string name=\"" + id + "\""+opt+">" + str + "</string>\n";
            }
        });
        rawstring += "</resources>\n";
        return rawstring;
    }  

        
    AppresString.prototype.genForPlist = (strings, langId, hash) => {
        return genForPlist(strings, langId, hash);
    }
    AppresString.prototype.genForXML = (strings, langId, hash) => {
        return genForXML(strings, langId, hash);
    }
    AppresString.prototype.genForJson = (strings, langId, key, hash) => {
        return genForJson(strings, langId, key, hash);
    }
    AppresString.prototype.genForKeyValue = (strings, langId, hash) => {
        return genForKeyValue(strings, langId, hash);
    }
    AppresString.prototype.genForDict = (strings, langId, hash) => {
        return genForDict(strings, langId, hash);
    }
    AppresString.prototype.genForApple = (strings, langId, isDefault, keyMode, hash) => {
        return genForApple(strings, langId, isDefault, keyMode, hash);
    }
    AppresString.prototype.genForAndroid = (strings, langId, isDefault, hash) => {
        return genForAndroid(strings, langId, isDefault, hash);
    }

    AppresString.prototype.format = (...args) => { 
        return args[0].replace(/{(\d+)}/g, 
            function(match, num) { 
                num = Number(num) + 1; 
                return typeof(args[num]) != undefined ? args[num] : match; 
            }); 
    }

    AppresString.appresString = new AppresString();
    
    AppresString.genForPlist = function(strings, langId, hash) {
        return this.appresString.genForPlist(strings, langId, hash);
    };
    AppresString.genForXML = function(strings, langId, hash) {
        return this.appresString.genForXML(strings, langId, hash);
    };
    AppresString.genForJson = function(strings, langId, key, hash) {
        return this.appresString.genForJson(strings, langId, key, hash);
    };
    AppresString.genForKeyValue = function(strings, langId, hash) {
        return this.appresString.genForKeyValue(strings, langId, hash);
    };
    AppresString.genForDict = function(strings, langId, hash) {
        return this.appresString.genForDict(strings, langId, hash);
    };
    AppresString.genForApple = function(strings, langId, isDefault, keyMode, hash) {
        return this.appresString.genForApple(strings, langId, isDefault, keyMode, hash);
    };
    AppresString.genForAndroid = function(strings, langId, isDefault, hash) {
        return this.appresString.genForAndroid(strings, langId, isDefault, hash);
    };

    AppresString.format = function(...args) {
        return this.appresString.format(...args);
    };
      
    return AppresString;
}());
  
module.exports = AppresString;
module.exports.AppresString = AppresString;
